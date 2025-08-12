import React from 'react';
import { Calendar, Utensils, Gift, Users, Star, TrendingUp } from 'lucide-react';

interface HighlightProps {
  pubName: string;
  highlights?: {
    weeklySpecial?: string;
    upcomingEvent?: {
      title: string;
      date: string;
    };
    featuredDish?: {
      name: string;
      price: string;
    };
  };
}

export default function PubHighlights({ pubName, highlights }: HighlightProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">This Week at {pubName}</span>
            <h2 className="text-4xl font-bold text-primary mt-2">Don't Miss Out</h2>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Special Offer */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500"></div>
              <div className="relative p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Gift className="w-10 h-10" />
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">LIMITED TIME</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Tuesday Special</h3>
                <p className="text-lg mb-4">2 Mains for £25</p>
                <p className="text-sm opacity-90">Every Tuesday, all day. Book your table now!</p>
                <div className="mt-6">
                  <button className="bg-white text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Book Now →
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Event */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500"></div>
              <div className="relative p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-10 h-10" />
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">THIS FRIDAY</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Live Jazz Night</h3>
                <p className="text-lg mb-4">The Blue Notes Trio</p>
                <p className="text-sm opacity-90">8pm start • Free entry • Table booking recommended</p>
                <div className="mt-6">
                  <button className="bg-white text-indigo-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Reserve Table →
                  </button>
                </div>
              </div>
            </div>

            {/* Chef's Special */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500"></div>
              <div className="relative p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Utensils className="w-10 h-10" />
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">CHEF'S PICK</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Pan-Seared Sea Bass</h3>
                <p className="text-lg mb-4">£18.95</p>
                <p className="text-sm opacity-90">With seasonal vegetables and lemon butter sauce</p>
                <div className="mt-6">
                  <button className="bg-white text-teal-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    View Menu →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="flex justify-center mb-2">
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-primary">4.5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-primary">2,500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-primary">15</div>
                <div className="text-sm text-gray-600">Years of Service</div>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  <Calendar className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600">Events Per Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}