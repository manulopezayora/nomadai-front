<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import { useAuthStore } from './modules/auth/stores/auth.store';
import FooterComponent from './modules/shared/components/FooterComponent.vue';
import HeaderMenuComponent from './modules/shared/components/HeaderMenuComponent.vue';

const authStore = useAuthStore();
</script>

<template>
  <Toaster richColors />
  <HeaderMenuComponent v-if="authStore.isAuthenticated" />
  <RouterView />
  <FooterComponent v-if="authStore.isAuthenticated" />
  <!-- <VueQueryDevtools /> -->
</template>

<style scoped></style>
