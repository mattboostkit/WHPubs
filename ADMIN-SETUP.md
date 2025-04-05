# Setting Up Admin Roles in Netlify Identity

This guide will help you set up admin roles in Netlify Identity for your WHPubs site.

## 1. Enable Netlify Identity

1. Go to your Netlify site dashboard: https://app.netlify.com/
2. Navigate to your site (whpubsadmin)
3. Go to **Site settings** → **Identity**
4. Click the "Enable Identity" button

## 2. Invite Users with Admin Role

### Option 1: Using the Netlify Dashboard

1. After enabling Identity, go to the Identity tab in your site dashboard
2. Click **Invite users**
3. Enter the email address of the user you want to invite
4. After the user accepts the invitation, go to the Identity tab again
5. Click on the user's name
6. Under **Roles**, add the role `admin`
7. Save changes

### Option 2: Using the Provided Script

We've created a script to help you invite users with admin roles:

1. Make sure you have Node.js installed
2. Install the required dependency:
   ```
   npm install node-fetch --save-dev
   ```
3. Run the script with your Netlify API token:
   ```
   node scripts/invite-admin.mjs YOUR_API_TOKEN
   ```
4. Enter the email address when prompted

## 3. Configure Your CMS

The CMS is already configured to use role-based access. The `config.yml` file has been updated to:

1. Use git-gateway backend with proper Netlify Identity integration
2. Specify accepted roles: Only users with `admin` or `editor` roles can access the CMS
3. Set collection-specific permissions:
   - Only `admin` users can create and delete blog posts
   - Both `admin` and `editor` users can update existing posts

## 4. Testing Your Setup

After setting up roles:
1. Log out and log back in to your site
2. Visit `/admin` to access the CMS
3. You should now have access to create blog posts based on your role

## Troubleshooting

If you encounter issues:
1. Make sure Identity is enabled in your Netlify dashboard
2. Check that the user has accepted the invitation
3. Verify that the user has the correct role assigned
4. Ensure your site is deployed with the latest changes to the CMS configuration
