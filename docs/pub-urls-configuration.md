# Pub URLs Configuration

## Overview

This document explains how pub URLs are configured and managed in the WH Pubs project.

## Current Pub URLs

The following Netlify URLs are configured for each pub:

| Pub Name | Slug | Netlify URL |
|----------|------|-------------|
| The Bull | `the-bull` | https://whpubs-thebull.netlify.app |
| The Chaser Inn | `the-chaser-inn` | https://whpubs-thechaserinn.netlify.app |
| The Rose and Crown | `the-rose-and-crown` | https://whpubs-theroseandcrown.netlify.app |
| The Cricketers Inn | `the-cricketers-inn` | https://whpubs-thecricketersinn.netlify.app |
| The Little Brown Jug | `the-little-brown-jug` | https://whpubs-thelittlebrownjug.netlify.app |

## URL Configuration System

### 1. Frontend Configuration

The file `src/lib/pub-urls.js` contains the URL mappings:

```javascript
export const pubUrls = {
  'the-bull': 'https://whpubs-thebull.netlify.app',
  'the-chaser-inn': 'https://whpubs-thechaserinn.netlify.app',
  // ... etc
};
```

This configuration is used by:
- `PubCard.astro` component
- Homepage pub listings
- Any other component that needs to link to pub sites

### 2. Sanity CMS Configuration

Pubs can have an `externalDomain` field in Sanity that overrides the default URL mapping. This allows for:
- Custom domains when pubs get their own domain names
- Temporary URL changes during development
- Easy updates without code changes

### 3. URL Priority

The system uses this priority order:
1. **Custom domain from Sanity** (`externalDomain` field)
2. **Netlify URL from configuration** (based on slug)
3. **Internal page fallback** (`/[slug]`)

## Updating URLs

### Method 1: Update in Sanity Studio

1. Go to https://whpubs.sanity.studio
2. Navigate to "Manage Your Pubs"
3. Select the pub to update
4. Update the "External Domain" field
5. Publish changes

### Method 2: Bulk Update via Script

Run the update script to set all Netlify URLs:

```bash
cd wh-pubs
SANITY_TOKEN=your_token npm run update-pub-urls
```

### Method 3: Update Configuration File

1. Edit `src/lib/pub-urls.js`
2. Update the URL for the specific pub
3. Commit and deploy changes

## When Domains Change

When moving from Netlify URLs to custom domains:

1. **Update DNS** - Point custom domain to Netlify
2. **Update Netlify** - Add custom domain in site settings
3. **Update Configuration** - Either:
   - Update `externalDomain` in Sanity Studio, or
   - Update `src/lib/pub-urls.js` configuration
4. **Test** - Verify all links work correctly

## Building Individual Pub Sites

To build a site for a specific pub:

```bash
TARGET_PUB_SLUG=the-bull npm run build
```

This creates a standalone site for that pub, ready for deployment.

## Troubleshooting

### Links Not Working

1. Check if the pub slug matches exactly in:
   - Sanity Studio
   - `pub-urls.js` configuration
   - Netlify site name

2. Verify the `externalDomain` field in Sanity

3. Clear browser cache and test again

### Wrong URL Being Used

The `getPubUrl()` function in `src/lib/pub-urls.js` determines which URL to use. Check:
- Is `externalDomain` set in Sanity?
- Is the slug correctly mapped in `pubUrls`?
- Is the fallback being used?

## Future Considerations

When transitioning to production domains:
1. Update this documentation
2. Update the `pub-urls.js` configuration
3. Consider using environment variables for domain configuration
4. Set up proper redirects from old URLs to new ones