<template>
  <header class="app-header">
    <div class="container">
      <router-link to="/" class="logo">
        <span class="logo-text en">LuckyAI</span>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  padding: var(--spacing-md) 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
}
</style>
