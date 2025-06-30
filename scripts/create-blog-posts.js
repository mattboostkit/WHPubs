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

async function createBlogPosts() {
  try {
    // Fetch pubs to associate posts with
    const pubs = await client.fetch(`*[_type == "pub"] { _id, name, slug }`);
    console.log(`Found ${pubs.length} pubs`);

    // Check if we have a "News" category, if not create it
    let newsCategory = await client.fetch(`*[_type == "category" && title == "News"][0]`);
    if (!newsCategory) {
      newsCategory = await client.create({
        _type: 'category',
        title: 'News',
        description: 'Latest news and updates'
      });
    }

    // Create a "Food & Drink" category
    let foodCategory = await client.fetch(`*[_type == "category" && title == "Food & Drink"][0]`);
    if (!foodCategory) {
      foodCategory = await client.create({
        _type: 'category',
        title: 'Food & Drink',
        description: 'Culinary updates and features'
      });
    }

    // Create an "Events" category
    let eventsCategory = await client.fetch(`*[_type == "category" && title == "Events"][0]`);
    if (!eventsCategory) {
      eventsCategory = await client.create({
        _type: 'category',
        title: 'Events',
        description: 'Upcoming events and celebrations'
      });
    }

    // Create a "Community" category
    let communityCategory = await client.fetch(`*[_type == "category" && title == "Community"][0]`);
    if (!communityCategory) {
      communityCategory = await client.create({
        _type: 'category',
        title: 'Community',
        description: 'Local community news and initiatives'
      });
    }

    const blogPosts = [
      // Hub-level posts (no pub reference)
      {
        _type: 'post',
        title: 'Welcome to the New WH Pubs Website',
        slug: { _type: 'slug', current: 'welcome-new-wh-pubs-website' },
        excerpt: 'We\'re thrilled to launch our new website, bringing together all our wonderful pubs under one digital roof. Discover what makes each location special.',
        publishedAt: new Date('2024-01-15').toISOString(),
        author: 'Sarah Mitchell',
        authorTitle: 'Marketing Director',
        categories: [{ _type: 'reference', _ref: newsCategory._id, _key: generateKey() }],
        ctaTitle: 'Explore Our Pubs',
        ctaDescription: 'Find your perfect local and discover what makes it special',
        ctaButton: 'View All Pubs',
        body: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'After months of hard work, we\'re delighted to unveil our brand new WH Pubs website. This digital home brings together all five of our cherished establishments, each with its own unique character and charm.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'What\'s New?'
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
                text: 'Our new website makes it easier than ever to explore what each pub has to offer. From menus and opening hours to upcoming events and special features, everything you need is just a click away.'
              }
            ]
          }
        ]
      },
      {
        _type: 'post',
        title: 'Introducing Our Development Kitchen',
        slug: { _type: 'slug', current: 'introducing-development-kitchen' },
        excerpt: 'Get an exclusive look behind the scenes at our new Development Kitchen, where culinary innovation meets traditional pub favorites.',
        publishedAt: new Date('2024-02-01').toISOString(),
        author: 'Chef Marcus Thompson',
        authorTitle: 'Executive Chef',
        categories: [
          { _type: 'reference', _ref: foodCategory._id, _key: generateKey() },
          { _type: 'reference', _ref: newsCategory._id, _key: generateKey() }
        ],
        body: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'We\'re excited to give you an exclusive first look at our brand new Development Kitchen, the creative heart of WH Pubs where tradition meets innovation.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Where Ideas Become Dishes'
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
                text: 'Our Development Kitchen isn\'t just a test kitchen – it\'s where our culinary team experiments, innovates, and perfects every dish before it reaches your table. From reimagining British classics to incorporating global influences, this is where the magic happens.'
              }
            ]
          }
        ]
      },

      // Pub-specific posts
      {
        _type: 'post',
        title: 'Summer Garden Party Success at The Rose and Crown',
        slug: { _type: 'slug', current: 'summer-garden-party-rose-crown' },
        pub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-rose-and-crown')?._id },
        excerpt: 'Our annual Summer Garden Party was a tremendous success! Thank you to everyone who joined us for an afternoon of sunshine, live music, and delicious BBQ.',
        publishedAt: new Date('2024-07-20').toISOString(),
        author: 'James Harrison',
        authorTitle: 'Pub Manager',
        categories: [
          { _type: 'reference', _ref: eventsCategory._id, _key: generateKey() },
          { _type: 'reference', _ref: communityCategory._id, _key: generateKey() }
        ],
        body: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'What a day! Our Summer Garden Party exceeded all expectations with over 200 guests enjoying the beautiful weather in our award-winning beer garden.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Highlights from the Day'
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
                text: 'The Riverside Jazz Quartet had everyone tapping their feet, while our chef\'s special BBQ menu featuring locally-sourced meats was a huge hit. The children\'s face painting and garden games kept our younger guests entertained all afternoon.'
              }
            ]
          }
        ]
      },
      {
        _type: 'post',
        title: 'New Autumn Menu Launch at The Cricketers Inn',
        slug: { _type: 'slug', current: 'autumn-menu-cricketers-inn' },
        pub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-cricketers-inn')?._id },
        excerpt: 'Our new autumn menu celebrates the season\'s finest ingredients with warming dishes perfect for crisp evenings. Come taste the flavors of fall!',
        publishedAt: new Date('2024-09-15').toISOString(),
        author: 'Chef Sophie Chen',
        authorTitle: 'Head Chef',
        categories: [{ _type: 'reference', _ref: foodCategory._id, _key: generateKey() }],
        ctaTitle: 'Book Your Table',
        ctaDescription: 'Reserve your spot to try our new autumn menu',
        ctaButton: 'Make a Reservation',
        body: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'As the leaves begin to turn, we\'re excited to unveil our new autumn menu, featuring the best seasonal produce from our local suppliers.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Seasonal Highlights'
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
                text: 'Our venison wellington with roasted root vegetables has already become a firm favorite, while the butternut squash risotto with sage and toasted pumpkin seeds offers a delicious vegetarian option. Don\'t miss our sticky toffee pudding with salted caramel sauce – the perfect end to an autumn meal.'
              }
            ]
          }
        ]
      },
      {
        _type: 'post',
        title: 'The Little Brown Jug Wins Best Sunday Roast Award',
        slug: { _type: 'slug', current: 'little-brown-jug-sunday-roast-award' },
        pub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-little-brown-jug')?._id },
        excerpt: 'We\'re thrilled to announce that The Little Brown Jug has been awarded "Best Sunday Roast in Kent" by the County Dining Awards 2024!',
        publishedAt: new Date('2024-08-10').toISOString(),
        author: 'Michael Thompson',
        authorTitle: 'General Manager',
        categories: [
          { _type: 'reference', _ref: newsCategory._id, _key: generateKey() },
          { _type: 'reference', _ref: foodCategory._id, _key: generateKey() }
        ],
        body: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'We are absolutely delighted to share that The Little Brown Jug has been recognized with the prestigious "Best Sunday Roast in Kent" award at this year\'s County Dining Awards.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'A Traditional Favorite'
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
                text: 'Our Sunday roast has been a cornerstone of our menu for over a decade. We source our beef from Downs View Farm, just five miles away, and our vegetables come fresh from local growers. It\'s this commitment to quality and locality that makes our roast special.'
              }
            ]
          }
        ]
      },
      {
        _type: 'post',
        title: 'Charity Quiz Night Raises £2,500 at The Bull',
        slug: { _type: 'slug', current: 'charity-quiz-night-the-bull' },
        pub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-bull')?._id },
        excerpt: 'Thanks to your incredible generosity, our monthly charity quiz night raised a record-breaking £2,500 for the local hospice.',
        publishedAt: new Date('2024-06-25').toISOString(),
        author: 'Emma Williams',
        authorTitle: 'Events Coordinator',
        categories: [
          { _type: 'reference', _ref: communityCategory._id, _key: generateKey() },
          { _type: 'reference', _ref: eventsCategory._id, _key: generateKey() }
        ],
        body: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'We are overwhelmed by the support shown at last week\'s charity quiz night. With 25 teams participating and generous donations throughout the evening, we raised an incredible £2,500 for St. Catherine\'s Hospice.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Community Spirit at Its Best'
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
                text: 'The evening was filled with laughter, friendly competition, and incredible generosity. Special thanks to our quiz master Dave Roberts, and to all the local businesses who donated prizes for our raffle.'
              }
            ]
          }
        ]
      },
      {
        _type: 'post',
        title: 'Meet Our New Head Chef at The Chaser Inn',
        slug: { _type: 'slug', current: 'new-head-chef-chaser-inn' },
        pub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-chaser-inn')?._id },
        excerpt: 'We\'re excited to welcome Chef Alessandro Rossi, who brings a wealth of experience and a passion for combining Italian flair with British pub classics.',
        publishedAt: new Date('2024-05-20').toISOString(),
        author: 'David Clarke',
        authorTitle: 'Proprietor',
        categories: [
          { _type: 'reference', _ref: newsCategory._id, _key: generateKey() },
          { _type: 'reference', _ref: foodCategory._id, _key: generateKey() }
        ],
        body: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'The Chaser Inn is delighted to introduce Chef Alessandro Rossi as our new Head Chef. With over 15 years of experience in both Italian fine dining and traditional British gastropubs, Alessandro brings a unique perspective to our kitchen.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'A Fusion of Traditions'
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
                text: 'Alessandro\'s philosophy is simple: respect traditional British pub food while adding subtle Italian influences. His wild boar ragu with pappardelle sits comfortably alongside our famous steak and kidney pie, offering something for every palate.'
              }
            ]
          }
        ]
      },
      {
        _type: 'post',
        title: 'Sustainable Brewing Partnership Announcement',
        slug: { _type: 'slug', current: 'sustainable-brewing-partnership' },
        excerpt: 'WH Pubs partners with three local microbreweries to bring you exclusive, sustainably-produced craft beers across all our locations.',
        publishedAt: new Date('2024-04-12').toISOString(),
        author: 'Tom Mitchell',
        authorTitle: 'Operations Director',
        categories: [
          { _type: 'reference', _ref: newsCategory._id, _key: generateKey() },
          { _type: 'reference', _ref: foodCategory._id, _key: generateKey() }
        ],
        body: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'In our ongoing commitment to sustainability and supporting local businesses, WH Pubs is proud to announce partnerships with three exceptional local microbreweries.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Meet Our Brewing Partners'
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
                text: 'Hopfield Brewery in Tunbridge Wells, Riverside Ales in Tonbridge, and Old Oak Brewing Company in Sevenoaks will be supplying exclusive beers to our pubs. Each brewery uses locally-sourced ingredients and sustainable brewing practices.'
              }
            ]
          }
        ]
      }
    ];

    // Create the blog posts
    for (const post of blogPosts) {
      try {
        const result = await client.create(post);
        console.log(`Created post: ${post.title}`);
      } catch (error) {
        console.error(`Error creating post "${post.title}":`, error.message);
      }
    }

    console.log('✅ Blog posts created successfully!');
  } catch (error) {
    console.error('Error creating blog posts:', error);
  }
}

// Run the script
createBlogPosts();