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

// Generate a unique key
function generateKey() {
  return Math.random().toString(36).substr(2, 9);
}

async function fixEventKeys() {
  try {
    console.log('Fixing event description keys...\n');

    // Fetch all events
    const events = await client.fetch(`*[_type == "event"]`);

    for (const event of events) {
      if (event.description && Array.isArray(event.description)) {
        const fixedDescription = event.description.map(block => ({
          ...block,
          _key: block._key || generateKey(),
          children: block.children?.map(child => ({
            ...child,
            _key: child._key || generateKey()
          })) || []
        }));

        await client
          .patch(event._id)
          .set({ description: fixedDescription })
          .commit();
        
        console.log(`✅ Fixed keys for event: ${event.title}`);
      }
    }

    console.log('\n✨ All event keys fixed successfully!');

  } catch (error) {
    console.error('Error fixing event keys:', error);
  }
}

// Run the script
fixEventKeys();