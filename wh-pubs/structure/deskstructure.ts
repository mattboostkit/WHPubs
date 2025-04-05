import { StructureBuilder } from 'sanity/desk'
import { FiHome, FiFileText, FiTag, FiUser, FiGlobe } from 'react-icons/fi'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Sites')
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
        .filter(listItem => !['site'].includes(listItem.getId()))
    ])