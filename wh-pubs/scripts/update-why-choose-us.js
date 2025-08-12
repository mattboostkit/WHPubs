import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Mapping of pub slugs to their Why Choose Us content
const whyChooseUsData = {
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
  console.log('Fetching pubs from Sanity...');
  
  try {
    // Fetch all pubs
    const pubs = await client.fetch(`*[_type == "pub"]{ _id, name, slug, whyChooseUs }`);
    
    console.log(`Found ${pubs.length} pubs`);
    
    for (const pub of pubs) {
      const slugCurrent = pub.slug?.current || pub.slug;
      const whyChooseUsContent = whyChooseUsData[slugCurrent];
      
      if (whyChooseUsContent) {
        console.log(`\nUpdating ${pub.name}:`);
        console.log(`  Current whyChooseUs: ${pub.whyChooseUs ? 'exists' : 'none'}`);
        console.log(`  New content: ${whyChooseUsContent.reason1.title}, ${whyChooseUsContent.reason2.title}, ${whyChooseUsContent.reason3.title}`);
        
        // Update the pub with the new whyChooseUs content
        await client
          .patch(pub._id)
          .set({ whyChooseUs: whyChooseUsContent })
          .commit();
          
        console.log(`  ✅ Updated successfully`);
      } else {
        console.log(`\n⚠️  No Why Choose Us content found for ${pub.name} (slug: ${slugCurrent})`);
      }
    }
    
    console.log('\n✨ All pub Why Choose Us sections updated successfully!');
    
  } catch (error) {
    console.error('Error updating Why Choose Us sections:', error);
  }
}

// Run the update
updateWhyChooseUs();