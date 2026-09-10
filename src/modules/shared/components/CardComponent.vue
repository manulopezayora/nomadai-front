<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 420px;
  background: var(--glass-bg);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: var(--shadow-color);
}
</style>
