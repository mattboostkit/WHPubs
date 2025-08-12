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
    // Simple delayed load without scroll interference
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        // Set source after delay
        iframeRef.current.src = 'https://events-widget.liveres.co.uk/widget.html?companyId=ec8abb94-2a3c-4969-9122-a6f2f9b27a96&stylingURL=Kl7AS';
      }
    }, 1000); // Delay iframe load to prevent focus stealing
    
    return () => clearTimeout(timer);
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
        // Prevent iframe from stealing focus and scrolling
        tabIndex={-1}
        loading="lazy"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-payment"
      />
    </div>
  );
}