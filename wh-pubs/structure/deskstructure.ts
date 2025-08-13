import { StructureBuilder } from 'sanity/desk'
import { 
  FiHome, FiFileText, FiTag, FiUser, FiGlobe, FiCalendar, 
  FiInfo, FiMail, FiBriefcase, FiSettings, FiMenu, FiMapPin,
  FiGift, FiUsers, FiStar, FiPercent, FiCreditCard, FiBook,
  FiShield, FiMap
} from 'react-icons/fi'
import { LemonIcon, HomeIcon, CogIcon } from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content Management')
    .items([
      // MAIN SITE PAGES SECTION
      S.listItem()
        .title('📄 Website Pages')
        .icon(FiFileText)
        .child(
          S.list()
            .title('Website Pages')
            .items([
              S.listItem()
                .title('🏠 Homepage')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                    .title('Homepage Settings')
                ),
              S.listItem()
                .title('ℹ️ About')
                .icon(FiInfo)
                .child(
                  S.document()
                    .schemaType('aboutPageSettings')
                    .documentId('aboutPageSettings')
                    .title('About Page')
                ),
              S.listItem()
                .title('🍴 Development Kitchen')
                .icon(LemonIcon)
                .child(
                  S.document()
                    .schemaType('developmentKitchen')
                    .documentId('developmentKitchen')
                    .title('Development Kitchen')
                ),
              S.listItem()
                .title('📅 Events')
                .icon(FiCalendar)
                .child(
                  S.document()
                    .schemaType('eventsPageSettings')
                    .documentId('eventsPageSettings')
                    .title('Events Page Settings')
                ),
              S.listItem()
                .title('📝 Blog')
                .icon(FiFileText)
                .child(
                  S.document()
                    .schemaType('blogPageSettings')
                    .documentId('blogPageSettings')
                    .title('Blog Page Settings')
                ),
              S.listItem()
                .title('✉️ Contact')
                .icon(FiMail)
                .child(
                  S.document()
                    .schemaType('contactPageSettings')
                    .documentId('contactPageSettings')
                    .title('Contact Page Settings')
                ),
              S.listItem()
                .title('💼 Careers')
                .icon(FiBriefcase)
                .child(
                  S.document()
                    .schemaType('careersPageSettings')
                    .documentId('careersPageSettings')
                    .title('Careers Page Settings')
                ),
              S.listItem()
                .title('🎯 Things To Do')
                .icon(FiMapPin)
                .child(
                  S.document()
                    .schemaType('thingsToDoPageSettings')
                    .documentId('thingsToDoPageSettings')
                    .title('Things To Do Page Settings')
                ),
              S.listItem()
                .title('🏠 Our Pubs')
                .icon(FiHome)
                .child(
                  S.document()
                    .schemaType('pubFinderPageSettings')
                    .documentId('pubFinderPageSettings')
                    .title('Our Pubs Page Settings')
                ),
              S.listItem()
                .title('🛍️ Suppliers')
                .icon(FiUsers)
                .child(
                  S.document()
                    .schemaType('suppliersPageSettings')
                    .documentId('suppliersPageSettings')
                    .title('Suppliers Page Settings')
                ),
              S.listItem()
                .title('🎁 Gift Cards')
                .icon(FiGift)
                .child(
                  S.document()
                    .schemaType('giftCardsPageSettings')
                    .documentId('giftCardsPageSettings')
                    .title('Gift Cards Page Settings')
                ),
            ])
        ),

      S.divider(),

      // PUB MANAGEMENT SECTION
      S.listItem()
        .title('🍺 Pub Management')
        .icon(FiHome)
        .child(
          S.list()
            .title('Pub Management')
            .items([
              S.listItem()
                .title('🏠 All Pubs')
                .child(
                  S.documentTypeList('pub')
                    .title('Manage Pubs')
                ),
              S.listItem()
                .title('🍽️ Pub Menus')
                .child(
                  S.documentTypeList('menu')
                    .title('Manage Menus')
                ),
              S.listItem()
                .title('✨ Pub Features')
                .child(
                  S.documentTypeList('pubFeatures')
                    .title('Pub Features (Come To Us For)')
                ),
              S.listItem()
                .title('📜 Pub Stories')
                .child(
                  S.documentTypeList('pubStory')
                    .title('Pub Stories & History')
                ),
            ])
        ),

      S.divider(),

      // CONTENT SECTION
      S.listItem()
        .title('📚 Content')
        .icon(FiFileText)
        .child(
          S.list()
            .title('Content Management')
            .items([
              S.listItem()
                .title('📝 Blog Posts')
                .child(
                  S.documentTypeList('post')
                    .title('All Blog Posts')
                ),
              S.listItem()
                .title('📅 Events')
                .child(
                  S.documentTypeList('event')
                    .title('All Events')
                ),
              S.listItem()
                .title('🎯 Things To Do')
                .child(
                  S.documentTypeList('thingsToDo')
                    .title('Local Activities')
                ),
              S.listItem()
                .title('💼 Job Listings')
                .child(
                  S.documentTypeList('career')
                    .title('Career Opportunities')
                ),
              S.listItem()
                .title('👥 Team Members')
                .child(
                  S.documentTypeList('teamMember')
                    .title('Our Team')
                ),
              S.listItem()
                .title('⭐ Reviews')
                .child(
                  S.documentTypeList('review')
                    .title('Customer Reviews')
                ),
            ])
        ),

      S.divider(),

      // MARKETING & OFFERS SECTION
      S.listItem()
        .title('🎯 Marketing')
        .icon(FiPercent)
        .child(
          S.list()
            .title('Marketing & Offers')
            .items([
              S.listItem()
                .title('🎯 Special Offers')
                .child(
                  S.documentTypeList('offer')
                    .title('Special Offers')
                ),
              S.listItem()
                .title('🎁 Gift Cards')
                .child(
                  S.document()
                    .schemaType('giftCard')
                    .documentId('giftCard')
                    .title('Gift Card Settings')
                ),
              S.listItem()
                .title('🏆 Loyalty Program')
                .child(
                  S.document()
                    .schemaType('loyaltyProgram')
                    .documentId('loyaltyProgram')
                    .title('Loyalty Program')
                ),
              S.listItem()
                .title('🍽️ Featured Dishes')
                .child(
                  S.documentTypeList('featuredDishes')
                    .title('Featured Dishes')
                ),
            ])
        ),

      S.divider(),

      // SITE SETTINGS SECTION
      S.listItem()
        .title('⚙️ Site Settings')
        .icon(FiSettings)
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('🌐 General Settings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Site Settings')
                ),
              S.listItem()
                .title('🔒 Privacy Policy')
                .child(
                  S.documentTypeList('privacyPolicy')
                    .title('Privacy Policies')
                ),
              S.listItem()
                .title('🗺️ Google Maps')
                .child(
                  S.documentTypeList('googleMapEmbed')
                    .title('Map Embeds')
                ),
            ])
        ),
    ])