import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Phone, Clock, ExternalLink, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Pub {
  name: string;
  slug: { current: string };
  location?: string;
  addressLine1?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
  contactPhone?: string;
  openingHours?: string;
  image?: { asset?: { url: string } };
  externalDomain?: string;
  featured?: boolean;
}

interface PubFinderMapProps {
  pubs: Pub[];
  className?: string;
}

// UK pub locations (example coordinates - replace with actual data)
const pubCoordinates = {
  'the-bull': { lat: 51.3128, lng: 0.1883, name: 'The Bull', location: 'Otford' },
  'the-chaser-inn': { lat: 51.3942, lng: 0.1093, name: 'The Chaser Inn', location: 'Shipbourne' },
  'the-rose-and-crown': { lat: 51.3214, lng: 0.0166, name: 'The Rose & Crown', location: 'Green Street Green' },
  'the-cricketers-inn': { lat: 51.3483, lng: 0.2673, name: 'The Cricketers Inn', location: 'Meopham' },
  'the-little-brown-jug': { lat: 51.2789, lng: 0.0533, name: 'The Little Brown Jug', location: 'Chiddingstone Causeway' }
};

export default function PubFinderMap({ pubs, className }: PubFinderMapProps) {
  const [selectedPub, setSelectedPub] = useState<Pub | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestPub, setNearestPub] = useState<Pub | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Filter pubs based on search
  const filteredPubs = pubs.filter(pub => 
    pub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.postcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          findNearestPub(userLoc);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Find nearest pub to user
  const findNearestPub = (userLoc: { lat: number; lng: number }) => {
    let nearest: Pub | null = null;
    let minDistance = Infinity;

    pubs.forEach(pub => {
      const coords = pubCoordinates[pub.slug.current];
      if (coords) {
        const distance = calculateDistance(userLoc.lat, userLoc.lng, coords.lat, coords.lng);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = pub;
        }
      }
    });

    setNearestPub(nearest);
  };

  // Load Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY || ''}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        setMapLoaded(true);
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize map when loaded
  useEffect(() => {
    if (mapLoaded && window.google && window.google.maps) {
      const mapElement = document.getElementById('pub-map');
      if (mapElement) {
        const map = new window.google.maps.Map(mapElement, {
          center: { lat: 51.3500, lng: 0.1000 }, // Center on Kent
          zoom: 10,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        // Add markers for each pub
        filteredPubs.forEach(pub => {
          const coords = pubCoordinates[pub.slug.current];
          if (coords) {
            const marker = new window.google.maps.Marker({
              position: { lat: coords.lat, lng: coords.lng },
              map: map,
              title: pub.name,
              icon: {
                url: pub.featured ? '/images/marker-featured.png' : '/images/marker.png',
                scaledSize: new window.google.maps.Size(40, 40)
              }
            });

            marker.addListener('click', () => {
              setSelectedPub(pub);
            });
          }
        });

        // Add user location marker if available
        if (userLocation) {
          new window.google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Your Location',
            icon: {
              url: '/images/user-location.png',
              scaledSize: new window.google.maps.Size(30, 30)
            }
          });
        }
      }
    }
  }, [mapLoaded, filteredPubs, userLocation]);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <div id="pub-map" className="w-full h-[400px] lg:h-[600px] rounded-lg">
                {!mapLoaded && (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-gray-600">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 order-1 lg:order-2">
          {/* Search and Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Find Your Nearest Pub</CardTitle>
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
              
              <Button 
                onClick={getUserLocation}
                className="w-full"
                variant="outline"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Use My Location
              </Button>

              {nearestPub && (
                <div className="p-3 bg-secondary/20 rounded-lg">
                  <p className="text-sm font-medium mb-1">Nearest to you:</p>
                  <p className="font-bold">{nearestPub.name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Selected Pub Details */}
          {selectedPub && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span>{selectedPub.name}</span>
                  {selectedPub.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedPub.image?.asset?.url && (
                  <img
                    src={selectedPub.image.asset.url}
                    alt={selectedPub.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                
                <div className="space-y-2 text-sm">
                  {selectedPub.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{selectedPub.location}</span>
                    </div>
                  )}
                  
                  {selectedPub.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${selectedPub.contactPhone}`} className="hover:underline">
                        {selectedPub.contactPhone}
                      </a>
                    </div>
                  )}
                  
                  {selectedPub.openingHours && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{selectedPub.openingHours}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" size="sm">
                    Get Directions
                  </Button>
                  {selectedPub.externalDomain && (
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pub List */}
          <Card>
            <CardHeader>
              <CardTitle>All Locations ({filteredPubs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {filteredPubs.map(pub => (
                  <button
                    key={pub.slug.current}
                    onClick={() => setSelectedPub(pub)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-colors",
                      selectedPub?.slug.current === pub.slug.current
                        ? "bg-secondary/20 border border-secondary"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <div className="font-medium">{pub.name}</div>
                    {pub.location && (
                      <div className="text-sm text-gray-600">{pub.location}</div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}