# Sanity Studio Access & Management Guide

## Studio Access URLs

### Production Studio
**URL**: https://whpubs.sanity.studio

### Local Development Studio
**URL**: http://localhost:3333
**Start Command**: `cd wh-pubs && npm run dev`

## Setting Up Client Access

### Step 1: Invite Users
1. Log into [Sanity Management](https://www.sanity.io/organizations/ou2Yw2hhu/project/it7wwto3)
2. Navigate to the "Members" tab
3. Click "Invite members"
4. Enter email addresses
5. Select appropriate role:
   - **Administrator**: Full access to content and settings
   - **Editor**: Can create and edit all content
   - **Viewer**: Read-only access

### Step 2: User Roles Explained

#### Administrator
- Create, edit, delete all content
- Manage user access
- Configure datasets
- Access API settings
- Deploy Studio updates

#### Editor
- Create and edit content
- Upload images
- Publish/unpublish content
- Cannot manage users or settings

#### Viewer
- View all content
- Cannot make changes
- Useful for stakeholders who need visibility

### Step 3: First-Time User Setup
When users receive their invitation:
1. Click the invitation link in email
2. Create a Sanity account (or login if existing)
3. Access the Studio at https://whpubs.sanity.studio
4. Start managing content immediately

## Content Management Basics

### Main Content Types

#### 1. Pubs
- Individual pub information
- Opening hours
- Location details
- Custom styling options
- External domain links

#### 2. Posts (Blog)
- News and updates
- Can be hub-wide or pub-specific
- Rich text editor with images
- SEO metadata

#### 3. Events
- Upcoming events
- Can be associated with specific pubs
- Date/time management
- Featured event options

#### 4. Menus
- Food and drink menus
- PDF uploads
- Pub-specific assignment
- Multiple menu types per pub

#### 5. Homepage
- Hero images and text
- Feature sections
- Welcome content
- Special offers

#### 6. Page Settings
- Hero images for main pages
- Meta descriptions
- Page-specific content

## Common Tasks

### Adding a New Blog Post
1. Click "Posts" in the sidebar
2. Click "Create new post"
3. Fill in:
   - Title
   - Slug (URL)
   - Content (rich text editor)
   - Main image
   - Associated pub (optional)
4. Click "Publish"

### Creating an Event
1. Navigate to "Events"
2. Click "Create new event"
3. Enter:
   - Event name
   - Date and time
   - Description
   - Associated pub
   - Event image
4. Toggle "Featured" if prominent
5. Publish

### Updating Pub Information
1. Select "Pubs" from menu
2. Choose the pub to edit
3. Update any fields:
   - Description
   - Opening hours
   - Contact details
   - Images
4. Save changes

### Managing Menus
1. Go to "Menus"
2. Select or create menu
3. Choose menu type:
   - Food Menu
   - Drinks Menu
   - Seasonal Menu
4. Upload PDF or enter items
5. Assign to pub
6. Publish

## Image Management

### Image Requirements
See image specifications in CLAUDE.md for exact dimensions:
- Hero images: 1920x768px
- Pub cards: 828x605px
- Event images: 2400x1200px
- Blog images: 1200x630px

### Uploading Images
1. Click the image field
2. Select "Upload" or "Select"
3. Choose file from computer
4. Add alt text (important for SEO)
5. Save

### Image Library
- All uploaded images are stored in the media library
- Reuse images across content
- Search by filename or alt text
- Delete unused images to save space

## Publishing Workflow

### Draft vs Published
- **Draft**: Work in progress, not visible on website
- **Published**: Live on the website

### Publishing Content
1. Create or edit content
2. Review all fields
3. Click "Publish" button
4. Content goes live immediately

### Scheduling (Not Available)
Note: Sanity doesn't have built-in scheduling. Content publishes immediately.

## Troubleshooting

### Can't Log In
1. Check invitation email
2. Ensure using correct email
3. Reset password if needed
4. Contact administrator

### Content Not Appearing
1. Ensure content is published (not draft)
2. Check if associated with correct pub
3. Wait 1-2 minutes for cache refresh
4. Try manual site rebuild in Netlify

### Image Upload Issues
1. Check file size (<10MB recommended)
2. Verify image format (JPG, PNG, WebP)
3. Ensure proper dimensions
4. Check internet connection

### Studio Loading Slowly
1. Clear browser cache
2. Try different browser
3. Check internet speed
4. Report to administrator if persistent

## Best Practices

### Content Guidelines
1. **Consistency**: Use similar formatting across content
2. **SEO**: Always fill in meta descriptions
3. **Images**: Include alt text for accessibility
4. **URLs**: Keep slugs short and descriptive
5. **Testing**: Preview before publishing

### Regular Maintenance
- Review and update old content monthly
- Remove expired events
- Update seasonal menus
- Check for broken images
- Keep contact information current

## Advanced Features

### Rich Text Editor
- **Bold/Italic**: Highlight text and click buttons
- **Links**: Highlight and click link icon
- **Images**: Click image icon to embed
- **Lists**: Bullet and numbered lists available
- **Headings**: Use for structure (H2, H3, etc.)

### Internal Links
- Link to other pages using the link tool
- Select "Internal link"
- Choose target page
- Maintains site structure

### Custom Blocks
Some content types support special blocks:
- Image galleries
- Quote blocks
- Call-to-action buttons
- Embedded maps

## API Access

### For Developers
- Project ID: `it7wwto3`
- Dataset: `production`
- API Version: `2024-01-01`
- GROQ queries supported

### Webhooks
Configured to trigger Netlify rebuilds on:
- Content publish
- Content delete
- Content update

## Support Resources

### Documentation
- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/groq)
- [Studio Customization](https://www.sanity.io/docs/studio)

### Getting Help
1. **Technical Issues**: Contact developer team
2. **Content Questions**: Refer to this guide
3. **Account Issues**: Sanity support
4. **Training Needs**: Schedule with administrator

## Security

### Best Practices
1. Use strong passwords
2. Don't share login credentials
3. Log out when finished
4. Report suspicious activity
5. Keep email address updated

### Data Protection
- All content is backed up
- Version history maintained
- Deleted content recoverable (30 days)
- GDPR compliant

## Quick Reference

### Studio Navigation
- **Desk**: Main content area
- **Media**: Image library
- **Vision**: Query testing (admin only)
- **Settings**: User preferences

### Keyboard Shortcuts
- `Ctrl/Cmd + S`: Save
- `Ctrl/Cmd + P`: Publish
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Shift + Z`: Redo
- `Ctrl/Cmd + K`: Search

### Content States
- 🔴 **Draft**: Not published
- 🟢 **Published**: Live on site
- 🟡 **Changed**: Published but has edits
- 🔵 **Publishing**: In progress

---

*For additional support or training, contact your WH Pubs administrator*
*Last Updated: January 2025*