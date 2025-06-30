import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X, ZoomIn, Grid3X3, Maximize2 } from 'lucide-react';

interface GalleryImage {
  asset: {
    url: string;
    _id: string;
  };
  alt: string;
  caption?: string;
  category?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  showCategories?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'interior', label: 'Interior' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'food', label: 'Food' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'events', label: 'Events' },
  { value: 'garden', label: 'Garden' },
  { value: 'private-dining', label: 'Private Dining' }
];

export default function ImageGallery({ 
  images, 
  title, 
  showCategories = true,
  columns = 3,
  className 
}: ImageGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filter images by category
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  // Get unique categories from images
  const availableCategories = categories.filter(cat => 
    cat.value === 'all' || images.some(img => img.category === cat.value)
  );

  const handlePrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? filteredImages.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === filteredImages.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'Escape':
        setSelectedImageIndex(null);
        setIsFullscreen(false);
        break;
    }
  };

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  };

  return (
    <div className={cn("w-full", className)}>
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      )}

      {showCategories && availableCategories.length > 1 && (
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="grid w-full max-w-2xl mx-auto" style={{ gridTemplateColumns: `repeat(${Math.min(availableCategories.length, 4)}, 1fr)` }}>
            {availableCategories.map(category => (
              <TabsTrigger 
                key={category.value} 
                value={category.value}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className={cn("grid gap-4", columnClasses[columns])}>
        {filteredImages.map((image, index) => (
          <Dialog 
            key={image.asset._id} 
            open={selectedImageIndex === index}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedImageIndex(null);
                setIsFullscreen(false);
              }
            }}
          >
            <DialogTrigger asChild>
              <div 
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.asset.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>
                )}
                {image.category && showCategories && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {categories.find(c => c.value === image.category)?.label}
                  </Badge>
                )}
              </div>
            </DialogTrigger>
            <DialogContent 
              className={cn(
                "max-w-7xl p-0 border-0",
                isFullscreen && "w-screen h-screen max-w-full"
              )}
              onKeyDown={handleKeyDown}
            >
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20 z-50"
                  onClick={() => {
                    setSelectedImageIndex(null);
                    setIsFullscreen(false);
                  }}
                >
                  <X className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-16 text-white hover:bg-white/20 z-50"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>

                {filteredImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
                      onClick={handleNext}
                    >
                      <ChevronRight className="w-8 h-8" />
                    </Button>
                  </>
                )}

                {selectedImageIndex !== null && (
                  <div className="relative max-h-full max-w-full flex flex-col items-center">
                    <img
                      src={filteredImages[selectedImageIndex].asset.url}
                      alt={filteredImages[selectedImageIndex].alt}
                      className={cn(
                        "object-contain",
                        isFullscreen ? "w-screen h-screen" : "max-h-[90vh] max-w-[90vw]"
                      )}
                    />
                    {filteredImages[selectedImageIndex].caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                        <p className="text-white text-center text-lg">
                          {filteredImages[selectedImageIndex].caption}
                        </p>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImageIndex + 1} / {filteredImages.length}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Grid3X3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No images available in this category</p>
        </div>
      )}
    </div>
  );
}