<template>
  <div class="clicker-view container pb-lg">
    <div class="header-section text-center mb-lg fade-in-up">
      <h1 class="title">운세 클리커</h1>
      <p class="subtitle">API가 잠든 사이, 캐릭터가 길조를 떨어뜨립니다</p>
    </div>

    <div class="clicker-stage fade-in-up delay-1">
      <!-- 클릭 가능한 캐릭터 -->
      <button
        class="character"
        :class="{ pop: isPopping }"
        @click="handleClick"
        aria-label="캐릭터 클릭"
      >
        <span class="character-emoji">{{ character }}</span>
        <span v-for="msg in floatingMessages" :key="msg.id" class="floating-msg" :style="msg.style">
          +1
        </span>
      </button>

      <!-- 떠다니는 길조 메시지 -->
      <transition name="msg-pop" mode="out-in">
        <div v-if="currentMessage" :key="messageKey" class="message-card">
          <span class="quote-mark">"</span>
          {{ currentMessage }}
          <span class="quote-mark">"</span>
        </div>
      </transition>

      <!-- 누적 클릭 -->
      <div class="stats">
        <div class="stat">
          <span class="stat-label">클릭</span>
          <span class="stat-value">{{ clickCount }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">누적 길조</span>
          <span class="stat-value">{{ goodFortuneAccumulated }}점</span>
        </div>
      </div>

      <!-- 마일스톤 -->
      <div v-if="milestone" class="milestone-banner">
        🎉 {{ milestone }}
      </div>

      <!-- 액션 -->
      <div class="action-row">
        <router-link to="/" class="btn btn-secondary">🏠 메인으로</router-link>
        <button class="btn btn-secondary" @click="reset">처음부터 다시</button>
      </div>
    </div>

    <p class="footer-note text-center">
      ※ 본 게임의 메시지는 통계적·과학적 근거가 없으며, <br />
      그저 당신의 기분이 좋아지길 바라는 마음의 산물입니다 🍀
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CLICKER_CHARACTERS, pickRandomCharacter, pickRandomMessage } from '../utils/clickerMessages';

const character = ref(CLICKER_CHARACTERS[0]);
const clickCount = ref(0);
const currentMessage = ref('');
const messageKey = ref(0);
const isPopping = ref(false);
const floatingMessages = ref([]); // "+1" floating animations
let nextFloatId = 0;

// 누적 점수 = 클릭당 0.7~1.5점 랜덤
const goodFortuneAccumulated = computed(() =>
  (clickCount.value * 1.1).toFixed(1)
);

const milestone = computed(() => {
  const c = clickCount.value;
  if (c === 10) return '클릭 10회 달성! 우주가 알아채는 중';
  if (c === 30) return '클릭 30회 달성! 길조의 그릇이 커지고 있습니다';
  if (c === 50) return '클릭 50회 달성! 진짜로 행운이 따라올지도?';
  if (c === 100) return '클릭 100회! 당신은 클리커의 전설입니다';
  if (c === 200) return '클릭 200회... 이제 그만 좀 누르세요 (좋은 의미로)';
  return null;
});

const handleClick = (event) => {
  clickCount.value++;

  // 메시지 갱신
  currentMessage.value = pickRandomMessage(currentMessage.value);
  messageKey.value++;

  // 캐릭터 팝 애니메이션
  isPopping.value = false;
  requestAnimationFrame(() => { isPopping.value = true; });

  // 5클릭마다 캐릭터 변경
  if (clickCount.value % 5 === 0) {
    character.value = pickRandomCharacter(character.value);
  }

  // "+1" floating animation
  const id = nextFloatId++;
  const offsetX = (Math.random() - 0.5) * 60;
  floatingMessages.value.push({
    id,
    style: {
      left: `calc(50% + ${offsetX}px)`
    }
  });
  setTimeout(() => {
    floatingMessages.value = floatingMessages.value.filter(m => m.id !== id);
  }, 900);
};

const reset = () => {
  clickCount.value = 0;
  currentMessage.value = '';
  character.value = CLICKER_CHARACTERS[0];
};
</script>

<style scoped>
.clicker-view {
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

.clicker-stage {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
}

/* Character Button */
.character {
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.18), rgba(15, 14, 46, 0.6));
  border: 2px solid rgba(255, 215, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s ease;
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.15);
  user-select: none;
}

.character:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(255, 215, 0, 0.25);
}

.character:active {
  transform: translateY(2px) scale(0.97);
}

.character.pop .character-emoji {
  animation: characterPop 0.18s ease-out;
}

.character-emoji {
  font-size: 7rem;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.3));
  display: block;
}

@keyframes characterPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.18); }
  100% { transform: scale(1); }
}

/* "+1" floating numbers */
.floating-msg {
  position: absolute;
  top: 30%;
  transform: translateX(-50%);
  font-weight: 700;
  color: var(--color-accent);
  font-size: 1.5rem;
  pointer-events: none;
  animation: floatUp 0.9s ease-out forwards;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

@keyframes floatUp {
  0% { opacity: 1; transform: translate(-50%, 0) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -80px) scale(1.4); }
}

/* Message Card */
.message-card {
  background: rgba(15, 14, 46, 0.7);
  border: 1px dashed rgba(255, 215, 0, 0.4);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg) var(--spacing-xl);
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.5;
  color: var(--color-text);
  max-width: 100%;
  position: relative;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quote-mark {
  color: rgba(255, 215, 0, 0.4);
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0.3em;
}

.msg-pop-enter-active,
.msg-pop-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.msg-pop-enter-from { opacity: 0; transform: translateY(8px); }
.msg-pop-leave-to { opacity: 0; transform: translateY(-8px); }

/* Stats */
.stats {
  display: flex;
  gap: var(--spacing-2xl);
  background: rgba(15, 14, 46, 0.5);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(255, 215, 0, 0.15);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-accent);
}

/* Milestone */
.milestone-banner {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.18), rgba(212, 175, 55, 0.1));
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  animation: milestonePop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes milestonePop {
  0% { transform: scale(0.9); opacity: 0; }
  60% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

/* Actions */
.action-row {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

/* Footer note */
.footer-note {
  margin-top: var(--spacing-2xl);
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
  .character {
    width: 180px;
    height: 180px;
  }
  .character-emoji {
    font-size: 5.5rem;
  }
  .stats {
    gap: var(--spacing-lg);
    padding: var(--spacing-sm) var(--spacing-md);
  }
  .stat-value {
    font-size: 1.2rem;
  }
}
</style>
