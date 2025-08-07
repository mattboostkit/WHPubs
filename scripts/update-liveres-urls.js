import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

const pubUpdates = [
  {
    slug: 'the-little-brown-jug',
    id: '08a248bc-2fdc-481d-b621-25827d961d50',
    liveResWidgetUrl: 'https://events-widget.liveres.co.uk/widget.html?siteId=4c4d14e2-7bf3-4952-baea-69da60126460&stylingURL=Kl7AS'
  },
  {
    slug: 'the-rose-and-crown',
    id: '064ee226-2e5a-4777-a5d0-ea6b59b0f2b4',
    liveResWidgetUrl: 'https://events-widget.liveres.co.uk/widget.html?siteId=304df119-0d39-4f03-bce3-6deee8b79d90&stylingURL=Kl7AS'
  },
  {
    slug: 'the-cricketers-inn',
    id: '0018f66b-db31-4ac1-9898-0d9efe4d8ea8',
    liveResWidgetUrl: 'https://events-widget.liveres.co.uk/widget.html?siteId=329d4e4f-c7ff-4ca0-ab7b-7d866ce38670&stylingURL=Kl7AS'
  },
  {
    slug: 'the-bull',
    id: 'cb4f1a9b-12ab-4047-89ee-e5b505ddd56d',
    liveResWidgetUrl: 'https://events-widget.liveres.co.uk/widget.html?siteId=cc8b210d-e765-4aa6-b10e-f3dba5a9d039&stylingURL=Kl7AS'
  },
  {
    slug: 'the-chaser-inn',
    id: '317df0e6-b219-4006-8bb9-130a92cb473f',
    liveResWidgetUrl: 'https://events-widget.liveres.co.uk/widget.html?siteId=36a6d37c-eeb9-40d9-932f-f9ffdb5d630a&stylingURL=Kl7AS'
  }
]

async function updatePubsWithLiveResUrls() {
  console.log('Starting LiveRes URL updates...')
  
  for (const pub of pubUpdates) {
    try {
      console.log(`Updating ${pub.slug}...`)
      
      const result = await client
        .patch(pub.id)
        .set({
          liveResWidgetUrl: pub.liveResWidgetUrl
        })
        .commit()
      
      console.log(`✓ Updated ${pub.slug} successfully`)
      console.log(`  LiveRes URL: ${pub.liveResWidgetUrl}`)
      
    } catch (error) {
      console.error(`✗ Error updating ${pub.slug}:`, error.message)
    }
  }
  
  console.log('\nUpdates completed!')
}

updatePubsWithLiveResUrls()