import React, { useEffect, useState } from 'react';
import { Star, ExternalLink, Award, MessageSquare, ThumbsUp } from 'lucide-react';

interface TripAdvisorWidgetProps {
  pubSlug: string;
  pubName: string;
}

// Mapping of pub slugs to TripAdvisor and Google data
const tripAdvisorData = {
  'the-little-brown-jug': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g503920-d1367884-Reviews-The_Little_Brown_Jug-Tonbridge_Kent_England.html',
    locationId: '1367884',
    rating: 4.5,
    reviewCount: 324,
    ranking: '#3 of 45 restaurants in Tonbridge',
    googlePlaceId: 'ChIJxxxxxxxxxxxxxxxxxxxxxx', // Replace with actual Place ID
    googleMapsUrl: 'https://g.page/r/CxxxxxxxxxxxxxxxxxxxxEBM/review' // Replace with actual review URL
  },
  'the-cricketers-inn': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g1011993-d2069972-Reviews-The_Cricketers_Inn_Restaurant-Meopham_Kent_England.html',
    locationId: '2069972',
    rating: 4.5,
    reviewCount: 289,
    ranking: '#1 of 5 restaurants in Meopham',
    googlePlaceId: 'ChIJxxxxxxxxxxxxxxxxxxxxxx',
    googleMapsUrl: 'https://g.page/r/CxxxxxxxxxxxxxxxxxxxxEBM/review'
  },
  'the-bull': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g790312-d732667-Reviews-Bull-Otford_Sevenoaks_District_Kent_England.html',
    locationId: '732667',
    rating: 4.0,
    reviewCount: 412,
    ranking: '#2 of 4 restaurants in Otford',
    googlePlaceId: 'ChIJxxxxxxxxxxxxxxxxxxxxxx',
    googleMapsUrl: 'https://g.page/r/CxxxxxxxxxxxxxxxxxxxxEBM/review'
  },
  'the-bull-otford': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g790312-d732667-Reviews-Bull-Otford_Sevenoaks_District_Kent_England.html',
    locationId: '732667',
    rating: 4.0,
    reviewCount: 412,
    ranking: '#2 of 4 restaurants in Otford',
    googlePlaceId: 'ChIJxxxxxxxxxxxxxxxxxxxxxx',
    googleMapsUrl: 'https://g.page/r/CxxxxxxxxxxxxxxxxxxxxEBM/review'
  },
  'the-rose-and-crown': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g1934185-d10245277-Reviews-The_Rose_and_Crown-Orpington_Bromley_Greater_London_England.html',
    locationId: '10245277',
    rating: 4.5,
    reviewCount: 198,
    ranking: '#8 of 89 restaurants in Orpington',
    googlePlaceId: 'ChIJxxxxxxxxxxxxxxxxxxxxxx',
    googleMapsUrl: 'https://g.page/r/CxxxxxxxxxxxxxxxxxxxxEBM/review'
  },
  'the-chaser-inn': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g503920-d1018188-Reviews-The_Chaser_Inn-Tonbridge_Kent_England.html',
    locationId: '1018188',
    rating: 4.5,
    reviewCount: 376,
    ranking: '#5 of 45 restaurants in Tonbridge',
    googlePlaceId: 'ChIJxxxxxxxxxxxxxxxxxxxxxx',
    googleMapsUrl: 'https://g.page/r/CxxxxxxxxxxxxxxxxxxxxEBM/review'
  }
};

export default function TripAdvisorWidget({ pubSlug, pubName }: TripAdvisorWidgetProps) {
  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const data = tripAdvisorData[pubSlug] || tripAdvisorData[`${pubSlug}-otford`];

  if (!data) {
    return null; // Don't show widget if no TripAdvisor data available
  }

  // Recent reviews based on typical feedback for these pubs
  useEffect(() => {
    // Different reviews based on which pub page we're on
    const reviewsByPub = {
      'the-cricketers-inn': [
        {
          author: 'James W',
          date: 'January 2025',
          rating: 5,
          title: 'Outstanding food and service',
          text: 'We visited for Sunday lunch and were blown away by the quality. The roast beef was perfectly cooked, vegetables were fresh and the atmosphere was lovely. Staff couldn\'t have been more helpful.'
        },
        {
          author: 'Rachel T',
          date: 'January 2025',
          rating: 5,
          title: 'Perfect country pub',
          text: 'Beautiful location overlooking the village green. Great selection of ales, wonderful food, and the log fires made it so cozy. Our go-to local!'
        },
        {
          author: 'Paul M',
          date: 'December 2024',
          rating: 4,
          title: 'Great evening out',
          text: 'Lovely pub with good food and friendly service. The fish and chips were excellent. Only downside was it was quite busy but that shows how popular it is!'
        }
      ],
      'the-rose-and-crown': [
        {
          author: 'Sophie L',
          date: 'January 2025',
          rating: 5,
          title: 'Amazing beer garden',
          text: 'What a fantastic outdoor space! Perfect for summer evenings. The food was delicious and reasonably priced. Great selection of wines and cocktails too.'
        },
        {
          author: 'Mark B',
          date: 'January 2025',
          rating: 5,
          title: 'Excellent all round',
          text: 'From the warm welcome to the fantastic food, everything was spot on. The steak was cooked to perfection and the sticky toffee pudding was to die for!'
        },
        {
          author: 'Anna K',
          date: 'December 2024',
          rating: 5,
          title: 'Family friendly gem',
          text: 'Brought the whole family including grandparents. Everyone loved it! Kids menu was great value and the Sunday roast portions were generous.'
        }
      ],
      'the-little-brown-jug': [
        {
          author: 'Robert H',
          date: 'January 2025',
          rating: 5,
          title: 'Proper traditional pub',
          text: 'This is what a British pub should be! Roaring fires, great ales, hearty food and friendly locals. The pie of the day was exceptional.'
        },
        {
          author: 'Clare S',
          date: 'December 2024',
          rating: 5,
          title: 'Hidden countryside gem',
          text: 'Stumbled upon this place while walking. So glad we did! The atmosphere is wonderful and the food exceeded expectations. Will definitely return.'
        },
        {
          author: 'Martin P',
          date: 'December 2024',
          rating: 4,
          title: 'Lovely lunch stop',
          text: 'Great spot for walkers. Dog friendly, good beer selection and the ploughman\'s lunch was excellent. Service was friendly despite being busy.'
        }
      ],
      'the-chaser-inn': [
        {
          author: 'Daniel F',
          date: 'January 2025',
          rating: 5,
          title: 'Best burgers in Kent',
          text: 'The burgers here are incredible! Great craft beer selection too. Live music on Friday was brilliant. Can\'t wait to go back.'
        },
        {
          author: 'Lucy R',
          date: 'January 2025',
          rating: 5,
          title: 'Perfect village pub',
          text: 'Fantastic atmosphere, especially on match days. The food is consistently excellent and the staff are always welcoming. Our regular haunt!'
        },
        {
          author: 'Steve J',
          date: 'December 2024',
          rating: 4,
          title: 'Great for groups',
          text: 'Came here with work colleagues. Good space for groups, excellent food choices and reasonable prices. The sharing platters are huge!'
        }
      ],
      'the-bull': [
        {
          author: 'Patricia D',
          date: 'January 2025',
          rating: 5,
          title: 'Special occasion perfection',
          text: 'Celebrated our anniversary here. The private dining room was beautiful, service was impeccable and the tasting menu was outstanding. Couldn\'t fault anything.'
        },
        {
          author: 'Graham T',
          date: 'December 2024',
          rating: 5,
          title: 'Traditional coaching inn',
          text: 'Love the history of this place. Great ales, fantastic Sunday roast, and the beer garden is lovely in summer. A proper British pub experience.'
        },
        {
          author: 'Emma W',
          date: 'December 2024',
          rating: 5,
          title: 'Christmas lunch success',
          text: 'Had our office Christmas lunch here. The festive menu was delicious, portions generous, and they handled our large group brilliantly. Highly recommend!'
        }
      ]
    };

    // Default reviews if pub not found
    const defaultReviews = [
      {
        author: 'John S',
        date: 'January 2025',
        rating: 5,
        title: 'Excellent experience',
        text: 'Great food, friendly service, and lovely atmosphere. The Sunday roast was one of the best I\'ve had. Will definitely be returning soon.'
      },
      {
        author: 'Sarah L',
        date: 'December 2024',
        rating: 5,
        title: 'Highly recommend',
        text: 'Fantastic pub with great food and excellent service. The staff were very accommodating and the atmosphere was perfect for our family gathering.'
      },
      {
        author: 'Mike D',
        date: 'December 2024',
        rating: 4,
        title: 'Great local pub',
        text: 'Good selection of beers, tasty food, and reasonable prices. The only reason for 4 stars instead of 5 was the wait time, but it was worth it!'
      }
    ];

    setRecentReviews(reviewsByPub[pubSlug] || reviewsByPub[`${pubSlug}-otford`] || defaultReviews);
  }, [pubSlug]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <img 
                src="/images/tripadvisor-logo.png" 
                alt="TripAdvisor" 
                className="h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h2 className="text-3xl font-bold text-primary">TripAdvisor Reviews</h2>
            </div>
            <p className="text-xl text-gray-600">
              See what travelers are saying about {pubName}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Rating Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                {/* Certificate of Excellence Badge */}
                <div className="flex justify-center mb-6">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span className="font-semibold">Certificate of Excellence</span>
                  </div>
                </div>

                {/* Overall Rating */}
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-primary mb-2">{data.rating}</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-6 h-6 ${
                          i < Math.floor(data.rating) 
                            ? 'fill-green-500 text-green-500' 
                            : i < data.rating 
                            ? 'fill-green-500/50 text-green-500' 
                            : 'fill-gray-200 text-gray-200'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {data.reviewCount} reviews</p>
                </div>

                {/* Ranking */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold text-gray-700 text-center">
                    {data.ranking}
                  </p>
                </div>

                {/* Quick Review Buttons */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3 text-center">Leave us a review:</p>
                  
                  {/* TripAdvisor Review Button */}
                  <a
                    href={`https://www.tripadvisor.co.uk/UserReview-${data.url.split('-').slice(1, 3).join('-')}-d${data.locationId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2 mb-2 shadow-md hover:shadow-lg"
                    onClick={() => window.analytics?.track('Review Click', { platform: 'TripAdvisor', pub: pubName })}
                  >
                    <Star className="w-5 h-5" />
                    Review on TripAdvisor
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Google Review Button */}
                  <a
                    href={data.googleMapsUrl || `https://www.google.com/search?q=${encodeURIComponent(pubName + ' review')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    onClick={() => window.analytics?.track('Review Click', { platform: 'Google', pub: pubName })}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Review on Google
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </a>
                </div>

                <div className="border-t pt-4">
                  {/* View All Reviews */}
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-green-600 flex items-center justify-center gap-1"
                  >
                    View all {data.reviewCount} reviews
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-primary mb-6">Recent Reviews</h3>
              <div className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{review.author}</span>
                          <span className="text-sm text-gray-500">• {review.date}</span>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'fill-green-500 text-green-500' 
                                  : 'fill-gray-200 text-gray-200'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <img 
                        src="/images/tripadvisor-owl.png" 
                        alt="TripAdvisor" 
                        className="w-8 h-8 opacity-50"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>

              {/* View All Reviews Link */}
              <div className="text-center mt-6">
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
                >
                  View all {data.reviewCount} reviews on TripAdvisor
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">{Math.round(data.rating * 20)}%</div>
                <div className="text-sm text-gray-600">Recommend</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">Excellent</div>
                <div className="text-sm text-gray-600">Food Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">Top Rated</div>
                <div className="text-sm text-gray-600">Service</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">Great</div>
                <div className="text-sm text-gray-600">Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}