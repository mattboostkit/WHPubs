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
      title: 'Sunday Roasts',
      description: 'Award-winning traditional roasts with all the trimmings, served in generous portions that have locals booking weeks ahead',
      image: '/images/sunday-roast.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Family Gatherings',
      description: 'Spacious dining areas and a welcoming garden perfect for bringing the whole family together',
      image: '/images/family-dining.jpg'
    },
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: 'Village Events',
      description: 'From quiz nights to live music, we\'re the social heart of Meopham village life',
      image: '/images/pub-event.jpg'
    }
  ],
  'the-rose-and-crown': [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'All-Day Dining',
      description: 'From morning coffee and breakfast through to evening cocktails, we\'re here whenever hunger strikes',
      image: '/images/breakfast-dining.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Garden Parties',
      description: 'Our extensive gardens are perfect for celebrations, with plenty of space for kids to play',
      image: '/images/garden-party.jpg'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Date Nights',
      description: 'Intimate corners, candlelit tables, and a carefully curated wine list for romantic evenings',
      image: '/images/romantic-dinner.jpg'
    }
  ],
  'the-little-brown-jug': [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Countryside Escapes',
      description: 'The perfect stop after exploring the Kent countryside, with hearty meals to refuel',
      image: '/images/countryside-pub.jpg'
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: 'Seasonal Dining',
      description: 'Menus that change with the seasons, showcasing the best of Kent\'s local produce',
      image: '/images/seasonal-food.jpg'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Cozy Retreats',
      description: 'Fireside tables and quiet corners perfect for escaping the everyday',
      image: '/images/cozy-pub.jpg'
    }
  ],
  'the-chaser-inn': [
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: 'Quiz Nights',
      description: 'Test your knowledge at our legendary quiz nights that bring the whole village together',
      image: '/images/quiz-night.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Dog Walkers',
      description: 'Four-legged friends are always welcome, with water bowls and treats at the ready',
      image: '/images/dog-friendly.jpg'
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: 'Weekend Brunches',
      description: 'Lazy weekend mornings with locally sourced breakfasts and proper coffee',
      image: '/images/brunch.jpg'
    }
  ],
  'the-bull-otford': [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Special Occasions',
      description: 'Private dining rooms and bespoke menus for birthdays, anniversaries, and celebrations',
      image: '/images/private-dining.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Business Lunches',
      description: 'Professional service and quiet spaces perfect for working lunches and meetings',
      image: '/images/business-lunch.jpg'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Village Life',
      description: 'At the heart of Otford for 500 years, we\'re where the community comes together',
      image: '/images/village-pub.jpg'
    }
  ],
  'the-bull': [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Special Occasions',
      description: 'Private dining rooms and bespoke menus for birthdays, anniversaries, and celebrations',
      image: '/images/private-dining.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Business Lunches',
      description: 'Professional service and quiet spaces perfect for working lunches and meetings',
      image: '/images/business-lunch.jpg'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Village Life',
      description: 'At the heart of Otford for 500 years, we\'re where the community comes together',
      image: '/images/village-pub.jpg'
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
                      <h4 className="text-2xl font-bold text-white mb-2">
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