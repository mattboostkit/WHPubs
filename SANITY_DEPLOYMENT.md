# Sanity Deployment Guide

This guide explains how to use the automated Sanity deployment scripts for WH Pubs.

## Quick Start

### First Time Setup
1. **Login to Sanity** (only needed once):
   ```bash
   npm run sanity:login
   ```
   Choose your authentication method (Google, GitHub, or Email)

2. **Check your status**:
   ```bash
   npm run sanity:check
   ```
   This will show you if you're authenticated and ready to deploy

3. **Deploy Sanity Studio**:
   ```bash
   npm run sanity:deploy
   ```
   This will build and deploy your Sanity Studio with all schema changes

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run sanity:check` | Check authentication status and project info |
| `npm run sanity:login` | Login to Sanity (interactive) |
| `npm run sanity:deploy` | Build and deploy Sanity Studio |
| `npm run sanity:dev` | Start Sanity Studio locally (localhost:3333) |
| `npm run deploy:all` | Build frontend AND deploy Sanity Studio |

## Deployment Workflow

### When to Deploy Sanity Studio

You need to deploy Sanity Studio when you:
- Add new fields to schemas (like we just did with specialFeatures)
- Create new document types
- Change field validations or configurations
- Update the studio configuration

### Automatic Deployment Process

The `npm run sanity:deploy` script will:
1. ✅ Check if you're in the right directory
2. ✅ Verify you're authenticated with Sanity
3. ✅ Build the Sanity Studio
4. ✅ Deploy to production at https://whpubs.sanity.studio

### Manual Steps Still Required

After deployment:
1. **Add content in Sanity Studio**:
   - Go to https://whpubs.sanity.studio
   - Navigate to Homepage Settings
   - Add your images and content

2. **Trigger frontend rebuild**:
   - Either push code changes to GitHub (auto-deploys via Netlify)
   - Or manually trigger deploy in Netlify dashboard

## Troubleshooting

### "Not authenticated" error
Run `npm run sanity:login` and follow the prompts

### "Not in a Sanity project directory" error
Make sure you're in the project root or `wh-pubs` directory

### Changes not appearing on frontend
Remember: Sanity Studio deployment ≠ Frontend deployment
- Sanity Studio: Where you edit content
- Frontend: Where content is displayed (needs rebuild after content changes)

### Studio deployed but fields missing
Try hard refresh in browser (Ctrl+Shift+R or Cmd+Shift+R)

## Setting Up Automatic Frontend Rebuilds

To automatically rebuild your frontend when content changes:

1. **Create a Netlify Build Hook**:
   - Go to Netlify > Site Settings > Build & deploy > Build hooks
   - Create new hook named "sanity-rebuild"
   - Copy the webhook URL

2. **Add to Sanity Webhooks**:
   - Go to https://sanity.io/manage/project/it7wwto3/api/webhooks
   - Create webhook with Netlify URL
   - Select triggers: Create, Update, Delete

Now your frontend will auto-rebuild when content changes!

## Project URLs

- **Sanity Studio**: https://whpubs.sanity.studio
- **Frontend**: https://whpubsadmin.netlify.app
- **Sanity Manage**: https://sanity.io/manage/project/it7wwto3
- **Netlify Dashboard**: https://app.netlify.com

## Current Setup Status

✅ Automated deployment scripts created
✅ Status check script created
✅ Package.json updated with convenience scripts
✅ Documentation created

⚠️ **Next Step**: Run `npm run sanity:login` to authenticate, then `npm run sanity:deploy` to deploy your schema changes!