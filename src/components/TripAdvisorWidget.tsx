import React, { useEffect, useState } from 'react';
import { Star, ExternalLink, Award, MessageSquare, ThumbsUp } from 'lucide-react';

interface TripAdvisorWidgetProps {
  pubSlug: string;
  pubName: string;
}

// Mapping of pub slugs to TripAdvisor data
const tripAdvisorData = {
  'the-little-brown-jug': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g503920-d1367884-Reviews-The_Little_Brown_Jug-Tonbridge_Kent_England.html',
    locationId: '1367884',
    rating: 4.5,
    reviewCount: 324,
    ranking: '#3 of 45 restaurants in Tonbridge'
  },
  'the-cricketers-inn': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g1011993-d2069972-Reviews-The_Cricketers_Inn_Restaurant-Meopham_Kent_England.html',
    locationId: '2069972',
    rating: 4.5,
    reviewCount: 289,
    ranking: '#1 of 5 restaurants in Meopham'
  },
  'the-bull': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g790312-d732667-Reviews-Bull-Otford_Sevenoaks_District_Kent_England.html',
    locationId: '732667',
    rating: 4.0,
    reviewCount: 412,
    ranking: '#2 of 4 restaurants in Otford'
  },
  'the-bull-otford': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g790312-d732667-Reviews-Bull-Otford_Sevenoaks_District_Kent_England.html',
    locationId: '732667',
    rating: 4.0,
    reviewCount: 412,
    ranking: '#2 of 4 restaurants in Otford'
  },
  'the-rose-and-crown': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g1934185-d10245277-Reviews-The_Rose_and_Crown-Orpington_Bromley_Greater_London_England.html',
    locationId: '10245277',
    rating: 4.5,
    reviewCount: 198,
    ranking: '#8 of 89 restaurants in Orpington'
  },
  'the-chaser-inn': {
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g503920-d1018188-Reviews-The_Chaser_Inn-Tonbridge_Kent_England.html',
    locationId: '1018188',
    rating: 4.5,
    reviewCount: 376,
    ranking: '#5 of 45 restaurants in Tonbridge'
  }
};

export default function TripAdvisorWidget({ pubSlug, pubName }: TripAdvisorWidgetProps) {
  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const data = tripAdvisorData[pubSlug] || tripAdvisorData[`${pubSlug}-otford`];

  if (!data) {
    return null; // Don't show widget if no TripAdvisor data available
  }

  // Mock recent reviews - in production, these would come from TripAdvisor API
  useEffect(() => {
    setRecentReviews([
      {
        author: 'John D',
        date: '2 days ago',
        rating: 5,
        title: 'Excellent food and service',
        text: 'Had a wonderful Sunday roast here. The beef was cooked to perfection and the staff were incredibly attentive.'
      },
      {
        author: 'Sarah M',
        date: '1 week ago',
        rating: 5,
        title: 'Perfect pub lunch',
        text: 'Great atmosphere, friendly staff, and delicious food. The fish and chips were the best I\'ve had in a long time!'
      },
      {
        author: 'Mike T',
        date: '2 weeks ago',
        rating: 4,
        title: 'Lovely traditional pub',
        text: 'Beautiful setting and great selection of ales. Will definitely be back!'
      }
    ]);
  }, []);

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

                {/* View on TripAdvisor Button */}
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  View on TripAdvisor
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Write a Review Button */}
                <a
                  href={`${data.url}#REVIEWS`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 border-2 border-green-500 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Write a Review
                </a>
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