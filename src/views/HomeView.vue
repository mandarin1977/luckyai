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

    <!-- 오늘의 한 마디 -->
    <div class="daily-card fade-in-up delay-4">
      <div class="daily-header">
        <span class="daily-label">🌟 오늘의 한 마디</span>
        <span class="daily-date">{{ todayDate }}</span>
      </div>
      <transition name="msg-swap" mode="out-in">
        <p :key="todayMessage" class="daily-message">"{{ todayMessage }}"</p>
      </transition>
      <button class="daily-refresh" @click="refresh">↻ 다른 한 마디</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { CLICKER_MESSAGES, pickRandomMessage } from '../utils/clickerMessages';

const todayMessage = ref('');

const todayKey = computed(() => {
  const d = new Date();
  return `lucky-daily-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
});

const todayDate = computed(() => {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
});

onMounted(() => {
  const cached = localStorage.getItem(todayKey.value);
  if (cached) {
    todayMessage.value = cached;
  } else {
    const msg = CLICKER_MESSAGES[Math.floor(Math.random() * CLICKER_MESSAGES.length)];
    todayMessage.value = msg;
    localStorage.setItem(todayKey.value, msg);
  }
});

const refresh = () => {
  const newMsg = pickRandomMessage(todayMessage.value);
  todayMessage.value = newMsg;
  localStorage.setItem(todayKey.value, newMsg);
};
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px); /* Adjust based on header/footer */
  text-align: center;
  gap: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
}

.hero {
  max-width: 800px;
  width: 100%;
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
  letter-spacing: -0.02em;
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

/* Daily Card */
.daily-card {
  width: 100%;
  max-width: 560px;
  background: linear-gradient(135deg, rgba(45, 27, 78, 0.5), rgba(15, 14, 46, 0.7));
  border: 1px dashed rgba(255, 215, 0, 0.3);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  align-items: center;
}

.daily-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.85rem;
}

.daily-label {
  color: var(--color-accent);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.daily-date {
  color: var(--color-text-muted);
  font-family: 'Pretendard Variable', monospace;
}

.daily-message {
  color: var(--color-text);
  font-size: 1.05rem;
  line-height: 1.6;
  text-align: center;
  margin: var(--spacing-sm) 0;
  font-style: italic;
}

.daily-refresh {
  background: none;
  border: 1px solid rgba(255, 215, 0, 0.25);
  color: var(--color-text-muted);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.daily-refresh:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.msg-swap-enter-active,
.msg-swap-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.msg-swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.msg-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Animations */
.fade-in-up {
  opacity: 0;
  animation: scaleUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; }
</style>
