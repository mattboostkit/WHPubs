// Handle image loading errors
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
