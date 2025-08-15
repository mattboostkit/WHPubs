#!/usr/bin/env node

/**
 * Script to create "Your WH Pub" mobile service document in Sanity
 * This creates the mobile pub service entry for the Our Pubs section
 */

import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'it7wwto3',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-15',
  token: process.env.SANITY_TOKEN
});

const mobilePubDocument = {
  _type: 'pub',
  name: 'Your WH Pub',
  slug: {
    _type: 'slug',
    current: 'your-wh-pub'
  },
  description: 'Our mobile pub service delivers authentic British pub experience to your chosen location. Perfect for weddings, corporate events, festivals, and private celebrations.',
  featured: true,
  location: 'Anywhere',
  locationName: 'Mobile Service',
  addressLine1: 'Mobile Service',
  postcode: 'ANYWHERE',
  contactEmail: 'mobile@whpubs.co.uk',
  contactPhone: '+44 1234 567890',
  openingHours: 'Available by appointment - all days',
  foodServingTimes: 'Flexible - arranged per event',
  
  // Structured opening hours
  monday: 'Available by appointment',
  tuesday: 'Available by appointment', 
  wednesday: 'Available by appointment',
  thursday: 'Available by appointment',
  friday: 'Available by appointment',
  saturday: 'Available by appointment',
  sunday: 'Available by appointment',

  // Mobile service specific amenities
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

  // Booking and external links
  url: 'mailto:mobile@whpubs.co.uk',
  externalDomain: 'mailto:mobile@whpubs.co.uk',
  reservationsUrl: 'mailto:mobile@whpubs.co.uk',

  // Hero overlay content
  heroOverlayText: 'Bring the Pub to You',
  heroOverlayButtonText: 'Get Quote',
  heroOverlayButtonLink: 'mailto:mobile@whpubs.co.uk',

  // Bio content
  bioName: 'Mobile Pub Service',
  bioTitle: 'Bringing the Pub to You',
  bioText: 'Our mobile pub service brings the authentic British pub experience directly to your chosen location. Whether it\'s a wedding, corporate event, festival, or private celebration, we provide professional bar service with traditional ales, premium spirits, and the warm hospitality WH Pubs is known for.',

  // Special features
  specialFeatures: [
    {
      title: 'Flexible Setup',
      description: 'Our mobile bar can be configured to suit any venue or event size',
      capacity: 200
    },
    {
      title: 'Professional Service', 
      description: 'Experienced bar staff trained in traditional pub hospitality'
    },
    {
      title: 'Full Licensing',
      description: 'Complete licensing coverage for all types of events and venues'
    }
  ],

  // Additional information
  accessibilityInformation: 'Mobile service can be configured to meet accessibility requirements at any venue',
  parkingInformation: 'Service vehicle parking arranged per venue requirements',
  allergenInformation: 'Full allergen information provided for all beverages and any food offerings. Please inform us of any specific dietary requirements when booking.',
  preferredContactMethod: 'Email',

  // SEO
  seoMetaTitle: 'Your WH Pub - Mobile Pub Service | WH Pubs',
  seoMetaDescription: 'Bring authentic British pub experience to your event with Your WH Pub mobile service. Professional bar staff, traditional ales, and premium service.',

  // Current offers
  currentOffers: [
    {
      title: 'Launch Special',
      description: 'Book our mobile service for your event and receive 10% off your first booking',
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
      termsAndConditions: 'Valid for new bookings only. Minimum 4-hour service required.'
    }
  ]
};

async function createMobilePub() {
  try {
    console.log('Creating Your WH Pub mobile service document...');
    
    const result = await client.create(mobilePubDocument);
    
    console.log('✅ Successfully created Your WH Pub mobile service!');
    console.log('Document ID:', result._id);
    console.log('Slug:', result.slug.current);
    console.log('');
    console.log('The mobile pub service will now appear as the 6th pub in:');
    console.log('- Homepage "Our Pubs" section');
    console.log('- /our-pubs page');
    console.log('');
    console.log('Note: You may need to upload images in Sanity Studio:');
    console.log('- Square Logo (500x500px)');
    console.log('- Main Listing Image (828x605px)');
    console.log('- Hero Banner Image (1920x800px)');
    
  } catch (error) {
    console.error('❌ Error creating mobile pub document:', error.message);
    
    if (error.message.includes('rate limit')) {
      console.log('');
      console.log('🔄 Rate limit hit. Please wait a few minutes and try again.');
      console.log('Alternatively, you can create this document manually in Sanity Studio:');
      console.log('https://whpubs.sanity.studio');
    }
  }
}

createMobilePub();