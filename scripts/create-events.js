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

// Helper to create a future date
function getFutureDate(daysFromNow) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
}

async function createEvents() {
  try {
    // Fetch pubs to associate events with
    const pubs = await client.fetch(`*[_type == "pub"] { _id, name, slug }`);
    console.log(`Found ${pubs.length} pubs`);

    const events = [
      // General WH Pubs events (no pub reference)
      {
        _type: 'event',
        title: 'WH Pubs Annual Beer Festival',
        slug: { _type: 'slug', current: 'wh-pubs-beer-festival-2024' },
        date: getFutureDate(45),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Join us for our annual celebration of craft beers! Over 50 local and regional ales, ciders, and craft beers will be available across all WH Pubs locations.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Festival Highlights'
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
                text: 'Each pub will feature unique selections from local microbreweries, live music, and special food pairings. Collect stamps from each location to win exclusive WH Pubs merchandise!'
              }
            ]
          }
        ],
        bookingUrl: 'https://example.com/beer-festival'
      },

      // The Rose and Crown events
      {
        _type: 'event',
        title: 'Jazz in the Garden',
        slug: { _type: 'slug', current: 'jazz-garden-rose-crown' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-rose-and-crown')?._id },
        date: getFutureDate(7),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Every Friday evening this summer, enjoy live jazz in our beautiful beer garden. This week featuring the acclaimed Riverside Jazz Quartet.'
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
                text: 'Free entry. BBQ available from 6pm. Book a table to guarantee your spot!'
              }
            ]
          }
        ]
      },
      {
        _type: 'event',
        title: 'Wine Tasting Evening with Wealden Vineyard',
        slug: { _type: 'slug', current: 'wine-tasting-rose-crown' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-rose-and-crown')?._id },
        date: getFutureDate(21),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Join us for an exclusive wine tasting evening featuring award-winning wines from Wealden Vineyard. Learn about English wine production while enjoying carefully paired canapés.'
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
                text: '£35 per person, includes 6 wine tastings and canapés. Limited to 30 guests.'
              }
            ]
          }
        ],
        bookingUrl: 'https://example.com/wine-tasting'
      },

      // The Cricketers Inn events
      {
        _type: 'event',
        title: 'Cricket Match Viewing & BBQ',
        slug: { _type: 'slug', current: 'cricket-match-viewing' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-cricketers-inn')?._id },
        date: getFutureDate(14),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Watch England vs Australia on our big screens while enjoying a special Ashes BBQ menu. Booking essential for the best seats!'
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
                text: 'Special drinks offers throughout the match. Fancy dress encouraged - best cricket outfit wins a £50 bar tab!'
              }
            ]
          }
        ]
      },
      {
        _type: 'event',
        title: 'Autumn Foraging Walk & Wild Food Lunch',
        slug: { _type: 'slug', current: 'foraging-walk-cricketers' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-cricketers-inn')?._id },
        date: getFutureDate(35),
        locationOverride: 'Meet at The Cricketers Inn car park',
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Join local foraging expert Tom Wildwood for a morning walk discovering edible plants and mushrooms, followed by a special wild food lunch prepared by our chef.'
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
                text: '£45 per person including guided walk, wild food lunch, and a complimentary drink. Suitable footwear essential.'
              }
            ]
          }
        ],
        bookingUrl: 'https://example.com/foraging-walk'
      },

      // The Little Brown Jug events
      {
        _type: 'event',
        title: 'Sunday Roast Masterclass',
        slug: { _type: 'slug', current: 'roast-masterclass-jug' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-little-brown-jug')?._id },
        date: getFutureDate(28),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Learn the secrets behind our award-winning Sunday roast! Our head chef will demonstrate perfect roasting techniques, Yorkshire pudding tips, and gravy mastery.'
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
                text: '£65 per person, includes demonstration, full Sunday roast lunch, recipe cards, and a glass of wine. Limited to 12 participants.'
              }
            ]
          }
        ],
        bookingUrl: 'https://example.com/roast-masterclass'
      },
      {
        _type: 'event',
        title: 'Pie & Pint Night',
        slug: { _type: 'slug', current: 'pie-pint-night-jug' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-little-brown-jug')?._id },
        date: getFutureDate(3),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Every Wednesday enjoy our selection of homemade pies with a perfectly paired pint for just £15. This week\'s special: Wild Venison & Red Wine pie with a pint of Old Oak Stout.'
              }
            ]
          }
        ]
      },

      // The Chaser Inn events
      {
        _type: 'event',
        title: 'Italian Wine & Antipasti Evening',
        slug: { _type: 'slug', current: 'italian-evening-chaser' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-chaser-inn')?._id },
        date: getFutureDate(18),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Chef Alessandro presents an evening celebrating the wines and flavors of Italy. Enjoy a selection of Italian wines paired with authentic antipasti and small plates.'
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
                text: '£40 per person for wine flight and antipasti selection. Optional pasta course available for additional £12.'
              }
            ]
          }
        ],
        bookingUrl: 'https://example.com/italian-evening'
      },
      {
        _type: 'event',
        title: 'Monthly Quiz Night',
        slug: { _type: 'slug', current: 'quiz-night-chaser' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-chaser-inn')?._id },
        date: getFutureDate(10),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Test your knowledge at our popular monthly quiz! Teams of up to 6 people. Great prizes including a £50 bar tab for the winners and a meal voucher for runners-up.'
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
                text: '£3 per person entry. Kitchen open until 9pm for quiz participants. Book a table to secure your team\'s spot!'
              }
            ]
          }
        ]
      },

      // The Bull events
      {
        _type: 'event',
        title: 'Steak Night Thursdays',
        slug: { _type: 'slug', current: 'steak-night-bull' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-bull')?._id },
        date: getFutureDate(1),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Every Thursday enjoy our premium 8oz rump steak, hand-cut chips, grilled tomato, mushrooms, and peppercorn sauce for just £16.95.'
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
                text: 'Upgrade to ribeye for £4 extra. Add a glass of house red for £3.50. Booking recommended.'
              }
            ]
          }
        ]
      },
      {
        _type: 'event',
        title: 'Classic Car Meet',
        slug: { _type: 'slug', current: 'classic-car-meet-bull' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-bull')?._id },
        date: getFutureDate(24),
        locationOverride: 'The Bull Car Park & Garden',
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Monthly gathering of classic car enthusiasts. All makes and models welcome. Enjoy breakfast rolls and coffee from 9am, with special lunch menu available.'
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
                text: 'Free entry for all. Prize for "Car of the Month" includes a meal for two. Family friendly with kids\' activities available.'
              }
            ]
          }
        ]
      },
      {
        _type: 'event',
        title: 'Charity Auction Night',
        slug: { _type: 'slug', current: 'charity-auction-bull' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-bull')?._id },
        date: getFutureDate(42),
        description: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Join us for our annual charity auction supporting the Air Ambulance. Fantastic lots including restaurant vouchers, experience days, and signed memorabilia.'
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
                text: 'Auction starts at 7:30pm. Complimentary glass of fizz on arrival. Light supper available. All proceeds to Kent Surrey Sussex Air Ambulance.'
              }
            ]
          }
        ]
      }
    ];

    // Create the events
    for (const event of events) {
      try {
        const result = await client.create(event);
        console.log(`Created event: ${event.title}`);
      } catch (error) {
        console.error(`Error creating event "${event.title}":`, error.message);
      }
    }

    console.log('✅ Events created successfully!');
  } catch (error) {
    console.error('Error creating events:', error);
  }
}

// Run the script
createEvents();