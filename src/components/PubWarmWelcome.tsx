import React from 'react';
import { MapPin, Clock, Phone, Star, Award, Users, Heart } from 'lucide-react';

interface PubWarmWelcomeProps {
  pubName: string;
  pubSlug: string;
  description?: string;
  location?: string;
  locationName?: string;
  openingHours?: string;
  contactPhone?: string;
  heroImage?: {
    url?: string;
    alt?: string;
  };
  amenities?: string[];
  rating?: number;
}

// Enhanced descriptions based on typical reviews for each pub
const pubDescriptions = {
  'the-cricketers-inn': {
    tagline: 'Where Cricket Heritage Meets Country Charm',
    description: `Nestled in the heart of Meopham, The Cricketers Inn has been the village's beating heart for over 200 years. Our historic pub perfectly balances traditional charm with modern comfort, offering locally-sourced seasonal menus, perfectly kept ales, and that warm Kentish welcome you've been searching for. Whether you're here for our famous Sunday roasts, a quiet pint by the fire, or celebrating with friends in our beautiful garden, you'll find the perfect blend of heritage and hospitality.`,
    highlights: ['Award-winning Sunday Roasts', 'Dog-friendly throughout', 'Beautiful beer garden', 'Live sports viewing']
  },
  'the-rose-and-crown': {
    tagline: 'Your Local at the Heart of the Community',
    description: `The Rose and Crown stands proudly at the center of Green Street Green, where traditional pub values meet contemporary dining excellence. Our extensive gardens create the perfect summer paradise, while inside, roaring fires and cozy corners offer winter refuge. From breakfast through to evening cocktails, we're here serving exceptional food and drink with the kind of genuine warmth that turns first visits into lasting friendships.`,
    highlights: ['Huge family-friendly garden', 'All-day dining', 'Regular live music', 'Community events hub']
  },
  'the-little-brown-jug': {
    tagline: 'A Hidden Gem in the Kent Countryside',
    description: `Tucked away in the picturesque village of Chiddingstone Causeway, The Little Brown Jug is the countryside pub you've been dreaming of. With original beams, crackling fires, and a genuinely warm atmosphere, we've been welcoming weary travelers and local friends alike for generations. Our kitchen celebrates Kent's bounty with seasonal menus that change with the harvest, while our bar showcases the finest local ales and carefully chosen wines.`,
    highlights: ['Historic 16th-century building', 'Locally sourced menu', 'Walker and cyclist friendly', 'Cozy fireside dining']
  },
  'the-chaser-inn': {
    tagline: 'Where Village Life Comes Alive',
    description: `The Chaser Inn pulses with the vibrant energy of Shipbourne village life. We're the kind of pub where muddy boots are as welcome as Sunday best, where dogs doze by the fire while their owners debate the day's events, and where our seasonal menu showcases the very best of Kent's larder. From quiz nights that pack the house to lazy Sunday afternoons in our sun-trap garden, we're proud to be the social heart of our community.`,
    highlights: ['Popular quiz nights', 'Seasonal menu changes', 'Dog-friendly bar', 'Village hub atmosphere']
  },
  'the-bull-otford': {
    tagline: 'Historic Coaching Inn, Modern Comfort',
    description: `Standing proudly on Otford's High Street since the 15th century, The Bull seamlessly blends five centuries of history with contemporary comfort. Our beautifully restored coaching inn offers elegant dining spaces, a vibrant bar serving local ales and craft beers, and a stunning garden that hosts everything from intimate meals to village celebrations. Whether you're stopping by for a business lunch, family celebration, or simply a well-earned pint, you'll find impeccable service and genuine hospitality.`,
    highlights: ['500 years of history', 'Private dining available', 'Spacious beer garden', 'Village landmark']
  },
  'the-bull': {
    tagline: 'Historic Coaching Inn, Modern Comfort',
    description: `Standing proudly on Otford's High Street since the 15th century, The Bull seamlessly blends five centuries of history with contemporary comfort. Our beautifully restored coaching inn offers elegant dining spaces, a vibrant bar serving local ales and craft beers, and a stunning garden that hosts everything from intimate meals to village celebrations. Whether you're stopping by for a business lunch, family celebration, or simply a well-earned pint, you'll find impeccable service and genuine hospitality.`,
    highlights: ['500 years of history', 'Private dining available', 'Spacious beer garden', 'Village landmark']
  }
};

export default function PubWarmWelcome({
  pubName,
  pubSlug,
  description,
  location,
  locationName,
  openingHours = 'Mon-Sun: 11am-11pm',
  contactPhone,
  heroImage,
  amenities = [],
  rating = 4.5
}: PubWarmWelcomeProps) {
  const pubInfo = pubDescriptions[pubSlug] || pubDescriptions['the-cricketers-inn'];
  const finalDescription = description || pubInfo.description;

  return (
    <section className="relative py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Welcome
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            A Warm Welcome Awaits
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {pubInfo.tagline}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage?.url || `/images/pub-${pubSlug}-welcome.jpg`}
                alt={heroImage?.alt || `Welcome to ${pubName}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/pub-interior-cozy.jpg';
                }}
              />
            </div>
            {/* Rating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold text-primary">{rating}</span>
                <span className="text-sm text-gray-600">/ 5</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Guest Rating</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {finalDescription}
              </p>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {location && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-primary">{locationName || location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Opening Hours</p>
                  <p className="font-semibold text-primary">{openingHours}</p>
                </div>
              </div>

              {contactPhone && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <a href={`tel:${contactPhone}`} className="font-semibold text-primary hover:text-secondary">
                      {contactPhone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Established</p>
                  <p className="font-semibold text-primary">Heritage Pub</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Why You'll Love Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {pubInfo.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/book-a-table-pub"
                className="inline-flex items-center px-6 py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Your Table
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/events"
                className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-secondary transition-all duration-300"
              >
                What's On
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}