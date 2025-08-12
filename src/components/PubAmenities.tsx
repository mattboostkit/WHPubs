import React from 'react';
import { 
  Wifi, 
  Car, 
  Heart, 
  Users, 
  TreePine, 
  Accessibility,
  Bus,
  UtensilsCrossed,
  Music,
  Baby,
  Gamepad2,
  Tv,
  CreditCard,
  Cigarette
} from 'lucide-react';

interface PubAmenitiesProps {
  pubName: string;
  pubSlug: string;
  amenities?: string[];
}

// Standard amenities mapping with icons and descriptions
const amenitiesConfig = {
  // Accessibility & Family
  'Disabled Facilities': {
    icon: <Accessibility className="w-8 h-8" />,
    title: 'Disabled Facilities',
    description: 'Wheelchair accessible with disabled toilets'
  },
  'Family Friendly': {
    icon: <Users className="w-8 h-8" />,
    title: 'Family Friendly',
    description: 'Children welcome with high chairs available'
  },
  'Baby Changing': {
    icon: <Baby className="w-8 h-8" />,
    title: 'Baby Changing',
    description: 'Baby changing facilities available'
  },
  
  // Pet & Outdoor
  'Dog Friendly': {
    icon: <Heart className="w-8 h-8" />,
    title: 'Dog Friendly',
    description: 'Four-legged friends welcome throughout'
  },
  'Beer Garden': {
    icon: <TreePine className="w-8 h-8" />,
    title: 'Beer Garden',
    description: 'Beautiful outdoor seating area'
  },
  'Garden': {
    icon: <TreePine className="w-8 h-8" />,
    title: 'Garden',
    description: 'Spacious outdoor dining area'
  },
  'Outdoor Seating': {
    icon: <TreePine className="w-8 h-8" />,
    title: 'Outdoor Seating',
    description: 'Al fresco dining available'
  },
  
  // Transport & Parking
  'Car Park': {
    icon: <Car className="w-8 h-8" />,
    title: 'Car Park',
    description: 'Convenient on-site parking available'
  },
  'Parking': {
    icon: <Car className="w-8 h-8" />,
    title: 'Parking',
    description: 'Parking facilities available'
  },
  'Coaches Accepted': {
    icon: <Bus className="w-8 h-8" />,
    title: 'Coaches Accepted',
    description: 'Group bookings and coach parties welcome'
  },
  
  // Technology & Services
  'WiFi': {
    icon: <Wifi className="w-8 h-8" />,
    title: 'Free WiFi',
    description: 'Complimentary wireless internet throughout'
  },
  'Free WiFi': {
    icon: <Wifi className="w-8 h-8" />,
    title: 'Free WiFi',
    description: 'Complimentary wireless internet throughout'
  },
  'Card Payments': {
    icon: <CreditCard className="w-8 h-8" />,
    title: 'Card Payments',
    description: 'All major cards accepted'
  },
  'Contactless Payment': {
    icon: <CreditCard className="w-8 h-8" />,
    title: 'Contactless Payment',
    description: 'Tap to pay available'
  },
  
  // Entertainment & Dining
  'Live Music': {
    icon: <Music className="w-8 h-8" />,
    title: 'Live Music',
    description: 'Regular live entertainment events'
  },
  'Sports TV': {
    icon: <Tv className="w-8 h-8" />,
    title: 'Sports TV',
    description: 'Live sports shown on big screens'
  },
  'Pool Table': {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: 'Pool Table',
    description: 'Games room with pool table'
  },
  'Games Area': {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: 'Games Area',
    description: 'Entertainment area with games'
  },
  'Function Room': {
    icon: <Users className="w-8 h-8" />,
    title: 'Function Room',
    description: 'Private space for special events'
  },
  'Sunday Roast': {
    icon: <UtensilsCrossed className="w-8 h-8" />,
    title: 'Sunday Roast',
    description: 'Traditional Sunday lunch served'
  },
  
  // Smoking
  'Smoking Area': {
    icon: <Cigarette className="w-8 h-8" />,
    title: 'Smoking Area',
    description: 'Designated outdoor smoking area'
  },
  
  // Special Features
  'Tiki Huts': {
    icon: <TreePine className="w-8 h-8" />,
    title: 'Tiki Huts',
    description: 'Unique tropical-themed outdoor dining spaces'
  }
};

// Pub-specific amenities based on what we know about each pub
// All pubs have Sunday Roast and Dog Friendly as standard
const pubAmenities = {
  'the-bull': [
    'Disabled Facilities', 'Dog Friendly', 'Family Friendly', 'Beer Garden', 
    'Car Park', 'Free WiFi', 'Card Payments', 'Live Music', 'Sunday Roast', 'Sports TV'
  ],
  'the-bull-otford': [
    'Disabled Facilities', 'Dog Friendly', 'Family Friendly', 'Beer Garden', 
    'Car Park', 'Free WiFi', 'Card Payments', 'Live Music', 'Sunday Roast', 'Sports TV'
  ],
  'the-cricketers-inn': [
    'Disabled Facilities', 'Dog Friendly', 'Family Friendly', 'Garden', 
    'Car Park', 'Free WiFi', 'Card Payments', 'Live Music', 'Sunday Roast', 'Function Room'
  ],
  'the-rose-and-crown': [
    'Disabled Facilities', 'Dog Friendly', 'Family Friendly', 'Beer Garden', 'Tiki Huts',
    'Car Park', 'Free WiFi', 'Card Payments', 'Games Area', 'Sunday Roast', 'Baby Changing'
  ],
  'the-little-brown-jug': [
    'Disabled Facilities', 'Dog Friendly', 'Family Friendly', 'Garden', 'Tiki Huts',
    'Car Park', 'Free WiFi', 'Card Payments', 'Live Music', 'Sunday Roast'
  ],
  'the-chaser-inn': [
    'Disabled Facilities', 'Dog Friendly', 'Family Friendly', 'Garden', 
    'Car Park', 'Free WiFi', 'Card Payments', 'Pool Table', 'Sunday Roast', 'Sports TV'
  ]
};

export default function PubAmenities({ pubName, pubSlug, amenities }: PubAmenitiesProps) {
  // Use provided amenities or fallback to pub-specific default amenities
  const displayAmenities = amenities || pubAmenities[pubSlug] || pubAmenities['the-bull'];
  
  // Filter to only show amenities we have configured
  const configuredAmenities = displayAmenities.filter(amenity => amenitiesConfig[amenity]);

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              {pubName} Amenities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              Top-notch amenities to make sure you have a great time. Here's what you can expect when you visit {pubName}:
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {configuredAmenities.map((amenityKey, index) => {
              const amenity = amenitiesConfig[amenityKey];
              if (!amenity) return null;

              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-secondary/20"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 text-gray-400 group-hover:text-secondary transition-colors duration-300 flex items-center justify-center">
                    {amenity.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
                    {amenity.title}
                  </h3>
                  
                  {/* Description - shown on hover for desktop, always visible on mobile */}
                  <p className="text-xs text-gray-600 leading-relaxed opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300">
                    {amenity.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-6">
              Have questions about our facilities? Get in touch with our friendly team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
              </a>
              <a
                href="/book-table"
                className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-secondary transition-all duration-300"
              >
                Book Your Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}