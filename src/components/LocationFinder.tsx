import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Car, Train } from 'lucide-react';

interface Location {
  name: string;
  slug: string;
  address: string;
  postcode: string;
  phone: string;
  openingHours: string;
  image: string;
  distance?: string;
  features: string[];
  transport: {
    parking: string;
    train: string;
  };
}

export default function LocationFinder() {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const locations: Location[] = [
    {
      name: 'The Cricketers Inn',
      slug: 'the-cricketers-inn',
      address: 'Wrotham Road, Meopham',
      postcode: 'DA13 0QA',
      phone: '01474 812163',
      openingHours: 'Mon-Sun: 11am-11pm',
      image: '/images/pub-cricketers.jpg',
      distance: '2.3 miles',
      features: ['Dog Friendly', 'Garden', 'Parking', 'Live Sports'],
      transport: {
        parking: 'Free car park for 50 cars',
        train: 'Meopham Station (1.2 miles)'
      }
    },
    {
      name: 'The Rose and Crown',
      slug: 'the-rose-and-crown',
      address: 'Green Street Green, Orpington',
      postcode: 'BR6 6BT',
      phone: '01689 851200',
      openingHours: 'Mon-Sun: 11am-11pm',
      image: '/images/pub-rose-crown.jpg',
      distance: '3.1 miles',
      features: ['Large Garden', 'Family Friendly', 'Parking'],
      transport: {
        parking: 'On-site parking available',
        train: 'Chelsfield Station (1.5 miles)'
      }
    },
    {
      name: 'The Little Brown Jug',
      slug: 'the-little-brown-jug',
      address: 'Chiddingstone Causeway',
      postcode: 'TN11 8JJ',
      phone: '01892 870328',
      openingHours: 'Mon-Sun: 11am-11pm',
      image: '/images/pub-brown-jug.jpg',
      distance: '4.7 miles',
      features: ['Historic Building', 'Real Ales', 'Dog Friendly'],
      transport: {
        parking: 'Village car park nearby',
        train: 'Penshurst Station (2 miles)'
      }
    },
    {
      name: 'The Chaser Inn',
      slug: 'the-chaser-inn',
      address: 'Stumble Hill, Shipbourne',
      postcode: 'TN11 9PE',
      phone: '01732 810360',
      openingHours: 'Mon-Sun: 12pm-11pm',
      image: '/images/pub-chaser.jpg',
      distance: '5.2 miles',
      features: ['Live Music', 'Garden', 'Quiz Nights'],
      transport: {
        parking: 'Free parking',
        train: 'Tonbridge Station (4 miles)'
      }
    },
    {
      name: 'The Bull',
      slug: 'the-bull',
      address: 'High Street, Otford',
      postcode: 'TN14 5PG',
      phone: '01959 522233',
      openingHours: 'Mon-Sun: 11am-11pm',
      image: '/images/pub-bull.jpg',
      distance: '6.8 miles',
      features: ['Historic Coaching Inn', 'Private Dining', 'Garden'],
      transport: {
        parking: 'Public car park opposite',
        train: 'Otford Station (0.3 miles)'
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159488.29796033!2d0.0!3d51.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDE4JzAwLjAiTiAwwrAwMCcwMC4wIkU!5e0!3m2!1sen!2suk!4v1635959040851!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              />
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
                <p className="text-sm font-semibold text-gray-700">Interactive Map</p>
                <p className="text-xs text-gray-500">Click markers for details</p>
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
                    {/* Image */}
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/images/pub-fallback.jpg';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-primary">{location.name}</h3>
                        {location.distance && (
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            {location.distance}
                          </span>
                        )}
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