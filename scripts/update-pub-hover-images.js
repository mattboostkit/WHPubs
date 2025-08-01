import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN || 'sk1PHVISf0xNjFVLvY2fIetm6gTXv3iL85joYcLqRnXGN3aO0pets0Md3EzVCy8ZAZc8AKB2FG0pNzdXV6zZBj5MQNNw4A1CBhUH9IslFxc3aHOSwveeBVk5ryWFPzesC8P6O2QwtWPtQnXKyT88ejVzwDBDmwa4F7DLmajI4NFaUoWgbf7G',
  useCdn: false
});

// Get all pubs
async function getPubs() {
  const pubs = await client.fetch(`
    *[_type == "pub"] {
      _id,
      name,
      slug,
      image,
      heroImage
    }
  `);
  return pubs;
}

// Update a pub with new exterior and interior images
async function updatePubImages(pubId, exteriorImageUrl, interiorImageUrl) {
  try {
    // First, upload the exterior image
    const exteriorImageAsset = await client.assets.upload('image', exteriorImageUrl, {
      filename: `exterior-${Date.now()}.jpg`
    });

    // Then, upload the interior image
    const interiorImageAsset = await client.assets.upload('image', interiorImageUrl, {
      filename: `interior-${Date.now()}.jpg`
    });

    // Update the pub document
    await client.patch(pubId)
      .set({
        exteriorImage: {
          asset: {
            _type: 'reference',
            _ref: exteriorImageAsset._id
          },
          alt: `Exterior of ${pub.name}`
        },
        interiorImage: {
          asset: {
            _type: 'reference',
            _ref: interiorImageAsset._id
          },
          alt: `Interior of ${pub.name}`
        }
      })
      .commit();

    console.log(`✅ Updated ${pub.name} with new hover images`);
  } catch (error) {
    console.error(`❌ Error updating ${pub.name}:`, error);
  }
}

// Main function
async function main() {
  console.log('🏪 WH Pubs Hover Image Update Tool');
  console.log('=====================================\n');

  const pubs = await getPubs();
  
  console.log('📋 Available Pubs:');
  pubs.forEach((pub, index) => {
    console.log(`${index + 1}. ${pub.name} (${pub.slug.current})`);
  });

  console.log('\n📝 Instructions:');
  console.log('1. For each pub, you need to upload two images:');
  console.log('   - Exterior Image (828x605px): Outside view of the pub');
  console.log('   - Interior Image (828x605px): Inside/bar view of the pub');
  console.log('2. The images should be exactly 828x605px for optimal display');
  console.log('3. You can upload these images directly in Sanity Studio');
  console.log('4. Or use this script by providing image URLs');

  console.log('\n🔧 To use this script:');
  console.log('1. Update the updatePubImages() function calls below with your image URLs');
  console.log('2. Run: node scripts/update-pub-hover-images.js');

  // Example usage (uncomment and modify as needed):
  /*
  // Update The Bull
  await updatePubImages(
    'pub-id-here',
    'https://example.com/bull-exterior.jpg',
    'https://example.com/bull-interior.jpg'
  );

  // Update The Chaser Inn
  await updatePubImages(
    'pub-id-here',
    'https://example.com/chaser-exterior.jpg',
    'https://example.com/chaser-interior.jpg'
  );
  */
}

main().catch(console.error); 