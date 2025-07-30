import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'it7wwto3',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01'
});

const myJourneyContent = {
  heading: 'My Journey with WhPubs',
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
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'What We Do'
        }
      ]
    },
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
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Quality Sourcing'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'We bulk buy to secure the best quality at the best prices. Our British pork and dry-cured bacon comes from Wicks Manor Farm in Essex, award-winning smoked salmon from "Smokin\' Brothers" in the Cotswolds, and fresh pasta from our newest partner, La Tua Pasta.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Christmas Special'
        }
      ]
    },
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
};

async function updateDevelopmentKitchen() {
  try {
    console.log('Updating Development Kitchen with My Journey content...');
    
    const result = await client
      .patch('developmentKitchen')
      .set({ myJourney: myJourneyContent })
      .commit();
    
    console.log('Successfully updated Development Kitchen with My Journey content');
    console.log('Result:', result);
  } catch (error) {
    console.error('Error updating Development Kitchen:', error);
  }
}

updateDevelopmentKitchen();