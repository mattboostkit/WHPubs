import { StructureBuilder } from 'sanity/desk'
import { FiHome, FiFileText, FiTag, FiUser, FiGlobe } from 'react-icons/fi'
import { CutleryIcon, HomeIcon } from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(
          S.documentTypeList('homepage')
            .title('Homepage Settings')
        ),
      S.listItem()
        .title('Development Kitchen')
        .icon(CutleryIcon)
        .child(
          S.documentTypeList('developmentKitchen')
            .title('Development Kitchen')
        ),
      S.divider(),
      S.listItem()
        .title('Pubs')
        .child(
          S.documentTypeList('pub')
            .title('All Pubs')
        ),
      S.listItem()
        .title('Blog Posts')
        .icon(FiFileText)
        .child(
          S.documentTypeList('post')
            .title('All Posts')
        ),
      S.listItem()
        .title('Events')
        .child(
          S.documentTypeList('event')
            .title('All Events')
        ),
      S.listItem()
        .title('Menus')
        .child(
          S.documentTypeList('menu')
            .title('All Menus')
        ),
      S.listItem()
        .title('Careers')
        .child(
          S.documentTypeList('career')
            .title('All Careers')
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
        .filter(listItem => !['site', 'homepage', 'developmentKitchen', 'pub', 'post', 'event', 'menu', 'career'].includes(listItem.getId()))
    ])