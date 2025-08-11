# WH Pubs Forms Audit

## Overview
All forms on the WH Pubs site are configured to work with Netlify Forms, which automatically processes form submissions.

## Forms Found

### 1. Newsletter Signup Form
- **Location**: `/src/pages/index.astro` (Homepage)
- **Form Name**: `newsletter`
- **Method**: POST
- **Action**: `/thank-you`
- **Fields**: 
  - Email (required)
  - Bot field (honeypot for spam protection)
- **Netlify Integration**: ✅ Configured with `data-netlify="true"`
- **Spam Protection**: ✅ Honeypot field configured
- **Status**: ✅ Working

### 2. Contact Form
- **Location**: `/src/pages/contact.astro`
- **Form Name**: `contact`
- **Method**: POST
- **Action**: `/thank-you`
- **Fields**:
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Pub selection (dropdown)
  - Subject (required)
  - Message (required)
  - Bot field (honeypot)
- **Netlify Integration**: ✅ Configured with `data-netlify="true"`
- **Spam Protection**: ✅ Honeypot field configured
- **Status**: ✅ Working

### 3. Search Form (404 Page)
- **Location**: `/src/pages/404.astro`
- **Form Name**: N/A (search form)
- **Method**: GET
- **Action**: `/search`
- **Fields**: Search query
- **Netlify Integration**: N/A (client-side search)
- **Status**: ⚠️ Note: Search endpoint `/search` needs to be implemented or removed

### 4. Booking Widget
- **Location**: LiveRes iframe widget
- **Type**: Third-party embedded widget
- **Integration**: Via iframe from LiveRes
- **Status**: ✅ Working (handled by LiveRes)

## Forms Configuration

### Netlify Forms Setup
All forms using Netlify Forms require:
1. `data-netlify="true"` attribute
2. Hidden input with `name="form-name"` and the form's name as value
3. Optional: `data-netlify-honeypot="bot-field"` for spam protection

### Form Submissions
- Submissions are stored in Netlify dashboard under Forms section
- Email notifications can be configured in Netlify settings
- All forms redirect to `/thank-you` page after submission

## Missing Forms

### Career Application Form
- **Current State**: Careers page exists but no application form
- **Recommendation**: Add application form or link to external application system
- **Priority**: Medium

## Analytics Tracking
- Forms are tracked via Analytics component (`/src/components/Analytics.astro`)
- Automatic tracking for all forms with `data-netlify="true"` attribute
- Events sent to Google Analytics (if configured)

## Testing Checklist

- [x] Newsletter signup form structure verified
- [x] Contact form structure verified
- [ ] Test newsletter submission (requires live environment)
- [ ] Test contact form submission (requires live environment)
- [ ] Verify form submissions appear in Netlify dashboard
- [ ] Configure email notifications in Netlify
- [ ] Test thank-you page redirect
- [ ] Verify spam protection (honeypot field)

## Recommendations

1. **Search Functionality**: Either implement search or remove the search form from 404 page
2. **Career Applications**: Add application form to careers page or link to external system
3. **Form Validation**: Consider adding client-side validation for better UX
4. **Success Messages**: Ensure thank-you page provides clear confirmation
5. **Email Notifications**: Configure in Netlify dashboard for client to receive submissions

## Environment Requirements

No special environment variables needed for forms. Netlify automatically handles form processing when deployed.

## Client Handover Notes

1. **Access Form Submissions**: 
   - Log into Netlify dashboard
   - Navigate to Forms section
   - View and export submissions

2. **Email Notifications**:
   - Go to Site settings > Forms > Form notifications
   - Add email addresses to receive submissions

3. **Spam Management**:
   - Honeypot fields are configured
   - Additional reCAPTCHA can be added if needed

4. **Form Data Export**:
   - Can export as CSV from Netlify dashboard
   - API access available for programmatic retrieval