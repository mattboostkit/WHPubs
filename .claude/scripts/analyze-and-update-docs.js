#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to execute shell commands
function exec(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error(`Error executing: ${command}`);
    return '';
  }
}

// Analyze recent git changes
function analyzeChanges() {
  const changes = {
    modifiedFiles: [],
    newFiles: [],
    deletedFiles: [],
    changedPackages: false,
    changedScripts: false,
    changedEnv: false,
    changedConfig: false,
    changedSchemas: false,
    changedComponents: false,
    changedPages: false,
    summary: []
  };

  // Get list of changed files in the last commit
  const gitStatus = exec('git diff --name-status HEAD~1 HEAD 2>/dev/null || git status --porcelain');
  
  gitStatus.split('\n').forEach(line => {
    if (!line.trim()) return;
    
    const [status, ...fileParts] = line.split(/\s+/);
    const file = fileParts.join(' ');
    
    if (status === 'A') changes.newFiles.push(file);
    else if (status === 'M') changes.modifiedFiles.push(file);
    else if (status === 'D') changes.deletedFiles.push(file);
    
    // Analyze what types of changes occurred
    if (file.includes('package.json')) changes.changedPackages = true;
    if (file.includes('.env') || file.includes('env.')) changes.changedEnv = true;
    if (file.includes('scripts/')) changes.changedScripts = true;
    if (file.includes('config') || file.includes('.config.')) changes.changedConfig = true;
    if (file.includes('schemaTypes/') || file.includes('schema')) changes.changedSchemas = true;
    if (file.includes('components/')) changes.changedComponents = true;
    if (file.includes('pages/')) changes.changedPages = true;
  });

  // Generate summary of changes
  if (changes.newFiles.length > 0) {
    changes.summary.push(`Added ${changes.newFiles.length} new file(s)`);
  }
  if (changes.modifiedFiles.length > 0) {
    changes.summary.push(`Modified ${changes.modifiedFiles.length} file(s)`);
  }
  if (changes.deletedFiles.length > 0) {
    changes.summary.push(`Deleted ${changes.deletedFiles.length} file(s)`);
  }

  return changes;
}

// Extract scripts from package.json
function getPackageScripts() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.scripts || {};
  } catch (error) {
    return {};
  }
}

// Extract Sanity schemas
function getSanitySchemas() {
  const schemas = [];
  const schemaPath = 'wh-pubs/schemaTypes';
  
  if (fs.existsSync(schemaPath)) {
    fs.readdirSync(schemaPath).forEach(file => {
      if (file.endsWith('.js') || file.endsWith('.ts')) {
        schemas.push(file.replace(/\.(js|ts)$/, ''));
      }
    });
  }
  
  return schemas;
}

// Generate documentation update suggestions
function generateDocumentationUpdates() {
  const changes = analyzeChanges();
  const scripts = getPackageScripts();
  const schemas = getSanitySchemas();
  
  const updates = {
    readme: [],
    claude: [],
    timestamp: new Date().toISOString()
  };

  // Suggest README updates
  if (changes.changedScripts || changes.changedPackages) {
    updates.readme.push({
      section: 'Development Commands',
      action: 'Review and update the available npm scripts',
      data: scripts
    });
  }

  if (changes.changedEnv) {
    updates.readme.push({
      section: 'Environment Setup',
      action: 'Update environment variable documentation'
    });
  }

  if (changes.newFiles.filter(f => f.includes('components/')).length > 0) {
    updates.readme.push({
      section: 'Components',
      action: 'Document new components added to the project'
    });
  }

  // Suggest CLAUDE.md updates
  if (changes.changedSchemas) {
    updates.claude.push({
      section: 'Key Data Models',
      action: 'Update Sanity schema documentation',
      data: schemas
    });
  }

  if (changes.changedConfig) {
    updates.claude.push({
      section: 'Configuration',
      action: 'Update configuration documentation'
    });
  }

  if (changes.changedComponents || changes.changedPages) {
    updates.claude.push({
      section: 'Architecture Overview',
      action: 'Review architecture section for accuracy'
    });
  }

  // Add general update for any changes
  if (changes.summary.length > 0) {
    const generalUpdate = {
      section: 'Recent Changes',
      action: 'Document recent changes',
      summary: changes.summary
    };
    updates.readme.push(generalUpdate);
    updates.claude.push(generalUpdate);
  }

  return {
    changes,
    updates,
    scripts,
    schemas
  };
}

// Main execution
const analysis = generateDocumentationUpdates();
console.log(JSON.stringify(analysis, null, 2));

export { analyzeChanges, generateDocumentationUpdates };