import React, { useState } from 'react';
import { ChevronDown, MapPin, Calendar, UtensilsCrossed, Image, Phone, Gift, Users } from 'lucide-react';

interface Pub {
  name: string;
  slug: { current: string };
  location?: string;
  locationName?: string;
}

interface MegaMenuProps {
  pubs: Pub[];
  currentPath: string;
}

export default function MegaMenu({ pubs, currentPath }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    {
      title: 'Our Pubs',
      key: 'pubs',
      href: '/our-pubs',
      submenu: {
        sections: [
          {
            title: 'Visit Our Pubs',
            items: pubs.map(pub => ({
              title: pub.name,
              href: `/${pub.slug.current}`,
              description: pub.locationName || pub.location || '',
              icon: <MapPin className="w-4 h-4" />
            }))
          },
          {
            title: 'Quick Links',
            items: [
              { title: 'View All Pubs', href: '/our-pubs', icon: <MapPin className="w-4 h-4" />, description: 'See all our locations' },
              { title: 'Book a Table', href: '/book-a-table', icon: <Calendar className="w-4 h-4" />, description: 'Make a reservation' }
            ]
          }
        ]
      }
    },
    {
      title: "What's On",
      key: 'events',
      href: '/events',
      submenu: {
        sections: [
          {
            title: 'Events & Entertainment',
            items: [
              { title: 'All Events', href: '/events', icon: <Calendar className="w-4 h-4" />, description: 'View all upcoming events' },
              { title: 'Live Music', href: '/events?type=music', icon: <Calendar className="w-4 h-4" />, description: 'Live bands and performances' },
              { title: 'Quiz Nights', href: '/events?type=quiz', icon: <Calendar className="w-4 h-4" />, description: 'Test your knowledge' },
              { title: 'Special Events', href: '/events?type=special', icon: <Calendar className="w-4 h-4" />, description: 'Seasonal and special occasions' }
            ]
          },
          {
            title: 'By Pub',
            items: pubs.slice(0, 3).map(pub => ({
              title: `Events at ${pub.name}`,
              href: `/events?pub=${pub.slug.current}`,
              icon: <MapPin className="w-4 h-4" />,
              description: 'View venue events'
            }))
          }
        ]
      }
    },
    {
      title: 'Menus',
      key: 'menus',
      href: '/menu',
      submenu: {
        sections: [
          {
            title: 'Food & Drink',
            items: [
              { title: 'Sample Menu', href: '/menu', icon: <UtensilsCrossed className="w-4 h-4" />, description: 'View our offerings' },
              { title: 'Sunday Roasts', href: '/menu#sunday', icon: <UtensilsCrossed className="w-4 h-4" />, description: 'Traditional Sunday lunch' },
              { title: 'Seasonal Specials', href: '/menu#seasonal', icon: <UtensilsCrossed className="w-4 h-4" />, description: 'Chef\'s seasonal picks' },
              { title: 'Drinks Menu', href: '/menu#drinks', icon: <UtensilsCrossed className="w-4 h-4" />, description: 'Ales, wines & spirits' }
            ]
          },
          {
            title: 'Dietary Options',
            items: [
              { title: 'Vegetarian', href: '/menu#vegetarian', icon: <UtensilsCrossed className="w-4 h-4" />, description: 'Plant-based dishes' },
              { title: 'Gluten Free', href: '/menu#gluten-free', icon: <UtensilsCrossed className="w-4 h-4" />, description: 'Gluten-free options' },
              { title: 'Kids Menu', href: '/menu#kids', icon: <UtensilsCrossed className="w-4 h-4" />, description: 'For our younger guests' }
            ]
          }
        ]
      }
    }
  ];

  const handleMouseEnter = (key: string) => {
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const isActive = (href: string) => {
    return currentPath === href || 
      (href !== '/' && currentPath.startsWith(href)) ||
      (href.includes('#') && currentPath === '/' && href.startsWith('/#'));
  };

  return (
    <nav className="hidden md:flex items-center space-x-8" role="navigation">
      {menuItems.map((item) => (
        <div
          key={item.key}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.key)}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href={item.href}
            className={`flex items-center text-lg transition-all duration-300 relative group ${
              isActive(item.href)
                ? 'text-[#B79C64] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#B79C64]'
                : 'text-[#B79C64] hover:text-[#B79C64]/90'
            }`}
            aria-label={item.title}
          >
            {item.title}
            {item.submenu && (
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${activeMenu === item.key ? 'rotate-180' : ''}`} />
            )}
            {!isActive(item.href) && (
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#B79C64] transition-all duration-300 group-hover:w-full"></span>
            )}
          </a>

          {/* Mega Menu Dropdown */}
          {item.submenu && activeMenu === item.key && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-lg p-6 min-w-[600px] z-50 border border-gray-100">
              <div className="grid grid-cols-2 gap-8">
                {item.submenu.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.items.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <a
                            href={subItem.href}
                            className="flex items-start gap-3 group hover:bg-gray-50 p-2 rounded-md transition-colors"
                          >
                            <span className="text-secondary mt-0.5">{subItem.icon}</span>
                            <div>
                              <span className="text-gray-900 font-medium group-hover:text-primary transition-colors">
                                {subItem.title}
                              </span>
                              {subItem.description && (
                                <p className="text-sm text-gray-600 mt-0.5">{subItem.description}</p>
                              )}
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Static links without dropdowns */}
      <a
        href="/development-kitchen"
        className={`text-lg transition-all duration-300 relative group ${
          isActive('/development-kitchen')
            ? 'text-[#B79C64] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#B79C64]'
            : 'text-[#B79C64] hover:text-[#B79C64]/90'
        }`}
        aria-label="Development Kitchen"
      >
        Development Kitchen
        {!isActive('/development-kitchen') && (
          <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#B79C64] transition-all duration-300 group-hover:w-full"></span>
        )}
      </a>
      <a
        href="/gift-cards"
        className={`text-lg transition-all duration-300 relative group ${
          isActive('/gift-cards')
            ? 'text-[#B79C64] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#B79C64]'
            : 'text-[#B79C64] hover:text-[#B79C64]/90'
        }`}
        aria-label="Gift Cards"
      >
        Gift Cards
        {!isActive('/gift-cards') && (
          <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#B79C64] transition-all duration-300 group-hover:w-full"></span>
        )}
      </a>
      <a
        href="/contact"
        className={`text-lg transition-all duration-300 relative group ${
          isActive('/contact')
            ? 'text-[#B79C64] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#B79C64]'
            : 'text-[#B79C64] hover:text-[#B79C64]/90'
        }`}
        aria-label="Contact"
      >
        Contact
        {!isActive('/contact') && (
          <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#B79C64] transition-all duration-300 group-hover:w-full"></span>
        )}
      </a>
    </nav>
  );
}