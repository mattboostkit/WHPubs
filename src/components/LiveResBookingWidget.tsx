import React, { useEffect, useRef } from 'react';

interface LiveResBookingWidgetProps {
  className?: string;
  height?: string;
  siteId?: string;
  stylingURL?: string;
}

export default function LiveResBookingWidget({ 
  className = '', 
  height = '1000px',
  siteId,
  stylingURL = 'Kl7AS'
}: LiveResBookingWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Store current scroll position before loading iframe
    const currentScrollY = window.scrollY;
    
    // Simple delayed load without scroll interference
    const timer = setTimeout(() => {
      if (iframeRef.current && siteId) {
        // Set source after delay using pub-specific siteId
        iframeRef.current.src = `https://events-widget.liveres.co.uk/widget.html?siteId=${siteId}&stylingURL=${stylingURL}`;
      } else if (iframeRef.current) {
        // Fallback to company-wide booking if no specific siteId provided
        iframeRef.current.src = `https://events-widget.liveres.co.uk/widget.html?companyId=ec8abb94-2a3c-4969-9122-a6f2f9b27a96&stylingURL=${stylingURL}`;
      }
      
      // Restore scroll position after iframe loads to prevent unwanted scrolling
      const restoreScroll = () => {
        window.scrollTo(0, currentScrollY);
      };
      
      // Multiple attempts to prevent scroll jumps
      setTimeout(restoreScroll, 100);
      setTimeout(restoreScroll, 500);
      setTimeout(restoreScroll, 1000);
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
        scrolling="auto"
        style={{
          border: 'none',
          maxWidth: '100%',
          minHeight: height,
          pointerEvents: 'auto',
          overflow: 'visible',
        }}
        allow="payment"
        // Prevent iframe from stealing focus and causing scroll jumps
        tabIndex={-1}
        loading="lazy"
        // Additional attributes to prevent focus/scroll issues
        data-no-focus="true"
        onLoad={() => {
          // Ensure parent page scroll position is maintained when iframe loads
          if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
          }
        }}
      />
    </div>
  );
}