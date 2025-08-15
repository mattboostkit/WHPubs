import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  Dog, TreePine, Beer, Utensils, Car, Wifi, Users, 
  Accessibility, Music, Heart, Calendar, Flame, 
  Coffee, ShoppingBag, Phone, Clock, MapPin 
} from 'lucide-react';

interface AmenityBadgesProps {
  amenities?: string[];
  maxDisplay?: number;
  showIcons?: boolean;
}

// Map common amenities to icons
const amenityIconMap: Record<string, React.ReactNode> = {
  // Dog-related
  'dog friendly': <Dog className="w-3 h-3" />,
  'dog': <Dog className="w-3 h-3" />,
  'dogs welcome': <Dog className="w-3 h-3" />,
  
  // Garden/Outdoor
  'garden': <TreePine className="w-3 h-3" />,
  'beer garden': <TreePine className="w-3 h-3" />,
  'outdoor seating': <TreePine className="w-3 h-3" />,
  'patio': <TreePine className="w-3 h-3" />,
  
  // Food/Drink
  'local ales': <Beer className="w-3 h-3" />,
  'ale': <Beer className="w-3 h-3" />,
  'craft beer': <Beer className="w-3 h-3" />,
  'real ale': <Beer className="w-3 h-3" />,
  'food': <Utensils className="w-3 h-3" />,
  'restaurant': <Utensils className="w-3 h-3" />,
  'dining': <Utensils className="w-3 h-3" />,
  'sunday roast': <Utensils className="w-3 h-3" />,
  'breakfast': <Coffee className="w-3 h-3" />,
  'coffee': <Coffee className="w-3 h-3" />,
  
  // Accessibility/Family
  'parking': <Car className="w-3 h-3" />,
  'car park': <Car className="w-3 h-3" />,
  'free parking': <Car className="w-3 h-3" />,
  'wifi': <Wifi className="w-3 h-3" />,
  'free wifi': <Wifi className="w-3 h-3" />,
  'family friendly': <Users className="w-3 h-3" />,
  'wheelchair accessible': <Accessibility className="w-3 h-3" />,
  
  // Entertainment
  'live music': <Music className="w-3 h-3" />,
  'music': <Music className="w-3 h-3" />,
  'events': <Calendar className="w-3 h-3" />,
  'functions': <Calendar className="w-3 h-3" />,
  'private dining': <Users className="w-3 h-3" />,
  
  // Features
  'open fire': <Flame className="w-3 h-3" />,
  'log fire': <Flame className="w-3 h-3" />,
  'fireplace': <Flame className="w-3 h-3" />,
};

// Get icon for amenity - tries to match the amenity string to known icons
const getAmenityIcon = (amenity: string): React.ReactNode | null => {
  const lowercaseAmenity = amenity.toLowerCase();
  
  // Direct match
  if (amenityIconMap[lowercaseAmenity]) {
    return amenityIconMap[lowercaseAmenity];
  }
  
  // Partial match - check if amenity contains any known keywords
  for (const [key, icon] of Object.entries(amenityIconMap)) {
    if (lowercaseAmenity.includes(key) || key.includes(lowercaseAmenity)) {
      return icon;
    }
  }
  
  return null;
};

// Clean amenity text to remove emojis if needed
const cleanAmenityText = (amenity: string): string => {
  // Remove common emoji patterns but keep the text
  return amenity.replace(/^[\u{1F000}-\u{1F6FF}][\u{1F300}-\u{1F5FF}][\u{1F600}-\u{1F64F}][\u{1F680}-\u{1F6FF}][\u{2600}-\u{26FF}][\u{2700}-\u{27BF}]\s*/u, '').trim();
};

export default function AmenityBadges({ amenities = [], maxDisplay = 6, showIcons = true }: AmenityBadgesProps) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  // Filter out empty strings and limit display
  const displayAmenities = amenities
    .filter(amenity => amenity && amenity.trim().length > 0)
    .slice(0, maxDisplay);

  return (
    <div className="flex flex-wrap gap-2">
      {displayAmenities.map((amenity, index) => {
        const cleanText = cleanAmenityText(amenity);
        const icon = showIcons ? getAmenityIcon(amenity) : null;
        
        return (
          <Badge 
            key={index}
            variant="secondary" 
            className="text-xs flex items-center gap-1 bg-secondary/20 text-primary border border-secondary/40"
          >
            {icon}
            {cleanText}
          </Badge>
        );
      })}
      
      {amenities.length > maxDisplay && (
        <Badge 
          variant="outline" 
          className="text-xs text-gray-500 border-gray-300"
        >
          +{amenities.length - maxDisplay} more
        </Badge>
      )}
    </div>
  );
}