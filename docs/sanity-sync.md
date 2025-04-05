# Keeping Your Website in Sync with Sanity CMS

This document explains how to ensure your WH Pubs website stays up to date with content changes made in Sanity CMS.

## Understanding the Issue

The WH Pubs website is built using Astro, which generates static HTML pages at build time. This means that when you publish new content in Sanity (like a new blog post), you need to trigger a new build of the website for that content to appear on the live site.

## Solution: Manual Rebuild and Redeploy

The simplest way to update your site after adding new content in Sanity is to manually rebuild and redeploy:

1. Open your terminal
2. Navigate to your project directory
3. Run the following commands:

```bash
npm run build
netlify deploy --prod
```

This will:
- Rebuild your site with the latest content from Sanity
- Deploy the updated site to Netlify

## Automated Solution: Netlify Build Hooks

For a more automated approach, you can use Netlify Build Hooks to trigger a rebuild whenever content changes in Sanity:

### Step 1: Create a Netlify Build Hook

1. Log in to your Netlify account
2. Go to your site's dashboard
3. Navigate to Site settings > Build & deploy > Build hooks
4. Click "Add build hook"
5. Name it something like "Sanity Content Update"
6. Select the branch to build (usually "main")
7. Copy the generated URL

### Step 2: Update the Redeploy Script

1. Open the `redeploy.js` file in your project
2. Replace `YOUR_BUILD_HOOK_ID` with the ID from the URL you copied (the part after `/build_hooks/`)

### Step 3: Set Up a Sanity Webhook (Option 1)

If you have access to the Sanity management interface:

1. Go to your Sanity project dashboard
2. Navigate to API > Webhooks
3. Create a new webhook
4. Set the URL to your Netlify build hook URL
5. Configure it to trigger on document publish events

### Step 4: Manual Trigger (Option 2)

If you don't have access to set up Sanity webhooks, you can manually trigger the rebuild:

```bash
node redeploy.js
```

Run this command whenever you publish new content in Sanity.

## Recent Improvements Made

We've made the following improvements to ensure your site stays up to date with Sanity:

1. **Disabled CDN Caching**: Updated the Sanity client to always fetch fresh data:
   ```javascript
   useCdn: false, // Set to false to ensure fresh data
   ```

2. **Improved Blog Index**: Modified the blog index page to fetch all posts instead of just posts for a specific site.

3. **Enhanced Dynamic Paths**: Updated the blog post template to use `getAllPosts()` for generating paths, ensuring all posts are included.

4. **Created Redeploy Script**: Added a simple Node.js script that can trigger a Netlify rebuild.

## Best Practices

1. **Regular Rebuilds**: If you frequently update content, consider setting up a scheduled rebuild using a service like GitHub Actions or IFTTT.

2. **Test Locally**: Before deploying, you can test your changes locally with `npm run dev` to make sure everything looks correct.

3. **Check Build Logs**: If content isn't appearing, check the Netlify build logs for any errors.

## Troubleshooting

If your new content isn't appearing after a rebuild:

1. **Check Sanity Studio**: Make sure the content is published (not just drafted)
2. **Verify Content Queries**: Ensure your Sanity queries are fetching the right content
3. **Clear Browser Cache**: Sometimes browsers cache old pages; try a hard refresh (Ctrl+F5)
4. **Check Site Permissions**: Ensure the content is assigned to the correct site in Sanity
5. **Inspect Network Requests**: Use browser dev tools to check if the Sanity API is being called correctly
