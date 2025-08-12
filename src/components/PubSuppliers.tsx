import React, { useState } from 'react';
import { Truck, Award, MapPin, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SupplierData {
  name: string;
  category: string;
  description: string;
  location: string;
  established?: string;
  specialties: string[];
  awards?: string;
  website?: string;
  sustainable?: boolean;
}

interface PubSuppliersProps {
  pubName?: string;
  pubSlug?: string;
  showTitle?: boolean;
  compact?: boolean;
}

// Comprehensive supplier database with research-backed information
const supplierDatabase: Record<string, SupplierData> = {
  'Bodium Meats': {
    name: 'Bodium Meats',
    category: 'Meat & Poultry',
    description: 'Family-run wholesale butchers with over 35 years of expertise, serving premium quality meats to hospitality venues across the Southeast. FSA registered cutting plant ensuring the highest standards.',
    location: 'Bexhill-On-Sea, East Sussex',
    established: '1986',
    specialties: ['Premium beef cuts', 'Free-range poultry', 'Artisan sausages', 'Game meats'],
    awards: '200+ hospitality customers',
    website: 'bodiammeat.com',
    sustainable: true
  },
  'Chapmans Fish': {
    name: 'Chapmans Fish',
    category: 'Seafood',
    description: 'Specialist fishmongers delivering the freshest catch daily to discerning restaurants and pubs. Known for sustainable sourcing and exceptional quality.',
    location: 'Kent Coast',
    specialties: ['Daily fresh fish', 'Sustainable seafood', 'Shellfish selection', 'Smoked fish'],
    sustainable: true
  },
  'Sankeys Fishmongers': {
    name: 'Sankeys Fishmongers',
    category: 'Seafood',
    description: 'Traditional fishmongers with a reputation for the finest fresh fish and shellfish, sourced from trusted suppliers and local waters.',
    location: 'Kent',
    specialties: ['Fresh fish daily', 'Local catch', 'Premium shellfish', 'Fish preparation services'],
    sustainable: true
  },
  'FK Carter eggs': {
    name: 'FK Carter Eggs',
    category: 'Eggs & Dairy',
    description: 'Premium egg suppliers known for their commitment to animal welfare and exceptional quality free-range eggs from happy hens.',
    location: 'Kent Countryside',
    specialties: ['Free-range eggs', 'Organic options', 'Duck eggs', 'Quail eggs'],
    sustainable: true
  },
  'TH Brown Veg': {
    name: 'TH Brown Vegetables',
    category: 'Fresh Produce',
    description: 'Kent\'s trusted vegetable suppliers, bringing farm-fresh seasonal produce directly from local growers to your plate.',
    location: 'Kent',
    specialties: ['Seasonal vegetables', 'Local farm produce', 'Organic options', 'Specialty items'],
    sustainable: true
  },
  'Harris Covent Garden Veg': {
    name: 'Harris Covent Garden Vegetables',
    category: 'Fresh Produce',
    description: 'Premium vegetable suppliers with deep roots in Covent Garden\'s market tradition, bringing exceptional quality produce to discerning venues.',
    location: 'Covent Garden, London',
    specialties: ['Premium vegetables', 'Exotic produce', 'Market-fresh quality', 'Daily deliveries'],
    sustainable: true
  },
  'Penshurst fine foods': {
    name: 'Penshurst Fine Foods',
    category: 'Specialty Foods',
    description: 'Artisan food specialists curating the finest local and international ingredients for exceptional dining experiences.',
    location: 'Penshurst, Kent',
    specialties: ['Artisan products', 'Local delicacies', 'Imported specialties', 'Gourmet ingredients'],
    sustainable: true
  },
  'Rusbridge Bakery': {
    name: 'Rusbridge Bakery',
    category: 'Bakery',
    description: 'Traditional bakers crafting fresh bread, pastries, and baked goods daily using time-honored methods and quality ingredients.',
    location: 'Kent',
    specialties: ['Fresh bread daily', 'Artisan pastries', 'Traditional baking', 'Custom orders'],
    sustainable: true
  },
  'Longfield Bakery': {
    name: 'Longfield Bakery',
    category: 'Bakery',
    description: 'Local bakery specializing in traditional breads and pastries, baked fresh daily with passion and expertise.',
    location: 'Longfield, Kent',
    specialties: ['Fresh bread', 'Traditional methods', 'Local favorite', 'Daily baking'],
    sustainable: true
  },
  'Salcombe Dairy Ice cream': {
    name: 'Salcombe Dairy',
    category: 'Desserts',
    description: 'Award-winning artisan ice cream makers since 1981, creating premium dairy delights with over 70 food awards. Their "Quality without compromise" philosophy delivers exceptional frozen desserts.',
    location: 'Salcombe, Devon',
    established: '1981',
    specialties: ['Artisan ice cream', 'Bean-to-bar chocolate', 'Natural ingredients', 'Award-winning recipes'],
    awards: '70+ prestigious food awards',
    website: 'salcombedairy.co.uk',
    sustainable: true
  },
  'Smokin Brothers Salmon': {
    name: 'Smokin Brothers Salmon',
    category: 'Specialty Seafood',
    description: 'Artisan salmon smokers using traditional methods to create exceptional smoked fish products with distinctive flavors.',
    location: 'UK',
    specialties: ['Traditional smoking', 'Premium salmon', 'Artisan methods', 'Distinctive flavors'],
    sustainable: true
  },
  'Tracklements Sauces': {
    name: 'Tracklements',
    category: 'Condiments',
    description: 'B Corp certified artisan condiment makers since 1970, creating over 50 award-winning mustards, chutneys, and preserves. With 170+ food awards, they\'re Britain\'s leading specialty condiment producer.',
    location: 'Wiltshire Countryside',
    established: '1970',
    specialties: ['Wholegrain mustards', 'Artisan chutneys', 'Fresh chilli jam', 'Traditional preserves'],
    awards: '170+ food awards',
    website: 'tracklements.co.uk',
    sustainable: true
  },
  'Wicks Bacon': {
    name: 'Wicks Bacon',
    category: 'Cured Meats',
    description: 'Traditional bacon curers specializing in premium quality bacon and cured meats using time-honored smoking and curing techniques.',
    location: 'UK',
    specialties: ['Traditional curing', 'Premium bacon', 'Smoked meats', 'Artisan methods'],
    sustainable: true
  },
  'Salty Dog nuts and crisps': {
    name: 'Salty Dog',
    category: 'Snacks',
    description: 'Gourmet snack specialists creating premium nuts, crisps, and bar snacks perfect for pairing with craft ales and fine wines.',
    location: 'UK',
    specialties: ['Gourmet nuts', 'Craft crisps', 'Bar snacks', 'Premium quality'],
    sustainable: true
  },
  'Mr Fitz Aqua Spritz': {
    name: 'Mr Fitz Aqua Spritz',
    category: 'Beverages',
    description: 'Innovative beverage creators specializing in refreshing spritzes and artisanal drinks that perfectly complement modern pub dining.',
    location: 'UK',
    specialties: ['Aqua spritzes', 'Refreshing drinks', 'Modern beverages', 'Artisan quality'],
    sustainable: true
  },
  'Chapel Down': {
    name: 'Chapel Down',
    category: 'Wine & Sparkling',
    description: 'England\'s leading winemaker with 950+ acres of vineyards in Kent. Award-winning sparkling wines crafted using traditional methods, supplied to prestigious venues including 10 Downing Street.',
    location: 'Tenterden, Kent',
    established: '1992',
    specialties: ['English sparkling wine', 'Traditional method', 'Single vineyard wines', 'Award-winning quality'],
    awards: 'England\'s most awarded winery',
    website: 'chapeldown.com',
    sustainable: true
  },
  'Fever Tree': {
    name: 'Fever-Tree',
    category: 'Mixers',
    description: 'Premium mixer specialists sourcing the finest natural ingredients from around the world to create exceptional tonics, sodas, and mixers.',
    location: 'London, UK',
    established: '2005',
    specialties: ['Premium tonics', 'Natural ingredients', 'Craft mixers', 'Global sourcing'],
    awards: 'Multiple industry awards',
    sustainable: true
  },
  'Enotria Wine': {
    name: 'Enotria & Coe',
    category: 'Wine',
    description: 'Independent wine merchants with over 50 years of expertise, curating exceptional wines from artisan producers and renowned regions worldwide.',
    location: 'London, UK',
    established: '1972',
    specialties: ['Curated wine selection', 'Artisan producers', 'Fine wines', 'Expert knowledge'],
    awards: 'Industry recognition',
    sustainable: true
  },
  'LWC': {
    name: 'LWC Drinks',
    category: 'Beverages',
    description: 'Specialist drinks distributor providing an extensive range of premium beverages from craft beers to artisan spirits.',
    location: 'UK',
    specialties: ['Craft beverages', 'Premium brands', 'Specialist distribution', 'Wide selection'],
    sustainable: true
  },
  'Ninju Juices': {
    name: 'Ninju Juices',
    category: 'Juices',
    description: 'Fresh juice specialists creating vibrant, healthy drinks using premium fruits and innovative flavor combinations.',
    location: 'UK',
    specialties: ['Fresh juices', 'Natural ingredients', 'Innovative flavors', 'Healthy options'],
    sustainable: true
  },
  'Vimto Cordials': {
    name: 'Vimto',
    category: 'Cordials',
    description: 'Iconic British cordial brand creating distinctive fruit-flavored drinks that have been a family favorite for over a century.',
    location: 'Manchester, UK',
    established: '1908',
    specialties: ['Fruit cordials', 'British heritage', 'Family favorite', 'Distinctive flavors'],
    sustainable: false
  }
};

// Supplier lists for each pub
const pubSuppliers = {
  'the-chaser-inn': [
    'Bodium Meats', 'Chapmans Fish', 'Sankeys Fishmongers', 'FK Carter eggs', 'TH Brown Veg',
    'Penshurst fine foods', 'Rusbridge Bakery', 'Salcombe Dairy Ice cream', 'Smokin Brothers Salmon',
    'Tracklements Sauces', 'Wicks Bacon', 'Salty Dog nuts and crisps', 'Mr Fitz Aqua Spritz',
    'Chapel Down', 'Fever Tree', 'Enotria Wine', 'LWC', 'Ninju Juices', 'Vimto Cordials'
  ],
  'the-cricketers-inn': [
    'Bodium Meats', 'TH Brown Veg', 'Penshurst fine foods', 'Salcombe Dairy Ice cream',
    'Smokin Brothers Salmon', 'Tracklements Sauces', 'Wicks Bacon', 'Longfield Bakery',
    'Salty Dog nuts and crisps', 'Mr Fitz Aqua Spritz', 'Chapel Down', 'Fever Tree',
    'Enotria Wine', 'LWC', 'Ninju Juices', 'Vimto Cordials'
  ],
  'the-rose-and-crown': [
    'Bodium Meats', 'Chapmans Fish', 'FK Carter eggs', 'Harris Covent Garden Veg',
    'Penshurst fine foods', 'Salcombe Dairy Ice cream', 'Smokin Brothers Salmon',
    'Tracklements Sauces', 'Wicks Bacon', 'Salty Dog nuts and crisps', 'Mr Fitz Aqua Spritz',
    'Chapel Down', 'Fever Tree', 'Enotria Wine', 'LWC', 'Ninju Juices', 'Vimto Cordials'
  ],
  'the-little-brown-jug': [
    'Rusbridge Bakery', 'Bodium Meats', 'Chapmans Fish', 'FK Carter eggs', 'TH Brown Veg',
    'Penshurst fine foods', 'Salcombe Dairy Ice cream', 'Smokin Brothers Salmon',
    'Salty Dog nuts and crisps', 'Tracklements Sauces', 'Wicks Bacon', 'Mr Fitz Aqua Spritz',
    'Chapel Down', 'Fever Tree', 'Enotria Wine', 'LWC', 'Ninju Juices', 'Vimto Cordials'
  ],
  'the-bull': [
    'Rusbridge Bakery', 'Bodium Meats', 'Chapmans Fish', 'FK Carter eggs', 'TH Brown Veg',
    'Penshurst fine foods', 'Salcombe Dairy Ice cream', 'Smokin Brothers Salmon',
    'Tracklements Sauces', 'Wicks Bacon', 'Salty Dog nuts and crisps', 'Mr Fitz Aqua Spritz',
    'Chapel Down', 'Fever Tree', 'Enotria Wine', 'LWC', 'Ninju Juices', 'Vimto Cordials'
  ],
  'the-bull-otford': [
    'Rusbridge Bakery', 'Bodium Meats', 'Chapmans Fish', 'FK Carter eggs', 'TH Brown Veg',
    'Penshurst fine foods', 'Salcombe Dairy Ice cream', 'Smokin Brothers Salmon',
    'Tracklements Sauces', 'Wicks Bacon', 'Salty Dog nuts and crisps', 'Mr Fitz Aqua Spritz',
    'Chapel Down', 'Fever Tree', 'Enotria Wine', 'LWC', 'Ninju Juices', 'Vimto Cordials'
  ]
};

const categories = [
  'All',
  'Meat & Poultry',
  'Seafood',
  'Fresh Produce',
  'Bakery',
  'Desserts',
  'Wine & Sparkling',
  'Beverages',
  'Specialty Foods',
  'Condiments'
];

export default function PubSuppliers({ 
  pubName, 
  pubSlug, 
  showTitle = true, 
  compact = false 
}: PubSuppliersProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedSupplier, setExpandedSupplier] = useState<string | null>(null);

  // Get suppliers for this specific pub or show all
  const relevantSuppliers = pubSlug 
    ? pubSuppliers[pubSlug] || []
    : Object.keys(supplierDatabase);

  // Filter suppliers by category
  const filteredSuppliers = relevantSuppliers.filter(supplierName => {
    const supplier = supplierDatabase[supplierName];
    if (!supplier) return false;
    return selectedCategory === 'All' || supplier.category === selectedCategory;
  });

  // Group suppliers by category for display
  const groupedSuppliers = categories.slice(1).reduce((acc, category) => {
    const suppliers = filteredSuppliers.filter(name => 
      supplierDatabase[name]?.category === category
    );
    if (suppliers.length > 0) {
      acc[category] = suppliers;
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {showTitle && (
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                Our Partners
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                {pubName ? `${pubName}'s Trusted Suppliers` : 'Quality You Can Taste'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We partner with the finest local and artisan producers across Britain, ensuring every dish and drink meets our exacting standards. 
                From Kent's rolling countryside to Devon's coastal towns, we source the very best.
              </p>
            </div>
          )}

          {!compact && (
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-secondary shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Stats Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {relevantSuppliers.length}
                </div>
                <div className="text-sm text-gray-600">Trusted Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {relevantSuppliers.filter(name => supplierDatabase[name]?.sustainable).length}
                </div>
                <div className="text-sm text-gray-600">Sustainable Sources</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {relevantSuppliers.filter(name => supplierDatabase[name]?.location?.includes('Kent')).length}
                </div>
                <div className="text-sm text-gray-600">Local to Kent</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {relevantSuppliers.filter(name => supplierDatabase[name]?.awards).length}
                </div>
                <div className="text-sm text-gray-600">Award Winners</div>
              </div>
            </div>
          </div>

          {selectedCategory === 'All' ? (
            // Show grouped by category
            <div className="space-y-12">
              {Object.entries(groupedSuppliers).map(([category, suppliers]) => (
                <div key={category}>
                  <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-secondary" />
                    </div>
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suppliers.map(supplierName => {
                      const supplier = supplierDatabase[supplierName];
                      if (!supplier) return null;

                      const isExpanded = expandedSupplier === supplierName;
                      
                      return (
                        <Card key={supplierName} className="hover:shadow-xl transition-all duration-300">
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg font-bold text-primary mb-2">
                                  {supplier.name}
                                </CardTitle>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                  <MapPin className="w-4 h-4" />
                                  {supplier.location}
                                </div>
                                {supplier.established && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    Since {supplier.established}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                {supplier.sustainable && (
                                  <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                                    Sustainable
                                  </Badge>
                                )}
                                {supplier.awards && (
                                  <div className="flex items-center gap-1 text-xs text-secondary">
                                    <Award className="w-3 h-3" />
                                    Awards
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                              {isExpanded ? supplier.description : `${supplier.description.substring(0, 120)}...`}
                            </p>
                            
                            {isExpanded && (
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-semibold text-primary mb-2 text-sm">Specialties:</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {supplier.specialties.map((specialty, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs">
                                        {specialty}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                {supplier.website && (
                                  <a 
                                    href={`https://${supplier.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary/80 font-medium"
                                  >
                                    Visit Website
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            )}
                            
                            <button
                              onClick={() => setExpandedSupplier(isExpanded ? null : supplierName)}
                              className="flex items-center gap-1 text-sm text-primary hover:text-secondary font-medium mt-3"
                            >
                              {isExpanded ? 'Show Less' : 'Learn More'}
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Show filtered category
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuppliers.map(supplierName => {
                const supplier = supplierDatabase[supplierName];
                if (!supplier) return null;

                const isExpanded = expandedSupplier === supplierName;
                
                return (
                  <Card key={supplierName} className="hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-primary mb-2">
                            {supplier.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            {supplier.location}
                          </div>
                          {supplier.established && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              Since {supplier.established}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {supplier.sustainable && (
                            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                              Sustainable
                            </Badge>
                          )}
                          {supplier.awards && (
                            <div className="flex items-center gap-1 text-xs text-secondary">
                              <Award className="w-3 h-3" />
                              Awards
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        {isExpanded ? supplier.description : `${supplier.description.substring(0, 120)}...`}
                      </p>
                      
                      {isExpanded && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-primary mb-2 text-sm">Specialties:</h4>
                            <div className="flex flex-wrap gap-1">
                              {supplier.specialties.map((specialty, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {supplier.website && (
                            <a 
                              href={`https://${supplier.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary/80 font-medium"
                            >
                              Visit Website
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                      
                      <button
                        onClick={() => setExpandedSupplier(isExpanded ? null : supplierName)}
                        className="flex items-center gap-1 text-sm text-primary hover:text-secondary font-medium mt-3"
                      >
                        {isExpanded ? 'Show Less' : 'Learn More'}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-primary rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-secondary mb-4">
                Taste the Difference Quality Makes
              </h3>
              <p className="text-secondary/90 mb-6 max-w-2xl mx-auto">
                Every ingredient we serve has been carefully selected from our network of trusted suppliers. 
                Come and experience the exceptional flavors that partnerships with the best producers create.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/book-table"
                  className="inline-flex items-center px-8 py-3 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book Your Table
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#menus"
                  className="inline-flex items-center px-8 py-3 bg-white/10 text-secondary font-semibold rounded-lg border-2 border-secondary hover:bg-white hover:text-primary transition-all duration-300"
                >
                  View Our Menus
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}