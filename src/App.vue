<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import { useAuthStore } from './modules/auth/stores/auth.store';
import FooterComponent from './modules/shared/components/FooterComponent.vue';
import HeaderMenuComponent from './modules/shared/components/HeaderMenuComponent.vue';

import 'vue-sonner/style.css';

const authStore = useAuthStore();
</script>

<template>
  <Toaster richColors />
  <HeaderMenuComponent v-if="authStore.isAuthenticated" />
  <RouterView />
  <FooterComponent v-if="authStore.isAuthenticated" />
  <VueQueryDevtools />
</template>

<style scoped></style>
