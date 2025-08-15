import React from 'react';

export default function ServicesGrid() {
  const services = [
    {
      title: 'Events & Live Music',
      description: 'Regular entertainment across all our venues',
      link: '/events',
      backgroundImage: '/images/dummy-placeholder.jpg' // Will be replaced with proper image from Sanity
    },
    {
      title: 'Sunday Roasts',
      description: 'Award-winning traditional roasts every Sunday',
      link: '/book-table',
      backgroundImage: '/images/dummy-placeholder.jpg' // Will be replaced with proper image from Sanity
    },
    {
      title: 'Development Kitchen',
      description: 'Our unique culinary innovation hub - creating tomorrow\'s classics today',
      link: '/development-kitchen',
      backgroundImage: '/images/dummy-placeholder.jpg' // Will be replaced with proper image from Sanity
    },
    {
      title: 'Local Ales',
      description: 'Carefully selected beers from regional breweries',
      link: '/our-pubs',
      backgroundImage: '/images/dummy-placeholder.jpg' // Will be replaced with proper image from Sanity
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">What We Offer</span>
            <h2 className="header-section">Everything You Need For The Perfect Visit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate dinners to large celebrations, we have something for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              return (
                <a
                  key={index}
                  href={service.link}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-h-[300px] flex items-end"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('${service.backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="relative p-6 text-white w-full">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center text-white/80 hover:text-white transition-colors duration-300">
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