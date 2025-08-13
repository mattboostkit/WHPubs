import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Download, Gift, ChefHat } from 'lucide-react';

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  dietary?: string[];
}

interface MenuCourse {
  courseType: 'starters' | 'mains' | 'desserts' | 'setMenu';
  items: MenuItem[];
}

interface ChristmasMenuProps {
  christmasMenu?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    menuImage?: { asset?: { url: string } };
    menuPdf?: { asset?: { url: string } };
    menuDetails?: MenuCourse[];
    pricing?: {
      adultPrice?: string;
      childPrice?: string;
      additionalInfo?: string;
    };
    availability?: string;
    bookingInfo?: string;
    ctaText?: string;
  };
  pubName: string;
  bookingUrl?: string;
}

const getCourseTitle = (courseType: string) => {
  switch (courseType) {
    case 'starters': return 'Starters';
    case 'mains': return 'Main Courses';
    case 'desserts': return 'Desserts';
    case 'setMenu': return 'Set Menu';
    default: return courseType;
  }
};

const getDietaryBadge = (dietary: string) => {
  switch (dietary) {
    case 'V': return { label: 'Vegetarian', color: 'bg-green-100 text-green-800' };
    case 'VE': return { label: 'Vegan', color: 'bg-emerald-100 text-emerald-800' };
    case 'GF': return { label: 'Gluten Free', color: 'bg-blue-100 text-blue-800' };
    case 'DF': return { label: 'Dairy Free', color: 'bg-purple-100 text-purple-800' };
    default: return { label: dietary, color: 'bg-gray-100 text-gray-800' };
  }
};

export default function ChristmasMenu({ christmasMenu, pubName, bookingUrl = '/book-table' }: ChristmasMenuProps) {
  // If no Christmas menu or not enabled, show coming soon
  if (!christmasMenu?.enabled) {
    return (
      <section className="py-16 bg-gradient-to-b from-red-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Gift className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-primary mb-4">Christmas Menu</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our festive menu is coming soon! Check back for our special Christmas offerings.
            </p>
            <Button size="lg" variant="default">
              <Calendar className="w-5 h-5 mr-2" />
              Book a Table
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const {
    title = `Christmas at ${pubName}`,
    subtitle = 'Join us for a magical festive celebration',
    menuImage,
    menuPdf,
    menuDetails = [],
    pricing,
    availability = 'Available from 1st December to 24th December',
    bookingInfo = 'Pre-booking essential. Deposit required for groups of 8 or more.',
    ctaText = 'Book Your Christmas Table'
  } = christmasMenu;

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-red-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Gift className="w-8 h-8 text-red-600 mr-2" />
            <Star className="w-8 h-8 text-yellow-500" />
            <Gift className="w-8 h-8 text-green-600 ml-2" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">{title}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left: Image and Info */}
          <div>
            {menuImage?.asset?.url && (
              <div className="relative rounded-lg overflow-hidden shadow-xl mb-6">
                <img 
                  src={menuImage.asset.url} 
                  alt={`Christmas menu at ${pubName}`}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            )}
            
            {/* Pricing Card */}
            {pricing && (
              <Card className="mb-6 border-2 border-red-200 bg-red-50/50">
                <CardHeader>
                  <CardTitle className="text-red-800">Festive Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  {pricing.adultPrice && (
                    <p className="text-2xl font-bold text-primary mb-2">{pricing.adultPrice}</p>
                  )}
                  {pricing.childPrice && (
                    <p className="text-lg text-gray-700 mb-2">{pricing.childPrice}</p>
                  )}
                  {pricing.additionalInfo && (
                    <p className="text-sm text-gray-600">{pricing.additionalInfo}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Availability & Booking Info */}
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-green-700 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">Availability</p>
                      <p className="text-sm text-gray-700">{availability}</p>
                    </div>
                  </div>
                  {bookingInfo && (
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-green-700 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900">Booking Information</p>
                        <p className="text-sm text-gray-700">{bookingInfo}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Menu Details */}
          <div>
            {menuDetails.length > 0 ? (
              <div className="space-y-8">
                {menuDetails.map((course, courseIndex) => (
                  <div key={courseIndex}>
                    <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                      <ChefHat className="w-6 h-6 mr-2 text-secondary" />
                      {getCourseTitle(course.courseType)}
                    </h3>
                    <div className="space-y-4">
                      {course.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="border-l-4 border-secondary pl-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg text-primary">
                                {item.name}
                              </h4>
                              {item.description && (
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              )}
                              {item.dietary && item.dietary.length > 0 && (
                                <div className="flex gap-2 mt-2">
                                  {item.dietary.map((diet, dietIndex) => {
                                    const badge = getDietaryBadge(diet);
                                    return (
                                      <Badge 
                                        key={dietIndex} 
                                        variant="secondary" 
                                        className={`text-xs ${badge.color}`}
                                      >
                                        {badge.label}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            {item.price && (
                              <span className="text-lg font-bold text-secondary ml-4">
                                {item.price}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-green-50">
                <CardContent className="text-center py-12">
                  <Gift className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary mb-2">Festive Menu</h3>
                  <p className="text-gray-600 mb-6">
                    Our delicious Christmas menu features traditional favorites and modern twists.
                  </p>
                  <p className="text-lg font-semibold text-secondary">
                    Full menu details coming soon!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-red-100 to-green-100 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-primary mb-4">Ready to celebrate with us?</h3>
          <p className="text-gray-700 mb-6">
            Don't miss out on our festive offerings. Book your table today!
          </p>
          <div className="flex gap-4 justify-center">
            <a href={bookingUrl}>
              <Button size="lg" variant="default">
                <Calendar className="w-5 h-5 mr-2" />
                {ctaText}
              </Button>
            </a>
            {menuPdf?.asset?.url && (
              <a href={menuPdf.asset.url} download target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  <Download className="w-5 h-5 mr-2" />
                  Download Menu
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}