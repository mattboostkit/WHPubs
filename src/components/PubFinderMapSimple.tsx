import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Clock, ExternalLink, Search, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Pub {
  name: string;
  slug: { current: string };
  location?: string;
  addressLine1?: string;
  postcode?: string;
  contactPhone?: string;
  openingHours?: string;
  image?: { asset?: { url: string } };
  externalDomain?: string;
  featured?: boolean;
  description?: string;
}

interface PubFinderMapSimpleProps {
  pubs: Pub[];
  className?: string;
}

// Pub locations in Kent/South East England
const pubLocations: Record<string, { area: string; distance?: number }> = {
  'the-bull': { area: 'Otford, Sevenoaks', distance: 5 },
  'the-chaser-inn': { area: 'Shipbourne, Tonbridge', distance: 8 },
  'the-rose-and-crown': { area: 'Green Street Green, Orpington', distance: 12 },
  'the-cricketers-inn': { area: 'Meopham, Gravesend', distance: 15 },
  'the-little-brown-jug': { area: 'Chiddingstone Causeway', distance: 10 }
};

export default function PubFinderMapSimple({ pubs, className }: PubFinderMapSimpleProps) {
  const [selectedPub, setSelectedPub] = useState<Pub | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'location'>('name');

  // Filter pubs based on search
  const filteredPubs = pubs.filter(pub => 
    pub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.postcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort pubs
  const sortedPubs = [...filteredPubs].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      const aLoc = pubLocations[a.slug.current]?.area || a.location || '';
      const bLoc = pubLocations[b.slug.current]?.area || b.location || '';
      return aLoc.localeCompare(bLoc);
    }
  });

  const getPubLocation = (pub: Pub) => {
    return pubLocations[pub.slug.current]?.area || pub.location || 'Kent';
  };

  const getPubDistance = (pub: Pub) => {
    return pubLocations[pub.slug.current]?.distance;
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Alternative - Visual List */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Our Pub Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {sortedPubs.map(pub => {
                  const location = getPubLocation(pub);
                  const distance = getPubDistance(pub);
                  const isSelected = selectedPub?.slug.current === pub.slug.current;
                  
                  return (
                    <div
                      key={pub.slug.current}
                      className={cn(
                        "relative overflow-hidden rounded-lg border-2 transition-all cursor-pointer",
                        isSelected 
                          ? "border-primary shadow-lg transform scale-[1.02]" 
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      )}
                      onClick={() => setSelectedPub(pub)}
                    >
                      {pub.image?.asset?.url && (
                        <div className="h-32 overflow-hidden">
                          <img
                            src={pub.image.asset.url}
                            alt={pub.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4 bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg">{pub.name}</h3>
                          {pub.featured && (
                            <Badge variant="secondary" className="ml-2">Featured</Badge>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span>{location}</span>
                        </div>
                        {distance && (
                          <div className="text-sm text-gray-500">
                            Approx. {distance} miles from Sevenoaks
                          </div>
                        )}
                        {pub.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {pub.description}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 border-4 border-primary rounded-lg pointer-events-none"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 order-1 lg:order-2">
          {/* Search and Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Find a Pub</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setSortBy('name')}
                  variant={sortBy === 'name' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                >
                  By Name
                </Button>
                <Button 
                  onClick={() => setSortBy('location')}
                  variant={sortBy === 'location' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                >
                  By Location
                </Button>
              </div>

              <div className="text-sm text-gray-600 bg-secondary/10 p-3 rounded-lg">
                <p className="font-medium mb-1">Coverage Area:</p>
                <p>Kent, South East England</p>
                <p className="mt-2">
                  {filteredPubs.length} pub{filteredPubs.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Selected Pub Details */}
          {selectedPub && (
            <Card className="animate-in slide-in-from-right-5 duration-300">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span>{selectedPub.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPub.image?.asset?.url && (
                  <img
                    src={selectedPub.image.asset.url}
                    alt={selectedPub.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{getPubLocation(selectedPub)}</p>
                      {selectedPub.addressLine1 && (
                        <p className="text-sm text-gray-600">{selectedPub.addressLine1}</p>
                      )}
                      {selectedPub.postcode && (
                        <p className="text-sm text-gray-600">{selectedPub.postcode}</p>
                      )}
                    </div>
                  </div>
                  
                  {selectedPub.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${selectedPub.contactPhone}`} className="hover:underline">
                        {selectedPub.contactPhone}
                      </a>
                    </div>
                  )}
                  
                  {selectedPub.openingHours && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="text-sm">{selectedPub.openingHours}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {selectedPub.externalDomain ? (
                    <a 
                      href={`https://${selectedPub.externalDomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full" size="sm">
                        Visit Website
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <a href={`/pubs/${selectedPub.slug.current}`} className="flex-1">
                      <Button className="w-full" size="sm">
                        View Details
                      </Button>
                    </a>
                  )}
                  <a 
                    href={`https://www.google.com/maps/search/${encodeURIComponent(selectedPub.name + ' ' + getPubLocation(selectedPub))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}