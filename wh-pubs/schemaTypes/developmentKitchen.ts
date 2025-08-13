import { defineField, defineType } from 'sanity'
import { LemonIcon } from '@sanity/icons'

export default defineType({
  name: 'developmentKitchen',
  title: 'Development Kitchen',
  type: 'document',
  icon: LemonIcon,
  description: 'Manage the Development Kitchen page content',
  // Singleton document - only one allowed
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image (1920x800px)',
      type: 'image',
      description: '🖼️ REQUIRED SIZE: 1920x800px - Hero image for the top of the page',
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
      name: 'chefProfile',
      title: 'Head Chef Profile',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Chef Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'e.g., Executive Chef, Head of Development',
        }),
        defineField({
          name: 'image',
          title: 'Chef Image (800x1000px Portrait)',
          type: 'image',
          description: '🖼️ REQUIRED SIZE: 800x1000px PORTRAIT - Frame from chest up with space above head',
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
      name: 'myJourney',
      title: 'My Journey with WH Pubs',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'My Journey with WH Pubs'
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'blockContent',
          description: 'Share your personal journey with WH Pubs'
        }),
        defineField({
          name: 'image',
          title: 'Journey Image',
          type: 'image',
          description: '🖼️ Ideal size: 1200x800px - Image related to your journey',
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
      name: 'whatWeDo',
      title: 'What We Do',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'What We Do'
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'blockContent',
          description: 'Describe what the Development Kitchen does'
        }),
        defineField({
          name: 'image',
          title: 'What We Do Image',
          type: 'image',
          description: '🖼️ Ideal size: 1200x800px - Image showing kitchen operations',
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
      name: 'qualitySourcing',
      title: 'Quality Sourcing',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Quality Sourcing'
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'blockContent',
          description: 'Describe your quality sourcing practices'
        }),
        defineField({
          name: 'image',
          title: 'Quality Sourcing Image',
          type: 'image',
          description: '🖼️ Ideal size: 1200x800px - Image showing ingredients or suppliers',
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
      name: 'christmasSpecial',
      title: 'Christmas Special',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Christmas Special'
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'blockContent',
          description: 'Describe your Christmas pudding and special offerings'
        }),
        defineField({
          name: 'image',
          title: 'Christmas Special Image',
          type: 'image',
          description: '🖼️ Ideal size: 1200x800px - Image of Christmas pudding or festive items',
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
      name: 'handmadeBurgers',
      title: 'Handmade Burgers Section',
      type: 'object',
      description: 'Showcase your handmade burger craftsmanship',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Crafted by Hand, Made with Pride'
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
          initialValue: 'Every Burger Tells Our Story'
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'blockContent',
          description: 'Describe your burger-making philosophy and process'
        }),
        defineField({
          name: 'image1',
          title: 'Burger Making Image 1',
          type: 'image',
          description: '🖼️ Ideal size: 800x600px - First image showing burger preparation',
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
              title: 'Image Caption',
              description: 'Optional caption for the image'
            }
          ],
        }),
        defineField({
          name: 'image2',
          title: 'Burger Making Image 2',
          type: 'image',
          description: '🖼️ Ideal size: 800x600px - Second image showing burger preparation',
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
              title: 'Image Caption',
              description: 'Optional caption for the image'
            }
          ],
        }),
        defineField({
          name: 'highlights',
          title: 'Key Highlights',
          type: 'array',
          of: [{type: 'string'}],
          description: 'List key points about your burger-making process (e.g., "100% British Beef", "Hand-formed daily")',
          validation: (Rule) => Rule.max(4)
        }),
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Behind the Scenes Gallery (1000x1000px Square)',
      type: 'array',
      description: 'Images showcasing the development kitchen, team, and processes. 🖼️ REQUIRED SIZE: 1000x1000px SQUARE',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the image'
            }
          ]
        }
      ],
      options: {
        layout: 'grid'
      }
    }),
  ],
  preview: {
    select: {
      title: 'chefProfile.name',
      media: 'heroImage'
    },
    prepare(selection) {
      return { 
        title: 'Development Kitchen',
        subtitle: selection.title ? `Chef: ${selection.title}` : 'Development Kitchen Content',
        media: selection.media
      }
    }
  }
})