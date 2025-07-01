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

async function checkDevelopmentKitchenContent() {
  try {
    console.log('Checking Development Kitchen content...\n');

    // Fetch the Development Kitchen document
    const devKitchen = await client.fetch(`
      *[_type == "developmentKitchen"][0] {
        title,
        "hasPhilosophy": defined(philosophy),
        "philosophyHeading": philosophy.heading,
        "philosophyContentLength": length(philosophy.content),
        "hasChefBio": defined(chefProfile.bio),
        "chefBioLength": length(chefProfile.bio),
        "galleryCount": count(gallery),
        "hasSeasonalFocus": defined(seasonalFocus)
      }
    `);

    if (!devKitchen) {
      console.error('❌ Development Kitchen document not found!');
      return;
    }

    console.log('📋 DEVELOPMENT KITCHEN CONTENT STATUS:\n');
    
    console.log('1. PHILOSOPHY SECTION:');
    if (devKitchen.hasPhilosophy) {
      console.log(`   ✅ Philosophy exists`);
      console.log(`   - Heading: "${devKitchen.philosophyHeading || 'No heading'}"`);
      console.log(`   - Content blocks: ${devKitchen.philosophyContentLength || 0}`);
    } else {
      console.log('   ❌ Philosophy section is missing');
    }

    console.log('\n2. CHEF PROFILE (Q&A):');
    if (devKitchen.hasChefBio) {
      console.log(`   ✅ Chef bio exists`);
      console.log(`   - Bio blocks: ${devKitchen.chefBioLength || 0}`);
      console.log('   - The Q&A is included in the bio field');
    } else {
      console.log('   ❌ Chef bio is missing');
    }

    console.log('\n3. GALLERY:');
    console.log(`   - Images: ${devKitchen.galleryCount || 0}`);
    if (devKitchen.galleryCount > 0) {
      console.log('   ✅ Gallery has images');
    } else {
      console.log('   ❌ Gallery is empty');
    }

    console.log('\n4. SEASONAL FOCUS:');
    if (devKitchen.hasSeasonalFocus) {
      console.log('   ✅ Seasonal focus exists (should be Summer 2025)');
    } else {
      console.log('   ❌ Seasonal focus is missing');
    }

    console.log('\n📝 WHAT TO DO:');
    console.log('1. Go to Sanity Studio > Development Kitchen');
    console.log('2. Make sure Philosophy section has content');
    console.log('3. The Q&A with Tony French should be in the Chef Profile > Bio field');
    console.log('4. Add images to the Gallery if needed');
    console.log('5. All content should be visible on the website once saved');

  } catch (error) {
    console.error('Error checking content:', error);
  }
}

// Run the script
checkDevelopmentKitchenContent();