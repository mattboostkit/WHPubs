import React from 'react';

interface GoogleMapEmbedProps {
  iframe?: string;
  className?: string;
}

export default function GoogleMapEmbed({ iframe, className = '' }: GoogleMapEmbedProps) {
  if (!iframe) {
    return null;
  }

  // Sanitize the iframe string to ensure it's safe
  const sanitizedIframe = iframe.trim();
  
  // Check if it's a valid Google Maps embed
  if (!sanitizedIframe || !sanitizedIframe.includes('google.com/maps/embed')) {
    console.warn('Invalid or missing Google Maps embed URL');
    return null;
  }

  return (
    <div className={`google-map-embed ${className}`}>
      <div 
        dangerouslySetInnerHTML={{ __html: sanitizedIframe }}
        className="w-full h-[450px] [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
      />
    </div>
  );
}