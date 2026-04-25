<template>
  <div class="palm-reading-view container pb-lg">
    <div class="header-section text-center mb-lg fade-in-up">
      <h1 class="title">손금 분석</h1>
      <p class="subtitle">우주의 기운이 당신의 손바닥에 모여있습니다</p>
    </div>

    <div class="content-wrapper fade-in-up delay-1">
      <!-- 업로더 영역 -->
      <ImageUploader
        v-if="!result && !isLoading"
        @image-ready="handleImageReady"
        @reset="handleImageReset"
      />

      <!-- 분석 버튼 영역 -->
      <div v-if="imageBase64 && !result && !isLoading" class="action-area text-center mt-lg">
        <button class="btn btn-primary btn-large" @click="startAnalysis">
          ✨ 내 운명 확인하기
        </button>
      </div>

      <!-- 로딩 영역 -->
      <div v-if="isLoading" class="loading-area text-center">
        <div class="spinner"></div>
        <p class="loading-text">{{ loadingMessage }}</p>
      </div>

      <!-- 결과 카드 -->
      <div v-if="result" class="result-card fade-in-up">
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
          <h3>🌟 향후 1년 예언</h3>
          <p>{{ result.prediction }}</p>
        </div>

        <div class="lucky-items">
          <div class="lucky-item">
            <span class="label">행운의 숫자</span>
            <span class="value">{{ result.luckyNumber }}</span>
          </div>
          <div class="lucky-item">
            <span class="label">행운의 색상</span>
            <span class="value">{{ result.luckyColor }}</span>
          </div>
        </div>

        <div class="action-group mt-lg text-center">
          <button class="btn btn-secondary" @click="reset">다시하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ImageUploader from '../components/ImageUploader.vue';
import { useGemini } from '../composables/useGemini';

const { analyzePalm } = useGemini();

// 임시 상태
const imageBase64 = ref(null);
const isLoading = ref(false);
const result = ref(null);
const loadingMessage = ref('우주의 기운을 모으는 중...');

const handleImageReady = (base64) => {
  imageBase64.value = base64;
};

const handleImageReset = () => {
  imageBase64.value = null;
};

const startAnalysis = async () => {
  isLoading.value = true;
  loadingMessage.value = '별의 정렬을 확인하는 중...';
  
  try {
    result.value = await analyzePalm(imageBase64.value);
  } catch (error) {
    alert('운명의 기운이 잠시 흩어졌습니다. 다시 시도해주세요.');
  } finally {
    isLoading.value = false;
  }
};

const reset = () => {
  imageBase64.value = null;
  result.value = null;
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

.btn-large {
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
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
