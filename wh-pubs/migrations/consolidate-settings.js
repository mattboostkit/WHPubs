// Migration script to consolidate pageSettings and developmentKitchen into homepage (Main Site Settings)
// Run this script after deploying the schema changes to transfer existing data

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN, // You'll need a write token
  useCdn: false
})

async function migrateSettings() {
  console.log('Starting migration...')
  
  try {
    // 1. Get the existing homepage document
    const homepage = await client.fetch(`*[_type == "homepage"][0]`)
    if (!homepage) {
      console.error('No homepage document found!')
      return
    }
    
    // 2. Get all pageSettings documents
    const pageSettings = await client.fetch(`*[_type == "pageSettings"]`)
    console.log(`Found ${pageSettings.length} pageSettings documents`)
    
    // 3. Get developmentKitchen document
    const devKitchen = await client.fetch(`*[_type == "developmentKitchen"][0]`)
    console.log(`Found developmentKitchen: ${devKitchen ? 'Yes' : 'No'}`)
    
    // 4. Build the update patch
    const patch = client.patch(homepage._id)
    
    // Add page hero settings
    const pageHeroSettings = {}
    pageSettings.forEach(setting => {
      const heroKey = `${setting.pageName}Hero`
      pageHeroSettings[heroKey] = {
        heroImage: setting.heroImage,
        heroTitle: setting.heroTitle,
        heroSubtitle: setting.heroSubtitle
      }
    })
    
    if (Object.keys(pageHeroSettings).length > 0) {
      patch.set({ pageHeroSettings })
    }
    
    // Add development kitchen data
    if (devKitchen) {
      patch.set({
        developmentKitchen: {
          heroImage: devKitchen.heroImage,
          introText: devKitchen.introText,
          chefProfile: devKitchen.chefProfile,
          philosophy: devKitchen.philosophy,
          gallery: devKitchen.gallery
          // Note: Some fields like process, innovations, suppliers are not included in the consolidated schema
          // You may want to add them if needed
        }
      })
    }
    
    // 5. Execute the patch
    const result = await patch.commit()
    console.log('Migration completed successfully!')
    console.log('Updated document:', result._id)
    
    // 6. Optional: Delete old documents after verifying the migration
    console.log('\\nTo complete the migration, you can delete the old documents:')
    console.log('- pageSettings documents')
    console.log('- developmentKitchen document')
    console.log('\\nRun the following commands manually after verifying the data:')
    pageSettings.forEach(doc => {
      console.log(`client.delete('${doc._id}')`)
    })
    if (devKitchen) {
      console.log(`client.delete('${devKitchen._id}')`)
    }
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run the migration
migrateSettings()