import type { Trip } from './Trip.interface';

export interface Hotel {
  name: string;
  location: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  originalPricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  imageUrl: null;
  bookingUrl: null;
  isRecommended: boolean;
}

export interface HotelsRequest {
  trip: Trip;
  checkIn: Date;
  checkOut: Date;
  maxPricePerNight: number;
  minRating: number;
  amenities: string[];
}
