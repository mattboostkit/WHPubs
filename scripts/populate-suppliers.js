/**
 * Populate Suppliers for WH Pubs
 * 
 * This script creates sample supplier data for the WH Pubs project.
 * Run with: node scripts/populate-suppliers.js
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN, // Set this in your environment
  useCdn: false
});

const suppliersData = [
  // Food & Produce
  {
    name: 'Kent Farm Fresh',
    slug: { current: 'kent-farm-fresh' },
    category: 'food',
    description: 'Local Kent farm providing fresh, seasonal vegetables and premium quality meat. Family-run for over 30 years.',
    location: 'Kent',
    specialties: ['Organic vegetables', 'Free-range meat', 'Seasonal produce'],
    partnershipType: 'primary',
    featured: true,
    sortOrder: 1,
    contactInfo: {
      email: 'orders@kentfarmfresh.co.uk',
      phone: '01234 567890',
      address: 'Kent Farm, Canterbury Road, Kent CT1 2AB'
    }
  },
  {
    name: 'Surrey Artisan Butchers',
    slug: { current: 'surrey-artisan-butchers' },
    category: 'food',
    description: 'Traditional butchers specialising in locally sourced, premium cuts of beef, lamb, and pork.',
    location: 'Surrey',
    specialties: ['Premium beef', 'Local lamb', 'Traditional sausages'],
    partnershipType: 'regular',
    featured: true,
    sortOrder: 2
  },
  
  // Beverages & Drinks
  {
    name: 'Shepherd Neame Brewery',
    slug: { current: 'shepherd-neame-brewery' },
    category: 'beverages',
    description: 'Britain\'s oldest brewer, producing exceptional ales and lagers since 1698. Based in Kent.',
    location: 'Kent',
    specialties: ['Traditional ales', 'Seasonal brews', 'Kentish bitter'],
    website: 'https://www.shepherdneame.co.uk',
    partnershipType: 'exclusive',
    featured: true,
    sortOrder: 1,
    contactInfo: {
      email: 'trade@shepherdneame.co.uk',
      phone: '01795 532206'
    }
  },
  {
    name: 'Local Craft Brewery Co',
    slug: { current: 'local-craft-brewery-co' },
    category: 'beverages',
    description: 'Independent craft brewery creating unique, small-batch beers with innovative flavours.',
    location: 'Surrey',
    specialties: ['Craft beer', 'Seasonal specials', 'IPA varieties'],
    partnershipType: 'regular',
    featured: false,
    sortOrder: 3
  },
  {
    name: 'English Wine Collective',
    slug: { current: 'english-wine-collective' },
    category: 'beverages',
    description: 'Curated selection of premium English wines from award-winning vineyards across the South East.',
    location: 'South East England',
    specialties: ['English sparkling wine', 'Local red wines', 'Seasonal whites'],
    partnershipType: 'regular',
    featured: false,
    sortOrder: 4
  },
  
  // Local Services
  {
    name: 'Green Earth Cleaning',
    slug: { current: 'green-earth-cleaning' },
    category: 'services',
    description: 'Eco-friendly cleaning services using only biodegradable, non-toxic products.',
    location: 'Kent & Surrey',
    specialties: ['Eco cleaning', 'Commercial services', 'Carpet cleaning'],
    partnershipType: 'regular',
    featured: false,
    sortOrder: 5
  },
  {
    name: 'Village Gardens Landscaping',
    slug: { current: 'village-gardens-landscaping' },
    category: 'services',
    description: 'Professional landscaping and garden maintenance for pub beer gardens and outdoor spaces.',
    location: 'Local',
    specialties: ['Beer garden design', 'Seasonal planting', 'Maintenance'],
    partnershipType: 'regular',
    featured: false,
    sortOrder: 6
  }
];

async function createSuppliers() {
  console.log('Creating suppliers...');
  
  try {
    for (const supplier of suppliersData) {
      const doc = await client.create({
        _type: 'supplier',
        ...supplier
      });
      console.log(`✅ Created supplier: ${supplier.name} (${doc._id})`);
    }
    
    console.log('\n🎉 All suppliers created successfully!');
    console.log('\nNext steps:');
    console.log('1. Upload logo images for each supplier in Sanity Studio');
    console.log('2. Associate specific suppliers with individual pubs if needed');
    console.log('3. Update the PubSuppliers component to use CMS data');
    
  } catch (error) {
    console.error('❌ Error creating suppliers:', error);
  }
}

// Run the script
createSuppliers();