import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Instagram, Facebook, Twitter, Heart, MessageCircle, Share2, ExternalLink, Camera, Users, MapPin, Clock } from 'lucide-react';

interface EnhancedSocialFeedProps {
  pubName: string;
  pubSlug?: string;
  instagramHandle?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  className?: string;
}

export default function EnhancedSocialFeed({ 
  pubName, 
  pubSlug, 
  instagramHandle, 
  facebookUrl, 
  twitterUrl, 
  className = '' 
}: EnhancedSocialFeedProps) {
  const [activeTab, setActiveTab] = useState<'instagram' | 'facebook' | 'twitter' | 'reviews'>('instagram');

  // Mock social media posts - in production, these would come from actual APIs
  const mockInstagramPosts = [
    {
      id: '1',
      image: '/images/pub-interior-cozy.jpg',
      caption: 'Cozy Sunday afternoon by the fire at ' + pubName + ' 🔥 Perfect spot for your weekend roast! #SundayRoast #CozyPub #WHPubs',
      likes: 127,
      comments: 23,
      timestamp: '2 hours ago',
      location: pubName
    },
    {
      id: '2',
      image: '/images/food-fallback.jpg',
      caption: 'Fresh from our kitchen - locally sourced ingredients making magic happen! 👨‍🍳✨ #LocalIngredients #FreshFood #DevelopmentKitchen',
      likes: 89,
      comments: 15,
      timestamp: '1 day ago',
      location: pubName
    },
    {
      id: '3',
      image: '/images/pub-fallback.jpg',
      caption: 'Golden hour at ' + pubName + ' - there really is no place like it! 🌅 Book your table for tonight! #GoldenHour #PubLife',
      likes: 156,
      comments: 31,
      timestamp: '3 days ago',
      location: pubName
    }
  ];

  const mockFacebookPosts = [
    {
      id: '1',
      content: '🎉 This weekend we\'re hosting live music in our beer garden! Join us Saturday 7pm for an evening of great food, drinks, and local talent. Book your table now!',
      likes: 45,
      comments: 12,
      shares: 8,
      timestamp: '1 day ago'
    },
    {
      id: '2',
      content: '🍺 New local ale just arrived! We\'re now serving Kentish Gold from Shepherd Neame - perfectly paired with our fish and chips. Come try it!',
      likes: 67,
      comments: 18,
      shares: 4,
      timestamp: '3 days ago'
    }
  ];

  const mockReviews = [
    {
      id: '1',
      platform: 'TripAdvisor',
      rating: 5,
      text: 'Absolutely fantastic meal at ' + pubName + '! The staff were incredibly welcoming and the food was outstanding. The Sunday roast was perfection!',
      author: 'Sarah M.',
      date: '1 week ago',
      verified: true
    },
    {
      id: '2',
      platform: 'Google',
      rating: 5,
      text: 'Perfect local pub with amazing atmosphere. Dog-friendly and the garden is beautiful. Will definitely be back!',
      author: 'James T.',
      date: '2 weeks ago',
      verified: true
    }
  ];

  const socialPlatforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      handle: instagramHandle || '@whpubs',
      active: true
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'from-blue-600 to-blue-700',
      handle: 'WH Pubs',
      active: !!facebookUrl
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      color: 'from-blue-400 to-blue-500',
      handle: '@whpubs',
      active: !!twitterUrl
    },
    {
      id: 'reviews',
      name: 'Reviews',
      icon: <Heart className="w-5 h-5" />,
      color: 'from-red-500 to-pink-500',
      handle: 'Customer Reviews',
      active: true
    }
  ];

  const handleSocialClick = (url: string) => {
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Social Media Click', {
        pubName: pubName,
        pubSlug: pubSlug,
        platform: activeTab,
        url: url
      });
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderInstagramFeed = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockInstagramPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="aspect-square relative overflow-hidden">
            <img 
              src={post.image} 
              alt="Instagram post"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
              }}
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-black/50 text-white">
                <Camera className="w-3 h-3 mr-1" />
                {post.timestamp}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <p className="text-sm text-primary/80 mb-3 line-clamp-2">{post.caption}</p>
            <div className="flex items-center justify-between text-sm text-primary/60">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-red-500" />
                  {post.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {post.comments}
                </span>
              </div>
              {post.location && (
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {post.location}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFacebookFeed = () => (
    <div className="space-y-4">
      {mockFacebookPosts.map((post) => (
        <Card key={post.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                {pubName.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-primary">{pubName}</h4>
                <p className="text-sm text-primary/60 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.timestamp}
                </p>
              </div>
            </div>
            <p className="text-primary/80 mb-4">{post.content}</p>
            <div className="flex items-center space-x-6 text-sm text-primary/60 border-t pt-3">
              <span className="flex items-center hover:text-blue-600 cursor-pointer">
                <Heart className="w-4 h-4 mr-1" />
                {post.likes} Likes
              </span>
              <span className="flex items-center hover:text-blue-600 cursor-pointer">
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.comments} Comments
              </span>
              <span className="flex items-center hover:text-blue-600 cursor-pointer">
                <Share2 className="w-4 h-4 mr-1" />
                {post.shares} Shares
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-4">
      {mockReviews.map((review) => (
        <Card key={review.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{review.platform}</Badge>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Heart 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <span className="text-sm text-primary/60">{review.date}</span>
            </div>
            <p className="text-primary/80 mb-3 italic">"{review.text}"</p>
            <p className="text-sm font-medium text-primary">— {review.author}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">Follow Our Journey</h2>
        <p className="text-lg text-primary/70">
          Stay connected with {pubName} for the latest updates, behind-the-scenes content, and customer stories
        </p>
      </div>

      {/* Platform Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {socialPlatforms.filter(platform => platform.active).map((platform) => (
          <button
            key={platform.id}
            onClick={() => setActiveTab(platform.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === platform.id
                ? `bg-gradient-to-r ${platform.color} text-white shadow-lg`
                : 'bg-gray-100 text-primary/70 hover:bg-gray-200'
            }`}
          >
            {platform.icon}
            <span>{platform.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'instagram' && renderInstagramFeed()}
        {activeTab === 'facebook' && renderFacebookFeed()}
        {activeTab === 'twitter' && (
          <div className="text-center py-12">
            <Twitter className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Follow us on Twitter</h3>
            <p className="text-primary/60 mb-4">Get real-time updates and join the conversation</p>
            <Button 
              onClick={() => handleSocialClick(twitterUrl || 'https://twitter.com/whpubs')}
              className="bg-blue-400 hover:bg-blue-500"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Follow @whpubs
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
        {activeTab === 'reviews' && renderReviews()}
      </div>

      {/* Follow CTAs */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6 rounded-lg">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
          <p className="text-white/90">Follow us on social media for the latest news, events, and behind-the-scenes content</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {instagramHandle && (
            <Button
              variant="secondary"
              onClick={() => handleSocialClick(`https://instagram.com/${instagramHandle.replace('@', '')}`)}
              className="flex items-center space-x-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          )}
          
          {facebookUrl && (
            <Button
              variant="secondary"
              onClick={() => handleSocialClick(facebookUrl)}
              className="flex items-center space-x-2"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          )}
          
          {twitterUrl && (
            <Button
              variant="secondary"
              onClick={() => handleSocialClick(twitterUrl)}
              className="flex items-center space-x-2"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      {/* User Generated Content Section */}
      <Card className="bg-gradient-to-br from-secondary/5 to-primary/5">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Camera className="w-6 h-6 mr-2 text-secondary" />
            Share Your Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-primary/70 mb-4">
            Had a great time at {pubName}? Share your photos and tag us for a chance to be featured!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">#WHPubs</Badge>
            <Badge variant="outline">#{pubName.replace(/\s+/g, '')}</Badge>
            <Badge variant="outline">#TraditionalPub</Badge>
            <Badge variant="outline">#KentPubs</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}