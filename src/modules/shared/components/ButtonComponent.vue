<script setup lang="ts">
withDefaults(
  defineProps<{
    type: 'submit' | 'button' | 'reset';
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'submit',
    loading: false,
    disabled: false,
  },
);
</script>

<template>
  <button :type="type" class="button" :disabled="disabled || loading">
    <span v-if="loading" class="button__spinner" />
    <slot v-else />
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  padding: 0.9rem 0;
  width: 100%;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-white);
  cursor: pointer;
  background: var(--bg-gradient-primary);
  transition: opacity 0.15s ease;
}

.button:hover:not(:disabled) {
  opacity: 0.92;
}

.button:active:not(:disabled) {
  transform: scale(0.99);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button__spinner {
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
