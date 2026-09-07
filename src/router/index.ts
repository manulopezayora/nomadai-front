import { authRoutes } from '@/modules/auth/routes';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { tripRoutes } from '@/modules/trips/router';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...tripRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { name: 'signIn' }, // TODO: NotFoundView
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'signIn' };
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'trips' };
  }
});

export default router;
