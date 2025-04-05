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
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Large banner image for the top of the pub\'s page.',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative text', validation: Rule => Rule.required() }
      ],
      validation: Rule => Rule.required()
    }),
     defineField({
      name: 'heroOverlayText',
      title: 'Hero Overlay Text (Optional)',
      type: 'text',
      rows: 3,
      description: 'Optional text to display layered over the hero image.',
    }),
    defineField({
      name: 'heroOverlayButtonText',
      title: 'Hero Overlay Button Text (Optional)',
      type: 'string',
      description: 'Text for the button overlaid on the hero (requires Link below).',
    }),
    defineField({
      name: 'heroOverlayButtonLink',
      title: 'Hero Overlay Button Link (Optional)',
      type: 'url',
      description: 'URL for the button overlaid on the hero (requires Text above).',
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
    // --- Layout Customization Fields ---
    defineField({
      name: 'logo',
      title: 'Pub Logo',
      type: 'image',
      description: 'Specific logo for this pub to display in the header.',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative text' }
      ]
    }),
    defineField({
      name: 'headerNavLinks',
      title: 'Header Navigation Links',
      type: 'array',
      description: 'Custom navigation links for this pub\'s header (e.g., Home, Menu, Book). Leave empty to use default WH Pubs links.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Link Title', type: 'string', validation: Rule => Rule.required() }),
          defineField({ name: 'url', title: 'Link URL', type: 'string', description: 'Relative (e.g., /menu) or absolute URL', validation: Rule => Rule.required() })
        ]
      }]
    }),
     defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      rows: 3,
      description: 'Custom text/address/info for the footer. Leave empty to use default WH Pubs info.',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter/X URL',
      type: 'url',
    }),
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'string',
      description: 'Optional: Define a theme name (e.g., "blue", "green", "rustic") to apply specific styles.',
      // You could make this a dropdown list later:
      // options: { list: ['default', 'blue', 'green', 'rustic'] }
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