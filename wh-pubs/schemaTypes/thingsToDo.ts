import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'thingsToDo',
  title: 'Things To Do',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Walks', value: 'walks'},
          {title: 'Markets', value: 'markets'},
          {title: 'Local Attractions', value: 'attractions'},
          {title: 'Family Activities', value: 'family'},
          {title: 'Seasonal Events', value: 'seasonal'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{type: 'pub'}],
      description: 'Leave empty for general activities',
    }),
    defineField({
      name: 'locationDetails',
      title: 'Location Details',
      type: 'string',
      description: 'Specific location information (e.g., "Starting from pub car park")',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'How long the activity takes (e.g., "2 hours", "Every Thursday 9am-11am")',
    }),
    defineField({
      name: 'distance',
      title: 'Distance',
      type: 'string',
      description: 'For walks: distance in miles (e.g., "3.5 miles")',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Easy', value: 'easy'},
          {title: 'Moderate', value: 'moderate'},
          {title: 'Challenging', value: 'challenging'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Recommended size: 1200 x 800 pixels',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to external website for more information',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      pubName: 'associatedPub.name',
      media: 'image',
    },
    prepare(selection) {
      const {title, category, pubName} = selection
      const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : ''
      return {
        title,
        subtitle: pubName ? `${categoryLabel} - ${pubName}` : categoryLabel,
        media: selection.media,
      }
    },
  },
})