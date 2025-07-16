import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Filter, Search, SortAsc, Grid, List, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import PubCard from './PubCard.astro';

interface Pub {
  name: string;
  slug: { current: string };
  description?: string;
  location?: string;
  locationName?: string;
  addressLine1?: string;
  postcode?: string;
  image?: { asset?: { url: string }; alt?: string };
  featured?: boolean;
  amenities?: string[];
  openingHoursStructured?: any;
}

interface PubListingProps {
  pubs: Pub[];
  className?: string;
}

type SortOption = 'name' | 'location' | 'featured';
type ViewMode = 'grid' | 'list';

export default function PubListing({ pubs, className }: PubListingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique amenities
  const allAmenities = useMemo(() => {
    const amenitiesSet = new Set<string>();
    pubs.forEach(pub => {
      pub.amenities?.forEach(amenity => amenitiesSet.add(amenity));
    });
    return Array.from(amenitiesSet).sort();
  }, [pubs]);

  // Filter and sort pubs
  const filteredAndSortedPubs = useMemo(() => {
    let filtered = pubs.filter(pub => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        pub.name.toLowerCase().includes(searchLower) ||
        pub.description?.toLowerCase().includes(searchLower) ||
        pub.locationName?.toLowerCase().includes(searchLower) ||
        pub.location?.toLowerCase().includes(searchLower) ||
        pub.postcode?.toLowerCase().includes(searchLower);

      // Amenities filter
      const matchesAmenities = selectedAmenities.length === 0 ||
        selectedAmenities.every(amenity => pub.amenities?.includes(amenity));

      return matchesSearch && matchesAmenities;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'location':
          const aLocation = a.locationName || a.location || '';
          const bLocation = b.locationName || b.location || '';
          return aLocation.localeCompare(bLocation);
        case 'featured':
        default:
          // Featured first, then by name
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [pubs, searchTerm, sortBy, selectedAmenities]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search pubs by name, location, or postcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured First</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="location">Location (A-Z)</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {selectedAmenities.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedAmenities.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-3">Filter by Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {allAmenities.map(amenity => (
                <Badge
                  key={amenity}
                  variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleAmenity(amenity)}
                >
                  {amenity}
                </Badge>
              ))}
            </div>
            {selectedAmenities.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setSelectedAmenities([])}
                className="mt-2 p-0 h-auto"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredAndSortedPubs.length} of {pubs.length} pubs
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      {/* Pub Grid/List */}
      {filteredAndSortedPubs.length > 0 ? (
        <div className={cn(
          viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          {filteredAndSortedPubs.map(pub => (
            <div key={pub.slug.current} className="pub-card-wrapper">
              {/* We'll render the PubCard component here */}
              <div 
                data-pub={JSON.stringify(pub)} 
                data-variant={viewMode === 'list' ? 'compact' : pub.featured ? 'featured' : 'default'}
                className="pub-card-placeholder"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pubs found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}