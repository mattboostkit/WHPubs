import React, { useState } from 'react';
import { Eye } from 'lucide-react';

interface PubCardHoverProps {
  pub: {
    name: string;
    slug?: { current: string } | string;
    externalDomain?: string;
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
  clickable?: boolean;
}

export default function PubCardHover({ pub, children, clickable = true }: PubCardHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine which images to use
  const exteriorImage = pub.exteriorImage?.asset?.url || pub.image?.asset?.url || '/images/hero-fallback.jpg';
  const interiorImage = pub.interiorImage?.asset?.url || pub.heroImage?.asset?.url || exteriorImage;
  
  const exteriorAlt = pub.exteriorImage?.alt || pub.image?.alt || `Exterior of ${pub.name}`;
  const interiorAlt = pub.interiorImage?.alt || pub.heroImage?.alt || `Interior of ${pub.name}`;

  // Get the pub URL (prioritize external domain)
  const getPubUrl = () => {
    if (pub.externalDomain) {
      return pub.externalDomain.startsWith('http') ? pub.externalDomain : `https://${pub.externalDomain}`;
    }
    return '#';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or links inside the card
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    
    if (clickable && pub.externalDomain) {
      const url = getPubUrl();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="overflow-hidden hover:shadow-lg transition-shadow focus-within:shadow-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={handleCardClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick(e as any);
        }
      }}
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
        <div 
          className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
          role="tooltip"
          aria-label="Hover to see interior view"
        >
          <Eye className="w-3 h-3" aria-hidden="true" />
          <span>Hover for interior</span>
        </div>
      </div>
      {children}
    </div>
  );
} 