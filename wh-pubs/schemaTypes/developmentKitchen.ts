import { defineField, defineType } from 'sanity'
import { LemonIcon } from '@sanity/icons'

export default defineType({
  name: 'developmentKitchen',
  title: 'Development Kitchen',
  type: 'document',
  icon: LemonIcon,
  description: 'Manage the Development Kitchen page content, including chef profiles, innovations, and supplier information',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main title for the Development Kitchen page',
      validation: (Rule) => Rule.required(),
      initialValue: 'Development Kitchen'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
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
          validation: (Rule) => Rule.required(),
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
          title: 'Chef Image',
          type: 'image',
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
      name: 'process',
      title: 'Development Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Step Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                }
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              stepNumber: 'stepNumber',
              media: 'image'
            },
            prepare({ title, stepNumber, media }) {
              return {
                title: `${stepNumber}. ${title}`,
                media
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'innovations',
      title: 'Recent Innovations',
      type: 'array',
      description: 'Showcase recent menu innovations and seasonal dishes',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'dishName',
              title: 'Dish Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'season',
              title: 'Season/Period',
              type: 'string',
              description: 'e.g., Summer 2024, Christmas Special',
            }),
            defineField({
              name: 'image',
              title: 'Dish Image',
              type: 'image',
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
              name: 'availableAt',
              title: 'Available At',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'pub' }] }],
              description: 'Which pubs feature this dish',
            }),
          ],
          preview: {
            select: {
              title: 'dishName',
              subtitle: 'season',
              media: 'image'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Kitchen Gallery',
      type: 'array',
      description: 'Images showcasing the development kitchen, team, and processes',
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
            },
            {
              name: 'category',
              type: 'string',
              title: 'Category',
              options: {
                list: [
                  { title: 'Kitchen Space', value: 'kitchen' },
                  { title: 'Team at Work', value: 'team' },
                  { title: 'Ingredients', value: 'ingredients' },
                  { title: 'Techniques', value: 'techniques' },
                  { title: 'Final Dishes', value: 'dishes' },
                  { title: 'Behind the Scenes', value: 'behind-scenes' }
                ]
              }
            }
          ]
        }
      ],
      options: {
        layout: 'grid'
      }
    }),
    defineField({
      name: 'suppliers',
      title: 'Our Suppliers',
      type: 'array',
      description: 'Showcase local suppliers and partnerships',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Supplier Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'What they supply and why we work with them',
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
            }),
            defineField({
              name: 'logo',
              title: 'Supplier Logo',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                }
              ],
            }),
            defineField({
              name: 'website',
              title: 'Website',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'location',
              media: 'logo'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'seasonalFocus',
      title: 'Seasonal Focus',
      type: 'object',
      description: 'Highlight current seasonal menu development',
      fields: [
        defineField({
          name: 'season',
          title: 'Current Season',
          type: 'string',
          options: {
            list: [
              { title: 'Spring', value: 'spring' },
              { title: 'Summer', value: 'summer' },
              { title: 'Autumn', value: 'autumn' },
              { title: 'Winter', value: 'winter' }
            ]
          }
        }),
        defineField({
          name: 'theme',
          title: 'Seasonal Theme',
          type: 'string',
          description: 'e.g., Fresh Spring Vegetables, Summer BBQ, Autumn Harvest',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'blockContent',
        }),
        defineField({
          name: 'featuredIngredients',
          title: 'Featured Ingredients',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }),
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60).warning('Should be under 60 characters'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160).warning('Should be under 160 characters'),
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Recommended: 1200x630px',
          options: { hotspot: true },
        }),
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage'
    }
  }
})