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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(15, 14, 46, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 215, 0, 0.08);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}
</style>
