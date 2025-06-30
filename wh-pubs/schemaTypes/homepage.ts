import {defineField, defineType} from 'sanity'
import {HomeIcon} from 'lucide-react' // Example Icon

export default defineType({
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to make this a singleton document
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title (for SEO)',
      type: 'string',
      description: 'Used for the browser tab title and search results.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Carousel Images',
      type: 'array',
      description: 'Add up to 4 images for the homepage carousel. Images will auto-rotate. Recommended size: 1920x1080px',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          defineField({ 
            name: 'alt', 
            type: 'string', 
            title: 'Alternative Text',
            description: 'Describe the image for screen readers',
            validation: Rule => Rule.required().error('Alt text is required for accessibility') 
          })
        ]
      }],
      validation: (Rule) => Rule.required().min(1).max(4).error('Please upload 1-4 hero images'),
    }),
    // Keep old single image for backwards compatibility
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image (Legacy - Use Hero Carousel Images instead)',
      type: 'image',
      hidden: true,
      options: {hotspot: true},
      fields: [
        defineField({ 
          name: 'alt', 
          type: 'string', 
          title: 'Alternative Text',
        })
      ],
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'The main heading in the hero section (e.g., "WH Pubs").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'The text below the main hero heading.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'heroButton1Text',
        title: 'Hero Button 1 Text',
        type: 'string',
        description: 'e.g., "View Our Pubs"',
        initialValue: 'View Our Pubs',
    }),
     defineField({
        name: 'heroButton1Link',
        title: 'Hero Button 1 Link',
        type: 'string',
        description: 'Internal link for button 1 (e.g., "/#establishments")',
        initialValue: '/#establishments',
    }),
     defineField({
        name: 'heroButton2Text',
        title: 'Hero Button 2 Text',
        type: 'string',
        description: 'e.g., "Book a Table"',
         initialValue: 'Book a Table',
    }),
     defineField({
        name: 'heroButton2Link',
        title: 'Hero Button 2 Link',
        type: 'string',
        description: 'Internal link for button 2 (e.g., "/book")',
        initialValue: '/book',
    }),
    // Add fields for other sections if needed (Features, Newsletter)
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
     prepare(selection) {
       return { ...selection, subtitle: 'Homepage Content' }
     }
  }
})