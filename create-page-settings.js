import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_TOKEN // You'll need to set this environment variable
});

const pageSettings = [
  {
    _type: 'pageSettings',
    pageName: 'events',
    heroTitle: 'Upcoming Events',
    heroSubtitle: 'Join us for unforgettable experiences at WH Pubs'
  },
  {
    _type: 'pageSettings',
    pageName: 'blog',
    heroTitle: 'Latest News & Updates',
    heroSubtitle: 'Stay up to date with what\'s happening across our pubs'
  },
  {
    _type: 'pageSettings',
    pageName: 'contact',
    heroTitle: 'Get in Touch',
    heroSubtitle: 'We\'d love to hear from you'
  },
  {
    _type: 'pageSettings',
    pageName: 'careers',
    heroTitle: 'Join Our Team',
    heroSubtitle: 'Discover exciting opportunities at WH Pubs'
  }
];

async function createPageSettings() {
  console.log('Creating page settings...');
  
  for (const setting of pageSettings) {
    try {
      const result = await client.create(setting);
      console.log(`✓ Created page settings for ${setting.pageName}`);
    } catch (error) {
      console.error(`Error creating page settings for ${setting.pageName}:`, error.message);
    }
  }
  
  console.log('\nPage settings creation complete!');
  console.log('\n📸 Next steps:');
  console.log('1. Go to Sanity Studio at https://whpubs.sanity.studio');
  console.log('2. Navigate to Page Settings');
  console.log('3. Upload hero images for each page (ideal size: 1920x600px)');
  console.log('\nPages to upload images for:');
  console.log('- Events Page');
  console.log('- Blog Page'); 
  console.log('- Contact Page');
  console.log('- Careers Page');
}

createPageSettings();