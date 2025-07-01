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

const blogPostDates = [
  { month: 4, day: 5 },   // April 5, 2025
  { month: 4, day: 12 },  // April 12, 2025
  { month: 4, day: 20 },  // April 20, 2025
  { month: 4, day: 28 },  // April 28, 2025
  { month: 5, day: 3 },   // May 3, 2025
  { month: 5, day: 10 },  // May 10, 2025
  { month: 5, day: 18 },  // May 18, 2025
  { month: 5, day: 25 },  // May 25, 2025
  { month: 6, day: 2 },   // June 2, 2025
  { month: 6, day: 8 },   // June 8, 2025
  { month: 6, day: 15 },  // June 15, 2025
  { month: 6, day: 22 },  // June 22, 2025
  { month: 6, day: 28 },  // June 28, 2025
];

async function updateBlogDates() {
  try {
    console.log('Updating blog post dates to April-June 2025...\n');

    // Fetch all blog posts
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt asc)`);

    for (let i = 0; i < posts.length && i < blogPostDates.length; i++) {
      const post = posts[i];
      const dateInfo = blogPostDates[i];
      const newDate = new Date(2025, dateInfo.month - 1, dateInfo.day, 10, 0, 0);

      await client
        .patch(post._id)
        .set({ publishedAt: newDate.toISOString() })
        .commit();
      
      console.log(`✅ Updated "${post.title}" to ${newDate.toLocaleDateString('en-GB')}`);
    }

    console.log('\n✨ All blog post dates updated successfully!');

  } catch (error) {
    console.error('Error updating blog dates:', error);
  }
}

// Run the script
updateBlogDates();