import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Calendar, X, ExternalLink } from 'lucide-react';
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

interface PubEventsSectionProps {
  events: Event[];
  pubName: string;
}

export default function PubEventsSection({ events, pubName }: PubEventsSectionProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

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

  if (!events || events.length === 0) {
    return (
      <div className="mb-12 p-8 bg-white/80 rounded-xl text-center shadow-sm">
        <CalendarDays className="w-12 h-12 mx-auto mb-4 text-primary/40" />
        <h3 className="text-xl font-semibold text-primary mb-2">No Upcoming Events</h3>
        <p className="text-primary/70">Check back soon for events at {pubName}!</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center">
          <CalendarDays className="w-6 h-6 mr-3 text-primary/80" /> Upcoming Events
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {events.map((event) => (
            <Card key={event._id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
              {event.image?.asset?.url && (
                <div 
                  className="h-[300px] overflow-hidden cursor-pointer relative group"
                  onClick={() => setExpandedImage(event.image?.asset?.url || null)}
                >
                  <img
                    src={event.image.asset.url + '?w=600&h=300&fit=crop'}
                    alt={event.image.alt || event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/event-fallback.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium text-primary">Click to expand</span>
                    </div>
                  </div>
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  {event.date && (
                    <Badge variant="secondary" className="ml-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatEventDate(event.date)}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {event.description && (
                  <div className="prose prose-sm max-w-none mb-4">
                    <SanityPortableText value={event.description} />
                  </div>
                )}
                {event.bookingUrl && (
                  <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer" className="no-underline block">
                    <Button size="sm" className="w-full hover:shadow-md">
                      Book Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setExpandedImage(null)}
        >
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close expanded image"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={expandedImage + '?w=2400&h=1200&fit=contain'}
            alt="Expanded event image"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}