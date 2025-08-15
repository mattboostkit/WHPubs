// Schema extension for pub Things To Do hero images
// Add this field to the pub schema to enable pub-specific Things To Do backgrounds

export const pubThingsToDoImageField = {
  name: 'thingsToDoHeroImage',
  type: 'image',
  title: '🎯 Things To Do Page Hero Image (1920x768px)',
  description: 'Hero image specifically for the Things To Do page of this pub. Should show local scenery or activities.',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for accessibility and SEO',
      validation: Rule => Rule.required().error('Alt text is required for accessibility')
    }
  ],
  options: {
    hotspot: true,
    metadata: ['dimensions', 'palette']
  },
  validation: Rule => Rule.custom((value, context) => {
    if (!value) {
      return 'Please upload a Things To Do hero image (1920x768px recommended)'
    }
    return true
  }).warning()
}

// Instructions for adding to pub schema:
// In wh-pubs/schemaTypes/pub.ts, add this field after the heroImage field:
/*
{
  name: 'thingsToDoHeroImage',
  type: 'image',
  title: '🎯 Things To Do Page Hero Image (1920x768px)',
  description: 'Hero image specifically for the Things To Do page of this pub. Should show local scenery or activities.',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: Rule => Rule.required()
    }
  ],
  options: {
    hotspot: true
  }
}
*/