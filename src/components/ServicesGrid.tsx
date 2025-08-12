import React from 'react';
import { Users, Gift, Calendar, Utensils, Music, Beer } from 'lucide-react';

export default function ServicesGrid() {
  const services = [
    {
      icon: Calendar,
      title: 'Events & Live Music',
      description: 'Regular entertainment across all our venues',
      link: '/events',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Utensils,
      title: 'Sunday Roasts',
      description: 'Award-winning traditional roasts every Sunday',
      link: '/book-table',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Music,
      title: 'Quiz Nights',
      description: 'Test your knowledge at our weekly pub quizzes',
      link: '/events',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Beer,
      title: 'Local Ales',
      description: 'Carefully selected beers from regional breweries',
      link: '/our-pubs',
      color: 'from-amber-500 to-yellow-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">What We Offer</span>
            <h2 className="text-4xl font-bold text-primary mt-2 mb-4">Everything You Need For The Perfect Visit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate dinners to large celebrations, we have something for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <a
                  key={index}
                  href={service.link}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative p-6">
                    <div className="inline-flex p-3 rounded-lg bg-gray-100 group-hover:bg-white/20 transition-colors duration-300 mb-4">
                      <Icon className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary group-hover:text-white transition-colors duration-300">
                      <span className="font-semibold">Learn more</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}