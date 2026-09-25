import { apiClient } from '@/api/nomadai-api';
import type { Trip } from '../interfaces';

export const generateAction = async (prompt: string): Promise<Trip> => {
  const { data } = await apiClient.post<Trip>('/trips/generate', { prompt });

  return data;
};
