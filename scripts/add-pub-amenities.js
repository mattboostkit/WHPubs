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

const pubAmenities = {
  'The Bull': ['dogFriendly', 'garden', 'localAles', 'food'],
  'The Chaser Inn': ['dogFriendly', 'garden', 'localAles', 'food'],
  'The Little Brown Jug': ['dogFriendly', 'garden', 'localAles', 'food'],
  'The Cricketers Inn': ['garden', 'localAles', 'food'],
  'The Rose and Crown': ['dogFriendly', 'garden', 'localAles', 'food']
};

async function addPubAmenities() {
  try {
    console.log('Adding amenities to all pubs...\n');

    // Fetch all pubs
    const pubs = await client.fetch(`*[_type == "pub"]`);

    for (const pub of pubs) {
      const amenities = pubAmenities[pub.name] || ['localAles', 'food'];
      
      await client
        .patch(pub._id)
        .set({ amenities: amenities })
        .commit();
      
      console.log(`✅ Added amenities to ${pub.name}: ${amenities.join(', ')}`);
    }

    console.log('\n✨ All pub amenities added successfully!');

  } catch (error) {
    console.error('Error adding amenities:', error);
  }
}

// Run the script
addPubAmenities();