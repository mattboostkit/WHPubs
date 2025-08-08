const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// IDs of duplicate Bull Pub entries to delete (keeping the most recent one)
const duplicateIds = [
  '0018f66b-db31-4ac1-9898-0d9efe4d8ea8', // Updated: 2025-08-07T17:07:04Z
  '08a248bc-2fdc-481d-b621-25827d961d50'  // Updated: 2025-08-07T17:07:03Z (oldest)
]

// Keep this one: cb4f1a9b-12ab-4047-89ee-e5b505ddd56d (Updated: 2025-08-07T17:07:05Z - most recent)

async function deleteDuplicates() {
  console.log('Starting deletion of duplicate Bull Pub entries...')
  
  for (const id of duplicateIds) {
    try {
      console.log(`Deleting document: ${id}`)
      
      // Try deleting both draft and published versions
      await client.delete(id)
      await client.delete(`drafts.${id}`)
      
      console.log(`Successfully deleted: ${id}`)
    } catch (error) {
      if (error.message.includes('not found')) {
        console.log(`Document ${id} not found (already deleted or doesn't exist)`)
      } else {
        console.error(`Error deleting ${id}:`, error.message)
      }
    }
  }
  
  // Verify remaining pubs
  console.log('\nVerifying remaining pubs...')
  const remainingPubs = await client.fetch('*[_type == "pub"]{_id, name, slug, location, _updatedAt} | order(name asc)')
  console.log('Remaining pubs:')
  remainingPubs.forEach(pub => {
    console.log(`- ${pub.name} (${pub.slug.current}) - ID: ${pub._id}`)
  })
  
  const bullPubs = remainingPubs.filter(pub => pub.name === 'The Bull Pub')
  console.log(`\nBull Pub entries remaining: ${bullPubs.length}`)
  
  if (bullPubs.length === 1) {
    console.log('✅ Success! Only one Bull Pub entry remains.')
  } else {
    console.log('❌ Multiple Bull Pub entries still exist.')
  }
}

deleteDuplicates().catch(console.error)