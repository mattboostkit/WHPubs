import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // Use CDN for read-only operations
});

async function readPubsData() {
  console.log('Fetching pubs from Sanity...');
  
  try {
    // Fetch all pubs with whyChooseUs data
    const pubs = await client.fetch(`*[_type == "pub"] | order(name asc) { 
      _id, 
      name, 
      slug, 
      whyChooseUs {
        reason1 { title, description },
        reason2 { title, description }, 
        reason3 { title, description }
      }
    }`);
    
    console.log(`Found ${pubs.length} pubs:\n`);
    
    pubs.forEach(pub => {
      const slugCurrent = pub.slug?.current || pub.slug;
      console.log(`📍 ${pub.name} (${slugCurrent})`);
      console.log(`   ID: ${pub._id}`);
      
      if (pub.whyChooseUs) {
        console.log('   Current Why Choose Us:');
        if (pub.whyChooseUs.reason1) {
          console.log(`     1. ${pub.whyChooseUs.reason1.title}: ${pub.whyChooseUs.reason1.description}`);
        }
        if (pub.whyChooseUs.reason2) {
          console.log(`     2. ${pub.whyChooseUs.reason2.title}: ${pub.whyChooseUs.reason2.description}`);
        }
        if (pub.whyChooseUs.reason3) {
          console.log(`     3. ${pub.whyChooseUs.reason3.title}: ${pub.whyChooseUs.reason3.description}`);
        }
      } else {
        console.log('   ❌ No Why Choose Us data');
      }
      console.log('');
    });
    
  } catch (error) {
    console.error('Error reading pubs data:', error);
  }
}

// Run the read operation
readPubsData();