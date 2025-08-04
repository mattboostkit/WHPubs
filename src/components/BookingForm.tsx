import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, MapPin, ChevronRight } from 'lucide-react';

interface Pub {
  name: string;
  slug: { current: string };
  reservationsUrl?: string;
}

interface BookingFormProps {
  pub?: Pub;
  pubs?: Pub[];
  onMainPage?: boolean;
}

export default function BookingForm({ pub, pubs, onMainPage = false }: BookingFormProps) {
  const [selectedPub, setSelectedPub] = useState(pub?.slug.current || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPartySize, setSelectedPartySize] = useState('');

  // Generate dates for the next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 12; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleSubmit = () => {
    // Find the selected pub's reservation URL
    let reservationUrl = pub?.reservationsUrl;
    
    if (!reservationUrl && pubs && selectedPub) {
      const selectedPubData = pubs.find(p => p.slug.current === selectedPub);
      reservationUrl = selectedPubData?.reservationsUrl;
    }

    if (reservationUrl) {
      // In a real implementation, you might pass these parameters to the booking system
      window.open(reservationUrl, '_blank');
    } else {
      alert('Please select a pub with online booking available');
    }
  };

  const isFormValid = () => {
    if (onMainPage) {
      return selectedPub && selectedDate && selectedTime && selectedPartySize;
    }
    return selectedDate && selectedTime && selectedPartySize;
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-primary text-white">
        <CardTitle className="text-2xl flex items-center justify-center">
          <Calendar className="w-6 h-6 mr-3" />
          {onMainPage ? 'Book Your Table' : `Book a Table at ${pub?.name}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Pub Selector - Only show on main page */}
        {onMainPage && pubs && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Select Your Pub
            </label>
            <Select value={selectedPub} onValueChange={setSelectedPub}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Choose a pub" />
              </SelectTrigger>
              <SelectContent>
                {pubs.map((pubOption) => (
                  <SelectItem key={pubOption.slug.current} value={pubOption.slug.current}>
                    {pubOption.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Date Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Select Date
          </label>
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Choose a date" />
            </SelectTrigger>
            <SelectContent>
              {dates.map((date, index) => (
                <SelectItem key={index} value={date.toISOString()}>
                  {index === 0 ? 'Today - ' : index === 1 ? 'Tomorrow - ' : ''}
                  {formatDate(date)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Time Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Select Time
          </label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Choose a time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Party Size Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Party Size
          </label>
          <Select value={selectedPartySize} onValueChange={setSelectedPartySize}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Number of guests" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} {size === 1 ? 'Guest' : 'Guests'}
                </SelectItem>
              ))}
              <SelectItem value="13+">13+ Guests (Call us)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid()}
          size="lg"
          className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-6 text-lg"
        >
          Continue to Booking
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Additional Information */}
        <div className="text-sm text-gray-600 space-y-2 border-t pt-4">
          <p>• Tables are held for 15 minutes past booking time</p>
          <p>• For special requirements, please call us directly</p>
          {selectedPartySize === '13+' && (
            <p className="text-primary font-semibold">
              For groups of 13 or more, please call us to make your booking
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}