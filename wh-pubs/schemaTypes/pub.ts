import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pub',
  title: 'Pub',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Town or Village name',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping/positioning
      },
      fields: [ // Optional: Add alt text field to the image
        { // Corrected alt field definition - plain object inside array
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        }
      ]
    }),
    // Moved these fields outside the 'image' field definition
    defineField({
      name: 'foodServingTimes',
      title: 'Food Serving Times',
      type: 'text',
      rows: 5,
      description: 'e.g., Lunch: Mon-Sat 12pm-3pm, Dinner: Mon-Sat 6pm-9pm, Sun: 12pm-8pm',
    }),
    defineField({
      name: 'reservationsUrl',
      title: 'Reservations URL',
      type: 'url',
      description: 'Link to the specific booking page/service for this pub (if any)',
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
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
          ],
        },
      ],
      options: {
        layout: 'grid', // Display images in a grid in the Studio
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text', // Use 'text' for longer descriptions
      rows: 4,
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Link to the pub\'s own website, if available',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'text', // Use text for potentially multi-line opening hours
      rows: 5,
      description: 'e.g., Mon-Fri: 12pm - 11pm, Sat: 12pm - 12am, Sun: 12pm - 10pm',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    // Optional: Link to an Author (Pub Manager)
    // defineField({
    //   name: 'manager',
    //   title: 'Pub Manager (Author)',
    //   type: 'reference',
    //   to: {type: 'author'},
    // })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})