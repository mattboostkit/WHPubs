import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03', // Use today's date or the date you created your project
  useCdn: true, // Enable CDN for faster content updates (may have slight delay)
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
      heroImage { asset->{ _id, url }, alt },
      heroOverlayText, // Fetch overlay text
      heroOverlayButtonText, // Fetch overlay button text
      heroOverlayButtonLink, // Fetch overlay button link
      carouselImages[] {
        asset->{ _id, url },
        alt,
        caption,
        buttonText,
        buttonLink
      },
      // Layout fields
      logo { asset->{ _id, url }, alt },
      headerNavLinks[]{ title, url },
      footerText,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      colorScheme,
      googleMapEmbed->{ iframe }
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
      locationName,
      addressLine1,
      postcode,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      heroImage {
        asset->{
          _id,
          url
        },
        alt
      },
      description,
      url,
      externalDomain,
      featured,
      amenities,
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
      heroImage { asset->{ _id, url }, alt }, // Fetch hero image
      heroOverlayText, // Fetch overlay text
      heroOverlayButtonText, // Fetch overlay button text
      heroOverlayButtonLink, // Fetch overlay button link
      // Layout fields
      logo { asset->{ _id, url }, alt },
      headerNavLinks[]{ title, url },
      footerText,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      colorScheme
    } | order(featured desc, name asc)
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

// Helper function to get all career opportunities
export async function getAllCareers() {
  return client.fetch(`
    *[_type == "career"] {
      position,
      location,
      roleRequirements[]{ ..., asset-> }, // Fetch full block content
      salary,
      applyUrl
    } | order(position asc) // Order alphabetically by position title
  `);
}

// Helper function to get the single homepage document
export async function getHomepageData() {
  // Fetches the first document of type 'homepage'. Assumes only one exists.
  return client.fetch(`
    *[_type == "homepage"][0] {
      title,
      heroImages[] { asset->{ _id, url }, alt },
      heroImage { asset->{ _id, url }, alt },
      heroTitle,
      heroSubtitle,
      heroButton1Text,
      heroButton1Link,
      heroButton2Text,
      heroButton2Link
    }
  `);
}

// Helper function to get events, optionally filtered by pub slug
export async function getEvents(targetPubSlug = null) {
  let filter = '';
  if (targetPubSlug) {
    // Fetch events matching the specific pub slug
    filter = `&& associatedPub->slug.current == $targetPubSlug`;
  } else {
    // Fetch events with NO pub reference (general WH Pubs events)
    filter = `&& !defined(associatedPub)`;
  }
  const params = targetPubSlug ? { targetPubSlug } : {};

  return client.fetch(`
    *[_type == "event" ${filter}] {
      title,
      slug,
      date,
      description[]{ ..., asset-> }, // Fetch full block content
      image { asset->{ _id, url }, alt },
      bookingUrl,
      locationOverride,
      associatedPub->{ name, slug } // Include basic pub info if needed
    } | order(date asc) // Order by event date
  `, params);
}
// Helper function to get Development Kitchen data
export async function getDevelopmentKitchen() {
  return client.fetch(`
    *[_type == "developmentKitchen"][0] {
      title,
      heroImage { asset->{ _id, url }, alt },
      introText[]{ ..., asset-> },
      chefProfile {
        name,
        title,
        bio[]{ ..., asset-> },
        image { asset->{ _id, url }, alt }
      },
      philosophy {
        heading,
        content[]{ ..., asset-> }
      },
      process[] {
        stepNumber,
        title,
        description,
        image { asset->{ _id, url }, alt }
      },
      innovations[] {
        dishName,
        description,
        season,
        image { asset->{ _id, url }, alt },
        availableAt[]->{ name, slug }
      },
      gallery[] {
        asset->{ _id, url },
        alt,
        caption,
        category
      },
      suppliers[] {
        name,
        description,
        location,
        logo { asset->{ _id, url }, alt },
        website
      },
      seasonalFocus {
        season,
        theme,
        description[]{ ..., asset-> },
        featuredIngredients
      },
      seo {
        metaTitle,
        metaDescription,
        ogImage { asset->{ _id, url } }
      }
    }
  `);
}

// Helper function to get things to do, optionally filtered by pub slug
export async function getThingsToDo(targetPubSlug = null) {
  let filter = '';
  const params = {};
  
  if (targetPubSlug) {
    // Fetch activities matching the specific pub slug
    filter = `&& associatedPub->slug.current == $targetPubSlug`;
    params.targetPubSlug = targetPubSlug;
  }
  // If no targetPubSlug, fetch ALL activities (not just those without pub reference)

  return client.fetch(`
    *[_type == "thingsToDo" ${filter}] {
      title,
      slug,
      category,
      locationDetails,
      duration,
      distance,
      difficulty,
      description[]{ ..., asset-> },
      image { asset->{ _id, url }, alt },
      externalLink,
      associatedPub->{ name, slug }
    } | order(order asc, title asc)
  `, params);
}

// Helper function to get page settings
export async function getPageSettings(pageName = null) {
  if (pageName) {
    return client.fetch(`
      *[_type == "${pageName}PageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      }
    `);
  }
  
  // Fetch all page settings
  return client.fetch(`
    {
      "events": *[_type == "eventsPageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      },
      "blog": *[_type == "blogPageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      },
      "about": *[_type == "aboutPageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      },
      "contact": *[_type == "contactPageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      },
      "careers": *[_type == "careersPageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      },
      "thingsToDo": *[_type == "thingsToDoPageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      },
      "pubFinder": *[_type == "pubFinderPageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      }
    }
  `);
}

// Note: getPubBySlug remains useful for the dynamic page generation
