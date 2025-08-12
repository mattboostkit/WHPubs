import React, { useEffect, useRef } from 'react';

interface LiveResBookingWidgetProps {
  className?: string;
  height?: string;
}

export default function LiveResBookingWidget({ 
  className = '', 
  height = '600px' 
}: LiveResBookingWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only load on homepage, not on initial page load
    const isHomepage = window.location.pathname === '/';
    
    // Store current scroll position before any changes
    const initialScrollY = window.scrollY;
    
    // Prevent initial scroll by maintaining position
    const preventScroll = () => {
      if (window.scrollY !== initialScrollY) {
        window.scrollTo(0, initialScrollY);
      }
    };
    
    // Load iframe with a delay to prevent focus stealing
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        // Add scroll prevention during load
        window.addEventListener('scroll', preventScroll);
        
        // Set source
        iframeRef.current.src = 'https://events-widget.liveres.co.uk/widget.html?companyId=ec8abb94-2a3c-4969-9122-a6f2f9b27a96&stylingURL=Kl7AS';
        
        // Remove scroll prevention after iframe loads
        iframeRef.current.onload = () => {
          setTimeout(() => {
            window.removeEventListener('scroll', preventScroll);
            // Ensure we're still at the top if this is initial page load
            if (isHomepage && initialScrollY === 0) {
              window.scrollTo(0, 0);
            }
          }, 300);
        };
      }
    }, 500); // Increased delay to let page settle
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

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
        }}
        allow="payment"
        // Prevent iframe from stealing focus
        tabIndex={-1}
      />
    </div>
  );
}