# Claude Code Auto-Commit Hook

This directory contains an auto-commit hook that automatically commits your code changes to Git after successful modifications by Claude Code.

## Features

- **Automatic Commits**: Commits changes after successful Write, Edit, MultiEdit, and Bash operations
- **Smart Grouping**: Groups rapid changes into a single commit (configurable delay)
- **Descriptive Messages**: Generates meaningful commit messages based on the operation
- **Skip Patterns**: Ignores sensitive files and directories
- **Optional Auto-Push**: Can automatically push commits to remote (disabled by default)
- **Configurable**: Fully customizable through JSON configuration

## Installation

The hook is already configured in `.claude/settings.json`. To activate it:

1. Restart Claude Code or run `/hooks` to reload settings
2. The hook will start working automatically

## Configuration

Edit `.claude/hooks/auto-commit-config.json` to customize behavior:

```json
{
  "enabled": true,                    // Enable/disable auto-commit
  "commit_options": {
    "auto_push": false,              // Automatically push after commit
    "commit_prefix": "[Auto-commit]", // Prefix for commit messages
    "include_timestamp": true,        // Add timestamp to commits
    "group_delay_seconds": 30        // Group changes within this time window
  },
  "skip_patterns": [                 // Files/directories to ignore
    ".git/",
    ".env",
    "node_modules/",
    "dist/",
    ".claude/settings",
    "*.log",
    "*.tmp"
  ],
  "skip_tools": [                    // Tools that won't trigger commits
    "Read",
    "Grep",
    "Glob",
    "LS",
    "NotebookRead"
  ]
}
```

## Usage

### Basic Hook (auto-commit.py)
- Simple auto-commit functionality
- Commits after each successful change
- No configuration needed

### Advanced Hook (auto-commit-advanced.py)
- Full configuration support
- Change grouping to reduce commit spam
- Optional auto-push
- More sophisticated commit messages

To switch between hooks, edit `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit|Bash",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/auto-commit-advanced.py",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

## Commit Message Format

The hook generates descriptive commit messages:

```
[Auto-commit] Update src/components/Header.tsx

Auto-committed by Claude Code at 2025-01-15 10:30:45
Tool: Edit
```

For multiple files:
```
[Auto-commit] Update configuration (3 files)

Auto-committed by Claude Code at 2025-01-15 10:32:15
Tool: MultiEdit
```

## Disabling Auto-Commit

### Temporarily
Set `"enabled": false` in `auto-commit-config.json`

### Permanently
Remove or comment out the hook configuration in `.claude/settings.json`

## Troubleshooting

### Hook Not Working
1. Check if the script is executable: `chmod +x .claude/hooks/auto-commit*.py`
2. Verify Git is initialized: `git status`
3. Check Claude Code debug output: Run Claude with `--debug` flag

### Commits Not Appearing
1. Ensure you have changes: `git status`
2. Check if files match skip patterns
3. Verify the tool operation was successful

### Error Messages
- "Git status check failed": Ensure you're in a Git repository
- "Failed to stage changes": Check file permissions
- "Failed to commit": May indicate pre-commit hooks blocking

## Security Notes

- The hook only commits to local repository
- Auto-push is disabled by default for safety
- Sensitive files (.env, .git) are automatically excluded
- Review commits before pushing to remote

## Advanced Usage

### Custom Commit Messages
Modify the `generate_commit_message()` function in the script to customize message format.

### Pre-Commit Integration
The hook respects existing pre-commit hooks. If pre-commit checks fail, the auto-commit will also fail.

### CI/CD Integration
With auto-push enabled, commits can trigger CI/CD pipelines automatically.