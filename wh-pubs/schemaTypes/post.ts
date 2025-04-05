import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pub', // Changed from 'sites'
      title: 'Associated Pub', // Changed title
      type: 'reference', // Changed from 'array' to single reference
      to: [{ type: 'pub' }], // Reference the 'pub' type
      description: 'Select the pub this post belongs to',
      // Validation removed: Pub reference is now optional
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary of the post that will appear on the homepage'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string'
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string'
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string'
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string'
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button Text',
      type: 'string'
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    }
  }
})