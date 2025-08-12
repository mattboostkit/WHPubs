import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featuredDishes',
  title: 'Featured Dishes',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Signature Dishes'
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      initialValue: 'Crafted with passion using the finest local ingredients'
    }),
    defineField({
      name: 'dishes',
      title: 'Featured Dishes',
      type: 'array',
      validation: Rule => Rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Dish Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Dish Image',
              type: 'image',
              options: {
                hotspot: true
              }
            }),
            defineField({
              name: 'tag',
              title: 'Tag (e.g., Chef\'s Special, Best Seller)',
              type: 'string'
            }),
            defineField({
              name: 'pubLocation',
              title: 'Available At',
              type: 'string',
              initialValue: 'Available at all locations'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    })
  ]
})