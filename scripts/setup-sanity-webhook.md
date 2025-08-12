# Setting Up Automatic Rebuilds from Sanity to Netlify

Follow these steps to trigger automatic Netlify rebuilds when content is updated in Sanity Studio.

## Step 1: Get Your Netlify Build Hook URL

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site (whpubsadmin)
3. Go to **Site configuration** → **Build & deploy** → **Continuous deployment**
4. Scroll to **Build hooks**
5. Click **Add build hook**
6. Name it: `Sanity Content Update`
7. Branch: `main`
8. Click **Save**
9. Copy the webhook URL (it will look like: `https://api.netlify.com/build_hooks/YOUR_HOOK_ID`)

## Step 2: Add the Webhook to Sanity

### Option A: Via Sanity Studio Web Interface

1. Go to: https://www.sanity.io/manage
2. Select your project: **WH Pubs** (Project ID: it7wwto3)
3. Go to **API** → **Webhooks**
4. Click **Add webhook**
5. Configure:
   - **Name**: `Netlify Deploy`
   - **URL**: Paste your Netlify build hook URL
   - **Dataset**: `production`
   - **Trigger on**: Select all:
     - ✅ Create
     - ✅ Update
     - ✅ Delete
   - **Filter** (optional): Leave empty to trigger on all document changes
   - **Projection** (optional): Leave as `*`
   - **HTTP Method**: `POST`
6. Click **Save**

### Option B: Via Sanity CLI

1. First, make sure you're logged in:
```bash
cd wh-pubs
npx sanity login
```

2. Create the webhook:
```bash
npx sanity hook create \
  --dataset production \
  --name "Netlify Deploy" \
  --url "YOUR_NETLIFY_BUILD_HOOK_URL" \
  --trigger create --trigger update --trigger delete
```

## Step 3: Test the Webhook

1. Go to Sanity Studio: https://whpubs.sanity.studio
2. Make a small change to any document
3. Publish the change
4. Check your Netlify dashboard - you should see a new build triggered
5. The build should complete in 1-2 minutes

## Step 4: (Optional) Add Multiple Webhooks for Different Environments

If you have staging or preview environments, you can add additional webhooks:

1. Create separate build hooks in Netlify for each environment
2. Add each as a separate webhook in Sanity
3. Use filters to control which changes trigger which environment

## Webhook Filtering (Advanced)

To only trigger builds for specific document types, add a filter:

### Examples:

**Only trigger on pub changes:**
```
_type == "pub"
```

**Only trigger on pubs, events, and posts:**
```
_type in ["pub", "event", "post"]
```

**Exclude drafts:**
```
!(_id in path("drafts.**"))
```

## Monitoring Webhooks

### In Sanity:
- Go to **API** → **Webhooks** → Click on your webhook
- View the **Request log** to see recent triggers and responses

### In Netlify:
- Go to **Deploys** to see all builds
- Builds triggered by webhooks will show "Deploy triggered by hook: Sanity Content Update"

## Troubleshooting

### Webhook not triggering:
- Check the webhook is enabled in Sanity
- Verify the dataset matches (production)
- Check the Request log in Sanity for errors

### Build failing:
- Check Netlify build logs for errors
- Ensure environment variables are set correctly in Netlify
- Verify the build command works locally

### Too many builds:
- Add filters to the webhook to limit which changes trigger builds
- Consider batching updates in Sanity before publishing
- Use Netlify's build minute limits if needed

## Current Configuration

Your project details:
- **Sanity Project ID**: it7wwto3
- **Dataset**: production
- **Netlify Site**: whpubsadmin.netlify.app
- **Build Command**: npm run build
- **Publish Directory**: dist

## Build Performance Tips

1. **Incremental Static Regeneration**: Consider using Astro's ISR features for frequently changing content
2. **Build Cache**: Netlify caches dependencies between builds
3. **Optimize Images**: Use Sanity's image transformations to reduce build time
4. **Selective Rebuilds**: Use webhook filters to avoid unnecessary builds

## Alternative: Real-time Updates Without Rebuilds

For truly instant updates without rebuilds, consider:
1. Client-side data fetching for dynamic content
2. Edge functions for server-side rendering
3. Hybrid approach with static + dynamic content

---

After setting this up, any content changes in Sanity will automatically trigger a Netlify rebuild, and your site will update within 1-2 minutes of publishing changes.