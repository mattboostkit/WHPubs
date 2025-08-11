#!/usr/bin/env python3
"""
Advanced auto-commit hook for Claude Code with configuration support
Automatically commits code changes to GitHub after successful modifications
"""

import json
import sys
import subprocess
import os
import time
from datetime import datetime
from pathlib import Path

# Path to configuration file
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "auto-commit-config.json")

# Path to track last commit time
LAST_COMMIT_FILE = os.path.join(os.path.dirname(__file__), ".last-commit-time")

def load_config():
    """Load configuration from JSON file"""
    try:
        with open(CONFIG_PATH, 'r') as f:
            return json.load(f)
    except:
        # Default configuration if file doesn't exist
        return {
            "enabled": True,
            "commit_options": {
                "auto_push": False,
                "commit_prefix": "[Auto-commit]",
                "include_timestamp": True,
                "group_delay_seconds": 30
            },
            "skip_patterns": [".git/", ".env", "node_modules/", "dist/"],
            "skip_tools": ["Read", "Grep", "Glob", "LS"]
        }

def run_command(cmd, cwd=None):
    """Run a shell command and return output"""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            cwd=cwd
        )
        return result.returncode, result.stdout.strip(), result.stderr.strip()
    except Exception as e:
        return 1, "", str(e)

def should_group_with_previous():
    """Check if we should group this change with the previous commit"""
    config = load_config()
    group_delay = config["commit_options"].get("group_delay_seconds", 30)
    
    if group_delay <= 0:
        return False
    
    try:
        if os.path.exists(LAST_COMMIT_FILE):
            with open(LAST_COMMIT_FILE, 'r') as f:
                last_commit_time = float(f.read().strip())
            
            current_time = time.time()
            if current_time - last_commit_time < group_delay:
                return True
    except:
        pass
    
    return False

def update_last_commit_time():
    """Update the last commit timestamp"""
    with open(LAST_COMMIT_FILE, 'w') as f:
        f.write(str(time.time()))

def get_git_status(project_dir):
    """Get current git status"""
    code, stdout, stderr = run_command("git status --porcelain", cwd=project_dir)
    if code != 0:
        return None, stderr
    return stdout, None

def has_changes(status):
    """Check if there are any changes to commit"""
    return bool(status and status.strip())

def get_changed_files(status):
    """Parse git status output to get list of changed files"""
    files = []
    for line in status.strip().split('\n'):
        if line:
            parts = line.split(None, 1)
            if len(parts) > 1:
                files.append(parts[1])
    return files

def generate_commit_message(tool_name, tool_input, changed_files, config):
    """Generate a descriptive commit message based on the changes"""
    prefix = config["commit_options"].get("commit_prefix", "")
    include_timestamp = config["commit_options"].get("include_timestamp", True)
    
    # Base message components
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR", "")
    
    if tool_name == "Write":
        file_path = tool_input.get("file_path", "").replace(project_dir + "/", "")
        action = "Create" if any(f.startswith("A ") for f in changed_files) else "Update"
        message = f"{action} {file_path}"
    elif tool_name in ["Edit", "MultiEdit"]:
        file_path = tool_input.get("file_path", "").replace(project_dir + "/", "")
        message = f"Update {file_path}"
    elif tool_name == "Bash":
        command = tool_input.get("command", "")
        if "npm install" in command:
            message = "Update dependencies"
        elif "mkdir" in command:
            message = "Create directory structure"
        elif "git" in command:
            message = "Git operations"
        else:
            message = "Execute command changes"
    else:
        message = f"Changes from {tool_name} operation"
    
    # Add prefix if configured
    if prefix:
        message = f"{prefix} {message}"
    
    # Add file count if multiple files changed
    if len(changed_files) > 1:
        message += f" ({len(changed_files)} files)"
    
    # Add timestamp if configured
    if include_timestamp:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        message += f"\n\nAuto-committed by Claude Code at {timestamp}"
    
    # Add tool details for tracking
    message += f"\nTool: {tool_name}"
    
    return message

def should_skip_commit(tool_name, tool_input, config):
    """Determine if we should skip auto-commit for this operation"""
    # Check if auto-commit is enabled
    if not config.get("enabled", True):
        return True
    
    # Skip commits for configured tools
    if tool_name in config.get("skip_tools", []):
        return True
    
    # Skip commits for certain file patterns
    if tool_name in ["Write", "Edit", "MultiEdit"]:
        file_path = tool_input.get("file_path", "")
        skip_patterns = config.get("skip_patterns", [])
        
        for pattern in skip_patterns:
            if pattern in file_path:
                return True
    
    return False

def main():
    # Load configuration
    config = load_config()
    
    try:
        # Read input from stdin
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
        sys.exit(1)
    
    # Extract relevant information
    tool_name = input_data.get("tool_name", "")
    tool_input = input_data.get("tool_input", {})
    tool_response = input_data.get("tool_response", {})
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd())
    
    # Check if we should skip this commit
    if should_skip_commit(tool_name, tool_input, config):
        sys.exit(0)
    
    # Check if the tool operation was successful
    if not tool_response.get("success", True):
        sys.exit(0)
    
    # Get current git status
    status, error = get_git_status(project_dir)
    if error:
        print(f"Git status check failed: {error}", file=sys.stderr)
        sys.exit(1)
    
    # Check if there are changes to commit
    if not has_changes(status):
        sys.exit(0)
    
    # Check if we should group with previous commit
    if should_group_with_previous():
        # Amend the previous commit instead of creating a new one
        code, stdout, stderr = run_command("git add -A", cwd=project_dir)
        if code != 0:
            print(f"Failed to stage changes: {stderr}", file=sys.stderr)
            sys.exit(1)
        
        code, stdout, stderr = run_command("git commit --amend --no-edit", cwd=project_dir)
        if code != 0:
            print(f"Failed to amend commit: {stderr}", file=sys.stderr)
            sys.exit(1)
        
        print("✓ Changes added to previous commit")
    else:
        # Create a new commit
        changed_files = get_changed_files(status)
        
        # Stage all changes
        code, stdout, stderr = run_command("git add -A", cwd=project_dir)
        if code != 0:
            print(f"Failed to stage changes: {stderr}", file=sys.stderr)
            sys.exit(1)
        
        # Generate commit message
        commit_message = generate_commit_message(tool_name, tool_input, changed_files, config)
        
        # Create the commit
        commit_cmd = f'git commit -m "{commit_message.replace('"', '\\"').replace('\n', '\\n')}"'
        code, stdout, stderr = run_command(commit_cmd, cwd=project_dir)
        
        if code != 0:
            print(f"Failed to commit: {stderr}", file=sys.stderr)
            sys.exit(1)
        
        # Update last commit time
        update_last_commit_time()
        
        # Get the commit hash
        code, commit_hash, stderr = run_command("git rev-parse --short HEAD", cwd=project_dir)
        
        print(f"✓ Auto-committed changes: {commit_hash}")
        
        # Auto-push if configured
        if config["commit_options"].get("auto_push", False):
            code, stdout, stderr = run_command("git push", cwd=project_dir)
            if code == 0:
                print("✓ Pushed to remote repository")
            else:
                print(f"⚠ Push failed: {stderr}", file=sys.stderr)
    
    # Return success with suppressOutput
    output = {
        "suppressOutput": True
    }
    print(json.dumps(output))
    sys.exit(0)

if __name__ == "__main__":
    main()