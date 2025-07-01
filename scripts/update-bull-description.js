import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'it7wwto3',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

async function updateBullDescription() {
  try {
    // Find The Bull pub
    const bull = await client.fetch(`*[_type == "pub" && slug.current == "the-bull"][0]`);
    
    if (!bull) {
      console.log('The Bull pub not found');
      return;
    }

    // Update the description
    const result = await client
      .patch(bull._id)
      .set({
        description: 'A traditional village pub in the heart of Sevenoaks, The Bull combines classic British hospitality with modern comforts. Our spacious beer garden, welcoming atmosphere, and excellent food make us a favorite gathering place for locals and visitors alike.'
      })
      .commit();

    console.log('✅ Successfully updated The Bull\'s description');
    console.log('New description:', result.description);

  } catch (error) {
    console.error('Error updating The Bull:', error);
  }
}

// Run the script
updateBullDescription();