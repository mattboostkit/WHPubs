import React, { useState } from 'react';
import { Eye } from 'lucide-react';

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
      <div className="relative h-64 overflow-hidden group">
        {/* Exterior Image (default) */}
        <img
          src={exteriorImage}
          alt={exteriorAlt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          decoding="async"
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
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/images/hero-fallback.jpg';
          }}
        />
        
        {/* Hover indicator - show on all cards */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
          <Eye className="w-3 h-3" />
          <span>Hover for interior</span>
        </div>
      </div>
      {children}
    </div>
  );
} 