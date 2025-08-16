/**
 * Populate Amenities for WH Pubs
 * 
 * This script creates the standard amenities that can be assigned to pubs.
 * Run with: node scripts/populate-amenities.js
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN, // Set this in your environment
  useCdn: false
});

const amenitiesData = [
  // Accessibility & Family
  {
    name: 'Disabled Facilities',
    slug: { current: 'disabled-facilities' },
    description: 'Wheelchair accessible with disabled toilets',
    icon: 'accessibility',
    category: 'accessibility',
    isStandard: false,
    showOnCards: true,
    featured: false,
    displayOrder: 1
  },
  {
    name: 'Family Friendly',
    slug: { current: 'family-friendly' },
    description: 'Children welcome with high chairs available',
    icon: 'users',
    category: 'accessibility',
    isStandard: false,
    showOnCards: true,
    featured: false,
    displayOrder: 2
  },
  {
    name: 'Baby Changing',
    slug: { current: 'baby-changing' },
    description: 'Baby changing facilities available',
    icon: 'baby',
    category: 'accessibility',
    isStandard: false,
    showOnCards: false,
    featured: false,
    displayOrder: 3
  },

  // Pet & Outdoor
  {
    name: 'Dog Friendly',
    slug: { current: 'dog-friendly' },
    description: 'Four-legged friends welcome throughout',
    icon: 'heart',
    category: 'outdoor',
    isStandard: true, // Standard for all pubs
    showOnCards: true,
    featured: true,
    displayOrder: 4
  },
  {
    name: 'Beer Garden',
    slug: { current: 'beer-garden' },
    description: 'Beautiful outdoor seating area',
    icon: 'treePine',
    category: 'outdoor',
    isStandard: false,
    showOnCards: true,
    featured: true,
    displayOrder: 5
  },
  {
    name: 'Car Park',
    slug: { current: 'car-park' },
    description: 'On-site parking available',
    icon: 'car',
    category: 'services',
    isStandard: false,
    showOnCards: true,
    featured: false,
    displayOrder: 6
  },

  // Dining & Food
  {
    name: 'Sunday Roast',
    slug: { current: 'sunday-roast' },
    description: 'Traditional Sunday roast dinner served',
    icon: 'utensilsCrossed',
    category: 'dining',
    isStandard: true, // Standard for all pubs
    showOnCards: true,
    featured: true,
    displayOrder: 7
  },
  {
    name: 'Vegetarian Options',
    slug: { current: 'vegetarian-options' },
    description: 'Wide selection of vegetarian dishes',
    icon: 'leaf',
    category: 'dining',
    isStandard: false,
    showOnCards: false,
    featured: false,
    displayOrder: 8
  },

  // Entertainment
  {
    name: 'Live Music',
    slug: { current: 'live-music' },
    description: 'Regular live music events',
    icon: 'music',
    category: 'entertainment',
    isStandard: false,
    showOnCards: true,
    featured: false,
    displayOrder: 9
  },
  {
    name: 'Sports TV',
    slug: { current: 'sports-tv' },
    description: 'Watch live sports on big screens',
    icon: 'tv',
    category: 'entertainment',
    isStandard: false,
    showOnCards: false,
    featured: false,
    displayOrder: 10
  },
  {
    name: 'Pool Table',
    slug: { current: 'pool-table' },
    description: 'Pool table available for guests',
    icon: 'gamepad2',
    category: 'entertainment',
    isStandard: false,
    showOnCards: false,
    featured: false,
    displayOrder: 11
  },

  // Services & Facilities
  {
    name: 'Free Wi-Fi',
    slug: { current: 'free-wifi' },
    description: 'Complimentary high-speed internet',
    icon: 'wifi',
    category: 'services',
    isStandard: false,
    showOnCards: false,
    featured: false,
    displayOrder: 12
  },
  {
    name: 'Credit Cards Accepted',
    slug: { current: 'credit-cards-accepted' },
    description: 'All major credit cards welcome',
    icon: 'creditCard',
    category: 'services',
    isStandard: false,
    showOnCards: false,
    featured: false,
    displayOrder: 13
  },
  {
    name: 'Function Room',
    slug: { current: 'function-room' },
    description: 'Private function room available',
    icon: 'users',
    category: 'special',
    isStandard: false,
    showOnCards: true,
    featured: false,
    displayOrder: 14
  },

  // Special Features
  {
    name: 'Real Ale',
    slug: { current: 'real-ale' },
    description: 'Traditional cask-conditioned ales',
    icon: 'beer',
    category: 'drinks',
    isStandard: false,
    showOnCards: true,
    featured: true,
    displayOrder: 15
  },
  {
    name: 'Craft Beer',
    slug: { current: 'craft-beer' },
    description: 'Selection of local craft beers',
    icon: 'glass',
    category: 'drinks',
    isStandard: false,
    showOnCards: true,
    featured: false,
    displayOrder: 16
  },
  {
    name: 'Wine Selection',
    slug: { current: 'wine-selection' },
    description: 'Carefully curated wine list',
    icon: 'wine',
    category: 'drinks',
    isStandard: false,
    showOnCards: false,
    featured: false,
    displayOrder: 17
  },

  // Special - Tiki Huts (for specific pubs)
  {
    name: 'Tiki Huts',
    slug: { current: 'tiki-huts' },
    description: 'Unique outdoor tiki-style dining huts',
    icon: 'palmTree',
    category: 'special',
    isStandard: false,
    showOnCards: true,
    featured: true,
    displayOrder: 18,
    additionalInfo: 'Available at Rose & Crown and Little Brown Jug'
  },

  // Transport
  {
    name: 'Bus Route',
    slug: { current: 'bus-route' },
    description: 'Accessible by public transport',
    icon: 'bus',
    category: 'location',
    isStandard: false,
    showOnCards: false,
    featured: false,
    displayOrder: 19
  }
];

async function createAmenities() {
  console.log('Creating amenities...');
  
  try {
    for (const amenity of amenitiesData) {
      const doc = await client.create({
        _type: 'amenity',
        ...amenity
      });
      console.log(`✅ Created amenity: ${amenity.name} (${doc._id})`);
    }
    
    console.log('\n🎉 All amenities created successfully!');
    console.log('\nStandard amenities (automatically included for all pubs):');
    amenitiesData
      .filter(a => a.isStandard)
      .forEach(a => console.log(`  - ${a.name}`));
    
    console.log('\nNext steps:');
    console.log('1. Go to each pub in Sanity Studio');
    console.log('2. Select appropriate amenities from the "Amenities & Features" field');
    console.log('3. Add any custom amenities using the "Custom Amenities" field');
    console.log('4. Update the PubAmenities component to use CMS data');
    
  } catch (error) {
    console.error('❌ Error creating amenities:', error);
  }
}

// Run the script
createAmenities();