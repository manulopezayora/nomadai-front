<script setup lang="ts">
interface Props {
  maxWidth?: boolean;
}

withDefaults(defineProps<Props>(), {
  maxWidth: false,
});
</script>

<template>
  <div class="card" :style="{ '--max-width': `${maxWidth ? '100%' : '420px'}` }">
    <slot />
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: var(--max-width);
  background: var(--glass-bg);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: var(--shadow-color);
}
</style>
