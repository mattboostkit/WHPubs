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

// Generate a unique key
function generateKey() {
  return Math.random().toString(36).substr(2, 9);
}

async function fixDevelopmentKitchenKeys() {
  try {
    // Fetch the Development Kitchen document
    const doc = await client.fetch(`*[_type == "developmentKitchen"][0]`);
    
    if (!doc) {
      console.log('No Development Kitchen document found');
      return;
    }

    console.log('Found Development Kitchen document:', doc._id);

    // Prepare the patch operations
    const patch = client.patch(doc._id);

    // Fix introText blocks
    if (doc.introText && Array.isArray(doc.introText)) {
      const fixedIntroText = doc.introText.map(block => ({
        ...block,
        _key: block._key || generateKey(),
        children: block.children?.map(child => ({
          ...child,
          _key: child._key || generateKey()
        })) || []
      }));
      patch.set({ introText: fixedIntroText });
    }

    // Fix chefProfile bio blocks
    if (doc.chefProfile?.bio && Array.isArray(doc.chefProfile.bio)) {
      const fixedBio = doc.chefProfile.bio.map(block => ({
        ...block,
        _key: block._key || generateKey(),
        children: block.children?.map(child => ({
          ...child,
          _key: child._key || generateKey()
        })) || []
      }));
      patch.set({ 'chefProfile.bio': fixedBio });
    }

    // Fix philosophy content blocks
    if (doc.philosophy?.content && Array.isArray(doc.philosophy.content)) {
      const fixedContent = doc.philosophy.content.map(block => ({
        ...block,
        _key: block._key || generateKey(),
        children: block.children?.map(child => ({
          ...child,
          _key: child._key || generateKey()
        })) || []
      }));
      patch.set({ 'philosophy.content': fixedContent });
    }

    // Fix process array
    if (doc.process && Array.isArray(doc.process)) {
      const fixedProcess = doc.process.map(item => ({
        ...item,
        _key: item._key || generateKey()
      }));
      patch.set({ process: fixedProcess });
    }

    // Fix innovations array
    if (doc.innovations && Array.isArray(doc.innovations)) {
      const fixedInnovations = doc.innovations.map(item => ({
        ...item,
        _key: item._key || generateKey(),
        availableAt: item.availableAt?.map(ref => ({
          ...ref,
          _key: ref._key || generateKey()
        })) || []
      }));
      patch.set({ innovations: fixedInnovations });
    }

    // Fix suppliers array
    if (doc.suppliers && Array.isArray(doc.suppliers)) {
      const fixedSuppliers = doc.suppliers.map(item => ({
        ...item,
        _key: item._key || generateKey()
      }));
      patch.set({ suppliers: fixedSuppliers });
    }

    // Update seasonal focus to Summer and fix keys
    if (doc.seasonalFocus) {
      const summerDescription = [
        {
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: generateKey(),
              text: 'Our summer menu celebrates the abundance of British produce at its peak. From heritage tomatoes and fresh herbs to summer berries and stone fruits, we\'re showcasing the vibrant flavours of the season.'
            }
          ]
        },
        {
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: generateKey(),
              text: 'Enjoy lighter dishes perfect for warm evenings in our beer gardens, featuring locally sourced salads, grilled meats, and refreshing desserts that capture the essence of a British summer.'
            }
          ]
        }
      ];
      
      patch.set({ 
        'seasonalFocus.season': 'Summer 2025',
        'seasonalFocus.theme': 'Fresh Summer Flavours',
        'seasonalFocus.description': summerDescription
      });
    }

    // Update featured ingredients to summer items
    const summerIngredients = [
      'Heritage Tomatoes',
      'British Strawberries',
      'Fresh Basil & Herbs',
      'Summer Courgettes',
      'English Asparagus',
      'New Potatoes'
    ];
    patch.set({ 'seasonalFocus.featuredIngredients': summerIngredients });

    // Commit the patch
    const result = await patch.commit();
    console.log('✅ Successfully fixed missing keys in Development Kitchen document');
    console.log('Document ID:', result._id);

  } catch (error) {
    console.error('Error fixing keys:', error);
  }
}

// Run the script
fixDevelopmentKitchenKeys();