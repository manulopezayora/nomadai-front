import type { Flight } from './Flight.interface';
import type { Hotel } from './Hotel.interface';
import type { Itinerary } from './Itinerary.interface';

export interface SaveGeneratedTrip {
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelerCount: number;
  interests: string[];
  travelStyle: string;
  flights: Flight[];
  hotels: Hotel[];
  itinerary: Itinerary;
}
