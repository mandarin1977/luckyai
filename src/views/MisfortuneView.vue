<template>
  <div class="misfortune-view container pb-lg">
    <div class="header-section text-center mb-lg fade-in-up">
      <h1 class="title">불운 변환기</h1>
      <p class="subtitle">우주의 섭리 앞에서는 모든 것이 길조입니다</p>
    </div>

    <div class="content-wrapper fade-in-up delay-1">
      <!-- 입력 영역 -->
      <div v-if="!result && !isLoading" class="input-area">
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
            @click="translateMisfortune"
          >
            ✨ 길조로 바꾸기
          </button>
        </div>
      </div>

      <!-- 로딩 영역 -->
      <div v-if="isLoading" class="loading-area text-center">
        <div class="spinner"></div>
        <p class="loading-text">{{ loadingMessage }}</p>
      </div>

      <!-- 결과 카드 -->
      <div v-if="result" class="result-card fade-in-up">
        <div class="card-header text-center mb-lg">
          <span class="badge">해석 완료</span>
          <h2 class="reframed-title text-accent">{{ result.reframedTitle }}</h2>
        </div>
        
        <div class="cosmic-reason mb-lg">
          <h3>🌌 우주적 관점</h3>
          <p>{{ result.cosmicReason }}</p>
        </div>

        <div class="stats-box mb-lg text-center">
          <div class="stat-item">
            <span class="stat-label">긍정 나비효과 발동 확률</span>
            <span class="stat-value text-accent">{{ result.probability }}</span>
          </div>
        </div>

        <div class="future-benefit mb-lg">
          <h3>🎁 다가올 미래의 복</h3>
          <p>{{ result.futureBenefit }}</p>
        </div>

        <div class="wisdom-quote">
          <blockquote>"{{ result.wisdom }}"</blockquote>
        </div>

        <div class="action-group mt-lg text-center">
          <button class="btn btn-secondary" @click="reset">다른 일도 물어보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGemini } from '../composables/useGemini';

const { translateMisfortune: callGeminiTranslate } = useGemini();

const misfortuneText = ref('');
const isLoading = ref(false);
const result = ref(null);
const loadingMessage = ref('우주의 기운을 모으는 중...');

const loadingMessages = [
  "부정적 에너지를 정화하는 중...",
  "우주의 큰 그림을 해석하는 중...",
  "행운의 주파수를 맞추는 중...",
  "별의 정렬을 확인하는 중..."
];

const translateMisfortune = async () => {
  if (!misfortuneText.value.trim()) return;
  
  isLoading.value = true;
  loadingMessage.value = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  
  try {
    result.value = await callGeminiTranslate(misfortuneText.value);
  } catch (error) {
    alert('우주와의 통신이 원활하지 않습니다. 다시 시도해주세요.');
  } finally {
    isLoading.value = false;
  }
};

const reset = () => {
  misfortuneText.value = '';
  result.value = null;
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

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
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

.cosmic-reason h3, .future-benefit h3 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
  font-size: 1.2rem;
}

.cosmic-reason p, .future-benefit p {
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
