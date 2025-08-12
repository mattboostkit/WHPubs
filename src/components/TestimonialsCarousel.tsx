import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  source: string;
}

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Thompson',
      location: 'The Cricketers Inn',
      rating: 5,
      text: 'Absolutely wonderful Sunday roast! The beef was perfectly cooked and the Yorkshire puddings were huge. Staff were so friendly and the atmosphere was perfect for our family gathering.',
      date: 'Last week',
      source: 'Google'
    },
    {
      id: 2,
      name: 'James Mitchell',
      location: 'The Rose and Crown',
      rating: 5,
      text: 'The best pub garden in Kent! We spent a lovely summer afternoon here with friends. Great selection of local ales and the food was exceptional. Will definitely be back!',
      date: '2 weeks ago',
      source: 'TripAdvisor'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      location: 'The Little Brown Jug',
      rating: 5,
      text: 'Such a cozy and welcoming pub! The log fire was roaring, the food was delicious, and the staff made us feel right at home. A real gem in the countryside.',
      date: '3 days ago',
      source: 'Facebook'
    },
    {
      id: 4,
      name: 'David Clarke',
      location: 'The Chaser Inn',
      rating: 5,
      text: 'Fantastic live music night! The atmosphere was electric and the band was brilliant. Great craft beers and the burger was one of the best I\'ve had. Highly recommend!',
      date: 'Yesterday',
      source: 'Google'
    },
    {
      id: 5,
      name: 'Lucy Anderson',
      location: 'The Bull',
      rating: 5,
      text: 'We held our anniversary dinner here and it was perfect. The private dining room was beautiful, the service was impeccable, and the food was outstanding. Thank you for making our day special!',
      date: 'Last month',
      source: 'TripAdvisor'
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-bold text-primary mt-2 mb-4">What Our Guests Say</h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex p-3 rounded-full bg-secondary/10">
                  <Quote className="w-8 h-8 text-secondary" />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Author */}
                <div className="mb-2">
                  <p className="font-bold text-gray-900">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonials[activeIndex].location} • {testimonials[activeIndex].date}
                  </p>
                </div>

                {/* Source Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  <span>via {testimonials[activeIndex].source}</span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 h-2 bg-secondary rounded-full' 
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <a 
              href="/book-table" 
              className="inline-flex items-center gap-2 bg-primary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Experience It Yourself
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}