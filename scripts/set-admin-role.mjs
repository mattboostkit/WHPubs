// This script assigns admin roles to users in Netlify Identity
// Usage: node set-admin-role.mjs YOUR_API_TOKEN

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
    rl.question('Enter the email of the user to make admin: ', (email) => {
      resolve(email);
    });
  });
}

async function getUserByEmail(email) {
  console.log(`Fetching users for site ${NETLIFY_SITE_ID}...`);
  
  try {
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/identity/users`,
      {
        headers: {
          Authorization: `Bearer ${NETLIFY_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get users: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const users = await response.json();
    console.log(`Found ${users.length} users`);
    
    const user = users.find(user => user.email === email);
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return null;
    }
    
    console.log(`Found user: ${user.email} (ID: ${user.id})`);
    return user;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return null;
  }
}

async function updateUserRole(userId, role) {
  console.log(`Updating user ${userId} to role: ${role}`);
  
  try {
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/identity/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${NETLIFY_API_TOKEN}`,
        },
        body: JSON.stringify({
          app_metadata: {
            roles: [role]
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update user: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const updatedUser = await response.json();
    console.log('User updated successfully!');
    console.log(`User ${updatedUser.email} now has role: ${role}`);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user role:', error.message);
    return null;
  }
}

async function enableIdentity() {
  console.log(`Enabling Identity for site ${NETLIFY_SITE_ID}...`);
  
  try {
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/services/identity`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${NETLIFY_API_TOKEN}`,
        },
        body: JSON.stringify({
          enabled: true
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to enable Identity: ${response.status} ${response.statusText} - ${errorText}`);
    }

    console.log('Identity service enabled successfully!');
    return true;
  } catch (error) {
    console.error('Error enabling Identity:', error.message);
    return false;
  }
}

async function main() {
  try {
    // Get token from command line argument
    NETLIFY_API_TOKEN = process.argv[2];
    
    if (!NETLIFY_API_TOKEN) {
      console.error('Please provide your Netlify API token as an argument');
      console.error('Usage: node set-admin-role.mjs YOUR_API_TOKEN');
      process.exit(1);
    }

    // First, ensure Identity is enabled
    await enableIdentity();
    
    // Get email from user input
    const email = await promptForEmail();
    
    // Find the user
    const user = await getUserByEmail(email);
    
    if (!user) {
      console.log('No user found. You may need to invite this user first.');
      process.exit(1);
    }
    
    // Update the user's role to admin
    await updateUserRole(user.id, 'admin');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

main();
