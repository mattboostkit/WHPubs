// Pub URL configuration
// This maps pub slugs to their respective Netlify deployment URLs
// Update these when domains change

export const pubUrls = {
  'the-bull': 'https://whpubs-thebull.netlify.app',
  'the-chaser-inn': 'https://whpubs-thechaserinn.netlify.app',
  'the-rose-and-crown': 'https://whpubs-theroseandcrown.netlify.app',
  'the-cricketers-inn': 'https://whpubs-thecricketersinn.netlify.app',
  'the-little-brown-jug': 'https://whpubs-thelittlebrownjug.netlify.app'
};

// Helper function to get pub URL
export function getPubUrl(pub) {
  // Priority 1: Use the new pubWebsiteUrl field from Sanity
  if (pub.pubWebsiteUrl) {
    return pub.pubWebsiteUrl;
  }
  
  // Priority 2: Use temporaryUrl field from Sanity
  if (pub.temporaryUrl) {
    return pub.temporaryUrl;
  }
  
  // Priority 3: Legacy fields for backwards compatibility
  if (pub.externalDomain) {
    // Check if the domain already includes protocol
    if (pub.externalDomain.startsWith('http://') || pub.externalDomain.startsWith('https://')) {
      return pub.externalDomain;
    }
    // If no protocol, add https://
    return `https://${pub.externalDomain}`;
  }
  
  // Priority 4: Legacy url field
  if (pub.url) {
    return pub.url;
  }
  
  // Priority 5: Use hardcoded Netlify URL based on slug (fallback)
  const slug = pub.slug?.current || pub.slug;
  if (slug && pubUrls[slug]) {
    return pubUrls[slug];
  }
  
  // Final fallback to internal page
  return `/${slug}`;
}

// Check if URL is external
export function isExternalUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}