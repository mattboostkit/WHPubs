import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export default defineType({
  name: 'review',
  title: 'Customer Reviews',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [
          {title: '⭐ 1 Star', value: 1},
          {title: '⭐⭐ 2 Stars', value: 2},
          {title: '⭐⭐⭐ 3 Stars', value: 3},
          {title: '⭐⭐⭐⭐ 4 Stars', value: 4},
          {title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5},
        ],
      },
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: [
          {title: 'Google', value: 'google'},
          {title: 'TripAdvisor', value: 'tripadvisor'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'OpenTable', value: 'opentable'},
          {title: 'Direct', value: 'direct'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{type: 'pub'}],
      description: 'Leave empty for general WH Pubs reviews',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Show this review prominently on the website',
      initialValue: false,
    }),
    defineField({
      name: 'verified',
      title: 'Verified Review',
      type: 'boolean',
      description: 'Has this review been verified?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'reviewText',
      rating: 'rating',
      pubName: 'associatedPub.name',
    },
    prepare(selection) {
      const {title, subtitle, rating, pubName} = selection
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: `${title} - ${stars}`,
        subtitle: pubName ? `${pubName}: ${subtitle}` : subtitle,
      }
    },
  },
})