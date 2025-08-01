# Claude Code Documentation Auto-Update Command

This slash command automatically updates your README.md and CLAUDE.md files based on recent code changes.

## Installation

The command is already installed in this project at `.claude/commands/update-docs.md`.

## Usage

### Basic Usage
```
/update-docs
```

### With Specific Focus
```
/update-docs focus on the new Sanity schemas
/update-docs update only the API documentation
/update-docs add documentation for the new event system
```

## Features

1. **Automatic Change Detection**
   - Analyzes git history to identify recent changes
   - Detects modifications to scripts, schemas, components, and configuration
   - Identifies new files, modified files, and deleted files

2. **Smart Documentation Updates**
   - Updates command lists when package.json scripts change
   - Documents new Sanity schemas automatically
   - Updates environment variable documentation
   - Maintains consistent formatting

3. **Analysis Script**
   - Located at `.claude/scripts/analyze-and-update-docs.js`
   - Can be run standalone: `node .claude/scripts/analyze-and-update-docs.js`
   - Returns JSON analysis of what needs updating

## Setting Up Automatic Reminders (Optional)

You can configure Claude Code to remind you to update documentation after making changes:

1. Open Claude Code settings
2. Add this PostToolUse hook:

```json
{
  "hooks": {
    "postToolUse": [
      {
        "match": "Write|Edit|MultiEdit",
        "command": "echo 'Code changes detected. Consider running /update-docs to update documentation.'",
        "decision": "allow"
      }
    ]
  }
}
```

## What Gets Updated

### README.md
- Development commands and scripts
- Installation instructions
- Environment setup
- New features and functionality
- API documentation

### CLAUDE.md
- Architecture changes
- Data model updates
- Development workflow changes
- Configuration updates
- Integration notes

## Example Workflow

1. Make code changes to your project
2. Run `/update-docs` 
3. Claude will analyze the changes and update both README.md and CLAUDE.md
4. Review the updates
5. Commit the documentation changes

## Extending the Command

You can modify the command by editing:
- `.claude/commands/update-docs.md` - The slash command definition
- `.claude/scripts/analyze-and-update-docs.js` - The analysis logic

## Troubleshooting

- Ensure you have git initialized in your project
- The script requires Node.js to be installed
- Documentation files must exist (README.md and CLAUDE.md)