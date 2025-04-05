import { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import site from './site'
import pub from './pub'
import menu from './menu'
import career from './career'
import homepage from './homepage'
import event from './event'

export const schemaTypes = [homepage, post, author, category, site, pub, menu, career, event, blockContent] // Added event
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, post, author, category, site, pub, menu, career, event, blockContent], // Added event
}