import { getPubs, getPosts, getEvents, getMenusForPub } from './sanity';

export async function generateSearchData() {
  try {
    // Fetch all content
    const [pubs, posts, events, menus] = await Promise.all([
      getPubs(),
      getPosts(),
      getEvents(),
      getMenusForPub()
    ]);

    const searchData = [];

    // Add pubs
    pubs.forEach(pub => {
      searchData.push({
        title: pub.name,
        description: pub.description,
        url: pub.externalDomain || `/${pub.slug.current}`,
        type: 'pub',
        image: pub.image?.asset?.url,
        location: pub.locationName || pub.location
      });
    });

    // Add blog posts
    posts.forEach(post => {
      searchData.push({
        title: post.title,
        description: post.excerpt,
        url: `/blog/${post.slug.current}`,
        type: 'blog',
        image: post.mainImage?.asset?.url,
        date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : null
      });
    });

    // Add events
    events.forEach(event => {
      searchData.push({
        title: event.title,
        description: event.description,
        url: `/events#${event.slug?.current || event.title.toLowerCase().replace(/\s+/g, '-')}`,
        type: 'event',
        image: event.image?.asset?.url,
        date: event.date ? new Date(event.date).toLocaleDateString() : null,
        location: event.location
      });
    });

    // Add menus
    menus.forEach(menu => {
      if (menu.sections && Array.isArray(menu.sections)) {
        menu.sections.forEach(section => {
          if (section.items && Array.isArray(section.items)) {
            section.items.forEach(item => {
              searchData.push({
                title: item.name,
                description: item.description,
                url: menu.associatedPub ? `/${menu.associatedPub.slug.current}/menu` : '/menu',
                type: 'menu',
                location: menu.associatedPub?.name
              });
            });
          }
        });
      }
    });

    // Add static pages
    const staticPages = [
      { title: 'About Us', url: '/about', description: 'Learn about WH Pubs and our story' },
      { title: 'Contact', url: '/contact', description: 'Get in touch with us' },
      { title: 'Careers', url: '/careers', description: 'Join our team' },
      { title: 'Development Kitchen', url: '/development-kitchen', description: 'Our culinary innovation center' },
      { title: 'Things To Do', url: '/things-to-do', description: 'Discover activities near our pubs' },
      { title: 'Find a Pub', url: '/find-a-pub', description: 'Locate your nearest WH pub' }
    ];

    staticPages.forEach(page => {
      searchData.push({
        ...page,
        type: 'page'
      });
    });

    return searchData;
  } catch (error) {
    console.error('Error generating search data:', error);
    return [];
  }
}