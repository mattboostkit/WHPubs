// This script helps assign admin roles to users in Netlify Identity
// Usage: node assign-admin-role.js user@example.com

const fetch = require('node-fetch');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Replace these with your Netlify site ID and API token
let NETLIFY_SITE_ID = '';
let NETLIFY_API_TOKEN = '';

async function promptForCredentials() {
  return new Promise((resolve) => {
    rl.question('Enter your Netlify site ID: ', (siteId) => {
      NETLIFY_SITE_ID = siteId;
      rl.question('Enter your Netlify API token: ', (token) => {
        NETLIFY_API_TOKEN = token;
        resolve();
      });
    });
  });
}

async function getUserByEmail(email) {
  const response = await fetch(
    `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/identity/users`,
    {
      headers: {
        Authorization: `Bearer ${NETLIFY_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get users: ${response.statusText}`);
  }

  const users = await response.json();
  return users.find(user => user.email === email);
}

async function updateUserRole(userId, role) {
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
    throw new Error(`Failed to update user: ${response.statusText}`);
  }

  return await response.json();
}

async function main() {
  try {
    const email = process.argv[2];
    
    if (!email) {
      console.error('Please provide a user email as an argument');
      process.exit(1);
    }

    await promptForCredentials();
    
    console.log(`Looking up user: ${email}`);
    const user = await getUserByEmail(email);
    
    if (!user) {
      console.error(`User not found: ${email}`);
      process.exit(1);
    }
    
    console.log(`Updating user ${user.email} to have admin role`);
    const updatedUser = await updateUserRole(user.id, 'admin');
    
    console.log('User updated successfully!');
    console.log(`User ${updatedUser.email} now has role: admin`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

main();
