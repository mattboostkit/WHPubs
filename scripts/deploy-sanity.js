#!/usr/bin/env node

/**
 * Automated Sanity Studio Deployment Script
 * 
 * This script handles the deployment of Sanity Studio with automatic auth checking.
 * It will prompt for login if needed and then deploy the studio.
 */

import { execSync, spawn } from 'child_process';
import readline from 'readline';
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
  blue: '\x1b[34m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  console.log(`\n${colors.cyan}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
}

// Check if we're in the right directory
function checkDirectory() {
  const currentDir = process.cwd();
  const sanityConfigPath = path.join(currentDir, 'sanity.config.ts');
  
  // Check if we're in wh-pubs directory
  if (fs.existsSync(sanityConfigPath)) {
    return true;
  }
  
  // Check if we're in the root and wh-pubs exists
  const whPubsPath = path.join(currentDir, 'wh-pubs', 'sanity.config.ts');
  if (fs.existsSync(whPubsPath)) {
    process.chdir(path.join(currentDir, 'wh-pubs'));
    logWarning('Changed directory to wh-pubs/');
    return true;
  }
  
  return false;
}

// Check if user is authenticated with Sanity
function isAuthenticated() {
  try {
    // Check if we can access the project - this requires authentication
    const result = execSync('npx sanity projects list --format json', { 
      stdio: 'pipe',
      encoding: 'utf-8',
      cwd: process.cwd(),
      timeout: 5000
    });
    // If we get a result, we're authenticated
    return result && result.includes('it7wwto3');
  } catch (error) {
    // If the command fails, we're not authenticated
    return false;
  }
}

// Get current user info
function getCurrentUser() {
  try {
    const output = execSync('npx sanity whoami', { 
      stdio: 'pipe',
      encoding: 'utf-8',
      cwd: process.cwd()
    });
    return output.trim();
  } catch (error) {
    // Silent fail
  }
  return null;
}

// Build the Sanity Studio
async function buildStudio() {
  return new Promise((resolve, reject) => {
    logStep('BUILD', 'Building Sanity Studio...');
    
    const build = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
      shell: true
    });

    build.on('close', (code) => {
      if (code === 0) {
        logSuccess('Studio built successfully');
        resolve();
      } else {
        reject(new Error(`Build failed with code ${code}`));
      }
    });

    build.on('error', (err) => {
      reject(err);
    });
  });
}

// Deploy the Sanity Studio
async function deployStudio() {
  return new Promise((resolve, reject) => {
    logStep('DEPLOY', 'Deploying Sanity Studio to production...');
    
    const deploy = spawn('npx', ['sanity', 'deploy', '--source-maps'], {
      stdio: 'inherit',
      shell: true
    });

    deploy.on('close', (code) => {
      if (code === 0) {
        logSuccess('Studio deployed successfully!');
        resolve();
      } else {
        reject(new Error(`Deploy failed with code ${code}`));
      }
    });

    deploy.on('error', (err) => {
      reject(err);
    });
  });
}

// Main deployment flow
async function main() {
  console.log(`\n${colors.bright}${colors.blue}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}║   Sanity Studio Deployment Script     ║${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}╚════════════════════════════════════════╝${colors.reset}\n`);

  try {
    // Step 1: Check directory
    logStep('1', 'Checking directory...');
    if (!checkDirectory()) {
      logError('Not in a Sanity project directory!');
      logWarning('Please run this script from the wh-pubs directory or project root.');
      process.exit(1);
    }
    logSuccess('In correct directory');

    // Step 2: Check authentication
    logStep('2', 'Checking Sanity authentication...');
    if (!isAuthenticated()) {
      logWarning('You are not logged in to Sanity.');
      log('\nPlease run the following command to login:', colors.yellow);
      log('  npx sanity login\n', colors.cyan);
      log('Then run this script again.', colors.yellow);
      process.exit(1);
    }
    
    const user = getCurrentUser();
    if (user) {
      logSuccess(`Authenticated as: ${user}`);
    } else {
      logSuccess('Authenticated');
    }

    // Step 3: Build the studio
    await buildStudio();

    // Step 4: Deploy the studio
    await deployStudio();

    // Success!
    console.log(`\n${colors.green}${colors.bright}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.green}${colors.bright}║        Deployment Successful!          ║${colors.reset}`);
    console.log(`${colors.green}${colors.bright}╚════════════════════════════════════════╝${colors.reset}\n`);
    
    log('Your Sanity Studio has been deployed to:', colors.cyan);
    log('  https://whpubs.sanity.studio\n', colors.bright);
    
    log('The new schema changes are now live!', colors.green);
    log('You can now add images for the "What Makes Us Special" section.\n');

  } catch (error) {
    console.error(`\n${colors.red}Deployment failed:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);