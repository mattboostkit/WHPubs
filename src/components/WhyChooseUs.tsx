import React, { useState } from 'react';
import { Utensils, Beer, Calendar } from 'lucide-react';

interface Reason {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

interface WhyChooseUsProps {
  reasons?: {
    reason1?: { title: string; description: string; image?: { asset?: { url: string } } };
    reason2?: { title: string; description: string; image?: { asset?: { url: string } } };
    reason3?: { title: string; description: string; image?: { asset?: { url: string } } };
  };
  backgroundImage?: string;
}

export default function WhyChooseUs({ reasons, backgroundImage }: WhyChooseUsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  // Default images for each reason
  const defaultImages = [
    "/images/food-fallback.jpg",
    "/images/pub-fallback.jpg",
    "/images/event-fallback.jpg"
  ];

  // Default reasons if not provided from CMS
  const defaultReasons: Reason[] = [
    {
      number: "01",
      title: reasons?.reason1?.title || "Food & Drink",
      description: reasons?.reason1?.description || "Fresh, locally-sourced ingredients prepared by our skilled chefs",
      icon: <Utensils className="w-6 h-6" />,
      image: reasons?.reason1?.image?.asset?.url || backgroundImage || defaultImages[0]
    },
    {
      number: "02",
      title: reasons?.reason2?.title || "Garden Dining",
      description: reasons?.reason2?.description || "Beautiful outdoor spaces with seasonal menus and craft beers",
      icon: <Beer className="w-6 h-6" />,
      image: reasons?.reason2?.image?.asset?.url || backgroundImage || defaultImages[1]
    },
    {
      number: "03",
      title: reasons?.reason3?.title || "Private Events",
      description: reasons?.reason3?.description || "Exclusive spaces for special occasions and celebrations",
      icon: <Calendar className="w-6 h-6" />,
      image: reasons?.reason3?.image?.asset?.url || backgroundImage || defaultImages[2]
    }
  ];

  const displayReason = defaultReasons[hoveredIndex];

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Section Title - Centered on mobile, left-aligned on desktop */}
        <div className="text-center mb-12">
          <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
            Come To Us For
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Side - Image Display */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
              <img 
                src={displayReason.image}
                alt={displayReason.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/food-fallback.jpg';
                }}
              />
              {/* Overlay with current selection info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                <div className="flex items-start gap-4">
                  <span className="text-4xl lg:text-5xl font-light opacity-70">
                    {displayReason.number}
                  </span>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2 uppercase tracking-wider">
                      {displayReason.title}
                    </h3>
                    <p className="text-base lg:text-lg text-white/90 leading-relaxed max-w-xl">
                      {displayReason.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Reason Cards */}
          <div className="flex flex-col gap-4 order-1 lg:order-2">
            {defaultReasons.map((reason, index) => (
              <div
                key={index}
                className={`
                  group cursor-pointer transition-all duration-300 ease-in-out
                  ${hoveredIndex === index 
                    ? 'bg-primary text-white shadow-xl scale-[1.02]' 
                    : 'bg-gray-50 text-primary hover:bg-gray-100'
                  }
                  p-5 lg:p-6 rounded-lg border-2 
                  ${hoveredIndex === index ? 'border-primary' : 'border-gray-200'}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
              >
                <div className="flex items-center gap-4">
                  <span className={`
                    text-3xl lg:text-4xl font-light transition-colors duration-300
                    ${hoveredIndex === index ? 'text-secondary' : 'text-gray-400'}
                  `}>
                    {reason.number}
                  </span>
                  <div className="flex-1">
                    <h4 className={`
                      text-lg lg:text-xl font-bold uppercase tracking-wider transition-colors duration-300
                      ${hoveredIndex === index ? 'text-white' : 'text-primary'}
                    `}>
                      {reason.title}
                    </h4>
                    {/* Show description on mobile always, hide on desktop unless hovered */}
                    <p className={`
                      text-sm mt-1 transition-all duration-300
                      ${hoveredIndex === index 
                        ? 'text-white/90 lg:block' 
                        : 'text-gray-600 lg:hidden'
                      }
                    `}>
                      {reason.description}
                    </p>
                  </div>
                  <div className={`
                    transition-all duration-300 transform
                    ${hoveredIndex === index ? 'scale-110' : ''}
                  `}>
                    <div className={hoveredIndex === index ? 'text-secondary' : 'text-gray-400'}>
                      {reason.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}