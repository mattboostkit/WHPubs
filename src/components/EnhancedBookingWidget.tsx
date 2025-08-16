import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Phone, MapPin, Star, CheckCircle, Utensils, Dog, Wifi, Car, Heart } from 'lucide-react';
import LiveResBookingWidget from './LiveResBookingWidget';

interface EnhancedBookingWidgetProps {
  pub: {
    name: string;
    slug: { current: string };
    liveResSiteId?: string;
    contactPhone?: string;
    location?: string;
    locationName?: string;
    amenities?: string[];
    openingHours?: string;
    foodServingTimes?: string;
  };
  className?: string;
}

export default function EnhancedBookingWidget({ pub, className = '' }: EnhancedBookingWidgetProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBookNow = () => {
    setShowWidget(true);
    // Track booking conversion with analytics
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Booking Started', {
        pubName: pub.name,
        pubSlug: pub.slug.current,
        source: 'enhanced_widget'
      });
    }
  };

  // Format amenities with icons
  const amenityIcons: Record<string, React.ReactNode> = {
    'Dog Friendly': <Dog className="w-4 h-4" />,
    'dogFriendly': <Dog className="w-4 h-4" />,
    'Free Wi-Fi': <Wifi className="w-4 h-4" />,
    'Free WiFi': <Wifi className="w-4 h-4" />,
    'Parking': <Car className="w-4 h-4" />,
    'Food': <Utensils className="w-4 h-4" />,
    'food': <Utensils className="w-4 h-4" />,
    'Sunday Roasts': <Heart className="w-4 h-4" />
  };

  const formatAmenities = (amenities: string[]) => {
    // Remove duplicates and take top 6 most important ones
    const uniqueAmenities = [...new Set(amenities)];
    const priorityOrder = ['Dog Friendly', 'dogFriendly', 'Sunday Roasts', 'Free Wi-Fi', 'Free WiFi', 'Food', 'food'];
    const sortedAmenities = uniqueAmenities.sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a);
      const bIndex = priorityOrder.indexOf(b);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
    return sortedAmenities.slice(0, 6);
  };

  if (showWidget) {
    return (
      <div className={`w-full ${className}`}>
        {/* Mobile-optimized header */}
        {isMobile && (
          <div className="mb-4 p-4 bg-primary text-white rounded-lg">
            <h3 className="text-lg font-bold">{pub.name}</h3>
            <p className="text-sm opacity-90">Complete your booking below</p>
          </div>
        )}
        
        <LiveResBookingWidget
          siteId={pub.liveResSiteId}
          pubName={pub.name}
          pubSlug={pub.slug.current}
          height={isMobile ? '800px' : '1000px'}
          className="w-full"
        />
        
        {/* Back button for mobile */}
        {isMobile && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowWidget(false)}
              className="w-full"
            >
              ← Back to Pub Information
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Hero Booking Card */}
      <Card className="border-secondary/20 shadow-xl bg-gradient-to-br from-white to-secondary/5">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-6 h-6 text-secondary mr-2" />
            <CardTitle className="text-2xl text-primary">Book Your Table</CardTitle>
          </div>
          <p className="text-lg text-primary/70">
            Secure your perfect dining experience at {pub.name}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pub.contactPhone && (
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Phone className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-xs font-medium text-primary/60">Call Us</p>
                  <a 
                    href={`tel:${pub.contactPhone.replace(/\s/g, '')}`}
                    className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
                  >
                    {pub.contactPhone}
                  </a>
                </div>
              </div>
            )}
            
            {(pub.location || pub.locationName) && (
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <MapPin className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-xs font-medium text-primary/60">Location</p>
                  <p className="text-sm font-semibold text-primary">
                    {pub.locationName || pub.location}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Amenities */}
          {pub.amenities && pub.amenities.length > 0 && (
            <div>
              <p className="text-sm font-medium text-primary/70 mb-3">What We Offer:</p>
              <div className="flex flex-wrap gap-2">
                {formatAmenities(pub.amenities).map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    {amenityIcons[amenity] || <Star className="w-3 h-3" />}
                    <span>{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Booking Benefits */}
          <div className="bg-secondary/10 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 text-secondary mr-2" />
              Booking Benefits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <span className="text-secondary mr-2">✓</span>
                <span>Instant confirmation</span>
              </div>
              <div className="flex items-center">
                <span className="text-secondary mr-2">✓</span>
                <span>Best table selection</span>
              </div>
              <div className="flex items-center">
                <span className="text-secondary mr-2">✓</span>
                <span>Special dietary needs</span>
              </div>
              <div className="flex items-center">
                <span className="text-secondary mr-2">✓</span>
                <span>Easy modification</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handleBookNow}
            size="lg" 
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Your Table Now
          </Button>

          {/* Alternative Contact */}
          {pub.contactPhone && (
            <div className="text-center pt-4 border-t border-primary/10">
              <p className="text-sm text-primary/60 mb-2">Prefer to call?</p>
              <a 
                href={`tel:${pub.contactPhone.replace(/\s/g, '')}`}
                className="text-secondary hover:text-secondary/80 font-semibold"
              >
                📞 Call {pub.contactPhone}
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Opening Hours Card */}
      {(pub.openingHours || pub.foodServingTimes) && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="w-5 h-5 mr-2 text-secondary" />
              Opening Times
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pub.openingHours && (
              <div>
                <p className="font-medium text-primary mb-2">Opening Hours</p>
                <pre className="text-sm text-primary/80 whitespace-pre-wrap font-sans">
                  {pub.openingHours}
                </pre>
              </div>
            )}
            
            {pub.foodServingTimes && (
              <div>
                <p className="font-medium text-primary mb-2 flex items-center">
                  <Utensils className="w-4 h-4 mr-2" />
                  Food Service
                </p>
                <pre className="text-sm text-primary/80 whitespace-pre-wrap font-sans">
                  {pub.foodServingTimes}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}