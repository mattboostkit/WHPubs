# Setting Up Automatic Rebuilds

When you update content in Sanity, your Netlify sites need to be rebuilt to show the changes. Here's how to set up automatic rebuilds:

## Method 1: Netlify Build Hooks (Recommended)

### Step 1: Create Build Hooks in Netlify

For each of your sites, create a build hook:

1. **Main Hub Site** (whpubsadmin):
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Select your site "whpubsadmin"
   - Go to Site settings → Build & deploy → Build hooks
   - Click "Add build hook"
   - Name it "Sanity Content Update"
   - Copy the webhook URL (looks like: `https://api.netlify.com/build_hooks/xxxxx`)

2. **Repeat for each pub site**:
   - whpubs-thelittlebrownjug
   - whpubs-thecricketersinn
   - whpubs-theroseandcrown
   - whpubs-thechaserinn
   - whpubs-thebull

### Step 2: Set Up Sanity Webhooks

1. Go to [Sanity Management](https://www.sanity.io/manage)
2. Select your project (WH Pubs)
3. Go to API → Webhooks
4. Click "Create Webhook"

#### For Main Hub Updates:
- **Name**: "Rebuild Main Site"
- **URL**: Your main site's build hook URL
- **Dataset**: production
- **Trigger on**: Create, Update, Delete
- **Filter**: Leave empty (triggers on all content)
- **HTTP Method**: POST

#### For Individual Pub Updates:
Create a webhook for each pub that rebuilds only that pub's site:

- **Name**: "Rebuild The Little Brown Jug"
- **URL**: The Little Brown Jug's build hook URL
- **Dataset**: production
- **Trigger on**: Create, Update, Delete
- **Filter**: `_type == "pub" && slug.current == "the-little-brown-jug"`
- **HTTP Method**: POST

Repeat for each pub with their specific slug.

## Method 2: Manual Trigger Script

Create a script to manually trigger all rebuilds:

```javascript
// scripts/rebuild-all-sites.js
const buildHooks = {
  'main': 'YOUR_MAIN_SITE_BUILD_HOOK',
  'the-bull': 'YOUR_BULL_BUILD_HOOK',
  'the-chaser-inn': 'YOUR_CHASER_BUILD_HOOK',
  'the-rose-and-crown': 'YOUR_ROSE_BUILD_HOOK',
  'the-cricketers-inn': 'YOUR_CRICKETERS_BUILD_HOOK',
  'the-little-brown-jug': 'YOUR_BROWN_JUG_BUILD_HOOK'
};

async function rebuildSite(name, url) {
  console.log(`Triggering rebuild for ${name}...`);
  try {
    const response = await fetch(url, { method: 'POST' });
    if (response.ok) {
      console.log(`✅ ${name} rebuild triggered successfully`);
    } else {
      console.error(`❌ Failed to trigger ${name} rebuild: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`❌ Error triggering ${name} rebuild:`, error);
  }
}

async function rebuildAll() {
  for (const [name, url] of Object.entries(buildHooks)) {
    await rebuildSite(name, url);
  }
}

// Run with: node scripts/rebuild-all-sites.js
rebuildAll();
```

## Method 3: GitHub Actions (Alternative)

If you prefer, you can set up a GitHub Action that rebuilds sites when you push changes:

```yaml
# .github/workflows/rebuild-sites.yml
name: Rebuild Netlify Sites

on:
  workflow_dispatch: # Manual trigger
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours

jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Netlify Builds
        run: |
          curl -X POST ${{ secrets.NETLIFY_MAIN_HOOK }}
          curl -X POST ${{ secrets.NETLIFY_BULL_HOOK }}
          curl -X POST ${{ secrets.NETLIFY_CHASER_HOOK }}
          # Add more as needed
```

## Best Practices

1. **Don't rebuild too frequently** - Netlify has build minute limits
2. **Use filtered webhooks** - Only rebuild sites when their content changes
3. **Monitor build usage** - Check Netlify dashboard for build minutes used
4. **Consider caching** - Current setup caches images for 1 year, which is good

## Current Cache Settings

Your `netlify.toml` has these cache settings:
- Images: 1 year cache
- CSS/JS: 1 year cache
- HTML: No cache (always fresh)

This is optimal for a static site with build hooks.

## Troubleshooting

If images still don't update after rebuild:
1. Clear your browser cache (Ctrl+Shift+R)
2. Check the Netlify build logs for errors
3. Verify the image URL in Sanity Studio
4. Check if the build is using the correct environment variables