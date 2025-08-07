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
    // Store the current scroll position
    const currentScrollY = window.scrollY;
    
    // Ensure iframe loads properly
    if (iframeRef.current) {
      iframeRef.current.src = 'https://events-widget.liveres.co.uk/widget.html?companyId=ec8abb94-2a3c-4969-9122-a6f2f9b27a96&stylingURL=Kl7AS';
      
      // Prevent auto-scrolling when iframe loads
      iframeRef.current.onload = () => {
        window.scrollTo(0, currentScrollY);
        // Also scroll to top in case we're on initial page load
        if (currentScrollY === 0) {
          window.scrollTo(0, 0);
        }
      };
    }

    // Prevent focus stealing on mount
    const preventAutoFocus = (e: Event) => {
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        window.scrollTo(0, currentScrollY);
      }
    };

    // Add listener to prevent focus events during initial load
    document.addEventListener('focus', preventAutoFocus, true);
    
    // Clean up after a short delay (once iframe is loaded)
    const cleanup = setTimeout(() => {
      document.removeEventListener('focus', preventAutoFocus, true);
    }, 2000);

    return () => {
      clearTimeout(cleanup);
      document.removeEventListener('focus', preventAutoFocus, true);
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