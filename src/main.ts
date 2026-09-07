import './assets/main.css';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';

import { queryClient } from './api/query-client';
import App from './App.vue';
import { i18n } from './i18n';
import { checkStatusAction } from './modules/auth/actions/index';
import { useAuthStore } from './modules/auth/stores/auth.store';
import { pinia } from './pinia';
import router from './router';

async function bootstrap() {
  const app = createApp(App);

  app.use(pinia);
  app.use(VueQueryPlugin, { queryClient });
  app.use(i18n);

  const authStore = useAuthStore();

  try {
    const { user } = await checkStatusAction();
    authStore.setSession(user);
  } catch {
    authStore.clearSession();
  }

  app.use(router);
  app.mount('#app');
}

bootstrap();
