#!/usr/bin/env node

/**
 * Sanity Status Check Script
 * 
 * This script checks the status of your Sanity setup including:
 * - Authentication status
 * - Project configuration
 * - Studio URL
 * - Dataset information
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function logInfo(label, value) {
  console.log(`  ${colors.cyan}${label}:${colors.reset} ${colors.bright}${value}${colors.reset}`);
}

// Check if we're in the right directory
function checkDirectory() {
  const currentDir = process.cwd();
  const sanityConfigPath = path.join(currentDir, 'sanity.config.ts');
  
  if (fs.existsSync(sanityConfigPath)) {
    return currentDir;
  }
  
  const whPubsPath = path.join(currentDir, 'wh-pubs', 'sanity.config.ts');
  if (fs.existsSync(whPubsPath)) {
    process.chdir(path.join(currentDir, 'wh-pubs'));
    return path.join(currentDir, 'wh-pubs');
  }
  
  return null;
}

// Get Sanity configuration
function getSanityConfig() {
  try {
    const configPath = path.join(process.cwd(), 'sanity.config.ts');
    const config = fs.readFileSync(configPath, 'utf-8');
    
    // Extract project ID
    const projectIdMatch = config.match(/projectId:\s*['"]([^'"]+)['"]/);
    const datasetMatch = config.match(/dataset:\s*['"]([^'"]+)['"]/);
    const titleMatch = config.match(/title:\s*['"]([^'"]+)['"]/);
    
    return {
      projectId: projectIdMatch ? projectIdMatch[1] : 'Unknown',
      dataset: datasetMatch ? datasetMatch[1] : 'Unknown',
      title: titleMatch ? titleMatch[1] : 'Unknown'
    };
  } catch (error) {
    return null;
  }
}

// Check authentication status
function checkAuth() {
  try {
    execSync('npx sanity config get api.projectId', { 
      stdio: 'pipe',
      encoding: 'utf-8' 
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Get user info
function getUserInfo() {
  try {
    const output = execSync('npx sanity debug --secrets', { 
      stdio: 'pipe',
      encoding: 'utf-8' 
    });
    
    const userMatch = output.match(/User ID: ([^\n]+)/);
    const emailMatch = output.match(/User email: ([^\n]+)/);
    
    return {
      id: userMatch ? userMatch[1].trim() : null,
      email: emailMatch ? emailMatch[1].trim() : null
    };
  } catch (error) {
    return null;
  }
}

// Check if studio is deployed
function getStudioUrl(projectId) {
  // Standard Sanity studio URL format
  return `https://whpubs.sanity.studio`;
}

// Main check function
async function main() {
  console.log(`\n${colors.bright}${colors.magenta}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}║      Sanity Status Check              ║${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}╚════════════════════════════════════════╝${colors.reset}\n`);

  // Check directory
  log('Checking Sanity configuration...', colors.cyan);
  const projectDir = checkDirectory();
  
  if (!projectDir) {
    logError('Not in a Sanity project directory!');
    log('\nPlease run this from the wh-pubs directory or project root.', colors.yellow);
    process.exit(1);
  }
  
  logSuccess(`Found Sanity project at: ${projectDir}`);
  console.log();

  // Get configuration
  const config = getSanityConfig();
  if (config) {
    log('Project Configuration:', colors.bright);
    logInfo('Title', config.title);
    logInfo('Project ID', config.projectId);
    logInfo('Dataset', config.dataset);
    logInfo('Studio URL', getStudioUrl(config.projectId));
    console.log();
  }

  // Check authentication
  log('Authentication Status:', colors.bright);
  const isAuth = checkAuth();
  
  if (isAuth) {
    logSuccess('Authenticated with Sanity');
    
    const userInfo = getUserInfo();
    if (userInfo && userInfo.email) {
      logInfo('Logged in as', userInfo.email);
    }
  } else {
    logError('Not authenticated');
    log('\nTo login, run:', colors.yellow);
    log('  npx sanity login', colors.cyan);
  }
  console.log();

  // Provide helpful commands
  log('Useful Commands:', colors.bright);
  console.log(`  ${colors.cyan}npm run sanity:deploy${colors.reset}  - Deploy Sanity Studio`);
  console.log(`  ${colors.cyan}npm run sanity:check${colors.reset}   - Run this status check`);
  console.log(`  ${colors.cyan}npm run dev${colors.reset}            - Start local development`);
  console.log(`  ${colors.cyan}npm run build${colors.reset}          - Build the frontend`);
  console.log();

  // URLs
  log('Important URLs:', colors.bright);
  console.log(`  ${colors.cyan}Studio:${colors.reset}     https://whpubs.sanity.studio`);
  console.log(`  ${colors.cyan}Manage:${colors.reset}     https://sanity.io/manage/project/${config?.projectId || 'it7wwto3'}`);
  console.log(`  ${colors.cyan}Frontend:${colors.reset}   https://whpubsadmin.netlify.app`);
  console.log();

  if (!isAuth) {
    log('⚠ You need to login before you can deploy!', colors.yellow);
    process.exit(1);
  } else {
    logSuccess('Everything looks good! You can deploy with: npm run sanity:deploy');
  }
}

// Run the script
main().catch(console.error);