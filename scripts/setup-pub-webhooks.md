# Setting Up Individual Pub Site Webhooks

## Problem
All pub sites are currently deploying with the main site content instead of their individual pub-specific content. Each pub needs its own deployment configuration.

## Solution Overview
Each pub site needs:
1. **Custom Netlify build command** with `TARGET_PUB_SLUG` environment variable
2. **Individual webhook** in Sanity for pub-specific content changes
3. **Separate deploy hooks** in Netlify for each site

## Step 1: Configure Each Pub Site in Netlify

For **each of the 5 pub sites**, update their Netlify configuration:

### The Bull (whpubs-thebull.netlify.app)
1. Go to Netlify dashboard → whpubs-thebull site
2. **Site configuration** → **Build & deploy** → **Continuous deployment**
3. **Build settings**:
   - **Build command**: `TARGET_PUB_SLUG=the-bull-otford npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)

### The Little Brown Jug (whpubs-thelittlebrownjug.netlify.app)
1. Go to Netlify dashboard → whpubs-thelittlebrownjug site
2. **Build settings**:
   - **Build command**: `TARGET_PUB_SLUG=the-little-brown-jug npm run build`
   - **Publish directory**: `dist`

### The Rose and Crown (whpubs-theroseandcrown.netlify.app)
1. Go to Netlify dashboard → whpubs-theroseandcrown site
2. **Build settings**:
   - **Build command**: `TARGET_PUB_SLUG=the-rose-and-crown npm run build`
   - **Publish directory**: `dist`

### The Cricketers Inn (whpubs-thecricketersinn.netlify.app)
1. Go to Netlify dashboard → whpubs-thecricketersinn site
2. **Build settings**:
   - **Build command**: `TARGET_PUB_SLUG=the-cricketers-inn npm run build`
   - **Publish directory**: `dist`

### The Chaser Inn (whpubs-thechaserinn.netlify.app)
1. Go to Netlify dashboard → whpubs-thechaserinn site
2. **Build settings**:
   - **Build command**: `TARGET_PUB_SLUG=the-chaser-inn npm run build`
   - **Publish directory**: `dist`

## Step 2: Set Up Environment Variables

For **each pub site**, add these environment variables in Netlify:

### All Sites Need:
```
SANITY_PROJECT_ID=it7wwto3
SANITY_DATASET=production
```

### Site-Specific:
- **Bull**: `TARGET_PUB_SLUG=the-bull-otford`
- **Little Brown Jug**: `TARGET_PUB_SLUG=the-little-brown-jug`
- **Rose and Crown**: `TARGET_PUB_SLUG=the-rose-and-crown`
- **Cricketers Inn**: `TARGET_PUB_SLUG=the-cricketers-inn`
- **Chaser Inn**: `TARGET_PUB_SLUG=the-chaser-inn`

## Step 3: Create Individual Build Hooks

For **each pub site**:

1. Go to **Site configuration** → **Build & deploy** → **Build hooks**
2. Click **Add build hook**
3. Name: `Sanity Content Update - [PUB_NAME]`
4. Branch: `main`
5. Click **Save**
6. **Copy the webhook URL** for each site

You'll get 5 webhook URLs like:
- Bull: `https://api.netlify.com/build_hooks/BULL_HOOK_ID`
- Little Brown Jug: `https://api.netlify.com/build_hooks/LBJ_HOOK_ID`
- Rose and Crown: `https://api.netlify.com/build_hooks/RC_HOOK_ID`
- Cricketers Inn: `https://api.netlify.com/build_hooks/CI_HOOK_ID`
- Chaser Inn: `https://api.netlify.com/build_hooks/CHI_HOOK_ID`

## Step 4: Set Up Pub-Specific Webhooks in Sanity

Go to [Sanity Webhooks](https://www.sanity.io/manage/personal/project/it7wwto3/api/webhooks) and create **5 separate webhooks**:

### The Bull Webhook
- **Name**: `The Bull - Netlify Deploy`
- **URL**: `https://api.netlify.com/build_hooks/BULL_HOOK_ID`
- **Dataset**: `production`
- **Trigger on**: Create, Update, Delete
- **Filter**: `_type == "pub" && slug.current == "the-bull-otford" || _type in ["pubHighlights", "menu", "event"] && pub->slug.current == "the-bull-otford"`

### The Little Brown Jug Webhook
- **Name**: `Little Brown Jug - Netlify Deploy`
- **URL**: `https://api.netlify.com/build_hooks/LBJ_HOOK_ID`
- **Filter**: `_type == "pub" && slug.current == "the-little-brown-jug" || _type in ["pubHighlights", "menu", "event"] && pub->slug.current == "the-little-brown-jug"`

### The Rose and Crown Webhook
- **Name**: `Rose and Crown - Netlify Deploy`
- **URL**: `https://api.netlify.com/build_hooks/RC_HOOK_ID`
- **Filter**: `_type == "pub" && slug.current == "the-rose-and-crown" || _type in ["pubHighlights", "menu", "event"] && pub->slug.current == "the-rose-and-crown"`

### The Cricketers Inn Webhook
- **Name**: `Cricketers Inn - Netlify Deploy`
- **URL**: `https://api.netlify.com/build_hooks/CI_HOOK_ID`
- **Filter**: `_type == "pub" && slug.current == "the-cricketers-inn" || _type in ["pubHighlights", "menu", "event"] && pub->slug.current == "the-cricketers-inn"`

### The Chaser Inn Webhook
- **Name**: `Chaser Inn - Netlify Deploy`
- **URL**: `https://api.netlify.com/build_hooks/CHI_HOOK_ID`
- **Filter**: `_type == "pub" && slug.current == "the-chaser-inn" || _type in ["pubHighlights", "menu", "event"] && pub->slug.current == "the-chaser-inn"`

## Step 5: Trigger Initial Rebuilds

**IMMEDIATELY** after setting up the build commands, trigger a manual rebuild for each site:

1. Go to each pub's Netlify dashboard
2. Click **Deploys** → **Trigger deploy** → **Deploy site**
3. This will use the new build command with the correct `TARGET_PUB_SLUG`

## Step 6: Test the Setup

1. Go to [Sanity Studio](https://whpubs.sanity.studio)
2. Edit The Bull's hero overlay text
3. Publish the change
4. Check that **only The Bull site** rebuilds (not all sites)
5. Verify the change appears on whpubs-thebull.netlify.app

## Expected Results

After this setup:
- ✅ Each pub site builds with its own content only
- ✅ Sanity changes trigger rebuilds for relevant pub sites only
- ✅ The Bull site will show "Book a Table" instead of "Explore More"
- ✅ All book-a-table links will work correctly
- ✅ No more cross-site contamination

## Quick Fix for Immediate Issue

**RIGHT NOW** to fix The Bull site:

1. Go to whpubs-thebull.netlify.app Netlify dashboard
2. **Site configuration** → **Build & deploy** → **Continuous deployment**
3. Change **Build command** to: `TARGET_PUB_SLUG=the-bull-otford npm run build`
4. Click **Save**
5. Go to **Deploys** → **Trigger deploy** → **Deploy site**
6. Wait 2-3 minutes for rebuild
7. Check whpubs-thebull.netlify.app - should now show correct content

## Monitoring

Each pub site will now:
- Build independently with correct content
- Deploy only when their specific content changes
- Show their own unique data from Sanity
- Have working navigation and CTAs