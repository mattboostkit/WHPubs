# Changelog

## [1.0.1] - 2024-03-21

### Added
- Enhanced accessibility with detailed alt text for all images
  - Hero section image now includes comprehensive description
  - Establishment images include location and description context
  - News section images have specific content descriptions
- Complete favicon suite implementation
  - Added favicon in multiple sizes (16x16, 32x32, 192x192, 512x512)
  - Added Apple Touch Icon (180x180)
  - Added Safari Pinned Tab SVG
  - Added Web App Manifest
  - Added Browser Config for MS Windows
  - Configured theme colors to match brand (#201D0F)

### Changed
- Updated image alt text format in news section to be more descriptive
- Modified establishment image alt text to include location and description
- Replaced generic favicon with branded version

### Technical Details
- No database schema changes
- No third-party integration changes
- Added new static files in public directory:
  - favicon-16x16.png
  - favicon-32x32.png
  - apple-touch-icon.png
  - android-chrome-192x192.png
  - android-chrome-512x512.png
  - safari-pinned-tab.svg
  - site.webmanifest
  - browserconfig.xml
- Updated Layout.astro to include new favicon meta tags
- Enhanced SEO with better image descriptions
- Maintained existing color scheme and branding