import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure/deskstructure'

export default defineConfig({
  name: 'default',
  title: 'WH Pubs',

  projectId: 'it7wwto3',
  dataset: 'production',

  plugins: [
    structureTool({
      structure
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
