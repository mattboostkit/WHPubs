import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface Pub {
  name: string;
  slug: { current: string };
}

interface EventsFilterProps {
  events: Event[];
  pubs: Pub[];
  initialPubSlug?: string;
}

export default function EventsFilter({ events, pubs, initialPubSlug }: EventsFilterProps) {
  const [selectedPub, setSelectedPub] = useState<string>(initialPubSlug || 'all');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  useEffect(() => {
    if (selectedPub === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => 
        event.associatedPub?.slug.current === selectedPub
      ));
    }
  }, [selectedPub, events]);

  const formatEventDate = (dateString: string) => {
    if (!dateString) return 'Date TBC';
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleDateString('en-GB', { month: 'long' });
      const year = date.getFullYear();
      const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      
      return `${weekday} ${day} ${month} ${year} at ${displayHours}:${displayMinutes} ${ampm}`;
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <div className="bg-secondary/10 p-6 rounded-lg">
        <div className="max-w-md mx-auto">
          <label htmlFor="pub-filter" className="block text-sm font-medium text-primary mb-2">
            Filter events by pub:
          </label>
          <Select value={selectedPub} onValueChange={setSelectedPub}>
            <SelectTrigger id="pub-filter" className="w-full">
              <SelectValue placeholder="Select a pub" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pubs</SelectItem>
              {pubs.map((pub) => (
                <SelectItem key={pub.slug.current} value={pub.slug.current}>
                  {pub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-10 max-w-4xl mx-auto">
          {filteredEvents.map((event, index) => (
            <div
              key={event._id || `${event.slug.current}-${index}`}
              className="flex flex-col md:flex-row gap-6 border border-secondary/20 rounded-lg p-6 shadow-sm bg-white overflow-hidden"
            >
              {event.image?.asset?.url && (
                <div className="md:w-1/3 flex-shrink-0">
                  <img
                    src={event.image.asset.url + '?w=400&h=400&fit=crop'}
                    alt={event.image.alt || `Image for ${event.title}`}
                    className="w-full h-48 md:h-full object-cover rounded"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/event-fallback.jpg';
                    }}
                  />
                </div>
              )}
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold text-secondary mb-2">{event.title}</h2>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-primary/70 mb-3">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {formatEventDate(event.date)}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    {event.locationOverride || event.associatedPub?.name || 'Location TBC'}
                  </span>
                </div>

                {event.description && (
                  <div className="prose prose-sm max-w-none mb-4">
                    <SanityPortableText value={event.description} />
                  </div>
                )}

                {event.bookingUrl && (
                  <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      More Info / Book Now
                    </Button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-primary/80 mt-16">
          {selectedPub === 'all' 
            ? 'No events currently listed.'
            : `No upcoming events listed for ${pubs.find(p => p.slug.current === selectedPub)?.name || 'this pub'}.`
          }
        </p>
      )}
    </div>
  );
}