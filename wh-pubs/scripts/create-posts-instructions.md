# Creating Sample Blog Posts in Sanity Studio

Since we're having issues with the authentication token, here's a simpler approach to create the sample blog posts directly in the Sanity Studio:

## Prerequisites

Before creating blog posts, make sure you have:
1. Created a site (follow instructions in `create-site-instructions.md`)
2. Created categories (follow instructions in `create-categories-instructions.md`)

## Step 1: Start the Sanity Studio

Make sure the Sanity Studio is running at http://localhost:3333/

## Step 2: Create the "New Summer Menu Launch" Post

1. Go to http://localhost:3333/
2. Click on "Blog Posts" in the sidebar
3. Click the "Create new" button
4. Fill in the following details:
   - **Title**: New Summer Menu Launch
   - **Slug**: new-summer-menu-launch
   - **Published On Sites**: Select the site you created
   - **Excerpt**: Discover our new seasonal dishes featuring the finest local produce.
   - **Main Image**: Upload or use the URL: https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop
   - **Image Alt**: Beautifully plated seasonal dish featuring colorful local vegetables and herbs
   - **Categories**: Select "Food & Drink"
   - **Published at**: June 15, 2024
   - **Author**: Chef James Wilson
   - **Author Title**: Head Chef, WH Pubs Group
   - **CTA Title**: Book Your Table
   - **CTA Description**: Be among the first to experience our new summer menu. Book your table today at any of our establishments.
   - **CTA Button**: Make a Reservation
   - **Body**: Use the rich text editor to create the following content:
     - Normal text: "We're excited to announce the launch of our new summer menu across all WH Pubs establishments. This season's offerings celebrate the finest local produce and traditional British flavours with a contemporary twist."
     - H2: "Seasonal Highlights"
     - Normal text: "Our new menu features an array of dishes that showcase the best of British summer produce. From garden-fresh salads to perfectly grilled meats, each dish has been carefully crafted to deliver exceptional flavour and presentation."
     - Bullet list:
       - Kent Heritage Tomato & Burrata Salad
       - Grilled Romney Marsh Lamb with Summer Vegetables
       - Pan-Seared Sea Bass with Samphire
       - Summer Berry Eton Mess
     - H2: "Local Suppliers"
     - Normal text: "We're proud to work with local suppliers who share our commitment to quality and sustainability. Our vegetables come from farms within a 30-mile radius, and our meat is sourced from trusted local butchers."

5. Click "Publish" to save the post

## Step 3: Create the "Live Music Weekends" Post

1. Click on "Blog Posts" in the sidebar
2. Click the "Create new" button
3. Fill in the following details:
   - **Title**: Live Music Weekends
   - **Slug**: live-music-weekends
   - **Published On Sites**: Select the site you created
   - **Excerpt**: Join us every Friday and Saturday for live acoustic performances.
   - **Main Image**: Upload or use the URL: https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070&auto=format&fit=crop
   - **Image Alt**: Acoustic guitarist performing in an intimate pub setting with warm lighting
   - **Categories**: Select "Events"
   - **Published at**: June 10, 2024
   - **Author**: Emma Thompson
   - **Author Title**: Events Manager, WH Pubs Group
   - **CTA Title**: Reserve Your Spot
   - **CTA Description**: Tables for our live music events fill up quickly. Secure yours today!
   - **CTA Button**: Book Now
   - **Body**: Use the rich text editor to create the following content:
     - Normal text: "We're thrilled to announce our new Live Music Weekends program across all WH Pubs locations. Starting this month, we'll be hosting talented local musicians every Friday and Saturday evening, bringing you the best in acoustic performances in our cozy, intimate settings."
     - H2: "Featured Artists"
     - Normal text: "We've curated a diverse lineup of talented musicians from across the region. From folk and acoustic rock to jazz and blues, there's something for everyone to enjoy while savoring your favorite food and drinks."
     - H2: "Schedule & Reservations"
     - Normal text: "Performances begin at 8pm every Friday and Saturday. Due to the popularity of these events, we strongly recommend booking your table in advance to avoid disappointment. Check each pub's individual page for their specific lineup and to make reservations."

4. Click "Publish" to save the post

## Step 4: Create the "Bank Holiday Festival" Post

1. Click on "Blog Posts" in the sidebar
2. Click the "Create new" button
3. Fill in the following details:
   - **Title**: Bank Holiday Festival
   - **Slug**: bank-holiday-festival
   - **Published On Sites**: Select the site you created
   - **Excerpt**: Three days of food, drink, and entertainment across all our pubs.
   - **Main Image**: Upload or use the URL: https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop
   - **Image Alt**: Festive outdoor pub garden decorated for a summer celebration with bunting and fairy lights
   - **Categories**: Select "Events" and "News"
   - **Published at**: June 5, 2024
   - **Author**: Robert Jenkins
   - **Author Title**: Managing Director, WH Pubs Group
   - **CTA Title**: Join the Celebration
   - **CTA Description**: Don't miss the biggest event of the summer at WH Pubs. No tickets required - just come along and enjoy!
   - **CTA Button**: View Festival Details
   - **Body**: Use the rich text editor to create the following content:
     - Normal text: "Get ready for an unforgettable Bank Holiday weekend as WH Pubs presents our annual Summer Festival! Join us for three days of exceptional food, drink, and entertainment across all our establishments from May 27th to 29th."
     - H2: "Festival Highlights"
     - Normal text: "Each of our pubs will be transformed with festive decorations, extended garden seating, and special event areas. We've planned a packed schedule of activities for all ages:"
     - Bullet list:
       - Live music performances throughout each day
       - Craft beer and cider tastings
       - BBQ and street food stalls
       - Family-friendly activities and games
     - H2: "Special Festival Menu"
     - Normal text: "Our chefs have created a special festival menu featuring summer favorites and unique creations that showcase the best of British cuisine. Pair these dishes with our selection of festival cocktails and local ales for the perfect Bank Holiday experience."

4. Click "Publish" to save the post

## Step 5: Verify the Posts

After creating all three posts, go to your Astro site at http://localhost:4321/ and check that the posts appear on the homepage and that you can click through to read the full posts.
