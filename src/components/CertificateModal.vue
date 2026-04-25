<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="show" class="cert-overlay" @click="close">
        <div class="cert-wrapper" @click.stop>
          <!-- 인증서 본체 (이미지로 캡처될 영역) -->
          <div ref="certEl" class="certificate" :class="`cert-${type}`">
            <div class="cert-corner top-left">★</div>
            <div class="cert-corner top-right">★</div>
            <div class="cert-corner bottom-left">★</div>
            <div class="cert-corner bottom-right">★</div>

            <div class="cert-header">
              <p class="cert-eyebrow">CERTIFICATE OF FORTUNE</p>
              <h2 class="cert-title">{{ titleByType }} 길조 인증서</h2>
              <p class="cert-no">제 LKY-{{ certNumber }} 호</p>
            </div>

            <div class="cert-body">
              <p class="cert-statement">
                위 사람이 <strong>LuckyAI</strong>로부터 다음과 같은
                <em>{{ modeLabel }}</em>을 받았음을<br />
                엄숙히 증명합니다.
              </p>

              <div v-if="hasScore" class="cert-score">
                <span class="score-label">길조 지수</span>
                <span class="score-value">{{ result.score }}<span class="score-unit">점</span></span>
              </div>

              <blockquote class="cert-fortune">
                "{{ mainText }}"
              </blockquote>

              <div v-if="hasLucky" class="cert-lucky">
                <span>🍀 행운의 숫자 <strong>{{ result.luckyNumber }}</strong></span>
                <span class="dot">·</span>
                <span>🎨 행운의 색상 <strong>{{ result.luckyColor }}</strong></span>
              </div>
            </div>

            <div class="cert-footer">
              <div class="cert-date">{{ todayDate }}</div>
              <div class="cert-issuer">
                <p class="issuer-name">LuckyAI 연구소</p>
                <p class="issuer-sub">(존재하지 않음)</p>
                <div class="cert-seal">
                  <div class="seal-inner">
                    <span class="seal-text">✿ LUCKY ✿<br />AI 印</span>
                  </div>
                </div>
              </div>
            </div>

            <p class="cert-disclaimer">
              ※ 본 인증서의 객관적 효력은 0%이며, 그 사실이 본 인증의 자랑입니다.
            </p>
          </div>

          <!-- 액션 버튼 -->
          <div class="cert-actions">
            <button class="btn btn-primary" :disabled="downloading" @click="download">
              {{ downloading ? '저장 중...' : '📥 이미지로 저장' }}
            </button>
            <button class="btn btn-secondary" @click="close">닫기</button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';
import { toPng } from 'html-to-image';

const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    required: true,
    validator: (v) => ['palm', 'saju', 'misfortune'].includes(v)
  },
  result: { type: Object, default: null },
  mode: { type: String, default: 'lucky' }
});

const emit = defineEmits(['close']);

const certEl = ref(null);
const downloading = ref(false);

// 임의 인증서 번호 (한 번만 생성)
const certNumber = ref(String(Math.floor(Math.random() * 9000) + 1000));

const titleByType = computed(() => ({
  palm: '손금', saju: '사주', misfortune: '불운 변환'
}[props.type] || ''));

const modeLabel = computed(() => {
  if (props.type === 'misfortune') {
    return props.mode === 'lucky' ? '우주적 길조 재해석' : '균형잡힌 객관 분석';
  }
  return props.mode === 'lucky' ? 'LuckyAI 길조 해석' : '전통 객관 해석';
});

const hasScore = computed(() => props.type !== 'misfortune' && props.result?.score != null);
const hasLucky = computed(() => props.type !== 'misfortune' && props.result?.luckyNumber != null);

const mainText = computed(() => {
  if (!props.result) return '';
  if (props.type === 'misfortune') return props.result.reframedTitle;
  return props.result.mainFortune;
});

const todayDate = computed(() => {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 발급`;
});

const close = () => emit('close');

const download = async () => {
  if (!certEl.value) return;
  downloading.value = true;
  try {
    const dataUrl = await toPng(certEl.value, {
      pixelRatio: 2,
      backgroundColor: '#f3e9d2'
    });
    const link = document.createElement('a');
    link.download = `LuckyAI-${props.type}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('인증서 저장 실패:', error);
    alert('이미지 저장에 실패했습니다. 스크린샷으로 저장해주세요.');
  } finally {
    downloading.value = false;
  }
};
</script>

<style scoped>
.cert-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  overflow-y: auto;
}

.cert-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
  max-width: 560px;
  margin: auto 0;
}

/* 인증서 본체 */
.certificate {
  background: linear-gradient(135deg, #f9f1da 0%, #ede1c1 100%);
  color: #2d1b4e;
  border-radius: 8px;
  padding: 36px 32px 28px;
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.5), 0 0 0 6px #d4af37, 0 0 0 7px #b8941f;
  position: relative;
  text-align: center;
  font-family: 'Pretendard Variable', 'Pretendard', serif;
}

.cert-corner {
  position: absolute;
  font-size: 1.2rem;
  color: #b8941f;
  opacity: 0.6;
}
.cert-corner.top-left { top: 12px; left: 16px; }
.cert-corner.top-right { top: 12px; right: 16px; }
.cert-corner.bottom-left { bottom: 12px; left: 16px; }
.cert-corner.bottom-right { bottom: 12px; right: 16px; }

.cert-header {
  border-bottom: 1.5px double rgba(45, 27, 78, 0.3);
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.cert-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  color: rgba(45, 27, 78, 0.55);
  margin-bottom: 6px;
}

.cert-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2d1b4e;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
}

.cert-no {
  font-size: 0.7rem;
  color: rgba(45, 27, 78, 0.5);
  font-family: monospace;
}

.cert-body {
  margin-bottom: var(--spacing-xl);
}

.cert-statement {
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(45, 27, 78, 0.75);
  margin-bottom: var(--spacing-md);
}

.cert-statement strong {
  color: #2d1b4e;
  font-weight: 700;
}

.cert-statement em {
  font-style: normal;
  color: #b8941f;
  font-weight: 700;
}

.cert-score {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: var(--spacing-md) 0;
  padding: 8px 32px;
  border: 2px solid #b8941f;
  border-radius: 8px;
  background: rgba(255, 215, 0, 0.08);
}

.score-label {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgba(45, 27, 78, 0.6);
}

.score-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: #b8941f;
  line-height: 1;
}

.score-unit {
  font-size: 1rem;
  margin-left: 2px;
}

.cert-fortune {
  font-size: 1rem;
  line-height: 1.7;
  font-style: italic;
  color: #2d1b4e;
  border-left: 3px solid #b8941f;
  border-right: 3px solid #b8941f;
  padding: var(--spacing-sm) var(--spacing-md);
  margin: var(--spacing-md) auto;
  max-width: 90%;
  font-weight: 500;
}

.cert-lucky {
  font-size: 0.85rem;
  color: rgba(45, 27, 78, 0.75);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.cert-lucky strong {
  color: #b8941f;
  font-weight: 700;
}

.dot { color: rgba(45, 27, 78, 0.3); }

.cert-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px dashed rgba(45, 27, 78, 0.2);
}

.cert-date {
  font-size: 0.85rem;
  color: rgba(45, 27, 78, 0.7);
  font-family: monospace;
  text-align: left;
}

.cert-issuer {
  text-align: right;
  position: relative;
}

.issuer-name {
  font-size: 1rem;
  font-weight: 700;
  color: #2d1b4e;
}

.issuer-sub {
  font-size: 0.7rem;
  color: rgba(45, 27, 78, 0.5);
  font-style: italic;
}

.cert-seal {
  position: absolute;
  top: -10px;
  right: 50%;
  transform: translateX(50%) rotate(-12deg);
  width: 64px;
  height: 64px;
  border: 2.5px solid #c0392b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(192, 57, 43, 0.05);
  opacity: 0.85;
}

.seal-inner {
  text-align: center;
  color: #c0392b;
}

.seal-text {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.3;
}

.cert-disclaimer {
  font-size: 0.65rem;
  color: rgba(45, 27, 78, 0.45);
  margin-top: var(--spacing-md);
  font-style: italic;
}

/* Actions */
.cert-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .certificate {
    padding: 28px 20px 22px;
  }
  .cert-title {
    font-size: 1.2rem;
  }
  .cert-fortune {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
  .cert-footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .cert-issuer {
    text-align: center;
  }
  .cert-seal {
    position: static;
    transform: rotate(-12deg);
    margin-top: 8px;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
