import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Sample menu data
const sampleMenuSections = [
  {
    sectionName: 'While You Wait',
    sectionDescription: 'Perfect bites to start your experience',
    items: [
      { name: 'Bread & Oils', description: 'Freshly baked sourdough with olive oil and balsamic', price: '£6.95', dietary: ['V'], available: true },
      { name: 'Garlic Flatbread', description: 'Crispy flatbread with garlic butter and herbs', price: '£7.50', dietary: ['V'], available: true },
      { name: 'Mixed Olives', description: 'Marinated Mediterranean olives', price: '£4.95', dietary: ['VG', 'GF'], available: true }
    ]
  },
  {
    sectionName: 'Starters',
    sectionDescription: null,
    items: [
      { name: 'Soup of the Day', description: 'Please ask your server for today\'s selection', price: '£7.95', dietary: [], available: true },
      { name: 'Chicken Caesar Croquettes', description: 'Crispy croquettes with Caesar dressing', price: '£10.95', dietary: [], available: true },
      { name: 'Baked Camembert', description: 'Whole baked cheese with crusty bread and chutney', price: '£16.50', dietary: ['V'], available: true }
    ]
  },
  {
    sectionName: 'Mains',
    sectionDescription: 'Hearty dishes made with locally sourced ingredients',
    items: [
      { name: 'Beer Battered Fish & Chips', description: 'Fresh cod in crispy beer batter with hand-cut chips, mushy peas and tartare sauce', price: '£19.95', dietary: ['DF'], available: true },
      { name: 'Gourmet Beef Burger', description: '8oz British beef patty with bacon, cheese, lettuce, tomato and house sauce', price: '£17.50', dietary: [], available: true },
      { name: 'Chicken Caesar Salad', description: 'Grilled chicken breast, cos lettuce, parmesan, croutons and Caesar dressing', price: '£21.95', dietary: [], available: true },
      { name: 'Vegan Buddha Bowl', description: 'Quinoa, roasted vegetables, chickpeas, avocado and tahini dressing', price: '£16.50', dietary: ['VG', 'GF'], available: true }
    ]
  },
  {
    sectionName: 'Desserts',
    sectionDescription: 'Sweet endings to your meal',
    items: [
      { name: 'Sticky Toffee Pudding', description: 'Classic British pudding with butterscotch sauce and vanilla ice cream', price: '£8.95', dietary: ['V'], available: true },
      { name: 'Chocolate Brownie', description: 'Warm chocolate brownie with chocolate sauce and ice cream', price: '£8.50', dietary: ['V', 'GF'], available: true },
      { name: 'Cheese Board', description: 'Selection of British cheeses with crackers and chutney', price: '£12.95', dietary: ['V'], available: true }
    ]
  }
];

// Sample "Come to us for" features
const samplePubFeatures = [
  {
    title: 'Food & Drink',
    description: 'Experience our seasonal menu featuring locally sourced ingredients and craft beverages from regional breweries.',
    orderNumber: 1
  },
  {
    title: 'Garden & Terrace',
    description: 'Relax in our beautiful beer garden with outdoor seating, perfect for sunny days and warm evenings.',
    orderNumber: 2
  },
  {
    title: 'Private Dining',
    description: 'Host your special occasions in our private dining room, perfect for celebrations and corporate events.',
    orderNumber: 3
  }
];

// Sample privacy policy content
const samplePrivacyPolicy = [
  {
    _type: 'block',
    style: 'h1',
    children: [{ _type: 'span', text: 'Privacy Policy' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This privacy policy explains how we collect, use, and protect your personal information when you visit our website or visit our establishments.' }]
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: '1. Information We Collect' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We may collect the following types of information:' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Personal details such as name, email address, and phone number when you make a reservation or contact us' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Information about your visit to our website through cookies and analytics' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Feedback and reviews you provide about our services' }]
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: '2. How We Use Your Information' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We use your information to:' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Process reservations and bookings' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Send you updates about events and special offers (with your consent)' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Improve our services and website experience' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Comply with legal obligations' }]
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: '3. Data Protection' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We take the security of your personal data seriously and have implemented appropriate technical and organizational measures to protect it.' }]
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: '4. Your Rights' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You have the right to:' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Access the personal data we hold about you' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Request correction of inaccurate data' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Request deletion of your data' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Object to processing of your data' }]
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: '5. Contact Us' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you have any questions about this privacy policy or how we handle your data, please contact us at privacy@whpubs.com' }]
  }
];

async function populateSampleData() {
  try {
    console.log('Starting to populate sample data...');

    // Get all pubs
    const pubs = await client.fetch(`*[_type == "pub"] { _id, name, slug }`);
    console.log(`Found ${pubs.length} pubs`);

    // Create privacy policy for hub
    console.log('Creating hub privacy policy...');
    const hubPrivacyPolicy = await client.create({
      _type: 'privacyPolicy',
      title: 'Privacy Policy',
      lastUpdated: new Date().toISOString(),
      content: samplePrivacyPolicy,
      slug: {
        _type: 'slug',
        current: 'privacy-policy'
      },
      active: true
    });
    console.log('Hub privacy policy created');

    // For each pub, create menu, features, and privacy policy
    for (const pub of pubs) {
      console.log(`\nProcessing ${pub.name}...`);

      // Create detailed menu
      console.log(`Creating menu for ${pub.name}...`);
      const menu = await client.create({
        _type: 'menu',
        title: 'Main Menu',
        associatedPub: {
          _type: 'reference',
          _ref: pub._id
        },
        slug: {
          _type: 'slug',
          current: 'main-menu'
        },
        sections: sampleMenuSections,
        notes: 'All prices include VAT. A discretionary 10% service charge will be added to your bill.',
        active: true,
        displayOrder: 1
      });
      console.log(`Menu created for ${pub.name}`);

      // Create pub features
      console.log(`Creating features for ${pub.name}...`);
      
      // Note: We'll need to upload images separately. For now, using placeholder
      const features = await client.create({
        _type: 'pubFeatures',
        pub: {
          _type: 'reference',
          _ref: pub._id
        },
        title: 'Come to us for',
        features: samplePubFeatures.map(feature => ({
          ...feature,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder' // You'll need to upload real images
            },
            alt: feature.title
          }
        })),
        active: true
      });
      console.log(`Features created for ${pub.name}`);

      // Create pub-specific privacy policy
      console.log(`Creating privacy policy for ${pub.name}...`);
      const pubPrivacyPolicy = await client.create({
        _type: 'privacyPolicy',
        title: `${pub.name} Privacy Policy`,
        lastUpdated: new Date().toISOString(),
        content: samplePrivacyPolicy,
        associatedPub: {
          _type: 'reference',
          _ref: pub._id
        },
        slug: {
          _type: 'slug',
          current: `${pub.slug.current}-privacy-policy`
        },
        active: true
      });
      console.log(`Privacy policy created for ${pub.name}`);
    }

    console.log('\n✅ Sample data population completed successfully!');
    console.log('\nNote: You\'ll need to upload actual images for the "Come to us for" features in Sanity Studio.');
    
  } catch (error) {
    console.error('Error populating sample data:', error);
    process.exit(1);
  }
}

// Run the script
populateSampleData();