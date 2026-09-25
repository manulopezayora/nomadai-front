import type { Trip } from './Trip.interface';

export interface Flight {
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureDate: Date;
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency: string;
  class: string;
  stops: number;
  durationMinutes: number;
  bookingUrl: null;
  notes: null;
  isRecommended: boolean;
}

export interface FlightRequest {
  trip: Trip;
  departureHint: string;
  departureDate: Date;
  returnDate: Date;
  passengers: number;
  travelClass: string;
}
