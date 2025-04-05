# WH Pubs Content Migration Guide

This guide provides instructions for migrating blog content from local files to Sanity CMS and fixing spacing issues across the site.

## Files in this directory

1. **create-site-instructions.md**: Instructions for creating a site in Sanity Studio
2. **create-categories-instructions.md**: Instructions for creating blog categories in Sanity Studio
3. **create-posts-instructions.md**: Instructions for creating blog posts in Sanity Studio
4. **create-sample-posts.js**: A script to automatically create blog posts (requires a Sanity API token)

## Migration Steps

### Step 1: Create a Site

Follow the instructions in `create-site-instructions.md` to create a main site in Sanity Studio.

### Step 2: Create Categories

Follow the instructions in `create-categories-instructions.md` to create blog categories in Sanity Studio.

### Step 3: Create Blog Posts

Follow the instructions in `create-posts-instructions.md` to create the sample blog posts in Sanity Studio.

### Step 4: Verify the Migration

1. Check that the posts appear on the homepage at http://localhost:4321/
2. Click on each post to verify that the content displays correctly
3. Verify that the spacing and formatting look good

## Spacing Improvements

The following improvements have been made to fix spacing issues:

1. Added the Tailwind Typography plugin to enhance text styling and spacing
2. Updated the `PortableText` component to improve spacing and formatting for rich text content
3. Adjusted the blog post template to ensure consistent spacing for titles, images, and text

## Troubleshooting

If you encounter any issues:

1. Make sure both the Sanity Studio (http://localhost:3333/) and Astro site (http://localhost:4321/) are running
2. Check the browser console for any errors
3. Verify that the Sanity schema types (post, site, category) are correctly defined
4. Ensure that the Sanity client is properly configured in `src/lib/sanity.js`
