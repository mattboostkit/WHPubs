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

async function createMenus() {
  try {
    // Fetch pubs to associate menus with
    const pubs = await client.fetch(`*[_type == "pub"] { _id, name, slug }`);
    console.log(`Found ${pubs.length} pubs`);

    const menus = [
      // The Rose and Crown - Main Menu
      {
        _type: 'menu',
        title: 'Main Menu',
        slug: { _type: 'slug', current: 'rose-crown-main-menu' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-rose-and-crown')?._id },
        menuContent: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'Starters & Small Plates' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Homemade Soup of the Day', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £6.50\nServed with warm artisan bread and butter' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Pan-Seared Scallops', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £12.95\nWith cauliflower purée, crispy pancetta, and pea shoots' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Chicken Liver Parfait', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £8.50\nSmooth parfait with red onion marmalade and toasted brioche' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Beetroot & Goat\'s Cheese Salad', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £7.95 (V)\nRoasted beetroot, whipped goat\'s cheese, candied walnuts, honey dressing' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'Mains' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Beer Battered Fish & Chips', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £15.95\nFresh cod in our signature beer batter, hand-cut chips, mushy peas, tartare sauce' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: '28-Day Aged Ribeye Steak', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £28.95\n10oz ribeye, hand-cut chips, grilled tomato, mushroom, watercress\nAdd peppercorn or béarnaise sauce £3.50' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Slow-Roasted Pork Belly', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £18.95\nCrispy pork belly, dauphinoise potato, braised red cabbage, apple sauce, cider jus' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Wild Mushroom Risotto', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £14.95 (V)\nCreamy arborio rice with mixed wild mushrooms, parmesan, truffle oil' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'Desserts' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Sticky Toffee Pudding', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £7.50\nClassic pudding with butterscotch sauce and vanilla ice cream' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Chocolate Brownie', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £7.95\nWarm chocolate brownie, salted caramel ice cream, chocolate sauce' }
            ]
          }
        ]
      },

      // The Cricketers Inn - Sunday Roast Menu
      {
        _type: 'menu',
        title: 'Sunday Roast Menu',
        slug: { _type: 'slug', current: 'cricketers-sunday-roast' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-cricketers-inn')?._id },
        menuContent: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'Sunday Roasts' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'All roasts served with roast potatoes, seasonal vegetables, Yorkshire pudding, and rich gravy', marks: ['em'] }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Roast Sirloin of Beef', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £18.95\nServed pink with horseradish cream' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Roast Leg of Lamb', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £19.95\nSlow-roasted with rosemary and garlic, mint sauce' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Free-Range Chicken', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £16.95\nHalf roast chicken with sage & onion stuffing' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Nut Roast Wellington', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £15.95 (V)\nMixed nut & vegetable wellington with vegetarian gravy' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Children\'s Roast', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £8.95\nChoice of meat with all the trimmings' }
            ]
          }
        ]
      },

      // The Little Brown Jug - Drinks Menu
      {
        _type: 'menu',
        title: 'Drinks & Wine List',
        slug: { _type: 'slug', current: 'little-brown-jug-drinks' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-little-brown-jug')?._id },
        menuContent: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'Local Ales & Craft Beers' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Hopfield Golden Ale', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' 4.2% - Pint £4.80 / Half £2.50\nLight, refreshing ale from our local Tunbridge Wells brewery' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Old Oak Best Bitter', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' 4.5% - Pint £4.95 / Half £2.60\nTraditional bitter with caramel notes' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Riverside IPA', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' 5.2% - Pint £5.20 / Half £2.70\nHoppy IPA with citrus undertones' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'Wine Selection' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [{ _type: 'span', _key: generateKey(), text: 'White Wines' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Sauvignon Blanc, Marlborough', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: '\n175ml £6.50 / 250ml £8.50 / Bottle £24.00' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Pinot Grigio, Veneto', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: '\n175ml £5.95 / 250ml £7.95 / Bottle £22.00' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [{ _type: 'span', _key: generateKey(), text: 'Red Wines' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Malbec, Mendoza', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: '\n175ml £6.95 / 250ml £8.95 / Bottle £26.00' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Rioja Reserva', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: '\n175ml £7.50 / 250ml £9.95 / Bottle £28.00' }
            ]
          }
        ]
      },

      // The Chaser Inn - Specials Board
      {
        _type: 'menu',
        title: 'Chef\'s Specials',
        slug: { _type: 'slug', current: 'chaser-inn-specials' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-chaser-inn')?._id },
        menuContent: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'This Week\'s Specials' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Chef Alessandro brings you a taste of Italy meets British classics', marks: ['em'] }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [{ _type: 'span', _key: generateKey(), text: 'Starters' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Burrata with Heritage Tomatoes', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £9.95\nCreamy burrata, British heritage tomatoes, basil oil, aged balsamic' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Wild Boar Carpaccio', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £11.50\nThinly sliced wild boar, rocket, parmesan, truffle dressing' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h3',
            children: [{ _type: 'span', _key: generateKey(), text: 'Mains' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Osso Buco alla Milanese', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £24.95\nSlow-braised British veal shanks, saffron risotto, gremolata' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Seafood Risotto', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £22.50\nKentish coast seafood, saffron risotto, cherry tomatoes, fresh herbs' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Wild Mushroom Pappardelle', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £16.95 (V)\nHandmade pappardelle, foraged mushrooms, cream, truffle, parmesan' }
            ]
          }
        ]
      },

      // The Bull - Bar Snacks & Light Bites
      {
        _type: 'menu',
        title: 'Bar Snacks & Light Bites',
        slug: { _type: 'slug', current: 'bull-bar-snacks' },
        associatedPub: { _type: 'reference', _ref: pubs.find(p => p.slug.current === 'the-bull')?._id },
        menuContent: [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'Bar Snacks' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Mixed Olives', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £4.50 (V)\nMarinated in herbs and garlic' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Pork Scratchings', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £3.95\nTraditional British pub snack' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Whitebait', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £6.95\nCrispy fried whitebait with lemon mayo' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'Sharing Boards' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Ploughman\'s Board', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £16.95\nLocal cheeses, ham, pork pie, pickles, apple, crusty bread' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Seafood Platter', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £22.95\nSmoked salmon, prawns, crayfish, mackerel pâté, brown bread' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'h2',
            children: [{ _type: 'span', _key: generateKey(), text: 'Sandwiches & Burgers' }]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'All served with hand-cut chips and salad', marks: ['em'] }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'The Bull Burger', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £14.95\n8oz beef patty, bacon, cheddar, lettuce, tomato, burger sauce' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Fish Finger Sandwich', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £11.95\nCrispy fish fingers, tartare sauce, lettuce, on white bread' }
            ]
          },
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
              { _type: 'span', _key: generateKey(), text: 'Club Sandwich', marks: ['strong'] },
              { _type: 'span', _key: generateKey(), text: ' £12.95\nChicken, bacon, egg, lettuce, tomato, mayo, toasted bread' }
            ]
          }
        ]
      }
    ];

    // Create the menus
    for (const menu of menus) {
      try {
        const result = await client.create(menu);
        console.log(`Created menu: ${menu.title} for ${pubs.find(p => p._id === menu.associatedPub._ref)?.name}`);
      } catch (error) {
        console.error(`Error creating menu "${menu.title}":`, error.message);
      }
    }

    console.log('✅ Menus created successfully!');
  } catch (error) {
    console.error('Error creating menus:', error);
  }
}

// Run the script
createMenus();