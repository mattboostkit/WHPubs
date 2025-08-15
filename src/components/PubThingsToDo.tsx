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
        { name: 'Otford Palace', description: "Ruins of Archbishop's Palace from 1514", icon: <Castle className="w-5 h-5" /> },
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
        { name: "St. Bartholomew's Church Events", description: 'Regular concerts and community events', icon: <Church className="w-5 h-5" /> }
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
        { name: 'Otford Palace', description: "Ruins of Archbishop's Palace from 1514", icon: <Castle className="w-5 h-5" /> },
        { name: 'Otford Library', description: 'Community library and local history resources', icon: <Book className="w-5 h-5" /> },
        { name: 'Otford Playground & Sports Ground', description: 'Family-friendly recreation facilities', icon: <Users className="w-5 h-5" /> }
      ]
    },
    walks: {
      title: 'Walks & Nature',
      icon: <Footprints className="w-6 h-6" />,
      items: [
        { name: 'Otford Circular Walk', description: '5.3 miles through North Downs with spectacular views. Start from The Bull, climb 145 woodland steps, visit the Solar System model. 2-3 hours, moderate difficulty.', icon: <Footprints className="w-5 h-5" /> },
        { name: 'Shoreham Valley Loop', description: '6 miles via historic Shoreham village and River Darent. Beautiful riverside paths, cross Darent Valley Golf Course, return through farmland. 2.5 hours, easy-moderate.', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Otford to Knole Park', description: '7 miles to Knole House through ancient deer park. See wild deer, visit National Trust property, return via North Downs Way. Full day adventure.', icon: <Castle className="w-5 h-5" /> }
      ]
    },
    events: {
      title: 'Local Events',
      icon: <Calendar className="w-6 h-6" />,
      items: [
        { name: 'Village Events Board', description: 'Check Council boards around Otford for upcoming events', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Otford May Day', description: 'Traditional May Day celebrations on the Green', icon: <Users className="w-5 h-5" /> },
        { name: 'Otford Festival', description: 'Annual summer festival with music and stalls', icon: <Users className="w-5 h-5" /> },
        { name: "St. Bartholomew's Church Events", description: 'Regular concerts and community events', icon: <Church className="w-5 h-5" /> }
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
        { name: 'Meopham Circular Walk', description: '5 miles from The Cricketers Inn through ancient woodland and farmland. Explore 45-acre Camer Country Park, return via Meopham Green. 2 hours, easy.', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Luddesdown Valley Loop', description: '6 miles from The Cricketers to historic Luddesdown Court and church. Beautiful valley views, ancient yew trees, return via North Downs Way. 2.5 hours, moderate.', icon: <Church className="w-5 h-5" /> },
        { name: 'Trosley Country Park Trail', description: '4 miles from the pub to 170-acre chalk downland park with panoramic views. Beech woodland, wildflower meadows, visitor centre with cafe. 2 hours, moderate.', icon: <Mountain className="w-5 h-5" /> }
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
        { name: 'High Elms Country Park Loop', description: '4 miles through 250-acre country park. BEECHE visitor centre, orchid meadows, Shire horse centre. Start from pub, easy family walk. 2 hours.', icon: <Mountain className="w-5 h-5" /> },
        { name: "Darwin's Downe Walk", description: '5 miles to Down House via Darwin\'s thinking path. Visit his home, explore Downe Bank Nature Reserve with rare orchids. 2.5 hours, moderate.', icon: <TreePine className="w-5 h-5" /> },
        { name: 'Keston Common & Ponds', description: '3 miles circular via historic windmill and Caesar\'s Well. Ancient earthworks, picturesque ponds, ice house remains. 1.5 hours, easy.', icon: <TreePine className="w-5 h-5" /> }
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
        { name: "St. Luke's Church", description: 'Victorian church with beautiful stained glass', icon: <Church className="w-5 h-5" /> },
        { name: 'Penshurst Place', description: 'Medieval manor house with 600 years of history', icon: <Castle className="w-5 h-5" /> },
        { name: 'The Chiding Stone', description: 'Ancient sandstone outcrop and village namesake', icon: <Mountain className="w-5 h-5" /> }
      ]
    },
    walks: {
      title: 'Walks & Nature',
      icon: <Footprints className="w-6 h-6" />,
      items: [
        { name: 'Hever Castle Circular', description: '6.1 miles via Hever Castle and historic Chiddingstone. Start from pub, visit Anne Boleyn\'s childhood home, return through Tudor village. 2.5 hours, moderate.', icon: <Castle className="w-5 h-5" /> },
        { name: 'Bore Place to The Little Brown Jug', description: '4 miles through rolling Weald countryside. Ancient footpaths, working farm views, perfect lunch walk ending at the pub. 1.5 hours, easy.', icon: <Footprints className="w-5 h-5" /> },
        { name: 'Penshurst & Bough Beech Loop', description: '7.8 miles via Penshurst Place and reservoir. Medieval manor house, nature reserve with bird hides, hop gardens. 3.5 hours, moderate.', icon: <Waves className="w-5 h-5" /> }
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
        { name: 'Ightham Mote Circular', description: '5 miles to National Trust medieval moated manor. Start from Chaser Inn, through ancient woodland, visit 14th-century house. 2.5 hours, moderate.', icon: <Castle className="w-5 h-5" /> },
        { name: 'Shipbourne to Plaxtol Loop', description: '4 miles through Weald of Kent countryside. Classic village-to-village walk, hop gardens, oast houses, return via Fairlawne Estate. 2 hours, easy.', icon: <Footprints className="w-5 h-5" /> },
        { name: 'River Bourne & Greensand Way', description: '6 miles along riverside and ridge. Follow River Bourne, join Greensand Way for panoramic views, descend through Shipbourne Forest. 3 hours, moderate.', icon: <Waves className="w-5 h-5" /> }
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
            <h2 className="header-subsection">
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

        </div>
      </div>
    </section>
  );
}