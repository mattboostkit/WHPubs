import {defineField, defineType} from 'sanity'
import {TokenIcon} from '@sanity/icons'

export default defineType({
  name: 'giftCard',
  title: 'Gift Cards',
  type: 'document',
  icon: TokenIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Gift Cards',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Give the Gift of Great Times',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Perfect for any occasion - birthdays, celebrations, or just because',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
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
      name: 'introText',
      title: 'Introduction Text',
      type: 'blockContent',
      description: 'Main description of the gift card program',
    }),
    defineField({
      name: 'denominations',
      title: 'Available Denominations',
      type: 'array',
      of: [{type: 'number'}],
      initialValue: [25, 50, 75, 100, 150, 200],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'features',
      title: 'Gift Card Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Gift', value: 'gift'},
                  {title: 'Calendar', value: 'calendar'},
                  {title: 'Heart', value: 'heart'},
                  {title: 'Star', value: 'star'},
                  {title: 'Check', value: 'check'},
                  {title: 'Clock', value: 'clock'},
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'howItWorks',
      title: 'How It Works',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'termsAndConditions',
      title: 'Terms and Conditions',
      type: 'blockContent',
      description: 'Full terms and conditions for gift cards',
    }),
    defineField({
      name: 'purchaseUrl',
      title: 'Purchase URL',
      type: 'url',
      description: 'External link to gift card purchase system',
    }),
    defineField({
      name: 'purchaseButtonText',
      title: 'Purchase Button Text',
      type: 'string',
      initialValue: 'Buy Gift Cards',
    }),
    defineField({
      name: 'checkBalanceUrl',
      title: 'Check Balance URL',
      type: 'url',
      description: 'Link to check gift card balance',
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
  },
})