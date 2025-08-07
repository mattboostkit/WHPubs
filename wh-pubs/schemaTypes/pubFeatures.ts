import {defineField, defineType} from 'sanity'
import {StarIcon} from 'lucide-react'

export default defineType({
  name: 'pubFeatures',
  title: 'Pub Features (Discover What\'s On Tap)',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'pub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{type: 'pub'}],
      description: 'The pub these features belong to.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Discover What\'s On Tap',
      description: 'The main heading for this section (e.g., "Discover What\'s On Tap", "Why Choose Us", "Experience the Best")',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      validation: Rule => Rule.required().min(3).max(3).error('Please add exactly 3 features'),
      of: [{
        type: 'object',
        name: 'feature',
        title: 'Feature',
        fields: [
          defineField({
            name: 'title',
            title: 'Feature Title',
            type: 'string',
            description: 'e.g., "Food & Drink", "Private Dining", "Garden"',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Brief description of this feature',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'image',
            title: 'Feature Image',
            type: 'image',
            options: {
              hotspot: true
            },
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Alternative text',
                description: 'Important for SEO and accessibility'
              }
            ],
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'orderNumber',
            title: 'Order Number',
            type: 'number',
            description: 'Display order (e.g., 01, 02, 03)',
            validation: Rule => Rule.required().min(1).max(99)
          })
        ],
        preview: {
          select: {
            title: 'title',
            media: 'image',
            order: 'orderNumber'
          },
          prepare({title, media, order}) {
            return {
              title: `${String(order).padStart(2, '0')} - ${title}`,
              media
            }
          }
        }
      }],
      description: 'Add exactly 3 features that highlight what makes this pub special'
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this section on the website'
    })
  ],
  preview: {
    select: {
      pubName: 'pub.name',
      active: 'active',
      features: 'features'
    },
    prepare({pubName, active, features}) {
      return {
        title: `${pubName || 'No Pub'} - Discover What's On Tap`,
        subtitle: `${features?.length || 0} features${active === false ? ' (Inactive)' : ''}`
      }
    }
  }
})