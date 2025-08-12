import React from 'react';
import { Instagram, Facebook, Heart, MessageCircle } from 'lucide-react';

interface SocialFeedProps {
  pubName: string;
  instagramHandle?: string;
  facebookUrl?: string;
}

export default function PubSocialFeed({ pubName, instagramHandle = '@whpubs', facebookUrl }: SocialFeedProps) {
  // Mock Instagram posts - in production, these would come from Instagram API
  const mockPosts = [
    {
      id: 1,
      image: '/images/food-1.jpg',
      likes: 234,
      comments: 18,
      caption: 'Sunday roast perfection 🍖'
    },
    {
      id: 2,
      image: '/images/drinks-1.jpg',
      likes: 189,
      comments: 12,
      caption: 'Craft beer tasting evening 🍺'
    },
    {
      id: 3,
      image: '/images/event-1.jpg',
      likes: 312,
      comments: 24,
      caption: 'Last night\'s live music was incredible! 🎵'
    },
    {
      id: 4,
      image: '/images/garden-1.jpg',
      likes: 278,
      comments: 15,
      caption: 'Perfect weather for garden dining ☀️'
    },
    {
      id: 5,
      image: '/images/food-2.jpg',
      likes: 445,
      comments: 31,
      caption: 'New summer menu launches today! 🌮'
    },
    {
      id: 6,
      image: '/images/interior-1.jpg',
      likes: 198,
      comments: 9,
      caption: 'Cozy corners and good times 🔥'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Instagram className="w-8 h-8 text-pink-500" />
              <h2 className="text-4xl font-bold text-primary">Follow Our Journey</h2>
            </div>
            <p className="text-xl text-gray-600 mb-4">
              See what's happening at {pubName} right now
            </p>
            <a 
              href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold"
            >
              <Instagram className="w-5 h-5" />
              {instagramHandle}
            </a>
          </div>

          {/* Instagram Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {mockPosts.map((post) => (
              <div 
                key={post.id}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/images/hero-fallback.jpg';
                  }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm mb-2 line-clamp-2">{post.caption}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" fill="currentColor" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" fill="currentColor" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Follow CTA */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Join Our Community
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Follow us on social media for the latest updates, special offers, and behind-the-scenes content
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                Follow on Instagram
              </a>
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Facebook className="w-5 h-5" />
                  Like on Facebook
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}