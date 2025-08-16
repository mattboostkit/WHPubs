import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export default defineType({
  name: 'supplier',
  title: 'Suppliers & Partners',
  type: 'document',
  icon: PackageIcon,
  description: 'Manage supplier and partnership information for pubs',
  fields: [
    defineField({
      name: 'name',
      title: 'Supplier Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo/Image',
      type: 'image',
      description: 'Supplier logo or representative image (recommended: 300x200px)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the supplier logo/image',
          validation: (Rule) => Rule.required(),
        }
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Food & Produce', value: 'food'},
          {title: 'Beverages & Drinks', value: 'beverages'},
          {title: 'Local Services', value: 'services'},
          {title: 'Equipment & Supplies', value: 'equipment'},
          {title: 'Other', value: 'other'}
        ]
      },
      initialValue: 'food',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the supplier and what they provide',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the supplier is based (e.g., "Kent", "Local", "Surrey")',
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{type: 'string'}],
      description: 'What this supplier is known for (e.g., "Organic vegetables", "Craft beer", "Fresh seafood")',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Supplier website (optional)',
    }),
    defineField({
      name: 'partnershipType',
      title: 'Partnership Type',
      type: 'string',
      options: {
        list: [
          {title: 'Exclusive Partner', value: 'exclusive'},
          {title: 'Primary Supplier', value: 'primary'},
          {title: 'Regular Supplier', value: 'regular'},
          {title: 'Seasonal Partner', value: 'seasonal'}
        ]
      },
      initialValue: 'regular',
    }),
    defineField({
      name: 'associatedPubs',
      title: 'Associated Pubs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'pub' }]
        }
      ],
      description: 'Which pubs work with this supplier? Leave empty for all pubs.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Supplier',
      type: 'boolean',
      description: 'Show prominently on suppliers page',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Display order (lower numbers first)',
      initialValue: 999,
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle: subtitle ? `Category: ${subtitle}` : 'Supplier',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    }
  ]
})