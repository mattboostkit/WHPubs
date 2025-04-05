# Changelog

## [2.0.0] - 2025-03-13

### Added
- Initiated migration from Astro to Next.js for multi-site functionality
- Set up Next.js project with TypeScript and App Router
- Installed Sanity integration with Visual Editing capabilities
- Added NextAuth.js for multi-site owner authentication
- Prepared foundation for multi-tenant architecture
- Created dynamic routing structure for multi-site support
- Implemented site-specific theming and branding
- Developed admin dashboard for pub owners
- Added blog section with dynamic content for each site
- Created essential pub pages (About, Contact, Events, Menu)
- Implemented UI components using Radix UI

### Changed
- Replaced static site generation with dynamic rendering and ISR
- Updated content fetching to support site-specific queries
- Enhanced typography with UK English localisation

### Technical Details
- Created new Next.js project with TypeScript support
- Installed required dependencies:
  - next-sanity and @sanity/image-url for Sanity CMS integration
  - @sanity/visual-editing for real-time content editing
  - next-auth for authentication and authorisation
  - Radix UI components for accessible UI elements
  - Tailwind CSS for styling
- Implemented middleware for site resolution based on hostname
- Created SiteContext provider for site-specific theming
- Developed UI components using Radix UI and Tailwind CSS
- Added dynamic blog post pages with OpenGraph metadata
- Created mock data for menu and events pages (to be replaced with Sanity data)
- Migration in progress, no production deployment yet

## 2025-03-13: Next.js Migration - Phase 2

### Added
- **Custom 404 Pages**: Implemented both global and site-specific 404 pages with search functionality and navigation options
- **SEO Improvements**: Added comprehensive SEO features including:
  - OpenGraph tags for better social media sharing
  - Twitter card support
  - Canonical links to prevent duplicate content issues
  - Structured metadata using Next.js 13+ metadata API
- **Sitemap Generation**: Created dynamic sitemap.xml generation for all sites and pages
- **Robots.txt**: Added robots.txt configuration to guide search engine crawlers
- **Google Analytics 4**: Integrated GA4 with page view tracking and custom event support
- **Automated Deployment**: Created webhook API and deployment scripts for automatic rebuilding after content changes in Sanity

### Fixed
- TypeScript errors in various components, ensuring type safety throughout the application
- Updated headers handling in site-specific pages to properly extract site information

### Technical Improvements
- Improved error handling in API routes
- Enhanced metadata structure using the latest Next.js metadata API
- Created reusable utility functions for SEO and analytics

## [Unreleased]

### Added
- Implemented AriaAnnouncer component for screen reader announcements
- Added SkipToContent component for improved keyboard navigation
- Created OptimizedImage component with blur-up effect and responsive sizing
- Implemented comprehensive caching strategies in middleware
- Added cross-browser compatibility documentation and testing checklist
- Created performance optimisation guide with recommendations
- Updated typography to use Quattrocento for headers and Alice for body text
- Configured Tailwind CSS with custom typography and colour schemes

### Changed
- Updated root layout to include accessibility components
- Enhanced middleware with intelligent cache control headers
- Fixed TypeScript errors throughout the codebase

### Fixed
- Resolved TypeScript errors in AccessibleImage component
- Fixed import issues in OptimizedImage component

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