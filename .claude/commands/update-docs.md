---
description: Automatically update README and CLAUDE.md documentation based on recent code changes
tools: [Read, Write, Edit, Grep, Bash, Task]
model: claude-opus-4-20250514
---

# Update Documentation

I'll analyze the recent changes in your codebase and automatically update the README.md and CLAUDE.md files to reflect:

1. **New features and functionality** added to the codebase
2. **Updated commands** and scripts
3. **Configuration changes** that affect development
4. **Architecture updates** and structural changes
5. **New dependencies** or tools
6. **API or interface changes**
7. **Environment variables** and deployment settings

## Process

I will:
1. Run the documentation analysis script to identify what needs updating
2. Analyze recent git changes to understand what has been modified
3. Examine the current state of README.md and CLAUDE.md
4. Update both files with relevant documentation changes
5. Ensure consistency between the documentation files
6. Preserve existing formatting and structure

First, let me analyze recent changes:

!node .claude/scripts/analyze-and-update-docs.js

Based on the analysis above, I'll now update your documentation files appropriately.

## Usage

Simply run: `/update-docs`

Or with specific focus: `/update-docs focus on the new API endpoints`

$ARGUMENTS