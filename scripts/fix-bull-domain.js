const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function fixBullDomain() {
  try {
    console.log('🔍 Finding The Bull pub...');
    
    // Find The Bull pub
    const bull = await client.fetch(`*[_type == "pub" && slug.current == "the-bull-otford"][0]{_id, name, externalDomain}`);
    
    if (!bull) {
      console.log('❌ The Bull pub not found');
      return;
    }
    
    console.log(`📍 Found: ${bull.name}`);
    console.log(`🌐 Current domain: ${bull.externalDomain}`);
    
    // Update the external domain
    const result = await client
      .patch(bull._id)
      .set({ externalDomain: 'whpubs-thebull-otford.netlify.app' })
      .commit();
    
    console.log('✅ Successfully updated The Bull external domain');
    console.log(`🌐 New domain: whpubs-thebull-otford.netlify.app`);
    
    return result;
  } catch (error) {
    console.error('❌ Error updating domain:', error);
    throw error;
  }
}

fixBullDomain().catch(console.error);