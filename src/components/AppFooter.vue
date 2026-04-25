<template>
  <footer class="app-footer">
    <div class="container text-center">
      <div class="footer-links">
        <a
          href="https://github.com/mandarin1977/luckyai"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.5-.3-5.1-1.3-5.1-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3 1.1.9-.2 1.8-.4 2.8-.4s1.9.1 2.8.4c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.3-5.1 5.6.4.3.7.9.7 1.9v2.8c0 .3.2.6.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z"/>
          </svg>
          GitHub
        </a>
        <span class="separator">·</span>
        <span class="copyright">© 2026 LuckyAI</span>
        <span class="separator">·</span>
        <span class="motto">All rights reserved for good fortune 🍀</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: var(--spacing-xl) 0;
  margin-top: auto;
}

.footer-links {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-accent);
}

.separator {
  color: rgba(245, 230, 211, 0.3);
}

.copyright,
.motto {
  white-space: nowrap;
}

@media (max-width: 480px) {
  .footer-links {
    font-size: 0.78rem;
    gap: 0.4rem;
  }
}
</style>
