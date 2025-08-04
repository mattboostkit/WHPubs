import React from 'react';

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  dietary?: string[];
  available: boolean;
}

interface MenuSection {
  sectionName: string;
  sectionDescription?: string;
  items: MenuItem[];
}

interface Menu {
  title: string;
  slug: { current: string };
  sections: MenuSection[];
  notes?: string;
}

interface PubMenuProps {
  menus: Menu[];
}

const dietaryIcons: Record<string, string> = {
  'V': '🥗',
  'VG': '🌱',
  'GF': '🌾',
  'DF': '🥛',
  'N': '🥜',
  'S': '🌶️'
};

export default function PubMenu({ menus }: PubMenuProps) {
  if (!menus || menus.length === 0) return null;

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {menus.map((menu, menuIndex) => (
          <div key={menu.slug.current} className={menuIndex > 0 ? 'mt-16' : ''}>
            <h2 className="text-4xl font-serif text-center mb-12 text-primary">
              {menu.title}
            </h2>
            
            <div className="max-w-4xl mx-auto">
              {menu.sections.map((section, sectionIndex) => (
                <div key={`${section.sectionName}-${sectionIndex}`} className="mb-12">
                  <h3 className="text-2xl font-serif mb-2 text-primary border-b-2 border-secondary pb-2">
                    {section.sectionName}
                  </h3>
                  
                  {section.sectionDescription && (
                    <p className="text-gray-600 mb-6 italic">{section.sectionDescription}</p>
                  )}
                  
                  <div className="space-y-4">
                    {section.items
                      .filter(item => item.available !== false)
                      .map((item, itemIndex) => (
                        <div key={`${item.name}-${itemIndex}`} className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-lg text-primary">
                                {item.name}
                              </h4>
                              {item.dietary && item.dietary.length > 0 && (
                                <span className="flex gap-1">
                                  {item.dietary.map(diet => (
                                    <span 
                                      key={diet} 
                                      title={diet}
                                      className="text-sm"
                                    >
                                      {dietaryIcons[diet] || diet}
                                    </span>
                                  ))}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                            )}
                          </div>
                          {item.price && (
                            <span className="font-semibold text-secondary whitespace-nowrap">
                              {item.price}
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
              
              {menu.notes && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 italic text-center">
                    {menu.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500">
            <span className="inline-flex items-center gap-4 flex-wrap justify-center">
              <span>{dietaryIcons['V']} Vegetarian</span>
              <span>{dietaryIcons['VG']} Vegan</span>
              <span>{dietaryIcons['GF']} Gluten Free</span>
              <span>{dietaryIcons['DF']} Dairy Free</span>
              <span>{dietaryIcons['N']} Contains Nuts</span>
              <span>{dietaryIcons['S']} Spicy</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}