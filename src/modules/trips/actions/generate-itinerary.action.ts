import { apiClient } from '@/api/nomadai-api';
import type { GenerateItinerary } from '../interfaces/GenerateItinerary.interface';

export const generateItineraryAction = async (prompt: string): Promise<GenerateItinerary> => {
  const { data } = await apiClient.post<GenerateItinerary>('/trips/generate', { prompt });

  return data;
};
