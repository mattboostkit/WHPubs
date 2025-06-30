import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'googleMapEmbed',
  title: 'Google Map Embed',
  type: 'document',
  fields: [
    defineField({
      name: 'pub',
      title: 'Pub',
      type: 'reference',
      to: [{ type: 'pub' }],
      validation: (Rule) => Rule.required(),
      description: 'Select the pub this embed is for.'
    }),
    defineField({
      name: 'iframe',
      title: 'Google Maps Embed Iframe',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
      description: 'Paste the full Google Maps embed iframe code here.'
    })
  ]
}); 