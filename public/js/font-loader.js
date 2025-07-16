// Optimized Font Loading with Font Face Observer fallback
(function() {
  'use strict';
  
  // Check if fonts are already cached
  if (sessionStorage.fontsLoaded) {
    document.documentElement.classList.add('fonts-loaded');
    return;
  }
  
  // Native Font Loading API
  if ('fonts' in document) {
    Promise.all([
      document.fonts.load('400 1em Lora'),
      document.fonts.load('700 1em Lora'),
      document.fonts.load('400 1em Quattrocento'),
      document.fonts.load('700 1em Quattrocento')
    ]).then(function() {
      document.documentElement.classList.add('fonts-loaded');
      sessionStorage.fontsLoaded = true;
    }).catch(function() {
      // Fallback to system fonts on error
      console.warn('Font loading failed, using fallback fonts');
    });
  } else {
    // Fallback for older browsers
    var fontsLoaded = 0;
    var totalFonts = 4;
    
    function fontLoaded() {
      fontsLoaded++;
      if (fontsLoaded === totalFonts) {
        document.documentElement.classList.add('fonts-loaded');
        sessionStorage.fontsLoaded = true;
      }
    }
    
    // Simple timer-based fallback
    setTimeout(function() {
      if (!document.documentElement.classList.contains('fonts-loaded')) {
        document.documentElement.classList.add('fonts-loaded');
      }
    }, 3000);
  }
  
  // Preload critical fonts
  var preloadFonts = [
    '/fonts/lora-v32-latin-regular.woff2',
    '/fonts/lora-v32-latin-700.woff2'
  ];
  
  preloadFonts.forEach(function(font) {
    var link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = font;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
})();