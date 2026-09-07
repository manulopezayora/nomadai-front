<template>
  <div class="auth-card">
    <slot />
  </div>
</template>

<style scoped>
.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--glass-bg);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: var(--shadow-color);
}
</style>
