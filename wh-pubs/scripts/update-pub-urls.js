import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Mapping of pub slugs to their Netlify URLs
const pubUrlMappings = {
  'the-bull-otford': 'whpubs-thebull.netlify.app',
  'the-chaser-inn': 'whpubs-thechaserinn.netlify.app',
  'the-rose-and-crown': 'whpubs-theroseandcrown.netlify.app',
  'the-cricketers-inn': 'whpubs-thecricketersinn.netlify.app',
  'the-little-brown-jug': 'whpubs-thelittlebrownjug.netlify.app'
};

async function updatePubUrls() {
  console.log('Fetching pubs from Sanity...');
  
  try {
    // Fetch all pubs
    const pubs = await client.fetch(`*[_type == "pub"]{ _id, name, slug, externalDomain }`);
    
    console.log(`Found ${pubs.length} pubs`);
    
    for (const pub of pubs) {
      const slugCurrent = pub.slug?.current || pub.slug;
      const netlifyUrl = pubUrlMappings[slugCurrent];
      
      if (netlifyUrl) {
        console.log(`\nUpdating ${pub.name}:`);
        console.log(`  Current domain: ${pub.externalDomain || 'none'}`);
        console.log(`  New domain: ${netlifyUrl}`);
        
        // Update the pub with the Netlify URL
        await client
          .patch(pub._id)
          .set({ externalDomain: netlifyUrl })
          .commit();
          
        console.log(`  ✅ Updated successfully`);
      } else {
        console.log(`\n⚠️  No URL mapping found for ${pub.name} (slug: ${slugCurrent})`);
      }
    }
    
    console.log('\n✨ All pub URLs updated successfully!');
    
  } catch (error) {
    console.error('Error updating pub URLs:', error);
  }
}

// Run the update
updatePubUrls();