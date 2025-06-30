import {defineField, defineType} from 'sanity'
import {CalendarIcon} from 'lucide-react' // Example Icon

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub (Optional)',
      type: 'reference',
      to: [{type: 'pub'}],
      description: 'Select the pub hosting this event. Leave blank for general WH Pubs events.',
      // Make optional by removing validation: Rule => Rule.required()
    }),
     defineField({
      name: 'locationOverride',
      title: 'Location Override (Optional)',
      type: 'string',
      description: 'If the event isn\'t at the pub itself, specify the location here (e.g., "Village Hall"). Overrides pub location display.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent', // Use rich text for details
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {hotspot: true},
       fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alternative Text', validation: Rule => Rule.required() })
      ],
      // Make image optional if needed
    }),
    defineField({
        name: 'bookingUrl',
        title: 'Booking/Info Link (Optional)',
        type: 'url',
        description: 'Link to buy tickets or get more info.'
    }),
    // Add other fields like 'price', 'eventType', etc.
  ],
  preview: {
    select: {
      title: 'title',
      pubName: 'associatedPub.name',
      date: 'date',
      media: 'image',
    },
    prepare(selection) {
      const {title, pubName, date} = selection
      const dateFormatted = date ? new Date(date).toLocaleDateString('en-GB') : 'No date';
      const subtitle = pubName ? `${pubName} - ${dateFormatted}` : `General Event - ${dateFormatted}`;
      return { ...selection, title: title, subtitle: subtitle }
    },
  },
})