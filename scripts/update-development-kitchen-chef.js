import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'it7wwto3',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Chef Q&A content formatted as block content
const chefQAContent = [
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Q&A with Tony French' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '\n' }],
  },
  // Question 1
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '1) Describe your role within the team and how long have you been with W&H?', marks: ['strong'] }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Running the Production/Development kitchen. Employed since October 2020 with WHpubs Ltd.' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '\n' }],
  },
  // Question 2
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '2) What\'s the most enjoyable element of your role?', marks: ['strong'] }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'a) Being able to create food for people to enjoy' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'b) Problem solving and looking for ways to save the chefs in the pubs time' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'c) Looking for the best deals' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '\n' }],
  },
  // Question 3
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '3) Which is your current favourite dish on your menu and why?', marks: ['strong'] }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Slow Roasted Shoulder of lamb. If done well this is a great plate of food and has always been on one of my menus, also pan fried Lambs Liver crispy streaky bacon and buttery Mash.' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '\n' }],
  },
  // Question 4
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '4) If you could only recommend one wine currently in your cellar which would it be and why?', marks: ['strong'] }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'If I had a cellar it would be: St Hallett Old Block Shiraz. This wine has intense ruby colour with purple hues. A complex and elegant nose with hints of dark fruits, rich dark chocolate and cinnamon spice. A vibrant and elegant wine on the palate, it offers rich fruit notes of Satsuma and damson plums with layers of rich dark chocolate, and complex spices of cinnamon, cedar oak with hints of black pepper and nutmeg. The wine has a long and well-defined acid backbone, with a harmonious and long finish.' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '\n' }],
  },
  // Question 5
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '5) What is your must have ingredient this season?', marks: ['strong'] }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Spring Lamb' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '\n' }],
  },
  // Question 6 (Updated)
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '6) What is unique about the Development Kitchen?', marks: ['strong'] }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'This is where it all begins – every single dish that appears on our pub menus starts right here in the Development Kitchen. We meticulously test, taste, and perfect each recipe, ensuring it meets our exacting standards before it\'s rolled out across our pubs. It\'s our culinary laboratory where tradition meets innovation, and where every plate tells a story of quality and craftsmanship.' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '\n' }],
  },
  // Question 7
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '7) What is the secret to running a successful pub?', marks: ['strong'] }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Dedication, Consistency, Looking outside the box, the answer is yes what is the question.' }
    ],
  },
];

// Updated chef bio including Q&A
const updatedChefBio = [
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Tony French brings over two decades of culinary expertise to W&H Pubs, leading our Development Kitchen with passion and precision. Since joining in October 2020, Tony has been instrumental in creating the innovative dishes that define our pub menus.' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '\n' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'His approach combines traditional British pub classics with modern techniques, always focusing on quality ingredients and memorable flavours. Every dish that appears across our pubs begins its journey in Tony\'s kitchen, where it\'s refined to perfection.' }
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '\n' }],
  },
  ...chefQAContent
];

async function updateDevelopmentKitchen() {
  try {
    // First, fetch the Development Kitchen document
    console.log('Fetching Development Kitchen document...');
    const devKitchen = await client.fetch(`
      *[_type == "developmentKitchen"][0] {
        _id,
        _rev
      }
    `);

    if (!devKitchen) {
      console.error('Could not find Development Kitchen document');
      process.exit(1);
    }

    console.log('Found Development Kitchen document:', devKitchen._id);

    // Update the document
    const patch = client
      .patch(devKitchen._id)
      .set({
        'chefProfile.name': 'Tony French',
        'chefProfile.title': 'Head of Development Kitchen',
        'chefProfile.bio': updatedChefBio
      });

    const result = await patch.commit();
    
    console.log('✅ Successfully updated Development Kitchen with:');
    console.log('   - Chef name: Tony French');
    console.log('   - Chef title: Head of Development Kitchen');
    console.log('   - Added comprehensive Q&A section');
    console.log('\n✨ Development Kitchen content updated successfully!');
    
  } catch (error) {
    console.error('Error updating Development Kitchen:', error);
    process.exit(1);
  }
}

// Run the script
updateDevelopmentKitchen();