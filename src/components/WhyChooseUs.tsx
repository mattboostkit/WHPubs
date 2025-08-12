import React, { useState } from 'react';
import { ChefHat, Beer, Calendar } from 'lucide-react';

interface Reason {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface WhyChooseUsProps {
  reasons?: {
    reason1?: { title: string; description: string };
    reason2?: { title: string; description: string };
    reason3?: { title: string; description: string };
  };
  backgroundImage?: string;
}

export default function WhyChooseUs({ reasons, backgroundImage }: WhyChooseUsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Default reasons if not provided from CMS
  const defaultReasons: Reason[] = [
    {
      number: "01",
      title: reasons?.reason1?.title || "FOOD & DRINK",
      description: reasons?.reason1?.description || "Fresh, locally-sourced ingredients prepared by our skilled chefs",
      icon: <ChefHat className="w-8 h-8" />
    },
    {
      number: "02",
      title: reasons?.reason2?.title || "LOCAL ALES",
      description: reasons?.reason2?.description || "Carefully selected craft beers and traditional cask ales",
      icon: <Beer className="w-8 h-8" />
    },
    {
      number: "03",
      title: reasons?.reason3?.title || "SPECIAL EVENTS",
      description: reasons?.reason3?.description || "Regular events, live music, and themed dining experiences",
      icon: <Calendar className="w-8 h-8" />
    }
  ];

  // Get the current reason to display (hovered or default to first)
  const displayReason = hoveredIndex !== null ? defaultReasons[hoveredIndex] : defaultReasons[0];

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage || "/images/food-fallback.jpg"}
          alt="Food background"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/food-fallback.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-primary/90"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title and Description */}
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-6 uppercase tracking-wide">
                Come to us for
              </h2>
              
              {/* Animated Content Area */}
              <div className="min-h-[120px] transition-all duration-500 ease-in-out">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-6xl font-light opacity-50">{displayReason.number}</span>
                  <div>
                    <h3 className="text-3xl font-bold mb-2 uppercase tracking-wider">
                      {displayReason.title}
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed">
                      {displayReason.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Reason Cards */}
            <div className="flex flex-col gap-4">
              {defaultReasons.map((reason, index) => (
                <div
                  key={index}
                  className={`
                    group cursor-pointer transition-all duration-300 ease-in-out
                    ${hoveredIndex === index 
                      ? 'bg-white text-primary scale-105 shadow-2xl' 
                      : 'bg-primary/20 backdrop-blur-sm text-white hover:bg-white/10'
                    }
                    p-6 rounded-lg border border-white/20
                  `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center gap-4">
                    <span className={`
                      text-4xl font-light transition-colors duration-300
                      ${hoveredIndex === index ? 'text-secondary' : 'text-white/50'}
                    `}>
                      {reason.number}
                    </span>
                    <div className="flex-1">
                      <h4 className={`
                        text-xl font-bold uppercase tracking-wider transition-colors duration-300
                        ${hoveredIndex === index ? 'text-primary' : 'text-white'}
                      `}>
                        {reason.title}
                      </h4>
                    </div>
                    <div className={`
                      transition-all duration-300 transform
                      ${hoveredIndex === index ? 'rotate-12 scale-110' : ''}
                    `}>
                      <div className={hoveredIndex === index ? 'text-secondary' : 'text-white/70'}>
                        {reason.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}