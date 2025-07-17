import { StructureBuilder } from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage Settings')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.divider(),
      ...S.documentTypeListItems()
    ])