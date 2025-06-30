import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    author: z.string(),
    authorTitle: z.string(),
    ctaTitle: z.string(),
    ctaDescription: z.string(),
    ctaButton: z.string(),
  }),
});

const events = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    image: z.string(),
    description: z.string(),
    location: z.string(),
  }),
});

const pubs = defineCollection({
  schema: z.object({
    name: z.string(),
    location: z.string(),
    image: z.string(),
    description: z.string(),
    url: z.string(),
  }),
});

export const collections = {
  blog,
  events,
  pubs,
};