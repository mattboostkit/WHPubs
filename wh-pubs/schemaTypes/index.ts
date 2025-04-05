import { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import site from './site'
import pub from './pub'
import menu from './menu'

export const schemaTypes = [post, author, category, site, pub, menu, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, site, pub, menu, blockContent],
}