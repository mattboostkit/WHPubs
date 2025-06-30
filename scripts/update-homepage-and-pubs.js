import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'it7wwto3',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

// Generate a unique key
function generateKey() {
  return Math.random().toString(36).substr(2, 9);
}

async function updateHomepageAndPubs() {
  try {
    // Update or create homepage content
    console.log('Updating homepage content...');
    
    const existingHomepage = await client.fetch(`*[_type == "homepage"][0]`);
    
    const homepageData = {
      _type: 'homepage',
      title: 'Welcome to WH Pubs',
      heroTitle: 'Discover Your Perfect Local',
      heroSubtitle: 'Five exceptional pubs across South East England, each with its own unique character and charm',
      heroButton1Text: 'Find Your Local',
      heroButton1Link: '#pubs',
      heroButton2Text: 'View Upcoming Events',
      heroButton2Link: '/events'
    };

    if (existingHomepage) {
      await client.patch(existingHomepage._id).set(homepageData).commit();
      console.log('✅ Homepage content updated');
    } else {
      await client.create(homepageData);
      console.log('✅ Homepage content created');
    }

    // Fetch all pubs to update with special features and offers
    const pubs = await client.fetch(`*[_type == "pub"] { _id, name, slug }`);
    console.log(`\nUpdating ${pubs.length} pubs with special features and offers...`);

    // Update The Rose and Crown
    const roseAndCrown = pubs.find(p => p.slug.current === 'the-rose-and-crown');
    if (roseAndCrown) {
      await client.patch(roseAndCrown._id).set({
        specialFeatures: [
          {
            _key: generateKey(),
            title: 'The Garden Room',
            description: 'Our beautiful Garden Room is perfect for private dining and special occasions. With French doors opening onto our award-winning garden, it seats up to 40 guests.',
            capacity: 40
          },
          {
            _key: generateKey(),
            title: 'Award-Winning Beer Garden',
            description: 'Winner of "Best Pub Garden in Kent 2023". Features include a children\'s play area, covered seating area, and beautiful flower borders maintained by our dedicated gardening team.',
            capacity: 120
          }
        ],
        currentOffers: [
          {
            _key: generateKey(),
            title: 'Wine Wednesday',
            description: '25% off all bottles of wine every Wednesday',
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            termsConditions: 'Dine-in only. Cannot be combined with other offers.'
          },
          {
            _key: generateKey(),
            title: 'Sunday Lunch Club',
            description: 'Book a table for 4 or more for Sunday lunch and get a complimentary bottle of house wine',
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            termsConditions: 'Advance booking required. Subject to availability.'
          }
        ],
        amenities: ['Dog Friendly', 'Beer Garden', 'Private Dining', 'Parking', 'Wi-Fi', 'Family Friendly', 'Wheelchair Access', 'Baby Changing']
      }).commit();
      console.log('Updated The Rose and Crown');
    }

    // Update The Cricketers Inn
    const cricketersInn = pubs.find(p => p.slug.current === 'the-cricketers-inn');
    if (cricketersInn) {
      await client.patch(cricketersInn._id).set({
        specialFeatures: [
          {
            _key: generateKey(),
            title: 'The Pavilion',
            description: 'Our cricket-themed function room with memorabilia from local and international cricket. Perfect for sports events viewing and private parties.',
            capacity: 60
          },
          {
            _key: generateKey(),
            title: 'Village Green Views',
            description: 'Enjoy stunning views of Penshurst village green and cricket pitch from our terrace. Watch local matches while enjoying a pint!',
            capacity: 30
          }
        ],
        currentOffers: [
          {
            _key: generateKey(),
            title: 'Match Day Special',
            description: 'Free pint with any main course on cricket match days',
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            termsConditions: 'Valid during scheduled cricket matches on the village green only.'
          }
        ],
        amenities: ['Dog Friendly', 'Garden Terrace', 'Sports TV', 'Parking', 'Wi-Fi', 'Family Friendly', 'Cask Marque Approved']
      }).commit();
      console.log('Updated The Cricketers Inn');
    }

    // Update The Little Brown Jug
    const littleBrownJug = pubs.find(p => p.slug.current === 'the-little-brown-jug');
    if (littleBrownJug) {
      await client.patch(littleBrownJug._id).set({
        specialFeatures: [
          {
            _key: generateKey(),
            title: 'The Snug',
            description: 'Our cozy snug with original fireplace and oak beams. Perfect for intimate gatherings of up to 12 people.',
            capacity: 12
          },
          {
            _key: generateKey(),
            title: 'Chef\'s Table',
            description: 'Experience our award-winning kitchen up close with our exclusive chef\'s table. Watch your meal being prepared while enjoying wine pairings.',
            capacity: 6
          }
        ],
        currentOffers: [
          {
            _key: generateKey(),
            title: 'Early Bird Menu',
            description: '2 courses for £15.95 or 3 courses for £19.95 when dining between 5:30-6:30pm',
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            termsConditions: 'Monday to Friday only. Excludes bank holidays.'
          }
        ],
        amenities: ['Dog Friendly Bar Area', 'Log Fires', 'Private Dining', 'Parking', 'Wi-Fi', 'Sunday Papers', 'Board Games']
      }).commit();
      console.log('Updated The Little Brown Jug');
    }

    // Update The Chaser Inn
    const chaserInn = pubs.find(p => p.slug.current === 'the-chaser-inn');
    if (chaserInn) {
      await client.patch(chaserInn._id).set({
        specialFeatures: [
          {
            _key: generateKey(),
            title: 'The Wine Cellar',
            description: 'Our atmospheric wine cellar can be booked for wine tastings and private dinners. Features over 200 wines from around the world.',
            capacity: 20
          },
          {
            _key: generateKey(),
            title: 'Pizza Oven Terrace',
            description: 'Our outdoor wood-fired pizza oven serves authentic Italian pizzas on Friday and Saturday evenings during summer.',
            capacity: 50
          }
        ],
        currentOffers: [
          {
            _key: generateKey(),
            title: 'Pasta Tuesday',
            description: 'All pasta dishes £10 every Tuesday',
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            termsConditions: 'Dine-in only. Not valid on bank holidays.'
          },
          {
            _key: generateKey(),
            title: 'Wine & Dine',
            description: 'Free glass of house wine with any two-course meal Monday-Thursday',
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            termsConditions: 'One glass per person. Cannot be combined with other offers.'
          }
        ],
        amenities: ['Dog Friendly', 'Garden', 'Wine Cellar', 'Pizza Oven', 'Parking', 'Wi-Fi', 'Live Music', 'Italian Specialties']
      }).commit();
      console.log('Updated The Chaser Inn');
    }

    // Update The Bull
    const theBull = pubs.find(p => p.slug.current === 'the-bull');
    if (theBull) {
      await client.patch(theBull._id).set({
        specialFeatures: [
          {
            _key: generateKey(),
            title: 'The Barn',
            description: 'Our converted barn is ideal for larger celebrations, weddings, and corporate events. Features exposed beams, dance floor, and private bar.',
            capacity: 150
          },
          {
            _key: generateKey(),
            title: 'Classic Car Park',
            description: 'Our spacious car park hosts monthly classic car meets. Plenty of space for car clubs and enthusiast gatherings.',
            capacity: 100
          }
        ],
        currentOffers: [
          {
            _key: generateKey(),
            title: 'Steak Night Thursday',
            description: '8oz rump steak with all the trimmings for £16.95',
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            termsConditions: 'Thursday evenings only. While stocks last.'
          },
          {
            _key: generateKey(),
            title: 'Family Sunday Special',
            description: 'Kids eat free with every adult main course on Sundays',
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            termsConditions: 'Maximum 2 children per adult. Children must order from kids menu.'
          }
        ],
        amenities: ['Dog Friendly', 'Large Beer Garden', 'Function Room', 'Ample Parking', 'Wi-Fi', 'Family Friendly', 'Disabled Access', 'Sports TV', 'Pool Table', 'Dart Board'],
        accessibilityInfo: 'Full wheelchair access throughout including disabled toilets. Level access from car park to all areas. Hearing loop available in main bar area.',
        parkingInfo: 'Large free car park with 80 spaces including 4 disabled bays. Overflow parking available for events. Electric vehicle charging point available.'
      }).commit();
      console.log('Updated The Bull');
    }

    console.log('\n✅ All updates completed successfully!');
  } catch (error) {
    console.error('Error updating content:', error);
  }
}

// Run the script
updateHomepageAndPubs();