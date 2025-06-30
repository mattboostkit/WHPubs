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

async function createCareers() {
  try {
    const careers = [
      {
        _type: 'career',
        position: 'Head Chef - The Rose and Crown',
        location: 'Tonbridge, Kent',
        salary: '£35,000 - £40,000 per annum',
        applyUrl: 'https://example.com/careers/head-chef-rose-crown',
        roleRequirements: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'About the Role'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'We are seeking an experienced and passionate Head Chef to lead the kitchen team at The Rose and Crown. This is an exciting opportunity to showcase your culinary skills in our busy gastropub, known for its innovative seasonal menus and commitment to local sourcing.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Key Responsibilities'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Lead and inspire a team of 6 kitchen staff\n• Develop seasonal menus showcasing local produce\n• Maintain exceptional food quality and presentation standards\n• Manage kitchen operations, stock control, and GP targets\n• Ensure compliance with food safety and hygiene regulations\n• Collaborate with our Development Kitchen on new dishes'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'What We\'re Looking For'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Minimum 3 years experience as Head Chef or Senior Sous Chef\n• Proven track record in gastropub or restaurant environment\n• Passion for British cuisine with modern techniques\n• Strong leadership and communication skills\n• Food Safety Level 3 certification\n• Ability to work under pressure while maintaining standards'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'What We Offer'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Competitive salary plus performance bonus\n• 28 days holiday including bank holidays\n• Staff meals on duty\n• 25% discount across all WH Pubs\n• Career development opportunities\n• Pension scheme\n• Supportive working environment'
              }
            ]
          }
        ]
      },
      {
        _type: 'career',
        position: 'Assistant Manager - The Cricketers Inn',
        location: 'Penshurst, Kent',
        salary: '£28,000 - £32,000 per annum',
        applyUrl: 'https://example.com/careers/assistant-manager-cricketers',
        roleRequirements: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'The Opportunity'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Join our award-winning team at The Cricketers Inn as Assistant Manager. This role offers excellent progression opportunities within the WH Pubs group for the right candidate who shares our passion for exceptional hospitality.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Your Role'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Support the General Manager in day-to-day operations\n• Lead shifts and manage teams of up to 15 staff\n• Deliver exceptional customer service standards\n• Handle customer feedback and resolve issues\n• Assist with staff training and development\n• Manage rotas, ordering, and administrative tasks\n• Drive sales through upselling and promotional activities'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'About You'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Previous supervisory experience in hospitality\n• Personal licence holder (or willing to obtain)\n• Excellent communication and people skills\n• Flexible approach to working hours\n• Passion for food, drink, and hospitality\n• Strong organizational skills\n• Ambition to progress in pub management'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Benefits Package'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Competitive salary with quarterly bonus scheme\n• 28 days holiday\n• Live-in accommodation available\n• Meals on duty\n• Staff discount scheme\n• Training and development programs\n• Career progression opportunities'
              }
            ]
          }
        ]
      },
      {
        _type: 'career',
        position: 'Sous Chef - Development Kitchen',
        location: 'Tunbridge Wells, Kent',
        salary: '£30,000 - £35,000 per annum',
        applyUrl: 'https://example.com/careers/sous-chef-development',
        roleRequirements: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Join Our Innovation Team'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'This is a unique opportunity to work in our Development Kitchen alongside Executive Chef Marcus Thompson. You\'ll be at the forefront of menu development for all WH Pubs locations, creating innovative dishes that blend tradition with modern techniques.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'The Role'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Assist in developing new menu items and seasonal specials\n• Test and refine recipes for consistency across all sites\n• Work with local suppliers to source exceptional ingredients\n• Train pub kitchen teams on new dishes and techniques\n• Maintain detailed recipe specifications and costings\n• Support food photography and menu launches\n• Contribute creative ideas to menu development sessions'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Essential Experience'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Minimum 2 years as Sous Chef in quality establishments\n• Experience in menu development and costing\n• Strong classical cooking skills with modern techniques\n• Creative flair and passion for innovation\n• Excellent palate and attention to detail\n• Ability to work independently and as part of a team\n• Full driving licence (travel between sites required)'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Why Join Us?'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Work in a creative, innovative environment\n• Monday to Friday daytime hours (occasional evenings)\n• Excellent salary and benefits\n• Opportunity to shape menus across multiple sites\n• Professional development and training budget\n• Be part of an award-winning team'
              }
            ]
          }
        ]
      },
      {
        _type: 'career',
        position: 'Bar Supervisor - The Bull',
        location: 'Sevenoaks, Kent',
        salary: '£24,000 - £26,000 per annum',
        applyUrl: 'https://example.com/careers/bar-supervisor-bull',
        roleRequirements: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'About the Position'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'The Bull is seeking an enthusiastic Bar Supervisor to join our friendly team. With our extensive drinks menu and busy bar area, this role is perfect for someone passionate about beverages and customer service.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Key Responsibilities'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Supervise bar operations during busy service periods\n• Maintain exceptional drink quality and presentation\n• Train new bar staff on products and service standards\n• Manage bar stock levels and weekly orders\n• Create seasonal cocktail specials\n• Ensure compliance with licensing laws\n• Handle cash management and till reconciliation'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'We\'re Looking For'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Previous bar experience essential\n• Knowledge of wines, spirits, and craft beers\n• Basic cocktail making skills\n• Friendly, outgoing personality\n• Ability to work under pressure\n• Flexibility to work evenings and weekends\n• Personal licence preferred but not essential'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'What\'s In It For You'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Competitive hourly rate plus tips\n• 28 days holiday\n• Staff meals and drinks\n• Training opportunities including WSET courses\n• Fun, supportive team environment\n• Opportunity to progress to Bar Manager'
              }
            ]
          }
        ]
      },
      {
        _type: 'career',
        position: 'Kitchen Porter - Multiple Locations',
        location: 'Various across Kent',
        salary: '£11.50 - £12.50 per hour',
        applyUrl: 'https://example.com/careers/kitchen-porter',
        roleRequirements: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Join Our Kitchen Teams'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'We have opportunities for reliable Kitchen Porters across several WH Pubs locations. These vital roles keep our kitchens running smoothly and offer great opportunities to learn from experienced chefs.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'What You\'ll Do'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Keep kitchen areas clean and organized\n• Operate dishwashing equipment\n• Assist chefs with basic food preparation\n• Receive and store deliveries\n• Maintain hygiene and safety standards\n• Support the kitchen team during busy services'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'About You'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• No experience necessary - full training provided\n• Hardworking and reliable\n• Team player with positive attitude\n• Able to work in a fast-paced environment\n• Flexible with working hours\n• Interest in developing kitchen skills'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Benefits'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Competitive hourly rate\n• Share of tips\n• Meals on duty\n• 28 days holiday (pro rata)\n• Training and development opportunities\n• Potential to train as Commis Chef\n• Friendly working environment'
              }
            ]
          }
        ]
      },
      {
        _type: 'career',
        position: 'Events Coordinator - WH Pubs Group',
        location: 'Flexible - covering all locations',
        salary: '£26,000 - £30,000 per annum',
        applyUrl: 'https://example.com/careers/events-coordinator',
        roleRequirements: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Exciting New Role'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'We\'re creating a new Events Coordinator position to manage and develop our growing events program across all WH Pubs. This is a fantastic opportunity for a creative, organized individual to shape our events strategy.'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Your Responsibilities'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Plan and coordinate events across all five pubs\n• Develop new event concepts and promotional activities\n• Manage event budgets and supplier relationships\n• Create marketing materials and social media content\n• Train pub teams on event delivery\n• Handle private party enquiries and bookings\n• Monitor event performance and guest feedback'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Ideal Candidate'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Experience in events management or hospitality marketing\n• Creative thinker with excellent organizational skills\n• Strong communication and interpersonal abilities\n• Proficient in social media and basic design tools\n• Full driving licence essential\n• Flexible approach to working hours\n• Passion for hospitality and creating memorable experiences'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: 'Package'
              }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: '• Competitive salary plus performance bonus\n• Company car or car allowance\n• 28 days holiday plus bank holidays\n• Laptop and mobile phone\n• Professional development budget\n• Staff discount across all venues\n• Opportunity to shape a new role'
              }
            ]
          }
        ]
      }
    ];

    // Create the career opportunities
    for (const career of careers) {
      try {
        const result = await client.create(career);
        console.log(`Created career opportunity: ${career.position}`);
      } catch (error) {
        console.error(`Error creating career "${career.position}":`, error.message);
      }
    }

    console.log('✅ Career opportunities created successfully!');
  } catch (error) {
    console.error('Error creating careers:', error);
  }
}

// Run the script
createCareers();