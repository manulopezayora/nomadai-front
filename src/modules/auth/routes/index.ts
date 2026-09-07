import AuthLayout from '@/modules/auth/layout/AuthLayout.vue';
import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    redirect: '/auth/sign-in',
    meta: { guestOnly: true },
    children: [
      {
        path: 'sign-in',
        name: 'signIn',
        component: () => import('@/modules/auth/views/SignInView.vue'),
      },
      {
        path: 'create-account',
        name: 'createAccount',
        component: () => import('@/modules/auth/views/CreateAccountView.vue'),
      },
    ],
  },
];
