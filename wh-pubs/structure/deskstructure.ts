import { StructureBuilder } from 'sanity/desk'
import { FiHome, FiFileText, FiTag, FiUser, FiGlobe, FiCalendar, FiInfo, FiMail, FiBriefcase } from 'react-icons/fi'
import { LemonIcon, HomeIcon, CogIcon } from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content Management')
    .items([
      S.listItem()
        .title('⚙️ WH Pubs Main Site Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Main Site Settings')
            .items([
              S.listItem()
                .title('🏠 Homepage Settings')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                ),
              S.listItem()
                .title('🍴 Development Kitchen')
                .icon(LemonIcon)
                .child(
                  S.document()
                    .schemaType('developmentKitchen')
                    .documentId('developmentKitchen')
                ),
              S.divider(),
              S.listItem()
                .title('📅 Events Page')
                .icon(FiCalendar)
                .child(
                  S.document()
                    .schemaType('eventsPageSettings')
                    .documentId('eventsPageSettings')
                ),
              S.listItem()
                .title('📝 Blog Page')
                .icon(FiFileText)
                .child(
                  S.document()
                    .schemaType('blogPageSettings')
                    .documentId('blogPageSettings')
                ),
              S.listItem()
                .title('ℹ️ About Page')
                .icon(FiInfo)
                .child(
                  S.document()
                    .schemaType('aboutPageSettings')
                    .documentId('aboutPageSettings')
                ),
              S.listItem()
                .title('✉️ Contact Page')
                .icon(FiMail)
                .child(
                  S.document()
                    .schemaType('contactPageSettings')
                    .documentId('contactPageSettings')
                ),
              S.listItem()
                .title('💼 Join Our Crew Page')
                .icon(FiBriefcase)
                .child(
                  S.document()
                    .schemaType('careersPageSettings')
                    .documentId('careersPageSettings')
                ),
              S.listItem()
                .title('🎯 Things To Do Page')
                .icon(FiCalendar)
                .child(
                  S.document()
                    .schemaType('thingsToDoPageSettings')
                    .documentId('thingsToDoPageSettings')
                ),
              S.listItem()
                .title('🏠 Our Pubs Page')
                .icon(FiHome)
                .child(
                  S.document()
                    .schemaType('pubFinderPageSettings')
                    .documentId('pubFinderPageSettings')
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('🍺 Pubs')
        .child(
          S.documentTypeList('pub')
            .title('Manage Your Pubs')
            .child(pubId =>
              S.document()
                .schemaType('pub')
                .documentId(pubId)
                .views([
                  S.view.form().title('Edit'),
                ])
            )
        ),
      S.divider(),
      S.listItem()
        .title('📝 Blog Posts')
        .icon(FiFileText)
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
        .title('🍽️ Menus')
        .child(
          S.documentTypeList('menu')
            .title('All Menus')
        ),
      S.listItem()
        .title('🎯 Things To Do')
        .child(
          S.documentTypeList('thingsToDo')
            .title('All Activities')
        ),
      S.listItem()
        .title('💼 Join Our Crew')
        .child(
          S.documentTypeList('career')
            .title('Job Listings')
        ),
      S.divider(),
      ...S.documentTypeListItems()
        .filter(listItem => !['homepage', 'developmentKitchen', 'eventsPageSettings', 'blogPageSettings', 'aboutPageSettings', 'contactPageSettings', 'careersPageSettings', 'thingsToDoPageSettings', 'pubFinderPageSettings', 'pub', 'post', 'event', 'menu', 'career', 'thingsToDo'].includes(listItem.getId()))
    ])