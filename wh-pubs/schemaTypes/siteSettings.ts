import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  description: 'Global settings for the WH Pubs main site',
  // Singleton document - only one allowed
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The main site name (e.g., "WH Pubs")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'siteTagline',
      title: 'Site Tagline',
      type: 'string',
      description: 'Brief tagline for the site',
      initialValue: 'Traditional British hospitality in South East England'
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      description: 'Main logo for the WH Pubs brand',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the logo for screen readers',
          validation: Rule => Rule.required()
        })
      ]
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      rows: 3,
      description: 'Brief description that appears in the site footer',
      initialValue: 'Traditional British pubs offering quality food, drink, and hospitality in the heart of South East England.'
    }),
    defineField({
      name: 'defaultContactLocation',
      title: 'Default Contact Location',
      type: 'string',
      description: 'Default location shown in footer contact info',
      initialValue: 'Chiddingstone Causeway, Kent'
    }),
    defineField({
      name: 'defaultContactHours',
      title: 'Default Contact Hours',
      type: 'string',
      description: 'Default opening hours shown in footer',
      initialValue: 'Mon-Sun: 11am-11pm'
    }),
    defineField({
      name: 'defaultContactPhone',
      title: 'Default Contact Phone',
      type: 'string',
      description: 'Default phone number shown in footer',
      initialValue: '01892 870 369'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          })
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          })
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          })
        })
      ]
    }),
    defineField({
      name: 'hubLiveResWidgetUrl',
      title: 'Hub LiveRes Widget URL',
      type: 'url',
      description: 'LiveRes booking widget URL for the main WH Pubs hub site',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'object',
      description: 'Default SEO settings for pages without specific metadata',
      fields: [
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Default meta description for search engines',
          validation: Rule => Rule.max(160)
        }),
        defineField({
          name: 'ogImage',
          title: 'Default Social Share Image',
          type: 'image',
          description: 'Default image for social media sharing (1200x630px recommended)',
          options: {
            hotspot: true
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo'
    },
    prepare(selection) {
      return { 
        ...selection, 
        subtitle: 'Global Site Settings' 
      }
    }
  }
})