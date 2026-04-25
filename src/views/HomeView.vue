<template>
  <div class="home-view container">
    <div class="hero">
      <h1 class="title en fade-in-up">LuckyAI</h1>
      <p class="slogan en fade-in-up delay-1">"AI-powered optimism, scientifically unfounded."</p>
      <p class="sub-slogan fade-in-up delay-2">{{ t.subSlogan }}</p>

      <div class="cta-group fade-in-up delay-3">
        <router-link to="/palm" class="btn btn-primary">
          <span class="icon">✋</span>
          {{ t.palm }}
        </router-link>
        <router-link to="/saju" class="btn btn-primary">
          <span class="icon">🔯</span>
          {{ t.saju }}
        </router-link>
        <router-link to="/misfortune" class="btn btn-secondary">
          <span class="icon">✨</span>
          {{ t.misfortune }}
        </router-link>
      </div>
    </div>

    <!-- 오늘의 한 마디 -->
    <div class="daily-card fade-in-up delay-4">
      <div class="daily-header">
        <span class="daily-label">🌟 {{ t.dailyLabel }}</span>
        <span class="daily-date">{{ todayDate }}</span>
      </div>
      <transition name="msg-swap" mode="out-in">
        <p :key="todayMessage" class="daily-message">"{{ todayMessage }}"</p>
      </transition>
      <button class="daily-refresh" @click="refresh">{{ t.refreshBtn }}</button>
    </div>

    <!-- 재미로 즐기기 -->
    <div class="play-section fade-in-up delay-4">
      <p class="play-label">{{ t.playLabel }}</p>
      <div class="play-row">
        <router-link to="/clicker" class="play-card">
          <span class="play-icon">😺</span>
          <span class="play-name">{{ t.clickerName }}</span>
          <span class="play-desc">{{ t.clickerDesc }}</span>
        </router-link>
        <router-link to="/lotto" class="play-card">
          <span class="play-icon">🥠</span>
          <span class="play-name">{{ t.lottoName }}</span>
          <span class="play-desc">{{ t.lottoDesc }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { pickRandomMessage } from '../utils/clickerMessages';
import { useLocale } from '../composables/useLocale';

const { locale } = useLocale();

const STRINGS = {
  ko: {
    subSlogan: '당신의 모든 것이 길조입니다',
    palm: '손금 보기',
    saju: '사주 풀이',
    misfortune: '불운 변환기',
    dailyLabel: '오늘의 한 마디',
    refreshBtn: '↻ 다른 한 마디',
    playLabel: '심심할 때 가볍게',
    clickerName: '운세 클리커',
    clickerDesc: '캐릭터 누를 때마다 길조',
    lottoName: '운세 로또',
    lottoDesc: '쿠키 골라 한 마디 뽑기'
  },
  en: {
    subSlogan: 'Everything about you is auspicious',
    palm: 'Palm Reading',
    saju: 'Saju (4 Pillars)',
    misfortune: 'Misfortune Reframer',
    dailyLabel: "Today's Word",
    refreshBtn: '↻ Another word',
    playLabel: 'A little something for boredom',
    clickerName: 'Fortune Clicker',
    clickerDesc: 'Tap the character for fortune',
    lottoName: 'Fortune Lotto',
    lottoDesc: 'Pick a cookie, get a word'
  }
};

const t = computed(() => STRINGS[locale.value]);

const todayMessage = ref('');

const todayKey = computed(() => {
  const d = new Date();
  return `lucky-daily-${locale.value}-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
});

const todayDate = computed(() => {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
});

const safeRead = (key) => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const safeWrite = (key, value) => {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
};

const loadOrPickToday = () => {
  const cached = safeRead(todayKey.value);
  if (cached) {
    todayMessage.value = cached;
  } else {
    const msg = pickRandomMessage('', locale.value);
    todayMessage.value = msg;
    safeWrite(todayKey.value, msg);
  }
};

onMounted(loadOrPickToday);
// locale 바뀌면 그날의 메시지 (해당 언어 캐시) 다시 로드
watch(locale, loadOrPickToday);

const refresh = () => {
  const newMsg = pickRandomMessage(todayMessage.value, locale.value);
  todayMessage.value = newMsg;
  safeWrite(todayKey.value, newMsg);
};
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);
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
  flex-wrap: wrap;
  gap: var(--spacing-xs);
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

.msg-swap-enter-from { opacity: 0; transform: translateY(6px); }
.msg-swap-leave-to { opacity: 0; transform: translateY(-6px); }

.play-section {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  align-items: center;
}

.play-label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.play-row {
  display: flex;
  gap: var(--spacing-md);
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

.play-card {
  flex: 1;
  min-width: 160px;
  background: rgba(15, 14, 46, 0.45);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  color: var(--color-text);
}

.play-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.15);
}

.play-icon {
  font-size: 1.8rem;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.25));
}

.play-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-accent);
}

.play-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-align: center;
}

.fade-in-up {
  opacity: 0;
  animation: scaleUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; }
</style>
