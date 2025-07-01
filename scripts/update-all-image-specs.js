import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'it7wwto3',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

console.log('🖼️ COMPLETE SANITY IMAGE SPECIFICATIONS GUIDE');
console.log('==============================================\n');

console.log('📋 CRITICAL: ALL IMAGE RESOLUTIONS FOR SANITY STUDIO\n');

console.log('1️⃣ PAGE HERO IMAGES (About, Events, Blog, Contact, Careers)');
console.log('   ✅ EXACT SIZE: 1920 x 768 pixels');
console.log('   ✅ ASPECT RATIO: 2.5:1');
console.log('   ✅ FORMAT: JPG or WebP');
console.log('   ✅ DISPLAY: 40% of viewport height');
console.log('   📍 LOCATION: Page Settings > [Page Name] > Hero Image\n');

console.log('2️⃣ PUB HERO IMAGES (Main banner for each pub)');
console.log('   ✅ EXACT SIZE: 1920 x 800 pixels');
console.log('   ✅ ASPECT RATIO: 2.4:1');
console.log('   ✅ FORMAT: JPG or WebP');
console.log('   📍 LOCATION: Pubs > [Pub Name] > Hero Image\n');

console.log('3️⃣ PUB CARD IMAGES (Thumbnail on homepage)');
console.log('   ✅ EXACT SIZE: 828 x 605 pixels');
console.log('   ✅ ASPECT RATIO: 1.37:1');
console.log('   ✅ FORMAT: JPG or WebP');
console.log('   📍 LOCATION: Pubs > [Pub Name] > Image\n');

console.log('4️⃣ DEVELOPMENT KITCHEN CHEF PHOTO (Tony French)');
console.log('   ✅ EXACT SIZE: 800 x 1000 pixels');
console.log('   ✅ ASPECT RATIO: 4:5 (Portrait)');
console.log('   ✅ FORMAT: JPG');
console.log('   ✅ FRAMING: Head and shoulders, space above head');
console.log('   📍 LOCATION: Development Kitchen > Chef Profile > Image\n');

console.log('5️⃣ DEVELOPMENT KITCHEN HERO IMAGE');
console.log('   ✅ EXACT SIZE: 1920 x 800 pixels');
console.log('   ✅ ASPECT RATIO: 2.4:1');
console.log('   ✅ FORMAT: JPG or WebP');
console.log('   📍 LOCATION: Development Kitchen > Hero Image\n');

console.log('6️⃣ EVENT IMAGES');
console.log('   ✅ EXACT SIZE: 1200 x 800 pixels');
console.log('   ✅ ASPECT RATIO: 3:2');
console.log('   ✅ FORMAT: JPG or WebP');
console.log('   📍 LOCATION: Events > [Event Name] > Event Image\n');

console.log('7️⃣ BLOG POST IMAGES');
console.log('   ✅ EXACT SIZE: 1200 x 630 pixels');
console.log('   ✅ ASPECT RATIO: 1.9:1');
console.log('   ✅ FORMAT: JPG or WebP');
console.log('   📍 LOCATION: Posts > [Post Title] > Main Image\n');

console.log('8️⃣ MENU IMAGES (if used)');
console.log('   ✅ EXACT SIZE: 800 x 600 pixels');
console.log('   ✅ ASPECT RATIO: 4:3');
console.log('   ✅ FORMAT: JPG or WebP');
console.log('   📍 LOCATION: Menus > [Menu Name] > Images in content\n');

console.log('9️⃣ GALLERY IMAGES');
console.log('   ✅ EXACT SIZE: 1000 x 1000 pixels');
console.log('   ✅ ASPECT RATIO: 1:1 (Square)');
console.log('   ✅ FORMAT: JPG or WebP');
console.log('   📍 LOCATION: Various > Gallery fields\n');

console.log('🚀 DEPLOYMENT CHECKLIST:');
console.log('1. All changes have been committed to git');
console.log('2. Push to GitHub: git push origin main');
console.log('3. Netlify will auto-deploy from main branch');
console.log('4. Check deployment at: https://whpubsadmin.netlify.app');
console.log('5. Allow 2-3 minutes for deployment to complete\n');

console.log('⚠️  CRITICAL ABOUT PAGE FIX:');
console.log('The About page currently shows an Unsplash image because:');
console.log('1. No hero image has been uploaded to Sanity yet');
console.log('2. Go to Sanity Studio > Page Settings > About Page');
console.log('3. Upload a 1920x768px image of a historic pub');
console.log('4. The Unsplash image will immediately be replaced\n');

console.log('📱 To see changes immediately:');
console.log('1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)');
console.log('2. Check Netlify deployment status');
console.log('3. Ensure all Sanity content is published (not draft)');

// Now let's update the About page settings to remove the Unsplash reference
async function removeUnsplashImage() {
  try {
    const aboutPageSettings = await client.fetch(
      `*[_type == "pageSettings" && pageName == "about"][0]`
    );
    
    if (aboutPageSettings) {
      console.log('\n✅ About page settings exist in Sanity');
      console.log('❗ ACTION REQUIRED: Upload a hero image in Sanity Studio');
      console.log('   Path: Page Settings > About Page > Hero Image');
      console.log('   Required size: 1920 x 768 pixels');
    }
  } catch (error) {
    console.error('Error checking About page settings:', error);
  }
}

removeUnsplashImage();