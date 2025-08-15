// Script to delete past events from Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

async function deletePastEvents() {
  try {
    // Get current date in ISO format
    const now = new Date().toISOString()
    
    // Query all events that are in the past
    const pastEvents = await client.fetch(
      `*[_type == "event" && date < $now]{_id, title, date}`,
      { now }
    )
    
    if (pastEvents.length === 0) {
      console.log('No past events found to delete')
      return
    }
    
    console.log(`Found ${pastEvents.length} past events to delete:`)
    pastEvents.forEach(event => {
      console.log(`- ${event.title} (${event.date})`)
    })
    
    // Delete each past event
    for (const event of pastEvents) {
      try {
        await client.delete(event._id)
        console.log(`✓ Deleted: ${event.title}`)
      } catch (error) {
        console.error(`✗ Failed to delete ${event.title}:`, error.message)
      }
    }
    
    console.log('\n✅ Past events cleanup completed!')
    
  } catch (error) {
    console.error('Error cleaning up past events:', error)
  }
}

// Run the cleanup
deletePastEvents()