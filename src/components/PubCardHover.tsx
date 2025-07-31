import React, { useState } from 'react';

interface PubCardHoverProps {
  pub: {
    name: string;
    exteriorImage?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
    interiorImage?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
    heroImage?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
    image?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
  };
  children: React.ReactNode;
}

export default function PubCardHover({ pub, children }: PubCardHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine which images to use
  const exteriorImage = pub.exteriorImage?.asset?.url || pub.image?.asset?.url || '/images/hero-fallback.jpg';
  const interiorImage = pub.interiorImage?.asset?.url || pub.heroImage?.asset?.url || exteriorImage;
  
  const exteriorAlt = pub.exteriorImage?.alt || pub.image?.alt || `Exterior of ${pub.name}`;
  const interiorAlt = pub.interiorImage?.alt || pub.heroImage?.alt || `Interior of ${pub.name}`;

  return (
    <div 
      className="overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        {/* Exterior Image (default) */}
        <img
          src={exteriorImage}
          alt={exteriorAlt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/images/hero-fallback.jpg';
          }}
        />
        
        {/* Interior Image (shown on hover) */}
        <img
          src={interiorImage}
          alt={interiorAlt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/images/hero-fallback.jpg';
          }}
        />
      </div>
      {children}
    </div>
  );
} 