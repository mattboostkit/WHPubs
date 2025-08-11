# Netlify Deployment Guide for WH Pubs

## Overview
This guide covers deploying both the main WH Pubs hub site and individual pub sites to Netlify.

## Prerequisites
- GitHub account with access to the repository
- Netlify account (free tier is sufficient to start)
- Access to Sanity project (ID: it7wwto3)

## Part 1: Deploying the Main Hub Site

### Step 1: Import Project to Netlify
1. Log into [Netlify](https://app.netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select the `WHPubs` repository
5. Grant Netlify permissions if prompted

### Step 2: Configure Build Settings
**Basic build settings:**
```
Base directory: (leave empty)
Build command: npm run build
Publish directory: dist
```

### Step 3: Set Environment Variables
Navigate to Site settings > Environment variables and add:

```bash
SANITY_PROJECT_ID = it7wwto3
SANITY_DATASET = production
GA_MEASUREMENT_ID = G-XXXXXXXXXX  # Optional: Your GA ID
```

### Step 4: Deploy
1. Click "Deploy site"
2. Wait for build to complete (3-5 minutes)
3. Access your site at the provided Netlify URL

### Step 5: Configure Custom Domain
1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `whpubs.co.uk`)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Netlify)

## Part 2: Deploying Individual Pub Sites

Each pub needs its own Netlify site with specific build configuration.

### The Bull (Otford)

#### Create New Site
1. In Netlify, click "Add new site"
2. Import the same GitHub repository
3. Configure build settings:

```
Build command: TARGET_PUB_SLUG=the-bull-otford npm run build
Publish directory: dist
```

#### Environment Variables
```bash
SANITY_PROJECT_ID = it7wwto3
SANITY_DATASET = production
TARGET_PUB_SLUG = the-bull-otford
GA_MEASUREMENT_ID = G-BULL123  # Optional: Separate tracking
```

### The Chaser Inn

```
Build command: TARGET_PUB_SLUG=the-chaser-inn npm run build
Environment: TARGET_PUB_SLUG = the-chaser-inn
```

### The Crown

```
Build command: TARGET_PUB_SLUG=the-crown npm run build
Environment: TARGET_PUB_SLUG = the-crown
```

### The Halfway House

```
Build command: TARGET_PUB_SLUG=the-halfway-house npm run build
Environment: TARGET_PUB_SLUG = the-halfway-house
```

### The Rising Sun

```
Build command: TARGET_PUB_SLUG=the-rising-sun npm run build
Environment: TARGET_PUB_SLUG = the-rising-sun
```

## Part 3: Continuous Deployment

### Automatic Deployments
By default, Netlify will:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests

### Deploy Hooks (For CMS Updates)
1. Go to Site settings > Build & deploy > Build hooks
2. Create a build hook named "Sanity"
3. Copy the webhook URL
4. In Sanity Studio:
   - Go to Settings > Webhooks
   - Add the Netlify webhook URL
   - Select events to trigger rebuilds

### Manual Deployments
1. In Netlify dashboard, go to Deploys
2. Click "Trigger deploy" > "Deploy site"

## Part 4: Form Configuration

### Enable Form Detection
1. Forms are automatically detected via `data-netlify="true"`
2. Go to Site settings > Forms
3. Configure notifications:
   - Email notifications
   - Slack/Webhook integrations

### Form Submissions
- View submissions: Forms > Active forms
- Export data: Click form name > Download CSV
- Configure spam filtering if needed

## Part 5: Performance Optimization

### Enable Asset Optimization
Site settings > Build & deploy > Post processing:
- ✅ Bundle CSS
- ✅ Minify CSS
- ✅ Bundle JS
- ✅ Minify JS
- ✅ Compress images
- ✅ Pretty URLs

### Caching Headers
Already configured in `netlify.toml`:
```toml
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Part 6: Monitoring & Maintenance

### Analytics
1. Enable Netlify Analytics (paid feature) or
2. Use Google Analytics with `GA_MEASUREMENT_ID`

### Build Notifications
Site settings > Build & deploy > Deploy notifications:
- Failed build emails
- Slack notifications
- Webhook integrations

### Build Minutes
- Free tier: 300 build minutes/month
- Each build takes ~3-5 minutes
- Monitor usage in Team settings

## Part 7: Troubleshooting

### Build Failures

#### Node Version Issues
Add to `netlify.toml`:
```toml
[build.environment]
  NODE_VERSION = "18"
```

#### Memory Issues
```toml
[build.environment]
  NODE_OPTIONS = "--max_old_space_size=4096"
```

### Content Not Updating
1. Check Sanity webhook is configured
2. Manually trigger rebuild
3. Clear build cache: Deploys > Trigger deploy > Clear cache and deploy

### Forms Not Working
1. Ensure `data-netlify="true"` is present
2. Check form name attribute matches
3. Verify in Forms section of dashboard

## Part 8: Advanced Configuration

### Branch Deploys
```toml
[build]
  base = ""
  publish = "dist"
  command = "npm run build"

[context.production]
  environment = { SANITY_DATASET = "production" }

[context.staging]
  environment = { SANITY_DATASET = "staging" }
```

### Redirects
Add to `public/_redirects`:
```
/old-menu  /menu  301
/pub/the-bull  /the-bull-otford  301
```

### Headers
Custom headers in `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

## Part 9: DNS Configuration

### For Main Domain
1. Add A record: `@` → `75.2.60.5`
2. Add CNAME: `www` → `[your-site].netlify.app`

### For Subdomains (Pub Sites)
1. Add CNAME: `bull` → `[bull-site].netlify.app`
2. Add CNAME: `chaser` → `[chaser-site].netlify.app`

## Part 10: SSL Certificates

### Automatic HTTPS
- Netlify provides free SSL certificates
- Auto-renewed via Let's Encrypt
- No configuration needed

### Custom Certificates
1. Site settings > Domain management > HTTPS
2. Upload custom certificate if required

## Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Build command correct
- [ ] Publish directory set to `dist`
- [ ] GitHub connection authorized

### Post-Deployment
- [ ] Site loads correctly
- [ ] Forms submissions working
- [ ] Images loading
- [ ] Navigation functioning
- [ ] Mobile responsive
- [ ] SSL certificate active

### For Each Pub Site
- [ ] TARGET_PUB_SLUG set correctly
- [ ] Custom domain configured
- [ ] Analytics separated (if needed)
- [ ] Content filtering working

## Support Resources

### Netlify Documentation
- [Docs](https://docs.netlify.com)
- [Support Forum](https://answers.netlify.com)
- [Status Page](https://www.netlifystatus.com)

### Build Debugging
- View build logs in Deploys section
- Use `console.log` in build scripts
- Check environment variables are set

### Contact Support
- Free tier: Community forum
- Paid tiers: Priority support

## Cost Considerations

### Free Tier Includes
- 100GB bandwidth/month
- 300 build minutes/month
- Serverless functions (125k requests)
- Form submissions (100/month)

### When to Upgrade
- High traffic (>100GB bandwidth)
- Many builds (>60-100 per month)
- More form submissions needed
- Analytics required
- Team collaboration features

---

*Last Updated: January 2025*
*For latest Netlify features, check [netlify.com/changelog](https://www.netlify.com/changelog/)*