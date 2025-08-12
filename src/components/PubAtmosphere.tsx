import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Volume2 } from 'lucide-react';

interface AtmosphereProps {
  images?: Array<{
    url: string;
    caption: string;
    time: string; // e.g., "Friday Night", "Sunday Lunch"
  }>;
  videoUrl?: string;
  pubName: string;
}

export default function PubAtmosphere({ images, videoUrl, pubName }: AtmosphereProps) {
  const [activeImage, setActiveImage] = useState(0);
  
  // Default atmosphere images if none provided
  const defaultImages = [
    {
      url: '/images/pub-interior-cozy.jpg',
      caption: 'Cozy fireside seating perfect for winter evenings',
      time: 'Winter Evenings'
    },
    {
      url: '/images/pub-garden.jpg',
      caption: 'Beautiful beer garden for sunny afternoons',
      time: 'Summer Days'
    },
    {
      url: '/images/pub-bar.jpg',
      caption: 'Well-stocked bar with local ales and craft beers',
      time: 'Happy Hour'
    }
  ];

  const displayImages = images || defaultImages;

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Experience The Atmosphere
            </h2>
            <p className="text-xl text-gray-600">
              Step inside {pubName} and feel the warmth of traditional British hospitality
            </p>
          </div>

          {/* Main Gallery */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image Carousel */}
            <div className="relative group">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={displayImages[activeImage].url}
                  alt={displayImages[activeImage].caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/hero-fallback.jpg';
                  }}
                />
                
                {/* Overlay with time of day */}
                <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold">{displayImages[activeImage].time}</span>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption */}
              <p className="mt-4 text-center text-gray-700 italic">
                {displayImages[activeImage].caption}
              </p>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeImage 
                        ? 'bg-secondary w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-primary mb-3">The Perfect Setting</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <p className="text-gray-700">Roaring log fires in winter months</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <p className="text-gray-700">Sun-drenched beer garden with outdoor seating</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <p className="text-gray-700">Historic features and original character throughout</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <p className="text-gray-700">Cozy snugs and private dining areas available</p>
                  </div>
                </div>
              </div>

              {/* Virtual Tour CTA */}
              {videoUrl && (
                <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-xl p-6 border-2 border-secondary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">Take a Virtual Tour</h4>
                      <p className="text-gray-600">Explore our pub from the comfort of your home</p>
                    </div>
                    <button className="bg-secondary text-white p-4 rounded-full hover:bg-secondary/90 transition-colors">
                      <Play className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}

              {/* Live Music Notice */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Volume2 className="w-6 h-6 text-purple-600" />
                  <h4 className="text-xl font-bold text-primary">Live Entertainment</h4>
                </div>
                <p className="text-gray-700">
                  Join us for live music every Friday & Saturday evening, 
                  plus our famous Sunday afternoon jazz sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}