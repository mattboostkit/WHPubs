import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Mapping of pub slugs to their LiveRes site IDs
const liveResSiteIds = {
  'the-little-brown-jug': '4c4d14e2-7bf3-4952-baea-69da60126460',
  'the-rose-and-crown': '304df119-0d39-4f03-bce3-6deee8b79d90',
  'the-cricketers-inn': '329d4e4f-c7ff-4ca0-ab7b-7d866ce38670',
  'the-bull-otford': 'cc8b210d-e765-4aa6-b10e-f3dba5a9d039',
  'the-chaser-inn': '36a6d37c-eeb9-40d9-932f-f9ffdb5d630a'
};

async function updateLiveResSiteIds() {
  console.log('Fetching pubs from Sanity...');
  
  try {
    // Fetch all pubs
    const pubs = await client.fetch(`*[_type == "pub"]{ _id, name, slug, liveResSiteId }`);
    
    console.log(`Found ${pubs.length} pubs`);
    
    for (const pub of pubs) {
      const slugCurrent = pub.slug?.current || pub.slug;
      const siteId = liveResSiteIds[slugCurrent];
      
      if (siteId) {
        console.log(`\nUpdating ${pub.name}:`);
        console.log(`  Current site ID: ${pub.liveResSiteId || 'none'}`);
        console.log(`  New site ID: ${siteId}`);
        
        // Update the pub with the LiveRes site ID
        await client
          .patch(pub._id)
          .set({ liveResSiteId: siteId })
          .commit();
          
        console.log(`  ✅ Updated successfully`);
      } else {
        console.log(`\n⚠️  No LiveRes site ID found for ${pub.name} (slug: ${slugCurrent})`);
      }
    }
    
    console.log('\n✨ All LiveRes site IDs updated successfully!');
    
  } catch (error) {
    console.error('Error updating LiveRes site IDs:', error);
  }
}

// Run the update
updateLiveResSiteIds();