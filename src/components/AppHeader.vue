<template>
  <header class="app-header">
    <div class="container header-row">
      <router-link to="/" class="logo">
        <span class="logo-text en">LuckyAI</span>
      </router-link>

      <button
        class="lang-toggle"
        @click="toggleLocale"
        :aria-label="locale === 'ko' ? 'Switch to English' : '한국어로 변경'"
      >
        <span :class="['lang-segment', { active: locale === 'ko' }]">KO</span>
        <span class="lang-divider">|</span>
        <span :class="['lang-segment', { active: locale === 'en' }]">EN</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useLocale } from '../composables/useLocale';
const { locale, toggleLocale } = useLocale();
</script>

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

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}

.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 215, 0, 0.08);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 20px;
  padding: 0.3rem 0.85rem;
  color: var(--color-text-muted);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.lang-toggle:hover {
  background: rgba(255, 215, 0, 0.15);
  border-color: var(--color-accent);
}

.lang-segment {
  transition: color var(--transition-fast);
}

.lang-segment.active {
  color: var(--color-accent);
}

.lang-divider {
  color: rgba(245, 230, 211, 0.3);
  font-weight: 400;
}
</style>
