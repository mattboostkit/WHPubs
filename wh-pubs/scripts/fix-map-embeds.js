// Script to fix Google Map Embed references
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN || 'sk1PHVISf0xNjFVLvY2fIetm6gTXv3iL85joYcLqRnXGN3aO0pets0Md3EzVCy8ZAZc8AKB2FG0pNzdXV6zZBj5MQNNw4A1CBhUH9IslFxc3aHOSwveeBVk5ryWFPzesC8P6O2QwtWPtQnXKyT88ejVzwDBDmwa4F7DLmajI4NFaUoWgbf7G',
  useCdn: false
})

async function fixMapEmbeds() {
  console.log('Fixing Google Map Embed references...')
  
  try {
    // Get all pubs
    const pubs = await client.fetch(`*[_type == "pub"]{ _id, name, slug }`)
    console.log(`Found ${pubs.length} pubs`)
    
    // Get all map embeds with their pub references
    const mapEmbeds = await client.fetch(`*[_type == "googleMapEmbed"]{ _id, pub, iframe }`)
    console.log(`Found ${mapEmbeds.length} map embeds`)
    
    // Create a map of pub ID to map embed ID
    const pubToMapEmbed = {}
    mapEmbeds.forEach(embed => {
      if (embed.pub?._ref) {
        pubToMapEmbed[embed.pub._ref] = embed._id
      }
    })
    
    // Update each pub with its map embed reference
    for (const pub of pubs) {
      const mapEmbedId = pubToMapEmbed[pub._id]
      if (mapEmbedId) {
        try {
          await client
            .patch(pub._id)
            .set({
              googleMapEmbed: {
                _type: 'reference',
                _ref: mapEmbedId
              }
            })
            .commit()
          console.log(`✓ Updated ${pub.name} with map embed reference`)
        } catch (err) {
          console.error(`Error updating ${pub.name}:`, err.message)
        }
      } else {
        console.log(`⚠ No map embed found for ${pub.name}`)
      }
    }
    
    console.log('\n✅ Map embed references fixed!')
    
  } catch (error) {
    console.error('Fix failed:', error)
  }
}

fixMapEmbeds()