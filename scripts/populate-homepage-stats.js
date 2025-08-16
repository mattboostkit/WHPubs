/**
 * Populate Homepage Statistics for WH Pubs
 * 
 * This script creates homepage statistics content.
 * Run with: node scripts/populate-homepage-stats.js
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN, // Set this in your environment
  useCdn: false
});

const statsData = {
  title: 'Our Story in Numbers',
  subtitle: 'Celebrating our heritage and commitment to exceptional pub experiences across Kent and Surrey',
  stats: [
    {
      number: '5',
      label: 'Traditional Pubs',
      description: 'Each with its own unique character and charm',
      icon: 'home',
      color: 'gold'
    },
    {
      number: '25+',
      label: 'Years of Experience',
      description: 'Serving local communities with pride',
      icon: 'calendar',
      color: 'green'
    },
    {
      number: '10K+',
      label: 'Happy Customers',
      description: 'Creating memorable experiences every day',
      icon: 'heart',
      color: 'red'
    },
    {
      number: '100+',
      label: 'Local Suppliers',
      description: 'Supporting our community and local economy',
      icon: 'handshake',
      color: 'blue'
    },
    {
      number: '50K+',
      label: 'Meals Served',
      description: 'From traditional roasts to contemporary dishes',
      icon: 'utensils',
      color: 'orange'
    },
    {
      number: '4.8★',
      label: 'Average Rating',
      description: 'Consistently excellent service and quality',
      icon: 'star',
      color: 'gold'
    }
  ],
  backgroundColor: 'light',
  animationEnabled: true,
  showOnHomepage: true
};

async function createHomepageStats() {
  console.log('Creating homepage statistics...');
  
  try {
    const doc = await client.create({
      _type: 'homepageStats',
      ...statsData
    });
    
    console.log(`✅ Created homepage statistics (${doc._id})`);
    console.log('\n📊 Statistics created:');
    statsData.stats.forEach(stat => {
      console.log(`  ${stat.number} ${stat.label} - ${stat.description}`);
    });
    
    console.log('\n🎉 Homepage statistics created successfully!');
    console.log('\nNext steps:');
    console.log('1. Upload a background image in Sanity Studio (optional)');
    console.log('2. Update the HomepageStats component to use CMS data');
    console.log('3. Adjust numbers and descriptions as needed');
    
  } catch (error) {
    console.error('❌ Error creating homepage statistics:', error);
  }
}

// Run the script
createHomepageStats();