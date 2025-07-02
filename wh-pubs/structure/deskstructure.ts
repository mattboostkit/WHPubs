import { StructureBuilder } from 'sanity/desk'
import { FiHome, FiFileText, FiTag, FiUser, FiGlobe } from 'react-icons/fi'
import { LemonIcon, HomeIcon } from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content Management')
    .items([
      S.listItem()
        .title('⚙️ WH Pubs Main Site Settings')
        .icon(HomeIcon)
        .child(
          S.documentTypeList('homepage')
            .title('WH Pubs Main Site Settings')
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
        .title('💼 Careers')
        .child(
          S.documentTypeList('career')
            .title('Job Listings')
        ),
      S.divider(),
      S.listItem()
        .title('Sites (Legacy)')
        .icon(FiGlobe)
        .child(
          S.documentTypeList('site')
            .title('Sites')
            .child(siteId =>
              S.list()
                .title('Site Content')
                .items([
                  S.listItem()
                    .title('Site Details')
                    .icon(FiHome)
                    .child(
                      S.document()
                        .schemaType('site')
                        .documentId(siteId)
                    ),
                  S.listItem()
                    .title('Blog Posts')
                    .icon(FiFileText)
                    .child(
                      S.documentList()
                        .title('Blog Posts')
                        .filter('_type == "post" && $siteId in sites[]._ref')
                        .params({ siteId })
                    )
                ])
            )
        ),
      S.divider(),
      ...S.documentTypeListItems()
        .filter(listItem => !['site', 'homepage', 'pub', 'post', 'event', 'menu', 'career'].includes(listItem.getId()))
    ])