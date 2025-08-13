import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  icon: CogIcon,
  description: 'Settings for the main WH Pubs homepage',
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
    defineField({
      name: 'welcomeImage1',
      title: 'Welcome Section Image 1 (Top Left)',
      type: 'image',
      description: 'First image in the Welcome to WH Pubs grid. Recommended size: 400x300px',
      options: {hotspot: true},
      fields: [
        defineField({ 
          name: 'alt', 
          type: 'string', 
          title: 'Alternative Text',
          description: 'Describe the image for screen readers',
          validation: Rule => Rule.required().error('Alt text is required for accessibility') 
        })
      ],
    }),
    defineField({
      name: 'welcomeImage2',
      title: 'Welcome Section Image 2 (Bottom Left)',
      type: 'image',
      description: 'Second image in the Welcome to WH Pubs grid. Recommended size: 400x400px',
      options: {hotspot: true},
      fields: [
        defineField({ 
          name: 'alt', 
          type: 'string', 
          title: 'Alternative Text',
          description: 'Describe the image for screen readers',
          validation: Rule => Rule.required().error('Alt text is required for accessibility') 
        })
      ],
    }),
    defineField({
      name: 'welcomeImage3',
      title: 'Welcome Section Image 3 (Top Right)',
      type: 'image',
      description: 'Third image in the Welcome to WH Pubs grid. Recommended size: 400x400px',
      options: {hotspot: true},
      fields: [
        defineField({ 
          name: 'alt', 
          type: 'string', 
          title: 'Alternative Text',
          description: 'Describe the image for screen readers',
          validation: Rule => Rule.required().error('Alt text is required for accessibility') 
        })
      ],
    }),
    defineField({
      name: 'welcomeImage4',
      title: 'Welcome Section Image 4 (Bottom Right)',
      type: 'image',
      description: 'Fourth image in the Welcome to WH Pubs grid. Recommended size: 400x300px',
      options: {hotspot: true},
      fields: [
        defineField({ 
          name: 'alt', 
          type: 'string', 
          title: 'Alternative Text',
          description: 'Describe the image for screen readers',
          validation: Rule => Rule.required().error('Alt text is required for accessibility') 
        })
      ],
    }),
    defineField({
      name: 'pubHireImage',
      title: 'Pub Hire Section Image',
      type: 'image',
      description: 'Image for the "Hire Your Own WH Pub" section. Recommended size: 800x600px',
      options: {hotspot: true},
      fields: [
        defineField({ 
          name: 'alt', 
          type: 'string', 
          title: 'Alternative Text',
          description: 'Describe the image for screen readers',
          validation: Rule => Rule.required().error('Alt text is required for accessibility') 
        })
      ],
    }),
    // Come To Us For section (formerly Why Choose Us)
    defineField({
      name: 'whyChooseUs',
      title: 'Come To Us For',
      type: 'object',
      description: 'Three compelling reasons why customers should visit WH Pubs',
      fields: [
        {
          name: 'reason1',
          title: 'Reason 1',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'e.g., "FOOD & DRINK"',
              validation: (Rule) => Rule.max(30),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Brief description (1-2 sentences)',
              validation: (Rule) => Rule.max(150),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Image for this reason (recommended: 1920x1080px or 16:9 ratio)',
              options: {
                hotspot: true,
              },
            },
          ],
        },
        {
          name: 'reason2',
          title: 'Reason 2',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'e.g., "GARDEN DINING"',
              validation: (Rule) => Rule.max(30),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Brief description (1-2 sentences)',
              validation: (Rule) => Rule.max(150),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Image for this reason (recommended: 1920x1080px or 16:9 ratio)',
              options: {
                hotspot: true,
              },
            },
          ],
        },
        {
          name: 'reason3',
          title: 'Reason 3',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'e.g., "PRIVATE EVENTS"',
              validation: (Rule) => Rule.max(30),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Brief description (1-2 sentences)',
              validation: (Rule) => Rule.max(150),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Image for this reason (recommended: 1920x1080px or 16:9 ratio)',
              options: {
                hotspot: true,
              },
            },
          ],
        },
        {
          name: 'backgroundImage',
          title: 'Section Background Image',
          type: 'image',
          description: 'Background image for the Why Choose Us section (recommended: 1920x500px)',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ],
        },
      ],
    }),
    // Signature Dishes section
    defineField({
      name: 'signatureDishes',
      title: '🍽️ Signature Dishes Section',
      type: 'object',
      description: 'Configure the signature dishes showcase on the homepage',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'FROM OUR KITCHENS',
          description: 'Small text above the main title (e.g., "FROM OUR KITCHENS")',
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Signature Dishes',
          description: 'Main heading for the signature dishes section',
          validation: Rule => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          initialValue: 'Crafted with passion using the finest local ingredients',
          description: 'Subtitle text below the main heading',
        },
        {
          name: 'dishes',
          title: 'Featured Dishes',
          type: 'array',
          description: 'Add up to 4 signature dishes to showcase',
          validation: Rule => Rule.max(4),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Dish Name',
                  type: 'string',
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'price',
                  title: 'Price',
                  type: 'string',
                  description: 'e.g., "£18.95"',
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'image',
                  title: 'Dish Image',
                  type: 'image',
                  description: 'Image of the dish (recommended: 600x400px)',
                  options: {
                    hotspot: true,
                  },
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'tag',
                  title: 'Special Tag',
                  type: 'string',
                  description: 'Optional tag like "Chef\'s Special" or "Best Seller"',
                },
                {
                  name: 'pubLocation',
                  title: 'Available At',
                  type: 'string',
                  initialValue: 'Available at all locations',
                  description: 'Where this dish is available',
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
     prepare(selection) {
       return { ...selection, subtitle: 'Homepage Configuration' }
     }
  }
})