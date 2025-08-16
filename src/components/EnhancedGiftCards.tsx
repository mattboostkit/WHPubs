import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Heart, Star, CreditCard, Mail, Smartphone, Download, ExternalLink, ShoppingCart, CheckCircle, Sparkles } from 'lucide-react';

interface EnhancedGiftCardsProps {
  className?: string;
}

export default function EnhancedGiftCards({ className = '' }: EnhancedGiftCardsProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'physical' | 'sms'>('email');
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);

  const predefinedAmounts = [25, 50, 75, 100, 150, 200];

  const giftCardFeatures = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Perfect for Any Occasion",
      description: "Birthdays, anniversaries, celebrations, or just because"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Valid at All Locations",
      description: "Use at any of our five traditional British pubs"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "No Expiry Date",
      description: "Our gift cards never expire - use them whenever you like"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Instant Delivery",
      description: "Email delivery in minutes, perfect for last-minute gifts"
    }
  ];

  const handleAmountSelect = (amount: number | string) => {
    if (typeof amount === 'number') {
      setSelectedAmount(amount);
      setCustomAmount('');
    } else {
      setSelectedAmount(null);
      setCustomAmount(amount);
    }
  };

  const getCurrentAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const handlePurchase = () => {
    const amount = getCurrentAmount();
    if (amount >= 10) {
      // Track purchase intent
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('Gift Card Purchase Started', {
          amount: amount,
          deliveryMethod: deliveryMethod
        });
      }
      setShowPurchaseForm(true);
    }
  };

  if (showPurchaseForm) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <Card className="shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-secondary to-secondary/90 text-white">
            <CardTitle className="text-2xl flex items-center justify-center">
              <Gift className="w-6 h-6 mr-2" />
              Complete Your Gift Card Purchase
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-full mb-4">
                  <Gift className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  £{getCurrentAmount()} Gift Card
                </h3>
                <Badge variant="secondary" className="text-sm">
                  {deliveryMethod === 'email' ? '📧 Email Delivery' : 
                   deliveryMethod === 'sms' ? '📱 SMS Delivery' : 
                   '📮 Physical Card'}
                </Badge>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> For demonstration purposes, this redirects to a placeholder purchase system. 
                  In production, this would integrate with your preferred payment processor (Stripe, PayPal, etc.).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Button 
                  onClick={() => window.open('https://buy.stripe.com/test_example', '_blank')}
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 h-12"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay with Card
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                
                <Button 
                  onClick={() => window.open('https://paypal.me/whpubs', '_blank')}
                  variant="outline" 
                  size="lg"
                  className="h-12"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Pay with PayPal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <Button 
                variant="ghost" 
                onClick={() => setShowPurchaseForm(false)}
                className="text-primary/60 hover:text-primary"
              >
                ← Back to Gift Card Options
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
          <Gift className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">
          WH Pubs Gift Cards
        </h1>
        <p className="text-xl text-primary/70 max-w-3xl mx-auto">
          Give the gift of exceptional dining experiences. Our gift cards are perfect for 
          treating loved ones to memorable moments at any of our traditional British pubs.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {giftCardFeatures.map((feature, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mb-4 text-secondary">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-primary/60">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Purchase Section */}
      <Card className="shadow-xl max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Choose Your Gift Card Amount</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Amount Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Select Amount:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedAmount === amount
                      ? 'border-secondary bg-secondary/10 text-secondary'
                      : 'border-primary/20 hover:border-secondary/50'
                  }`}
                >
                  <div className="text-2xl font-bold">£{amount}</div>
                </button>
              ))}
            </div>
            
            {/* Custom Amount */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Or enter custom amount (£10 minimum):</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60">£</span>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={customAmount}
                  onChange={(e) => handleAmountSelect(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-primary/20 rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Delivery Method:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setDeliveryMethod('email')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  deliveryMethod === 'email'
                    ? 'border-secondary bg-secondary/10'
                    : 'border-primary/20 hover:border-secondary/50'
                }`}
              >
                <Mail className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <div className="font-medium">Email</div>
                <div className="text-sm text-primary/60">Instant delivery</div>
              </button>
              
              <button
                onClick={() => setDeliveryMethod('sms')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  deliveryMethod === 'sms'
                    ? 'border-secondary bg-secondary/10'
                    : 'border-primary/20 hover:border-secondary/50'
                }`}
              >
                <Smartphone className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <div className="font-medium">SMS</div>
                <div className="text-sm text-primary/60">Text message</div>
              </button>
              
              <button
                onClick={() => setDeliveryMethod('physical')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  deliveryMethod === 'physical'
                    ? 'border-secondary bg-secondary/10'
                    : 'border-primary/20 hover:border-secondary/50'
                }`}
              >
                <Download className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <div className="font-medium">Physical Card</div>
                <div className="text-sm text-primary/60">Posted to you</div>
              </button>
            </div>
          </div>

          {/* Purchase Summary */}
          {getCurrentAmount() >= 10 && (
            <div className="bg-secondary/10 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-primary mb-3">Purchase Summary:</h4>
              <div className="flex justify-between items-center mb-2">
                <span>Gift Card Value:</span>
                <span className="font-bold text-lg">£{getCurrentAmount()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Delivery:</span>
                <span className="text-secondary font-medium">
                  {deliveryMethod === 'email' ? 'Email (Free)' : 
                   deliveryMethod === 'sms' ? 'SMS (Free)' : 
                   'Physical Card (+£2.99)'}
                </span>
              </div>
              <div className="border-t pt-2 mt-3">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span>£{getCurrentAmount() + (deliveryMethod === 'physical' ? 2.99 : 0)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Purchase Button */}
          <Button
            onClick={handlePurchase}
            disabled={getCurrentAmount() < 10}
            size="lg"
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Gift className="w-5 h-5 mr-2" />
            {getCurrentAmount() < 10 ? 'Select Amount (£10 minimum)' : `Purchase £${getCurrentAmount()} Gift Card`}
          </Button>

          {/* Terms */}
          <div className="mt-6 text-center text-sm text-primary/60">
            <p>Gift cards are valid for 24 months from purchase date and can be used at any WH Pubs location.</p>
            <p className="mt-1">
              By purchasing, you agree to our{' '}
              <a href="/terms" className="text-secondary hover:underline">Terms & Conditions</a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-medium text-primary hover:text-secondary">
                Can I use my gift card at all WH Pubs locations?
              </summary>
              <p className="mt-2 text-primary/70 pl-4">
                Yes! Our gift cards are valid at all five WH Pubs locations: The Bull Otford, The Little Brown Jug, 
                The Chaser Inn, The Cricketers Inn, and The Rose and Crown.
              </p>
            </details>
            
            <details className="group">
              <summary className="cursor-pointer font-medium text-primary hover:text-secondary">
                Do gift cards expire?
              </summary>
              <p className="mt-2 text-primary/70 pl-4">
                Our gift cards are valid for 24 months from the date of purchase, giving you plenty of time to enjoy 
                your dining experience.
              </p>
            </details>
            
            <details className="group">
              <summary className="cursor-pointer font-medium text-primary hover:text-secondary">
                Can I check my gift card balance?
              </summary>
              <p className="mt-2 text-primary/70 pl-4">
                Yes, you can check your balance by calling any of our pubs or asking your server when you visit.
              </p>
            </details>
            
            <details className="group">
              <summary className="cursor-pointer font-medium text-primary hover:text-secondary">
                What if I lose my gift card?
              </summary>
              <p className="mt-2 text-primary/70 pl-4">
                If you lose your physical gift card, please contact us immediately with your purchase details. 
                We'll do our best to help you recover your card value.
              </p>
            </details>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}