import {defineField, defineType} from 'sanity'
import {BriefcaseBusinessIcon} from 'lucide-react' // Example Icon

export default defineType({
  name: 'career',
  title: 'Career Opportunity',
  type: 'document',
  icon: BriefcaseBusinessIcon,
  fields: [
    defineField({
      name: 'position',
      title: 'Position Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "The Little Brown Jug, Chiddingstone Causeway" or "Multiple Locations"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roleRequirements',
      title: 'Role / Requirements',
      type: 'blockContent', // Use block content for rich text formatting
      description: 'Detailed description of the role and requirements.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'salary',
      title: 'Salary / Compensation',
      type: 'string',
      description: 'e.g., "Competitive", "£X per hour", "£Y per year"',
    }),
    defineField({
      name: 'applyUrl', // Changed from button to URL for simplicity
      title: 'Application Link or Email',
      type: 'url',
      description: 'URL to an external application form OR a mailto: link (e.g., mailto:careers@whpubs.co.uk)',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https', 'mailto']
      })
    }),
    // Optional: Add fields like 'closingDate', 'jobType' (Full-time/Part-time)
  ],
  preview: {
    select: {
      title: 'position',
      subtitle: 'location',
    },
  },
})