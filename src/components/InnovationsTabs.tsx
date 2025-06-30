import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

interface Innovation {
  dishName: string;
  description?: string;
  season?: string;
  image?: {
    asset: {
      url: string;
    };
    alt: string;
  };
  availableAt?: Array<{
    _id: string;
    name: string;
    slug: {
      current: string;
    };
  }>;
}

interface InnovationsTabsProps {
  innovations: Innovation[];
}

export default function InnovationsTabs({ innovations }: InnovationsTabsProps) {
  if (!innovations || innovations.length === 0) return null;

  return (
    <Tabs defaultValue="0" className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full max-w-2xl mx-auto mb-8">
        {innovations.slice(0, 5).map((dish, index) => (
          <TabsTrigger key={index} value={index.toString()}>
            {dish.dishName.split(' ').slice(0, 2).join(' ')}
          </TabsTrigger>
        ))}
      </TabsList>
      {innovations.map((dish, index) => (
        <TabsContent key={index} value={index.toString()}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {dish.image && (
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <img 
                  src={dish.image.asset.url} 
                  alt={dish.image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-3xl font-bold mb-2">{dish.dishName}</h3>
              {dish.season && (
                <Badge variant="secondary" className="mb-4">{dish.season}</Badge>
              )}
              <p className="text-lg text-muted-foreground mb-6">{dish.description}</p>
              {dish.availableAt && dish.availableAt.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Available at:</p>
                  <div className="flex flex-wrap gap-2">
                    {dish.availableAt.map((pub) => (
                      <a 
                        key={pub.slug.current} 
                        href={`/${pub.slug.current}`}
                        className="text-primary hover:text-primary/80 underline"
                      >
                        {pub.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}