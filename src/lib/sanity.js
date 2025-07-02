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

// Helper function to get the single homepage document (now Main Site Settings)
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
      heroButton2Link,
      // Page hero settings
      pageHeroSettings {
        eventsHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle },
        blogHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle },
        aboutHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle },
        contactHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle },
        careersHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle }
      },
      // Development Kitchen
      developmentKitchen {
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
        gallery[] {
          asset->{ _id, url },
          alt,
          caption
        }
      }
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
// Helper function to get Development Kitchen data (now from Main Site Settings)
export async function getDevelopmentKitchen() {
  return client.fetch(`
    *[_type == "homepage"][0] {
      developmentKitchen {
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
        gallery[] {
          asset->{ _id, url },
          alt,
          caption
        }
      }
    }
  `).then(data => data?.developmentKitchen || null);
}

// Helper function to get page settings (now from Main Site Settings)
export async function getPageSettings(pageName) {
  const data = await client.fetch(`
    *[_type == "homepage"][0] {
      pageHeroSettings {
        eventsHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle },
        blogHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle },
        aboutHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle },
        contactHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle },
        careersHero { heroImage { asset->{ _id, url }, alt }, heroTitle, heroSubtitle }
      }
    }
  `);
  
  // Map the page name to the corresponding hero settings
  const pageMap = {
    'events': data?.pageHeroSettings?.eventsHero,
    'blog': data?.pageHeroSettings?.blogHero,
    'about': data?.pageHeroSettings?.aboutHero,
    'contact': data?.pageHeroSettings?.contactHero,
    'careers': data?.pageHeroSettings?.careersHero
  };
  
  return pageMap[pageName] || null;
}

// Note: getPubBySlug remains useful for the dynamic page generation
