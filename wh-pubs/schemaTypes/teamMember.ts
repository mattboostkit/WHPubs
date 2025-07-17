import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
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
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Management', value: 'management'},
          {title: 'Kitchen', value: 'kitchen'},
          {title: 'Front of House', value: 'front-of-house'},
          {title: 'Bar', value: 'bar'},
          {title: 'Events', value: 'events'},
          {title: 'Head Office', value: 'head-office'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      description: 'Short biography or description of the team member',
    }),
    defineField({
      name: 'detailedBio',
      title: 'Detailed Biography',
      type: 'blockContent',
      description: 'Full biography with rich text formatting',
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of specialties or skills',
    }),
    defineField({
      name: 'favoriteQuote',
      title: 'Favorite Quote',
      type: 'string',
      description: 'An inspirational quote or motto',
    }),
    defineField({
      name: 'funFact',
      title: 'Fun Fact',
      type: 'string',
      description: 'A fun or interesting fact about the team member',
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{type: 'pub'}],
      description: 'Leave empty for head office or multi-location staff',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Team Member',
      type: 'boolean',
      description: 'Show this team member prominently',
      initialValue: false,
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
      title: 'name',
      subtitle: 'role',
      media: 'image',
      pubName: 'associatedPub.name',
      department: 'department',
    },
    prepare(selection) {
      const {title, subtitle, media, pubName, department} = selection
      const deptNames = {
        'management': 'Management',
        'kitchen': 'Kitchen',
        'front-of-house': 'Front of House',
        'bar': 'Bar',
        'events': 'Events',
        'head-office': 'Head Office',
      };
      return {
        title,
        subtitle: `${subtitle}${pubName ? ` at ${pubName}` : ''} (${deptNames[department] || department})`,
        media,
      }
    },
  },
})