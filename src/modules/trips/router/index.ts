import type { RouteRecordRaw } from 'vue-router';
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
        component: () => import('@/modules/trips/views/MyTrips.vue'),
      },
    ],
  },
];
