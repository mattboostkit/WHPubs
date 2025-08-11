#!/usr/bin/env python3
"""
Auto-commit hook for Claude Code
Automatically commits code changes to GitHub after successful modifications
"""

import json
import sys
import subprocess
import os
from datetime import datetime
from pathlib import Path

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
            # Git status format: XY filename
            # Where X is staged status, Y is unstaged status
            parts = line.split(None, 1)
            if len(parts) > 1:
                files.append(parts[1])
    return files

def generate_commit_message(tool_name, tool_input, changed_files):
    """Generate a descriptive commit message based on the changes"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Base message components
    if tool_name == "Write":
        file_path = tool_input.get("file_path", "").replace("/mnt/c/Dev/Cascade/whpubs/", "")
        action = "Create" if file_path in changed_files else "Update"
        message = f"{action} {file_path}"
    elif tool_name == "Edit" or tool_name == "MultiEdit":
        file_path = tool_input.get("file_path", "").replace("/mnt/c/Dev/Cascade/whpubs/", "")
        message = f"Update {file_path}"
    elif tool_name == "Bash":
        command = tool_input.get("command", "")
        if "npm" in command:
            message = "Update dependencies"
        elif "mkdir" in command:
            message = "Create directory structure"
        else:
            message = "Execute command changes"
    else:
        # Generic message for other tools
        message = f"Changes from {tool_name} operation"
    
    # Add file count if multiple files changed
    if len(changed_files) > 1:
        message += f" ({len(changed_files)} files)"
    
    # Add timestamp
    message += f"\n\nAuto-committed by Claude Code at {timestamp}"
    
    return message

def should_skip_commit(tool_name, tool_input):
    """Determine if we should skip auto-commit for this operation"""
    # Skip commits for read-only operations
    if tool_name in ["Read", "Grep", "Glob", "LS", "NotebookRead"]:
        return True
    
    # Skip commits for certain file patterns
    if tool_name in ["Write", "Edit", "MultiEdit"]:
        file_path = tool_input.get("file_path", "")
        skip_patterns = [
            ".git/",
            ".env",
            "node_modules/",
            "dist/",
            ".claude/settings",
            "*.log",
            "*.tmp"
        ]
        for pattern in skip_patterns:
            if pattern in file_path:
                return True
    
    return False

def main():
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
    if should_skip_commit(tool_name, tool_input):
        sys.exit(0)
    
    # Check if the tool operation was successful
    if not tool_response.get("success", True):
        # Don't commit on failed operations
        sys.exit(0)
    
    # Get current git status
    status, error = get_git_status(project_dir)
    if error:
        print(f"Git status check failed: {error}", file=sys.stderr)
        sys.exit(1)
    
    # Check if there are changes to commit
    if not has_changes(status):
        # No changes to commit
        sys.exit(0)
    
    # Get list of changed files
    changed_files = get_changed_files(status)
    
    # Stage all changes
    code, stdout, stderr = run_command("git add -A", cwd=project_dir)
    if code != 0:
        print(f"Failed to stage changes: {stderr}", file=sys.stderr)
        sys.exit(1)
    
    # Generate commit message
    commit_message = generate_commit_message(tool_name, tool_input, changed_files)
    
    # Create the commit
    # Use -m with proper escaping to handle multi-line messages
    commit_cmd = f'git commit -m "{commit_message.replace('"', '\\"').replace('\n', '\\n')}"'
    code, stdout, stderr = run_command(commit_cmd, cwd=project_dir)
    
    if code != 0:
        print(f"Failed to commit: {stderr}", file=sys.stderr)
        sys.exit(1)
    
    # Get the commit hash
    code, commit_hash, stderr = run_command("git rev-parse --short HEAD", cwd=project_dir)
    
    # Success message (shown in transcript mode)
    print(f"✓ Auto-committed changes: {commit_hash}")
    
    # Return success with suppressOutput to avoid cluttering the conversation
    output = {
        "suppressOutput": True
    }
    print(json.dumps(output))
    sys.exit(0)

if __name__ == "__main__":
    main()