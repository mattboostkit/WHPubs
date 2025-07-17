import { getPubs, getPosts, getEvents } from '../lib/sanity';

export async function get() {
  const siteUrl = 'https://whpubs.com';
  
  // Fetch dynamic content
  const [pubs, posts, events] = await Promise.all([
    getPubs(),
    getPosts(),
    getEvents()
  ]);

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/our-pubs',
    '/development-kitchen',
    '/events',
    '/blog',
    '/things-to-do',
    '/gift-cards',
    '/rewards',
    '/contact',
    '/careers'
  ];

  // Generate sitemap entries
  const sitemapEntries = [];

  // Add static pages
  staticPages.forEach(page => {
    sitemapEntries.push({
      url: `${siteUrl}${page}`,
      changefreq: 'weekly',
      priority: page === '' ? 1.0 : 0.8
    });
  });

  // Add pub pages
  pubs.forEach(pub => {
    sitemapEntries.push({
      url: `${siteUrl}/${pub.slug.current}`,
      changefreq: 'weekly',
      priority: 0.9
    });
  });

  // Add blog posts
  posts.forEach(post => {
    sitemapEntries.push({
      url: `${siteUrl}/blog/${post.slug.current}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: post.publishedAt
    });
  });

  // Add event pages
  events.forEach(event => {
    sitemapEntries.push({
      url: `${siteUrl}/events/${event.slug.current}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: event.date
    });
  });

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
    ${entry.lastmod ? `<lastmod>${new Date(entry.lastmod).toISOString()}</lastmod>` : ''}
  </url>
`).join('')}
</urlset>`;

  return {
    body: sitemap,
    headers: {
      'Content-Type': 'application/xml'
    }
  };
}