import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

export default defineType({
  name: 'pageSettings',
  title: 'Page Settings',
  type: 'document',
  icon: CogIcon,
  description: 'Hero images and settings for various pages across the site',
  fields: [
    defineField({
      name: 'pageName',
      title: 'Page Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Events Page', value: 'events' },
          { title: 'Blog Page', value: 'blog' },
          { title: 'Contact Page', value: 'contact' },
          { title: 'Careers Page', value: 'careers' },
          { title: 'About Page', value: 'about' },
          { title: 'Menu Page', value: 'menu' },
          { title: 'Privacy Page', value: 'privacy' },
          { title: 'Terms Page', value: 'terms' },
        ]
      }
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
      title: 'pageName',
      media: 'heroImage'
    },
    prepare(selection) {
      const { title } = selection;
      const titles = {
        events: 'Events Page',
        blog: 'Blog Page', 
        contact: 'Contact Page',
        careers: 'Careers Page',
        about: 'About Page',
        menu: 'Menu Page',
        privacy: 'Privacy Page',
        terms: 'Terms Page',
      };
      return {
        ...selection,
        title: titles[title] || title
      }
    }
  }
});