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

const happyHoursDescription = [
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Every Friday, 4pm - 7pm',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Join us for Happy Hours with fantastic drink offers:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '🍺 Beer - £1 off a pint, £0.50 off a half pint' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '🍷 Wines - £1 off a 175ml glass' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '🥃 Spirits - £1 off' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '\nThe perfect way to kick off your weekend!' },
    ],
  },
];

async function createHappyHoursEvent() {
  try {
    // First, fetch The Little Brown Jug reference
    console.log('Fetching The Little Brown Jug reference...');
    const pub = await client.fetch(`
      *[_type == "pub" && name == "The Little Brown Jug"][0] {
        _id,
        name,
        slug
      }
    `);

    if (!pub) {
      console.error('Could not find The Little Brown Jug pub');
      process.exit(1);
    }

    console.log('Found pub:', pub);

    // Get the next Friday date for the event
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7; // If today is Friday, get next Friday
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    nextFriday.setHours(16, 0, 0, 0); // Set to 4pm

    // Create the event
    const event = {
      _type: 'event',
      title: 'Happy Hours at The Little Brown Jug',
      slug: { current: 'happy-hours-little-brown-jug' },
      date: nextFriday.toISOString(),
      associatedPub: { _type: 'reference', _ref: pub._id },
      description: happyHoursDescription,
    };

    console.log('\nCreating Happy Hours event...');
    const result = await client.create(event);
    
    console.log(`✅ Created event: ${event.title}`);
    console.log(`   ID: ${result._id}`);
    console.log(`   Next occurrence: ${nextFriday.toLocaleDateString('en-GB')} at 4pm`);
    console.log('\n✨ Happy Hours event created successfully!');
    console.log('\nNote: This creates a single event entry. Since this is a recurring weekly event,');
    console.log('you may want to update the event description to clearly state "Every Friday"');
    console.log('or consider implementing a recurring events feature in your schema.');
    
  } catch (error) {
    console.error('Error creating event:', error);
    process.exit(1);
  }
}

// Run the script
createLittleBrownJugEvents();