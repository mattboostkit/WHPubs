// This script invites a user to Netlify Identity with admin role
// Usage: node invite-admin.mjs YOUR_API_TOKEN

import fetch from 'node-fetch';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Site ID for whpubsadmin
const NETLIFY_SITE_ID = 'cfc57598-a42e-4227-934b-c8ffa5fce60a';
// The token is provided as a command line argument for security
let NETLIFY_API_TOKEN = '';

async function promptForEmail() {
  return new Promise((resolve) => {
    rl.question('Enter the email to invite as admin: ', (email) => {
      resolve(email);
    });
  });
}

async function inviteUser(email) {
  console.log(`Inviting user ${email} with admin role...`);
  
  try {
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/identity/invites`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${NETLIFY_API_TOKEN}`,
        },
        body: JSON.stringify({
          email: email,
          data: {
            roles: ["admin"]
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to invite user: ${response.status} ${response.statusText} - ${errorText}`);
    }

    console.log('User invited successfully!');
    console.log(`An invitation has been sent to ${email} with admin role`);
    return true;
  } catch (error) {
    console.error('Error inviting user:', error.message);
    return false;
  }
}

async function main() {
  try {
    // Get token from command line argument
    NETLIFY_API_TOKEN = process.argv[2];
    
    if (!NETLIFY_API_TOKEN) {
      console.error('Please provide your Netlify API token as an argument');
      console.error('Usage: node invite-admin.mjs YOUR_API_TOKEN');
      process.exit(1);
    }
    
    // Get email from user input
    const email = await promptForEmail();
    
    // Invite the user with admin role
    await inviteUser(email);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

main();
