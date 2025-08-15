import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, MapPin, Calendar } from 'lucide-react';

interface Review {
  _id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  reviewDate?: string;
  associatedPub?: {
    name: string;
    slug: {
      current: string;
    };
  };
  verified?: boolean;
}

interface CustomerReviewsProps {
  reviews: Review[];
  showPubLink?: boolean;
}

export default function CustomerReviews({ reviews, showPubLink = true }: CustomerReviewsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter only published reviews with good ratings
  const displayReviews = reviews.filter(r => r.rating >= 4).slice(0, 10);

  const nextReview = () => {
    if (displayReviews.length > 0) {
      setActiveIndex((prev) => (prev + 1) % displayReviews.length);
    }
  };

  const prevReview = () => {
    if (displayReviews.length > 0) {
      setActiveIndex((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
    }
  };

  useEffect(() => {
    if (!isPaused && displayReviews.length > 1) {
      const timer = setInterval(nextReview, 6000);
      return () => clearInterval(timer);
    }
  }, [isPaused, displayReviews.length]);

  if (displayReviews.length === 0) {
    return null;
  }

  const currentReview = displayReviews[activeIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Customer Reviews
            </span>
            <h2 className="header-section">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from our valued customers across all WH Pubs locations
            </p>
          </div>

          {/* Main Review Card */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-24 -mb-24" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10">
                    <Quote className="w-8 h-8 text-secondary" />
                  </div>
                </div>

                {/* Review Content */}
                <div className="text-center">
                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-6 h-6 transition-colors duration-300 ${
                          i < currentReview.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'fill-gray-200 text-gray-200'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 italic leading-relaxed max-w-3xl mx-auto">
                    "{currentReview.reviewText}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="mb-4">
                    <p className="font-bold text-lg text-gray-900 mb-2">
                      {currentReview.customerName}
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      {currentReview.associatedPub && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {showPubLink ? (
                            <a 
                              href={`/pubs/${currentReview.associatedPub.slug.current}`}
                              className="hover:text-secondary transition-colors"
                            >
                              {currentReview.associatedPub.name}
                            </a>
                          ) : (
                            <span>{currentReview.associatedPub.name}</span>
                          )}
                        </div>
                      )}
                      
                      {currentReview.reviewDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(currentReview.reviewDate).toLocaleDateString('en-GB', {
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Navigation Buttons */}
              {displayReviews.length > 1 && (
                <>
                  <button
                    onClick={prevReview}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-6 h-6 group-hover:text-secondary transition-colors" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-6 h-6 group-hover:text-secondary transition-colors" />
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator */}
            {displayReviews.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {displayReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-12 h-3 bg-secondary rounded-full' 
                        : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>


          {/* CTA */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/book-table" 
                className="inline-flex items-center justify-center gap-2 bg-primary text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Book Your Table
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a 
                href="/pubs" 
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300"
              >
                Find Your Local
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}