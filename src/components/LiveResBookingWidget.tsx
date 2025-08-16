import React, { useEffect, useRef, useCallback } from 'react';

interface LiveResBookingWidgetProps {
  className?: string;
  height?: string;
  siteId?: string;
  stylingURL?: string;
  pubName?: string;
  pubSlug?: string;
}

export default function LiveResBookingWidget({ 
  className = '', 
  height = '1000px',
  siteId,
  stylingURL = 'Kl7AS',
  pubName,
  pubSlug
}: LiveResBookingWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the correct site ID - use provided siteId (should come from CMS now)
  const liveresSiteId = siteId;

  // Prevent any unwanted scrolling behavior
  const preventScroll = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
    
    // Set up scroll prevention during iframe load
    let scrollPreventionActive = true;
    
    const handleScroll = () => {
      if (scrollPreventionActive) {
        window.scrollTo(0, 0);
      }
    };
    
    // Add scroll listener during iframe load period
    window.addEventListener('scroll', handleScroll, { passive: false });
    
    // Simple delayed load without scroll interference
    const timer = setTimeout(() => {
      if (iframeRef.current && liveresSiteId) {
        // Set source after delay using pub-specific siteId
        iframeRef.current.src = `https://events-widget.liveres.co.uk/widget.html?siteId=${liveresSiteId}&stylingURL=${stylingURL}`;
        // Track booking widget usage with analytics
        if (typeof window !== 'undefined' && window.analytics) {
          window.analytics.track('Booking Widget Loaded', {
            pubName: pubName || 'WH Pubs',
            pubSlug: pubSlug || 'unknown',
            siteId: liveresSiteId
          });
        }
      } else if (iframeRef.current) {
        // Fallback to company-wide booking if no specific siteId provided
        iframeRef.current.src = `https://events-widget.liveres.co.uk/widget.html?companyId=ec8abb94-2a3c-4969-9122-a6f2f9b27a96&stylingURL=${stylingURL}`;
      }
      
      // Continue preventing scroll for a bit after iframe loads
      setTimeout(() => {
        scrollPreventionActive = false;
        window.removeEventListener('scroll', handleScroll);
      }, 2000);
    }, 1000); // Delay iframe load to prevent focus stealing
    
    return () => {
      clearTimeout(timer);
      scrollPreventionActive = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [liveresSiteId, stylingURL, pubName, pubSlug]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <iframe
        ref={iframeRef}
        title={`Book a Table${pubName ? ` - ${pubName}` : ' - WH Pubs'}`}
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