# Pub Hover Images Guide

## Overview

The homepage now features an interactive hover effect for the "Our Pubs" section. When users hover over a pub card, the image smoothly transitions from showing the exterior of the pub to showing the interior/bar area.

## How It Works

1. **Default State**: Shows the exterior image of the pub
2. **Hover State**: Smoothly transitions to show the interior/bar image
3. **Fallback**: If specific hover images aren't uploaded, it uses existing images as fallbacks

## Image Requirements

### Exterior Image
- **Size**: 828x605px (exact dimensions)
- **Content**: Outside view of the pub building
- **Purpose**: Default view when not hovering

### Interior Image  
- **Size**: 828x605px (exact dimensions)
- **Content**: Inside view of the pub/bar area
- **Purpose**: Shown on hover

## Setting Up Images in Sanity

### Method 1: Sanity Studio (Recommended)

1. **Navigate to Sanity Studio**
   - Go to your Sanity Studio dashboard
   - Find the "Pubs" section

2. **Select a Pub**
   - Click on any pub you want to update
   - Scroll to the "Images & Media" section

3. **Upload Images**
   - **Exterior Image**: Upload an 828x605px image of the pub's exterior
   - **Interior Image**: Upload an 828x605px image of the pub's interior/bar
   - Add descriptive alt text for accessibility

4. **Save Changes**
   - Click "Publish" to make the changes live

### Method 2: Using the Script

1. **Prepare Images**
   - Ensure your images are exactly 828x605px
   - Host them somewhere accessible (or use local files)

2. **Update the Script**
   - Open `scripts/update-pub-hover-images.js`
   - Uncomment and modify the example usage section
   - Add your image URLs

3. **Run the Script**
   ```bash
   node scripts/update-pub-hover-images.js
   ```

## Technical Implementation

### Files Modified

1. **`wh-pubs/schemaTypes/pub.ts`**
   - Added `exteriorImage` and `interiorImage` fields
   - Both fields include alt text for accessibility

2. **`src/lib/sanity.js`**
   - Updated `getPubs()` function to fetch new image fields

3. **`src/components/PubCardHover.tsx`** (New)
   - React component handling the hover effect
   - Smooth opacity transitions between images
   - Fallback logic for missing images

4. **`src/pages/index.astro`**
   - Updated to use the new `PubCardHover` component
   - Wraps pub cards with hover functionality

### Fallback Logic

If specific hover images aren't uploaded:
- **Exterior**: Falls back to `pub.image` (main listing image)
- **Interior**: Falls back to `pub.heroImage` (hero banner image)
- **Final fallback**: Uses `/images/hero-fallback.jpg`

## Testing the Feature

1. **Visit the Homepage**
   - Go to the main WH Pubs website
   - Scroll to the "Our Pubs" section

2. **Test Hover Effect**
   - Hover over any pub card
   - You should see a smooth transition from exterior to interior image
   - The transition takes 300ms with opacity changes

3. **Check Responsiveness**
   - Test on desktop, tablet, and mobile devices
   - Hover effects work on desktop/tablet
   - Mobile devices will show the default (exterior) image

## Troubleshooting

### Images Not Showing
- Check that images are uploaded to Sanity
- Verify image URLs are accessible
- Check browser console for errors

### Hover Effect Not Working
- Ensure the `PubCardHover` component is properly imported
- Check that React is properly configured in Astro
- Verify the component is wrapped with `client:load`

### Image Quality Issues
- Ensure images are exactly 828x605px
- Use high-quality images (at least 72 DPI)
- Optimize images for web (compress without losing quality)

## Best Practices

1. **Image Selection**
   - Choose clear, well-lit photos
   - Exterior: Show the pub's character and location
   - Interior: Highlight the welcoming atmosphere

2. **Accessibility**
   - Always add descriptive alt text
   - Ensure good contrast in images
   - Test with screen readers

3. **Performance**
   - Optimize images for web delivery
   - Use appropriate image formats (JPEG for photos)
   - Consider lazy loading for better performance

## Future Enhancements

Potential improvements to consider:
- Add loading states for images
- Implement touch gestures for mobile
- Add image preloading for smoother transitions
- Create image carousels within each pub card 