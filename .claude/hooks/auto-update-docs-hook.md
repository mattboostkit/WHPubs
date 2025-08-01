# Auto Update Documentation Hook

This hook configuration can be added to your Claude Code settings to automatically suggest documentation updates after successful code changes.

## PostToolUse Hook Configuration

Add this to your Claude Code settings JSON file (accessed via Settings in Claude Code):

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

## Advanced Hook with Automatic Analysis

For a more sophisticated setup that automatically analyzes changes:

```json
{
  "hooks": {
    "postToolUse": [
      {
        "match": "Write|Edit|MultiEdit",
        "command": "node .claude/scripts/analyze-and-update-docs.js | head -20 && echo '\n💡 Run /update-docs to apply documentation updates'",
        "decision": "allow"
      }
    ]
  }
}
```

## Alternative: Batch Updates Hook

This version only suggests updates after multiple changes:

```json
{
  "hooks": {
    "postToolUse": [
      {
        "match": "Bash",
        "command": "if [[ \"$INPUT\" == *\"git add\"* ]] || [[ \"$INPUT\" == *\"git commit\"* ]]; then echo '📝 Documentation reminder: Run /update-docs before committing'; fi",
        "decision": "allow"
      }
    ]
  }
}
```

## Usage

1. Open Claude Code settings
2. Add one of the hook configurations above
3. The hook will remind you to update documentation after making code changes
4. Run `/update-docs` when prompted to automatically update your README and CLAUDE.md files