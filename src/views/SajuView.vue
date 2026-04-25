<template>
  <div class="saju-view container pb-lg">
    <div class="header-section text-center mb-lg fade-in-up">
      <h1 class="title">사주 풀이</h1>
      <p class="subtitle">四柱 — 네 기둥에 담긴 당신의 이야기</p>
    </div>

    <div class="content-wrapper fade-in-up delay-1">
      <!-- 1단계: 생년월일시 입력 -->
      <div v-if="stage === 'input'" class="input-area">
        <div class="form-grid">
          <div class="form-row">
            <label class="form-label">생년월일</label>
            <input
              v-model="birthDate"
              type="date"
              class="form-input"
              :max="todayDate"
              required
            />
          </div>

          <div class="form-row">
            <label class="form-label">달력</label>
            <div class="toggle-group">
              <button
                class="toggle-btn"
                :class="{ active: calendar === '양력' }"
                @click="calendar = '양력'"
              >양력</button>
              <button
                class="toggle-btn"
                :class="{ active: calendar === '음력' }"
                @click="calendar = '음력'"
              >음력</button>
            </div>
          </div>

          <div class="form-row">
            <label class="form-label">성별</label>
            <div class="toggle-group">
              <button
                class="toggle-btn"
                :class="{ active: gender === '남' }"
                @click="gender = '남'"
              >남</button>
              <button
                class="toggle-btn"
                :class="{ active: gender === '여' }"
                @click="gender = '여'"
              >여</button>
            </div>
          </div>

          <div class="form-row">
            <label class="form-label">출생시간</label>
            <select v-model="birthHour" class="form-input">
              <option value="모름">모름 (시주 생략)</option>
              <option
                v-for="h in 24"
                :key="h - 1"
                :value="`${h - 1}시`"
              >{{ `${h - 1}시 (${hourName(h - 1)})` }}</option>
            </select>
          </div>
        </div>

        <div class="action-area text-center mt-lg">
          <button
            class="btn btn-primary btn-large"
            :disabled="!birthDate"
            @click="goToMode"
          >
            ✨ 사주 풀이 받기
          </button>
        </div>
      </div>

      <!-- 2단계: 명식 확인 + 모드 선택 -->
      <div v-if="stage === 'mode' && saju" class="mode-picker">
        <!-- 계산된 명식(命式) 표시 -->
        <div class="myeongsik-card">
          <div class="myeongsik-header">
            <span class="myeongsik-title">명식(命式)</span>
            <span class="myeongsik-element" :class="`elem-${elementKey(saju.mainElement)}`">
              {{ elementIcon(saju.mainElement) }} {{ saju.mainElement }}일간 · {{ saju.dayStem.hanzi }}({{ saju.dayStem.korean }})
            </span>
          </div>
          <div class="pillars-grid">
            <div class="pillar-cell">
              <div class="pillar-label">시주</div>
              <div class="pillar-hanzi">{{ saju.hourPillar ? saju.hourPillar.hanzi : '—' }}</div>
              <div class="pillar-korean">{{ saju.hourPillar ? saju.hourPillar.korean : '시간 미상' }}</div>
            </div>
            <div class="pillar-cell pillar-self">
              <div class="pillar-label">일주</div>
              <div class="pillar-hanzi">{{ saju.dayPillar.hanzi }}</div>
              <div class="pillar-korean">{{ saju.dayPillar.korean }}</div>
              <div class="pillar-sub">← 본인</div>
            </div>
            <div class="pillar-cell">
              <div class="pillar-label">월주</div>
              <div class="pillar-hanzi">{{ saju.monthPillar.hanzi }}</div>
              <div class="pillar-korean">{{ saju.monthPillar.korean }}</div>
            </div>
            <div class="pillar-cell">
              <div class="pillar-label">연주</div>
              <div class="pillar-hanzi">{{ saju.yearPillar.hanzi }}</div>
              <div class="pillar-korean">{{ saju.yearPillar.korean }}</div>
            </div>
          </div>
          <p class="myeongsik-note">만세력 기준으로 계산된 정확한 명식입니다</p>
        </div>

        <h2 class="picker-title text-center">어떤 해석을 원하시나요?</h2>
        <p class="picker-subtitle text-center">같은 명식, 두 가지 관점</p>

        <div class="mode-cards">
          <button class="mode-card mode-lucky" @click="runAnalysis('lucky')">
            <div class="mode-icon">🍀</div>
            <h3>LuckyAI 모드</h3>
            <p>어떤 명식이든 무조건<br />왕업지상(王業之相)으로 풀이</p>
            <span class="mode-badge">재치 ∙ 긍정</span>
          </button>

          <button class="mode-card mode-honest" @click="runAnalysis('honest')">
            <div class="mode-icon">🔯</div>
            <h3>전통 명리 모드</h3>
            <p>명리학 원리대로<br />가감없이 분석합니다</p>
            <span class="mode-badge">학문 ∙ 객관</span>
          </button>
        </div>

        <div class="picker-footer text-center mt-lg">
          <button class="btn-text" @click="stage = 'input'">← 다시 입력</button>
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
      <div v-if="stage === 'result' && result && saju" class="result-card fade-in-up">
        <div class="result-header">
          <div class="result-mode-badge" :class="`badge-${mode}`">
            {{ mode === 'lucky' ? '🍀 LuckyAI 모드' : '🔯 전통 명리 모드' }}
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

        <div class="element-badge" :class="`elem-${elementKey(saju.mainElement)}`">
          {{ elementIcon(saju.mainElement) }} {{ saju.mainElement }}일간 · {{ saju.dayStem.hanzi }}({{ saju.dayStem.korean }})
        </div>

        <h2 class="main-fortune text-accent text-center">{{ result.mainFortune }}</h2>

        <div class="analysis-grid">
          <div class="analysis-item">
            <h4>
              연주
              <span class="pillar-ganzi">{{ saju.yearPillar.hanzi }}({{ saju.yearPillar.korean }})</span>
              <span class="pillar-sub">· 초년/조상</span>
            </h4>
            <p>{{ result.analysis.yearPillar }}</p>
          </div>
          <div class="analysis-item">
            <h4>
              월주
              <span class="pillar-ganzi">{{ saju.monthPillar.hanzi }}({{ saju.monthPillar.korean }})</span>
              <span class="pillar-sub">· 청년/부모</span>
            </h4>
            <p>{{ result.analysis.monthPillar }}</p>
          </div>
          <div class="analysis-item">
            <h4>
              일주
              <span class="pillar-ganzi">{{ saju.dayPillar.hanzi }}({{ saju.dayPillar.korean }})</span>
              <span class="pillar-sub">· 본인/배우자</span>
            </h4>
            <p>{{ result.analysis.dayPillar }}</p>
          </div>
          <div class="analysis-item">
            <h4>
              시주
              <span class="pillar-ganzi">
                {{ saju.hourPillar ? `${saju.hourPillar.hanzi}(${saju.hourPillar.korean})` : '시간 미상' }}
              </span>
              <span class="pillar-sub">· 말년/자녀</span>
            </h4>
            <p>{{ result.analysis.hourPillar }}</p>
          </div>
        </div>

        <div class="prediction-box">
          <h3>{{ mode === 'lucky' ? '🌟 향후 1년 길운' : '📖 향후 1년 흐름' }}</h3>
          <p>{{ result.prediction }}</p>
        </div>

        <div class="lucky-items">
          <div class="lucky-item">
            <span class="label">{{ mode === 'lucky' ? '행운의 숫자' : '어울리는 숫자' }}</span>
            <span class="value">{{ result.luckyNumber }}</span>
          </div>
          <div class="lucky-item">
            <span class="label">{{ mode === 'lucky' ? '행운의 색상' : '보완 색상' }}</span>
            <span class="value">{{ result.luckyColor }}</span>
          </div>
        </div>

        <div class="action-group mt-lg text-center">
          <button class="btn btn-secondary" @click="tryOtherMode">
            {{ mode === 'lucky' ? '🔯 전통 명리도 보기' : '🍀 LuckyAI 해석도 보기' }}
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
import { ref, computed } from 'vue';
import FallbackNotice from '../components/FallbackNotice.vue';
import { useGemini } from '../composables/useGemini';
import { useLoadingTip } from '../composables/useLoadingTip';
import { calculateSaju } from '../utils/saju';

const { analyzeSaju } = useGemini();

const stage = ref('input'); // 'input' | 'mode' | 'loading' | 'result'
const birthDate = ref('');
const birthHour = ref('모름');
const calendar = ref('양력');
const gender = ref('남');

const saju = ref(null);         // 계산된 명식(기둥/오행/일간)
const result = ref(null);       // Gemini 해석 결과
const mode = ref('lucky');
const isFallback = ref(false);
const showFallbackNotice = ref(false);
const loadingMessage = ref('사주 팔자를 뽑는 중...');

const { tip: loadingTip } = useLoadingTip(stage);

const todayDate = computed(() => new Date().toISOString().slice(0, 10));

const hourName = (h) => {
  // 12간지 시 대략 매핑 (2시간 단위)
  const zodiac = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
  const idx = Math.floor(((h + 1) % 24) / 2);
  return `${zodiac[idx]}시`;
};

const loadingMessagesLucky = [
  '사주 팔자를 뽑는 중...',
  '왕업지상을 확인하는 중...',
  '오행의 조화를 읽는 중...'
];
const loadingMessagesHonest = [
  '명식을 구성하는 중...',
  '오행의 균형을 분석하는 중...',
  '전통 명리학 원리를 대조하는 중...'
];

const goToMode = () => {
  if (!birthDate.value) return;
  try {
    saju.value = calculateSaju(birthDate.value, birthHour.value, calendar.value);
    stage.value = 'mode';
  } catch (error) {
    console.error('사주 계산 실패:', error);
    alert('날짜를 확인해주세요.');
  }
};

const runAnalysis = async (selectedMode) => {
  if (!saju.value) return;
  mode.value = selectedMode;
  stage.value = 'loading';
  const messages = selectedMode === 'honest' ? loadingMessagesHonest : loadingMessagesLucky;
  loadingMessage.value = messages[Math.floor(Math.random() * messages.length)];

  const { data, isFallback: fb } = await analyzeSaju(saju.value, gender.value, selectedMode);
  result.value = data;
  isFallback.value = fb;
  showFallbackNotice.value = fb;
  stage.value = 'result';
};

const tryOtherMode = () => {
  runAnalysis(mode.value === 'lucky' ? 'honest' : 'lucky');
};

const reset = () => {
  saju.value = null;
  result.value = null;
  isFallback.value = false;
  stage.value = 'input';
};

const elementKey = (el) => {
  if (!el) return '';
  if (el.includes('목')) return 'wood';
  if (el.includes('화')) return 'fire';
  if (el.includes('토')) return 'earth';
  if (el.includes('금')) return 'metal';
  if (el.includes('수')) return 'water';
  return '';
};

const elementIcon = (el) => {
  const key = elementKey(el);
  return {
    wood: '🌳', fire: '🔥', earth: '⛰️', metal: '⚔️', water: '🌊'
  }[key] || '✨';
};
</script>

<style scoped>
.saju-view {
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

.mt-lg { margin-top: var(--spacing-lg); }
.mb-lg { margin-bottom: var(--spacing-lg); }
.pb-lg { padding-bottom: var(--spacing-2xl); }

.btn-large {
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
}

/* Input */
.input-area {
  background: rgba(255, 255, 255, 0.03);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.form-input {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  transition: var(--transition-fast);
  color-scheme: dark;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
}

.toggle-group {
  display: flex;
  gap: var(--spacing-sm);
}

.toggle-btn {
  flex: 1;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: var(--color-text-muted);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition-fast);
  font-family: inherit;
}

.toggle-btn.active {
  background: rgba(255, 215, 0, 0.15);
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.toggle-btn:hover:not(.active) {
  border-color: rgba(255, 215, 0, 0.5);
}

/* 명식(命式) Card */
.myeongsik-card {
  background: linear-gradient(135deg, rgba(45, 27, 78, 0.5), rgba(15, 14, 46, 0.7));
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.myeongsik-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.myeongsik-title {
  font-family: var(--font-heading-ko);
  font-size: 1.1rem;
  color: var(--color-accent);
  letter-spacing: 0.05em;
}

.myeongsik-element {
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.pillar-cell {
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md) var(--spacing-sm);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.pillar-cell.pillar-self {
  border-color: var(--color-accent);
  background: rgba(255, 215, 0, 0.08);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.15);
}

.pillar-cell .pillar-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}

.pillar-cell .pillar-hanzi {
  font-family: var(--font-heading-ko);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1.1;
}

.pillar-cell .pillar-korean {
  font-size: 0.8rem;
  color: rgba(245, 230, 211, 0.7);
  margin-top: 2px;
}

.pillar-cell .pillar-sub {
  font-size: 0.7rem;
  color: var(--color-accent);
  margin-top: var(--spacing-xs);
  font-weight: 600;
}

.myeongsik-note {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  margin: 0;
}

@media (max-width: 480px) {
  .pillars-grid {
    gap: 4px;
  }
  .pillar-cell {
    padding: var(--spacing-sm) 4px;
  }
  .pillar-cell .pillar-hanzi {
    font-size: 1.2rem;
  }
  .pillar-cell .pillar-korean {
    font-size: 0.7rem;
  }
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

/* Loading */
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

/* Result */
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

.score-ring {
  width: 120px;
  margin: 0 auto var(--spacing-md);
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

/* Element Badge */
.element-badge {
  display: inline-block;
  margin: 0 auto var(--spacing-lg);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
  width: fit-content;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.elem-wood { background: rgba(100, 200, 120, 0.15); color: #8fdca0; border: 1px solid rgba(100, 200, 120, 0.3); }
.elem-fire { background: rgba(255, 120, 90, 0.15); color: #ff9f82; border: 1px solid rgba(255, 120, 90, 0.3); }
.elem-earth { background: rgba(210, 180, 130, 0.15); color: #e0c998; border: 1px solid rgba(210, 180, 130, 0.3); }
.elem-metal { background: rgba(200, 200, 220, 0.15); color: #d8d8e5; border: 1px solid rgba(200, 200, 220, 0.3); }
.elem-water { background: rgba(100, 160, 255, 0.15); color: #9fb8ff; border: 1px solid rgba(100, 160, 255, 0.3); }

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
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.pillar-sub {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

.pillar-ganzi {
  font-size: 0.85rem;
  color: rgba(255, 215, 0, 0.75);
  font-weight: 500;
  font-family: var(--font-heading-ko);
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
