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

  // Pub-specific LiveRes site ID mapping (fallback if siteId not provided)
  const pubSiteIdMap: Record<string, string> = {
    'the-bull-otford': 'cc8b210d-e765-4aa6-b10e-f3dba5a9d039',
    'the-bull': 'cc8b210d-e765-4aa6-b10e-f3dba5a9d039', // Fallback for old slug
    'the-little-brown-jug': '4c4d14e2-7bf3-4952-baea-69da60126460',
    'the-chaser-inn': '36a6d37c-eeb9-40d9-932f-f9ffdb5d630a',
    'the-cricketers-inn': '329d4e4f-c7ff-4ca0-ab7b-7d866ce38670',
    'the-rose-and-crown': '304df119-0d39-4f03-bce3-6deee8b79d90'
  };

  // Get the correct site ID - use provided siteId or fallback to mapping
  const liveresSiteId = siteId || (pubSlug ? pubSiteIdMap[pubSlug] : null);

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
      if (iframeRef.current && siteId) {
        // Set source after delay using pub-specific siteId
        iframeRef.current.src = `https://events-widget.liveres.co.uk/widget.html?siteId=${siteId}&stylingURL=${stylingURL}`;
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