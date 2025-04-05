import {defineField, defineType} from 'sanity'
import {MenuSquareIcon} from 'lucide-react' // Using an icon from lucide-react

export default defineType({
  name: 'menu',
  title: 'Pub Menu',
  type: 'document',
  icon: MenuSquareIcon, // Assign an icon in the Studio
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      description: 'e.g., "Main Menu", "Drinks Menu", "Sunday Lunch"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'associatedPub',
      title: 'Associated Pub',
      type: 'reference',
      to: [{type: 'pub'}],
      description: 'The pub this menu belongs to.',
      validation: (Rule) => Rule.required(),
      // Make it read-only if needed, or add filtering based on user roles
    }),
    defineField({
      name: 'menuContent',
      title: 'Menu Content',
      type: 'blockContent', // Use the existing blockContent schema for rich text editing
      description: 'Design the menu layout here using headings, text, lists, etc.',
    }),
    defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'title', // Use the menu title as the source
            maxLength: 96,
            // isUnique can be added later if needed to ensure uniqueness per pub
        },
        description: 'A unique identifier for this menu (e.g., main-menu, drinks-menu)',
        validation: Rule => Rule.required()
    }),
    // Add other fields if needed, like 'active', 'displayOrder', etc.
  ],
  preview: {
    select: {
      title: 'title',
      pubName: 'associatedPub.name', // Show the pub name in the preview
    },
    prepare(selection) {
      const {title, pubName} = selection
      return {
        title: `${title} (${pubName || 'No Pub Assigned'})`,
      }
    },
  },
})