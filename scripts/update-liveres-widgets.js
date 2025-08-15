#!/usr/bin/env node

/**
 * Script to update each pub's LiveRes widget URL in Sanity CMS
 * This ensures each pub has its specific LiveRes booking widget configured
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN // Requires a token with write permissions
});

// Mapping of pub slugs to their specific LiveRes widget URLs
const pubLiveResUrls = {
  'the-little-brown-jug': 'https://events-widget.liveres.co.uk/widget.html?siteId=4c4d14e2-7bf3-4952-baea-69da60126460&stylingURL=Kl7AS',
  'the-rose-and-crown': 'https://events-widget.liveres.co.uk/widget.html?siteId=304df119-0d39-4f03-bce3-6deee8b79d90&stylingURL=Kl7AS',
  'the-cricketers-inn': 'https://events-widget.liveres.co.uk/widget.html?siteId=329d4e4f-c7ff-4ca0-ab7b-7d866ce38670&stylingURL=Kl7AS',
  'the-bull-otford': 'https://events-widget.liveres.co.uk/widget.html?siteId=cc8b210d-e765-4aa6-b10e-f3dba5a9d039&stylingURL=Kl7AS',
  'the-chaser-inn': 'https://events-widget.liveres.co.uk/widget.html?siteId=36a6d37c-eeb9-40d9-932f-f9ffdb5d630a&stylingURL=Kl7AS'
};

async function updatePubLiveResUrls() {
  try {
    console.log('🏠 Fetching all pubs from Sanity...');
    
    // Fetch all pubs
    const pubs = await client.fetch(`
      *[_type == "pub"] {
        _id,
        name,
        slug,
        liveResWidgetUrl
      }
    `);

    console.log(`📊 Found ${pubs.length} pubs in Sanity`);
    
    // First, let's see what slugs we actually have
    console.log('\n📝 Current pub slugs in Sanity:');
    pubs.forEach(pub => {
      console.log(`   - ${pub.name}: "${pub.slug.current}"`);
    });

    for (const pub of pubs) {
      const pubSlug = pub.slug.current;
      const targetUrl = pubLiveResUrls[pubSlug];

      if (targetUrl) {
        if (pub.liveResWidgetUrl !== targetUrl) {
          console.log(`🔄 Updating ${pub.name} (${pubSlug})`);
          console.log(`   Current: ${pub.liveResWidgetUrl || 'None'}`);
          console.log(`   New:     ${targetUrl}`);
          
          // Update the pub document
          await client.patch(pub._id).set({
            liveResWidgetUrl: targetUrl
          }).commit();
          
          console.log(`✅ Updated ${pub.name}`);
        } else {
          console.log(`⭐ ${pub.name} already has correct LiveRes URL`);
        }
      } else {
        console.log(`⚠️  No LiveRes URL configured for ${pub.name} (${pubSlug})`);
      }
    }

    console.log('\n🎉 LiveRes widget URLs update complete!');
    
    // Verify the updates
    console.log('\n📋 Final verification:');
    const updatedPubs = await client.fetch(`
      *[_type == "pub"] {
        name,
        slug,
        liveResWidgetUrl
      } | order(name asc)
    `);

    updatedPubs.forEach(pub => {
      const hasCorrectUrl = pubLiveResUrls[pub.slug.current] === pub.liveResWidgetUrl;
      const status = hasCorrectUrl ? '✅' : '❌';
      console.log(`${status} ${pub.name}: ${pub.liveResWidgetUrl || 'None'}`);
    });

  } catch (error) {
    console.error('❌ Error updating LiveRes URLs:', error);
    process.exit(1);
  }
}

// Run the script
updatePubLiveResUrls();