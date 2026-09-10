<template>
  <section class="trips-layout">
    <RouterView />
  </section>
</template>

<style scoped>
.trips-layout {
  padding: 0 40px;
}

@media (min-width: 768px) {
  .trips-layout {
    padding: 0 80px;
  }
}
</style>
