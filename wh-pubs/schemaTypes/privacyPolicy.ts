import {defineField, defineType} from 'sanity'
import {ShieldIcon} from 'lucide-react'

export default defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  icon: ShieldIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Privacy Policy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When this policy was last updated',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Policy Content',
      type: 'blockContent',
      description: 'The full privacy policy content. Use headings to organize sections.',
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{type: 'pub'}],
      description: 'Leave empty for the main hub privacy policy, or select a pub for pub-specific policy',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this privacy policy'
    })
  ],
  preview: {
    select: {
      title: 'title',
      pubName: 'associatedPub.name',
      lastUpdated: 'lastUpdated',
      active: 'active'
    },
    prepare({title, pubName, lastUpdated, active}) {
      const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'Not set'
      return {
        title: pubName ? `${title} - ${pubName}` : `${title} - Hub`,
        subtitle: `Last updated: ${date}${active === false ? ' (Inactive)' : ''}`
      }
    }
  }
})