import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export default defineType({
  name: 'loyaltyProgram',
  title: 'Loyalty Program',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      initialValue: 'WH Pubs Rewards',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Earn points, enjoy rewards',
      validation: (Rule) => Rule.required(),
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
      name: 'description',
      title: 'Program Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
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
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Sign Up', value: 'signup'},
                  {title: 'Earn', value: 'earn'},
                  {title: 'Redeem', value: 'redeem'},
                  {title: 'Enjoy', value: 'enjoy'},
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tiers',
      title: 'Membership Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Tier Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'pointsRequired',
              title: 'Points Required',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'color',
              title: 'Tier Color',
              type: 'string',
              description: 'Hex color code (e.g., #B79C64)',
            },
            {
              name: 'benefits',
              title: 'Benefits',
              type: 'array',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'icon',
              title: 'Tier Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'earningRules',
      title: 'Earning Rules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'action',
              title: 'Action',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'points',
              title: 'Points Earned',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "1 point per £1 spent"',
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  {title: 'Dining', value: 'dining'},
                  {title: 'Drinks', value: 'drinks'},
                  {title: 'Events', value: 'events'},
                  {title: 'Special', value: 'special'},
                  {title: 'Bonus', value: 'bonus'},
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'rewards',
      title: 'Available Rewards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Reward Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'pointsCost',
              title: 'Points Cost',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  {title: 'Food & Drink', value: 'food-drink'},
                  {title: 'Experiences', value: 'experiences'},
                  {title: 'Merchandise', value: 'merchandise'},
                  {title: 'Discounts', value: 'discounts'},
                ],
              },
            },
            {
              name: 'featured',
              title: 'Featured Reward',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
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
    defineField({
      name: 'termsAndConditions',
      title: 'Terms and Conditions',
      type: 'blockContent',
    }),
    defineField({
      name: 'signUpUrl',
      title: 'Sign Up URL',
      type: 'url',
      description: 'External link to loyalty program signup',
    }),
    defineField({
      name: 'signUpButtonText',
      title: 'Sign Up Button Text',
      type: 'string',
      initialValue: 'Join Now',
    }),
    defineField({
      name: 'loginUrl',
      title: 'Member Login URL',
      type: 'url',
      description: 'External link to member login',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'heroImage',
    },
  },
})