import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
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
  const [isPaused, setIsPaused] = useState(false);

  // Debug logging
  useEffect(() => {
    const validImageCount = Array.isArray(images) ? images.filter(img => img?.asset?.url).length : 0;
    console.log('HeroCarousel mounted with', validImageCount, 'valid images out of', images?.length || 0, 'total');
    console.log('Raw images:', images);
  }, [images]);

  // Ensure images is always an array
  const validImages = Array.isArray(images) ? images.filter(img => img?.asset?.url) : [];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!validImages || validImages.length <= 1 || isPaused) {
      console.log('Auto-rotation disabled: only', validImages?.length || 0, 'image(s) or paused');
      return;
    }
    
    console.log('Starting auto-rotation for', validImages.length, 'images');
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % validImages.length;
        console.log('Rotating from index', prevIndex, 'to', nextIndex);
        return nextIndex;
      });
    }, 5000);

    return () => {
      console.log('Cleaning up auto-rotation interval');
      clearInterval(interval);
    };
  }, [validImages.length, isPaused]); // This will restart the interval if image count changes or pause state changes

  const goToPrevious = () => {
    console.log('Previous button clicked');
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? validImages.length - 1 : prevIndex - 1;
      console.log('Changing from index', prevIndex, 'to', newIndex);
      return newIndex;
    });
  };

  const goToNext = () => {
    console.log('Next button clicked');
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % validImages.length;
      console.log('Changing from index', prevIndex, 'to', newIndex);
      return newIndex;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (validImages.length === 0) {
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
        {validImages.map((image, index) => (
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
      {validImages.length > 1 && (
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

          {/* Dots indicator and pause button */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="flex gap-3">
              {validImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all rounded-full ${
                    index === currentIndex 
                      ? 'bg-secondary w-10 h-3' 
                      : 'bg-white/60 hover:bg-white/80 w-3 h-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            {/* Pause/Play button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors ml-2"
              aria-label={isPaused ? "Play carousel" : "Pause carousel"}
            >
              {isPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
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
      <div className="text-center text-secondary px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          {heroTitle || 'Traditional British Hospitality in the South East of England'}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-secondary leading-relaxed">
          {heroSubtitle || 'Traditional British Hospitality...'}
        </p>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 italic font-medium">
          Exceptional food, local ales, and warm welcomes across South East England
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
                className="bg-transparent text-secondary border-secondary hover:bg-secondary hover:text-primary"
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