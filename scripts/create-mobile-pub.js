#!/usr/bin/env node

/**
 * Script to create "Your WH Pub" mobile service document
 * Run this script to create the mobile pub service entry in Sanity CMS
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // You'll need to set this
});

const mobilePubDocument = {
  _type: 'pub',
  name: 'Your WH Pub',
  slug: {
    _type: 'slug',
    current: 'your-wh-pub'
  },
  description: 'Our mobile pub service delivers authentic British pub experience to your chosen location.',
  location: 'Anywhere',
  locationName: 'Mobile Service',
  addressLine1: 'Mobile Service',
  addressLine2: '',
  postcode: 'ANYWHERE',
  email: 'mobile@whpubs.co.uk',
  contactPhone: '01234 567890',
  openingHours: 'Available by appointment',
  foodServingTimes: 'Flexible - arranged per event',
  featured: true,
  
  // Reuse existing image references - update these with proper mobile pub images later
  image: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-7d2d38ac86a5a481624e1d458c6bfb8f02e5d457-828x605-jpg' // Placeholder - replace with mobile pub image
    },
    alt: 'Your WH Pub mobile service setup'
  },
  
  heroImage: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-6eee1da5d7d6910e35d18ab27fbb5102f93c986f-1920x800-jpg' // Placeholder - replace with mobile pub hero
    },
    alt: 'Your WH Pub mobile service hero image'
  },
  
  squareLogo: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-7d2d38ac86a5a481624e1d458c6bfb8f02e5d457-828x605-jpg' // Placeholder - replace with square logo
    },
    alt: 'Your WH Pub mobile service logo'
  },
  
  // Mobile service specific content
  pubWebsiteUrl: 'https://whpubs.co.uk/your-wh-pub',
  
  // Amenities focused on mobile service
  amenities: [
    'Mobile Bar Service',
    'Professional Staff',
    'Full Licensing',
    'Custom Menus',
    'Event Planning',
    'Flexible Setup',
    'Traditional Ales',
    'Premium Spirits',
    'Wine Selection',
    'Soft Drinks'
  ],
  
  // Service-focused opening hours
  openingHoursStructured: {
    monday: 'Available by appointment',
    tuesday: 'Available by appointment',
    wednesday: 'Available by appointment',
    thursday: 'Available by appointment',
    friday: 'Available by appointment',
    saturday: 'Available by appointment',
    sunday: 'Available by appointment'
  },
  
  // Payment methods
  paymentMethods: ['cards', 'contactless', 'applepay', 'googlepay', 'cash'],
  
  // Dietary options
  dietaryOptions: ['vegetarian', 'vegan', 'glutenfree', 'kids'],
  
  // Contact preferences
  preferredContactMethod: 'email',
  
  // Bio section for mobile service
  bioName: 'Mobile Pub Service',
  bioTitle: 'Bringing the Pub to You',
  bioText: 'Our mobile pub service brings the authentic British pub experience directly to your chosen location. Whether it\'s a wedding, corporate event, festival, or private celebration, we provide professional bar service with traditional ales, premium spirits, and the warm hospitality WH Pubs is known for.',
  
  // Special features for mobile service
  specialFeatures: [
    {
      title: 'Flexible Setup',
      description: 'Our mobile bar can be configured to suit any venue or event size',
      capacity: 200
    },
    {
      title: 'Professional Service',
      description: 'Experienced bar staff trained in traditional pub hospitality',
      capacity: null
    },
    {
      title: 'Full Licensing',
      description: 'Complete licensing coverage for all types of events and venues',
      capacity: null
    }
  ],
  
  // Accessibility and service info
  accessibilityInfo: 'Mobile service can be configured to meet accessibility requirements at any venue',
  parkingInfo: 'Service vehicle parking arranged per venue requirements',
  
  // Allergen information
  allergenInfo: 'Full allergen information provided for all beverages and any food offerings. Please inform us of any specific dietary requirements when booking.',
  
  // SEO
  metaTitle: 'Your WH Pub - Mobile Pub Service | WH Pubs',
  metaDescription: 'Bring authentic British pub experience to your event with Your WH Pub mobile service. Professional bar staff, traditional ales, and premium service.',
  
  // Current offers
  currentOffers: [
    {
      title: 'Launch Special',
      description: 'Book our mobile service for your event and receive 10% off your first booking',
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
      termsConditions: 'Valid for new bookings only. Minimum 4-hour service required.'
    }
  ]
};

async function createMobilePub() {
  try {
    console.log('Creating Your WH Pub mobile service document...');
    
    const result = await client.create(mobilePubDocument);
    
    console.log('✅ Successfully created mobile pub document:');
    console.log(`Document ID: ${result._id}`);
    console.log(`Name: ${result.name}`);
    console.log(`Slug: ${result.slug.current}`);
    console.log('\n🎯 Next steps:');
    console.log('1. Upload proper mobile pub images in Sanity Studio');
    console.log('2. Update the pubHireImage field in homepage document to reference this pub');
    console.log('3. Deploy Sanity Studio with: npm run deploy');
    console.log('4. Update frontend if needed');
    
  } catch (error) {
    console.error('❌ Error creating mobile pub document:', error);
    
    if (error.statusCode === 401) {
      console.log('\n💡 Make sure to set SANITY_TOKEN environment variable:');
      console.log('export SANITY_TOKEN="your_token_here"');
      console.log('\nGet a token from: https://www.sanity.io/manage/personal/tokens');
    }
  }
}

// Run the script
createMobilePub();