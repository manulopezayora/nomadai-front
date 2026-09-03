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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
</style>
