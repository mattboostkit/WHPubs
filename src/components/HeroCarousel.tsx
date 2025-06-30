import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

interface HeroCarouselProps {
  images: CarouselImage[];
  heroTitle: string;
  heroSubtitle: string;
  heroButton1Text?: string;
  heroButton1Link?: string;
  heroButton2Text?: string;
  heroButton2Link?: string;
}

export function HeroCarousel({
  images,
  heroTitle,
  heroSubtitle,
  heroButton1Text,
  heroButton1Link,
  heroButton2Text,
  heroButton2Link
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    // Fallback if no images
    return (
      <div className="relative h-[90vh]">
        <div className="absolute inset-0">
          <img
            src="/images/hero-fallback.jpg"
            alt="WH Pubs Hero Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <HeroContent
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          heroButton1Text={heroButton1Text}
          heroButton1Link={heroButton1Link}
          heroButton2Text={heroButton2Text}
          heroButton2Link={heroButton2Link}
        />
      </div>
    );
  }

  return (
    <div className="relative h-[90vh]">
      {/* Images */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image.asset._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.asset.url}
              alt={image.alt || `Hero image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Navigation arrows (only show if more than 1 image) */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-[#B79C64] w-8' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Hero content */}
      <HeroContent
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        heroButton1Text={heroButton1Text}
        heroButton1Link={heroButton1Link}
        heroButton2Text={heroButton2Text}
        heroButton2Link={heroButton2Link}
      />
    </div>
  );
}

// Separate component for hero content
function HeroContent({
  heroTitle,
  heroSubtitle,
  heroButton1Text,
  heroButton1Link,
  heroButton2Text,
  heroButton2Link
}: Omit<HeroCarouselProps, 'images'>) {
  const handleButton1Click = () => {
    if (heroButton1Link?.startsWith('/#')) {
      const elementId = heroButton1Link.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (heroButton1Link) {
      window.location.href = heroButton1Link;
    }
  };

  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="text-center text-[#B79C64] px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {heroTitle || 'Traditional British Hospitality in the South East of England'}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-secondary">
          {heroSubtitle || 'Traditional British Hospitality...'}
        </p>
        <div className="flex gap-4 justify-center">
          {heroButton1Text && heroButton1Link && (
            <Button
              variant="default"
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold"
              onClick={handleButton1Click}
            >
              {heroButton1Text}
            </Button>
          )}
          {heroButton2Text && heroButton2Link && (
            <a href={heroButton2Link}>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent text-[#B79C64] border-[#B79C64] hover:bg-[#B79C64] hover:text-primary"
              >
                {heroButton2Text}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}