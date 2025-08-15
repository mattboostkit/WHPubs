import React, { useState } from 'react';
import { Mail, Gift, Calendar, Sparkles } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/95 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -mr-48 -mb-48"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-secondary/20 mb-4">
                <Mail className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Join The WH Pubs Family
              </h2>
              <p className="text-xl text-secondary/90 mb-6">
                Get exclusive offers, event invitations, and be the first to know about new menus
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Gift className="w-5 h-5 text-secondary" />
                <span>10% off your first booking</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Calendar className="w-5 h-5 text-secondary" />
                <span>Early access to events</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span>Special birthday treats</span>
              </div>
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-white/70 mt-3 text-center">
                  By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-100 px-6 py-3 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Thanks for subscribing! Check your email for your welcome offer.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}