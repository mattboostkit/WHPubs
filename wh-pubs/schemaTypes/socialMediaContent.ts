import {defineField, defineType} from 'sanity'
import {ShareIcon} from '@sanity/icons'

export default defineType({
  name: 'socialMediaContent',
  title: 'Social Media Content',
  type: 'document',
  icon: ShareIcon,
  description: 'Manage social media posts and content for display on pub websites',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal reference title (not shown on website)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Twitter/X', value: 'twitter'},
          {title: 'Review/Testimonial', value: 'review'}
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{ type: 'pub' }],
      description: 'Which pub is this content for? Leave empty for hub-wide content.',
    }),
    defineField({
      name: 'postImage',
      title: 'Post Image',
      type: 'image',
      description: 'Main image for this social media post',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image content',
          validation: (Rule) => Rule.required(),
        }
      ],
      hidden: ({document}) => document?.platform === 'review',
    }),
    defineField({
      name: 'caption',
      title: 'Caption/Content',
      type: 'text',
      rows: 4,
      description: 'Post caption, content, or review text',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'likes',
      title: 'Likes/Hearts Count',
      type: 'number',
      description: 'Number of likes/hearts for this post',
      initialValue: 0,
      hidden: ({document}) => document?.platform === 'review',
    }),
    defineField({
      name: 'comments',
      title: 'Comments Count',
      type: 'number',
      description: 'Number of comments on this post',
      initialValue: 0,
      hidden: ({document}) => document?.platform === 'review',
    }),
    defineField({
      name: 'shares',
      title: 'Shares Count',
      type: 'number',
      description: 'Number of shares (Facebook/Twitter)',
      initialValue: 0,
      hidden: ({document}) => document?.platform !== 'facebook' && document?.platform !== 'twitter',
    }),
    defineField({
      name: 'timestamp',
      title: 'Display Timestamp',
      type: 'string',
      description: 'How long ago this was posted (e.g., "2 hours ago", "1 day ago")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location Tag',
      type: 'string',
      description: 'Location tag for Instagram posts (usually pub name)',
      hidden: ({document}) => document?.platform !== 'instagram',
    }),
    defineField({
      name: 'author',
      title: 'Review Author',
      type: 'string',
      description: 'Name of the reviewer (e.g., "Sarah M.")',
      hidden: ({document}) => document?.platform !== 'review',
    }),
    defineField({
      name: 'rating',
      title: 'Review Rating',
      type: 'number',
      description: 'Star rating (1-5)',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({document}) => document?.platform !== 'review',
    }),
    defineField({
      name: 'reviewPlatform',
      title: 'Review Platform',
      type: 'string',
      options: {
        list: [
          {title: 'TripAdvisor', value: 'TripAdvisor'},
          {title: 'Google', value: 'Google'},
          {title: 'Facebook', value: 'Facebook'},
          {title: 'Yelp', value: 'Yelp'},
          {title: 'OpenTable', value: 'OpenTable'}
        ]
      },
      hidden: ({document}) => document?.platform !== 'review',
    }),
    defineField({
      name: 'verified',
      title: 'Verified Review',
      type: 'boolean',
      description: 'Is this a verified review?',
      initialValue: true,
      hidden: ({document}) => document?.platform !== 'review',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Content',
      type: 'boolean',
      description: 'Show this content prominently',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this content on the website',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Display order (lower numbers first)',
      initialValue: 999,
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Link to the original post (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
      caption: 'caption',
      media: 'postImage',
      pub: 'associatedPub.name'
    },
    prepare(selection) {
      const {title, platform, caption, media, pub} = selection
      const subtitle = `${platform} - ${pub || 'Hub'} - ${caption?.substring(0, 50)}...`
      return {
        title,
        subtitle,
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
        {field: '_createdAt', direction: 'desc'}
      ]
    },
    {
      title: 'Platform',
      name: 'platform',
      by: [
        {field: 'platform', direction: 'asc'},
        {field: 'sortOrder', direction: 'asc'}
      ]
    },
    {
      title: 'Recent First',
      name: 'recent',
      by: [
        {field: '_createdAt', direction: 'desc'}
      ]
    }
  ]
})