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

const oktoberfestDescription = [
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Join us for an authentic Oktoberfest celebration featuring:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '🍺 Genuine German Lagers' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '🥨 Authentic German Food' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '🎵 Live Music - Oompah Band' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '🎉 Free Entry' },
    ],
  },
];

async function createOktoberfestEvents() {
  try {
    // First, fetch the pub references
    console.log('Fetching pub references...');
    const pubs = await client.fetch(`
      *[_type == "pub" && name in ["The Rose and Crown", "The Little Brown Jug", "The Cricketers Inn"]] {
        _id,
        name,
        slug
      }
    `);

    console.log('Found pubs:', pubs);

    // Create a map for easy lookup
    const pubMap = {};
    pubs.forEach(pub => {
      pubMap[pub.name] = pub._id;
    });

    // Define the events
    const events = [
      {
        title: 'Oktoberfest at The Rose and Crown',
        slug: { current: 'oktoberfest-rose-and-crown-2025' },
        date: '2025-09-26T18:00:00Z', // Starting Friday 26th Sept at 6pm
        associatedPub: { _type: 'reference', _ref: pubMap['The Rose and Crown'] },
        description: oktoberfestDescription,
      },
      {
        title: 'Oktoberfest at The Little Brown Jug',
        slug: { current: 'oktoberfest-little-brown-jug-2025' },
        date: '2025-09-19T18:00:00Z', // Starting Friday 19th Sept at 6pm
        associatedPub: { _type: 'reference', _ref: pubMap['The Little Brown Jug'] },
        description: oktoberfestDescription,
      },
      {
        title: 'Oktoberfest at The Cricketers Inn',
        slug: { current: 'oktoberfest-cricketers-inn-2025' },
        date: '2025-10-03T18:00:00Z', // Starting Friday 3rd Oct at 6pm
        associatedPub: { _type: 'reference', _ref: pubMap['The Cricketers Inn'] },
        description: oktoberfestDescription,
      },
    ];

    // Create the events
    console.log('\nCreating events...');
    for (const event of events) {
      if (!event.associatedPub._ref) {
        console.error(`Could not find pub reference for: ${event.title}`);
        continue;
      }

      const doc = {
        _type: 'event',
        ...event,
      };

      const result = await client.create(doc);
      console.log(`✅ Created event: ${event.title}`);
      console.log(`   ID: ${result._id}`);
      console.log(`   Date: ${new Date(event.date).toLocaleDateString('en-GB')}`);
    }

    console.log('\n✨ All Oktoberfest events created successfully!');
  } catch (error) {
    console.error('Error creating events:', error);
    process.exit(1);
  }
}

// Run the script
createOktoberfestEvents();