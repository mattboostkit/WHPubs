const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_TOKEN // Optional, only if you need write access
})

async function initSingletons() {
  const singletons = [
    { _id: 'homepage', _type: 'homepage', title: 'Homepage Settings' },
    { _id: 'developmentKitchen', _type: 'developmentKitchen', title: 'Development Kitchen' },
    { _id: 'eventsPageSettings', _type: 'eventsPageSettings', title: 'Events Page' },
    { _id: 'blogPageSettings', _type: 'blogPageSettings', title: 'Blog Page' },
    { _id: 'aboutPageSettings', _type: 'aboutPageSettings', title: 'About Page' },
    { _id: 'contactPageSettings', _type: 'contactPageSettings', title: 'Contact Page' },
    { _id: 'careersPageSettings', _type: 'careersPageSettings', title: 'Join Our Crew Page' },
    { _id: 'thingsToDoPageSettings', _type: 'thingsToDoPageSettings', title: 'Things To Do Page' },
    { _id: 'pubFinderPageSettings', _type: 'pubFinderPageSettings', title: 'Our Pubs Page' }
  ]

  for (const doc of singletons) {
    try {
      const existing = await client.getDocument(doc._id)
      if (!existing) {
        console.log(`Creating ${doc.title}...`)
        await client.create(doc)
        console.log(`✓ Created ${doc.title}`)
      } else {
        console.log(`✓ ${doc.title} already exists`)
      }
    } catch (error) {
      console.error(`Error with ${doc.title}:`, error.message)
    }
  }
}

initSingletons().catch(console.error)