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

async function createDevelopmentKitchenContent() {
  try {
    // Check if Development Kitchen content already exists
    const existing = await client.fetch(`*[_type == "developmentKitchen"][0]`);
    
    if (existing) {
      console.log('Development Kitchen content already exists, updating...');
    }

    // Fetch some pub references for the innovations
    const pubs = await client.fetch(`*[_type == "pub"][0..3] { _id }`);

    const developmentKitchenData = {
      _type: 'developmentKitchen',
      title: 'WH Development Kitchen',
      slug: {
        _type: 'slug',
        current: 'development-kitchen'
      },
      heroImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-placeholder-dev-kitchen-hero' // You'll need to upload this image
        },
        alt: 'WH Development Kitchen - Where innovation meets tradition'
      },
      introText: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Welcome to the WH Development Kitchen, the creative heart of our pub group. Here, our talented chefs work tirelessly to develop innovative dishes that celebrate British cuisine while embracing modern techniques and global influences.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Every dish that graces our pub menus begins its journey here, where tradition meets innovation, and local ingredients take center stage.'
            }
          ]
        }
      ],
      chefProfile: {
        name: 'Chef Marcus Thompson',
        title: 'Executive Chef & Culinary Director',
        bio: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'With over 20 years of experience in both Michelin-starred restaurants and traditional British pubs, Chef Marcus brings a unique perspective to our kitchens.'
              }
            ]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'His philosophy is simple: respect the ingredients, honor tradition, but never be afraid to innovate. Under his leadership, our Development Kitchen has become a hub of culinary creativity.'
              }
            ]
          }
        ],
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-placeholder-chef' // Placeholder
          },
          alt: 'Chef Marcus Thompson'
        }
      },
      philosophy: {
        heading: 'Our Culinary Philosophy',
        content: [
          {
            _type: 'block',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Local First, Always'
              }
            ]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'We partner with local farmers, fishermen, and producers to source the finest ingredients from across South East England. Our commitment to locality ensures freshness and supports our community.'
              }
            ]
          },
          {
            _type: 'block',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Seasonal Menus'
              }
            ]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Our menus change with the seasons, allowing us to showcase ingredients at their peak and offer our guests fresh experiences throughout the year.'
              }
            ]
          },
          {
            _type: 'block',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Heritage with a Twist'
              }
            ]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'While we honor classic British pub fare, we\'re not afraid to add contemporary touches that elevate familiar dishes to new heights.'
              }
            ]
          }
        ]
      },
      process: [
        {
          stepNumber: 1,
          title: 'Inspiration & Research',
          description: 'Every new dish begins with inspiration - whether from seasonal ingredients, customer feedback, or culinary trends. Our team researches traditional recipes and modern techniques.',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-process-1'
            },
            alt: 'Chef researching recipes'
          }
        },
        {
          stepNumber: 2,
          title: 'Development & Testing',
          description: 'In our state-of-the-art kitchen, we experiment with flavors, techniques, and presentations. Each dish undergoes multiple iterations before reaching perfection.',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-process-2'
            },
            alt: 'Chefs testing new dishes'
          }
        },
        {
          stepNumber: 3,
          title: 'Team Tasting & Feedback',
          description: 'Our entire culinary team, along with select staff members, taste and critique each new dish. This collaborative process ensures only the best make it to our menus.',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-process-3'
            },
            alt: 'Team tasting session'
          }
        },
        {
          stepNumber: 4,
          title: 'Menu Integration',
          description: 'Once perfected, new dishes are rolled out across our pubs with comprehensive training for all kitchen staff to ensure consistency and quality.',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-process-4'
            },
            alt: 'Training kitchen staff'
          }
        }
      ],
      innovations: [
        {
          dishName: 'Heritage Pork Belly with Apple & Black Pudding',
          description: 'Slow-cooked pork belly from our partner farm in Kent, served with caramelized apples, crispy black pudding crumble, and a cider reduction.',
          season: 'autumn',
          availableAt: pubs.map(pub => ({
            _type: 'reference',
            _ref: pub._id
          })),
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-dish-1'
            },
            alt: 'Heritage Pork Belly dish'
          }
        },
        {
          dishName: 'Gin-Cured Chalk Stream Trout',
          description: 'Delicate trout from Hampshire chalk streams, cured with local gin and juniper, served with beetroot, horseradish cream, and rye crisps.',
          season: 'spring',
          availableAt: pubs.slice(0, 2).map(pub => ({
            _type: 'reference',
            _ref: pub._id
          })),
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-dish-2'
            },
            alt: 'Gin-Cured Trout dish'
          }
        },
        {
          dishName: 'Wild Mushroom & Truffle Wellington',
          description: 'A vegetarian twist on the classic, featuring foraged mushrooms, English truffle, and creamy leeks wrapped in golden pastry.',
          season: 'autumn',
          availableAt: pubs.map(pub => ({
            _type: 'reference',
            _ref: pub._id
          })),
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-dish-3'
            },
            alt: 'Mushroom Wellington'
          }
        },
        {
          dishName: 'Summer Berry Eton Mess Reimagined',
          description: 'Deconstructed Eton Mess with elderflower meringue, Kent strawberries, vanilla cream, and basil oil - a modern take on a British classic.',
          season: 'summer',
          availableAt: pubs.slice(1, 3).map(pub => ({
            _type: 'reference',
            _ref: pub._id
          })),
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-dish-4'
            },
            alt: 'Summer Berry Eton Mess'
          }
        }
      ],
      gallery: [
        {
          asset: {
            _type: 'reference',
            _ref: 'image-placeholder-gallery-1'
          },
          alt: 'Development Kitchen interior',
          caption: 'Our state-of-the-art development kitchen',
          category: 'kitchen'
        },
        {
          asset: {
            _type: 'reference',
            _ref: 'image-placeholder-gallery-2'
          },
          alt: 'Fresh local ingredients',
          caption: 'Daily deliveries from local suppliers',
          category: 'ingredients'
        },
        {
          asset: {
            _type: 'reference',
            _ref: 'image-placeholder-gallery-3'
          },
          alt: 'Chef plating a dish',
          caption: 'Attention to detail in every plate',
          category: 'process'
        },
        {
          asset: {
            _type: 'reference',
            _ref: 'image-placeholder-gallery-4'
          },
          alt: 'Team collaboration',
          caption: 'Our talented culinary team at work',
          category: 'team'
        }
      ],
      suppliers: [
        {
          name: 'Downs View Farm',
          description: 'Family-run farm providing us with organic vegetables and heritage breed meats since 2018.',
          location: 'Ashford, Kent',
          website: 'https://example.com/downs-view-farm',
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-supplier-1'
            },
            alt: 'Downs View Farm logo'
          }
        },
        {
          name: 'Channel Fisheries',
          description: 'Sustainable fishing cooperative supplying fresh catch from the English Channel daily.',
          location: 'Hastings, East Sussex',
          website: 'https://example.com/channel-fisheries',
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-supplier-2'
            },
            alt: 'Channel Fisheries logo'
          }
        },
        {
          name: 'Wealden Dairy',
          description: 'Artisan dairy producing award-winning cheeses and cream from grass-fed cattle.',
          location: 'Heathfield, East Sussex',
          website: 'https://example.com/wealden-dairy',
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-supplier-3'
            },
            alt: 'Wealden Dairy logo'
          }
        },
        {
          name: 'Garden of England Growers',
          description: 'Cooperative of small-scale growers providing seasonal fruits and specialty produce.',
          location: 'Maidstone, Kent',
          website: 'https://example.com/garden-growers',
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-placeholder-supplier-4'
            },
            alt: 'Garden of England Growers logo'
          }
        }
      ],
      seasonalFocus: {
        season: 'winter',
        theme: 'Comfort & Warmth',
        description: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'This winter, we\'re focusing on hearty, warming dishes that celebrate the best of British comfort food. Think slow-cooked stews, roasted root vegetables, and indulgent puddings.'
              }
            ]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Our winter menu features game from local estates, winter vegetables from our partner farms, and warming spices that bring comfort on cold days.'
              }
            ]
          }
        ],
        featuredIngredients: ['Venison', 'Root vegetables', 'Winter cabbage', 'Game birds', 'Preserved fruits', 'Warming spices']
      },
      seo: {
        metaTitle: 'WH Development Kitchen - Culinary Innovation for Traditional Pubs',
        metaDescription: 'Discover how the WH Development Kitchen creates innovative dishes for our pub group, blending tradition with modern culinary techniques.',
        ogImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-placeholder-og'
          }
        }
      }
    };

    let result;
    if (existing) {
      // Update existing document
      result = await client
        .patch(existing._id)
        .set(developmentKitchenData)
        .commit();
      console.log('✅ Development Kitchen content updated successfully!');
    } else {
      // Create new document
      result = await client.create(developmentKitchenData);
      console.log('✅ Development Kitchen content created successfully!');
    }

    console.log('Document ID:', result._id);

  } catch (error) {
    console.error('Error creating Development Kitchen content:', error);
  }
}

// Run the script
createDevelopmentKitchenContent();