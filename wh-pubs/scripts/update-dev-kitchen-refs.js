import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// IDs to replace
const oldId1 = '0018f66b-db31-4ac1-9898-0d9efe4d8ea8'
const oldId2 = '08a248bc-2fdc-481d-b621-25827d961d50'
const newId = 'cb4f1a9b-12ab-4047-89ee-e5b505ddd56d'

async function updateDevelopmentKitchen() {
  console.log('Updating Development Kitchen references...')
  
  try {
    // Get the current document
    const doc = await client.fetch('*[_id == "developmentKitchen"][0]')
    
    if (!doc) {
      console.log('Development Kitchen document not found')
      return
    }
    
    console.log('Found Development Kitchen document')
    
    // Update innovations array - replace references in availableAt arrays
    const updatedInnovations = doc.innovations.map(innovation => {
      if (innovation.availableAt) {
        const updatedAvailableAt = innovation.availableAt.map(ref => {
          if (ref._ref === oldId1 || ref._ref === oldId2) {
            console.log(`Updating reference from ${ref._ref} to ${newId} in innovation: ${innovation.dishName}`)
            return { ...ref, _ref: newId }
          }
          return ref
        })
        return { ...innovation, availableAt: updatedAvailableAt }
      }
      return innovation
    })
    
    // Patch the document
    const result = await client
      .patch('developmentKitchen')
      .set({ innovations: updatedInnovations })
      .commit()
    
    console.log('✅ Development Kitchen updated successfully')
    
  } catch (error) {
    console.error('❌ Error updating Development Kitchen:', error.message)
  }
}

updateDevelopmentKitchen().catch(console.error)