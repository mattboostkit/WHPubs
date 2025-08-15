import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCarouselTouch } from '@/hooks/use-carousel-touch';

interface CarouselImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
  caption?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface PubHeroCarouselProps {
  images: CarouselImage[];
  pubName?: string;
}

export function PubHeroCarousel({ images, pubName }: PubHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Ensure images is always an array
  const validImages = Array.isArray(images) ? images.filter(img => img?.asset?.url) : [];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!validImages || validImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [validImages.length]);

  const goToPrevious = () => {
    if (!isTransitioning && validImages.length > 1) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const goToNext = () => {
    if (!isTransitioning && validImages.length > 1) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  // Add touch support
  useCarouselTouch(carouselRef, goToNext, goToPrevious);

  if (validImages.length === 0) {
    // Fallback if no images
    return (
      <div className="relative h-full">
        <img
          src="/images/hero-fallback.jpg"
          alt={`${pubName || 'Pub'} Hero Image`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>
    );
  }

  const currentImage = validImages[currentIndex];

  return (
    <div ref={carouselRef} className="relative h-full overflow-hidden">
      {/* Images with smooth transitions */}
      <div className="absolute inset-0">
        {validImages.map((image, index) => (
          <div
            key={image.asset._id}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              index === currentIndex 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105"
            )}
          >
            <img
              src={image.asset.url}
              alt={image.alt || `${pubName || 'Pub'} image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* Navigation arrows (only show if more than 1 image) */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-secondary w-8' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Overlay content for current slide */}
      {(currentImage.caption || currentImage.buttonText) && (
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          {currentImage.caption && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 mb-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary drop-shadow-lg">
                {currentImage.caption}
              </h2>
            </div>
          )}
          {currentImage.buttonText && currentImage.buttonLink && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
              <a href={currentImage.buttonLink} target={currentImage.buttonLink.startsWith('http') ? "_blank" : undefined} rel={currentImage.buttonLink.startsWith('http') ? "noopener noreferrer" : undefined}>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  {currentImage.buttonText}
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}