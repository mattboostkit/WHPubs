// Script to populate initial content in Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN || 'sk1PHVISf0xNjFVLvY2fIetm6gTXv3iL85joYcLqRnXGN3aO0pets0Md3EzVCy8ZAZc8AKB2FG0pNzdXV6zZBj5MQNNw4A1CBhUH9IslFxc3aHOSwveeBVk5ryWFPzesC8P6O2QwtWPtQnXKyT88ejVzwDBDmwa4F7DLmajI4NFaUoWgbf7G',
  useCdn: false
})

async function populateContent() {
  console.log('Populating content in Sanity...')
  
  try {
    // Create or update homepage document
    const homepageDoc = {
      _id: 'homepage',
      _type: 'homepage',
      title: 'WH Pubs - Traditional British Pubs',
      heroTitle: 'WH Pubs',
      heroSubtitle: 'Traditional British Pubs in South East England',
      heroButton1Text: 'View Our Pubs',
      heroButton1Link: '/#pubs',
      heroButton2Text: 'Book a Table',
      heroButton2Link: '/book'
    }
    
    try {
      await client.createOrReplace(homepageDoc)
      console.log('✓ Homepage settings created/updated')
    } catch (err) {
      console.error('Error with homepage:', err.message)
    }
    
    // Create page settings documents
    const pageSettings = [
      {
        _id: 'eventsPageSettings',
        _type: 'eventsPageSettings',
        title: 'Events',
        heroTitle: 'Upcoming Events',
        heroSubtitle: 'Join us for unforgettable experiences at WH Pubs'
      },
      {
        _id: 'blogPageSettings',
        _type: 'blogPageSettings',
        title: 'Blog',
        heroTitle: 'Latest News & Updates',
        heroSubtitle: 'Stay up to date with what\'s happening across our pubs'
      },
      {
        _id: 'aboutPageSettings',
        _type: 'aboutPageSettings',
        title: 'About',
        heroTitle: 'About WH Pubs',
        heroSubtitle: 'Established in 1985, preserving the tradition of the great British pub'
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
    
    for (const doc of pageSettings) {
      try {
        await client.createOrReplace(doc)
        console.log(`✓ ${doc.title} page settings created/updated`)
      } catch (err) {
        console.error(`Error with ${doc._id}:`, err.message)
      }
    }
    
    // Create or update development kitchen document
    const devKitchenDoc = {
      _id: 'developmentKitchen',
      _type: 'developmentKitchen',
      title: 'Development Kitchen',
      philosophy: {
        heading: 'Our Philosophy',
        content: [
          {
            _type: 'block',
            _key: 'philosophy1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'At WH Pubs, we believe in honouring tradition while embracing innovation. Our Development Kitchen is where classic British pub cuisine meets modern culinary techniques, creating dishes that are both familiar and exciting.'
              }
            ]
          }
        ]
      },
      chefProfile: {
        name: 'Executive Chef',
        title: 'Head of Culinary Development',
        bio: [
          {
            _type: 'block',
            _key: 'bio1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Leading our culinary team with over 20 years of experience in British gastropub cuisine. Passionate about sourcing local ingredients and creating memorable dining experiences.'
              }
            ]
          }
        ]
      }
    }
    
    try {
      await client.createOrReplace(devKitchenDoc)
      console.log('✓ Development Kitchen created/updated')
    } catch (err) {
      console.error('Error with development kitchen:', err.message)
    }
    
    console.log('\n✅ Content population completed!')
    console.log('\nNext steps:')
    console.log('1. Visit Sanity Studio to add hero images for each page')
    console.log('2. Add more content to Development Kitchen (chef photo, gallery, etc.)')
    console.log('3. The frontend will automatically display the content once added')
    
  } catch (error) {
    console.error('Population failed:', error)
  }
}

populateContent()