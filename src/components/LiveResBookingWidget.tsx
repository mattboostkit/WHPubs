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
  const scrollBlockedRef = useRef(true);

  useEffect(() => {
    // Force page to stay at top during component mount
    window.scrollTo(0, 0);
    
    // Block scroll attempts
    const blockScroll = () => {
      if (scrollBlockedRef.current) {
        window.scrollTo(0, 0);
      }
    };
    
    // Add aggressive scroll blocking
    window.addEventListener('scroll', blockScroll);
    
    // Prevent focus during initial render
    const preventFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'IFRAME') {
        e.preventDefault();
        e.stopPropagation();
        target.blur();
        window.scrollTo(0, 0);
      }
    };
    
    document.addEventListener('focusin', preventFocus, true);
    
    // Load iframe with anti-scroll measures
    if (iframeRef.current) {
      // Disable interaction initially
      iframeRef.current.style.pointerEvents = 'none';
      
      // Set source
      iframeRef.current.src = 'https://events-widget.liveres.co.uk/widget.html?companyId=ec8abb94-2a3c-4969-9122-a6f2f9b27a96&stylingURL=Kl7AS';
      
      // Handle load event
      iframeRef.current.onload = () => {
        // Keep at top
        window.scrollTo(0, 0);
        
        // Re-enable interaction after delay
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.style.pointerEvents = 'auto';
          }
          // Allow scrolling after content loads
          scrollBlockedRef.current = false;
        }, 1000);
      };
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', blockScroll);
      document.removeEventListener('focusin', preventFocus, true);
      scrollBlockedRef.current = false;
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