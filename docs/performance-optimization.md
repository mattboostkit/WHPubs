# Performance Optimization Recommendations

This document outlines recommendations for optimizing the WH Pubs website for better performance and user experience.

## Table of Contents

1. [Image Optimization](#image-optimization)
2. [Font Loading Strategy](#font-loading-strategy)
3. [CSS and JavaScript Optimization](#css-and-javascript-optimization)
4. [Lazy Loading](#lazy-loading)
5. [Caching Strategy](#caching-strategy)
6. [Server-Side Optimizations](#server-side-optimizations)
7. [Implementation Examples](#implementation-examples)

## Image Optimization

### Recommendations

1. **Use modern image formats**:
   - Convert JPEG/PNG images to WebP format
   - Consider AVIF for even better compression where supported

2. **Implement responsive images**:
   - Use `srcset` and `sizes` attributes for different viewport sizes
   - Generate multiple sizes of each image

3. **Optimize image quality**:
   - Compress images without significant quality loss
   - Use appropriate quality settings (75-85% for JPEG/WebP is often sufficient)

4. **Remove unnecessary metadata**:
   - Strip EXIF data from images

### Implementation Example

```html
<picture>
  <source 
    srcset="/images/pub-exterior-400w.avif 400w, /images/pub-exterior-800w.avif 800w" 
    type="image/avif"
    sizes="(max-width: 600px) 400px, 800px"
  >
  <source 
    srcset="/images/pub-exterior-400w.webp 400w, /images/pub-exterior-800w.webp 800w" 
    type="image/webp"
    sizes="(max-width: 600px) 400px, 800px"
  >
  <img 
    src="/images/pub-exterior-800w.jpg" 
    srcset="/images/pub-exterior-400w.jpg 400w, /images/pub-exterior-800w.jpg 800w"
    sizes="(max-width: 600px) 400px, 800px"
    alt="Exterior view of The Crown pub" 
    loading="lazy"
    width="800" 
    height="600"
    class="rounded-lg"
  >
</picture>
```

## Font Loading Strategy

### Recommendations

1. **Limit font variations**:
   - Use only necessary font weights and styles
   - Currently using Quattrocento (400, 700) and Alice (400)

2. **Optimize font loading**:
   - Use `font-display: swap` to prevent invisible text during loading
   - Preload critical fonts

3. **Consider self-hosting fonts**:
   - Reduce third-party dependencies
   - Better control over caching

### Implementation Example

```html
<!-- In the <head> section -->
<link rel="preload" href="/fonts/quattrocento-bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/alice-regular.woff2" as="font" type="font/woff2" crossorigin>

<style>
  /* Self-hosted font definitions */
  @font-face {
    font-family: 'Quattrocento';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/quattrocento-bold.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  
  @font-face {
    font-family: 'Alice';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/alice-regular.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
</style>
```

## CSS and JavaScript Optimization

### Recommendations

1. **Minify and bundle CSS/JS**:
   - Remove unnecessary whitespace and comments
   - Combine multiple files to reduce HTTP requests

2. **Critical CSS**:
   - Inline critical CSS for above-the-fold content
   - Defer non-critical CSS

3. **Reduce unused CSS**:
   - Implement PurgeCSS to remove unused styles

4. **JavaScript optimization**:
   - Use `defer` for non-critical scripts
   - Split code into smaller chunks
   - Tree-shake unused code

### Implementation Example

```html
<!-- Critical CSS inlined in head -->
<style>
  /* Critical styles for above-the-fold content */
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="/styles/main.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/main.min.css"></noscript>

<!-- Defer JavaScript -->
<script src="/scripts/main.min.js" defer></script>
```

## Lazy Loading

### Recommendations

1. **Lazy load images and videos**:
   - Use the native `loading="lazy"` attribute
   - Implement Intersection Observer for more control

2. **Lazy load below-the-fold content**:
   - Load content as the user scrolls
   - Implement skeleton screens for better UX

3. **Defer third-party resources**:
   - Load non-critical third-party scripts after page load

### Implementation Example

```javascript
// Lazy load images with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
});
```

## Caching Strategy

### Recommendations

1. **Set appropriate cache headers**:
   - Long cache for static assets (1 year)
   - Shorter cache for HTML (1 day or less)

2. **Implement versioning for assets**:
   - Add hash to filenames for cache busting
   - Use `immutable` cache control directive

3. **Service Worker for offline access**:
   - Cache critical resources
   - Implement offline fallback pages

### Implementation Example

```javascript
// Example service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration successful');
    }).catch(error => {
      console.log('ServiceWorker registration failed:', error);
    });
  });
}

// In sw.js
const CACHE_NAME = 'whpubs-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.min.css',
  '/scripts/main.min.js',
  '/fonts/quattrocento-bold.woff2',
  '/fonts/alice-regular.woff2',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});
```

## Server-Side Optimizations

### Recommendations

1. **Enable compression**:
   - Use Brotli compression (preferred)
   - Fallback to Gzip for older browsers

2. **Implement HTTP/2 or HTTP/3**:
   - Multiplexing for parallel requests
   - Header compression

3. **Content Delivery Network (CDN)**:
   - Distribute static assets across global edge servers
   - Reduce latency for users

4. **Preconnect to required origins**:
   - Establish early connections to third-party domains

### Implementation Example

```html
<!-- Preconnect to required origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.sanity.io" crossorigin>
```

## Implementation Examples

### Image Optimization Script

```javascript
// Example script for optimizing images using Sharp
// Save as scripts/optimize-images.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/images';
const outputDir = 'public/images';
const sizes = [400, 800, 1200];
const formats = ['webp', 'avif', 'jpg'];

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process each image
fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  
  // Skip directories and non-image files
  if (fs.statSync(inputPath).isDirectory() || !/\.(jpg|jpeg|png)$/i.test(file)) {
    return;
  }
  
  const filename = path.parse(file).name;
  
  // Process each size and format
  sizes.forEach(size => {
    formats.forEach(format => {
      const outputPath = path.join(outputDir, `${filename}-${size}w.${format}`);
      
      sharp(inputPath)
        .resize(size)
        .toFormat(format, { quality: format === 'jpg' ? 80 : 75 })
        .toFile(outputPath)
        .then(() => console.log(`Created ${outputPath}`))
        .catch(err => console.error(`Error processing ${file}:`, err));
    });
  });
});
```

### Critical CSS Extraction

```javascript
// Example script for extracting critical CSS
// Save as scripts/extract-critical.js

const critical = require('critical');
const fs = require('fs');
const path = require('path');

const pages = [
  { url: 'index.html', output: 'index-critical.css' },
  { url: 'menus.html', output: 'menus-critical.css' },
  { url: 'book.html', output: 'book-critical.css' }
];

pages.forEach(page => {
  critical.generate({
    base: 'dist/',
    src: page.url,
    target: {
      css: path.join('dist/styles', page.output),
      html: page.url,
      uncritical: path.join('dist/styles', `${page.url.split('.')[0]}-uncritical.css`),
    },
    width: 1300,
    height: 900,
    ignore: {
      atrule: ['@font-face']
    }
  }).then(result => {
    console.log(`Critical CSS extracted for ${page.url}`);
  }).catch(err => {
    console.error(`Error extracting critical CSS for ${page.url}:`, err);
  });
});
```

### Performance Monitoring Script

```javascript
// Example script for monitoring Core Web Vitals
// Add to your main JavaScript file

// Report Core Web Vitals
function reportWebVitals() {
  if ('web-vitals' in window) {
    import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
      getCLS(metric => sendToAnalytics('CLS', metric.value));
      getFID(metric => sendToAnalytics('FID', metric.value));
      getLCP(metric => sendToAnalytics('LCP', metric.value));
      getFCP(metric => sendToAnalytics('FCP', metric.value));
      getTTFB(metric => sendToAnalytics('TTFB', metric.value));
    });
  }
}

// Send metrics to Google Analytics
function sendToAnalytics(metric, value) {
  if (window.gtag) {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric,
      value: Math.round(metric === 'CLS' ? value * 1000 : value),
      non_interaction: true
    });
  }
}

// Initialize performance monitoring
reportWebVitals();
```

By implementing these recommendations, the WH Pubs website will load faster, provide a better user experience, and potentially improve search engine rankings as page speed is a ranking factor.
