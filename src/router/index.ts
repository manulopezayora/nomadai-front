import AuthLayout from '@/modules/auth/layout/AuthLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthLayout,
      redirect: '/sign-in',
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
  ],
});

export default router;
