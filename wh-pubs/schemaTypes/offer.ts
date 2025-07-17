import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export default defineType({
  name: 'offer',
  title: 'Special Offers',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Offer Title',
      type: 'string',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'details',
      title: 'Full Details',
      type: 'blockContent',
      description: 'Full details of the offer including terms and conditions',
    }),
    defineField({
      name: 'offerType',
      title: 'Offer Type',
      type: 'string',
      options: {
        list: [
          {title: 'Percentage Discount', value: 'percentage'},
          {title: 'Fixed Amount Off', value: 'fixed'},
          {title: 'Buy One Get One', value: 'bogo'},
          {title: 'Happy Hour', value: 'happyhour'},
          {title: 'Set Menu', value: 'setmenu'},
          {title: 'Early Bird', value: 'earlybird'},
          {title: 'Special Event', value: 'event'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountValue',
      title: 'Discount Value',
      type: 'string',
      description: 'e.g., "20%", "£10 off", "2 for 1"',
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'daysOfWeek',
      title: 'Valid Days',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Monday', value: 'monday'},
          {title: 'Tuesday', value: 'tuesday'},
          {title: 'Wednesday', value: 'wednesday'},
          {title: 'Thursday', value: 'thursday'},
          {title: 'Friday', value: 'friday'},
          {title: 'Saturday', value: 'saturday'},
          {title: 'Sunday', value: 'sunday'},
        ],
      },
    }),
    defineField({
      name: 'timeRestrictions',
      title: 'Time Restrictions',
      type: 'string',
      description: 'e.g., "5pm-7pm", "Lunch only"',
    }),
    defineField({
      name: 'image',
      title: 'Offer Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      initialValue: 'Book Now',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'url',
      description: 'Link for booking or more information',
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{type: 'pub'}],
      description: 'Leave empty for offers available at all pubs',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Offer',
      type: 'boolean',
      description: 'Show this offer prominently on the website',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this offer currently active?',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
      pubName: 'associatedPub.name',
      active: 'active',
    },
    prepare(selection) {
      const {title, subtitle, media, pubName, active} = selection
      return {
        title: `${title} ${!active ? '(Inactive)' : ''}`,
        subtitle: pubName ? `${pubName}: ${subtitle}` : subtitle,
        media,
      }
    },
  },
})