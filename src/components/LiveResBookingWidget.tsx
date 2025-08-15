import React, { useEffect, useRef } from 'react';

interface LiveResBookingWidgetProps {
  className?: string;
  height?: string;
  siteId?: string;
  stylingURL?: string;
}

export default function LiveResBookingWidget({ 
  className = '', 
  height = '600px',
  siteId,
  stylingURL = 'Kl7AS'
}: LiveResBookingWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple delayed load without scroll interference
    const timer = setTimeout(() => {
      if (iframeRef.current && siteId) {
        // Set source after delay using pub-specific siteId
        iframeRef.current.src = `https://events-widget.liveres.co.uk/widget.html?siteId=${siteId}&stylingURL=${stylingURL}`;
      } else if (iframeRef.current) {
        // Fallback to company-wide booking if no specific siteId provided
        iframeRef.current.src = `https://events-widget.liveres.co.uk/widget.html?companyId=ec8abb94-2a3c-4969-9122-a6f2f9b27a96&stylingURL=${stylingURL}`;
      }
    }, 1000); // Delay iframe load to prevent focus stealing
    
    return () => clearTimeout(timer);
  }, [siteId, stylingURL]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <iframe
        ref={iframeRef}
        title="Book a Table - WH Pubs"
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        style={{
          border: 'none',
          maxWidth: '100%',
          minHeight: height,
          pointerEvents: 'auto',
        }}
        allow="payment"
        // Prevent iframe from stealing focus
        tabIndex={-1}
        loading="lazy"
        // Remove sandbox to allow full functionality but keep focus prevention
        data-no-focus="true"
      />
    </div>
  );
}