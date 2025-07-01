import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'it7wwto3',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const pageSettings = [
  {
    _type: 'pageSettings',
    pageName: 'about',
    heroTitle: 'About WH Pubs',
    heroSubtitle: 'Established in 1985, preserving the tradition of the great British pub',
    // Note: Image will need to be uploaded manually in Sanity Studio
  },
  {
    _type: 'pageSettings',
    pageName: 'events',
    heroTitle: 'Events',
    heroSubtitle: 'Discover what\'s happening across all our pubs',
  },
  {
    _type: 'pageSettings',
    pageName: 'blog',
    heroTitle: 'Latest News',
    heroSubtitle: 'Updates and stories from WH Pubs',
  },
  {
    _type: 'pageSettings',
    pageName: 'contact',
    heroTitle: 'Contact Us',
    heroSubtitle: 'Get in touch with WH Pubs',
  },
  {
    _type: 'pageSettings',
    pageName: 'careers',
    heroTitle: 'Careers',
    heroSubtitle: 'Join the WH Pubs family',
  },
];

async function createPageSettings() {
  try {
    console.log('Creating page settings...\n');

    for (const setting of pageSettings) {
      // Check if page setting already exists
      const existing = await client.fetch(
        `*[_type == "pageSettings" && pageName == $pageName][0]`,
        { pageName: setting.pageName }
      );

      if (existing) {
        console.log(`⏭️  Page settings for "${setting.pageName}" already exist (ID: ${existing._id})`);
      } else {
        const result = await client.create(setting);
        console.log(`✅ Created page settings for "${setting.pageName}" (ID: ${result._id})`);
      }
    }

    console.log('\n📸 NEXT STEPS:');
    console.log('============================================');
    console.log('1. Go to Sanity Studio (https://whpubs.sanity.studio)');
    console.log('2. Navigate to "Page Settings" in the content list');
    console.log('3. For each page, upload an appropriate hero image:');
    console.log('   - About: Historic pub exterior or interior');
    console.log('   - Events: Lively pub atmosphere or event scene');
    console.log('   - Blog: Writing/news related imagery');
    console.log('   - Contact: Welcoming pub entrance');
    console.log('   - Careers: Team/staff photo');
    console.log('\n4. Recommended image size: 1920x800px for optimal display');
    console.log('5. Images will display at 40% of viewport height');
    
  } catch (error) {
    console.error('Error creating page settings:', error);
    process.exit(1);
  }
}

// Run the script
createPageSettings();