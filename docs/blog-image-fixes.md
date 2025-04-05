# Image Loading Fixes for WH Pubs Website

## Overview
This document outlines the changes made to fix image loading issues across the WH Pubs website, which uses Sanity as its content management system for blog content and external image sources for other pages.

## Issues Addressed
1. Images from external sources (Unsplash, Sanity CDN) were being blocked by Content Security Policy (CSP) restrictions
2. No fallback mechanism for images that fail to load
3. Images within the blog content (PortableText) were not handling errors properly
4. Content rendering issues with `[object Object]` appearing in blog posts
5. Images on the Menus, Events, and other pages were not loading properly

## Solutions Implemented

### 1. Content Security Policy Updates
Updated the CSP in `netlify.toml` to allow images from all necessary sources and frames from the booking system:

```toml
Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com https://ik.imagekit.io https://cdn.sanity.io https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://www.google-analytics.com https://it7wwto3.api.sanity.io; frame-src 'self' https://events-widget.liveres.co.uk;"
```

### 2. Universal Image Error Handling
Added a consistent image error handling script to all pages with images:

```javascript
<script is:inline>
  document.addEventListener('DOMContentLoaded', function() {
    // Add error handler to all images with data-fallback attribute
    const images = document.querySelectorAll('img[data-fallback]');
    
    images.forEach(img => {
      img.addEventListener('error', function() {
        // Only replace once to avoid infinite loops
        if (!this.hasAttribute('data-replaced')) {
          this.setAttribute('src', this.getAttribute('data-fallback'));
          this.setAttribute('data-replaced', 'true');
        }
      });
      
      // Trigger a load event to check if the current src is valid
      const currentSrc = img.getAttribute('src');
      img.setAttribute('src', '');
      img.setAttribute('src', currentSrc);
    });
  });
</script>
```

### 3. Fallback Images
Created fallback images for different types of content:

1. **Blog Thumbnails**: `/public/images/blog-fallback.jpg`
2. **Blog Detail Images**: `/public/images/blog-detail-fallback.jpg`
3. **Content Images**: `/public/images/content-fallback.jpg`
4. **Menu Images**: `/public/images/menu-fallback.jpg`
5. **Event Images**: `/public/images/event-fallback.jpg`

### 4. Page-Specific Updates

#### Blog Index Page
Modified the blog index page (`src/pages/blog/index.astro`) to include:

1. **Fallback Image Definition**: Added a fallback image path for blog thumbnails
2. **Error Handling Script**: Added inline JavaScript to handle image loading errors
3. **Image Attributes**: Updated image tags with error handling and fallback attributes

#### Blog Post Template
Modified the blog post template (`src/pages/blog/[...slug].astro`) to include:

1. **Fallback Image Definition**: Added a fallback image path for blog detail images
2. **Error Handling Script**: Added inline JavaScript to handle image loading errors
3. **Image Attributes**: Updated image tags with error handling and fallback attributes
4. **React-based Portable Text Renderer**: Replaced the Astro-based PortableText component with a React-based one for better compatibility with Sanity's data structure

#### Menus Page
Updated the menus page (`src/pages/menus.astro`) to include:

1. **Fallback Image Definition**: Added a fallback image path for menu images
2. **Error Handling Script**: Added inline JavaScript to handle image loading errors
3. **Image Attributes**: Updated image tags with error handling and fallback attributes

#### Events Page
Updated the events page (`src/pages/events.astro`) to include:

1. **Fallback Image Definition**: Added a fallback image path for event images
2. **Error Handling Script**: Added inline JavaScript to handle image loading errors
3. **Image Attributes**: Updated image tags with error handling and fallback attributes

### 5. Sanity Query Improvements
Enhanced the Sanity query in `src/lib/sanity.js` to properly structure the blog post content:

```javascript
body[] {
  ...,
  _type == "image" => {
    ...,
    asset->
  }
}
```

This ensures that image assets are properly expanded and accessible in the portable text.

### 6. React-based Portable Text Component
Created a new React-based component (`src/components/SanityPortableText.jsx`) to properly render Sanity's Portable Text content:

```javascript
import React from 'react';
import { PortableText } from '@portabletext/react';

// Custom components for the Portable Text renderer
const components = {
  types: {
    image: ({value}) => {
      // Image rendering with fallback
    },
  },
  marks: {
    // Text formatting (links, bold, italic)
  },
  block: {
    // Block level elements (headings, paragraphs, blockquotes)
  },
  list: {
    // List formatting
  },
  listItem: {
    // List item formatting
  },
};

export default function SanityPortableText({value}) {
  if (!value) {
    return null;
  }
  
  return (
    <div className="prose prose-lg">
      <PortableText value={value} components={components} />
    </div>
  );
}
```

## Testing
The website has been tested to ensure that images load correctly in all scenarios:

1. When external images are accessible
2. When external images are blocked by CSP
3. When external images fail to load for any reason
4. When complex content structures are rendered in the blog posts

## Future Recommendations

1. **Image Optimization**: Consider implementing responsive images with multiple sizes for all images
2. **Lazy Loading**: Implement lazy loading for images to improve performance
3. **Image Caching**: Implement a more sophisticated caching strategy for external images
4. **Offline Support**: Consider implementing service workers for offline image support
5. **Image Compression**: Use compression tools to optimize images before uploading to Sanity or using on the site
6. **Content Structure**: Review the Sanity schema to ensure content is structured in a way that's easy to render
7. **Error Monitoring**: Implement error monitoring to track image loading failures in production
8. **Local Image Hosting**: Consider downloading and hosting important images locally to reduce dependency on external services

## Conclusion
These changes ensure that the WH Pubs website remains visually appealing and functional even when external image resources are unavailable or blocked. The fallback system provides a seamless experience for users regardless of their browser settings or network conditions.
