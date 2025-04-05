# Cross-Browser Testing Checklist

This document provides a comprehensive checklist for testing the WH Pubs website across different browsers and devices to ensure a consistent user experience.

## Browsers to Test

- **Chrome** (latest version)
- **Firefox** (latest version)
- **Safari** (latest version)
- **Edge** (latest version)
- **Mobile Safari** (iOS)
- **Chrome for Android**

## Testing Checklist

### 1. Visual Consistency

- [ ] Layout appears consistent across all browsers
- [ ] Fonts render correctly (Quattrocento for headers, Alice for body text)
- [ ] Images display properly
- [ ] Colors and gradients appear as expected
- [ ] Spacing and margins are consistent
- [ ] Icons render correctly

### 2. Functionality

- [ ] Navigation works correctly
- [ ] Forms submit properly
- [ ] Buttons and links function as expected
- [ ] Dropdown menus open and close correctly
- [ ] Mobile menu opens and closes properly
- [ ] Interactive elements respond to hover/focus states
- [ ] Scrolling behavior is smooth

### 3. Performance

- [ ] Page load times are acceptable
- [ ] Animations run smoothly
- [ ] No visible lag when interacting with the site
- [ ] Images load efficiently

### 4. Responsive Design

- [ ] Site responds appropriately to different viewport sizes
- [ ] Content reflows correctly on resize
- [ ] Touch targets are appropriately sized on mobile
- [ ] No horizontal scrolling on mobile devices

### 5. Accessibility

- [ ] Screen readers can navigate the site
- [ ] Keyboard navigation works properly
- [ ] Focus states are visible
- [ ] ARIA attributes function correctly
- [ ] Color contrast meets WCAG standards

## Browser-Specific Issues and Fixes

### Safari

```css
/* Fix for flexbox gap property in Safari */
.flex-gap {
  display: flex;
  flex-wrap: wrap;
}

.flex-gap > * {
  margin: 0.5rem;
}

/* Fix for sticky positioning in Safari */
.sticky-element {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
```

### Firefox

```css
/* Fix for scrollbar styling in Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

/* Fix for form elements in Firefox */
select {
  -moz-appearance: none;
  text-indent: 0.01px;
  text-overflow: '';
}
```

### Edge

```css
/* Fix for object-fit in older Edge versions */
.image-container {
  position: relative;
  width: 100%;
  height: 300px;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## JavaScript Detection for Browser-Specific Issues

```javascript
// Detect browser and add appropriate class to body
function detectBrowser() {
  const userAgent = navigator.userAgent;
  let browserClass = '';
  
  if (userAgent.indexOf("Edge") > -1) {
    browserClass = 'browser-edge';
  } else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1) {
    browserClass = 'browser-chrome';
  } else if (userAgent.indexOf("Firefox") > -1) {
    browserClass = 'browser-firefox';
  } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
    browserClass = 'browser-safari';
  }
  
  document.body.classList.add(browserClass);
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', detectBrowser);
```

## Testing Tools

- [BrowserStack](https://www.browserstack.com/) - Test on real browsers and devices
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Audit performance, accessibility, and more
- [Can I Use](https://caniuse.com/) - Check feature compatibility across browsers
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool

## Handling Browser-Specific CSS

```html
<!-- In your Layout.astro head section -->
<script>
  // Add browser detection classes
  document.documentElement.classList.add(
    (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ? 'ios' : '',
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 'safari' : '',
    navigator.userAgent.indexOf('Firefox') > -1 ? 'firefox' : '',
    navigator.userAgent.indexOf('Edge') > -1 ? 'edge' : '',
    navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 ? 'chrome' : ''
  );
</script>
```

Then in your CSS:

```css
/* Safari-specific styles */
.safari .problematic-element {
  /* Safari-specific fix */
}

/* Firefox-specific styles */
.firefox .problematic-element {
  /* Firefox-specific fix */
}
```

## Automated Testing Setup

Consider setting up automated visual regression testing using tools like:

- [Percy](https://percy.io/)
- [BackstopJS](https://github.com/garris/BackstopJS)
- [Cypress](https://www.cypress.io/) with visual testing plugins

This will help catch visual regressions across browsers automatically during development.
