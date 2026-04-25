<template>
  <div class="lotto-view container pb-lg">
    <div class="header-section text-center mb-lg fade-in-up">
      <h1 class="title">운세 로또</h1>
      <p class="subtitle">{{ subtitleText }}</p>
    </div>

    <div class="stage-area fade-in-up delay-1">
      <!-- 1단계: 5개 쿠키 중 하나 선택 -->
      <div v-if="stage === 'pick'" class="cookies-row">
        <button
          v-for="i in 5"
          :key="i"
          class="cookie-btn"
          :style="{ animationDelay: `${(i - 1) * 0.08}s` }"
          @click="pickCookie(i - 1)"
          aria-label="운세 쿠키 선택"
        >
          <span class="cookie-emoji">🥠</span>
        </button>
      </div>

      <!-- 2단계: 갈라지는 중 -->
      <div v-else-if="stage === 'opening'" class="opening-area text-center">
        <div class="opening-cookie-wrapper">
          <span class="opening-cookie">🥠</span>
          <span class="sparkle s1">✨</span>
          <span class="sparkle s2">✨</span>
          <span class="sparkle s3">✨</span>
          <span class="sparkle s4">✨</span>
        </div>
        <p class="opening-text">우주의 메시지를 펼치는 중...</p>
      </div>

      <!-- 3단계: 결과 -->
      <div v-else class="result-area">
        <div class="opened-emoji">✨</div>
        <div class="fortune-paper fade-in-up">
          <div class="paper-header">
            <span class="paper-label">오늘의 한 마디</span>
          </div>
          <p class="fortune-message">"{{ fortune }}"</p>
          <div class="lucky-pair">
            <div class="lucky-item">
              <span class="lucky-label">행운의 숫자</span>
              <span class="lucky-value">{{ luckyNumber }}</span>
            </div>
            <div class="lucky-item">
              <span class="lucky-label">행운의 색상</span>
              <span class="lucky-value">{{ luckyColor }}</span>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-primary" @click="reset">🥠 다시 뽑기</button>
          <router-link to="/" class="btn btn-secondary">🏠 메인으로</router-link>
        </div>
      </div>
    </div>

    <p v-if="stage === 'result'" class="footer-note text-center">
      ※ 운세 로또는 매번 새 결과가 나옵니다 — 마음에 드는 한 마디를 만날 때까지 🍀
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  pickRandomFortune,
  pickRandomColor,
  pickRandomNumber
} from '../utils/fortuneCookieMessages';

const stage = ref('pick'); // 'pick' | 'opening' | 'result'
const fortune = ref('');
const luckyNumber = ref(0);
const luckyColor = ref('');

const subtitleText = computed(() => {
  if (stage.value === 'pick') return '다섯 개의 쿠키 중 하나를 골라보세요';
  if (stage.value === 'opening') return '잠시 후 메시지가 도착합니다';
  return '오늘의 한 마디가 도착했습니다';
});

const pickCookie = () => {
  stage.value = 'opening';
  // 결과 미리 결정
  fortune.value = pickRandomFortune(fortune.value);
  luckyNumber.value = pickRandomNumber();
  luckyColor.value = pickRandomColor();

  // 1.2초 후 결과 단계
  setTimeout(() => {
    stage.value = 'result';
  }, 1200);
};

const reset = () => {
  stage.value = 'pick';
};
</script>

<style scoped>
.lotto-view {
  padding-top: var(--spacing-xl);
}

.title {
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-xs);
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 1rem;
}

.mb-lg { margin-bottom: var(--spacing-lg); }
.pb-lg { padding-bottom: var(--spacing-2xl); }

.stage-area {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
}

/* Pick Stage */
.cookies-row {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
  padding: var(--spacing-xl) 0;
}

.cookie-btn {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.18), rgba(15, 14, 46, 0.6));
  border: 2px solid rgba(255, 215, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0;
  animation: cookieDrop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards, cookieFloat 3s ease-in-out infinite;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.1);
  user-select: none;
}

.cookie-btn:hover {
  transform: translateY(-8px) scale(1.08);
  border-color: var(--color-accent);
  box-shadow: 0 12px 30px rgba(255, 215, 0, 0.3);
}

.cookie-btn:active {
  transform: translateY(-4px) scale(0.98);
}

.cookie-emoji {
  font-size: 3rem;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.3));
  pointer-events: none;
}

@keyframes cookieDrop {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.7);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes cookieFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* Opening Stage */
.opening-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  min-height: 300px;
  justify-content: center;
}

.opening-cookie-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.opening-cookie {
  font-size: 6rem;
  animation: cookieShake 0.5s ease-in-out infinite, cookieGrow 1.2s ease-out forwards;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
  display: block;
}

@keyframes cookieShake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-8deg); }
  75% { transform: rotate(8deg); }
}

@keyframes cookieGrow {
  0% { transform: scale(1); }
  60% { transform: scale(1.4); }
  100% { transform: scale(1.5); opacity: 0.6; }
}

.sparkle {
  position: absolute;
  font-size: 1.5rem;
  animation: sparkleFloat 1.2s ease-out forwards;
  opacity: 0;
}

.sparkle.s1 { top: 10%; left: 20%; animation-delay: 0.3s; }
.sparkle.s2 { top: 20%; right: 15%; animation-delay: 0.5s; }
.sparkle.s3 { bottom: 25%; left: 15%; animation-delay: 0.7s; }
.sparkle.s4 { bottom: 15%; right: 20%; animation-delay: 0.9s; }

@keyframes sparkleFloat {
  0% { opacity: 0; transform: scale(0.5) translateY(0); }
  50% { opacity: 1; transform: scale(1.2) translateY(-15px); }
  100% { opacity: 0; transform: scale(0.8) translateY(-30px); }
}

.opening-text {
  font-size: 1.1rem;
  color: var(--color-accent);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* Result Stage */
.result-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  width: 100%;
}

.opened-emoji {
  font-size: 3rem;
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.4));
  animation: floatIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes floatIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fortune-paper {
  width: 100%;
  max-width: 460px;
  background: linear-gradient(135deg, rgba(245, 230, 211, 0.95), rgba(220, 200, 170, 0.92));
  color: #2d1b4e;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xl) var(--spacing-lg);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 215, 0, 0.2);
  position: relative;
  text-align: center;
}

.fortune-paper::before,
.fortune-paper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12px;
  background-image: radial-gradient(circle at center, rgba(45, 27, 78, 0.15) 1px, transparent 1.5px);
  background-size: 6px 8px;
  background-repeat: repeat-y;
}

.fortune-paper::before { left: 4px; }
.fortune-paper::after { right: 4px; }

.paper-header {
  margin-bottom: var(--spacing-md);
}

.paper-label {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: rgba(45, 27, 78, 0.6);
  border-bottom: 1px solid rgba(45, 27, 78, 0.2);
  padding-bottom: 0.3rem;
}

.fortune-message {
  font-size: 1.15rem;
  line-height: 1.7;
  font-weight: 500;
  margin-bottom: var(--spacing-lg);
  font-style: italic;
}

.lucky-pair {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  border-top: 1px dashed rgba(45, 27, 78, 0.2);
  padding-top: var(--spacing-md);
}

.lucky-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.lucky-label {
  font-size: 0.75rem;
  color: rgba(45, 27, 78, 0.55);
  letter-spacing: 0.05em;
}

.lucky-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d1b4e;
}

/* Actions */
.actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

.footer-note {
  margin-top: var(--spacing-xl);
  color: var(--color-text-muted);
  font-size: 0.8rem;
  line-height: 1.6;
}

/* Animations */
.fade-in-up {
  opacity: 0;
  animation: scaleUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-1 { animation-delay: 0.2s; }

/* Responsive */
@media (max-width: 480px) {
  .cookie-btn {
    width: 70px;
    height: 70px;
  }
  .cookie-emoji {
    font-size: 2.3rem;
  }
  .opening-cookie {
    font-size: 4.5rem;
  }
  .fortune-message {
    font-size: 1rem;
  }
  .lucky-pair {
    gap: var(--spacing-lg);
  }
}
</style>
