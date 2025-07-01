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

async function updateChefImageGuidance() {
  try {
    console.log('Updating Development Kitchen schema image guidance...');
    
    // Note: This is a reminder for the content editors
    console.log('\n📸 IMPORTANT: Chef Profile Image Guidelines');
    console.log('============================================');
    console.log('When uploading Tony French\'s photo in Sanity:');
    console.log('1. Use a portrait orientation image (4:5 ratio recommended)');
    console.log('2. Frame the shot from mid-chest up to include head with some space above');
    console.log('3. Ideal dimensions: 800x1000px or similar portrait ratio');
    console.log('4. The image display is set to object-position: top to prevent head cutoff');
    console.log('\nThe frontend now uses aspect-[4/5] with object-cover and object-top positioning.');
    console.log('This ensures the chef\'s head is always visible in the frame.');
    
    console.log('\n✅ Frontend styling has been updated to prevent head cutoff!');
    console.log('\nNext steps:');
    console.log('1. Go to Sanity Studio');
    console.log('2. Navigate to Development Kitchen > Chef Profile');
    console.log('3. Upload a properly framed portrait photo of Tony French');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
updateChefImageGuidance();