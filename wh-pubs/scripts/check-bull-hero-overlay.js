import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function checkBullHeroOverlay() {
  console.log('Checking The Bull hero overlay data...');
  
  try {
    // Fetch The Bull pub data with all hero fields
    const bull = await client.fetch(`*[_type == "pub" && slug.current == "the-bull-otford"][0]{ 
      _id, 
      name, 
      slug,
      heroImage,
      heroOverlayText,
      heroOverlayButtonText,
      heroOverlayButtonLink,
      carouselImages
    }`);
    
    if (!bull) {
      console.log('❌ The Bull pub not found');
      return;
    }
    
    console.log(`Found ${bull.name}:`);
    console.log('Hero Overlay Text:', bull.heroOverlayText || 'None');
    console.log('Hero Overlay Button Text:', bull.heroOverlayButtonText || 'None');
    console.log('Hero Overlay Button Link:', bull.heroOverlayButtonLink || 'None');
    console.log('Carousel Images:', bull.carouselImages?.length || 0);
    
    if (bull.heroOverlayButtonText === 'Explore More') {
      console.log('\n🎯 Found "Explore More" button! Updating...');
      
      await client
        .patch(bull._id)
        .set({ 
          heroOverlayButtonText: 'Book a Table',
          heroOverlayButtonLink: '/book-a-table-pub'
        })
        .commit();
        
      console.log('✅ Updated hero overlay button to "Book a Table"');
    }
    
  } catch (error) {
    console.error('Error checking The Bull hero overlay:', error);
  }
}

// Run the check
checkBullHeroOverlay();