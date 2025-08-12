import React from 'react';
import { Clock, MapPin, Wifi, Car, Dog, Baby, Utensils, Music, Phone, Star } from 'lucide-react';

interface QuickInfoProps {
  pub: {
    openingHours?: string;
    location?: string;
    amenities?: string[];
    contactPhone?: string;
    parkingInfo?: string;
    rating?: number;
  };
}

export default function PubQuickInfo({ pub }: QuickInfoProps) {
  // Check if currently open (simplified logic)
  const isOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    // Simple check - assumes open 11am-11pm
    return hour >= 11 && hour < 23;
  };

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="w-5 h-5" />;
    if (lower.includes('parking')) return <Car className="w-5 h-5" />;
    if (lower.includes('dog')) return <Dog className="w-5 h-5" />;
    if (lower.includes('family') || lower.includes('child')) return <Baby className="w-5 h-5" />;
    if (lower.includes('food')) return <Utensils className="w-5 h-5" />;
    if (lower.includes('music') || lower.includes('live')) return <Music className="w-5 h-5" />;
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Open Status */}
      <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-green-50 to-white rounded-lg">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
          isOpen() ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <Clock className="w-6 h-6 text-white" />
        </div>
        <span className={`font-bold text-lg ${isOpen() ? 'text-green-600' : 'text-red-600'}`}>
          {isOpen() ? 'Open Now' : 'Closed'}
        </span>
        <span className="text-sm text-gray-600 mt-1">Until 11pm</span>
      </div>

      {/* Location */}
      <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-lg text-gray-800">Location</span>
        <span className="text-sm text-gray-600 mt-1">Get Directions</span>
      </div>

      {/* Phone */}
      {pub.contactPhone && (
        <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg">
          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-2">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-800">Call Us</span>
          <span className="text-sm text-gray-600 mt-1">{pub.contactPhone}</span>
        </div>
      )}

      {/* Rating */}
      <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-yellow-50 to-white rounded-lg">
        <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center mb-2">
          <Star className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-lg text-gray-800">4.5 Stars</span>
        <span className="text-sm text-gray-600 mt-1">236 Reviews</span>
      </div>

      {/* Amenities Row */}
      <div className="col-span-2 md:col-span-4 flex justify-center gap-6 pt-4 border-t">
        {pub.amenities?.slice(0, 6).map((amenity, index) => {
          const icon = getAmenityIcon(amenity);
          if (!icon) return null;
          return (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                {icon}
              </div>
              <span className="text-xs text-gray-600 mt-1">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}