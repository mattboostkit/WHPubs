# WH Pubs Deployment Guide

This guide explains how to deploy all 6 WH Pubs websites on Netlify.

## Overview

The WH Pubs project consists of:
1. **Main Hub Site** - The central WH Pubs website
2. **5 Individual Pub Sites** - Separate websites for each pub

All sites use the same codebase but are configured differently using environment variables.

## Site URLs

### Main Hub Site
- **URL**: https://whpubsadmin.netlify.app/
- **Purpose**: Central site showcasing all pubs

### Individual Pub Sites
1. **The Bull**: https://whpubs-thebull.netlify.app/
2. **The Chaser Inn**: https://whpubs-thechaserinn.netlify.app/
3. **The Cricketers Inn**: https://whpubs-thecricketersinn.netlify.app/
4. **The Little Brown Jug**: https://whpubs-thelittlebrownjug.netlify.app/
5. **The Rose and Crown**: https://whpubs-theroseandcrown.netlify.app/

## Deployment Instructions

### 1. Main Hub Site (Already Deployed)

The main site is already deployed at https://whpubsadmin.netlify.app/

**Environment Variables**:
```
SANITY_PROJECT_ID=it7wwto3
SANITY_DATASET=production
```

### 2. Individual Pub Sites

For each pub, create a new Netlify site:

#### Step-by-Step for Each Pub:

1. **Create New Netlify Site**
   - Go to Netlify Dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select the WHPubs repository

2. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)

3. **Add Environment Variables**
   
   For each pub, add these environment variables:

   #### The Bull
   ```
   SANITY_PROJECT_ID=it7wwto3
   SANITY_DATASET=production
   TARGET_PUB_SLUG=the-bull
   ```

   #### The Chaser Inn
   ```
   SANITY_PROJECT_ID=it7wwto3
   SANITY_DATASET=production
   TARGET_PUB_SLUG=the-chaser-inn
   ```

   #### The Cricketers Inn
   ```
   SANITY_PROJECT_ID=it7wwto3
   SANITY_DATASET=production
   TARGET_PUB_SLUG=the-cricketers-inn
   ```

   #### The Little Brown Jug
   ```
   SANITY_PROJECT_ID=it7wwto3
   SANITY_DATASET=production
   TARGET_PUB_SLUG=the-little-brown-jug
   ```

   #### The Rose and Crown
   ```
   SANITY_PROJECT_ID=it7wwto3
   SANITY_DATASET=production
   TARGET_PUB_SLUG=the-rose-and-crown
   ```

4. **Update Site Name**
   - In Netlify → Site configuration → Change site name
   - Use the names listed above (e.g., `whpubs-thebull`)

5. **Deploy**
   - Trigger a deploy for each site
   - The build process will automatically:
     - Build only that pub's page
     - Move it to the root of the site
     - Apply pub-specific branding

## How It Works

The `TARGET_PUB_SLUG` environment variable tells the build system which pub to build:
- When set, it builds only that pub's page and moves it to the site root
- When not set, it builds the full hub site with all pubs

The build script in `package.json` handles this automatically:
```bash
astro build && if [ ! -z "$TARGET_PUB_SLUG" ]; then 
  echo "Moving pub page to root..."; 
  mv dist/$TARGET_PUB_SLUG/index.html dist/index.html && 
  rm -rf dist/$TARGET_PUB_SLUG; 
else 
  echo "Hub build, keeping index.html."; 
fi
```

## Important Notes

1. **All pub links are external** - The main hub site links to the individual pub sites
2. **Content is shared** - All sites pull from the same Sanity dataset
3. **Pub-specific content** - Each pub site only shows its own:
   - Events
   - Menus
   - Blog posts (if pub-specific)
   - Things To Do activities
4. **Branding** - Each pub site uses its own:
   - Logo
   - Colors (if configured)
   - Navigation links
   - Social media links

## Webhook Configuration

To enable automatic rebuilds when content changes in Sanity:

1. In each Netlify site → Site configuration → Build hooks
2. Create a new build hook named "Sanity"
3. Copy the webhook URL
4. In Sanity Studio → Settings → Webhooks
5. Add the webhook URL for each site

## Custom Domains (Future)

When ready to use custom domains:
1. Update the domain in Netlify
2. Update `src/lib/pub-urls.js` with the new domains
3. Update any `externalDomain` fields in Sanity if needed

## Monitoring

- Check Netlify dashboard for build status
- Use Netlify Analytics to monitor traffic
- Set up uptime monitoring for each domain

---

Last updated: January 2, 2025