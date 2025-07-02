import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'homepage',
  title: 'WH Pubs Main Site Settings',
  type: 'document',
  icon: CogIcon,
  description: 'Global settings for the WH Pubs main site including homepage, page heroes, and development kitchen',
  // Singleton document - only one allowed
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title (for SEO)',
      type: 'string',
      description: 'Used for the browser tab title and search results.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Carousel Images',
      type: 'array',
      description: 'Add up to 4 images for the homepage carousel. Images will auto-rotate. Recommended size: 1920x1080px',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          defineField({ 
            name: 'alt', 
            type: 'string', 
            title: 'Alternative Text',
            description: 'Describe the image for screen readers',
            validation: Rule => Rule.required().error('Alt text is required for accessibility') 
          })
        ]
      }],
      validation: (Rule) => Rule.required().min(1).max(4).error('Please upload 1-4 hero images'),
    }),
    // Keep old single image for backwards compatibility
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image (Legacy - Use Hero Carousel Images instead)',
      type: 'image',
      hidden: true,
      options: {hotspot: true},
      fields: [
        defineField({ 
          name: 'alt', 
          type: 'string', 
          title: 'Alternative Text',
        })
      ],
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'The main heading in the hero section (e.g., "WH Pubs").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'The text below the main hero heading.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'heroButton1Text',
        title: 'Hero Button 1 Text',
        type: 'string',
        description: 'e.g., "View Our Pubs"',
        initialValue: 'View Our Pubs',
    }),
     defineField({
        name: 'heroButton1Link',
        title: 'Hero Button 1 Link',
        type: 'string',
        description: 'Internal link for button 1 (e.g., "/#pubs")',
        initialValue: '/#pubs',
    }),
     defineField({
        name: 'heroButton2Text',
        title: 'Hero Button 2 Text',
        type: 'string',
        description: 'e.g., "Book a Table"',
         initialValue: 'Book a Table',
    }),
     defineField({
        name: 'heroButton2Link',
        title: 'Hero Button 2 Link',
        type: 'string',
        description: 'Internal link for button 2 (e.g., "/book")',
        initialValue: '/book',
    }),
    // Page Hero Settings Section
    defineField({
      name: 'pageHeroSettings',
      title: 'Page Hero Settings',
      type: 'object',
      description: 'Configure hero images for individual pages',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'eventsHero',
          title: 'Events Page Hero',
          type: 'object',
          fields: [
            defineField({
              name: 'heroImage',
              title: 'Hero Image (1920x768px)',
              type: 'image',
              description: '🖼️ REQUIRED SIZE: 1920x768px EXACTLY',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  validation: (Rule) => Rule.required(),
                }
              ],
            }),
            defineField({
              name: 'heroTitle',
              title: 'Hero Title',
              type: 'string',
              initialValue: 'Upcoming Events',
            }),
            defineField({
              name: 'heroSubtitle',
              title: 'Hero Subtitle',
              type: 'text',
              rows: 2,
              initialValue: 'Join us for unforgettable experiences',
            }),
          ]
        }),
        defineField({
          name: 'blogHero',
          title: 'Blog Page Hero',
          type: 'object',
          fields: [
            defineField({
              name: 'heroImage',
              title: 'Hero Image (1920x768px)',
              type: 'image',
              description: '🖼️ REQUIRED SIZE: 1920x768px EXACTLY',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  validation: (Rule) => Rule.required(),
                }
              ],
            }),
            defineField({
              name: 'heroTitle',
              title: 'Hero Title',
              type: 'string',
              initialValue: 'Latest News & Updates',
            }),
            defineField({
              name: 'heroSubtitle',
              title: 'Hero Subtitle',
              type: 'text',
              rows: 2,
              initialValue: 'Stay informed about what\'s happening at WH Pubs',
            }),
          ]
        }),
        defineField({
          name: 'aboutHero',
          title: 'About Page Hero',
          type: 'object',
          fields: [
            defineField({
              name: 'heroImage',
              title: 'Hero Image (1920x768px)',
              type: 'image',
              description: '🖼️ REQUIRED SIZE: 1920x768px EXACTLY',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  validation: (Rule) => Rule.required(),
                }
              ],
            }),
            defineField({
              name: 'heroTitle',
              title: 'Hero Title',
              type: 'string',
              initialValue: 'About WH Pubs',
            }),
            defineField({
              name: 'heroSubtitle',
              title: 'Hero Subtitle',
              type: 'text',
              rows: 2,
              initialValue: 'Continuing a tradition of hospitality since 1985',
            }),
          ]
        }),
        defineField({
          name: 'contactHero',
          title: 'Contact Page Hero',
          type: 'object',
          fields: [
            defineField({
              name: 'heroImage',
              title: 'Hero Image (1920x768px)',
              type: 'image',
              description: '🖼️ REQUIRED SIZE: 1920x768px EXACTLY',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  validation: (Rule) => Rule.required(),
                }
              ],
            }),
            defineField({
              name: 'heroTitle',
              title: 'Hero Title',
              type: 'string',
              initialValue: 'Get in Touch',
            }),
            defineField({
              name: 'heroSubtitle',
              title: 'Hero Subtitle',
              type: 'text',
              rows: 2,
              initialValue: 'We\'d love to hear from you',
            }),
          ]
        }),
        defineField({
          name: 'careersHero',
          title: 'Careers Page Hero',
          type: 'object',
          fields: [
            defineField({
              name: 'heroImage',
              title: 'Hero Image (1920x768px)',
              type: 'image',
              description: '🖼️ REQUIRED SIZE: 1920x768px EXACTLY',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  validation: (Rule) => Rule.required(),
                }
              ],
            }),
            defineField({
              name: 'heroTitle',
              title: 'Hero Title',
              type: 'string',
              initialValue: 'Join Our Team',
            }),
            defineField({
              name: 'heroSubtitle',
              title: 'Hero Subtitle',
              type: 'text',
              rows: 2,
              initialValue: 'Discover exciting opportunities at WH Pubs',
            }),
          ]
        }),
      ]
    }),
    // Development Kitchen Section (moved from separate schema)
    defineField({
      name: 'developmentKitchen',
      title: 'Development Kitchen',
      type: 'object',
      description: 'Content for the Development Kitchen page',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'heroImage',
          title: 'Hero Image (1920x800px)',
          type: 'image',
          description: '🖼️ REQUIRED SIZE: 1920x800px EXACTLY',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (Rule) => Rule.required(),
            }
          ],
        }),
        defineField({
          name: 'introText',
          title: 'Introduction Text',
          type: 'blockContent',
          description: 'Introduction to the Development Kitchen concept',
        }),
        defineField({
          name: 'chefProfile',
          title: 'Head Chef Profile',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Chef Name',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'e.g., Executive Chef, Head of Development',
            }),
            defineField({
              name: 'bio',
              title: 'Biography',
              type: 'blockContent',
            }),
            defineField({
              name: 'image',
              title: 'Chef Image (800x1000px Portrait)',
              type: 'image',
              description: '🖼️ REQUIRED SIZE: 800x1000px PORTRAIT',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  validation: (Rule) => Rule.required(),
                }
              ],
            }),
          ]
        }),
        defineField({
          name: 'philosophy',
          title: 'Our Philosophy',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              initialValue: 'Our Philosophy'
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            }),
          ]
        }),
        defineField({
          name: 'gallery',
          title: 'Kitchen Gallery (1000x1000px Square)',
          type: 'array',
          description: '🖼️ REQUIRED SIZE: 1000x1000px SQUARE',
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                },
              ]
            }
          ],
          options: {
            layout: 'grid'
          }
        }),
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
     prepare(selection) {
       return { ...selection, subtitle: 'Main Site Settings' }
     }
  }
})