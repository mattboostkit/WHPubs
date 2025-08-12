import React, { useState } from 'react';
import { 
  MapPin, 
  TreePine, 
  Calendar, 
  Camera,
  Castle,
  Book,
  Users,
  Footprints,
  Mountain,
  Waves,
  Church,
  ShoppingBag,
  Coffee,
  Bike
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface PubThingsToDoProps {
  pubName: string;
  pubSlug: string;
}

// Things to do data for each pub location
const pubActivities = {
  'the-bull': {
    village: {
      title: 'Within Otford Village',
      icon: <MapPin className="w-6 h-6" />,
      items: [
        { name: 'The Roundabout Duck Pond', description: 'Charming village pond with resident ducks', icon: <Waves className="w-5 h-5" /> },
        { name: 'The Historic Otford Mosaic', description: 'Beautiful historic mosaic artwork', icon: <Camera className="w-5 h-5" /> },
        { name: 'Otford Palace', description: 'Ruins of Archbishop's Palace from 1514', icon: <Castle className="w-5 h-5" /> },
        { name: 'Otford Library', description: 'Community library and local history resources', icon: <Book className="w-5 h-5" /> },
        { name: 'Otford Playground & Sports Ground', description: 'Family-friendly recreation facilities', icon: <Users className="w-5 h-5" /> }
      ]
    },
    walks: {
      title: 'Walks & Nature',
      icon: <Footprints className="w-6 h-6" />,
      items: [
        { name: 'Kemsing Down Nature Reserve', description: 'Stunning chalk downland with panoramic views', icon: <Mountain className="w-5 h-5" /> },
        { name: 'Fackenden Down Nature Reserve', description: 'Ancient woodland and wildflower meadows', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Polhill Bank Nature Reserve', description: 'Beautiful downland with rare orchids', icon: <TreePine className="w-5 h-5" /> },
        { name: 'The Otford Circular Walk', description: '5-mile circular route through countryside', icon: <Footprints className="w-5 h-5" /> },
        { name: 'The Otford to Shoreham Walk', description: 'Scenic walk along the Darent Valley', icon: <Footprints className="w-5 h-5" /> }
      ]
    },
    events: {
      title: 'Local Events',
      icon: <Calendar className="w-6 h-6" />,
      items: [
        { name: 'Village Events Board', description: 'Check Council boards around Otford for upcoming events', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Otford May Day', description: 'Traditional May Day celebrations on the Green', icon: <Users className="w-5 h-5" /> },
        { name: 'Otford Festival', description: 'Annual summer festival with music and stalls', icon: <Users className="w-5 h-5" /> },
        { name: 'St. Bartholomew's Church Events', description: 'Regular concerts and community events', icon: <Church className="w-5 h-5" /> }
      ]
    }
  },
  'the-bull-otford': {
    village: {
      title: 'Within Otford Village',
      icon: <MapPin className="w-6 h-6" />,
      items: [
        { name: 'The Roundabout Duck Pond', description: 'Charming village pond with resident ducks', icon: <Waves className="w-5 h-5" /> },
        { name: 'The Historic Otford Mosaic', description: 'Beautiful historic mosaic artwork', icon: <Camera className="w-5 h-5" /> },
        { name: 'Otford Palace', description: 'Ruins of Archbishop's Palace from 1514', icon: <Castle className="w-5 h-5" /> },
        { name: 'Otford Library', description: 'Community library and local history resources', icon: <Book className="w-5 h-5" /> },
        { name: 'Otford Playground & Sports Ground', description: 'Family-friendly recreation facilities', icon: <Users className="w-5 h-5" /> }
      ]
    },
    walks: {
      title: 'Walks & Nature',
      icon: <Footprints className="w-6 h-6" />,
      items: [
        { name: 'Kemsing Down Nature Reserve', description: 'Stunning chalk downland with panoramic views', icon: <Mountain className="w-5 h-5" /> },
        { name: 'Fackenden Down Nature Reserve', description: 'Ancient woodland and wildflower meadows', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Polhill Bank Nature Reserve', description: 'Beautiful downland with rare orchids', icon: <TreePine className="w-5 h-5" /> },
        { name: 'The Otford Circular Walk', description: '5-mile circular route through countryside', icon: <Footprints className="w-5 h-5" /> },
        { name: 'The Otford to Shoreham Walk', description: 'Scenic walk along the Darent Valley', icon: <Footprints className="w-5 h-5" /> }
      ]
    },
    events: {
      title: 'Local Events',
      icon: <Calendar className="w-6 h-6" />,
      items: [
        { name: 'Village Events Board', description: 'Check Council boards around Otford for upcoming events', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Otford May Day', description: 'Traditional May Day celebrations on the Green', icon: <Users className="w-5 h-5" /> },
        { name: 'Otford Festival', description: 'Annual summer festival with music and stalls', icon: <Users className="w-5 h-5" /> },
        { name: 'St. Bartholomew's Church Events', description: 'Regular concerts and community events', icon: <Church className="w-5 h-5" /> }
      ]
    }
  },
  'the-cricketers-inn': {
    village: {
      title: 'Within Meopham Village',
      icon: <MapPin className="w-6 h-6" />,
      items: [
        { name: 'Meopham Village Green', description: 'Historic cricket green with regular matches', icon: <Users className="w-5 h-5" /> },
        { name: 'St. John the Baptist Church', description: '12th-century church with Norman architecture', icon: <Church className="w-5 h-5" /> },
        { name: 'Meopham Windmill', description: 'Historic Grade II listed black smock mill', icon: <Camera className="w-5 h-5" /> },
        { name: 'Camer Country Park', description: '60 acres of parkland with play areas', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Meopham Library', description: 'Local library and community hub', icon: <Book className="w-5 h-5" /> }
      ]
    },
    walks: {
      title: 'Walks & Nature',
      icon: <Footprints className="w-6 h-6" />,
      items: [
        { name: 'Trosley Country Park', description: '170 acres of ancient woodland on North Downs', icon: <Mountain className="w-5 h-5" /> },
        { name: 'Meopham Heritage Trail', description: 'Historical walk through the village', icon: <Footprints className="w-5 h-5" /> },
        { name: 'Wealdway Long Distance Path', description: 'Passes through Meopham countryside', icon: <Footprints className="w-5 h-5" /> },
        { name: 'Cobham Woods', description: 'Ancient woodland with marked trails', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Nurstead Court Walk', description: 'Circular walk to historic manor house', icon: <Castle className="w-5 h-5" /> }
      ]
    },
    events: {
      title: 'Local Events',
      icon: <Calendar className="w-6 h-6" />,
      items: [
        { name: 'Cricket on the Green', description: 'Summer cricket matches most weekends', icon: <Users className="w-5 h-5" /> },
        { name: 'Meopham Summer Fair', description: 'Annual village fair with stalls and entertainment', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Farmers Market', description: 'Monthly local produce market', icon: <ShoppingBag className="w-5 h-5" /> },
        { name: 'Village Players Productions', description: 'Local theatre group performances', icon: <Users className="w-5 h-5" /> }
      ]
    }
  },
  'the-rose-and-crown': {
    village: {
      title: 'Within Green Street Green',
      icon: <MapPin className="w-6 h-6" />,
      items: [
        { name: 'High Street Shopping', description: 'Local shops and amenities', icon: <ShoppingBag className="w-5 h-5" /> },
        { name: 'Priory Gardens', description: 'Beautiful public gardens and recreation ground', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Green Street Green Library', description: 'Community library and resources', icon: <Book className="w-5 h-5" /> },
        { name: 'All Saints Church', description: 'Historic parish church', icon: <Church className="w-5 h-5" /> },
        { name: 'Local Cafes & Shops', description: 'Independent retailers and coffee shops', icon: <Coffee className="w-5 h-5" /> }
      ]
    },
    walks: {
      title: 'Walks & Nature',
      icon: <Footprints className="w-6 h-6" />,
      items: [
        { name: 'High Elms Country Park', description: '250 acres with nature trails and BEECHE visitor centre', icon: <Mountain className="w-5 h-5" /> },
        { name: 'Downe Bank Nature Reserve', description: 'Darwin's thinking path with rare orchids', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Keston Common', description: 'Historic parkland with ponds and windmill', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Farnborough Village Walk', description: 'Circular walk through historic village', icon: <Footprints className="w-5 h-5" /> },
        { name: 'Orpington to Chelsfield Walk', description: 'Scenic countryside route', icon: <Footprints className="w-5 h-5" /> }
      ]
    },
    events: {
      title: 'Local Events',
      icon: <Calendar className="w-6 h-6" />,
      items: [
        { name: 'Orpington May Queen Festival', description: 'Traditional May celebrations nearby', icon: <Users className="w-5 h-5" /> },
        { name: 'High Elms Apple Day', description: 'Annual autumn celebration with local produce', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Local Markets', description: 'Regular farmers and craft markets', icon: <ShoppingBag className="w-5 h-5" /> },
        { name: 'Community Events', description: 'Check local noticeboards for activities', icon: <Users className="w-5 h-5" /> }
      ]
    }
  },
  'the-little-brown-jug': {
    village: {
      title: 'Within Chiddingstone Causeway',
      icon: <MapPin className="w-6 h-6" />,
      items: [
        { name: 'Chiddingstone Castle', description: 'Victorian castle with Egyptian and Japanese collections', icon: <Castle className="w-5 h-5" /> },
        { name: 'Historic Chiddingstone Village', description: 'Tudor village preserved by National Trust', icon: <Camera className="w-5 h-5" /> },
        { name: 'St. Luke's Church', description: 'Victorian church with beautiful stained glass', icon: <Church className="w-5 h-5" /> },
        { name: 'Penshurst Place', description: 'Medieval manor house with 600 years of history', icon: <Castle className="w-5 h-5" /> },
        { name: 'The Chiding Stone', description: 'Ancient sandstone outcrop and village namesake', icon: <Mountain className="w-5 h-5" /> }
      ]
    },
    walks: {
      title: 'Walks & Nature',
      icon: <Footprints className="w-6 h-6" />,
      items: [
        { name: 'Eden Valley Walk', description: 'Beautiful valley walk along River Eden', icon: <Waves className="w-5 h-5" /> },
        { name: 'Hever to Chiddingstone Walk', description: 'Links two historic villages', icon: <Footprints className="w-5 h-5" /> },
        { name: 'Bough Beech Reservoir', description: 'Nature reserve with bird watching opportunities', icon: <Waves className="w-5 h-5" /> },
        { name: 'Vanguard Way', description: 'Long-distance path passing through area', icon: <Footprints className="w-5 h-5" /> },
        { name: 'Sevenoaks Circular Walk', description: 'Countryside route with pub stops', icon: <TreePine className="w-5 h-5" /> }
      ]
    },
    events: {
      title: 'Local Events',
      icon: <Calendar className="w-6 h-6" />,
      items: [
        { name: 'Chiddingstone Castle Events', description: 'Regular exhibitions and family activities', icon: <Castle className="w-5 h-5" /> },
        { name: 'Penshurst Place Events', description: 'Jousting, concerts, and seasonal festivals', icon: <Users className="w-5 h-5" /> },
        { name: 'Village Fete', description: 'Annual summer celebration', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Local Farm Events', description: 'Seasonal activities at nearby farms', icon: <TreePine className="w-5 h-5" /> }
      ]
    }
  },
  'the-chaser-inn': {
    village: {
      title: 'Within Shipbourne Village',
      icon: <MapPin className="w-6 h-6" />,
      items: [
        { name: 'St. Giles Church', description: '12th-century church with historic features', icon: <Church className="w-5 h-5" /> },
        { name: 'Shipbourne Farmers Market', description: 'Monthly local produce market', icon: <ShoppingBag className="w-5 h-5" /> },
        { name: 'Village Green', description: 'Traditional English village green', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Fairlawne Estate', description: 'Historic estate with beautiful grounds', icon: <Castle className="w-5 h-5" /> },
        { name: 'Local Farm Shops', description: 'Fresh produce and local goods', icon: <ShoppingBag className="w-5 h-5" /> }
      ]
    },
    walks: {
      title: 'Walks & Nature',
      icon: <Footprints className="w-6 h-6" />,
      items: [
        { name: 'Greensand Way', description: 'Long-distance path through Kent countryside', icon: <Footprints className="w-5 h-5" /> },
        { name: 'Ightham Mote Walk', description: 'Walk to medieval moated manor house', icon: <Castle className="w-5 h-5" /> },
        { name: 'Plaxtol Circular Walk', description: 'Village to village countryside route', icon: <Footprints className="w-5 h-5" /> },
        { name: 'Shipbourne Forest', description: 'Ancient woodland trails', icon: <TreePine className="w-5 h-5" /> },
        { name: 'River Bourne Walk', description: 'Peaceful riverside walking route', icon: <Waves className="w-5 h-5" /> }
      ]
    },
    events: {
      title: 'Local Events',
      icon: <Calendar className="w-6 h-6" />,
      items: [
        { name: 'Shipbourne Farmers Market', description: 'First Saturday of each month', icon: <ShoppingBag className="w-5 h-5" /> },
        { name: 'Village Cricket Matches', description: 'Summer cricket on the green', icon: <Users className="w-5 h-5" /> },
        { name: 'Harvest Festival', description: 'Annual autumn celebration', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Christmas Carol Service', description: 'Traditional village celebration', icon: <Church className="w-5 h-5" /> }
      ]
    }
  }
};

export default function PubThingsToDo({ pubName, pubSlug }: PubThingsToDoProps) {
  const [activeCategory, setActiveCategory] = useState('village');
  const activities = pubActivities[pubSlug] || pubActivities['the-bull'];

  const categories = Object.keys(activities);
  const currentCategory = activities[activeCategory];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Explore the Area
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Things To Do Near {pubName}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover local attractions, scenic walks, and exciting events in the area. 
              Make the most of your visit with our guide to the best activities nearby.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => {
              const categoryData = activities[category];
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary text-secondary shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {categoryData.icon}
                  {categoryData.title}
                </button>
              );
            })}
          </div>

          {/* Activities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategory.items.map((item, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-gray-100 hover:border-secondary/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                      {item.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-16 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Planning Your Visit?
              </h3>
              <p className="text-gray-600 mb-6">
                Our friendly team is always happy to provide local recommendations and directions. 
                Don't hesitate to ask us about the best routes, opening times, or hidden gems in the area.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Directions
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>
                <a
                  href="/book-table"
                  className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-secondary transition-all duration-300"
                >
                  Book Your Table
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}