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
import googleMapEmbed from './googleMapEmbed'
import developmentKitchen from './developmentKitchen'
import { eventsPageSettings, blogPageSettings, aboutPageSettings, contactPageSettings, careersPageSettings } from './pageSettings'

export const schemaTypes = [
  homepage, 
  developmentKitchen,
  eventsPageSettings,
  blogPageSettings,
  aboutPageSettings,
  contactPageSettings,
  careersPageSettings,
  post, 
  author, 
  category, 
  site, 
  pub, 
  menu, 
  career, 
  event, 
  blockContent, 
  googleMapEmbed
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}