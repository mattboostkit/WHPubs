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
  // Always prefer Netlify preview URLs during client sign‑off
  const slug = pub.slug?.current || pub.slug;
  if (slug && pubUrls[slug]) {
    return pubUrls[slug];
  }
  
  // Fallback to external domain only if mapping is missing
  if (pub.externalDomain) {
    if (pub.externalDomain.startsWith('http://') || pub.externalDomain.startsWith('https://')) {
      return pub.externalDomain;
    }
    return `https://${pub.externalDomain}`;
  }
  
  // Fallback to internal page
  return `/${slug}`;
}

// Check if URL is external
export function isExternalUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}