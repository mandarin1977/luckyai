<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="show" class="cert-overlay" @click="close">
        <div class="cert-wrapper" @click.stop>
          <div ref="certEl" class="certificate" :class="`cert-${type}`">
            <div class="cert-corner top-left">★</div>
            <div class="cert-corner top-right">★</div>
            <div class="cert-corner bottom-left">★</div>
            <div class="cert-corner bottom-right">★</div>

            <div class="cert-header">
              <p class="cert-eyebrow">CERTIFICATE OF FORTUNE</p>
              <h2 class="cert-title">{{ certTitle }}</h2>
              <p class="cert-no">{{ t.certNo }} LKY-{{ certNumber }}</p>
            </div>

            <div class="cert-body">
              <p class="cert-statement" v-html="statementHtml"></p>

              <div v-if="hasScore" class="cert-score">
                <span class="score-label">{{ t.scoreLabel }}</span>
                <span class="score-value">{{ result.score }}<span class="score-unit">{{ t.scoreUnit }}</span></span>
              </div>

              <blockquote class="cert-fortune">
                "{{ mainText }}"
              </blockquote>

              <div v-if="hasLucky" class="cert-lucky">
                <span>🍀 {{ t.luckyNum }} <strong>{{ result.luckyNumber }}</strong></span>
                <span class="dot">·</span>
                <span>🎨 {{ t.luckyColor }} <strong>{{ result.luckyColor }}</strong></span>
              </div>
            </div>

            <div class="cert-footer">
              <div class="cert-date">{{ todayDate }}</div>
              <div class="cert-issuer">
                <p class="issuer-name">{{ t.lab }}</p>
                <p class="issuer-sub">{{ t.labSub }}</p>
                <div class="cert-seal">
                  <div class="seal-inner">
                    <span class="seal-text" v-html="t.sealText"></span>
                  </div>
                </div>
              </div>
            </div>

            <p class="cert-disclaimer">{{ t.disclaimer }}</p>
          </div>

          <div class="cert-actions">
            <button class="btn btn-primary" :disabled="downloading" @click="download">
              {{ downloading ? t.saving : t.saveImg }}
            </button>
            <button class="btn btn-secondary" @click="close">{{ t.close }}</button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';
import { toPng } from 'html-to-image';
import { useLocale } from '../composables/useLocale';

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
const { locale } = useLocale();

const certEl = ref(null);
const downloading = ref(false);
const certNumber = ref(String(Math.floor(Math.random() * 9000) + 1000));

const STRINGS = {
  ko: {
    certNo: '제',
    scoreLabel: '길조 지수',
    scoreUnit: '점',
    luckyNum: '행운의 숫자',
    luckyColor: '행운의 색상',
    lab: 'LuckyAI 연구소',
    labSub: '(존재하지 않음)',
    sealText: '✿ LUCKY ✿<br />AI 印',
    disclaimer: '※ 본 인증서의 객관적 효력은 0%이며, 그 사실이 본 인증의 자랑입니다.',
    saveImg: '📥 이미지로 저장',
    saving: '저장 중...',
    close: '닫기',
    titlePalm: '손금 길조 인증서',
    titleSaju: '사주 길조 인증서',
    titleMis: '불운 변환 인증서',
    statement: (modeLabel) => `위 사람이 <strong>LuckyAI</strong>로부터 다음과 같은 <em>${modeLabel}</em>을 받았음을<br />엄숙히 증명합니다.`,
    modePalmLucky: 'LuckyAI 길조 해석',
    modePalmHonest: '전통 객관 해석',
    modeSajuLucky: 'LuckyAI 길조 해석',
    modeSajuHonest: '전통 객관 해석',
    modeMisLucky: '우주적 길조 재해석',
    modeMisHonest: '균형잡힌 객관 분석',
    saveError: '이미지 저장에 실패했습니다. 스크린샷으로 저장해주세요.'
  },
  en: {
    certNo: 'No.',
    scoreLabel: 'Fortune Index',
    scoreUnit: ' pts',
    luckyNum: 'Lucky Number',
    luckyColor: 'Lucky Color',
    lab: 'LuckyAI Laboratory',
    labSub: '(does not exist)',
    sealText: '✿ LUCKY ✿<br />AI · SEAL',
    disclaimer: '※ The objective validity of this certificate is 0%, and that fact is the pride of this certification.',
    saveImg: '📥 Save as Image',
    saving: 'Saving...',
    close: 'Close',
    titlePalm: 'Palm Fortune Certificate',
    titleSaju: 'Saju Fortune Certificate',
    titleMis: 'Misfortune Reframe Certificate',
    statement: (modeLabel) => `It is hereby solemnly certified that the bearer received from <strong>LuckyAI</strong><br />the following <em>${modeLabel}</em>.`,
    modePalmLucky: 'LuckyAI Fortune Reading',
    modePalmHonest: 'Traditional Objective Reading',
    modeSajuLucky: 'LuckyAI Fortune Reading',
    modeSajuHonest: 'Traditional Objective Reading',
    modeMisLucky: 'Cosmic Fortune Reframing',
    modeMisHonest: 'Balanced Objective Analysis',
    saveError: 'Failed to save image. Please take a screenshot instead.'
  }
};

const t = computed(() => STRINGS[locale.value]);

const certTitle = computed(() => {
  return { palm: t.value.titlePalm, saju: t.value.titleSaju, misfortune: t.value.titleMis }[props.type] || '';
});

const modeLabel = computed(() => {
  const map = {
    palm: { lucky: t.value.modePalmLucky, honest: t.value.modePalmHonest },
    saju: { lucky: t.value.modeSajuLucky, honest: t.value.modeSajuHonest },
    misfortune: { lucky: t.value.modeMisLucky, honest: t.value.modeMisHonest }
  };
  return map[props.type]?.[props.mode] || '';
});

const statementHtml = computed(() => t.value.statement(modeLabel.value));

const hasScore = computed(() => props.type !== 'misfortune' && props.result?.score != null);
const hasLucky = computed(() => props.type !== 'misfortune' && props.result?.luckyNumber != null);

const mainText = computed(() => {
  if (!props.result) return '';
  if (props.type === 'misfortune') return props.result.reframedTitle;
  return props.result.mainFortune;
});

const todayDate = computed(() => {
  const d = new Date();
  if (locale.value === 'en') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `Issued on ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
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
    alert(t.value.saveError);
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
