export interface GenerateItinerary {
  id: string;
  userId: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelerCount: number;
  preferences: Preferences;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Preferences {
  interests: string[];
  travelStyle: string;
}
