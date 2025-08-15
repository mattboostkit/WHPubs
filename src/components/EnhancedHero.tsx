import React from 'react';
import { MapPin, Calendar, Utensils, ArrowRight } from 'lucide-react';

interface EnhancedHeroProps {
  images?: Array<{
    asset?: { url: string };
    alt?: string;
  }>;
  tagline?: string;
  subtitle?: string;
}

export default function EnhancedHero({ 
  images, 
  tagline = "ESCAPE TO EXTRAORDINARY",
  subtitle = "Five distinctive pubs. Countless memories waiting to be made."
}: EnhancedHeroProps) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={images?.[0]?.asset?.url || '/images/hero-fallback.jpg'}
          alt={images?.[0]?.alt || 'WH Pubs atmosphere'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Tagline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-secondary">
            {tagline}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 font-light opacity-95 text-white">
            {subtitle}
          </p>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <a 
              href="/our-pubs"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
            >
              <MapPin className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-1">Find Your Local</h3>
              <p className="text-sm opacity-80">5 unique locations</p>
            </a>

            <a 
              href="/book-table"
              className="group bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-lg p-6 hover:bg-secondary/30 transition-all duration-300"
            >
              <Utensils className="w-8 h-8 mx-auto mb-3 text-secondary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-1 text-secondary">Book a Table</h3>
              <p className="text-sm opacity-80">Reserve your spot</p>
            </a>

            <a 
              href="/events"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
            >
              <Calendar className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-1">What's On</h3>
              <p className="text-sm opacity-80">Events & offers</p>
            </a>
          </div>

          {/* Primary CTA */}
          <a 
            href="/book-table"
            className="inline-flex items-center gap-3 bg-secondary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary/90 transition-all duration-300 shadow-2xl hover:shadow-3xl group"
          >
            Book a Table
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}