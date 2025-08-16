import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export default defineType({
  name: 'amenity',
  title: 'Pub Amenities',
  type: 'document',
  icon: StarIcon,
  description: 'Manage available amenities that can be assigned to pubs',
  fields: [
    defineField({
      name: 'name',
      title: 'Amenity Name',
      type: 'string',
      description: 'Display name for this amenity (e.g., "Dog Friendly", "Free Wi-Fi")',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of what this amenity includes',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon identifier for this amenity',
      options: {
        list: [
          // Accessibility & Family
          {title: 'Wheelchair Access', value: 'accessibility'},
          {title: 'Family Friendly', value: 'users'},
          {title: 'Baby Changing', value: 'baby'},
          
          // Pet & Outdoor
          {title: 'Dog Friendly', value: 'heart'},
          {title: 'Beer Garden', value: 'treePine'},
          {title: 'Outdoor Seating', value: 'sun'},
          
          // Dining & Food
          {title: 'Food Service', value: 'utensilsCrossed'},
          {title: 'Sunday Roast', value: 'chefHat'},
          {title: 'Vegetarian Options', value: 'leaf'},
          
          // Entertainment
          {title: 'Live Music', value: 'music'},
          {title: 'Sports TV', value: 'tv'},
          {title: 'Pool Table', value: 'gamepad2'},
          {title: 'Dart Board', value: 'target'},
          
          // Services & Facilities
          {title: 'Free Wi-Fi', value: 'wifi'},
          {title: 'Car Park', value: 'car'},
          {title: 'Function Room', value: 'users'},
          {title: 'Credit Cards', value: 'creditCard'},
          {title: 'Cash Only', value: 'coins'},
          
          // Special Features
          {title: 'Real Ale', value: 'beer'},
          {title: 'Craft Beer', value: 'glass'},
          {title: 'Wine Selection', value: 'wine'},
          {title: 'Cocktails', value: 'martini'},
          {title: 'Private Dining', value: 'door'},
          {title: 'Tiki Hut', value: 'palmTree'},
          
          // Transport & Location
          {title: 'Bus Route', value: 'bus'},
          {title: 'Walking Trails', value: 'footprints'},
          {title: 'River/Water View', value: 'waves'},
          
          // Smoking
          {title: 'Smoking Area', value: 'cigarette'},
          {title: 'No Smoking', value: 'noSmoking'}
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Group amenities by category for better organization',
      options: {
        list: [
          {title: 'Accessibility & Family', value: 'accessibility'},
          {title: 'Pet & Outdoor', value: 'outdoor'},
          {title: 'Dining & Food', value: 'dining'},
          {title: 'Entertainment', value: 'entertainment'},
          {title: 'Services & Facilities', value: 'services'},
          {title: 'Drinks & Bar', value: 'drinks'},
          {title: 'Special Features', value: 'special'},
          {title: 'Transport & Location', value: 'location'}
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isStandard',
      title: 'Standard Amenity',
      type: 'boolean',
      description: 'Is this a standard amenity available at all pubs? (e.g., Sunday Roast, Dog Friendly)',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this amenity appears (lower numbers first)',
      validation: (Rule) => Rule.integer().min(1),
      initialValue: 999,
    }),
    defineField({
      name: 'showOnCards',
      title: 'Show on Pub Cards',
      type: 'boolean',
      description: 'Show this amenity on pub cards/listings',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Amenity',
      type: 'boolean',
      description: 'Highlight this amenity prominently',
      initialValue: false,
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'text',
      rows: 2,
      description: 'Optional extra details about this amenity',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      description: 'description',
    },
    prepare(selection) {
      const {title, subtitle, description} = selection
      return {
        title,
        subtitle: `${subtitle} - ${description?.substring(0, 50)}...`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [
        {field: 'displayOrder', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'displayOrder', direction: 'asc'}
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    }
  ]
})