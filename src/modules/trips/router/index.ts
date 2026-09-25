import type { RouteRecordRaw } from 'vue-router';
import TripDetailLayout from '../layouts/TripDetailLayout.vue';
import TripLayout from '../layouts/TripLayout.vue';

export const tripRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'trips',
    component: TripLayout,
    redirect: '/my-trips',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'my-trips',
        name: 'myTrips',
        component: () => import('@/modules/trips/views/MyTripsView.vue'),
      },
      {
        path: 'new-trip',
        name: 'newTrip',
        component: () => import('@/modules/trips/views/NewTripView.vue'),
      },
      {
        path: 'trip-detail/:id?',
        name: 'tripDetail',
        component: TripDetailLayout,
        redirect: { name: 'itinerary' },
        children: [
          {
            path: 'itinerary',
            name: 'itinerary',
            component: () => import('@/modules/trips/views/ItineraryView.vue'),
          },
        ],
      },
    ],
  },
];
