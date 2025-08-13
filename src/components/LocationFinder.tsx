import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Car, Train } from 'lucide-react';
import { getPubs } from '../lib/sanity';

interface Location {
  name: string;
  slug: string;
  address: string;
  postcode: string;
  phone: string;
  openingHours: string;
  image: string;
  features: string[];
  transport: {
    parking: string;
    train: string;
  };
}

export default function LocationFinder() {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [pubImages, setPubImages] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Fetch pub data from Sanity to get actual images
    getPubs().then(pubs => {
      const images: Record<string, string> = {};
      pubs.forEach(pub => {
        const slug = pub.slug?.current || pub.slug;
        // Use exteriorImage first, then image, then heroImage as fallback
        const imageUrl = pub.exteriorImage?.asset?.url || pub.image?.asset?.url || pub.heroImage?.asset?.url;
        if (imageUrl) {
          images[slug] = imageUrl;
        }
      });
      setPubImages(images);
    }).catch(console.error);
  }, []);

  const locations: Location[] = [
    {
      name: 'The Bull',
      slug: 'the-bull-otford',
      address: 'High Street, Otford',
      postcode: 'TN14 5PG',
      phone: '01959 580585',
      openingHours: 'Mon-Fri: 12pm-11pm, Sat: 12pm-12am, Sun: 12pm-10pm',
      image: '/images/hero-fallback.jpg', // Bull image not available, using fallback
      features: ['Historic Coaching Inn', 'Private Dining', 'Garden', 'Dog Friendly'],
      transport: {
        parking: 'Public car park opposite',
        train: 'Otford Station (0.3 miles)'
      }
    },
    {
      name: 'The Chaser Inn',
      slug: 'the-chaser-inn',
      address: 'Stumble Hill, Shipbourne',
      postcode: 'TN11 9PE',
      phone: '01732 810360',
      openingHours: 'Mon-Fri: 12pm-11pm, Sat: 12pm-12am, Sun: 12pm-10pm',
      image: '/images/chaser-inn.jpg',
      features: ['Live Music', 'Garden', 'Quiz Nights', 'Dog Friendly'],
      transport: {
        parking: 'Free parking',
        train: 'Tonbridge Station (4 miles)'
      }
    },
    {
      name: 'The Cricketers Inn',
      slug: 'the-cricketers-inn',
      address: 'Wrotham Road, Meopham Green',
      postcode: 'DA13 0QA',
      phone: '01474 812163',
      openingHours: 'Mon-Fri: 12pm-11pm, Sat: 12pm-12am, Sun: 12pm-10pm',
      image: '/images/cricketers-inn.jpg',
      features: ['Dog Friendly', 'Garden', 'Parking', 'Live Sports'],
      transport: {
        parking: 'Free car park for 50 cars',
        train: 'Meopham Station (1.2 miles)'
      }
    },
    {
      name: 'The Little Brown Jug',
      slug: 'the-little-brown-jug',
      address: 'High Street, Chiddingstone Causeway',
      postcode: 'TN11 8JJ',
      phone: '01892 870318',
      openingHours: 'Mon-Fri: 12pm-11pm, Sat: 12pm-12am, Sun: 12pm-10pm',
      image: '/images/little-brown-jug.jpg',
      features: ['Head Office', 'Historic Building', 'Real Ales', 'Dog Friendly'],
      transport: {
        parking: 'Village car park nearby',
        train: 'Penshurst Station (2 miles)'
      }
    },
    {
      name: 'The Rose & Crown',
      slug: 'the-rose-and-crown',
      address: 'Green Street Green, Orpington',
      postcode: 'BR6 6BT',
      phone: '01689 869029',
      openingHours: 'Mon-Fri: 12pm-11pm, Sat: 12pm-12am, Sun: 12pm-10pm',
      image: '/images/rose-and-crown.jpg',
      features: ['Large Garden', 'Family Friendly', 'Parking', 'Dog Friendly'],
      transport: {
        parking: 'On-site parking available',
        train: 'Chelsfield Station (1.5 miles)'
      }
    }
  ];

  const filteredLocations = selectedLocation === 'all' 
    ? locations 
    : locations.filter(loc => loc.slug === selectedLocation);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Find Your Local</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">Our Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Five unique pubs across Kent and South East London, each with its own character
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedLocation('all')}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedLocation === 'all'
                    ? 'bg-secondary text-primary'
                    : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-secondary/50'
                }`}
              >
                All Locations
              </button>
              {locations.map(loc => (
                <button
                  key={loc.slug}
                  onClick={() => setSelectedLocation(loc.slug)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedLocation === loc.slug
                      ? 'bg-secondary text-primary'
                      : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-secondary/50'
                  }`}
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Locations Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map Area */}
            <div className="bg-gray-200 rounded-xl overflow-hidden h-[600px] relative">
              {selectedLocation === 'all' ? (
                // Show overview map for all locations
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d159488.0!2d0.2!3d51.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : selectedLocation === 'the-bull-otford' ? (
                // The Bull map
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2493.904093306749!2d0.18611027660845464!3d51.312888771769785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df4db978c81c1b%3A0xd66f455756ad699f!2sThe%20Bull%20Otford!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : selectedLocation === 'the-chaser-inn' ? (
                // The Chaser Inn map
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.498833271306!2d0.27940319999999996!3d51.2467242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df4eb4b05c18c1%3A0x34dc01e2a04954fe!2sThe%20Chaser%20Inn!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : selectedLocation === 'the-cricketers-inn' ? (
                // The Cricketers Inn map
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.3173076202774!2d0.34097931580257!3d51.366585179617054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8b546d4579b01%3A0x5179ff7bd7517ace!2sThe%20Cricketers%20Inn!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : selectedLocation === 'the-little-brown-jug' ? (
                // The Little Brown Jug map
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2500.154703105503!2d0.173989!3d51.197801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df501777eaf4f9%3A0x5eae38e6d7d85e0!2sThe%20Little%20Brown%20Jug!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : selectedLocation === 'the-rose-and-crown' ? (
                // The Rose & Crown map
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.8696234259864!2d0.08827199999999999!3d51.350308000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8ab547005a3d9%3A0x179ee3cf1e1a6ee0!2sThe%20Rose%20%26%20Crown!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : null}
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
                <p className="text-sm font-semibold text-gray-700">
                  {selectedLocation === 'all' ? 'All WH Pubs Locations' : filteredLocations[0]?.name || 'Location'}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedLocation === 'all' ? '5 traditional pubs across Kent & South East London' : 'Click for directions'}
                </p>
              </div>
            </div>

            {/* Location Cards */}
            <div className="space-y-4 h-[600px] overflow-y-auto pr-2">
              {filteredLocations.map((location) => (
                <div 
                  key={location.slug}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="flex">
                    {/* Pub Image */}
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={pubImages[location.slug] || location.image}
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/images/hero-fallback.jpg';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-primary">{location.name}</h3>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{location.address}, {location.postcode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${location.phone}`} className="hover:text-secondary">
                            {location.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{location.openingHours}</span>
                        </div>
                      </div>

                      {/* Transport Info */}
                      <div className="flex gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Car className="w-3 h-3" />
                          <span>{location.transport.parking}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Train className="w-3 h-3" />
                          <span>{location.transport.train}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {location.features.map((feature, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <a 
                          href={`/${location.slug}`}
                          className="text-primary hover:text-secondary font-semibold text-sm flex items-center gap-1"
                        >
                          View Pub
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address + ' ' + location.postcode)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-secondary font-medium text-sm flex items-center gap-1"
                        >
                          Get Directions
                          <Navigation className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Can't decide? Let us help you find the perfect pub for your occasion.</p>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}