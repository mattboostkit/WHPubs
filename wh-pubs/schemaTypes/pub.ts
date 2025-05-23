import {defineField, defineType} from 'sanity'
import { HomeIcon, ImageIcon, LinkIcon, PinIcon, StarIcon, UserIcon } from '@sanity/icons'

export default defineType({
  name: 'pub',
  title: 'Pub',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true, icon: HomeIcon },
    { name: 'location', title: 'Location & Hours', icon: PinIcon },
    { name: 'media', title: 'Media', icon: ImageIcon },
    { name: 'features', title: 'Features & Booking', icon: StarIcon },
    { name: 'layout', title: 'Layout & Links', icon: LinkIcon },
    { name: 'content', title: 'Content & SEO', icon: UserIcon },
  ],
  fields: [
    // --- Basic Info Group ---
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Pub Description',
      type: 'text',
      group: 'basic',
      rows: 4,
      description: 'General description of the pub shown on listings or the pub page.',
    }),
    defineField({
      name: 'url',
      title: 'Website URL (Optional)',
      type: 'url',
      group: 'basic',
      description: 'Link to the pub\'s own separate website, if it has one.',
    }),

    // --- Location & Hours Group ---
    defineField({
      name: 'locationName',
      title: 'Location Name',
      type: 'string',
      group: 'location',
      description: 'e.g., Town, Village, or Area name. Used for filtering/display.',
    }),
    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
      group: 'location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address Line 2 (Optional)',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'postcode',
      title: 'Postcode',
      type: 'string',
      group: 'location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      group: 'location',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      group: 'location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL (Optional)',
      type: 'url',
      group: 'location',
      description: 'Direct link to the Google Maps location for an embed or link.',
    }),
    defineField({
      name: 'openingHoursStructured',
      title: 'Opening Hours',
      type: 'object',
      group: 'location',
      description: 'Enter opening and closing times for each day. Leave blank if closed.',
      fields: [
        { name: 'monday', title: 'Monday', type: 'string', description: 'e.g., 12:00 - 23:00' },
        { name: 'tuesday', title: 'Tuesday', type: 'string', description: 'e.g., 12:00 - 23:00' },
        { name: 'wednesday', title: 'Wednesday', type: 'string', description: 'e.g., 12:00 - 23:00' },
        { name: 'thursday', title: 'Thursday', type: 'string', description: 'e.g., 12:00 - 23:00' },
        { name: 'friday', title: 'Friday', type: 'string', description: 'e.g., 12:00 - 00:00' },
        { name: 'saturday', title: 'Saturday', type: 'string', description: 'e.g., 11:00 - 00:00' },
        { name: 'sunday', title: 'Sunday', type: 'string', description: 'e.g., 12:00 - 22:00' },
      ],
    }),
    defineField({
      name: 'foodServingTimes',
      title: 'Food Serving Times',
      type: 'text',
      rows: 5,
      group: 'location',
      description: 'e.g., Lunch: Mon-Sat 12pm-3pm, Dinner: Mon-Sat 6pm-9pm, Sun: 12pm-8pm',
    }),

    // --- Media Group ---
    defineField({
      name: 'image',
      title: 'Main Listing Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
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
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'media',
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
      group: 'media',
      description: 'Optional text to display layered over the hero image.',
    }),
    defineField({
      name: 'heroOverlayButtonText',
      title: 'Hero Overlay Button Text (Optional)',
      type: 'string',
      group: 'media',
      description: 'Text for the button overlaid on the hero (requires Link below).',
    }),
    defineField({
      name: 'heroOverlayButtonLink',
      title: 'Hero Overlay Button Link (Optional)',
      type: 'url',
      group: 'media',
      description: 'URL for the button overlaid on the hero (requires Text above).',
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      group: 'media',
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
            // Optional: Add caption if needed
            // { name: 'caption', type: 'string', title: 'Caption' }
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),

    // --- Features & Booking Group ---
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      group: 'features',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'List features like Dog Friendly, Beer Garden, Parking, Wi-Fi, Family Friendly, etc.',
    }),
    defineField({
      name: 'reservationsUrl',
      title: 'Reservations URL (LiveRes or other)',
      type: 'url',
      group: 'features',
      description: 'Link to the specific booking page/service for this pub (e.g., LiveRes link)',
    }),
    defineField({
      name: 'depositRequired',
      title: 'Booking Deposit Required?',
      type: 'boolean',
      group: 'features',
      initialValue: false,
    }),
    defineField({
      name: 'bookingPolicyText',
      title: 'Booking Policy Text (Optional)',
      type: 'text',
      rows: 3,
      group: 'features',
      description: 'Any specific terms or policies related to bookings.',
    }),

    // --- Layout & Links Group ---
    defineField({
      name: 'logo',
      title: 'Pub Logo (Optional Header Override)',
      type: 'image',
      group: 'layout',
      description: 'Specific logo for this pub. If empty, the main site logo might be used.',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative text' }
      ]
    }),
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme (Optional)',
      type: 'string',
      group: 'layout',
      description: 'Optional: Define a theme name (e.g., "blue", "green", "rustic") to apply specific styles.',
    }),
    defineField({
      name: 'headerNavLinks',
      title: 'Header Navigation Links (Override)',
      type: 'array',
      group: 'layout',
      description: 'Custom navigation links for THIS pub\'s header. Leave empty to potentially use default site links.',
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
      title: 'Footer Text (Override)',
      type: 'text',
      rows: 3,
      group: 'layout',
      description: 'Custom text/address/info for THIS pub\'s footer. Leave empty to potentially use default site info.',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      group: 'layout',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'layout',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter/X URL',
      type: 'url',
      group: 'layout',
    }),

    // --- Content & SEO Group ---
    defineField({
      name: 'bioName',
      title: 'Bio Name (Optional)',
      type: 'string',
      group: 'content',
      description: 'Name of the chef, manager, or key person.',
    }),
    defineField({
      name: 'bioTitle',
      title: 'Bio Title (Optional)',
      type: 'string',
      group: 'content',
      description: 'Role or title (e.g., Head Chef, General Manager).',
    }),
    defineField({
      name: 'bioText',
      title: 'Bio Text (Optional)',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'A short biography or quote.',
    }),
    defineField({
      name: 'bioImage',
      title: 'Bio Image (Optional)',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative text', validation: Rule => Rule.required() }
      ]
    }),
    defineField({
      name: 'newsletterEnabled',
      title: 'Enable Newsletter Signup?',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'newsletterProviderUrl',
      title: 'Newsletter Provider URL (Optional)',
      type: 'url',
      group: 'content',
      description: 'URL for the Mailchimp signup form or similar service.',
      hidden: ({ document }) => !document?.newsletterEnabled,
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title (Optional)',
      type: 'string',
      group: 'content',
      description: 'Overrides the default page title for search engines. Keep concise.',
      validation: Rule => Rule.max(60).warning('Title should ideally be under 60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description (Optional)',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Overrides the default page description for search engines. Aim for 150-160 characters.',
      validation: Rule => Rule.max(160).warning('Description should ideally be under 160 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (og:image)',
      type: 'image',
      group: 'content',
      description: 'Recommended size: 1200x630 pixels. Overrides default image for social sharing.',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text (Important!)', validation: Rule => Rule.required() }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      location: 'locationName',
      media: 'image',
    },
    prepare(selection) {
      const {title, location} = selection
      return {...selection, title: title, subtitle: location}
    },
  },
})