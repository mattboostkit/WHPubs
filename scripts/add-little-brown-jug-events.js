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

const halfPriceBurgersDescription = [
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Every Tuesday from 4pm',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '🍔 Enjoy HALF PRICE on all our delicious burgers!',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The perfect midweek treat. Bring your friends and family for an unbeatable burger deal.',
      },
    ],
  },
];

const summerVibesDescription = [
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Every Sunday from 25th May to 13th September',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '☀️ Summer Vibes Sundays',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Join us in our beautiful beer garden for a relaxing afternoon with Ibiza Anthems setting the perfect summer mood.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '🎵 Chill out to laid-back beats while enjoying your favourite drinks in the sunshine.',
      },
    ],
  },
];

async function createLittleBrownJugEvents() {
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

    // Get the next Friday, Tuesday, and Sunday dates
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    // Calculate next Friday
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    nextFriday.setHours(16, 0, 0, 0); // Set to 4pm
    
    // Calculate next Tuesday
    const daysUntilTuesday = (2 - dayOfWeek + 7) % 7 || 7;
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilTuesday);
    nextTuesday.setHours(16, 0, 0, 0); // Set to 4pm
    
    // Calculate next Sunday (for Summer Vibes - starting May 25, 2025)
    const summerStartDate = new Date('2025-05-25');
    summerStartDate.setHours(14, 0, 0, 0); // Set to 2pm for Sunday afternoon

    // Create the events
    const events = [
      {
        _type: 'event',
        title: 'Happy Hours at The Little Brown Jug',
        slug: { current: 'happy-hours-little-brown-jug' },
        date: nextFriday.toISOString(),
        associatedPub: { _type: 'reference', _ref: pub._id },
        description: happyHoursDescription,
      },
      {
        _type: 'event',
        title: 'Half Price Burgers at The Little Brown Jug',
        slug: { current: 'half-price-burgers-little-brown-jug' },
        date: nextTuesday.toISOString(),
        associatedPub: { _type: 'reference', _ref: pub._id },
        description: halfPriceBurgersDescription,
      },
      {
        _type: 'event',
        title: 'Summer Vibes Sundays at The Little Brown Jug',
        slug: { current: 'summer-vibes-sundays-little-brown-jug' },
        date: summerStartDate.toISOString(),
        associatedPub: { _type: 'reference', _ref: pub._id },
        description: summerVibesDescription,
        locationOverride: 'Beer Garden',
      },
    ];

    console.log('\nCreating events...');
    for (const event of events) {
      const result = await client.create(event);
      console.log(`✅ Created event: ${event.title}`);
      console.log(`   ID: ${result._id}`);
      const eventDate = new Date(event.date);
      console.log(`   Date: ${eventDate.toLocaleDateString('en-GB')} at ${eventDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`);
    }
    
    console.log('\n✨ All events created successfully!');
    console.log('\nNote: These create single event entries. Since these are recurring events,');
    console.log('the descriptions clearly state their recurring nature.');
    console.log('Consider implementing a recurring events feature in your schema for better management.');
    
  } catch (error) {
    console.error('Error creating events:', error);
    process.exit(1);
  }
}

// Run the script
createLittleBrownJugEvents();