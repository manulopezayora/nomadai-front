<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { RouterView, useRoute } from 'vue-router';
import { Toaster } from 'vue-sonner';
import { useAuthStore } from './modules/auth/stores/auth.store';
import FooterComponent from './modules/shared/components/FooterComponent.vue';
import HeaderMenuComponent from './modules/shared/components/HeaderMenuComponent.vue';

import { computed } from 'vue';
import 'vue-sonner/style.css';

const authStore = useAuthStore();
const route = useRoute();
const showComponents = computed(
  () => authStore.isAuthenticated && !route.fullPath.includes('/auth'),
);
</script>

<template>
  <Toaster richColors />
  <HeaderMenuComponent v-if="showComponents" />
  <RouterView />
  <FooterComponent v-if="showComponents" />
  <VueQueryDevtools />
</template>

<style scoped></style>
