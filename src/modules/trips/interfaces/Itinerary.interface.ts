export interface Itinerary {
  days: Day[];
}

export interface Day {
  dayNumber: number;
  title: string;
  notes: string;
  activities: Activity[];
}

export interface Activity {
  dayNumber: number;
  title: string;
  description: string;
  category: string;
  startTime: string;
  endTime: string;
  location: string;
  latitude: number;
  longitude: number;
  cost: number;
  bookingUrl: null;
  order: number;
}
