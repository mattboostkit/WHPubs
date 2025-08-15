import { defineType, defineField } from 'sanity';
import { Star } from 'lucide-react';

export default defineType({
  name: 'customerReview',
  title: 'Customer Review',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      options: {
        list: [
          { title: '1 Star', value: 1 },
          { title: '2 Stars', value: 2 },
          { title: '3 Stars', value: 3 },
          { title: '4 Stars', value: 4 },
          { title: '5 Stars', value: 5 }
        ]
      }
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(500),
      description: 'The main review content (10-500 characters)'
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'DD/MM/YYYY'
      }
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{ type: 'pub' }],
      description: 'Which pub this review is for (leave empty for general WH Pubs review)'
    }),
    defineField({
      name: 'verified',
      title: 'Verified Customer',
      type: 'boolean',
      description: 'Mark as verified if customer identity has been confirmed',
      initialValue: false
    }),
    defineField({
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Show this review prominently on homepage and marketing materials',
      initialValue: false
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Display this review on the website',
      initialValue: true
    }),
    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Google Reviews', value: 'google' },
          { title: 'TripAdvisor', value: 'tripadvisor' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'In Person', value: 'in-person' },
          { title: 'Other', value: 'other' }
        ]
      },
      description: 'Where this review was originally posted'
    }),
    defineField({
      name: 'customerLocation',
      title: 'Customer Location',
      type: 'string',
      description: 'Optional: Customer\'s location (e.g., "London", "Kent")'
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes about this review (not displayed publicly)'
    })
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'reviewText',
      rating: 'rating',
      pub: 'associatedPub.name',
      active: 'active'
    },
    prepare(selection) {
      const { title, subtitle, rating, pub, active } = selection;
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
      return {
        title: `${title} - ${stars}`,
        subtitle: `${pub ? `${pub}: ` : ''}${subtitle ? subtitle.slice(0, 60) : ''}${subtitle && subtitle.length > 60 ? '...' : ''}`,
        media: active ? '✅' : '❌'
      };
    }
  },
  orderings: [
    {
      title: 'Review Date, New to Old',
      name: 'reviewDateDesc',
      by: [
        { field: 'reviewDate', direction: 'desc' }
      ]
    },
    {
      title: 'Rating, High to Low',
      name: 'ratingDesc',
      by: [
        { field: 'rating', direction: 'desc' }
      ]
    },
    {
      title: 'Featured Reviews',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'rating', direction: 'desc' }
      ]
    }
  ]
});