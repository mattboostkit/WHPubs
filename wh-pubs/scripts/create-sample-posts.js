// This script creates sample blog posts in Sanity
// Run it with: npm run create-sample-posts

import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'
import fetch from 'node-fetch'

// Initialize the Sanity client
const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // You need to create an API token in Sanity and set it as an environment variable
  useCdn: false,
})

// Sample blog posts
const posts = [
  {
    _type: 'post',
    title: 'New Summer Menu Launch',
    slug: { _type: 'slug', current: 'new-summer-menu-launch' },
    publishedAt: '2024-06-15T10:00:00Z',
    excerpt: 'Discover our new seasonal dishes featuring the finest local produce.',
    author: 'Chef James Wilson',
    authorTitle: 'Head Chef, WH Pubs Group',
    imageAlt: 'Beautifully plated seasonal dish featuring colorful local vegetables and herbs',
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: '' // Will be filled after image upload
      }
    },
    body: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: "We're excited to announce the launch of our new summer menu across all WH Pubs establishments. This season's offerings celebrate the finest local produce and traditional British flavours with a contemporary twist.",
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Seasonal Highlights',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Our new menu features an array of dishes that showcase the best of British summer produce. From garden-fresh salads to perfectly grilled meats, each dish has been carefully crafted to deliver exceptional flavour and presentation.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Kent Heritage Tomato & Burrata Salad',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Grilled Romney Marsh Lamb with Summer Vegetables',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Pan-Seared Sea Bass with Samphire',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Summer Berry Eton Mess',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Local Suppliers',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: "We're proud to work with local suppliers who share our commitment to quality and sustainability. Our vegetables come from farms within a 30-mile radius, and our meat is sourced from trusted local butchers.",
            marks: []
          }
        ],
        markDefs: []
      }
    ],
    ctaTitle: 'Book Your Table',
    ctaDescription: 'Be among the first to experience our new summer menu. Book your table today at any of our establishments.',
    ctaButton: 'Make a Reservation',
    site: {
      _type: 'reference',
      _ref: '' // Will be filled with the site ID
    }
  },
  {
    _type: 'post',
    title: 'Live Music Weekends',
    slug: { _type: 'slug', current: 'live-music-weekends' },
    publishedAt: '2024-06-10T14:00:00Z',
    excerpt: 'Join us every Friday and Saturday for live acoustic performances.',
    author: 'Emma Thompson',
    authorTitle: 'Events Manager, WH Pubs Group',
    imageAlt: 'Acoustic guitarist performing in an intimate pub setting with warm lighting',
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: '' // Will be filled after image upload
      }
    },
    body: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: "We're thrilled to announce our new Live Music Weekends program across all WH Pubs locations. Starting this month, we'll be hosting talented local musicians every Friday and Saturday evening, bringing you the best in acoustic performances in our cozy, intimate settings.",
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Featured Artists',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: "We've curated a diverse lineup of talented musicians from across the region. From folk and acoustic rock to jazz and blues, there's something for everyone to enjoy while savoring your favorite food and drinks.",
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Schedule & Reservations',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: "Performances begin at 8pm every Friday and Saturday. Due to the popularity of these events, we strongly recommend booking your table in advance to avoid disappointment. Check each pub's individual page for their specific lineup and to make reservations.",
            marks: []
          }
        ],
        markDefs: []
      }
    ],
    ctaTitle: 'Reserve Your Spot',
    ctaDescription: 'Tables for our live music events fill up quickly. Secure yours today!',
    ctaButton: 'Book Now',
    site: {
      _type: 'reference',
      _ref: '' // Will be filled with the site ID
    }
  },
  {
    _type: 'post',
    title: 'Bank Holiday Festival',
    slug: { _type: 'slug', current: 'bank-holiday-festival' },
    publishedAt: '2024-06-05T09:30:00Z',
    excerpt: 'Three days of food, drink, and entertainment across all our pubs.',
    author: 'Robert Jenkins',
    authorTitle: 'Managing Director, WH Pubs Group',
    imageAlt: 'Festive outdoor pub garden decorated for a summer celebration with bunting and fairy lights',
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: '' // Will be filled after image upload
      }
    },
    body: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: "Get ready for an unforgettable Bank Holiday weekend as WH Pubs presents our annual Summer Festival! Join us for three days of exceptional food, drink, and entertainment across all our establishments from May 27th to 29th.",
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Festival Highlights',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: "Each of our pubs will be transformed with festive decorations, extended garden seating, and special event areas. We've planned a packed schedule of activities for all ages:",
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Live music performances throughout each day',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Craft beer and cider tastings',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'BBQ and street food stalls',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Family-friendly activities and games',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Special Festival Menu',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: "Our chefs have created a special festival menu featuring summer favorites and unique creations that showcase the best of British cuisine. Pair these dishes with our selection of festival cocktails and local ales for the perfect Bank Holiday experience.",
            marks: []
          }
        ],
        markDefs: []
      }
    ],
    ctaTitle: 'Join the Celebration',
    ctaDescription: 'Don\'t miss the biggest event of the summer at WH Pubs. No tickets required - just come along and enjoy!',
    ctaButton: 'View Festival Details',
    site: {
      _type: 'reference',
      _ref: '' // Will be filled with the site ID
    }
  }
]

// Function to create posts
async function createPosts() {
  try {
    console.log('Fetching site information...')
    // Get the first site to associate posts with
    const sites = await client.fetch('*[_type == "site"][0]')
    
    if (!sites) {
      console.error('No sites found. Please create a site first.')
      return
    }

    const siteId = sites._id

    console.log(`Found site with ID: ${siteId}`)
    console.log('Creating blog posts...')

    // Create each post
    for (const post of posts) {
      // Set the site reference
      post.site._ref = siteId

      // For this example, we'll use external image URLs instead of uploading
      // In a real scenario, you'd upload the images to Sanity first
      
      // Set image references based on the post slug
      if (post.slug.current === 'new-summer-menu-launch') {
        // Create an image asset reference for the external URL
        const imageAsset = await client.assets.upload('image', 
          await fetch('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')
            .then(res => res.blob())
        )
        post.mainImage.asset._ref = imageAsset._id
      } 
      else if (post.slug.current === 'live-music-weekends') {
        const imageAsset = await client.assets.upload('image', 
          await fetch('https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070&auto=format&fit=crop')
            .then(res => res.blob())
        )
        post.mainImage.asset._ref = imageAsset._id
      }
      else if (post.slug.current === 'bank-holiday-festival') {
        const imageAsset = await client.assets.upload('image', 
          await fetch('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop')
            .then(res => res.blob())
        )
        post.mainImage.asset._ref = imageAsset._id
      }

      // Create the post
      const result = await client.create(post)
      console.log(`Created post: ${result.title} with ID: ${result._id}`)
    }

    console.log('All posts created successfully!')
  } catch (error) {
    console.error('Error creating posts:', error)
  }
}

// Run the function
createPosts()
