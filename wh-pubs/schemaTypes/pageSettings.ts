import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

// Define the base page settings schema
const createPageSettingsType = (id: string, title: string) => {
  return defineType({
    name: `${id}PageSettings`,
    title: `${title} Page Settings`,
    type: 'document',
    icon: CogIcon,
    // Singleton document - only one allowed
    __experimental_actions: ['update', 'publish'],
    fields: [
      defineField({
        name: 'title',
        title: 'Page Title',
        type: 'string',
        initialValue: title,
        readOnly: true,
      }),
      defineField({
        name: 'heroImage',
        title: 'Hero Image (1920x768px)',
        type: 'image',
        description: '🖼️ REQUIRED SIZE: 1920x768px EXACTLY - Hero banner displays at 40% viewport height',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            description: 'Important for SEO and accessibility',
            validation: (Rule) => Rule.required(),
          }
        ],
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'heroTitle',
        title: 'Hero Title (Optional)',
        type: 'string',
        description: 'Optional title to overlay on the hero image',
      }),
      defineField({
        name: 'heroSubtitle',
        title: 'Hero Subtitle (Optional)',
        type: 'text',
        rows: 2,
        description: 'Optional subtitle text to display below the title',
      }),
    ],
    preview: {
      select: {
        title: 'title',
        media: 'heroImage'
      },
      prepare(selection) {
        return {
          ...selection,
          subtitle: 'Page Settings'
        }
      }
    }
  });
};

// Export individual page setting types
export const eventsPageSettings = createPageSettingsType('events', 'Events');
export const blogPageSettings = createPageSettingsType('blog', 'Blog');
// Custom About Page Settings with additional content fields
export const aboutPageSettings = defineType({
  name: 'aboutPageSettings',
  title: 'About Page',
  type: 'document',
  icon: CogIcon,
  // Singleton document - only one allowed
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About',
      readOnly: true,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (1920x768px)',
      type: 'image',
      description: '🖼️ REQUIRED SIZE: 1920x768px EXACTLY - Hero banner displays at 40% viewport height',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title (Optional)',
      type: 'string',
      description: 'Optional title to overlay on the hero image',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle (Optional)',
      type: 'text',
      rows: 2,
      description: 'Optional subtitle text to display below the title',
    }),
    // Content fields from aboutContent
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
      media: 'heroImage'
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'About Page Settings & Content'
      }
    }
  }
});
export const contactPageSettings = createPageSettingsType('contact', 'Contact');
export const careersPageSettings = createPageSettingsType('careers', 'Join Our Crew');
export const thingsToDoPageSettings = createPageSettingsType('thingsToDo', 'Things To Do');
export const pubFinderPageSettings = createPageSettingsType('pubFinder', 'Our Pubs');
export const suppliersPageSettings = createPageSettingsType('suppliers', 'Suppliers');
export const giftCardsPageSettings = createPageSettingsType('giftCards', 'Gift Cards');