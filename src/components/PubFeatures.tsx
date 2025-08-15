import React from 'react';

interface Feature {
  title: string;
  description: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
    } | null;
    alt?: string;
  } | null;
  orderNumber: number;
}

interface PubFeaturesProps {
  features: {
    title?: string;
    features: Feature[];
  };
}

export default function PubFeatures({ features }: PubFeaturesProps) {
  if (!features || !features.features || features.features.length === 0) return null;

  const title = features.title || 'Discover What\'s On Tap';

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-12 text-primary">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.features.map((feature) => (
            <div 
              key={feature.orderNumber} 
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={feature.image?.asset?.url || '/images/placeholder-pub.jpg'}
                  alt={feature.image?.alt || feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/images/placeholder-pub.jpg';
                  }}
                />
                <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full font-bold text-lg">
                  {String(feature.orderNumber).padStart(2, '0')}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-3 text-primary">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}