import React, { useState, useMemo } from 'react';
import { MapPin, Filter, X, Dog, TreePine, Beer, Utensils, Car, Music, Wifi, Baby, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getPubUrl, isExternalUrl } from '@/lib/pub-urls';
import PubCardHover from '@/components/PubCardHover';

const amenityIcons = {
  'Dog Friendly': { icon: Dog, label: 'Dog Friendly' },
  'Beer Garden': { icon: TreePine, label: 'Garden' },
  'Garden': { icon: TreePine, label: 'Garden' },
  'Local Ales': { icon: Beer, label: 'Local Ales' },
  'Food': { icon: Utensils, label: 'Food' },
  'Homemade Food': { icon: Utensils, label: 'Food' },
  'Parking': { icon: Car, label: 'Parking' },
  'Live Music': { icon: Music, label: 'Live Music' },
  'Free Wi-Fi': { icon: Wifi, label: 'WiFi' },
  'Family Friendly': { icon: Baby, label: 'Family Friendly' }
};

// Screen reader only class
const srOnlyStyles = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0'
};

export default function InteractivePubFinder({ pubs = [] }) {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique locations
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(pubs.map(pub => pub.location || pub.locationName).filter(Boolean))];
    return uniqueLocations.sort();
  }, [pubs]);

  // Extract all available amenities
  const availableAmenities = useMemo(() => {
    const amenitiesSet = new Set();
    pubs.forEach(pub => {
      if (pub.amenities) {
        pub.amenities.forEach(amenity => amenitiesSet.add(amenity));
      }
    });
    return Array.from(amenitiesSet);
  }, [pubs]);

  // Filter pubs based on selected criteria
  const filteredPubs = useMemo(() => {
    return pubs.filter(pub => {
      // Location filter
      if (selectedLocation !== 'all' && pub.location !== selectedLocation && pub.locationName !== selectedLocation) {
        return false;
      }

      // Amenity filter
      if (selectedAmenities.length > 0) {
        if (!pub.amenities || !selectedAmenities.every(amenity => pub.amenities.includes(amenity))) {
          return false;
        }
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = pub.name.toLowerCase().includes(searchLower);
        const locationMatch = (pub.location || pub.locationName || '').toLowerCase().includes(searchLower);
        const descriptionMatch = (pub.description || '').toLowerCase().includes(searchLower);
        
        if (!nameMatch && !locationMatch && !descriptionMatch) {
          return false;
        }
      }

      return true;
    });
  }, [pubs, selectedLocation, selectedAmenities, searchTerm]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSelectedLocation('all');
    setSelectedAmenities([]);
    setSearchTerm('');
  };

  const hasActiveFilters = selectedLocation !== 'all' || selectedAmenities.length > 0 || searchTerm;

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search Input */}
            <div className="flex-1">
              <label htmlFor="pub-search" style={srOnlyStyles}>Search pubs</label>
              <input
                id="pub-search"
                type="search"
                placeholder="Search by pub name, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Search pubs by name, location, or description"
                aria-describedby="search-results-count"
              />
            </div>

            {/* Location Dropdown */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filters Button (Mobile) */}
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {selectedAmenities.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedAmenities.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter by Amenities</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <div className="space-y-3">
                    {availableAmenities.map(amenity => {
                      const amenityInfo = amenityIcons[amenity];
                      if (!amenityInfo) return null;
                      const Icon = amenityInfo.icon;
                      
                      return (
                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAmenities.includes(amenity)}
                            onChange={() => toggleAmenity(amenity)}
                            className="w-4 h-4 text-primary"
                            aria-label={`Filter by ${amenityInfo.label}`}
                            aria-checked={selectedAmenities.includes(amenity)}
                          />
                          <Icon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                          <span>{amenityInfo.label}</span>
                        </label>
                      );
                    })}
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="mt-6 w-full"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Amenity Filters */}
          <div className="hidden sm:flex flex-wrap gap-2 mt-4">
            {availableAmenities.map(amenity => {
              const amenityInfo = amenityIcons[amenity];
              if (!amenityInfo) return null;
              const Icon = amenityInfo.icon;
              
              return (
                <Button
                  key={amenity}
                  variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAmenity(amenity)}
                  className="flex items-center gap-2"
                  aria-label={`${selectedAmenities.includes(amenity) ? 'Remove' : 'Add'} ${amenityInfo.label} filter`}
                  aria-pressed={selectedAmenities.includes(amenity)}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {amenityInfo.label}
                </Button>
              );
            })}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center" role="status" aria-live="polite" aria-atomic="true">
          <p id="search-results-count" className="text-lg text-muted-foreground">
            Showing <span className="font-semibold text-primary">{filteredPubs.length}</span> of {pubs.length} pubs
          </p>
        </div>

        {/* Results Grid */}
        {filteredPubs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Pub search results">
            {filteredPubs.map((pub) => {
              const pubUrl = getPubUrl(pub);
              const isExt = isExternalUrl(pubUrl);
              
              return (
                <Card key={pub.slug?.current} className="overflow-hidden hover:shadow-lg transition-shadow" role="listitem">
                  <PubCardHover pub={pub}>
                    <CardHeader>
                      <CardTitle className="text-lg">{pub.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{pub.locationName || pub.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm mb-4 line-clamp-2">
                        {pub.description}
                      </CardDescription>
                      
                      {/* Amenity badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pub.amenities?.map(amenity => {
                          const amenityInfo = amenityIcons[amenity];
                          if (!amenityInfo) return null;
                          const Icon = amenityInfo.icon;
                          
                          return (
                            <Badge key={amenity} variant="secondary" className="text-xs flex items-center gap-1">
                              <Icon className="w-3 h-3" />
                              {amenityInfo.label}
                            </Badge>
                          );
                        })}
                      </div>
                      
                      <a 
                        href={pubUrl} 
                        target={isExt ? "_blank" : undefined} 
                        rel={isExt ? "noopener noreferrer" : undefined} 
                        className="block"
                        aria-label={`${isExt ? 'Visit website' : 'View details'} for ${pub.name}${isExt ? ' (opens in new tab)' : ''}`}
                      >
                        <Button 
                          variant={isExt ? "default" : "outline"} 
                          size="sm" 
                          className={isExt ? "w-full bg-primary text-white hover:bg-primary/90" : "w-full"}
                          tabIndex={-1}
                        >
                          {isExt ? 'Visit Website' : 'View Details'}
                          {isExt && <ExternalLink className="w-3 h-3 ml-2" aria-hidden="true" />}
                        </Button>
                      </a>
                    </CardContent>
                  </PubCardHover>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No pubs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms to find more pubs.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}