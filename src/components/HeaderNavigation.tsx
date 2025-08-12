import React from 'react';

interface HeaderNavigationProps {
  pubs: any[];
  currentPath: string;
  isPubLayout: boolean;
  headerLinks: any[];
}

export default function HeaderNavigation({ pubs, currentPath, isPubLayout, headerLinks }: HeaderNavigationProps) {
  // Remove duplicates and filter out "Make A Booking" (handled separately as CTA button)  
  const uniqueLinks = headerLinks.filter((link, index, array) => {
    // Filter out "Make A Booking" as it's handled as a separate CTA button
    if (link.title === "Make A Booking") return false;
    
    // Remove duplicates by checking if this is the first occurrence of this title AND URL combination
    // This prevents removing legitimate different links with the same title
    return array.findIndex(l => l.title === link.title && l.url === link.url) === index;
  });

  // Debug log to see what we're working with
  console.log('HeaderNavigation - Original links:', headerLinks);
  console.log('HeaderNavigation - Filtered unique links:', uniqueLinks);

  return (
    <div className="hidden md:flex items-center space-x-8" role="navigation">
      {uniqueLinks.map(link => {
        const isActive = currentPath === link.url || 
          (link.url !== '/' && currentPath.startsWith(link.url)) ||
          (link.url.includes('#') && currentPath === '/' && link.url.startsWith('/#'));
        return (
          <a 
            key={link.url}
            href={link.url} 
            className={`text-lg transition-all duration-300 relative group ${
              isActive 
                ? 'text-[#B79C64] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#B79C64]' 
                : 'text-[#B79C64] hover:text-[#B79C64]/90'
            }`}
            aria-label={link.ariaLabel}
            aria-current={isActive ? "page" : undefined}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.title}
            {!isActive && (
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#B79C64] transition-all duration-300 group-hover:w-full"></span>
            )}
          </a>
        );
      })}
      {/* Book a Table CTA Button - Always visible */}
      <a 
        href="/book-table" 
        className="ml-4 px-6 py-2 bg-[#B79C64] text-primary font-semibold rounded-lg hover:bg-[#B79C64]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        aria-label="Book a table"
      >
        Book a Table
      </a>
    </div>
  );
}