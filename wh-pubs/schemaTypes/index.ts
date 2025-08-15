import { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import post from './post'
import siteSettings from './siteSettings'
import pub from './pub'
import menu from './menu'
import career from './career'
import homepage from './homepage'
import event from './event'
import googleMapEmbed from './googleMapEmbed'
import developmentKitchen from './developmentKitchen'
import thingsToDo from './thingsToDo'
import review from './review'
import offer from './offer'
import giftCard from './giftCard'
import teamMember from './teamMember'
import pubStory from './pubStory'
import loyaltyProgram from './loyaltyProgram'
// aboutContent removed - consolidated into aboutPageSettings
import pubFeatures from './pubFeatures'
import privacyPolicy from './privacyPolicy'
import featuredDishes from './featuredDishes'
import { eventsPageSettings, blogPageSettings, aboutPageSettings, contactPageSettings, careersPageSettings, thingsToDoPageSettings, pubFinderPageSettings, suppliersPageSettings, giftCardsPageSettings, bookTablePageSettings } from './pageSettings'

export const schemaTypes = [
  siteSettings,
  homepage, 
  developmentKitchen,
  thingsToDo,
  eventsPageSettings,
  blogPageSettings,
  aboutPageSettings,
  contactPageSettings,
  careersPageSettings,
  thingsToDoPageSettings,
  pubFinderPageSettings,
  suppliersPageSettings,
  giftCardsPageSettings,
  post, 
  pub, 
  menu, 
  career, 
  event,
  review,
  offer,
  giftCard,
  teamMember,
  pubStory,
  loyaltyProgram,
  pubFeatures,
  privacyPolicy,
  featuredDishes,
  blockContent, 
  googleMapEmbed
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}