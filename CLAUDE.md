# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WH Pubs is a multi-site platform for traditional British pubs in South East England, built with Astro and Sanity CMS. The project supports both a main hub site and individual pub sites with configurable layouts and content.

## Development Commands

### Frontend (Astro)
```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Build for production (supports TARGET_PUB_SLUG env for pub-specific builds)
npm run preview      # Preview production build
npm run assign-admin # Assign admin role (uses scripts/assign-admin-role.js)
```

### CMS (Sanity Studio)
```bash
cd wh-pubs
npm run dev          # Start Sanity Studio at localhost:3333
npm run build        # Build Sanity Studio
npm run deploy       # Deploy Sanity Studio
npm run create-sample-posts  # Create sample blog posts
```

## Architecture Overview

### Two-Part Structure
1. **Frontend (Astro)**: Static site generator at root level
   - Pages in `src/pages/` - Dynamic routing with `[slug].astro` and `[...slug].astro`
   - Components in `src/components/` - React components with Tailwind/shadcn UI
   - Sanity integration via `src/lib/sanity.js`

2. **CMS (Sanity)**: Headless CMS in `wh-pubs/` directory
   - Project ID: `it7wwto3`
   - Dataset: `production`
   - Schema types in `wh-pubs/schemaTypes/`

### Key Data Models
- **pub**: Individual pub with custom layout options (logo, nav links, colors)
- **post**: Blog posts that can be associated with specific pubs or hub
- **menu**: Menu content associated with pubs
- **event**: Events associated with pubs or general
- **homepage**: Configurable hero section for main hub
- **site**: Legacy multi-site support structure

### Content Filtering Pattern
The project uses a consistent pattern for filtering content by pub:
- Hub content: Items with NO pub reference (`!defined(pub)` or `!defined(associatedPub)`)
- Pub content: Items matching specific pub slug

### Multi-Site Support
The build system supports creating pub-specific builds using `TARGET_PUB_SLUG` environment variable, which moves the pub page to the root for individual deployments.

## Sanity Client Configuration
The Sanity client is configured in `src/lib/sanity.js` with helper functions for all content types:
- `getPosts(targetPubSlug)` - Fetches posts filtered by pub
- `getPubs(targetPubSlug)` - Fetches pub data
- `getMenusForPub(targetPubSlug)` - Fetches menus for a specific pub
- `getEvents(targetPubSlug)` - Fetches events filtered by pub
- `getPubBySlug(slug)` - Fetches single pub with all layout fields

## UI Components
The project uses shadcn/ui components with a customized black (#1A1A1A) and gold (#B79C64) color scheme. All components are in `src/components/ui/` and use Tailwind CSS with the following custom theme variables:
- Primary: Black (#1A1A1A)
- Secondary: Gold (#B79C64)
- Font: Lora (serif)

## Image Handling
- Fallback images in `public/images/` for all content types
- Client-side fallback script at `public/js/image-fallback.js`
- Hero images support overlay text and buttons (configured in Sanity)

## Environment Setup

### Local Development
Create a `.env` file in the project root:
```bash
SANITY_PROJECT_ID=it7wwto3
SANITY_DATASET=production
# Optional: SANITY_TOKEN=your_token_here (for authenticated requests)
# Optional: GA_MEASUREMENT_ID=your_ga_id_here (for Google Analytics)
```

### Deployment (Netlify)
Configured for Netlify deployment with:
- Build command: `npm run build`
- Publish directory: `dist`
- Site connected: https://whpubsadmin.netlify.app
- Environment variables needed in Netlify dashboard:
  - `SANITY_PROJECT_ID` (set to: it7wwto3)
  - `SANITY_DATASET` (set to: production)
  - Optional: `SANITY_TOKEN`, `GA_MEASUREMENT_ID`