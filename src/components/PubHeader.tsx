import React from 'react';

interface PubHeaderProps {
  pubName: string;
  squareLogo?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  fallbackLogo?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  className?: string;
}

export default function PubHeader({ pubName, squareLogo, className = '' }: PubHeaderProps) {
  return (
    <section className={`py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Square Logo */}
          {squareLogo?.asset?.url ? (
            <div className="mb-6 lg:mb-8">
              <img 
                src={squareLogo.asset.url}
                alt={squareLogo.alt || `${pubName} logo`}
                className="w-32 h-32 lg:w-40 lg:h-40 object-contain rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <div className="mb-6 lg:mb-8">
              <div className="w-32 h-32 lg:w-40 lg:h-40 bg-secondary/20 rounded-lg flex items-center justify-center">
                <span className="text-4xl lg:text-5xl font-bold text-secondary">
                  {pubName.charAt(0)}
                </span>
              </div>
            </div>
          )}
          
          {/* Pub Name in Lora Font */}
          <h1 className="text-4xl lg:text-6xl font-serif text-primary mb-4"
              style={{ fontFamily: 'Lora, serif' }}>
            {pubName}
          </h1>
          
          {/* Decorative Divider */}
          <div className="flex items-center gap-4 text-secondary">
            <div className="w-16 h-[2px] bg-secondary"></div>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.09 8.26L20.18 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L3.82 9.27L9.91 8.26L12 2Z"/>
            </svg>
            <div className="w-16 h-[2px] bg-secondary"></div>
          </div>
        </div>
      </div>
    </section>
  );
}