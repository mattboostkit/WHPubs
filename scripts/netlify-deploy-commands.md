# Netlify Build Commands for Each Pub Site

## URGENT: Fix Build Commands NOW

Each pub site needs its own build command to pull the correct content. Here are the exact commands to set in each Netlify site:

## Build Commands by Site

### whpubs-thebull.netlify.app
```bash
TARGET_PUB_SLUG=the-bull-otford npm run build
```

### whpubs-thelittlebrownjug.netlify.app  
```bash
TARGET_PUB_SLUG=the-little-brown-jug npm run build
```

### whpubs-theroseandcrown.netlify.app
```bash
TARGET_PUB_SLUG=the-rose-and-crown npm run build
```

### whpubs-thecricketersinn.netlify.app
```bash
TARGET_PUB_SLUG=the-cricketers-inn npm run build
```

### whpubs-thechaserinn.netlify.app
```bash
TARGET_PUB_SLUG=the-chaser-inn npm run build
```

### whpubsadmin.netlify.app (Main Hub Site)
```bash
npm run build
```
(No TARGET_PUB_SLUG for main site)

## How to Update Each Site

For **each pub site**:

1. **Go to Netlify Dashboard**
   - Visit https://app.netlify.com
   - Select the pub site (e.g., whpubs-thebull)

2. **Update Build Settings**
   - Go to: **Site configuration** → **Build & deploy** → **Continuous deployment**
   - Find **Build settings** section
   - Change **Build command** to the appropriate command above
   - Ensure **Publish directory** is set to: `dist`
   - Click **Save**

3. **Trigger Immediate Rebuild**
   - Go to: **Deploys** tab
   - Click **Trigger deploy** button
   - Select **Deploy site**
   - Wait 2-3 minutes for build to complete

4. **Verify Fix**
   - Visit the pub site URL
   - Check that hero buttons work correctly
   - Verify "Book a Table" links work
   - Confirm no 404 errors

## Environment Variables Needed

Each site also needs these environment variables (if not already set):

```
SANITY_PROJECT_ID=it7wwto3
SANITY_DATASET=production
```

Add these in: **Site configuration** → **Environment variables**

## Expected Results

After updating build commands:
- ✅ The Bull site shows "Book a Table" (not "Explore More")
- ✅ All booking links work without 404 errors  
- ✅ Each pub shows only its own content
- ✅ No cross-contamination between pub sites
- ✅ Sanity changes sync properly to each site

## Priority Order

Fix in this order for maximum impact:
1. **The Bull** (user reported issue)
2. **Little Brown Jug** 
3. **Rose and Crown**
4. **Cricketers Inn**
5. **Chaser Inn**

## Verification Checklist

For each site after rebuild:
- [ ] Hero button says "Book a Table" (not "Explore More")
- [ ] Hero button links to working booking page
- [ ] Navigation "Book a Table" CTA works
- [ ] No 404 errors on booking pages
- [ ] Pub-specific content displays correctly
- [ ] No content from other pubs appears

This will fix the immediate issue where all pub sites are showing generic/wrong content instead of their pub-specific data from Sanity.