import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Utensils, MapPin, Star, Lightbulb, Leaf, Award, Users, Clock, ArrowRight, ExternalLink, Heart, Sparkles } from 'lucide-react';

interface DevelopmentKitchenShowcaseProps {
  className?: string;
}

export default function DevelopmentKitchenShowcase({ className = '' }: DevelopmentKitchenShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState<'innovation' | 'sourcing' | 'training' | 'sustainability'>('innovation');

  const features = {
    innovation: {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Menu Innovation",
      description: "Where creativity meets tradition",
      content: "Our Development Kitchen is the creative heartbeat of WH Pubs, where our culinary team experiments with seasonal ingredients, traditional techniques, and modern innovation. Every dish that appears on our pub menus is carefully crafted and tested here first.",
      highlights: [
        "Seasonal menu development",
        "Traditional technique preservation", 
        "Modern culinary innovation",
        "Customer feedback integration"
      ],
      image: "/images/chef-cooking.jpg"
    },
    sourcing: {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local Sourcing",
      description: "Supporting Kent's finest producers",
      content: "We work directly with local farms, breweries, and artisan producers across Kent and South East England. This not only ensures the freshest ingredients but also supports our local community and reduces our environmental impact.",
      highlights: [
        "Direct farm partnerships",
        "Seasonal ingredient focus",
        "Local brewery collaborations",
        "Artisan producer support"
      ],
      image: "/images/local-ingredients.jpg"
    },
    training: {
      icon: <Users className="w-8 h-8" />,
      title: "Chef Training",
      description: "Developing culinary excellence",
      content: "Our Development Kitchen serves as a training hub for all our kitchen teams. Regular workshops, technique sessions, and menu training ensure consistent quality across all five WH Pubs locations.",
      highlights: [
        "Regular training workshops",
        "Technique development sessions",
        "Menu consistency training",
        "Career development programs"
      ],
      image: "/images/chef-training.jpg"
    },
    sustainability: {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description: "Responsible culinary practices",
      content: "Environmental responsibility is at the core of our Development Kitchen operations. We focus on waste reduction, sustainable sourcing, and energy-efficient practices that benefit both our business and the planet.",
      highlights: [
        "Zero waste cooking techniques",
        "Sustainable packaging research",
        "Energy-efficient equipment",
        "Composting and recycling programs"
      ],
      image: "/images/sustainable-kitchen.jpg"
    }
  };

  const achievements = [
    {
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      title: "Kent Food & Drink Awards",
      description: "Winner - Best Pub Food 2024"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "AA Rosette",
      description: "Quality dining recognition"
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: "Sustainable Restaurant Association",
      description: "3-star sustainability rating"
    }
  ];

  const currentFeature = features[activeFeature];

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Hero Section */}
      <div className="text-center">
        <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
          <Sparkles className="w-5 h-5 mr-2" />
          Innovation Hub
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Development Kitchen
        </h1>
        <p className="text-xl text-primary/70 max-w-3xl mx-auto mb-6">
          The creative heart of WH Pubs where culinary tradition meets innovation. 
          Discover how we craft exceptional dining experiences that set us apart from every other pub group.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline">🍽️ Menu Innovation</Badge>
          <Badge variant="outline">🌱 Local Sourcing</Badge>
          <Badge variant="outline">👨‍🍳 Chef Training</Badge>
          <Badge variant="outline">♻️ Sustainability</Badge>
        </div>
      </div>

      {/* Unique Advantage Banner */}
      <Card className="bg-gradient-to-r from-secondary to-secondary/90 text-white shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-12 h-12 mr-3" />
            <div>
              <h2 className="text-2xl font-bold">Our Competitive Edge</h2>
              <p className="text-white/90">What other pub groups don't have</p>
            </div>
          </div>
          <p className="text-lg text-white/95 max-w-4xl mx-auto">
            While other pub chains rely on standardised menus and mass-produced food, 
            WH Pubs operates our own Development Kitchen - a dedicated culinary innovation centre 
            that creates bespoke seasonal menus using locally-sourced ingredients. This gives us 
            unmatched flexibility, quality, and authenticity that corporate competitors simply cannot match.
          </p>
        </CardContent>
      </Card>

      {/* Interactive Features Section */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Feature Navigation */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary mb-4">What Makes Us Different</h3>
          {Object.entries(features).map(([key, feature]) => (
            <button
              key={key}
              onClick={() => setActiveFeature(key as any)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                activeFeature === key
                  ? 'border-secondary bg-secondary/10 shadow-lg'
                  : 'border-primary/20 hover:border-secondary/50 hover:bg-secondary/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${activeFeature === key ? 'bg-secondary text-white' : 'bg-primary/10 text-secondary'}`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-primary">{feature.title}</h4>
                  <p className="text-sm text-primary/60">{feature.description}</p>
                </div>
                {activeFeature === key && (
                  <ArrowRight className="w-5 h-5 text-secondary" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Feature Content */}
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg mb-6 flex items-center justify-center">
              <img 
                src={currentFeature.image} 
                alt={currentFeature.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.svg';
                }}
              />
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                {currentFeature.icon}
              </div>
              <h4 className="text-xl font-bold text-primary">{currentFeature.title}</h4>
            </div>
            
            <p className="text-primary/80 mb-6">{currentFeature.content}</p>
            
            <div className="space-y-2">
              <h5 className="font-semibold text-primary">Key Features:</h5>
              {currentFeature.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm text-primary/70">{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center">
            <Award className="w-6 h-6 mr-2 text-secondary" />
            Recognition & Awards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  {achievement.icon}
                </div>
                <h4 className="font-semibold text-primary mb-1">{achievement.title}</h4>
                <p className="text-sm text-primary/60">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Behind the Scenes */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-secondary" />
              A Day in Our Kitchen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">6:00 AM - Fresh Deliveries</p>
                <p className="text-sm text-primary/60">Local suppliers arrive with the day's fresh ingredients</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">8:00 AM - Menu Development</p>
                <p className="text-sm text-primary/60">Chefs work on new seasonal dishes and recipes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">10:00 AM - Quality Testing</p>
                <p className="text-sm text-primary/60">Taste testing and refinement of new dishes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">2:00 PM - Training Sessions</p>
                <p className="text-sm text-primary/60">Kitchen teams learn new techniques and recipes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-secondary" />
              What Our Chefs Say
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-primary/80 italic mb-4">
              "The Development Kitchen gives us the freedom to be creative while staying true to traditional British cooking. 
              We can respond to seasonal changes and customer feedback in ways that chain restaurants simply cannot."
            </blockquote>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-primary">Sarah Mitchell</p>
                <p className="text-sm text-primary/60">Head of Culinary Development</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary to-primary/90 text-white shadow-2xl">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Experience the Difference</h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Taste the innovation and passion that goes into every dish. 
            Book a table at any of our pubs and experience what truly exceptional pub food tastes like.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <a href="/book-table">
                <Utensils className="w-5 h-5 mr-2" />
                Book a Table
              </a>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="/our-pubs">
                <MapPin className="w-5 h-5 mr-2" />
                Find Your Local
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Innovation Pipeline */}
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Coming Soon from Our Kitchen</CardTitle>
          <p className="text-primary/60">Sneak peek at what we're working on</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-primary/20 rounded-lg">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Spring Menu 2025</h4>
              <p className="text-sm text-primary/60">Featuring wild garlic, English asparagus, and locally foraged ingredients</p>
            </div>
            <div className="text-center p-4 border border-primary/20 rounded-lg">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Chef's Table Experiences</h4>
              <p className="text-sm text-primary/60">Exclusive dining experiences showcasing our development process</p>
            </div>
            <div className="text-center p-4 border border-primary/20 rounded-lg">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Cooking Workshops</h4>
              <p className="text-sm text-primary/60">Learn techniques from our development chefs in hands-on sessions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}