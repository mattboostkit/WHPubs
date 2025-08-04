import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ExternalLink, Beer, Dog, TreePine, Utensils } from 'lucide-react';
import { getPubUrl, isExternalUrl } from '@/lib/pub-urls';

interface Pub {
  _id: string;
  name: string;
  slug: { current: string };
  location: string;
  locationName?: string;
  description: string;
  image?: {
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
  amenities?: string[];
  reservationsUrl?: string;
  externalDomain?: string;
}

interface PubsCarouselProps {
  pubs: Pub[];
}

export default function PubsCarousel({ pubs }: PubsCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const selectedPub = pubs[selectedIndex];

  const handlePubSelect = (index: number) => {
    if (index !== selectedIndex && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedIndex(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Auto-rotate through pubs
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handlePubSelect((selectedIndex + 1) % pubs.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedIndex, isAnimating, pubs.length]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'dogFriendly':
        return <Dog className="w-4 h-4" />;
      case 'garden':
        return <TreePine className="w-4 h-4" />;
      case 'localAles':
        return <Beer className="w-4 h-4" />;
      case 'food':
        return <Utensils className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getAmenityLabel = (amenity: string) => {
    switch (amenity) {
      case 'dogFriendly':
        return 'Dog Friendly';
      case 'garden':
        return 'Garden';
      case 'localAles':
        return 'Local Ales';
      case 'food':
        return 'Food';
      default:
        return amenity;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4">Our Pubs</p>
          <h2 className="text-5xl font-bold text-primary mb-2">LET US TAKE</h2>
          <h2 className="text-5xl font-bold text-secondary">YOU SOMEWHERE</h2>
        </div>

        {/* Discover All Pubs Button */}
        <div className="text-center mb-12">
          <a href="/our-pubs">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
              Discover All Pubs
            </Button>
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Pub Showcase */}
          <div className={`relative overflow-hidden rounded-lg transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {selectedPub && (
              <div className="relative h-[500px]">
                <img
                  src={(selectedPub.heroImage?.asset?.url || selectedPub.image?.asset?.url || '/images/pub-fallback.jpg') + '?w=800&h=500&fit=crop'}
                  alt={selectedPub.heroImage?.alt || selectedPub.image?.alt || selectedPub.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/pub-fallback.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Pub Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{selectedPub.name}</h3>
                  <p className="flex items-center text-lg mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    {selectedPub.locationName || selectedPub.location}
                  </p>
                  <p className="text-white/90 mb-6 line-clamp-2">{selectedPub.description}</p>
                  
                  {/* Amenities */}
                  {selectedPub.amenities && selectedPub.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedPub.amenities.map((amenity) => (
                        <Badge 
                          key={amenity}
                          variant="secondary" 
                          className="bg-white/20 backdrop-blur text-white border-white/30"
                        >
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">{getAmenityLabel(amenity)}</span>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    {(() => {
                      const pubUrl = getPubUrl(selectedPub);
                      const isExt = isExternalUrl(pubUrl);
                      return (
                        <a href={pubUrl} target={isExt ? "_blank" : undefined} rel={isExt ? "noopener noreferrer" : undefined}>
                          <Button variant="secondary" size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
                            {isExt ? 'Visit Pub Site' : 'View Details'}
                            {isExt && <ExternalLink className="w-4 h-4 ml-2" />}
                          </Button>
                        </a>
                      );
                    })()}
                    {selectedPub.reservationsUrl && (
                      <a href={selectedPub.reservationsUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur text-white border-white hover:bg-white/20">
                          Book a Table
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Pub Selector List */}
          <div className="space-y-4">
            {pubs.map((pub, index) => (
              <button
                key={pub._id}
                onClick={() => handlePubSelect(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'bg-white hover:bg-gray-50 text-primary border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold opacity-20 mr-4">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xl font-semibold">{pub.name}</span>
                  </div>
                  {index === selectedIndex && (
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}