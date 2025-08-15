import React, { useState } from 'react';
import { Coffee, Utensils, Users, PartyPopper, Calendar, Heart } from 'lucide-react';

interface PerfectForItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

interface PubPerfectForProps {
  pubName: string;
  pubSlug: string;
}

// Define perfect scenarios for each pub
const pubPerfectScenarios = {
  'the-cricketers-inn': [
    {
      icon: <Utensils className="w-6 h-6" />,
      title: 'Orangery Dining',
      description: 'Our stunning Orangery provides the perfect setting for special meals, with natural light flooding through glass walls and views over our gardens',
      image: '/images/orangery-dining.jpg'
    },
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: 'BBQ & Outside Events',
      description: 'Our extensive BBQ and outside area hosts everything from summer parties to live music nights, creating unforgettable outdoor experiences',
      image: '/images/bbq-outdoor.jpg'
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Bar Area Gatherings',
      description: 'Our welcoming bar area is the heart of village life, where locals gather for craft ales, conversation, and our famous pub quiz nights',
      image: '/images/bar-area.jpg'
    }
  ],
  'the-rose-and-crown': [
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: 'Tiki Hut Paradise',
      description: 'Escape to our tropical Tiki Huts for cocktails and summer parties - your own private island getaway in the heart of Kent',
      image: '/images/tiki-huts.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Family Fun Zone',
      description: 'Our dedicated Kids Area means parents can relax while children play safely, making us the perfect destination for family gatherings',
      image: '/images/kids-area.jpg'
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: 'Pizza Shack Delights',
      description: 'Watch our chefs craft authentic wood-fired pizzas in our Pizza Shack - perfect for casual dining or garden parties',
      image: '/images/pizza-shack.jpg'
    }
  ],
  'the-little-brown-jug': [
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: 'Tiki Hut Escapes',
      description: 'Our charming Tiki Huts offer intimate dining spaces perfect for celebrations or romantic dinners under the stars',
      image: '/images/tiki-retreat.jpg'
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: 'Playground Smokehouse',
      description: 'Experience authentic BBQ from our Playground Smokehouse, where slow-cooked meats and vibrant flavors create unforgettable meals',
      image: '/images/smokehouse.jpg'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'All-Weather Dining',
      description: 'Our innovative Retractable Roof means you can enjoy al fresco dining come rain or shine - the British weather won\'t stop your plans',
      image: '/images/retractable-roof.jpg'
    }
  ],
  'the-chaser-inn': [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'The Church Room',
      description: 'Our historic Church Room provides an intimate setting for private parties, with original features creating a unique atmosphere',
      image: '/images/church-room.jpg'
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Courtyard Gatherings',
      description: 'Our charming Courtyard is perfect for afternoon drinks or evening meals, offering a peaceful retreat from the bustle',
      image: '/images/courtyard.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Garden Celebrations',
      description: 'Our beautiful Garden hosts everything from wedding receptions to summer parties, with space for marquees and outdoor entertainment',
      image: '/images/garden-events.jpg'
    }
  ],
  'the-bull-otford': [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Fireside Dining',
      description: 'Cozy up by our roaring Fireplaces for intimate dinners or warming winter lunches - the perfect escape on chilly days',
      image: '/images/fireplace-dining.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Garden Gatherings',
      description: 'Our spacious Garden is ideal for summer celebrations, family parties, and lazy Sunday afternoons with friends',
      image: '/images/garden-party.jpg'
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Bar Social Hub',
      description: 'Our vibrant Bar area is where the village comes alive - from morning coffee to evening cocktails, it\'s the heart of Otford social life',
      image: '/images/bar-social.jpg'
    }
  ],
  'the-bull': [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Fireside Dining',
      description: 'Cozy up by our roaring Fireplaces for intimate dinners or warming winter lunches - the perfect escape on chilly days',
      image: '/images/fireplace-dining.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Garden Gatherings',
      description: 'Our spacious Garden is ideal for summer celebrations, family parties, and lazy Sunday afternoons with friends',
      image: '/images/garden-party.jpg'
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Bar Social Hub',
      description: 'Our vibrant Bar area is where the village comes alive - from morning coffee to evening cocktails, it\'s the heart of Otford social life',
      image: '/images/bar-social.jpg'
    }
  ]
};

export default function PubPerfectFor({ pubName, pubSlug }: PubPerfectForProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  
  // Get scenarios for this pub, with fallback
  const scenarios = pubPerfectScenarios[pubSlug] || pubPerfectScenarios['the-cricketers-inn'];
  const activeScenario = scenarios[hoveredIndex];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Experiences
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Perfect For Every Occasion
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From morning coffee to evening celebrations, we're here for life's moments
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Interactive Cards */}
            <div className="space-y-4 order-2 lg:order-1">
              {scenarios.map((scenario, index) => (
                <div
                  key={index}
                  className={`
                    group cursor-pointer transition-all duration-300 rounded-xl p-6
                    ${hoveredIndex === index 
                      ? 'bg-primary text-white shadow-2xl scale-[1.02]' 
                      : 'bg-white shadow-lg hover:shadow-xl'
                    }
                  `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => setHoveredIndex(index)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                      transition-all duration-300
                      ${hoveredIndex === index 
                        ? 'bg-secondary text-primary' 
                        : 'bg-secondary/10 text-secondary'
                      }
                    `}>
                      {scenario.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`
                        text-xl font-bold mb-2 transition-colors duration-300
                        ${hoveredIndex === index ? 'text-white' : 'text-primary'}
                      `}>
                        {scenario.title}
                      </h3>
                      <p className={`
                        text-sm leading-relaxed transition-colors duration-300
                        ${hoveredIndex === index ? 'text-white/90' : 'text-gray-600'}
                      `}>
                        {scenario.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className={`
                      transition-all duration-300 transform
                      ${hoveredIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}
                    `}>
                      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Dynamic Image Display */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={activeScenario.image}
                  alt={activeScenario.title}
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/images/pub-interior.jpg';
                  }}
                />
                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <h4 className="text-2xl font-bold text-secondary mb-2">
                        {activeScenario.title}
                      </h4>
                      <p className="text-white/90 text-sm">
                        {activeScenario.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Ready to experience {pubName}?</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/book-table"
                className="inline-flex items-center px-8 py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Your Visit
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/events"
                className="inline-flex items-center px-8 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-secondary transition-all duration-300"
              >
                See What's On
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}