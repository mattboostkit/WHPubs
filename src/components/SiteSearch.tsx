import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, MapPin, Calendar, FileText, Utensils, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  title: string;
  description?: string;
  url: string;
  type: 'pub' | 'event' | 'blog' | 'menu' | 'page';
  image?: string;
  location?: string;
  date?: string;
}

interface SiteSearchProps {
  searchData: SearchResult[];
  className?: string;
}

const typeIcons = {
  pub: MapPin,
  event: Calendar,
  blog: FileText,
  menu: Utensils,
  page: Home
};

const typeColors = {
  pub: 'bg-blue-100 text-blue-800',
  event: 'bg-green-100 text-green-800',
  blog: 'bg-purple-100 text-purple-800',
  menu: 'bg-orange-100 text-orange-800',
  page: 'bg-gray-100 text-gray-800'
};

export default function SiteSearch({ searchData, className }: SiteSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.location?.toLowerCase().includes(searchLower)
      );
    });

    setResults(filtered.slice(0, 8)); // Limit to 8 results
    setSelectedIndex(0);
  }, [searchTerm, searchData]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          window.location.href = results[selectedIndex].url;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Open search with keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <>
      {/* Search Trigger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className={cn("relative", className)}
        aria-label="Search site"
      >
        <Search className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 text-xs bg-gray-100 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Search Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <div className="p-4 pb-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search pubs, events, menus, and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-10 h-12 text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((result, index) => {
                  const Icon = typeIcons[result.type];
                  return (
                    <a
                      key={`${result.type}-${index}`}
                      href={result.url}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg transition-colors",
                        selectedIndex === index
                          ? "bg-secondary/20"
                          : "hover:bg-gray-100"
                      )}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {result.image ? (
                        <img
                          src={result.image}
                          alt=""
                          className="w-12 h-12 rounded object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm truncate">
                            {result.title}
                          </h4>
                          <Badge
                            variant="secondary"
                            className={cn("text-xs capitalize", typeColors[result.type])}
                          >
                            {result.type}
                          </Badge>
                        </div>
                        
                        {result.description && (
                          <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                            {result.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          {result.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {result.location}
                            </span>
                          )}
                          {result.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {result.date}
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : searchTerm ? (
              <div className="p-8 text-center text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No results found for "{searchTerm}"</p>
                <p className="text-xs mt-1">Try searching for pubs, events, or menu items</p>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <p className="text-sm">Start typing to search...</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">↵</kbd>
                Open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">esc</kbd>
                Close
              </span>
            </div>
            {results.length > 0 && (
              <span>{results.length} results</span>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}