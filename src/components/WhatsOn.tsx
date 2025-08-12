import React from 'react';
import { Calendar, Clock, MapPin, Music, Trophy, Mic2, Users, ArrowRight } from 'lucide-react';

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'music' | 'quiz' | 'food' | 'special';
  description: string;
  image?: string;
}

export default function WhatsOn() {
  const events: Event[] = [
    {
      title: 'Live Jazz Night',
      date: 'Every Friday',
      time: '8:00 PM',
      location: 'The Cricketers Inn',
      type: 'music',
      description: 'Enjoy smooth jazz with our resident trio'
    },
    {
      title: 'Pub Quiz Championship',
      date: 'Wednesdays',
      time: '7:30 PM',
      location: 'The Bull',
      type: 'quiz',
      description: '£100 prize for the winning team!'
    },
    {
      title: 'Sunday Roast Special',
      date: 'Every Sunday',
      time: '12:00 - 6:00 PM',
      location: 'All Locations',
      type: 'food',
      description: '2 courses for £19.95'
    },
    {
      title: 'Burns Night Celebration',
      date: 'January 25th',
      time: '7:00 PM',
      location: 'The Chaser Inn',
      type: 'special',
      description: 'Traditional Scottish feast with live bagpiper'
    }
  ];

  const getEventIcon = (type: string) => {
    switch(type) {
      case 'music': return <Music className="w-5 h-5" />;
      case 'quiz': return <Trophy className="w-5 h-5" />;
      case 'food': return <Mic2 className="w-5 h-5" />;
      case 'special': return <Users className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch(type) {
      case 'music': return 'bg-purple-500';
      case 'quiz': return 'bg-blue-500';
      case 'food': return 'bg-green-500';
      case 'special': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">This Week</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">What's On</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From live music to quiz nights, there's always something happening at WH Pubs
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {events.map((event, index) => (
              <div 
                key={index}
                className="group bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-secondary/20 hover:shadow-xl transition-all duration-300"
              >
                {/* Event Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center gap-2 text-white px-3 py-1 rounded-full text-sm ${getEventColor(event.type)}`}>
                    {getEventIcon(event.type)}
                    <span className="capitalize">{event.type}</span>
                  </div>
                </div>

                {/* Event Details */}
                <h3 className="text-xl font-bold text-primary mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                {/* Meta Information */}
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Hover Action */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a 
                    href="/events"
                    className="text-primary hover:text-secondary font-semibold text-sm flex items-center gap-1 group/link"
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-primary to-primary/95 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Never Miss an Event</h3>
            <p className="text-lg mb-6 opacity-90">
              Join our mailing list for exclusive invites and special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/events"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors duration-300"
              >
                View All Events
                <Calendar className="w-4 h-4" />
              </a>
              <a 
                href="/book-table"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-300"
              >
                Book Your Table
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}