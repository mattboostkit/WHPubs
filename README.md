# WH Pubs

A website for WH Pubs, featuring traditional British pubs in South East England offering quality food, drink, and hospitality.

## Latest Updates (January 2025)

- **SEO and Structure**
  - Fixed breadcrumb JSON-LD URL generation in `src/components/SEO.astro`
  - Standardized base URL to `https://www.whpubs.com` in SEO and used `Astro.site` where possible
  - Made `public/robots.txt` sitemap reference relative (`/sitemap.xml`) so hub and pub sites serve correct sitemap per domain
  - Updated `src/pages/sitemap.xml.js` to:
    - Use `Astro.site` or fallback consistently
    - Include pub URLs only on hub builds; filter posts/events per pub on pub builds using `TARGET_PUB_SLUG`
  - Ensured pub structured data URLs derive from `Astro.site` in `src/pages/[slug].astro`
- **Navigation**
  - Mega Menu now links to each pub’s external domain via `getPubUrl()` mapping for correct cross-site navigation
- **Docs and tidy-up**
  - Clarified multi-site behavior and per-pub sitemap/robots in this README
  - Normalized links, headings, and removed outdated references

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/mattboostkit/WHPubs)

## Features

- Responsive design for all devices
- Accessibility improvements with ARIA labels
- SEO optimizations with meta tags, sitemap, and robots.txt
- Schema.org structured data for better search results
- Custom 404 error page
- Google Analytics integration
- Content Management System (Sanity Studio)
- Interactive pub finder with filtering capabilities
- Development Kitchen page with CMS-managed content
- Events filtering by pub location
- Privacy Policy page with CMS integration and fallback content
- Event images with expandable view (600x300 thumbnails, 2400x1200 full size)
- Private pub hire section with CMS-managed imagery
- Comprehensive design system for consistent UI/UX across all sections
- CMS-managed images for Welcome section (4 customizable images)

## Tech Stack

- [Astro](https://astro.build/) - Web framework
- [React](https://reactjs.org/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Sanity](https://www.sanity.io/) - Content management

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Create a Netlify account at [netlify.com](https://www.netlify.com/)
2. Click "New site from Git"
3. Connect to your GitHub/GitLab/Bitbucket account
4. Select the WH Pubs repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install netlify-cli -g
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize Netlify in your project:
   ```bash
   netlify init
   ```

4. Follow the prompts to either:
   - Create a new site
   - Connect to an existing site

5. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

### Environment Variables

Set the following environment variables in Netlify:

- `SANITY_PROJECT_ID`: Your Sanity project ID (currently: `it7wwto3`)
- `SANITY_DATASET`: Your Sanity dataset (usually "production")
- `SANITY_TOKEN`: Your Sanity API token (if needed)
- `GA_MEASUREMENT_ID`: Your Google Analytics measurement ID

## Content Management

### Sanity Studio Access

The content management system is accessible at: [https://whpubs.sanity.studio](https://whpubs.sanity.studio)

- Login with your Sanity account credentials
- Manage pubs, blog posts, events, menus, privacy policies, and more
- Real-time preview of content changes
- Collaborative editing capabilities

### Local Studio Development

To run Sanity Studio locally:

```bash
cd wh-pubs
npm install
npm run dev
```

The studio will be available at `http://localhost:3333`

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/whpubs.git
   cd whpubs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Documentation

Additional documentation can be found in the `docs` directory:

- [Site Improvements](docs/site-improvements.md)
- [Cross-Browser Testing](docs/cross-browser-testing.md)
- [Performance Optimization](docs/performance-optimization.md)
- [Responsive Design Recommendations](docs/responsive-design-recommendations.md)
- [Implementation Summary](docs/implementation-summary.md)
- [Development Kitchen Content Guide](docs/development-kitchen-content-guide.md) - Guide for managing Development Kitchen content through Sanity CMS
- [Design System](docs/design-system.md) - Comprehensive design system documentation for consistent UI/UX

## Multi-Site Architecture

This project supports both a main hub site and individual pub sites:

- **Hub Site**: Main WH Pubs website showcasing all establishments
- **Individual Pub Sites**: Can be built separately using `TARGET_PUB_SLUG` environment variable

To build for a specific pub:
```bash
TARGET_PUB_SLUG=the-bull npm run build
```

### Hub vs Pub behaviors
- Hub (no `TARGET_PUB_SLUG`):
  - Sitemap includes hub pages, all pub index pages, blog posts, and events
  - Robots points to `https://www.whpubs.com/sitemap.xml`
  - Navigation to pubs uses external pub domains
- Pub (`TARGET_PUB_SLUG` set):
  - Sitemap includes only that pub’s pages/posts/events with the active domain as base
  - Robots points to `/sitemap.xml` (served on the pub domain)
  - All structured data URLs and canonicals use the pub domain when `Astro.site` is set

### Notes for Owners
- Update pub external domains in Sanity (`externalDomain`) to ensure all links and sitemaps reflect your live domain.
- Submit each domain’s sitemap to Google Search Console after launch.