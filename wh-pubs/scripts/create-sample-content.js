import { createClient } from '@sanity/client';
import { v4 as uuidv4 } from 'uuid';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Sample blog posts
const samplePosts = [
  {
    _type: 'post',
    _id: `post-${uuidv4()}`,
    title: 'Summer Garden Party Season is Here!',
    slug: { current: 'summer-garden-party-season' },
    excerpt: 'Join us for al fresco dining in our beautiful beer gardens. Perfect for those long summer evenings with friends and family.',
    author: 'Sarah Johnson',
    authorTitle: 'Events Manager',
    publishedAt: new Date('2024-06-15').toISOString(),
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-1'
      }
    },
    imageAlt: 'Beautiful pub garden with fairy lights and outdoor seating',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Summer is finally here, and our beer gardens are ready to welcome you! We\'ve been busy preparing our outdoor spaces to create the perfect setting for your summer gatherings.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'New this year:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Extended outdoor seating areas with comfortable furniture'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Special summer cocktail menu featuring Pimm\'s variations'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• BBQ menu available every weekend'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Live acoustic music every Friday evening'
          }
        ]
      }
    ],
    ctaTitle: 'Book Your Table',
    ctaDescription: 'Reserve your spot in our beer garden today',
    ctaButton: 'Book Now'
  },
  {
    _type: 'post',
    _id: `post-${uuidv4()}`,
    title: 'Introducing Our New Head Chef',
    slug: { current: 'new-head-chef-announcement' },
    excerpt: 'We\'re delighted to welcome Chef Michael Thompson to the WH Pubs family. Get to know our culinary maestro and his exciting vision for our menus.',
    author: 'James Wilson',
    authorTitle: 'General Manager',
    publishedAt: new Date('2024-05-20').toISOString(),
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-2'
      }
    },
    imageAlt: 'Chef Michael Thompson in the kitchen',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We\'re thrilled to announce that Chef Michael Thompson has joined WH Pubs as our new Head of Culinary Development. With over 15 years of experience in gastropubs and fine dining, Michael brings a wealth of expertise and passion to our kitchens.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Michael\'s philosophy perfectly aligns with our values: celebrating local produce, maintaining traditional techniques while embracing innovation, and creating memorable dining experiences for every guest.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '"I\'m excited to work with such fantastic local suppliers and to showcase the incredible produce we have in the South East," says Michael. "My goal is to create menus that honor pub classics while introducing seasonal dishes that surprise and delight."'
          }
        ]
      }
    ],
    ctaTitle: 'Try Our New Menu',
    ctaDescription: 'Experience Chef Michael\'s creations',
    ctaButton: 'View Menu'
  },
  {
    _type: 'post',
    _id: `post-${uuidv4()}`,
    title: 'Wine Tasting Evenings Return This Autumn',
    slug: { current: 'wine-tasting-evenings-autumn-2024' },
    excerpt: 'Our popular wine tasting evenings are back! Join our sommelier for an journey through carefully selected wines paired with seasonal dishes.',
    author: 'Emma Richards',
    authorTitle: 'Wine Specialist',
    publishedAt: new Date('2024-08-10').toISOString(),
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-3'
      }
    },
    imageAlt: 'Wine glasses and cheese board arrangement',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'By popular demand, our wine tasting evenings return this September! Join us for an educational and enjoyable journey through carefully curated wine selections, each perfectly paired with dishes from our seasonal menu.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This autumn, we\'ll be exploring:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• September: Wines of the Loire Valley'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• October: Italian Harvest Celebration'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• November: English Sparkling Wine Special'
          }
        ]
      }
    ],
    ctaTitle: 'Book Your Spot',
    ctaDescription: 'Limited spaces available',
    ctaButton: 'Reserve Now'
  },
  {
    _type: 'post',
    _id: `post-${uuidv4()}`,
    title: 'Supporting Our Local Heroes',
    slug: { current: 'supporting-local-heroes-charity-initiative' },
    excerpt: 'This month, we\'re proud to launch our Local Heroes initiative, supporting emergency service workers with special discounts and fundraising events.',
    author: 'David Clarke',
    authorTitle: 'Operations Director',
    publishedAt: new Date('2024-07-01').toISOString(),
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-4'
      }
    },
    imageAlt: 'Community gathering at pub with local heroes banner',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'At WH Pubs, we believe in giving back to those who give so much to our communities. That\'s why we\'re launching our Local Heroes initiative to support emergency service workers across the South East.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Throughout July and August, all emergency service workers will receive 20% off food when dining with us. Simply show your service ID to receive your discount.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We\'re also hosting special fundraising quiz nights at each of our pubs, with all proceeds going to local emergency service charities.'
          }
        ]
      }
    ],
    ctaTitle: 'Learn More',
    ctaDescription: 'Find out how you can support',
    ctaButton: 'Get Involved'
  }
];

// Sample events
const sampleEvents = [
  {
    _type: 'event',
    _id: `event-${uuidv4()}`,
    title: 'Summer Jazz in the Garden',
    slug: { current: 'summer-jazz-garden-2024' },
    date: new Date('2024-07-20T19:00:00').toISOString(),
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Join us for an enchanting evening of smooth jazz in our beautiful beer garden. The acclaimed Blue Note Quartet will be performing classic jazz standards and contemporary favorites.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Enjoy our special tapas menu and signature cocktails while you relax to the sounds of summer. Booking essential as spaces are limited.'
          }
        ]
      }
    ],
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-event-1'
      },
      alt: 'Jazz band performing in pub garden'
    },
    bookingUrl: 'https://booking.example.com/jazz-night',
    locationOverride: 'The Bull - Beer Garden'
  },
  {
    _type: 'event',
    _id: `event-${uuidv4()}`,
    title: 'Charity Quiz Night',
    slug: { current: 'charity-quiz-august-2024' },
    date: new Date('2024-08-15T19:30:00').toISOString(),
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Test your knowledge at our monthly charity quiz night! Teams of up to 6 people compete for glory and great prizes, with all entry fees going to local charities.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '£5 per person entry fee. Includes a complimentary drink on arrival. Food available throughout the evening.'
          }
        ]
      }
    ],
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-event-2'
      },
      alt: 'Quiz night at the pub'
    },
    bookingUrl: 'https://booking.example.com/quiz-night'
  },
  {
    _type: 'event',
    _id: `event-${uuidv4()}`,
    title: 'Oktoberfest Celebration',
    slug: { current: 'oktoberfest-2024' },
    date: new Date('2024-10-05T12:00:00').toISOString(),
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Experience the magic of Munich right here in Kent! Our Oktoberfest celebration features authentic German beers, traditional Bavarian food, and live oompah band entertainment.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Don your lederhosen and dirndls for our best dressed competition. Steins, sausages, and singing guaranteed!'
          }
        ]
      }
    ],
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-event-3'
      },
      alt: 'Oktoberfest celebration with beer steins'
    }
  }
];

// Sample careers
const sampleCareers = [
  {
    _type: 'career',
    _id: `career-${uuidv4()}`,
    position: 'Assistant Manager - The Bull',
    location: 'Shipbourne, Kent',
    roleRequirements: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We\'re looking for an enthusiastic Assistant Manager to join our team at The Bull. This is an excellent opportunity for someone looking to develop their career in hospitality management.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Key Responsibilities:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Supporting the General Manager in daily operations'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Leading and motivating team members'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Ensuring exceptional customer service standards'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Managing rotas and staff scheduling'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Requirements: 2+ years supervisory experience in hospitality, excellent communication skills, passion for great service.'
          }
        ]
      }
    ],
    salary: '£28,000 - £32,000 per annum + benefits',
    applyUrl: 'https://careers.whpubs.com/assistant-manager-bull'
  },
  {
    _type: 'career',
    _id: `career-${uuidv4()}`,
    position: 'Chef de Partie',
    location: 'Multiple Locations',
    roleRequirements: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Join our talented kitchen teams as a Chef de Partie. Work alongside our Head Chefs to create exceptional dishes using the finest local ingredients.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We offer:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Competitive salary and tips'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Career development opportunities'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Staff meals and discounts'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '• Work-life balance with fair rotas'
          }
        ]
      }
    ],
    salary: '£26,000 - £30,000 depending on experience',
    applyUrl: 'https://careers.whpubs.com/chef-de-partie'
  },
  {
    _type: 'career',
    _id: `career-${uuidv4()}`,
    position: 'Bar Staff - Part Time',
    location: 'The Rose and Crown, Sevenoaks',
    roleRequirements: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Perfect for students or those seeking flexible hours. Join our friendly bar team at The Rose and Crown.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'No experience necessary - full training provided. Must be 18+ and available for weekend shifts.'
          }
        ]
      }
    ],
    salary: '£11.50 per hour + tips',
    applyUrl: 'https://careers.whpubs.com/bar-staff-rose-crown'
  }
];

// Sample menus
const sampleMenus = [
  {
    _type: 'menu',
    _id: `menu-${uuidv4()}`,
    title: 'Summer Menu 2024',
    slug: { current: 'summer-menu-2024' },
    associatedPub: { _ref: 'the-bull' }, // This would need to match an actual pub ID
    menuContent: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Starters' }]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Pan-seared Scallops - ', marks: ['strong'] },
          { _type: 'span', text: 'With cauliflower purée and crispy pancetta £12.50' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Heritage Tomato Salad - ', marks: ['strong'] },
          { _type: 'span', text: 'With burrata, basil oil, and aged balsamic £9.50' }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Mains' }]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Roasted Lamb Rump - ', marks: ['strong'] },
          { _type: 'span', text: 'With crushed new potatoes, seasonal vegetables, and rosemary jus £24.50' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Pan-fried Sea Bass - ', marks: ['strong'] },
          { _type: 'span', text: 'With saffron risotto and charred asparagus £22.50' }
        ]
      }
    ]
  },
  {
    _type: 'menu',
    _id: `menu-${uuidv4()}`,
    title: 'Sunday Roast Menu',
    slug: { current: 'sunday-roast-menu' },
    menuContent: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Traditional Sunday Roasts' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'All roasts served with Yorkshire pudding, roast potatoes, seasonal vegetables, and gravy' }]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Roast Sirloin of Beef - ', marks: ['strong'] },
          { _type: 'span', text: '£18.50' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Roast Chicken Supreme - ', marks: ['strong'] },
          { _type: 'span', text: '£16.50' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Roast Pork Belly - ', marks: ['strong'] },
          { _type: 'span', text: 'With crackling and apple sauce £17.50' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Vegetarian Wellington - ', marks: ['strong'] },
          { _type: 'span', text: 'With roasted vegetables and vegetarian gravy £15.50' }
        ]
      }
    ]
  }
];

// Sample Development Kitchen content
const developmentKitchenContent = {
  _type: 'developmentKitchen',
  _id: 'development-kitchen-main',
  title: 'Development Kitchen',
  slug: { current: 'development-kitchen' },
  introText: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Welcome to the creative heart of WH Pubs. Our Development Kitchen is where tradition meets innovation, where local ingredients inspire new flavors, and where every dish tells a story of British culinary excellence.'
        }
      ]
    }
  ],
  chefProfile: {
    name: 'Chef Michael Thompson',
    title: 'Head of Culinary Development',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'With over 20 years of experience in the hospitality industry, Chef Michael brings a wealth of knowledge and passion to WH Pubs. His philosophy centers on celebrating British produce while embracing global influences.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Michael trained at Le Cordon Bleu London and has worked in Michelin-starred restaurants across Europe before joining WH Pubs to lead our culinary innovation.'
          }
        ]
      }
    ]
  },
  philosophy: {
    heading: 'Our Culinary Philosophy',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We believe great food starts with great ingredients. That\'s why we work closely with local farmers, fishermen, and artisan producers to source the finest seasonal produce.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our menus evolve with the seasons, ensuring every dish showcases ingredients at their peak. From spring\'s first asparagus to autumn\'s game season, we celebrate the British culinary calendar.'
          }
        ]
      }
    ]
  },
  process: [
    {
      stepNumber: 1,
      title: 'Sourcing & Selection',
      description: 'We start by identifying the best local suppliers and seasonal ingredients available.'
    },
    {
      stepNumber: 2,
      title: 'Recipe Development',
      description: 'Our team experiments with flavors and techniques to create dishes that honor tradition while offering something new.'
    },
    {
      stepNumber: 3,
      title: 'Testing & Refinement',
      description: 'Every dish is tested multiple times, gathering feedback from our teams and select guests.'
    },
    {
      stepNumber: 4,
      title: 'Training & Launch',
      description: 'We train our pub kitchen teams to ensure consistent quality across all locations.'
    }
  ],
  seasonalFocus: {
    season: 'summer',
    theme: 'British Summer Harvest',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This summer, we\'re celebrating the abundance of British produce with dishes that showcase the vibrant flavors of the season. From fresh seafood to sun-ripened vegetables, our summer menu is a tribute to British growers and producers.'
          }
        ]
      }
    ],
    featuredIngredients: ['Heritage Tomatoes', 'Wild Sea Bass', 'New Potatoes', 'Summer Berries', 'Fresh Herbs']
  }
};

// Sample homepage data
const homepageContent = {
  _type: 'homepage',
  _id: 'homepage-settings',
  title: 'WH Pubs - Traditional British Hospitality',
  heroTitle: 'Welcome to WH Pubs',
  heroSubtitle: 'Exceptional food, craft beverages, and warm hospitality across the South East',
  heroButton1Text: 'View Our Pubs',
  heroButton1Link: '/#pubs',
  heroButton2Text: 'Book a Table',
  heroButton2Link: '/book'
};

async function createSampleContent() {
  console.log('Creating sample content...');
  
  try {
    // Create blog posts
    for (const post of samplePosts) {
      await client.createOrReplace(post);
      console.log(`Created post: ${post.title}`);
    }
    
    // Create events
    for (const event of sampleEvents) {
      await client.createOrReplace(event);
      console.log(`Created event: ${event.title}`);
    }
    
    // Create careers
    for (const career of sampleCareers) {
      await client.createOrReplace(career);
      console.log(`Created career: ${career.position}`);
    }
    
    // Create menus
    for (const menu of sampleMenus) {
      await client.createOrReplace(menu);
      console.log(`Created menu: ${menu.title}`);
    }
    
    // Create Development Kitchen content
    await client.createOrReplace(developmentKitchenContent);
    console.log('Created Development Kitchen content');
    
    // Create homepage content
    await client.createOrReplace(homepageContent);
    console.log('Created homepage settings');
    
    console.log('\nSample content created successfully!');
    console.log('\nNote: You\'ll need to upload actual images in Sanity Studio to replace the placeholder references.');
    console.log('\nIMPORTANT: The sample menus reference pub IDs that may not exist. You\'ll need to update the associatedPub references in Sanity Studio.');
    
  } catch (error) {
    console.error('Error creating sample content:', error);
  }
}

createSampleContent();