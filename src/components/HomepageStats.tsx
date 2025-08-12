import React from 'react';
import { MapPin, Users, Calendar, Award } from 'lucide-react';

export default function HomepageStats() {
  const stats = [
    {
      icon: MapPin,
      value: '5',
      label: 'Traditional Pubs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      value: '50,000+',
      label: 'Happy Customers',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Calendar,
      value: '200+',
      label: 'Events Per Year',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Award,
      value: '4.5★',
      label: 'Average Rating',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bgColor} rounded-full -mr-12 -mt-12 opacity-20`}></div>
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-4`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}