# Development Kitchen Content Management Guide

## Overview

The Development Kitchen page content is now fully managed through Sanity CMS, allowing you to edit text and add images without touching code.

## Content Sections

### 1. My Journey with WH Pubs
- **Location**: Sanity Studio → Development Kitchen → My Journey
- **Content**: Personal story about joining WH Pubs
- **Image**: Optional image related to your journey (1200x800px)

### 2. What We Do
- **Location**: Sanity Studio → Development Kitchen → What We Do
- **Content**: Description of Development Kitchen operations
- **Image**: Optional image showing kitchen operations (1200x800px)

### 3. Quality Sourcing
- **Location**: Sanity Studio → Development Kitchen → Quality Sourcing
- **Content**: Information about suppliers and ingredients
- **Image**: Optional image showing ingredients or suppliers (1200x800px)

### 4. Christmas Special
- **Location**: Sanity Studio → Development Kitchen → Christmas Special
- **Content**: Information about Christmas pudding and special offerings
- **Image**: Optional image of Christmas pudding or festive items (1200x800px)

## How to Edit Content

### Step 1: Access Sanity Studio
1. Go to your Sanity Studio dashboard
2. Navigate to "Development Kitchen" in the left sidebar
3. Click on the existing Development Kitchen document

### Step 2: Edit Content Sections
1. **My Journey**: Click on "My Journey with WH Pubs" section
   - Edit the heading if needed
   - Use the rich text editor to modify the content
   - Upload an image if desired

2. **What We Do**: Click on "What We Do" section
   - Edit the heading if needed
   - Use the rich text editor to modify the content
   - Upload an image if desired

3. **Quality Sourcing**: Click on "Quality Sourcing" section
   - Edit the heading if needed
   - Use the rich text editor to modify the content
   - Upload an image if desired

4. **Christmas Special**: Click on "Christmas Special" section
   - Edit the heading if needed
   - Use the rich text editor to modify the content
   - Upload an image if desired

### Step 3: Save Changes
1. Click "Publish" to make changes live
2. Changes will appear on the website immediately

## Image Requirements

### Section Images
- **Size**: 1200x800px (3:2 ratio)
- **Format**: JPEG or PNG
- **Quality**: High resolution (at least 72 DPI)
- **Content**: Relevant to each section

### Image Guidelines
- **My Journey**: Personal photos, team photos, or journey-related images
- **What We Do**: Kitchen operations, cooking processes, equipment
- **Quality Sourcing**: Ingredients, suppliers, fresh produce
- **Christmas Special**: Christmas pudding, festive food, seasonal items

## Rich Text Editor Tips

### Formatting Options
- **Bold**: Use for emphasis on key points
- **Italic**: Use for quotes or special terms
- **Lists**: Use bullet points for easy reading
- **Paragraphs**: Break up long text for better readability

### Content Guidelines
- Keep paragraphs concise (2-3 sentences max)
- Use bullet points for lists of items
- Include personal touches and stories
- Maintain a warm, welcoming tone

## Troubleshooting

### Content Not Showing
- Ensure the document is published in Sanity
- Check that content is properly saved
- Verify the development server is running

### Images Not Loading
- Check image file size (should be under 5MB)
- Ensure images are in supported formats (JPEG, PNG)
- Verify alt text is provided for accessibility

### Layout Issues
- Images should be 1200x800px for optimal display
- Text should be properly formatted in the rich text editor
- Check for any special characters that might break the layout

## Technical Notes

### Files Modified
- `wh-pubs/schemaTypes/developmentKitchen.ts` - Added new content sections
- `src/lib/sanity.js` - Updated data fetching
- `src/pages/development-kitchen.astro` - Updated to use Sanity content

### Content Structure
Each section includes:
- `heading`: Section title
- `content`: Rich text content (blockContent)
- `image`: Optional image with alt text

### Fallback Behavior
- If a section is empty, it won't display on the page
- If an image is missing, only the text content will show
- The page gracefully handles missing content

## Future Enhancements

Potential improvements to consider:
- Add more content sections as needed
- Include video content support
- Add interactive elements
- Create seasonal content variations 