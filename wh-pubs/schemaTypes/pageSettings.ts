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
export const aboutPageSettings = createPageSettingsType('about', 'About');
export const contactPageSettings = createPageSettingsType('contact', 'Contact');
export const careersPageSettings = createPageSettingsType('careers', 'Join Our Crew');
export const thingsToDoPageSettings = createPageSettingsType('thingsToDo', 'Things To Do');