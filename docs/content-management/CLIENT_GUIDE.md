# WH Pubs Website Management Guide

## For Content Editors

### Accessing Sanity Studio
1. Go to: **https://whpubs.sanity.studio**
2. Log in with your provided credentials
3. You'll see the content management dashboard

### Making Content Changes

#### Updating Signature Dishes
1. Click on **Homepage Settings** in the left menu
2. Scroll to **🍽️ Signature Dishes Section**
3. Edit any of the 4 dishes:
   - Click on a dish to expand it
   - Update the name, description, price, or image
   - Changes save automatically
4. Click **Publish** button (bottom right) to make changes live
5. Changes appear on the website within 1-2 minutes

#### Updating Pub Information
1. Click on **Pubs** in the left menu
2. Select the pub you want to edit
3. Update any information (opening hours, contact, description, etc.)
4. Click **Publish** to make changes live

#### Adding Events
1. Click on **Events** in the left menu
2. Click **+ Create new** button
3. Fill in event details
4. Select which pub (or leave blank for all pubs)
5. Click **Publish**

#### Managing Blog Posts
1. Click on **Posts** in the left menu
2. Create new or edit existing posts
3. Always click **Publish** to make changes live

### Important Notes
- **Always click Publish**: Changes won't appear on the website until you click the Publish button
- **Images**: Recommended sizes are shown in each image field
- **No technical knowledge needed**: You don't need to know any code or use Git
- **Instant updates**: Published changes appear on the website within 1-2 minutes

### Troubleshooting

#### "Unknown fields found" Error
If you see this error, contact your developer to deploy the latest schema updates. This is a one-time fix.

#### Changes Not Appearing
1. Make sure you clicked **Publish** (not just Save)
2. Wait 1-2 minutes for changes to propagate
3. Clear your browser cache (Ctrl+F5 on Windows, Cmd+Shift+R on Mac)

#### Can't Log In
- Check you're using the correct URL: https://whpubs.sanity.studio
- Ensure you're using the right email/password
- Contact your administrator for password reset

### Support Contacts
- Technical Support: [Your contact details]
- Sanity Studio Issues: [Developer contact]

---

## For Developers (One-Time Setup)

### Deploying Schema Changes
When schema changes are made locally, deploy them once:

```bash
cd wh-pubs
npx sanity login
npm run deploy
```

This updates the hosted Sanity Studio at https://whpubs.sanity.studio

### Environment Variables
Ensure these are set in Netlify:
- `SANITY_PROJECT_ID`: it7wwto3
- `SANITY_DATASET`: production

### Webhook Setup (Optional but Recommended)
To trigger automatic Netlify rebuilds when content changes:

1. In Sanity Studio, go to API → Webhooks
2. Add webhook URL: `https://api.netlify.com/build_hooks/[YOUR_BUILD_HOOK_ID]`
3. Set it to trigger on: Create, Update, Delete

This ensures the website rebuilds automatically when content is published.