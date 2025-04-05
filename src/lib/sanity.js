import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03', // Use today's date or the date you created your project
  useCdn: false, // Set to false to ensure fresh data
});

// Helper function to get posts, optionally filtered by pub slug
export async function getPosts(targetPubSlug = null) {
  let filter = '';
  if (targetPubSlug) {
    // Fetch posts matching the specific pub slug
    filter = `&& pub->slug.current == $targetPubSlug`;
  } else {
    // Fetch posts with NO pub reference (general WH Pubs posts)
    filter = `&& !defined(pub)`;
  }
  // Removed the stray line causing the syntax error
  const params = targetPubSlug ? { targetPubSlug } : {};

  return client.fetch(`
    *[_type == "post" ${filter}] {
      title,
      slug,
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      imageAlt,
      publishedAt,
      author,
      authorTitle,
      ctaTitle,
      ctaDescription,
      ctaButton,
      "categories": categories[]->title,
      pub->{ // Include basic pub info if needed
        name,
        slug
      }
    } | order(publishedAt desc)
  `, params);
}

// Helper function to get posts for a specific site
export async function getPostsForSite(siteSlug) {
  return client.fetch(`
    *[_type == "post" && references(*[_type == "site" && slug.current == $siteSlug]._id)] {
      title,
      slug,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      imageAlt,
      publishedAt,
      author,
      authorTitle,
      ctaTitle,
      ctaDescription,
      ctaButton,
      "categories": categories[]->title
    } | order(publishedAt desc)
  `, { siteSlug });
}

// Helper function to get a single post by slug
export async function getPost(slug) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      imageAlt,
      publishedAt,
      author,
      authorTitle,
      ctaTitle,
      ctaDescription,
      ctaButton,
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      },
      "categories": categories[]->title,
      "sites": sites[]->slug.current
    }
  `, { slug });
}

// Helper function to get all sites
export async function getAllSites() {
  return client.fetch(`
    *[_type == "site"] {
      title,
      slug,
      description,
      logo {
        asset->{
          _id,
          url
        }
      },
      address,
      contactEmail,
      contactPhone,
      isMainSite
    } | order(isMainSite desc)
  `);
}

// Helper function to get a single pub by slug
export async function getPubBySlug(slug) {
  return client.fetch(`
    *[_type == "pub" && slug.current == $slug][0] {
      name,
      slug,
      location,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      description,
      url,
      openingHours,
      contactPhone,
      foodServingTimes,
      reservationsUrl,
      gallery[] {
        asset->{
          _id,
          url
        },
        alt
      },
      // Layout fields
      logo { asset->{ _id, url }, alt },
      headerNavLinks[]{ title, url },
      footerText,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      colorScheme // Fetch color scheme
    }
  `, { slug });
}

// Helper function to get pubs, optionally filtered by slug
export async function getPubs(targetPubSlug = null) {
  const filter = targetPubSlug
    ? `&& slug.current == $targetPubSlug` // Filter by slug if provided
    : ''; // No filter if no slug provided
  const params = targetPubSlug ? { targetPubSlug } : {};

  return client.fetch(`
    *[_type == "pub" ${filter}] {
      name,
      slug,
      location,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      description,
      url,
      // Include other fields needed for listing or single page
      openingHours,
      contactPhone,
      foodServingTimes,
      reservationsUrl,
      gallery[] {
        asset->{
          _id,
          url
        },
        alt
      },
      // Layout fields
      logo { asset->{ _id, url }, alt },
      headerNavLinks[]{ title, url },
      footerText,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      colorScheme // Fetch color scheme
    } | order(name asc)
  `, params);
}

// Helper function to get menus for a specific pub slug
export async function getMenusForPub(targetPubSlug) {
  if (!targetPubSlug) return []; // Return empty if no slug provided
  const params = { targetPubSlug };
  return client.fetch(`
    *[_type == "menu" && associatedPub->slug.current == $targetPubSlug] {
      title,
      slug,
      menuContent[]{ ..., asset-> } // Fetch full block content, resolving image assets
    } | order(title asc) // Or order by a custom 'order' field if added
  `, params);
}
// Note: getPubBySlug remains useful for the dynamic page generation
