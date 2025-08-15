import React, { useEffect, useState } from 'react';
import { Clock, Flame, Award, ArrowRight } from 'lucide-react';
import { getFeaturedDishes } from '../lib/sanity';

interface Dish {
  name: string;
  description: string;
  price: string;
  image?: {
    asset?: {
      url: string;
    };
  };
  tag?: string;
  pubLocation?: string;
}

interface FeaturedDishesData {
  title?: string;
  subtitle?: string;
  dishes?: Dish[];
}

interface FeaturedDishesProps {
  signatureDishes?: FeaturedDishesData;
}

// Fallback dishes data
const fallbackDishes: Dish[] = [
  {
    name: 'Award Winning Larkins Beer Battered Fish & Chips',
    description: 'Atlantic Cod from the clear cold healthy waters of the Barents sea in a Larkins beer batter served with homemade triple cooked chunky chips and creamy mushy peas',
    price: '£19.95',
    tag: 'Award Winning',
    pubLocation: 'Available at all locations'
  },
  {
    name: 'Our Classic Homemade \'Gourmet\' Burger',
    description: 'Using the finest cuts of British chuck, rib, brisket steak, served with sliced gherkin, tomato & baby gem lettuce in a seeded brioche bun with burger sauce & fries',
    price: '£17.95',
    tag: 'Chef\'s Special',
    pubLocation: 'Available at all locations'
  },
  {
    name: 'Chargrilled Line Caught Yellowfin Tuna Steak Nicoise Salad',
    description: 'Chargrilled Yellowfin Tuna Steak, Heritage Tomato, New Potato, Green Beans, Marinated Anchovies, Boiled Free Range Egg, Provencale olives, Wild Rocket, Crispy Capers, Salsa Verde',
    price: '£22.95',
    tag: 'Premium',
    pubLocation: 'Available at all locations'
  },
  {
    name: 'Handmade Award-Winning Italian Tortellini Pasta',
    description: 'Filled with crayfish and prawns tossed in garlic, Chilli & Chive Butter, topped with freshly grated parmesan cheese and a twist of black pepper. Served with fresh garlic bread',
    price: '£19.95',
    tag: 'Award Winning',
    pubLocation: 'Available at all locations'
  }
];

export default function FeaturedDishes({ signatureDishes }: FeaturedDishesProps) {
  const [featuredData, setFeaturedData] = useState<FeaturedDishesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If signature dishes are passed as props, use them
    if (signatureDishes) {
      setFeaturedData(signatureDishes);
      setIsLoading(false);
    } else {
      // Otherwise, fetch from the separate featuredDishes document
      async function fetchData() {
        try {
          const data = await getFeaturedDishes();
          if (data) {
            setFeaturedData(data);
          }
        } catch (error) {
          console.error('Error fetching featured dishes:', error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    }
  }, [signatureDishes]);

  // Use CMS data if available, otherwise use fallback
  const title = featuredData?.title || signatureDishes?.title || 'Signature Dishes';
  const subtitle = featuredData?.subtitle || signatureDishes?.subtitle || 'Crafted with passion using the finest local ingredients';
  const dishes = (featuredData?.dishes && featuredData.dishes.length > 0) 
    ? featuredData.dishes 
    : (signatureDishes?.dishes && signatureDishes.dishes.length > 0) 
    ? signatureDishes.dishes 
    : fallbackDishes;

  // Get fallback image for dish
  const getDishImage = (dish: Dish, index: number) => {
    if (dish.image?.asset?.url) {
      return dish.image.asset.url;
    }
    // Fallback images based on index
    const fallbackImages = [
      '/images/sunday-roast.jpg',
      '/images/fish-chips.jpg', 
      '/images/steak-pie.jpg',
      '/images/risotto.jpg'
    ];
    return fallbackImages[index % fallbackImages.length] || '/images/food-fallback.jpg';
  };

  return (
    <section className="pt-8 pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">From Our Kitchens</span>
            <h2 className="header-section">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Dishes Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {dishes.slice(0, 4).map((dish, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <img
                      src={getDishImage(dish, index)}
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
                      <h3 className="header-subsection-compact">{dish.name}</h3>
                      <p className="text-gray-600 mb-4">{dish.description}</p>
                      <p className="text-xs text-gray-500 mb-4">{dish.pubLocation || 'Available at all locations'}</p>
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
              <h4 className="header-small">Fresh Daily</h4>
              <p className="text-gray-600 text-sm">Menu changes with seasonal availability</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-secondary/10 mb-3">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="header-small">Award Winning</h4>
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