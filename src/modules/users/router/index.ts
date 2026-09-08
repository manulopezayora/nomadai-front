import type { RouteRecordRaw } from 'vue-router';
import UserLayout from '../layouts/UserLayout.vue';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: UserLayout,
    redirect: { name: 'userList' },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'user-list',
        name: 'userList',
        component: () => import('@/modules/users/views/UserListView.vue'),
      },
      {
        path: 'profile/:userId',
        name: 'profile',
        component: () => import('@/modules/users/views/UserProfileView.vue'),
      },
    ],
  },
];
