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

export default function PubHighlights({ pubName, highlights }: HighlightProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              This Week
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">What's On at {pubName}</h2>
            <p className="text-xl text-gray-600">Don't miss out on our special offers and events</p>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Special Offer */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-secondary/70"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    Limited Time
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Tuesday Special</h3>
                <p className="text-2xl font-bold text-secondary mb-3">2 Mains for £25</p>
                <p className="text-sm text-gray-600 mb-6">Every Tuesday, all day. Perfect for a midweek treat!</p>
                <a 
                  href="/book-table" 
                  className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors group"
                >
                  Book Now
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Upcoming Event */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/70"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    This Friday
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Live Music Night</h3>
                <p className="text-lg font-semibold text-gray-700 mb-3">Local Jazz Trio</p>
                <p className="text-sm text-gray-600 mb-6">8pm start • Free entry • Great atmosphere</p>
                <a 
                  href="/events" 
                  className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors group"
                >
                  View Events
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Chef's Special */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-secondary/70"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    Chef's Pick
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Pan-Seared Sea Bass</h3>
                <p className="text-2xl font-bold text-secondary mb-3">£18.95</p>
                <p className="text-sm text-gray-600 mb-6">With seasonal vegetables and lemon butter sauce</p>
                <a 
                  href="#menus" 
                  className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors group"
                >
                  View Menu
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Stats Bar - Simplified with consistent colors */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">4.5</div>
                <div className="text-sm text-gray-600">Guest Rating</div>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">2,500+</div>
                <div className="text-sm text-gray-600">Happy Guests</div>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">15</div>
                <div className="text-sm text-gray-600">Years of Service</div>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600">Events Yearly</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <a
              href="/book-table"
              className="inline-flex items-center px-8 py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Your Table Today
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}