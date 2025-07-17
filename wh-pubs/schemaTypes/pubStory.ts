import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export default defineType({
  name: 'pubStory',
  title: 'Pub Stories & History',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{type: 'pub'}],
      validation: (Rule) => Rule.required(),
      description: 'The pub this story is about',
    }),
    defineField({
      name: 'storyType',
      title: 'Story Type',
      type: 'string',
      options: {
        list: [
          {title: 'History', value: 'history'},
          {title: 'Renovation', value: 'renovation'},
          {title: 'Community Story', value: 'community'},
          {title: 'Famous Visitors', value: 'famous-visitors'},
          {title: 'Local Legends', value: 'legends'},
          {title: 'Architecture', value: 'architecture'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      description: 'Brief summary of the story',
    }),
    defineField({
      name: 'content',
      title: 'Full Story',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timeline',
      title: 'Historical Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'event',
              title: 'Event',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
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
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
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
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Historical Photo Gallery',
      type: 'array',
      of: [
        {
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
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'year',
              type: 'string',
              title: 'Year (if known)',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'quotes',
      title: 'Quotes & Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role/Description',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Story',
      type: 'boolean',
      description: 'Show this story prominently on the pub page',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'associatedPub.name',
      media: 'featuredImage',
      storyType: 'storyType',
    },
    prepare(selection) {
      const {title, subtitle, media, storyType} = selection
      const types = {
        'history': '📚 History',
        'renovation': '🔨 Renovation',
        'community': '👥 Community',
        'famous-visitors': '⭐ Famous Visitors',
        'legends': '🏰 Legends',
        'architecture': '🏛️ Architecture',
        'other': '📝 Story',
      };
      return {
        title,
        subtitle: `${subtitle} - ${types[storyType] || 'Story'}`,
        media,
      }
    },
  },
})