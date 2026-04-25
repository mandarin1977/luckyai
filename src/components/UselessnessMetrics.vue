<template>
  <div class="uselessness-metrics">
    <div class="metrics-header">
      <span class="metrics-icon">📊</span>
      <span class="metrics-title">{{ t.title }}</span>
      <span class="metrics-sub">{{ t.sub }}</span>
    </div>

    <div class="metrics-grid">
      <div class="metric-row" v-for="m in metrics" :key="m.label">
        <span class="metric-label">{{ m.label }}</span>
        <span class="metric-dots"></span>
        <span class="metric-value" :class="m.tone">{{ m.value }}</span>
      </div>
    </div>

    <p class="metrics-note">{{ t.note }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLocale } from '../composables/useLocale';

const { locale } = useLocale();

const STRINGS = {
  ko: {
    title: 'LuckyAI 신뢰도 자체 평가',
    sub: '— 정직한 무용성 보고서 —',
    note: '※ 본 평가는 자가 측정되었으며, 측정 도구의 신뢰도 또한 측정되지 않았습니다.',
    rows: [
      { label: '객관적 사실 부합률', value: '0%', tone: 'zero' },
      { label: '미래 예측 정확도', value: '측정 불가', tone: 'neutral' },
      { label: '플라시보 효과 보장률', value: '100%', tone: 'full' },
      { label: '기술적 진지함', value: '매우 높음', tone: 'full' }
    ]
  },
  en: {
    title: 'LuckyAI Self-Assessed Reliability',
    sub: '— An Honest Uselessness Report —',
    note: '※ This assessment was self-measured, and the reliability of the measuring tool was also not measured.',
    rows: [
      { label: 'Factual accuracy', value: '0%', tone: 'zero' },
      { label: 'Predictive accuracy', value: 'Unmeasurable', tone: 'neutral' },
      { label: 'Placebo effect rate', value: '100%', tone: 'full' },
      { label: 'Technical seriousness', value: 'Very High', tone: 'full' }
    ]
  }
};

const t = computed(() => STRINGS[locale.value]);
const metrics = computed(() => t.value.rows);
</script>

<style scoped>
.uselessness-metrics {
  background: rgba(0, 0, 0, 0.25);
  border: 1px dashed rgba(255, 215, 0, 0.2);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  margin-top: var(--spacing-xl);
  font-size: 0.85rem;
}

.metrics-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  flex-wrap: wrap;
}

.metrics-icon {
  font-size: 1rem;
}

.metrics-title {
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: 0.02em;
}

.metrics-sub {
  color: var(--color-text-muted);
  font-style: italic;
  font-size: 0.78rem;
}

.metrics-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.metric-row {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  font-family: 'Pretendard Variable', sans-serif;
}

.metric-label {
  color: rgba(245, 230, 211, 0.75);
  white-space: nowrap;
}

.metric-dots {
  flex: 1;
  border-bottom: 1px dotted rgba(245, 230, 211, 0.2);
  position: relative;
  top: -3px;
}

.metric-value {
  font-weight: 700;
  white-space: nowrap;
}

.metric-value.zero { color: #ff8a8a; }
.metric-value.neutral { color: rgba(245, 230, 211, 0.6); }
.metric-value.full { color: var(--color-accent); }

.metrics-note {
  margin-top: var(--spacing-md);
  font-size: 0.72rem;
  color: rgba(245, 230, 211, 0.4);
  font-style: italic;
  text-align: center;
  line-height: 1.6;
}
</style>
