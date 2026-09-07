<script setup lang="ts"></script>
<template>
  <footer class="footer">
    <span>&copy; 2026 Manuel Lopez</span>
    <a
      class="footer__link"
      href="https://manulopezayora.github.io/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Visit My Portfolio</span>
    </a>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop-filter);
  -webkit-backdrop-filter: var(--glass-backdrop-filter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: var(--primary);
}

.footer__link {
  color: inherit;
  text-decoration: none;
}
</style>
