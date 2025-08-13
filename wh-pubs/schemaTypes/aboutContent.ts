import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export default defineType({
  name: 'aboutContent',
  title: 'About Page Content',
  type: 'document',
  icon: DocumentTextIcon,
  // Singleton document - only one allowed
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'About Page Content',
      readOnly: true,
    }),
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      description: 'The main heading for the story section',
      initialValue: 'The story so far....',
    }),
    defineField({
      name: 'founderPhoto',
      title: 'Founder Photo',
      type: 'image',
      description: 'Photo of Brian Keeley Whiting (recommended size: 800x1000px)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        }
      ],
    }),
    defineField({
      name: 'ownerPhoto',
      title: 'Owner Photo',
      type: 'image',
      description: 'Photo of the current owner (recommended size: 800x1000px)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        }
      ],
    }),
    defineField({
      name: 'storyContent',
      title: 'Story Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
          },
        }
      ],
      description: 'The main story content with rich text formatting',
    }),
    defineField({
      name: 'showLeadershipSection',
      title: 'Show Leadership Section',
      type: 'boolean',
      description: 'Display the Meet Our Leadership section with team members',
      initialValue: true,
    }),
    defineField({
      name: 'showCommitmentsSection',
      title: 'Show Commitments Section',
      type: 'boolean',
      description: 'Display the Our Commitments section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'founderPhoto'
    },
  }
});