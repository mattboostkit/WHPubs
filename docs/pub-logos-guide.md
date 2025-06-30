# Pub Logos Guide

## Overview

Placeholder logos have been generated for all pubs and the main WH Pubs brand. These are available in both PNG and SVG formats in the `public/images/pub-logos/` directory.

## Generated Logos

### Main Brand
- `wh-pubs-logo.png` / `wh-pubs-logo.svg` - Main WH Pubs logo (black background, gold text)

### Individual Pubs
- `the-bull-logo.png` / `the-bull-logo.svg` - The Bull (gold background, black text)
- `the-crown-logo.png` / `the-crown-logo.svg` - The Crown (black background, gold text)
- `the-chaser-inn-logo.png` / `the-chaser-inn-logo.svg` - The Chaser Inn (gold background, black text)
- `the-bear-inn-logo.png` / `the-bear-inn-logo.svg` - The Bear Inn (black background, gold text)
- `the-three-tuns-logo.png` / `the-three-tuns-logo.svg` - The Three Tuns (gold background, black text)

## How to Upload to Sanity Studio

1. **Access Sanity Studio**
   - Go to https://whpubs.sanity.studio
   - Log in with your credentials

2. **Upload Main Site Logo**
   - Navigate to "Site Settings" in the menu
   - Find the site with `isMainSite` set to true
   - Click on the logo field
   - Upload `wh-pubs-logo.png` or your custom logo
   - Add alt text: "WH Pubs Logo"

3. **Upload Individual Pub Logos**
   - Navigate to "Manage Your Pubs"
   - Select a pub (e.g., "The Bull")
   - Find the "Logo" field
   - Upload the corresponding logo file
   - Add appropriate alt text (e.g., "The Bull Logo")
   - Repeat for each pub

## Logo Design Guidelines

When creating professional logos to replace these placeholders:

### Recommended Specifications
- **Format**: SVG (preferred) or PNG with transparent background
- **Dimensions**: 400x200px (2:1 aspect ratio) or square 400x400px
- **File Size**: Keep under 500KB for web performance
- **Colors**: Use brand colors - Black (#1A1A1A) and Gold (#B79C64)

### Design Considerations
- Ensure logos are legible at small sizes (footer usage)
- Include both horizontal and square versions if possible
- Maintain consistent style across all pub logos
- Consider creating light/dark variants

## Where Logos Are Used

Logos uploaded to Sanity will automatically appear in:

1. **Main Navigation** - When pub-specific sites are built
2. **Footer** - Both main site and individual pub sites
3. **Pub Cards** - On the homepage "Our Pubs" section
4. **Hero Sections** - On individual pub homepages

## Fallback Behavior

If no logo is uploaded for a pub:
- The pub name will be displayed as text
- Styled with the site's default typography
- Uses the same color scheme as the logos

## Technical Notes

- Logos are served through Sanity's CDN for optimal performance
- The site automatically handles missing logos gracefully
- SVG format is recommended for scalability
- Images are lazy-loaded where appropriate