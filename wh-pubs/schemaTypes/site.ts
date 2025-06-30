import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Name',
      type: 'string',
      description: 'Name of the pub or main site',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string'
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string'
    }),
    defineField({
      name: 'isMainSite',
      title: 'Is Main Site',
      type: 'boolean',
      description: 'Check if this is the main WHPubs site',
      initialValue: false
    })
  ]
})