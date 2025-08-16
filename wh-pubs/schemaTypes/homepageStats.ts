import {defineField, defineType} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons'

export default defineType({
  name: 'homepageStats',
  title: 'Homepage Statistics',
  type: 'document',
  icon: ChartUpwardIcon,
  description: 'Manage the statistics/numbers shown on the homepage',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Story in Numbers',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional subtitle/description for the statistics section',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      description: 'Add up to 6 key statistics',
      of: [
        {
          type: 'object',
          title: 'Statistic',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'The statistic number (e.g., "5", "100+", "25K")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'What this number represents (e.g., "Traditional Pubs", "Happy Customers")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Optional additional context for this statistic',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name for this statistic',
              options: {
                list: [
                  {title: 'Home (Pubs)', value: 'home'},
                  {title: 'Users (Customers)', value: 'users'},
                  {title: 'Calendar (Years)', value: 'calendar'},
                  {title: 'Star (Reviews)', value: 'star'},
                  {title: 'Heart (Satisfaction)', value: 'heart'},
                  {title: 'Utensils (Meals)', value: 'utensils'},
                  {title: 'Beer Glass', value: 'beer'},
                  {title: 'Award/Trophy', value: 'award'},
                  {title: 'Map Pin (Locations)', value: 'mapPin'},
                  {title: 'Clock (Hours)', value: 'clock'},
                  {title: 'Handshake (Partners)', value: 'handshake'},
                  {title: 'Leaf (Local)', value: 'leaf'}
                ]
              },
              initialValue: 'home',
            },
            {
              name: 'color',
              title: 'Accent Color',
              type: 'string',
              description: 'Color theme for this statistic',
              options: {
                list: [
                  {title: 'Gold (Default)', value: 'gold'},
                  {title: 'Green', value: 'green'},
                  {title: 'Blue', value: 'blue'},
                  {title: 'Red', value: 'red'},
                  {title: 'Purple', value: 'purple'},
                  {title: 'Orange', value: 'orange'}
                ]
              },
              initialValue: 'gold',
            }
          ],
          preview: {
            select: {
              number: 'number',
              label: 'label',
              icon: 'icon'
            },
            prepare(selection) {
              const {number, label, icon} = selection
              return {
                title: `${number} ${label}`,
                subtitle: `Icon: ${icon || 'none'}`
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.max(6).error('Maximum 6 statistics allowed'),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Optional background image for the statistics section',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the background image',
        }
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Background color theme',
      options: {
        list: [
          {title: 'Light (Default)', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Primary (Black)', value: 'primary'},
          {title: 'Secondary (Gold)', value: 'secondary'},
          {title: 'Transparent', value: 'transparent'}
        ]
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'animationEnabled',
      title: 'Enable Number Animation',
      type: 'boolean',
      description: 'Animate numbers counting up when section comes into view',
      initialValue: true,
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Display this statistics section on the homepage',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage',
    },
  },
})