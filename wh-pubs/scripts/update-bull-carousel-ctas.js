import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function updateBullCarouselCTAs() {
  console.log('Updating The Bull carousel CTAs...');
  
  try {
    // Fetch The Bull pub data
    const bull = await client.fetch(`*[_type == "pub" && slug.current == "the-bull-otford"][0]{ 
      _id, 
      name, 
      slug,
      carouselImages[] {
        _key,
        asset->,
        alt,
        caption,
        buttonText,
        buttonLink
      }
    }`);
    
    if (!bull) {
      console.log('❌ The Bull pub not found');
      return;
    }
    
    console.log(`Found ${bull.name} with ${bull.carouselImages?.length || 0} carousel images`);
    
    if (!bull.carouselImages || bull.carouselImages.length === 0) {
      console.log('❌ No carousel images found for The Bull');
      return;
    }
    
    // Update each carousel image to have the correct CTAs
    const updatedImages = bull.carouselImages.map((image, index) => {
      const ctas = [
        { text: "Book a Table", link: "/book-a-table-pub" },
        { text: "What's On", link: "/events" }
      ];
      
      const cta = ctas[index % ctas.length]; // Alternate between the two CTAs
      
      return {
        ...image,
        buttonText: cta.text,
        buttonLink: cta.link
      };
    });
    
    console.log('Updating carousel images with new CTAs:');
    updatedImages.forEach((image, index) => {
      console.log(`  Image ${index + 1}: "${image.buttonText}" -> ${image.buttonLink}`);
    });
    
    // Update The Bull document
    await client
      .patch(bull._id)
      .set({ carouselImages: updatedImages })
      .commit();
      
    console.log('✅ Successfully updated The Bull carousel CTAs!');
    
  } catch (error) {
    console.error('Error updating The Bull carousel CTAs:', error);
  }
}

// Run the update
updateBullCarouselCTAs();