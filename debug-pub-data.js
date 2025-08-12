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

async function debugBullData() {
  try {
    console.log('\n--- Checking The Bull for comparison ---');
    const pub = await client.fetch(`
      *[_type == "pub" && slug.current == "the-bull"][0] {
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
    
    console.log('The Bull data:', JSON.stringify(pub, null, 2));
    
  } catch (error) {
    console.error('Error fetching Bull data:', error);
  }
}

debugBullData();

async function listAllPubs() {
  try {
    console.log('\n--- Listing all pubs ---');
    const pubs = await client.fetch(`
      *[_type == "pub"] {
        name,
        "slug": slug.current,
        "hasSquareLogo": defined(squareLogo),
        "hasLogo": defined(logo)
      } | order(name asc)
    `);
    
    console.log('All pubs:');
    pubs.forEach(pub => {
      console.log(`- ${pub.name} (${pub.slug}) - squareLogo: ${pub.hasSquareLogo}, logo: ${pub.hasLogo}`);
    });
    
  } catch (error) {
    console.error('Error listing pubs:', error);
  }
}

listAllPubs();