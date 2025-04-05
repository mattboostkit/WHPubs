// Script to trigger a Netlify build hook when new content is published in Sanity
const https = require('https');

// Replace with your actual Netlify build hook URL
const NETLIFY_BUILD_HOOK = 'https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID';

console.log('Triggering Netlify rebuild to update with latest Sanity content...');

// Send POST request to the Netlify build hook
const req = https.request(
  NETLIFY_BUILD_HOOK,
  { method: 'POST' },
  (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      console.log('Build successfully triggered! Your site will be updated in a few minutes.');
    } else {
      console.error('Failed to trigger build. Check your build hook URL.');
    }
    
    res.on('data', (chunk) => {
      console.log(`Response: ${chunk}`);
    });
  }
);

req.on('error', (error) => {
  console.error('Error triggering build:', error);
});

req.end();
