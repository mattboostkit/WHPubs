import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

async function debugPubData() {
  try {
    console.log('Fetching The Little Brown Jug data...');
    const pub = await client.fetch(`
      *[_type == "pub" && slug.current == "the-little-brown-jug"][0] {
        name,
        slug,
        squareLogo {
          asset->{
            _id,
            url
          },
          alt
        },
        logo {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `);
    
    console.log('Pub data:', JSON.stringify(pub, null, 2));
    
    if (!pub) {
      console.log('❌ No pub found with slug "the-little-brown-jug"');
      return;
    }
    
    console.log('✅ Pub found:', pub.name);
    
    if (!pub.squareLogo) {
      console.log('❌ No squareLogo found');
    } else {
      console.log('✅ squareLogo found:', pub.squareLogo);
    }
    
    if (!pub.logo) {
      console.log('❌ No logo found');
    } else {
      console.log('✅ logo found:', pub.logo);
    }
    
  } catch (error) {
    console.error('Error fetching pub data:', error);
  }
}

debugPubData();