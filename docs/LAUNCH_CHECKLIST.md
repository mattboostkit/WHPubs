# WH Pubs Launch Checklist

## 🚀 Pre-Launch Tasks

### 1. Content Updates in Sanity

#### Main Site Content
- [ ] **Homepage Hero Images** - Upload 1-4 high-quality hero carousel images (1920x1080px)
- [ ] **Development Kitchen** - Review and finalize all content, chef profile, innovations, and suppliers
- [ ] **About Page** - Add hero image (1920x768px) and finalize content
- [ ] **Contact Page** - Verify all pub contact details, addresses, phone numbers, and emails
- [ ] **Blog Posts** - Review existing posts and add any launch announcements
- [ ] **Events** - Add upcoming events for all pubs

#### Things To Do Content
- [ ] **Replace Google Map iframes** for each pub on Contact page (currently using Little Brown Jug as template)
  - The Chaser Inn iframe
  - The Cricketers Inn iframe  
  - The Rose and Crown iframe
  - The Bull iframe
- [ ] **Add images** for all Things To Do activities (1200x800px recommended)
- [ ] **Review activity descriptions** and add any additional walks/attractions

#### Join Our Crew (Careers)
- [ ] **Review apprenticeship listings** and update contact details if needed
- [ ] **Add any additional job openings**
- [ ] **Verify application email addresses** are correct

### 2. Individual Pub Sites

#### For Each Pub (The Bull, The Chaser Inn, The Cricketers Inn, The Little Brown Jug, The Rose & Crown):
- [ ] **Hero Images** - Upload pub-specific hero banner (1920x800px) or carousel images
- [ ] **Gallery Images** - Add high-quality gallery photos (1000x1000px square recommended)
- [ ] **Menus** - Create and link current food and drinks menus
- [ ] **Opening Hours** - Verify and update all opening times
- [ ] **Food Serving Times** - Add breakfast, lunch, and dinner service times
- [ ] **Events** - Add pub-specific events
- [ ] **Google Map Embed** - Add/verify Google Business iframe for each pub location
- [ ] **Social Media Links** - Add Facebook, Instagram, Twitter URLs
- [ ] **Reservation URLs** - Add booking system links (OpenTable, Resy, etc.)

### 3. Technical Setup

#### Domain Configuration
- [ ] **Purchase/configure custom domains** for each pub (if not using Netlify subdomains)
- [ ] **Update DNS settings** to point to Netlify
- [ ] **SSL certificates** - Ensure HTTPS is working for all domains
- [ ] **Update pub URLs** in `/src/lib/pub-urls.js` with final domains

#### Netlify Deployments
- [ ] **Create separate Netlify sites** for each pub with `TARGET_PUB_SLUG` environment variable:
  - `TARGET_PUB_SLUG=the-bull`
  - `TARGET_PUB_SLUG=the-chaser-inn`
  - `TARGET_PUB_SLUG=the-cricketers-inn`
  - `TARGET_PUB_SLUG=the-little-brown-jug`
  - `TARGET_PUB_SLUG=the-rose-and-crown`
- [ ] **Configure build settings** for each site
- [ ] **Add environment variables** to each Netlify site:
  - `SANITY_PROJECT_ID=it7wwto3`
  - `SANITY_DATASET=production`
  - `GA_MEASUREMENT_ID` (if using Google Analytics)

### 4. SEO & Analytics

- [ ] **Google Analytics** - Set up GA4 property and add measurement ID to environment variables
- [ ] **Google Search Console** - Verify all domains
- [ ] **Sitemaps** - Ensure sitemaps are generated and submitted
- [ ] **Meta descriptions** - Review and optimize for all pages
- [ ] **Open Graph images** - Add social sharing images for all pages

### 5. Final Testing

#### Functionality Testing
- [ ] **Navigation** - Test all menu links on desktop and mobile
- [ ] **Forms** - Test contact form submission
- [ ] **External links** - Verify all external URLs work correctly
- [ ] **Image loading** - Check all images load with proper fallbacks
- [ ] **Responsive design** - Test on various devices and screen sizes
- [ ] **Cross-browser** - Test on Chrome, Firefox, Safari, Edge

#### Content Review
- [ ] **Spelling & grammar** check across all pages
- [ ] **Consistent branding** - Verify colors, fonts, and styling
- [ ] **Legal pages** - Add privacy policy, terms of service if needed
- [ ] **404 page** - Ensure custom 404 page works

### 6. Performance & Optimization

- [ ] **Image optimization** - Ensure all images are properly sized and compressed
- [ ] **Lighthouse audit** - Run performance tests and address any issues
- [ ] **Loading speed** - Test page load times
- [ ] **Mobile performance** - Specific testing for mobile load times

### 7. Backup & Documentation

- [ ] **Backup Sanity data** - Export content backup
- [ ] **Document API keys** and environment variables
- [ ] **Create admin guide** for content management
- [ ] **Set up monitoring** - Uptime monitoring for all sites

## 📋 Post-Launch Tasks

- [ ] **Monitor analytics** for first week
- [ ] **Check for broken links** using tools like Screaming Frog
- [ ] **Gather feedback** from staff and customers
- [ ] **Set up regular content update schedule**
- [ ] **Plan first blog posts** announcing the new sites
- [ ] **Social media announcement** across all channels

## 🔑 Important URLs

### Sanity Studio
- **Production**: https://whpubs.sanity.studio
- **Local Dev**: http://localhost:3333

### Current Deployments
- **Main Hub**: https://whpubsadmin.netlify.app
- **The Bull**: [To be configured]
- **The Chaser Inn**: [To be configured]
- **The Cricketers Inn**: [To be configured]
- **The Little Brown Jug**: [To be configured]
- **The Rose & Crown**: [To be configured]

## 📞 Support Contacts

- **Sanity Support**: https://www.sanity.io/contact/support
- **Netlify Support**: https://www.netlify.com/support/
- **GitHub Issues**: https://github.com/mattboostkit/WHPubs/issues

---

Last updated: January 2, 2025