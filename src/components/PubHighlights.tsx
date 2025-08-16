import React from 'react';
import { Calendar, Utensils, Gift, Users, Star, TrendingUp, Clock, Award, Music } from 'lucide-react';

interface PubHighlight {
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  badgeColor: string;
  icon: string;
  ctaText: string;
  ctaLink: string;
  image?: {
    asset: { url: string };
    alt?: string;
  };
  active: boolean;
  validFrom?: string;
  validUntil?: string;
}

interface PubHighlightsData {
  sectionTitle: string;
  sectionSubtitle: string;
  highlights: PubHighlight[];
  statisticsEnabled: boolean;
  statistics: {
    guestRating: string;
    happyGuests: string;
    yearsOfService: string;
    eventsYearly: string;
  };
  ctaEnabled: boolean;
  ctaText: string;
  ctaLink: string;
}

interface HighlightProps {
  pubName: string;
  highlightsData?: PubHighlightsData;
}

export default function PubHighlights({ pubName, highlightsData }: HighlightProps) {
  // Fallback data if no Sanity data is available - keeping minimal to avoid fake content
  const fallbackData: PubHighlightsData = {
    sectionTitle: "What's On This Week",
    sectionSubtitle: "Check back soon for our latest offers and events",
    highlights: [],
    statisticsEnabled: false,
    statistics: {
      guestRating: "4.5",
      happyGuests: "2,500+",
      yearsOfService: "15",
      eventsYearly: "50+"
    },
    ctaEnabled: true,
    ctaText: "Book Your Table Today",
    ctaLink: "/book-a-table-pub"
  };

  const data = highlightsData || fallbackData;

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'music': return Music;
      case 'food': return Utensils;
      case 'drinks': return Gift;
      case 'event': return Calendar;
      case 'star': return Star;
      case 'calendar': return Calendar;
      default: return Gift;
    }
  };

  // Badge color mapping
  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'orange': return 'bg-orange-100 text-orange-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'red': return 'bg-red-100 text-red-600';
      default: return 'bg-secondary/10 text-secondary';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              This Week
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">{data.sectionTitle}</h2>
            <p className="text-xl text-gray-600">{data.sectionSubtitle}</p>
          </div>

          {/* Highlights Grid */}
          <div className={`grid ${data.highlights.length === 1 ? 'md:grid-cols-1' : data.highlights.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
            {data.highlights.slice(0, 4).map((highlight, index) => {
              const IconComponent = getIcon(highlight.icon);
              const badgeColorClass = getBadgeColor(highlight.badgeColor);
              
              return (
                <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-secondary/70"></div>
                  {highlight.image && (
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={highlight.image.asset.url} 
                        alt={highlight.image.alt || highlight.title}
                        className="w-full h-full object-cover opacity-10"
                      />
                    </div>
                  )}
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-secondary" />
                      </div>
                      {highlight.badge && (
                        <span className={`${badgeColorClass} px-3 py-1 rounded-full text-xs font-semibold uppercase`}>
                          {highlight.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{highlight.title}</h3>
                    <p className="text-2xl font-bold text-secondary mb-3">{highlight.subtitle}</p>
                    <p className="text-sm text-gray-600 mb-6">{highlight.description}</p>
                    <a 
                      href={highlight.ctaLink} 
                      className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors group"
                    >
                      {highlight.ctaText}
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Bar */}
          {data.statisticsEnabled && (
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary">{data.statistics.guestRating}</div>
                  <div className="text-sm text-gray-600">Guest Rating</div>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary">{data.statistics.happyGuests}</div>
                  <div className="text-sm text-gray-600">Happy Guests</div>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary">{data.statistics.yearsOfService}</div>
                  <div className="text-sm text-gray-600">Years of Service</div>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary">{data.statistics.eventsYearly}</div>
                  <div className="text-sm text-gray-600">Events Yearly</div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          {data.ctaEnabled && (
            <div className="text-center mt-12">
              <a
                href={data.ctaLink}
                className="inline-flex items-center px-8 py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {data.ctaText}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}