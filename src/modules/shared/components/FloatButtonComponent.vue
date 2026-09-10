<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

withDefaults(
  defineProps<{
    to?: RouteLocationRaw;
    type?: 'submit' | 'button' | 'reset';
    loading?: boolean;
    disabled?: boolean;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  }>(),
  {
    type: 'button',
    loading: false,
    disabled: false,
    position: 'bottom-right',
  },
);
</script>

<template>
  <RouterLink v-if="to" :to="to" custom v-slot="{ navigate }">
    <button
      :type="type"
      class="fab"
      :class="`fab--${position}`"
      :disabled="disabled || loading"
      @click="navigate"
    >
      <span v-if="loading" class="fab__spinner" />
      <slot v-else />
    </button>
  </RouterLink>

  <button
    v-else
    :type="type"
    class="fab"
    :class="`fab--${position}`"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="fab__spinner" />
    <slot v-else />
  </button>
</template>

<style scoped>
.fab {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  padding: 0;
  color: var(--text-white);
  cursor: pointer;
  background: var(--bg-gradient-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: opacity 0.15s ease;

  position: fixed;
  z-index: 10;
}

.fab:hover:not(:disabled) {
  opacity: 0.92;
}

.fab:active:not(:disabled) {
  transform: scale(0.96);
}

.fab:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.fab--top-left {
  top: 1.5rem;
  left: 1.5rem;
}

.fab--top-right {
  top: 1.5rem;
  right: 1.5rem;
}

.fab--bottom-left {
  bottom: 1.5rem;
  left: 1.5rem;
}

.fab--bottom-right {
  bottom: 1.5rem;
  right: 1.5rem;
}

.fab__spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: var(--text-white);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
