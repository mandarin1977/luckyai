<template>
  <div class="palm-reading-view container pb-lg">
    <div class="header-section text-center mb-lg fade-in-up">
      <h1 class="title">손금 분석</h1>
      <p class="subtitle">우주의 기운이 당신의 손바닥에 모여있습니다</p>
    </div>

    <div class="content-wrapper fade-in-up delay-1">
      <!-- 1단계: 업로더 -->
      <ImageUploader
        v-if="stage === 'upload'"
        @image-ready="handleImageReady"
        @reset="handleImageReset"
      />

      <!-- 2단계: 모드 선택 -->
      <div v-if="stage === 'mode'" class="mode-picker">
        <h2 class="picker-title text-center">어떤 해석을 원하시나요?</h2>
        <p class="picker-subtitle text-center">같은 손금, 두 가지 관점</p>

        <div class="mode-cards">
          <button class="mode-card mode-lucky" @click="startAnalysis('lucky')">
            <div class="mode-icon">🍀</div>
            <h3>LuckyAI 모드</h3>
            <p>어떤 손금이든 무조건<br />길조로 재해석합니다</p>
            <span class="mode-badge">재치 ∙ 긍정</span>
          </button>

          <button class="mode-card mode-honest" @click="startAnalysis('honest')">
            <div class="mode-icon">🔮</div>
            <h3>전통 해석 모드</h3>
            <p>동양 손금학 원리대로<br />가감없이 해석합니다</p>
            <span class="mode-badge">학문 ∙ 객관</span>
          </button>
        </div>

        <div class="picker-footer text-center mt-lg">
          <button class="btn-text" @click="handleImageReset">← 사진 다시 올리기</button>
          <router-link to="/" class="btn-text">🏠 메인으로</router-link>
        </div>
      </div>

      <!-- 3단계: 로딩 -->
      <div v-if="stage === 'loading'" class="loading-area text-center">
        <div class="spinner"></div>
        <p class="loading-text">{{ loadingMessage }}</p>
        <transition name="tip-fade" mode="out-in">
          <p v-if="loadingTip" :key="loadingTip" class="loading-tip">"{{ loadingTip }}"</p>
        </transition>
      </div>

      <!-- 4단계: 결과 -->
      <div v-if="stage === 'result' && result" class="result-card fade-in-up">
        <div class="result-header">
          <div class="result-mode-badge" :class="`badge-${mode}`">
            {{ mode === 'lucky' ? '🍀 LuckyAI 모드' : '🔮 전통 해석 모드' }}
          </div>
          <span v-if="isFallback" class="demo-badge">DEMO</span>
        </div>

        <div class="score-ring">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path class="circle"
              :stroke-dasharray="`${result.score}, 100`"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" class="percentage">{{ result.score }}점</text>
          </svg>
        </div>

        <h2 class="main-fortune text-accent text-center">{{ result.mainFortune }}</h2>

        <div class="analysis-grid">
          <div class="analysis-item">
            <h4>생명선</h4>
            <p>{{ result.analysis.lifeLine }}</p>
          </div>
          <div class="analysis-item">
            <h4>감정선</h4>
            <p>{{ result.analysis.heartLine }}</p>
          </div>
          <div class="analysis-item">
            <h4>지능선</h4>
            <p>{{ result.analysis.headLine }}</p>
          </div>
          <div class="analysis-item">
            <h4>운명선</h4>
            <p>{{ result.analysis.fateLine }}</p>
          </div>
        </div>

        <div class="prediction-box">
          <h3>{{ mode === 'lucky' ? '🌟 향후 1년 예언' : '📖 향후 1년 전망' }}</h3>
          <p>{{ result.prediction }}</p>
        </div>

        <div class="lucky-items">
          <div class="lucky-item">
            <span class="label">{{ mode === 'lucky' ? '행운의 숫자' : '추천 숫자' }}</span>
            <span class="value">{{ result.luckyNumber }}</span>
          </div>
          <div class="lucky-item">
            <span class="label">{{ mode === 'lucky' ? '행운의 색상' : '어울리는 색상' }}</span>
            <span class="value">{{ result.luckyColor }}</span>
          </div>
        </div>

        <div class="action-group mt-lg text-center">
          <button class="btn btn-secondary" @click="tryOtherMode">
            {{ mode === 'lucky' ? '🔮 전통 해석도 보기' : '🍀 LuckyAI 해석도 보기' }}
          </button>
          <button class="btn btn-secondary" @click="reset">다시하기</button>
          <router-link to="/" class="btn btn-secondary">🏠 메인으로</router-link>
        </div>
      </div>
    </div>

    <FallbackNotice :show="showFallbackNotice" @close="showFallbackNotice = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ImageUploader from '../components/ImageUploader.vue';
import FallbackNotice from '../components/FallbackNotice.vue';
import { useGemini } from '../composables/useGemini';
import { useLoadingTip } from '../composables/useLoadingTip';

const { analyzePalm } = useGemini();

const stage = ref('upload'); // 'upload' | 'mode' | 'loading' | 'result'
const imageBase64 = ref(null);
const result = ref(null);
const mode = ref('lucky');
const isFallback = ref(false);
const showFallbackNotice = ref(false);
const loadingMessage = ref('우주의 기운을 모으는 중...');

const { tip: loadingTip } = useLoadingTip(stage);

const loadingMessagesLucky = [
  '우주의 기운을 모으는 중...',
  '별의 정렬을 확인하는 중...',
  '대길의 기운을 해석하는 중...'
];
const loadingMessagesHonest = [
  '손금의 결을 살피는 중...',
  '전통 손금학 원리를 대조하는 중...',
  '관찰 결과를 정리하는 중...'
];

const handleImageReady = (base64) => {
  imageBase64.value = base64;
  stage.value = 'mode';
};

const handleImageReset = () => {
  imageBase64.value = null;
  stage.value = 'upload';
};

const startAnalysis = async (selectedMode) => {
  mode.value = selectedMode;
  stage.value = 'loading';
  const messages = selectedMode === 'honest' ? loadingMessagesHonest : loadingMessagesLucky;
  loadingMessage.value = messages[Math.floor(Math.random() * messages.length)];

  // useGemini가 fallback을 보장하므로 결과가 항상 있음.
  const { data, isFallback: fb } = await analyzePalm(imageBase64.value, selectedMode);
  result.value = data;
  isFallback.value = fb;
  showFallbackNotice.value = fb;
  stage.value = 'result';
};

const tryOtherMode = () => {
  startAnalysis(mode.value === 'lucky' ? 'honest' : 'lucky');
};

const reset = () => {
  imageBase64.value = null;
  result.value = null;
  isFallback.value = false;
  stage.value = 'upload';
};
</script>

<style scoped>
.palm-reading-view {
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

.pb-lg {
  padding-bottom: var(--spacing-2xl);
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

.result-header {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.result-mode-badge {
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

/* Score Ring */
.score-ring {
  width: 120px;
  margin: 0 auto var(--spacing-lg);
}

.circular-chart {
  display: block;
  margin: 0 auto;
  max-width: 80%;
  max-height: 250px;
}

.circle-bg {
  fill: none;
  stroke: rgba(255, 215, 0, 0.1);
  stroke-width: 2.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke: var(--color-accent);
  animation: progress 1.5s ease-out forwards;
}

.percentage {
  fill: var(--color-accent);
  font-family: var(--font-heading-en);
  font-size: 0.5em;
  text-anchor: middle;
  font-weight: bold;
}

.main-fortune {
  font-size: 1.8rem;
  margin-bottom: var(--spacing-xl);
  line-height: 1.4;
}

.analysis-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 600px) {
  .analysis-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.analysis-item {
  background: rgba(255, 255, 255, 0.03);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border-left: 3px solid var(--color-accent);
}

.analysis-item h4 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-xs);
  font-size: 1.1rem;
}

.analysis-item p {
  font-size: 0.95rem;
  color: rgba(245, 230, 211, 0.9);
}

.prediction-box {
  background: linear-gradient(135deg, rgba(45, 27, 78, 0.4), rgba(74, 44, 122, 0.2));
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  border: 1px dashed rgba(255, 215, 0, 0.3);
}

.prediction-box h3 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
}

.prediction-box p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.lucky-items {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
}

.lucky-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.lucky-item .label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.lucky-item .value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-accent);
  background: rgba(255, 215, 0, 0.1);
  padding: 0.2rem 1rem;
  border-radius: 20px;
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

@keyframes progress {
  0% { stroke-dasharray: 0, 100; }
}

.fade-in-up {
  opacity: 0;
  animation: scaleUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-1 { animation-delay: 0.2s; }
</style>
