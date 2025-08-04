import {defineField, defineType} from 'sanity'
import {MenuSquareIcon} from 'lucide-react'

export default defineType({
  name: 'menu',
  title: 'Pub Menu',
  type: 'document',
  icon: MenuSquareIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      description: 'e.g., "Main Menu", "Drinks Menu", "Sunday Lunch"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{type: 'pub'}],
      description: 'The pub this menu belongs to.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'A unique identifier for this menu (e.g., main-menu, drinks-menu)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sections',
      title: 'Menu Sections',
      type: 'array',
      of: [{
        type: 'object',
        name: 'menuSection',
        title: 'Menu Section',
        fields: [
          defineField({
            name: 'sectionName',
            title: 'Section Name',
            type: 'string',
            description: 'e.g., "Starters", "Mains", "Desserts"',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'sectionDescription',
            title: 'Section Description',
            type: 'text',
            rows: 2,
            description: 'Optional description for this section'
          }),
          defineField({
            name: 'items',
            title: 'Menu Items',
            type: 'array',
            of: [{
              type: 'object',
              name: 'menuItem',
              title: 'Menu Item',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Item Name',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2
                }),
                defineField({
                  name: 'price',
                  title: 'Price',
                  type: 'string',
                  description: 'e.g., "£15.95" or "Market Price"'
                }),
                defineField({
                  name: 'dietary',
                  title: 'Dietary Information',
                  type: 'array',
                  of: [{type: 'string'}],
                  options: {
                    list: [
                      {title: 'Vegetarian', value: 'V'},
                      {title: 'Vegan', value: 'VG'},
                      {title: 'Gluten Free', value: 'GF'},
                      {title: 'Dairy Free', value: 'DF'},
                      {title: 'Nuts', value: 'N'},
                      {title: 'Spicy', value: 'S'}
                    ]
                  }
                }),
                defineField({
                  name: 'available',
                  title: 'Available',
                  type: 'boolean',
                  initialValue: true,
                  description: 'Toggle to temporarily hide items that are not available'
                })
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'price',
                  available: 'available'
                },
                prepare({title, subtitle, available}) {
                  return {
                    title: available === false ? `${title} (Unavailable)` : title,
                    subtitle
                  }
                }
              }
            }]
          })
        ],
        preview: {
          select: {
            title: 'sectionName',
            items: 'items'
          },
          prepare({title, items}) {
            return {
              title,
              subtitle: `${items?.length || 0} items`
            }
          }
        }
      }]
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this menu on the website'
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this menu appears (lower numbers appear first)'
    }),
    defineField({
      name: 'notes',
      title: 'Additional Notes',
      type: 'text',
      rows: 3,
      description: 'e.g., "Prices include VAT", "Service charge not included"'
    })
  ],
  preview: {
    select: {
      title: 'title',
      pubName: 'associatedPub.name',
      active: 'active'
    },
    prepare({title, pubName, active}) {
      return {
        title: `${title} (${pubName || 'No Pub Assigned'})`,
        subtitle: active === false ? 'Inactive' : 'Active'
      }
    }
  },
})