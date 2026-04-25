<template>
  <div class="misfortune-view container pb-lg">
    <div class="header-section text-center mb-lg fade-in-up">
      <h1 class="title">불운 변환기</h1>
      <p class="subtitle">우주의 섭리 앞에서는 모든 것이 길조입니다</p>
    </div>

    <div class="content-wrapper fade-in-up delay-1">
      <!-- 1단계: 입력 -->
      <div v-if="stage === 'input'" class="input-area">
        <textarea
          v-model="misfortuneText"
          class="misfortune-input"
          placeholder="오늘 있었던 안 좋은 일을 적어주세요... (예: 오늘 길 가다가 넘어졌어요)"
          rows="5"
        ></textarea>

        <div class="action-area text-center mt-lg">
          <button
            class="btn btn-primary btn-large"
            :disabled="!misfortuneText.trim()"
            @click="goToMode"
          >
            ✨ 해석 받기
          </button>
        </div>
      </div>

      <!-- 2단계: 모드 선택 -->
      <div v-if="stage === 'mode'" class="mode-picker">
        <h2 class="picker-title text-center">어떤 해석을 원하시나요?</h2>
        <p class="picker-subtitle text-center">같은 사건, 두 가지 관점</p>

        <div class="mode-cards">
          <button class="mode-card mode-lucky" @click="runTranslate('lucky')">
            <div class="mode-icon">🍀</div>
            <h3>LuckyAI 모드</h3>
            <p>우주적 관점에서 무조건<br />좋은 일로 재해석합니다</p>
            <span class="mode-badge">재치 ∙ 긍정</span>
          </button>

          <button class="mode-card mode-honest" @click="runTranslate('honest')">
            <div class="mode-icon">🧐</div>
            <h3>객관 해석 모드</h3>
            <p>균형잡힌 시각에서<br />실질적 통찰을 제시합니다</p>
            <span class="mode-badge">분석 ∙ 객관</span>
          </button>
        </div>

        <div class="text-center mt-lg">
          <button class="btn-text" @click="stage = 'input'">← 다시 작성</button>
        </div>
      </div>

      <!-- 3단계: 로딩 -->
      <div v-if="stage === 'loading'" class="loading-area text-center">
        <div class="spinner"></div>
        <p class="loading-text">{{ loadingMessage }}</p>
      </div>

      <!-- 4단계: 결과 -->
      <div v-if="stage === 'result' && result" class="result-card fade-in-up">
        <div class="result-mode-badge" :class="`badge-${mode}`">
          {{ mode === 'lucky' ? '🍀 LuckyAI 모드' : '🧐 객관 해석 모드' }}
        </div>

        <div class="card-header text-center mb-lg">
          <span class="badge">해석 완료</span>
          <h2 class="reframed-title" :class="mode === 'lucky' ? 'text-accent' : 'text-honest'">
            {{ result.reframedTitle }}
          </h2>
        </div>

        <div class="section mb-lg">
          <h3>{{ mode === 'lucky' ? '🌌 우주적 관점' : '📋 상황 분석' }}</h3>
          <p>{{ result.cosmicReason }}</p>
        </div>

        <div class="stats-box mb-lg text-center">
          <div class="stat-item">
            <span class="stat-label">{{ mode === 'lucky' ? '긍정 나비효과 발동 확률' : '객관적 추정' }}</span>
            <span class="stat-value" :class="mode === 'lucky' ? 'text-accent' : 'text-honest'">
              {{ result.probability }}
            </span>
          </div>
        </div>

        <div class="section mb-lg">
          <h3>{{ mode === 'lucky' ? '🎁 다가올 미래의 복' : '💡 배울 수 있는 점' }}</h3>
          <p>{{ result.futureBenefit }}</p>
        </div>

        <div class="wisdom-quote">
          <blockquote>"{{ result.wisdom }}"</blockquote>
        </div>

        <div class="action-group mt-lg text-center">
          <button class="btn btn-secondary" @click="tryOtherMode">
            {{ mode === 'lucky' ? '🧐 객관 해석도 보기' : '🍀 LuckyAI 해석도 보기' }}
          </button>
          <button class="btn btn-secondary" @click="reset">다른 일도 물어보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGemini } from '../composables/useGemini';

const { translateMisfortune } = useGemini();

const stage = ref('input'); // 'input' | 'mode' | 'loading' | 'result'
const misfortuneText = ref('');
const result = ref(null);
const mode = ref('lucky');
const loadingMessage = ref('우주의 기운을 모으는 중...');

const loadingMessagesLucky = [
  '부정적 에너지를 정화하는 중...',
  '우주의 큰 그림을 해석하는 중...',
  '행운의 주파수를 맞추는 중...',
  '별의 정렬을 확인하는 중...'
];
const loadingMessagesHonest = [
  '상황을 객관적으로 정리하는 중...',
  '균형잡힌 관점을 분석하는 중...',
  '실질적 통찰을 정리하는 중...'
];

const goToMode = () => {
  if (!misfortuneText.value.trim()) return;
  stage.value = 'mode';
};

const runTranslate = async (selectedMode) => {
  mode.value = selectedMode;
  stage.value = 'loading';
  const messages = selectedMode === 'honest' ? loadingMessagesHonest : loadingMessagesLucky;
  loadingMessage.value = messages[Math.floor(Math.random() * messages.length)];

  try {
    result.value = await translateMisfortune(misfortuneText.value, selectedMode);
    stage.value = 'result';
  } catch (error) {
    alert('우주와의 통신이 원활하지 않습니다. 다시 시도해주세요.');
    stage.value = 'mode';
  }
};

const tryOtherMode = () => {
  runTranslate(mode.value === 'lucky' ? 'honest' : 'lucky');
};

const reset = () => {
  misfortuneText.value = '';
  result.value = null;
  stage.value = 'input';
};
</script>

<style scoped>
.misfortune-view {
  padding-top: var(--spacing-xl);
}

.title {
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-xs);
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.mt-lg {
  margin-top: var(--spacing-lg);
}

.mb-lg {
  margin-bottom: var(--spacing-lg);
}

.pb-lg {
  padding-bottom: var(--spacing-2xl);
}

.btn-large {
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
}

.text-honest {
  color: #9fb8ff;
}

/* Input Area */
.input-area {
  background: rgba(255, 255, 255, 0.03);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.misfortune-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  color: var(--color-text);
  font-size: 1.1rem;
  font-family: inherit;
  resize: vertical;
  transition: var(--transition-fast);
}

.misfortune-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
}

.misfortune-input::placeholder {
  color: rgba(245, 230, 211, 0.4);
}

/* Mode Picker */
.mode-picker {
  padding: var(--spacing-lg) 0;
}

.picker-title {
  font-size: 1.6rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-xs);
}

.picker-subtitle {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xl);
  font-size: 1rem;
}

.mode-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 600px) {
  .mode-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.mode-card {
  background: rgba(15, 14, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 215, 0, 0.15);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  cursor: pointer;
  transition: var(--transition-normal);
  color: var(--color-text);
  font-family: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.mode-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.2);
}

.mode-card.mode-honest:hover {
  border-color: #9fb8ff;
  box-shadow: 0 8px 30px rgba(159, 184, 255, 0.25);
}

.mode-icon {
  font-size: 3rem;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
}

.mode-card h3 {
  font-size: 1.3rem;
  color: var(--color-accent);
  margin: 0;
}

.mode-card.mode-honest h3 {
  color: #9fb8ff;
}

.mode-card p {
  font-size: 0.95rem;
  color: rgba(245, 230, 211, 0.85);
  line-height: 1.5;
}

.mode-badge {
  display: inline-block;
  margin-top: var(--spacing-xs);
  background: rgba(255, 215, 0, 0.1);
  color: var(--color-accent);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.mode-card.mode-honest .mode-badge {
  background: rgba(159, 184, 255, 0.12);
  color: #9fb8ff;
}

.btn-text {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  cursor: pointer;
  padding: var(--spacing-sm);
  transition: var(--transition-fast);
  font-family: inherit;
}

.btn-text:hover {
  color: var(--color-accent);
}

/* Loading Area */
.loading-area {
  padding: var(--spacing-2xl) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 215, 0, 0.2);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 1.2rem;
  color: var(--color-accent);
  animation: pulse 1.5s ease-in-out infinite;
}

/* Result Card */
.result-card {
  background: rgba(15, 14, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-2xl);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  position: relative;
}

.result-mode-badge {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.result-mode-badge.badge-lucky {
  background: rgba(255, 215, 0, 0.15);
  color: var(--color-accent);
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.result-mode-badge.badge-honest {
  background: rgba(159, 184, 255, 0.12);
  color: #9fb8ff;
  border: 1px solid rgba(159, 184, 255, 0.3);
}

.badge {
  display: inline-block;
  background: rgba(255, 215, 0, 0.15);
  color: var(--color-accent);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.reframed-title {
  font-size: 1.8rem;
  line-height: 1.4;
}

.section h3 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
  font-size: 1.2rem;
}

.section p {
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(245, 230, 211, 0.9);
}

.stats-box {
  background: linear-gradient(135deg, rgba(45, 27, 78, 0.4), rgba(74, 44, 122, 0.2));
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 1px dashed rgba(255, 215, 0, 0.3);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

.wisdom-quote {
  text-align: center;
  font-style: italic;
  color: var(--color-text-muted);
  font-size: 1.1rem;
  padding: var(--spacing-lg);
  position: relative;
}

.wisdom-quote::before, .wisdom-quote::after {
  content: '"';
  font-size: 3rem;
  color: rgba(255, 215, 0, 0.1);
  position: absolute;
  font-family: var(--font-heading-en);
}

.wisdom-quote::before {
  top: -10px;
  left: 20px;
}

.wisdom-quote::after {
  bottom: -30px;
  right: 20px;
}

.action-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  justify-content: center;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.fade-in-up {
  opacity: 0;
  animation: scaleUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-1 { animation-delay: 0.2s; }
</style>
