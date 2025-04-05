import { createClient } from '@sanity/client'
import type { SanityDocument } from '@sanity/client'

export const client = createClient({
  projectId: 'it7wwto3', // Project ID from sanity.config.ts
  dataset: 'production',
  apiVersion: '2023-05-03', // Use today's date or the date you created your project
  useCdn: true, // Set to false if you want to ensure fresh data
})

// Helper function to get posts for a specific site
export async function getPostsForSite(siteSlug: string): Promise<SanityDocument[]> {
  return client.fetch(`
    *[_type == "post" && references(*[_type == "site" && slug.current == $siteSlug]._id)] {
      title,
      slug,
      mainImage,
      imageAlt,
      publishedAt,
      author,
      authorTitle,
      ctaTitle,
      ctaDescription,
      ctaButton,
      "categories": categories[]->title
    } | order(publishedAt desc)
  `, { siteSlug })
}

// Helper function to get a single post by slug
export async function getPost(slug: string): Promise<SanityDocument> {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      mainImage,
      imageAlt,
      publishedAt,
      author,
      authorTitle,
      ctaTitle,
      ctaDescription,
      ctaButton,
      body,
      "categories": categories[]->title,
      "sites": sites[]->slug.current
    }
  `, { slug })
}

// Helper function to get all sites
export async function getAllSites(): Promise<SanityDocument[]> {
  return client.fetch(`
    *[_type == "site"] {
      title,
      slug,
      description,
      logo,
      address,
      contactEmail,
      contactPhone,
      isMainSite
    } | order(isMainSite desc)
  `)
}