import React from 'react';
import { Clock, Flame, Award, ArrowRight } from 'lucide-react';

interface Dish {
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
  pub?: string;
}

export default function FeaturedDishes() {
  const dishes: Dish[] = [
    {
      name: 'Sunday Roast Trio',
      description: 'Beef, pork & chicken with all the trimmings, Yorkshire puddings, roast potatoes and seasonal vegetables',
      price: '£18.95',
      image: '/images/sunday-roast.jpg',
      tag: 'Chef\'s Special',
      pub: 'Available at all locations'
    },
    {
      name: 'Beer Battered Fish & Chips',
      description: 'Fresh cod in our signature beer batter, triple-cooked chips, mushy peas and homemade tartare sauce',
      price: '£15.95',
      image: '/images/fish-chips.jpg',
      tag: 'Best Seller',
      pub: 'The Cricketers Inn'
    },
    {
      name: 'Steak & Ale Pie',
      description: 'Slow-cooked British beef in rich ale gravy, buttery puff pastry, mash and seasonal greens',
      price: '£14.95',
      image: '/images/steak-pie.jpg',
      tag: 'Traditional',
      pub: 'The Bull'
    },
    {
      name: 'Wild Mushroom Risotto',
      description: 'Creamy arborio rice with mixed wild mushrooms, truffle oil, parmesan and fresh herbs',
      price: '£13.95',
      image: '/images/risotto.jpg',
      tag: 'Vegetarian',
      pub: 'The Rose and Crown'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">From Our Kitchens</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">Signature Dishes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Crafted with passion using the finest local ingredients
            </p>
          </div>

          {/* Dishes Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {dishes.map((dish, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/images/food-fallback.jpg';
                      }}
                    />
                    {dish.tag && (
                      <div className="absolute top-4 left-4 bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {dish.tag}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">{dish.name}</h3>
                      <p className="text-gray-600 mb-4">{dish.description}</p>
                      <p className="text-xs text-gray-500 mb-4">{dish.pub}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-secondary">{dish.price}</span>
                      <a 
                        href="/book-table"
                        className="text-primary hover:text-secondary font-semibold flex items-center gap-2 group/link"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-secondary/10 mb-3">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Fresh Daily</h4>
              <p className="text-gray-600 text-sm">Menu changes with seasonal availability</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-secondary/10 mb-3">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Award Winning</h4>
              <p className="text-gray-600 text-sm">Recognized for culinary excellence</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-secondary/10 mb-3">
                <Flame className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Locally Sourced</h4>
              <p className="text-gray-600 text-sm">Supporting Kent farmers and producers</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a 
              href="/our-pubs"
              className="inline-flex items-center gap-2 bg-primary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View Full Menus
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}