import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2023-05-03', // Use today's date or the date you created your project
  useCdn: false, // Disabled CDN for immediate content updates (no caching delay)
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
      categories,
      pub->{ // Include basic pub info if needed
        name,
        slug
      }
    } | order(publishedAt desc)
  `, params);
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
      "categories": categories[]->title
    }
  `, { slug });
}

// Helper function to get a single pub by slug
export async function getPubBySlug(slug) {
  return client.fetch(`
    *[_type == "pub" && slug.current == $slug][0] {
      name,
      slug,
      location,
      sortOrder,
      squareLogo {
        asset->{
          _id,
          url
        },
        alt
      },
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
      liveResWidgetUrl,
      gallery[] {
        asset->{
          _id,
          url
        },
        alt
      },
      heroImage { asset->{ _id, url }, alt },
      thingsToDoHeroImage { asset->{ _id, url }, alt },
      bookingPageHeroImage { asset->{ _id, url }, alt },
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
      sortOrder,
      squareLogo {
        asset->{
          _id,
          url
        },
        alt
      },
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
      bookingPageHeroImage {
        asset->{
          _id,
          url
        },
        alt
      },
      exteriorImage {
        asset->{
          _id,
          url
        },
        alt
      },
      interiorImage {
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
      liveResWidgetUrl,
      gallery[] {
        asset->{
          _id,
          url
        },
        alt
      },
      heroImage { asset->{ _id, url }, alt }, // Fetch hero image
      thingsToDoHeroImage { asset->{ _id, url }, alt }, // Fetch Things To Do hero image
      heroOverlayText, // Fetch overlay text
      heroOverlayButtonText, // Fetch overlay button text
      heroOverlayButtonLink, // Fetch overlay button link
      // Why Choose Us fields
      whyChooseUs {
        reason1 { title, description, image { asset->{ _id, url } } },
        reason2 { title, description, image { asset->{ _id, url } } },
        reason3 { title, description, image { asset->{ _id, url } } },
        backgroundImage { asset->{ _id, url }, alt }
      },
      signatureDishes {
        sectionLabel,
        title,
        subtitle,
        dishes[] {
          name,
          description,
          price,
          image { asset->{ _id, url }, alt },
          tag,
          pubLocation,
          bookingLink
        }
      },
      // Christmas Menu fields
      christmasMenu {
        enabled,
        title,
        subtitle,
        menuImage { asset->{ _id, url } },
        menuPdf { asset->{ _id, url } },
        menuDetails[] {
          courseType,
          items[] {
            name,
            description,
            price,
            dietary
          }
        },
        pricing {
          adultPrice,
          childPrice,
          additionalInfo
        },
        availability,
        bookingInfo,
        ctaText
      },
      // Layout fields
      logo { asset->{ _id, url }, alt },
      headerNavLinks[]{ title, url },
      footerText,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      colorScheme
    } | order(sortOrder asc, name asc)
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
  // Fetches the homepage document by its specific ID
  return client.fetch(`
    *[_type == "homepage" && _id == "homepage"][0] {
      title,
      heroImages[] { asset->{ _id, url }, alt },
      heroImage { asset->{ _id, url }, alt },
      heroTitle,
      heroSubtitle,
      heroButton1Text,
      heroButton1Link,
      heroButton2Text,
      heroButton2Link,
      welcomeImage1 { asset->{ _id, url }, alt },
      welcomeImage2 { asset->{ _id, url }, alt },
      welcomeImage3 { asset->{ _id, url }, alt },
      welcomeImage4 { asset->{ _id, url }, alt },
      pubHireImage { asset->{ _id, url }, alt },
      whyChooseUs {
        reason1 { title, description, image { asset->{ _id, url } } },
        reason2 { title, description, image { asset->{ _id, url } } },
        reason3 { title, description, image { asset->{ _id, url } } },
        backgroundImage { asset->{ _id, url }, alt }
      },
      signatureDishes {
        sectionLabel,
        title,
        subtitle,
        dishes[] {
          name,
          description,
          price,
          image { asset->{ _id, url }, alt },
          tag,
          pubLocation,
          bookingLink
        }
      }
    }
  `);
}

// Helper function to get site settings
export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      siteTagline,
      logo {
        asset->{
          _id,
          url
        },
        alt
      },
      footerDescription,
      defaultContactLocation,
      defaultContactHours,
      defaultContactPhone,
      socialLinks,
      seo {
        metaDescription,
        ogImage {
          asset->{
            _id,
            url
          }
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
    // Fetch ALL events from all pubs for the main hub
    filter = '';
  }
  
  // Automatically filter out past events - only show events from today onwards
  const today = new Date().toISOString().split('T')[0];
  filter += ` && date >= "${today}"`;
  
  const params = targetPubSlug ? { targetPubSlug } : {};

  return client.fetch(`
    *[_type == "event" ${filter}] {
      _id,
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
      chefProfile {
        name,
        title,
        image { asset->{ _id, url }, alt }
      },
      myJourney {
        heading,
        content[]{ ..., asset-> },
        image { asset->{ _id, url }, alt }
      },
      whatWeDo {
        heading,
        content[]{ ..., asset-> },
        image { asset->{ _id, url }, alt }
      },
      qualitySourcing {
        heading,
        content[]{ ..., asset-> },
        image { asset->{ _id, url }, alt }
      },
      christmasSpecial {
        heading,
        content[]{ ..., asset-> },
        image { asset->{ _id, url }, alt }
      },
      handmadeBurgers {
        heading,
        subheading,
        content[]{ ..., asset-> },
        image1 { asset->{ _id, url }, alt, caption },
        image2 { asset->{ _id, url }, alt, caption },
        highlights
      },
      gallery[] {
        asset->{ _id, url },
        alt,
        caption
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
      },
      "suppliers": *[_type == "suppliersPageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      },
      "giftCards": *[_type == "giftCardsPageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      },
      "bookTable": *[_type == "bookTablePageSettings"][0] {
        title,
        heroImage { asset->{ _id, url }, alt },
        heroTitle,
        heroSubtitle
      }
    }
  `);
}

// Note: getPubBySlug remains useful for the dynamic page generation

// Helper function to get reviews, optionally filtered by pub slug
export async function getReviews(targetPubSlug = null, featured = false) {
  let filter = '';
  const params = {};
  
  if (targetPubSlug) {
    // Fetch reviews matching the specific pub slug
    filter += `&& associatedPub->slug.current == $targetPubSlug`;
    params.targetPubSlug = targetPubSlug;
  } else {
    // Fetch reviews with NO pub reference (general WH Pubs reviews)
    filter += `&& !defined(associatedPub)`;
  }
  
  if (featured) {
    filter += ` && featured == true`;
  }

  return client.fetch(`
    *[_type == "review" ${filter}] {
      _id,
      customerName,
      rating,
      reviewText,
      reviewDate,
      date,
      source,
      featured,
      verified,
      published,
      associatedPub->{ name, slug }
    } | order(featured desc, reviewDate desc, date desc)
  `, params);
}

// Helper function to get ALL reviews across all pubs
export async function getAllReviews(limit = 20) {
  return client.fetch(`
    *[_type == "review" && published != false] {
      _id,
      customerName,
      rating,
      reviewText,
      reviewDate,
      date,
      source,
      featured,
      verified,
      published,
      associatedPub->{ name, slug }
    } | order(featured desc, rating desc, reviewDate desc)[0...${limit}]
  `);
}

// Helper function to get offers, optionally filtered by pub slug
export async function getOffers(targetPubSlug = null, activeOnly = true) {
  let filter = '';
  const params = {};
  
  if (targetPubSlug) {
    // Fetch offers matching the specific pub slug or general offers
    filter += `&& (associatedPub->slug.current == $targetPubSlug || !defined(associatedPub))`;
    params.targetPubSlug = targetPubSlug;
  } else {
    // Fetch offers with NO pub reference (general WH Pubs offers)
    filter += `&& !defined(associatedPub)`;
  }
  
  if (activeOnly) {
    filter += ` && active == true`;
    // Only show offers that are currently valid
    const today = new Date().toISOString().split('T')[0];
    filter += ` && validFrom <= "${today}" && validUntil >= "${today}"`;
  }

  return client.fetch(`
    *[_type == "offer" ${filter}] {
      title,
      slug,
      description,
      details[]{ ..., asset-> },
      offerType,
      discountValue,
      validFrom,
      validUntil,
      daysOfWeek,
      timeRestrictions,
      image { asset->{ _id, url }, alt },
      ctaText,
      ctaLink,
      featured,
      active,
      associatedPub->{ name, slug }
    } | order(featured desc, order asc, validUntil asc)
  `, params);
}

// Helper function to get gift card data
export async function getGiftCardData() {
  return client.fetch(`
    *[_type == "giftCard"][0] {
      title,
      heroTitle,
      heroSubtitle,
      heroImage { asset->{ _id, url }, alt },
      introText[]{ ..., asset-> },
      denominations,
      features[] {
        title,
        description,
        icon
      },
      howItWorks[] {
        stepNumber,
        title,
        description
      },
      termsAndConditions[]{ ..., asset-> },
      purchaseUrl,
      purchaseButtonText,
      checkBalanceUrl,
      faqs[] {
        question,
        answer
      }
    }
  `);
}

// Helper function to get team members
export async function getTeamMembers(targetPubSlug = null, department = null) {
  let filter = '';
  const params = {};
  
  if (targetPubSlug) {
    filter += `&& associatedPub->slug.current == $targetPubSlug`;
    params.targetPubSlug = targetPubSlug;
  }
  
  if (department) {
    filter += ` && department == $department`;
    params.department = department;
  }

  return client.fetch(`
    *[_type == "teamMember" ${filter}] {
      name,
      slug,
      role,
      department,
      bio,
      detailedBio[]{ ..., asset-> },
      image { asset->{ _id, url }, alt },
      yearsOfExperience,
      specialties,
      favoriteQuote,
      funFact,
      featured,
      associatedPub->{ name, slug }
    } | order(featured desc, order asc, name asc)
  `, params);
}

// Helper function to get pub stories
export async function getPubStories(targetPubSlug) {
  if (!targetPubSlug) return [];
  
  return client.fetch(`
    *[_type == "pubStory" && associatedPub->slug.current == $targetPubSlug] {
      title,
      slug,
      storyType,
      summary,
      content[]{ ..., asset-> },
      timeline[] {
        year,
        event,
        image { asset->{ _id, url }, alt }
      },
      featuredImage { asset->{ _id, url }, alt, caption },
      gallery[] {
        asset->{ _id, url },
        alt,
        caption,
        year
      },
      quotes[] {
        quote,
        author,
        role
      },
      featured,
      publishedAt
    } | order(featured desc, publishedAt desc)
  `, { targetPubSlug });
}

// Helper function to get loyalty program data
export async function getLoyaltyProgramData() {
  return client.fetch(`
    *[_type == "loyaltyProgram"][0] {
      title,
      tagline,
      heroImage { asset->{ _id, url }, alt },
      description[]{ ..., asset-> },
      howItWorks[] {
        stepNumber,
        title,
        description,
        icon
      },
      tiers[] {
        name,
        pointsRequired,
        color,
        benefits,
        icon { asset->{ _id, url } }
      },
      earningRules[] {
        action,
        points,
        category
      },
      rewards[] {
        name,
        pointsCost,
        description,
        category,
        featured
      },
      faqs[] {
        question,
        answer
      },
      termsAndConditions[]{ ..., asset-> },
      signUpUrl,
      signUpButtonText,
      loginUrl
    }
  `);
}

// Get about page content (now consolidated in aboutPageSettings)
export async function getAboutContent() {
  return await client.fetch(`
    *[_type == "aboutContent"][0]{
      title,
      mainTitle,
      founderPhoto{
        asset->{
          url,
          metadata
        },
        alt
      },
      ownerPhoto{
        asset->{
          url,
          metadata
        },
        alt
      },
      storyContent,
      showLeadershipSection,
      showCommitmentsSection
    }
  `);
}

// Get pub features ("Come to us for" section)
export async function getPubFeatures(pubSlug) {
  if (!pubSlug) return null;
  const params = { pubSlug };
  return client.fetch(`
    *[_type == "pubFeatures" && pub->slug.current == $pubSlug && active == true][0] {
      title,
      features[] {
        title,
        description,
        image {
          asset->{
            _id,
            url
          },
          alt
        },
        orderNumber
      } | order(orderNumber asc)
    }
  `, params);
}

// Get privacy policy
export async function getPrivacyPolicy(pubSlug = null) {
  let filter = '';
  if (pubSlug) {
    filter = `&& associatedPub->slug.current == $pubSlug`;
  } else {
    filter = `&& !defined(associatedPub)`;
  }
  const params = pubSlug ? { pubSlug } : {};
  
  return client.fetch(`
    *[_type == "privacyPolicy" ${filter} && active == true][0] {
      title,
      lastUpdated,
      content,
      slug
    }
  `, params);
}

// Get detailed menu with sections
export async function getDetailedMenusForPub(targetPubSlug) {
  if (!targetPubSlug) return [];
  const params = { targetPubSlug };
  return client.fetch(`
    *[_type == "menu" && associatedPub->slug.current == $targetPubSlug && active == true] {
      title,
      slug,
      sections[] {
        sectionName,
        sectionDescription,
        items[] {
          name,
          description,
          price,
          dietary,
          available
        }
      },
      notes,
      displayOrder
    } | order(displayOrder asc, title asc)
  `, params);
}

// Helper function to get featured dishes for homepage
export async function getFeaturedDishes() {
  return client.fetch(`
    *[_type == "featuredDishes" && active == true][0] {
      title,
      subtitle,
      dishes[] {
        name,
        description,
        price,
        image {
          asset->{
            _id,
            url
          }
        },
        tag,
        pubLocation
      }
    }
  `);
}

// Helper function to get customer reviews
export async function getCustomerReviews(targetPubSlug = null, limit = 10, featuredOnly = false) {
  let filter = '&& active == true';
  
  if (targetPubSlug) {
    // Fetch reviews for a specific pub
    filter += ` && associatedPub->slug.current == $targetPubSlug`;
  } else {
    // For homepage, get general reviews (no pub association) and featured reviews
    filter += ` && (!defined(associatedPub) || featured == true)`;
  }
  
  if (featuredOnly) {
    filter += ` && featured == true`;
  }
  
  const params = { 
    ...(targetPubSlug && { targetPubSlug }),
    limit
  };

  return client.fetch(`
    *[_type == "customerReview" ${filter}] {
      _id,
      customerName,
      rating,
      reviewText,
      reviewDate,
      associatedPub->{
        name,
        slug
      },
      verified,
      featured,
      source,
      customerLocation
    } | order(featured desc, reviewDate desc, rating desc)[0...$limit]
  `, params);
}

// Helper function to get pub highlights
export async function getPubHighlights(targetPubSlug) {
  if (!targetPubSlug) return null;
  
  const params = { targetPubSlug };
  
  return client.fetch(`
    *[_type == "pubHighlights" && pub->slug.current == $targetPubSlug][0] {
      sectionTitle,
      sectionSubtitle,
      highlights[] {
        title,
        subtitle,
        description,
        badge,
        badgeColor,
        icon,
        ctaText,
        ctaLink,
        image { asset->{ _id, url }, alt },
        active,
        validFrom,
        validUntil
      }[active == true && (!defined(validFrom) || validFrom <= now()) && (!defined(validUntil) || validUntil >= now())],
      statisticsEnabled,
      statistics {
        guestRating,
        happyGuests,
        yearsOfService,
        eventsYearly
      },
      ctaEnabled,
      ctaText,
      ctaLink
    }
  `, params);
}
