import {defineField, defineType} from 'sanity'
import { HomeIcon, ImageIcon, LinkIcon, PinIcon, StarIcon, UserIcon } from '@sanity/icons'

export default defineType({
  name: 'pub',
  title: 'Pubs',
  type: 'document',
  description: 'Manage your pub locations, including details, images, menus, and customization options',
  groups: [
    { name: 'basic', title: '1. Basic Info', default: true, icon: HomeIcon },
    { name: 'location', title: '2. Location & Hours', icon: PinIcon },
    { name: 'media', title: '3. Images & Media', icon: ImageIcon },
    { name: 'features', title: '4. Features & Booking', icon: StarIcon },
    { name: 'layout', title: '5. Website & Social', icon: LinkIcon },
    { name: 'content', title: '6. Content & SEO', icon: UserIcon },
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
    defineField({
      name: 'externalDomain',
      title: 'External Domain',
      type: 'string',
      group: 'basic',
      description: 'The full domain where this pub\'s website is hosted (e.g., www.thebullpub.com)',
      validation: (Rule) => Rule.regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, {
        name: 'domain',
        invert: false
      }).error('Please enter a valid domain'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Pub',
      type: 'boolean',
      group: 'basic',
      description: 'Show this pub prominently on the main WH Pubs site',
      initialValue: false,
    }),

    // --- Location & Hours Group ---
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'location',
      description: 'e.g., Chiddingstone Causeway, Kent. Used for display and filtering.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationName',
      title: 'Location Name (Area)',
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
      name: 'openingHours',
      title: 'Opening Hours (Simple)',
      type: 'string',
      group: 'location',
      description: 'e.g., Mon-Fri: 12pm - 11pm, Sat: 12pm - 12am, Sun: 12pm - 10pm',
    }),
    defineField({
      name: 'openingHoursStructured',
      title: 'Opening Hours (Detailed)',
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
    defineField({
      name: 'googleMapEmbed',
      title: 'Google Map Embed',
      type: 'reference',
      to: [{ type: 'googleMapEmbed' }],
      group: 'location',
      description: 'Embed a Google Business Profile map for this pub.'
    }),

    // --- Media Group ---
    defineField({
      name: 'image',
      title: 'Main Listing Image (828x605px)',
      type: 'image',
      group: 'media',
      description: 'Homepage thumbnail image. 🖼️ REQUIRED SIZE: 828x605px EXACTLY',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for screen readers and SEO (e.g., "The Bull pub exterior on a sunny day")',
          validation: (Rule) => Rule.required(),
        }
      ],
      validation: (Rule) => Rule.required().error('Please upload a main listing image'),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Banner Image (1920x800px)',
      type: 'image',
      group: 'media',
      description: 'Main pub page hero banner. 🖼️ REQUIRED SIZE: 1920x800px EXACTLY',
      options: { hotspot: true },
      fields: [
        { 
          name: 'alt', 
          type: 'string', 
          title: 'Alternative text',
          description: 'Describe this hero image',
          validation: Rule => Rule.required() 
        }
      ],
      validation: Rule => Rule.required().error('Please upload a hero banner image')
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
      name: 'carouselImages',
      title: 'Homepage Carousel Images',
      type: 'array',
      group: 'media',
      description: 'Add up to 6 images for the homepage carousel. Images will rotate automatically. 🖼️ Ideal size: 1920x800px (2.4:1 ratio)',
      of: [
        {
          type: 'image',
          title: 'Carousel Image',
          options: { 
            hotspot: true,
            accept: 'image/*'
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Brief description of the image (required for accessibility)',
              validation: (Rule) => Rule.required().error('Please add alt text'),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption (Optional)',
              description: 'Optional text overlay for this carousel image'
            },
            {
              name: 'buttonText',
              type: 'string',
              title: 'Button Text (Optional)',
              description: 'Text for an optional button on this slide'
            },
            {
              name: 'buttonLink',
              type: 'string',
              title: 'Button Link (Optional)',
              description: 'URL for the button (e.g., /menu, /book)'
            }
          ]
        }
      ],
      validation: (Rule) => Rule.max(6).error('Maximum 6 images allowed'),
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery (1000x1000px Square)',
      type: 'array',
      group: 'media',
      description: 'Gallery photos of your pub. 🖼️ REQUIRED SIZE: 1000x1000px SQUARE',
      of: [
        {
          type: 'image',
          title: 'Gallery Image',
          options: { 
            hotspot: true,
            accept: 'image/*'
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Brief description of the image (required for accessibility)',
              validation: (Rule) => Rule.required().error('Please add alt text'),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional text shown below the image'
            },
            {
              name: 'category',
              type: 'string',
              title: 'Category',
              description: 'Helps visitors filter images by type',
              options: {
                list: [
                  { title: 'Interior', value: 'interior' },
                  { title: 'Exterior', value: 'exterior' },
                  { title: 'Food', value: 'food' },
                  { title: 'Drinks', value: 'drinks' },
                  { title: 'Events', value: 'events' },
                  { title: 'Garden', value: 'garden' },
                  { title: 'Private Dining', value: 'private-dining' }
                ]
              },
              initialValue: 'interior'
            }
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'menuPdfFiles',
      title: 'Menu PDF Files',
      type: 'array',
      group: 'media',
      description: 'Upload PDF menus (e.g., Main Menu, Wine List, Sunday Roast)',
      of: [
        {
          type: 'file',
          options: {
            accept: '.pdf'
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Menu Title',
              description: 'e.g., Main Menu, Wine List, Sunday Roast',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
              description: 'Brief description of this menu'
            }
          ]
        }
      ]
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
      description: 'Specific logo for this pub. If empty, the main site logo might be used. 🖼️ Ideal size: 400x120px (3.3:1 ratio) - Logo with transparent background',
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
      description: '🖼️ Ideal size: 600x600px (1:1 ratio) - Square portrait photo',
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
      description: '🖼️ Ideal size: 1200x630px (1.91:1 ratio) - For social media sharing. Overrides default image.',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text (Important!)', validation: Rule => Rule.required() }
      ]
    }),

    // --- Additional Features Group ---
    defineField({
      name: 'specialFeatures',
      title: 'Special Features',
      type: 'array',
      group: 'features',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Feature Title', description: 'e.g., Private Dining Room' },
          { name: 'description', type: 'text', title: 'Description', rows: 3 },
          { name: 'capacity', type: 'number', title: 'Capacity (if applicable)' },
          { name: 'image', type: 'image', title: 'Feature Image', options: { hotspot: true } }
        ]
      }],
      description: 'Add special features like function rooms, beer gardens, play areas, etc.'
    }),
    defineField({
      name: 'accessibilityInfo',
      title: 'Accessibility Information',
      type: 'text',
      group: 'features',
      rows: 4,
      description: 'Details about wheelchair access, disabled facilities, etc.'
    }),
    defineField({
      name: 'parkingInfo',
      title: 'Parking Information',
      type: 'text',
      group: 'features',
      rows: 3,
      description: 'Details about on-site parking, nearby parking options, etc.'
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Accepted Payment Methods',
      type: 'array',
      group: 'features',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Cash', value: 'cash' },
          { title: 'Credit/Debit Cards', value: 'cards' },
          { title: 'Contactless', value: 'contactless' },
          { title: 'Apple Pay', value: 'applepay' },
          { title: 'Google Pay', value: 'googlepay' },
          { title: 'Gift Vouchers', value: 'vouchers' }
        ]
      }
    }),

    // --- History & Story ---
    defineField({
      name: 'history',
      title: 'Pub History',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'established', type: 'string', title: 'Established Date', description: 'e.g., 1834 or 18th Century' },
        { name: 'story', type: 'blockContent', title: 'Historical Story' },
        { name: 'historicalImages', type: 'array', of: [{ type: 'image', options: { hotspot: true } }], title: 'Historical Photos' }
      ],
      description: 'Add the pub\'s history and heritage story'
    }),

    // --- Special Offers & Promotions ---
    defineField({
      name: 'currentOffers',
      title: 'Current Offers & Promotions',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Offer Title', validation: Rule => Rule.required() },
          { name: 'description', type: 'text', title: 'Offer Description', rows: 3 },
          { name: 'validFrom', type: 'date', title: 'Valid From' },
          { name: 'validUntil', type: 'date', title: 'Valid Until' },
          { name: 'termsConditions', type: 'text', title: 'Terms & Conditions', rows: 2 },
          { name: 'offerImage', type: 'image', title: 'Offer Image', options: { hotspot: true } }
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'validUntil',
            media: 'offerImage'
          },
          prepare(selection) {
            const { title, subtitle } = selection;
            return {
              ...selection,
              subtitle: subtitle ? `Valid until ${subtitle}` : 'Ongoing'
            }
          }
        }
      }],
      description: 'Add special offers, happy hour details, loyalty programs, etc.'
    }),

    // --- Reviews & Awards ---
    defineField({
      name: 'awards',
      title: 'Awards & Accolades',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Award Title' },
          { name: 'organization', type: 'string', title: 'Awarding Organization' },
          { name: 'year', type: 'string', title: 'Year' },
          { name: 'logo', type: 'image', title: 'Award Logo/Badge', options: { hotspot: true } }
        ]
      }]
    }),
    defineField({
      name: 'reviewLinks',
      title: 'Review Platform Links',
      type: 'object',
      group: 'layout',
      fields: [
        { name: 'tripadvisor', type: 'url', title: 'TripAdvisor URL' },
        { name: 'google', type: 'url', title: 'Google Business URL' },
        { name: 'yelp', type: 'url', title: 'Yelp URL' },
        { name: 'opentable', type: 'url', title: 'OpenTable URL' }
      ]
    }),

    // --- Dietary & Allergen Info ---
    defineField({
      name: 'dietaryOptions',
      title: 'Dietary Options Available',
      type: 'array',
      group: 'features',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vegetarian Options', value: 'vegetarian' },
          { title: 'Vegan Options', value: 'vegan' },
          { title: 'Gluten-Free Options', value: 'glutenfree' },
          { title: 'Dairy-Free Options', value: 'dairyfree' },
          { title: 'Halal Options', value: 'halal' },
          { title: 'Kids Menu', value: 'kids' }
        ]
      }
    }),
    defineField({
      name: 'allergenInfo',
      title: 'Allergen Information',
      type: 'text',
      group: 'features',
      rows: 3,
      description: 'General statement about allergen handling and where to find detailed information'
    }),

    // --- Contact Preferences ---
    defineField({
      name: 'preferredContactMethod',
      title: 'Preferred Contact Method',
      type: 'string',
      group: 'location',
      options: {
        list: [
          { title: 'Phone', value: 'phone' },
          { title: 'Email', value: 'email' },
          { title: 'Online Booking', value: 'booking' },
          { title: 'Social Media', value: 'social' }
        ]
      }
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'location',
      description: 'WhatsApp number for reservations (if different from main phone)'
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