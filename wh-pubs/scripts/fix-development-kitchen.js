// Script to consolidate Development Kitchen documents
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN || 'sk1PHVISf0xNjFVLvY2fIetm6gTXv3iL85joYcLqRnXGN3aO0pets0Md3EzVCy8ZAZc8AKB2FG0pNzdXV6zZBj5MQNNw4A1CBhUH9IslFxc3aHOSwveeBVk5ryWFPzesC8P6O2QwtWPtQnXKyT88ejVzwDBDmwa4F7DLmajI4NFaUoWgbf7G',
  useCdn: false
})

async function fixDevelopmentKitchen() {
  console.log('Fixing Development Kitchen documents...')
  
  try {
    // Get the document with all the content
    const fullContent = await client.fetch(`*[_type == "developmentKitchen" && _id == "01s1TeSqDjBLOmkvE4UWUW"][0]`)
    
    if (!fullContent) {
      console.error('Could not find the Development Kitchen document with content')
      return
    }
    
    console.log('Found Development Kitchen content document')
    
    // Delete the old ID and type to prepare for create/replace
    const { _id, _type, _createdAt, _updatedAt, _rev, ...contentOnly } = fullContent
    
    // Create or replace the singleton document with the correct ID
    const updatedDoc = {
      _id: 'developmentKitchen',
      _type: 'developmentKitchen',
      ...contentOnly
    }
    
    await client.createOrReplace(updatedDoc)
    console.log('✓ Successfully updated developmentKitchen singleton document')
    
    // Delete the old document
    try {
      await client.delete('01s1TeSqDjBLOmkvE4UWUW')
      console.log('✓ Deleted old document with ID: 01s1TeSqDjBLOmkvE4UWUW')
    } catch (err) {
      console.log('Could not delete old document (may already be deleted):', err.message)
    }
    
    console.log('\n✅ Development Kitchen fix completed!')
    console.log('The content should now appear on the website.')
    
  } catch (error) {
    console.error('Fix failed:', error)
  }
}

fixDevelopmentKitchen()