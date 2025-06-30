import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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
    <div className="relative h-full">
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
              alt={image.alt || `${pubName || 'Pub'} image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Navigation arrows (only show if more than 1 image) */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
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
                    ? 'bg-[#B79C64] w-8' 
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
            <div className="prose prose-invert prose-xl md:prose-2xl mb-6 text-shadow-md">
              <p className="text-[#B79C64] font-semibold">{currentImage.caption}</p>
            </div>
          )}
          {currentImage.buttonText && currentImage.buttonLink && (
            <a href={currentImage.buttonLink} target={currentImage.buttonLink.startsWith('http') ? "_blank" : undefined} rel={currentImage.buttonLink.startsWith('http') ? "noopener noreferrer" : undefined}>
              <Button variant="secondary" size="lg" className="bg-[#B79C64] hover:bg-[#B79C64]/90 text-primary font-semibold px-8 py-3 shadow-lg">
                {currentImage.buttonText}
              </Button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}