import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Flight, Hotel, Itinerary, Trip } from '../interfaces';

export const useTripStore = defineStore('trip', () => {
  const trip = ref<Trip>();
  const itinerary = ref<Itinerary>();
  const flights = ref<Flight[]>();
  const hotels = ref<Hotel[]>();

  const setTrip = (newTrip: Trip) => {
    trip.value = newTrip;
  };

  const setItinerary = (newItinerary: Itinerary) => {
    itinerary.value = newItinerary;
  };

  const setFlights = (newFlights: Flight[]) => {
    flights.value = newFlights;
  };

  const setHotels = (newHotels: Hotel[]) => {
    hotels.value = newHotels;
  };

  const clearTrip = () => {
    trip.value = undefined;
    itinerary.value = undefined;
    flights.value = undefined;
    hotels.value = undefined;
  };

  return {
    trip,
    itinerary,
    flights,
    hotels,

    setTrip,
    setItinerary,
    setFlights,
    setHotels,
    clearTrip,
  };
});
