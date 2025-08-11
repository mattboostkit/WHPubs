# WH Pubs - Client Handover Checklist

## ✅ Recently Completed
- [x] Fixed booking section repetition on homepage
- [x] Standardized pub card image styling with rounded corners
- [x] Aligned all buttons consistently across pub cards
- [x] Removed all icons from buttons for universal look
- [x] Standardized button styling across entire site (colors, padding, font sizes)

## 🎨 Design & Styling
- [ ] **Mobile Responsiveness** - Test all pages on mobile devices
- [ ] **Cross-browser Testing** - Verify compatibility with Chrome, Safari, Firefox, Edge
- [ ] **Image Optimization** - Ensure all images are optimized for web
- [ ] **Accessibility** - Check WCAG compliance, alt texts, keyboard navigation

## 🔧 Functionality Testing

### Forms & Submissions
- [ ] **Newsletter Signup** - Test form submission and Netlify integration
- [ ] **Contact Form** - Verify submissions are received correctly
- [ ] **Booking Widget** - Test LiveRes booking functionality
- [ ] **Career Applications** - Verify job application forms work

### External Integrations
- [ ] **Sanity CMS** - Verify all content displays correctly
- [ ] **Google Analytics** - Confirm tracking is working (if GA_MEASUREMENT_ID is set)
- [ ] **External Pub Links** - Test all pub external domain links
- [ ] **Social Media Links** - Verify all social links in footer

## 📱 Individual Pub Sites
- [ ] **The Bull (Otford)** - Test TARGET_PUB_SLUG=the-bull-otford build
- [ ] **The Chaser Inn** - Test TARGET_PUB_SLUG=the-chaser-inn build
- [ ] **The Crown** - Test TARGET_PUB_SLUG=the-crown build
- [ ] **The Halfway House** - Test TARGET_PUB_SLUG=the-halfway-house build
- [ ] **The Rising Sun** - Test TARGET_PUB_SLUG=the-rising-sun build

## 📄 Content & Legal
- [ ] **Privacy Policy** - Verify display and content accuracy
- [ ] **Terms & Conditions** - Check if needed
- [ ] **Cookie Policy** - Ensure compliance with UK regulations
- [ ] **Menu PDFs** - Verify all menu downloads work
- [ ] **Image Rights** - Confirm all images have proper licensing

## 🚀 Deployment Preparation

### Environment Variables
Required for production:
```
SANITY_PROJECT_ID=it7wwto3
SANITY_DATASET=production
# Optional:
SANITY_TOKEN=<if using authenticated requests>
GA_MEASUREMENT_ID=<Google Analytics ID>
```

### Netlify Setup
- [ ] **Main Hub Site** - Deploy to primary domain
- [ ] **Individual Pub Sites** - Set up separate deployments with TARGET_PUB_SLUG
- [ ] **Custom Domains** - Configure DNS for each pub domain
- [ ] **SSL Certificates** - Ensure all sites have HTTPS
- [ ] **Form Notifications** - Configure where form submissions are sent

## 📊 SEO & Performance
- [ ] **Meta Tags** - Verify all pages have proper title, description
- [ ] **OpenGraph Tags** - Check social media preview cards
- [ ] **Sitemap** - Generate and submit to search engines
- [ ] **Page Speed** - Test with Google PageSpeed Insights
- [ ] **Structured Data** - Add schema.org markup for local businesses

## 🔑 Access & Documentation

### Client Access Setup
- [ ] **Sanity Studio Access** - Create client accounts at https://whpubs.sanity.studio
- [ ] **Netlify Access** - Provide deployment dashboard access
- [ ] **Domain Management** - Transfer or provide access to domain registrar
- [ ] **Analytics Access** - Share Google Analytics dashboard

### Documentation to Provide
- [ ] **Content Management Guide** - How to use Sanity CMS
- [ ] **Image Specifications** - Required sizes for different content types
- [ ] **Deployment Guide** - How to trigger builds and deployments
- [ ] **Support Contact** - How to get help post-handover

## ⚠️ Known Issues & Limitations
1. **Booking Widget** - The duplicate "Book A Table" text in the LiveRes widget is part of their iframe and cannot be modified
2. **Image Fallbacks** - Fallback images are in place but should be replaced with actual pub photos
3. **Development Kitchen** - Content needs to be populated in Sanity CMS

## 🔒 Security Checklist
- [ ] **API Keys** - Ensure no sensitive keys are exposed in code
- [ ] **CORS Settings** - Verify Sanity CORS configuration
- [ ] **Form Spam Protection** - Netlify honeypot fields are configured
- [ ] **Content Security Policy** - Review CSP headers if needed

## 📝 Final Testing
- [ ] **Full Site Navigation** - Click through every link
- [ ] **404 Page** - Verify custom 404 page displays correctly
- [ ] **Loading Performance** - Check for any slow-loading pages
- [ ] **Console Errors** - Ensure no JavaScript errors in browser console
- [ ] **Broken Links** - Run link checker tool

## 🎯 Post-Launch Tasks
- [ ] **Monitor First 48 Hours** - Watch for any issues
- [ ] **Gather Client Feedback** - Schedule review meeting
- [ ] **Performance Monitoring** - Set up uptime monitoring
- [ ] **Backup Strategy** - Ensure regular backups are configured

---

## Contact Information

### Development
- **Codebase**: GitHub repository
- **Framework**: Astro with React components
- **CMS**: Sanity Studio (Project ID: it7wwto3)
- **Deployment**: Netlify

### Important URLs
- **Main Hub**: https://whpubsadmin.netlify.app
- **Sanity Studio**: https://whpubs.sanity.studio
- **Sanity Dashboard**: https://www.sanity.io/organizations/ou2Yw2hhu/project/it7wwto3

### Support Resources
- **Astro Documentation**: https://docs.astro.build
- **Sanity Documentation**: https://www.sanity.io/docs
- **Netlify Documentation**: https://docs.netlify.com

---

*Last Updated: January 2025*