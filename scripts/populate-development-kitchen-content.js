import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN || 'sk1PHVISf0xNjFVLvY2fIetm6gTXv3iL85joYcLqRnXGN3aO0pets0Md3EzVCy8ZAZc8AKB2FG0pNzdXV6zZBj5MQNNw4A1CBhUH9IslFxc3aHOSwveeBVk5ryWFPzesC8P6O2QwtWPtQnXKyT88ejVzwDBDmwa4F7DLmajI4NFaUoWgbf7G',
  useCdn: false
});

async function populateDevelopmentKitchenContent() {
  try {
    console.log('🏪 Populating Development Kitchen Content...');

    // First, check if the document exists
    const existingDoc = await client.fetch(`
      *[_type == "developmentKitchen"][0] {
        _id,
        title
      }
    `);

    if (existingDoc) {
      console.log(`✅ Found existing Development Kitchen document: ${existingDoc.title}`);
      
      // Update the existing document
      await client.patch(existingDoc._id)
        .set({
          myJourney: {
            heading: 'My Journey with WH Pubs',
            content: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'I first met Brian in 1992 when we were both at Pubs Ltd (now Brunning and Price). After running my own pub with my wife Alison for 11 years, I joined WhPubs in 2016 as Head Roving Chef, then moved to the Development Kitchen as Sous Chef before stepping up to Head Chef.'
                  }
                ]
              },
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Our brilliant team includes Matt, our innovative Pastry Chef, and Andrea, our reliable kitchen assistant who returned part-time after having her baby in 2024—a very welcome return.'
                  }
                ]
              }
            ]
          },
          whatWeDo: {
            heading: 'What We Do',
            content: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'The Development Kitchen supports our pub chefs by producing core desserts like Sticky Toffee Pudding, Double Chocolate Brownie, and gluten-free Baked Cheesecake. We also make savoury favourites including handmade shortcrust pastry pies, Salmon Fishcakes, and Traditional Stews.'
                  }
                ]
              },
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Our burger press machine was a game-changer—we now produce all company burgers in-house, improving consistency and saving pub chefs valuable time. We also use the smoker at Little Brown Jug for chickens, beef briskets, pork ribs, and hot-smoked salmon.'
                  }
                ]
              }
            ]
          },
          qualitySourcing: {
            heading: 'Quality Sourcing',
            content: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'We bulk buy to secure the best quality at the best prices. Our British pork and dry-cured bacon comes from Wicks Manor Farm in Essex, award-winning smoked salmon from "Smokin\' Brothers" in the Cotswolds, and fresh pasta from our newest partner, La Tua Pasta.'
                  }
                ]
              }
            ]
          },
          christmasSpecial: {
            heading: 'Christmas Special',
            content: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'We\'re especially proud of our homemade Christmas Pudding, made from a recipe passed down from my Head Chef\'s mum during my training—over 100 years of history in every rich, traditional bite.'
                  }
                ]
              }
            ]
          }
        })
        .commit();

      console.log('✅ Successfully updated Development Kitchen content!');
    } else {
      console.log('❌ No Development Kitchen document found. Please create one in Sanity Studio first.');
      console.log('📝 Instructions:');
      console.log('1. Go to Sanity Studio');
      console.log('2. Navigate to "Development Kitchen"');
      console.log('3. Create a new document');
      console.log('4. Run this script again');
    }

  } catch (error) {
    console.error('❌ Error updating Development Kitchen content:', error);
  }
}

// Run the script
populateDevelopmentKitchenContent(); 