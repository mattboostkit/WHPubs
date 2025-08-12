// Direct update script for Why Choose Us sections
// This uses the existing Sanity client configuration from the project

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from project root
dotenv.config({ path: join(__dirname, '..', '.env') });

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'it7wwto3',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-10',
  token: process.env.SANITY_TOKEN // Requires write token in .env
});

const whyChooseUsContent = {
  'the-little-brown-jug': {
    reason1: { 
      title: 'TIKI HUTS', 
      description: 'Unique, Instagram-worthy dining experience' 
    },
    reason2: { 
      title: 'PLAYGROUND SMOKEHOUSE', 
      description: 'Appeals to families and BBQ enthusiasts' 
    },
    reason3: { 
      title: 'RETRACTABLE ROOF', 
      description: 'Shows weather flexibility and modern amenities' 
    }
  },
  'the-bull-otford': {
    reason1: { 
      title: 'FIREPLACES', 
      description: 'Creates cozy, intimate atmosphere' 
    },
    reason2: { 
      title: 'GARDEN', 
      description: 'Perfect for outdoor dining and drinks' 
    },
    reason3: { 
      title: 'BAR', 
      description: 'Core pub experience with character' 
    }
  },
  'the-bull': {  // Fallback for old slug
    reason1: { 
      title: 'FIREPLACES', 
      description: 'Creates cozy, intimate atmosphere' 
    },
    reason2: { 
      title: 'GARDEN', 
      description: 'Perfect for outdoor dining and drinks' 
    },
    reason3: { 
      title: 'BAR', 
      description: 'Core pub experience with character' 
    }
  },
  'the-cricketers-inn': {
    reason1: { 
      title: 'ORANGERY', 
      description: 'Elegant, distinctive dining space' 
    },
    reason2: { 
      title: 'BBQ AND OUTSIDE AREA', 
      description: 'Great for casual outdoor dining' 
    },
    reason3: { 
      title: 'BAR AREA', 
      description: 'Traditional pub atmosphere' 
    }
  },
  'the-chaser-inn': {
    reason1: { 
      title: 'THE CHURCH ROOM', 
      description: 'Intriguing, unique private/function space' 
    },
    reason2: { 
      title: 'COURTYARD', 
      description: 'Charming outdoor dining area' 
    },
    reason3: { 
      title: 'GARDEN', 
      description: 'Relaxed outdoor setting' 
    }
  },
  'the-rose-and-crown': {
    reason1: { 
      title: 'TIKI HUTS', 
      description: 'Fun, tropical dining experience' 
    },
    reason2: { 
      title: 'KIDS AREA', 
      description: 'Strong family appeal' 
    },
    reason3: { 
      title: 'PIZZA SHACK', 
      description: 'Distinctive casual food offering' 
    }
  }
};

async function updateWhyChooseUs() {
  try {
    // Check if we have a token
    if (!process.env.SANITY_TOKEN) {
      console.log('\n⚠️  No SANITY_TOKEN found in .env file');
      console.log('Please add a write token to your .env file to run this script.\n');
      console.log('Alternatively, you can manually update the content in Sanity Studio:');
      console.log('https://whpubs.sanity.studio\n');
      console.log('Here is the content to add:\n');
      
      // Display the content for manual entry
      for (const [slug, content] of Object.entries(whyChooseUsContent)) {
        if (slug === 'the-bull') continue; // Skip duplicate
        console.log(`\n${slug}:`);
        console.log(`  Reason 1: ${content.reason1.title} - ${content.reason1.description}`);
        console.log(`  Reason 2: ${content.reason2.title} - ${content.reason2.description}`);
        console.log(`  Reason 3: ${content.reason3.title} - ${content.reason3.description}`);
      }
      return;
    }

    console.log('Starting Why Choose Us updates...\n');

    // Fetch all pubs
    const pubs = await client.fetch(`*[_type == "pub"] { _id, name, "slug": slug.current }`);
    console.log(`Found ${pubs.length} pubs\n`);

    for (const pub of pubs) {
      const content = whyChooseUsContent[pub.slug];
      
      if (content) {
        console.log(`Updating ${pub.name} (${pub.slug})...`);
        
        await client
          .patch(pub._id)
          .set({ whyChooseUs: content })
          .commit();
        
        console.log(`✅ Updated ${pub.name}\n`);
      } else {
        console.log(`⚠️  No content found for ${pub.name} (${pub.slug})\n`);
      }
    }

    console.log('✨ All updates complete!');
    
  } catch (error) {
    console.error('Error updating Why Choose Us:', error);
    process.exit(1);
  }
}

updateWhyChooseUs();