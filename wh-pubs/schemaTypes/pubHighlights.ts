import {defineField, defineType} from 'sanity'
import { StarIcon, CalendarIcon, UtensilsIcon } from '@sanity/icons'

export default defineType({
  name: 'pubHighlights',
  title: 'Pub Highlights',
  type: 'document',
  description: 'Manage the "What\'s On This Week" highlights shown on each pub\'s homepage',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'pub',
      title: 'Pub',
      type: 'reference',
      to: [{ type: 'pub' }],
      validation: (Rule) => Rule.required(),
      description: 'Select which pub these highlights are for'
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'What\'s On This Week',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the highlights section'
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'string',
      initialValue: 'Don\'t miss out on our special offers and events',
      description: 'Subtitle text below the main heading'
    }),
    defineField({
      name: 'highlights',
      title: 'Highlight Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Highlight Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "Tuesday Special", "Live Music Night"'
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "2 Mains for £25", "Local Jazz Trio"'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
              description: 'Brief description of the offer or event'
            }),
            defineField({
              name: 'badge',
              title: 'Badge Text',
              type: 'string',
              description: 'Optional badge text (e.g., "Limited Time", "This Friday", "Chef\'s Pick")'
            }),
            defineField({
              name: 'badgeColor',
              title: 'Badge Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Orange (Limited Time)', value: 'orange' },
                  { title: 'Blue (This Week)', value: 'blue' },
                  { title: 'Green (Chef\'s Pick)', value: 'green' },
                  { title: 'Purple (Special Event)', value: 'purple' },
                  { title: 'Red (Hot Offer)', value: 'red' }
                ]
              },
              initialValue: 'blue'
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: '🎵 Music', value: 'music' },
                  { title: '🍽️ Food Offer', value: 'food' },
                  { title: '🍺 Drinks', value: 'drinks' },
                  { title: '🎉 Event', value: 'event' },
                  { title: '⭐ Special', value: 'star' },
                  { title: '📅 Regular', value: 'calendar' }
                ]
              },
              description: 'Icon to display on the card'
            }),
            defineField({
              name: 'ctaText',
              title: 'Call-to-Action Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Button text (e.g., "Book Now", "View Events", "View Menu")'
            }),
            defineField({
              name: 'ctaLink',
              title: 'Call-to-Action Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Where the button links to (e.g., "/book-a-table-pub", "/events", "/menu")'
            }),
            defineField({
              name: 'image',
              title: 'Background Image (Optional)',
              type: 'image',
              description: 'Background image for this highlight card (optional)',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Describe the image for accessibility'
                }
              ]
            }),
            defineField({
              name: 'active',
              title: 'Active',
              type: 'boolean',
              initialValue: true,
              description: 'Uncheck to temporarily hide this highlight without deleting it'
            }),
            defineField({
              name: 'validFrom',
              title: 'Valid From (Optional)',
              type: 'date',
              description: 'When this highlight should start showing (leave empty for always)'
            }),
            defineField({
              name: 'validUntil',
              title: 'Valid Until (Optional)',
              type: 'date',
              description: 'When this highlight should stop showing (leave empty for always)'
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              active: 'active',
              media: 'image'
            },
            prepare(selection) {
              const { title, subtitle, active } = selection;
              return {
                ...selection,
                title: active ? title : `${title} (Inactive)`,
                subtitle: subtitle
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.max(4).warning('Consider limiting to 3-4 highlights for best display'),
      description: 'Add up to 4 highlight cards to showcase current offers and events'
    }),
    defineField({
      name: 'statisticsEnabled',
      title: 'Show Statistics Bar',
      type: 'boolean',
      initialValue: true,
      description: 'Show/hide the statistics section below the highlights'
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'object',
      fields: [
        defineField({
          name: 'guestRating',
          title: 'Guest Rating',
          type: 'string',
          initialValue: '4.5',
          description: 'Average rating (e.g., "4.5")'
        }),
        defineField({
          name: 'happyGuests',
          title: 'Happy Guests',
          type: 'string',
          initialValue: '2,500+',
          description: 'Number of happy guests (e.g., "2,500+")'
        }),
        defineField({
          name: 'yearsOfService',
          title: 'Years of Service',
          type: 'string',
          initialValue: '15',
          description: 'Years in service (e.g., "15")'
        }),
        defineField({
          name: 'eventsYearly',
          title: 'Events Per Year',
          type: 'string',
          initialValue: '50+',
          description: 'Events per year (e.g., "50+")'
        })
      ],
      hidden: ({ document }) => !document?.statisticsEnabled
    }),
    defineField({
      name: 'ctaEnabled',
      title: 'Show Main Call-to-Action',
      type: 'boolean',
      initialValue: true,
      description: 'Show/hide the main "Book Your Table Today" button'
    }),
    defineField({
      name: 'ctaText',
      title: 'Main CTA Text',
      type: 'string',
      initialValue: 'Book Your Table Today',
      description: 'Text for the main call-to-action button',
      hidden: ({ document }) => !document?.ctaEnabled
    }),
    defineField({
      name: 'ctaLink',
      title: 'Main CTA Link',
      type: 'string',
      initialValue: '/book-a-table-pub',
      description: 'Link for the main call-to-action button',
      hidden: ({ document }) => !document?.ctaEnabled
    })
  ],
  preview: {
    select: {
      title: 'pub.name',
      sectionTitle: 'sectionTitle',
      highlightCount: 'highlights'
    },
    prepare(selection) {
      const { title, sectionTitle, highlightCount } = selection;
      const count = Array.isArray(highlightCount) ? highlightCount.length : 0;
      return {
        title: title ? `Highlights - ${title}` : 'Pub Highlights',
        subtitle: `${sectionTitle} (${count} highlights)`
      }
    }
  }
})