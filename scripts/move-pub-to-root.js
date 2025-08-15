#!/usr/bin/env node

// Script to move pub page to root after build
// Handles slug mappings (e.g., the-bull -> the-bull-otford)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetPubSlug = process.env.TARGET_PUB_SLUG;

if (!targetPubSlug) {
  console.log('Hub build, keeping index.html.');
  process.exit(0);
}

// Map of environment slugs to actual Sanity slugs
const slugMappings = {
  'the-bull': 'the-bull-otford',
  // Add more mappings here if needed
};

// Get the actual slug (use mapping if exists, otherwise use as-is)
const actualSlug = slugMappings[targetPubSlug] || targetPubSlug;

const distDir = path.join(process.cwd(), 'dist');
const sourcePath = path.join(distDir, actualSlug, 'index.html');
const targetPath = path.join(distDir, 'index.html');
const sourceDir = path.join(distDir, actualSlug);

console.log(`Moving pub page to root...`);
console.log(`Looking for: ${sourcePath}`);

if (fs.existsSync(sourcePath)) {
  // Move the index.html to root
  fs.renameSync(sourcePath, targetPath);
  
  // Move all sub-pages to root level
  if (fs.existsSync(sourceDir)) {
    const items = fs.readdirSync(sourceDir);
    for (const item of items) {
      const sourcePath = path.join(sourceDir, item);
      const targetPath = path.join(distDir, item);
      
      // Only move directories (sub-pages)
      if (fs.statSync(sourcePath).isDirectory()) {
        // Remove existing directory if it exists
        if (fs.existsSync(targetPath)) {
          fs.rmSync(targetPath, { recursive: true, force: true });
        }
        fs.renameSync(sourcePath, targetPath);
        console.log(`Moved ${item} to root level`);
      }
    }
  }
  
  // Remove the source directory
  fs.rmSync(sourceDir, { recursive: true, force: true });
  
  console.log(`Successfully moved ${actualSlug}/index.html to root`);
} else {
  // Try the original slug as fallback
  const fallbackPath = path.join(distDir, targetPubSlug, 'index.html');
  const fallbackDir = path.join(distDir, targetPubSlug);
  
  if (fs.existsSync(fallbackPath)) {
    fs.renameSync(fallbackPath, targetPath);
    
    // Move all sub-pages to root level
    if (fs.existsSync(fallbackDir)) {
      const items = fs.readdirSync(fallbackDir);
      for (const item of items) {
        const sourcePath = path.join(fallbackDir, item);
        const targetPath = path.join(distDir, item);
        
        // Only move directories (sub-pages)  
        if (fs.statSync(sourcePath).isDirectory()) {
          // Remove existing directory if it exists
          if (fs.existsSync(targetPath)) {
            fs.rmSync(targetPath, { recursive: true, force: true });
          }
          fs.renameSync(sourcePath, targetPath);
          console.log(`Moved ${item} to root level`);
        }
      }
    }
    
    fs.rmSync(fallbackDir, { recursive: true, force: true });
    console.log(`Successfully moved ${targetPubSlug}/index.html to root`);
  } else {
    console.error(`ERROR: Could not find pub page at ${sourcePath} or ${fallbackPath}`);
    process.exit(1);
  }
}