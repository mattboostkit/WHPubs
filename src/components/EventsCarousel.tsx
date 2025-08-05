import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import SanityPortableText from '@/components/SanityPortableText';

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  description: any[];
  image?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  bookingUrl?: string;
  locationOverride?: string;
  associatedPub?: {
    name: string;
    slug: { current: string };
  };
}

interface EventsCarouselProps {
  events: Event[];
  title?: string;
  subtitle?: string;
}

export default function EventsCarousel({ events, title = "Discover What's On", subtitle = "Be our guest" }: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatEventDate = (dateString: string) => {
    if (!dateString) return 'Date TBC';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, events.length - visibleCards);
      return Math.min(prevIndex + 1, maxIndex);
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const canGoNext = currentIndex < Math.max(0, events.length - visibleCards);
  const canGoPrev = currentIndex > 0;

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-secondary uppercase tracking-widest text-sm font-semibold mb-4">{subtitle}</p>
          <h2 className="text-5xl font-bold text-primary mb-8">{title}</h2>
        </div>

        {/* All Events Button */}
        <div className="text-center mb-8">
          <a href="/events">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
              All Events
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {events.length > visibleCards && (
            <>
              <button
                onClick={prevSlide}
                disabled={!canGoPrev}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 lg:-translate-x-12 p-3 rounded-full shadow-lg transition-all ${
                  canGoPrev
                    ? 'bg-white hover:bg-gray-100 text-primary'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Previous events"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                disabled={!canGoNext}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 lg:translate-x-12 p-3 rounded-full shadow-lg transition-all ${
                  canGoNext
                    ? 'bg-white hover:bg-gray-100 text-primary'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Next events"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Carousel Track */}
          <div className="overflow-hidden" ref={carouselRef}>
            <div 
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {events.map((event) => (
                <div
                  key={event._id}
                  className={`flex-shrink-0 w-full ${
                    visibleCards === 1 ? 'sm:w-full' : 
                    visibleCards === 2 ? 'sm:w-1/2' : 
                    'lg:w-1/3'
                  }`}
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    {/* Event Image */}
                    {event.image?.asset?.url && (
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={event.image.asset.url + '?w=600&h=275&fit=crop'}
                          alt={event.image.alt || event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/images/event-fallback.jpg';
                          }}
                        />
                        {/* Location Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-white/90 text-primary">
                            {event.associatedPub?.name || 'WH Pubs'}
                          </Badge>
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <h3 className="text-xl font-semibold text-primary line-clamp-2">{event.title}</h3>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Date and Location */}
                      <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-secondary" />
                          {formatEventDate(event.date)}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-secondary" />
                          {event.locationOverride || event.associatedPub?.name || 'Location TBC'}
                        </span>
                      </div>

                      {/* Description */}
                      {event.description && (
                        <div className="prose prose-sm max-w-none mb-4 line-clamp-3">
                          <SanityPortableText value={event.description} />
                        </div>
                      )}

                      {/* CTA Button */}
                      {event.bookingUrl && (
                        <a 
                          href={event.bookingUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="w-full bg-secondary/20 hover:bg-secondary/30 text-primary border border-secondary/40"
                          >
                            Book Now
                            <ExternalLink className="w-3 h-3 ml-2" />
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          {events.length > visibleCards && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.max(1, events.length - visibleCards + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}