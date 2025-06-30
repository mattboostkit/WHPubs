import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'it7wwto3',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

// The iframe template - using The Little Brown Jug embed as template
const iframeTemplate = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2500.154703105503!2d0.173989!3d51.197801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df501777eaf4f9%3A0x5eae38e6d7d85e0!2sThe%20Little%20Brown%20Jug!5e0!3m2!1sen!2suk!4v1751309135631!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

async function createGoogleMapsEmbeds() {
  try {
    // First, fetch all pubs
    const pubs = await client.fetch(`*[_type == "pub"] { _id, name, slug }`);
    
    console.log(`Found ${pubs.length} pubs`);

    // Create a Google Maps embed for each pub
    for (const pub of pubs) {
      // Check if embed already exists for this pub
      const existingEmbed = await client.fetch(
        `*[_type == "googleMapEmbed" && pub._ref == $pubId][0]`,
        { pubId: pub._id }
      );

      if (existingEmbed) {
        console.log(`Map embed already exists for ${pub.name}, skipping...`);
        continue;
      }

      // Create the embed document
      const embedDoc = {
        _type: 'googleMapEmbed',
        pub: {
          _type: 'reference',
          _ref: pub._id
        },
        iframe: iframeTemplate
      };

      const result = await client.create(embedDoc);
      console.log(`Created map embed for ${pub.name}`);

      // Update the pub to reference this embed
      await client
        .patch(pub._id)
        .set({
          googleMapEmbed: {
            _type: 'reference',
            _ref: result._id
          }
        })
        .commit();

      console.log(`Updated ${pub.name} with map embed reference`);
    }

    console.log('✅ All Google Maps embeds created successfully!');
  } catch (error) {
    console.error('Error creating Google Maps embeds:', error);
  }
}

// Run the script
createGoogleMapsEmbeds();