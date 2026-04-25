<template>
  <div class="home-view container">
    <div class="hero">
      <h1 class="title en fade-in-up">LuckyAI</h1>
      <p class="slogan en fade-in-up delay-1">"AI-powered optimism, scientifically unfounded."</p>
      <p class="sub-slogan fade-in-up delay-2">당신의 모든 것이 길조입니다</p>
      
      <div class="cta-group fade-in-up delay-3">
        <router-link to="/palm" class="btn btn-primary">
          <span class="icon">✋</span>
          손금 보기
        </router-link>
        <router-link to="/saju" class="btn btn-primary">
          <span class="icon">🔯</span>
          사주 풀이
        </router-link>
        <router-link to="/misfortune" class="btn btn-secondary">
          <span class="icon">✨</span>
          불운 변환기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No specific logic needed for HomeView yet
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px); /* Adjust based on header/footer */
  text-align: center;
}

.hero {
  max-width: 800px;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  background: rgba(15, 14, 46, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: clamp(3rem, 8vw, 6rem);
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.slogan {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  font-style: italic;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}

.sub-slogan {
  font-size: clamp(1.2rem, 3.5vw, 1.8rem);
  font-weight: 600;
  margin-bottom: var(--spacing-2xl);
}

.cta-group {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .cta-group {
    flex-direction: column;
    width: 100%;
  }
}

/* Animations */
.fade-in-up {
  opacity: 0;
  animation: scaleUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
</style>
