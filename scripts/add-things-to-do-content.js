// Script to add Things To Do content to Sanity
// Run this after the new schema has been deployed to Sanity

const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || 'sk1PHVISf0xNjFVLvY2fIetm6gTXv3iL85joYcLqRnXGN3aO0pets0Md3EzVCy8ZAZc8AKB2FG0pNzdXV6zZBj5MQNNw4A1CBhUH9IslFxc3aHOSwveeBVk5ryWFPzesC8P6O2QwtWPtQnXKyT88ejVzwDBDmwa4F7DLmajI4NFaUoWgbf7G',
  useCdn: false
});

async function createThingsToDoContent() {
  try {
    // Create page settings first
    console.log('Creating Things To Do page settings...');
    await client.createOrReplace({
      _id: 'thingsToDoPageSettings',
      _type: 'thingsToDoPageSettings',
      title: 'Things To Do',
      heroTitle: 'Discover Our Local Area',
      heroSubtitle: 'From scenic countryside walks to bustling farmers markets, explore the best of South East England right from our doorstep'
    });

    // Create circular walks
    console.log('Creating circular walks...');
    const walks = [
      {
        _type: 'thingsToDo',
        title: 'Mereworth Woods Circular Walk',
        slug: { _type: 'slug', current: 'mereworth-woods-circular-walk' },
        category: 'walks',
        associatedPub: { _type: 'reference', _ref: '0018f66b-db31-4ac1-9898-0d9efe4d8ea8' },
        locationDetails: 'Starting from The Cricketers Inn car park',
        duration: '2-3 hours',
        distance: '5 miles',
        difficulty: 'moderate',
        description: [
          {
            _type: 'block',
            _key: 'block1',
            style: 'normal',
            children: [{
              _type: 'span',
              _key: 'span1',
              text: 'This beautiful circular walk takes you through the ancient Mereworth Woods, offering stunning views across the Kentish countryside. Starting from The Cricketers Inn, head north along the footpath through fields of seasonal crops before entering the peaceful woodland. The route includes several historical points of interest including an old hop kiln and traditional oast houses. Perfect for a morning walk before returning to the pub for a well-deserved lunch. Dogs welcome on leads.'
            }]
          }
        ],
        order: 1
      },
      {
        _type: 'thingsToDo',
        title: 'Dunks Green to Shipbourne Loop',
        slug: { _type: 'slug', current: 'dunks-green-shipbourne-loop' },
        category: 'walks',
        associatedPub: { _type: 'reference', _ref: '064ee226-2e5a-4777-a5d0-ea6b59b0f2b4' },
        locationDetails: 'Starting from The Rose and Crown',
        duration: '1.5-2 hours',
        distance: '3.5 miles',
        difficulty: 'easy',
        description: [
          {
            _type: 'block',
            _key: 'block1',
            style: 'normal',
            children: [{
              _type: 'span',
              _key: 'span1',
              text: 'A gentle countryside walk perfect for families, taking you through the picturesque villages of Dunks Green and Shipbourne. The route follows well-maintained footpaths across open fields with views of the North Downs. Pass by St Giles Church in Shipbourne, dating back to the 12th century, before looping back through quiet country lanes. The walk is mostly flat with just a few gentle slopes, making it accessible for most fitness levels. Stop by The Rose and Crown afterwards for refreshments in our garden.'
            }]
          }
        ],
        order: 2
      },
      {
        _type: 'thingsToDo',
        title: 'Chiddingstone Causeway Heritage Trail',
        slug: { _type: 'slug', current: 'chiddingstone-causeway-heritage-trail' },
        category: 'walks',
        associatedPub: { _type: 'reference', _ref: '08a248bc-2fdc-481d-b621-25827d961d50' },
        locationDetails: 'Starting from The Little Brown Jug car park',
        duration: '2.5 hours',
        distance: '4 miles',
        difficulty: 'easy',
        description: [
          {
            _type: 'block',
            _key: 'block1',
            style: 'normal',
            children: [{
              _type: 'span',
              _key: 'span1',
              text: 'Discover the rich history of the area with this scenic walk through Chiddingstone Causeway and surrounding countryside. The route takes you past Chiddingstone Castle and through the National Trust village of Chiddingstone with its famous Tudor buildings. Follow the Eden Valley Walk for spectacular views before returning via quiet country lanes. The walk includes several stiles but is generally easy going. Perfect for history enthusiasts and nature lovers alike.'
            }]
          }
        ],
        order: 3
      },
      {
        _type: 'thingsToDo',
        title: 'Shipbourne Common Nature Walk',
        slug: { _type: 'slug', current: 'shipbourne-common-nature-walk' },
        category: 'walks',
        associatedPub: { _type: 'reference', _ref: '317df0e6-b219-4006-8bb9-130a92cb473f' },
        locationDetails: 'Starting from The Chaser Inn',
        duration: '2 hours',
        distance: '4.5 miles',
        difficulty: 'moderate',
        description: [
          {
            _type: 'block',
            _key: 'block1',
            style: 'normal',
            children: [{
              _type: 'span',
              _key: 'span1',
              text: 'Explore the beautiful Shipbourne Common and surrounding woodland on this varied circular route. The walk takes you through ancient woodland, across streams, and past traditional Kentish farms. In spring, the woods are carpeted with bluebells, while autumn brings spectacular colors. The route includes some moderate hills and can be muddy after rain, so good walking boots are recommended. Return to The Chaser Inn for a warming meal by the fire.'
            }]
          }
        ],
        order: 4
      },
      {
        _type: 'thingsToDo',
        title: 'Benenden Village & Countryside Walk',
        slug: { _type: 'slug', current: 'benenden-village-countryside-walk' },
        category: 'walks',
        associatedPub: { _type: 'reference', _ref: 'cb4f1a9b-12ab-4047-89ee-e5b505ddd56d' },
        locationDetails: 'Starting from The Bull pub green',
        duration: '3 hours',
        distance: '6 miles',
        difficulty: 'moderate',
        description: [
          {
            _type: 'block',
            _key: 'block1',
            style: 'normal',
            children: [{
              _type: 'span',
              _key: 'span1',
              text: 'This rewarding walk showcases the best of Benenden and the surrounding High Weald countryside. From The Bull, head through the historic village past the famous Benenden School before joining footpaths across rolling farmland. The route offers panoramic views across the Weald and passes through patches of ancient woodland. Look out for local wildlife including deer and various bird species. The return journey brings you past the village cricket ground - perfect timing to catch a match in summer.'
            }]
          }
        ],
        order: 5
      }
    ];

    for (const walk of walks) {
      await client.create(walk);
      console.log(`Created walk: ${walk.title}`);
    }

    // Create Farmers Market
    console.log('Creating Farmers Market...');
    await client.create({
      _type: 'thingsToDo',
      title: 'Shipbourne Farmers Market',
      slug: { _type: 'slug', current: 'shipbourne-farmers-market' },
      category: 'markets',
      associatedPub: { _type: 'reference', _ref: '317df0e6-b219-4006-8bb9-130a92cb473f' },
      locationDetails: 'Village Green next to The Chaser Inn',
      duration: 'Every Thursday 9am-11am',
      description: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span1',
            text: 'Join us every Thursday morning for the weekly Shipbourne Farmers Market, conveniently located on the village green right next to The Chaser Inn. This vibrant community market features the best of local produce including seasonal fruit and vegetables, artisan breads, local honey, free-range eggs, and handmade preserves. '
          }]
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span2',
            text: 'Browse stalls from local farmers and producers, chat with the vendors about their products, and stock up on fresh ingredients. The market has become a weekly social hub for the village - grab a coffee and pastry from one of the stalls and catch up with neighbors. After shopping, why not pop into The Chaser Inn for a hearty breakfast or early lunch?'
          }]
        }
      ],
      externalLink: 'https://www.shipbournefm.co.uk/',
      order: 10
    });

    console.log('All Things To Do content created successfully!');
  } catch (error) {
    console.error('Error creating content:', error);
  }
}

createThingsToDoContent();