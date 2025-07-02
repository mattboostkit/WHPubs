// Script to create singleton documents for page settings and development kitchen
// Run this after deploying the schema changes

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN, // You'll need a write token
  useCdn: false
})

async function createSingletonDocuments() {
  console.log('Creating singleton documents...')
  
  try {
    // Define singleton documents to create
    const singletons = [
      {
        _id: 'homepage',
        _type: 'homepage',
        title: 'WH Pubs - Traditional British Pubs',
        heroTitle: 'WH Pubs',
        heroSubtitle: 'Traditional British Pubs in South East England'
      },
      {
        _id: 'developmentKitchen',
        _type: 'developmentKitchen',
        title: 'Development Kitchen'
      },
      {
        _id: 'eventsPageSettings',
        _type: 'eventsPageSettings',
        title: 'Events',
        heroTitle: 'Upcoming Events',
        heroSubtitle: 'Join us for unforgettable experiences'
      },
      {
        _id: 'blogPageSettings',
        _type: 'blogPageSettings',
        title: 'Blog',
        heroTitle: 'Latest News & Updates',
        heroSubtitle: 'Stay informed about what\'s happening at WH Pubs'
      },
      {
        _id: 'aboutPageSettings',
        _type: 'aboutPageSettings',
        title: 'About',
        heroTitle: 'About WH Pubs',
        heroSubtitle: 'Continuing a tradition of hospitality since 1985'
      },
      {
        _id: 'contactPageSettings',
        _type: 'contactPageSettings',
        title: 'Contact',
        heroTitle: 'Get in Touch',
        heroSubtitle: 'We\'d love to hear from you'
      },
      {
        _id: 'careersPageSettings',
        _type: 'careersPageSettings',
        title: 'Careers',
        heroTitle: 'Join Our Team',
        heroSubtitle: 'Discover exciting opportunities at WH Pubs'
      }
    ]
    
    // Create each singleton document
    for (const doc of singletons) {
      try {
        // Check if document already exists
        const existing = await client.fetch(`*[_id == "${doc._id}"][0]`)
        
        if (existing) {
          console.log(`Document ${doc._id} already exists, skipping...`)
        } else {
          // Create the document
          const result = await client.create(doc)
          console.log(`Created ${doc._type} document: ${result._id}`)
        }
      } catch (error) {
        console.error(`Error creating ${doc._id}:`, error.message)
      }
    }
    
    console.log('\\nSingleton documents creation completed!')
    console.log('\\nNote: You can now add hero images and additional content to each document in Sanity Studio.')
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run the migration
createSingletonDocuments()