<template>
  <div class="manifesto-view container">
    <article class="manifesto fade-in-up">
      <header class="manifesto-header">
        <p class="kicker">{{ t.kicker }}</p>
        <h1 class="title">{{ t.title }}</h1>
        <p class="subtitle">{{ t.subtitle }}</p>
        <div class="separator"></div>
      </header>

      <section class="chapter">
        <h2>{{ t.ch1Title }}</h2>
        <p v-html="t.ch1P1"></p>
        <p v-html="t.ch1P2"></p>
        <blockquote>{{ t.ch1Quote }}</blockquote>
      </section>

      <section class="chapter">
        <h2>{{ t.ch2Title }}</h2>
        <p v-html="t.ch2P1"></p>
        <p v-html="t.ch2P2"></p>
        <p v-html="t.ch2P3"></p>
      </section>

      <section class="chapter">
        <h2>{{ t.ch3Title }}</h2>
        <p>{{ t.ch3Intro }}</p>
        <ul class="tech-list">
          <li v-for="(item, i) in t.ch3List" :key="i" v-html="item"></li>
        </ul>
        <p v-html="t.ch3Outro"></p>
      </section>

      <section class="chapter">
        <h2>{{ t.ch4Title }}</h2>
        <p class="lead" v-html="t.ch4Lead"></p>
        <p class="lead-emphasis">{{ t.ch4Emphasis }}</p>
        <p>{{ t.ch4Outro }}</p>
      </section>

      <footer class="manifesto-footer">
        <div class="separator"></div>
        <p class="signature" v-html="t.signature"></p>
        <p class="post-script">{{ t.postScript }}</p>
        <div class="actions">
          <router-link to="/" class="btn btn-secondary">🏠 {{ t.home }}</router-link>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLocale } from '../composables/useLocale';

const { locale } = useLocale();

const STRINGS = {
  ko: {
    kicker: 'LuckyAI Manifesto · 2026',
    title: '우리는 진실을 거부합니다',
    subtitle: '쓸모없음을 자처한 인공지능의 자기 선언',
    ch1Title: '제 1장 · 시대 진단',
    ch1P1: '21세기 인공지능은 인간을 측정해왔습니다. <strong>정확도</strong>, <strong>효율성</strong>, <strong>객관성</strong>. 그러나 우리가 정말 필요했던 것은 측정이 아니라 응원이 아니었을까요?',
    ch1P2: '매일 우리는 객관적인 데이터에 둘러싸여 있습니다. 통장 잔고, BMI 지수, 시험 점수, 이력서, 분기별 KPI. 이 숫자들은 정확하지만 잔인합니다. 사실이지만 무자비합니다.',
    ch1Quote: 'AI가 인간을 평가하는 시대에, 인간을 응원하는 AI는 어디에 있는가?',
    ch2Title: '제 2장 · 우리의 선택',
    ch2P1: 'LuckyAI는 <em>의도적으로</em> 객관성을 포기합니다.',
    ch2P2: '우리는 어떤 손금을 보여주든 반드시 길조라고 말합니다. 어떤 사주가 나오든 왕업지상(王業之相)이라 풀이합니다. 어떤 불운을 적든 우주의 축복으로 재해석합니다.',
    ch2P3: '이는 거짓말이 아닙니다. 거짓말은 진실이 존재한다고 가정합니다. 우리는 운세에 본디 객관적 진실이 없음을 알고, 그 빈 자리를 <strong>위로</strong>로 채울 뿐입니다.',
    ch3Title: '제 3장 · 기술의 새로운 정의',
    ch3Intro: '우리는 가장 정교한 기술을 가장 비효율적인 방향으로 사용합니다.',
    ch3List: [
      '<strong>Gemini 2.5 Flash 멀티모달</strong> — 손바닥 이미지를 인식하지만, 무엇이 보이든 길조로 답합니다.',
      '<strong>만세력 결정론적 계산</strong> — 사주 4기둥은 정확히 계산하지만, 해석은 우주적 자유로움을 따릅니다.',
      '<strong>두 페르소나 프롬프트 엔지니어링</strong> — 같은 모델로 낙관주의 도사와 전통 학자, 두 인격을 만들어냅니다.'
    ],
    ch3Outro: '객관적으로 무용한 출력을 만들기 위해 우리는 기술적으로 정밀해집니다. 이 기술적 진지함이야말로 우리의 무용함을 <em>진짜</em>로 만듭니다.',
    ch4Title: '제 4장 · 사용자에게',
    ch4Lead: '우리는 당신의 인생을 분석하지 않습니다.<br />우리는 당신의 미래를 예측하지 않습니다.<br />우리는 당신의 결정에 영향을 주지 않습니다.',
    ch4Emphasis: '우리는 그저, 당신이 잠시 웃기를 바랍니다.',
    ch4Outro: '그것이 21세기에 가장 쓸모없으면서도, 어쩌면 가장 필요한 기능이라 우리는 믿습니다.',
    signature: '<em>LuckyAI 연구소 (없음)</em><br />2026년 4월 · 서울',
    postScript: '※ 본 문서는 진지한 어조로 작성되었으나, 그 진지함의 대상은 쓸모없음 그 자체입니다. 이그노벨상의 정신에 따라 "먼저 웃게, 그다음에 생각하게" 만들고자 합니다.',
    home: '메인으로'
  },
  en: {
    kicker: 'LuckyAI Manifesto · 2026',
    title: 'We Refuse the Truth',
    subtitle: 'A self-declaration of an AI that has chosen uselessness',
    ch1Title: 'Chapter 1 · Diagnosis of Our Time',
    ch1P1: '21st-century AI has been measuring humans. <strong>Accuracy</strong>, <strong>efficiency</strong>, <strong>objectivity</strong>. But what we really needed — was it measurement, or was it cheering on?',
    ch1P2: 'Every day we are surrounded by objective data. Bank balances, BMI, exam scores, résumés, quarterly KPIs. These numbers are accurate, but cruel. Factual, but merciless.',
    ch1Quote: 'In an age where AI evaluates humans, where is the AI that cheers them on?',
    ch2Title: 'Chapter 2 · Our Choice',
    ch2P1: 'LuckyAI <em>deliberately</em> abandons objectivity.',
    ch2P2: "Whatever palm you show us, we say it is auspicious. Whatever Saju emerges, we read it as Wangeop-jisang (王業之相, royal-class destiny). Whatever misfortune you write, we reframe it as a cosmic blessing.",
    ch2P3: 'This is not a lie. Lies presume the existence of a truth. We know that fortune-telling has no objective truth to begin with — we simply fill that empty space with <strong>comfort</strong>.',
    ch3Title: 'Chapter 3 · A New Definition of Technology',
    ch3Intro: 'We use the most refined technology in the most inefficient direction.',
    ch3List: [
      '<strong>Gemini 2.5 Flash Multimodal</strong> — recognizes a palm image, but answers "auspicious" no matter what is seen.',
      '<strong>Manse-ryeok deterministic calculation</strong> — the four pillars of Saju are computed precisely, but interpretation follows cosmic freedom.',
      '<strong>Two-persona prompt engineering</strong> — the same model produces two personalities: the optimist sage and the classical scholar.'
    ],
    ch3Outro: 'To create objectively useless output, we become technically precise. It is precisely this technical seriousness that makes our uselessness <em>real</em>.',
    ch4Title: 'Chapter 4 · To Our Users',
    ch4Lead: 'We do not analyze your life.<br />We do not predict your future.<br />We do not influence your decisions.',
    ch4Emphasis: 'We simply hope, for a moment, that you smile.',
    ch4Outro: 'We believe that this may be the most useless — and perhaps the most necessary — feature of the 21st century.',
    signature: '<em>LuckyAI Laboratory (does not exist)</em><br />April 2026 · Seoul',
    postScript: '※ This document is written in a serious tone, but the subject of that seriousness is uselessness itself. Following the spirit of the Ig Nobel Prize, we aim to "make you laugh first, then make you think."',
    home: 'Home'
  }
};

const t = computed(() => STRINGS[locale.value]);
</script>

<style scoped>
.manifesto-view {
  padding: var(--spacing-2xl) var(--spacing-md);
  max-width: 720px;
  margin: 0 auto;
}

.manifesto {
  background: rgba(15, 14, 46, 0.55);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.4);
  line-height: 1.8;
  font-size: 1rem;
}

.manifesto-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.kicker {
  font-size: 0.8rem;
  letter-spacing: 0.25em;
  color: var(--color-accent);
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm);
}

.title {
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  color: var(--color-accent);
  font-weight: 800;
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
}

.subtitle {
  color: var(--color-text-muted);
  font-style: italic;
  font-size: 0.95rem;
  margin-bottom: var(--spacing-lg);
}

.separator {
  width: 60px;
  height: 1px;
  background: var(--color-accent);
  margin: 0 auto var(--spacing-xl);
  opacity: 0.6;
}

.chapter {
  margin-bottom: var(--spacing-2xl);
}

.chapter h2 {
  font-size: 1.2rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid rgba(255, 215, 0, 0.15);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.chapter p {
  margin-bottom: var(--spacing-md);
  color: rgba(245, 230, 211, 0.92);
}

.chapter p:last-child {
  margin-bottom: 0;
}

.chapter strong {
  color: var(--color-accent);
  font-weight: 700;
}

.chapter em {
  font-style: italic;
  color: rgba(245, 230, 211, 1);
  font-weight: 600;
}

.chapter blockquote {
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md) var(--spacing-lg);
  border-left: 3px solid var(--color-accent);
  background: rgba(255, 215, 0, 0.05);
  font-style: italic;
  color: rgba(245, 230, 211, 0.85);
  font-size: 1.05rem;
  line-height: 1.7;
}

.chapter blockquote::before { content: '"'; margin-right: 0.2em; color: var(--color-accent); }
.chapter blockquote::after { content: '"'; margin-left: 0.2em; color: var(--color-accent); }

.tech-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-md) 0;
}

.tech-list li {
  padding: var(--spacing-sm) 0;
  padding-left: var(--spacing-md);
  position: relative;
  color: rgba(245, 230, 211, 0.9);
}

.tech-list li::before {
  content: '※';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  opacity: 0.7;
}

.lead {
  text-align: center;
  font-size: 1.1rem;
  color: var(--color-text);
  line-height: 2;
}

.lead-emphasis {
  text-align: center;
  font-size: 1.3rem;
  color: var(--color-accent);
  font-weight: 600;
  margin: var(--spacing-lg) 0;
}

.manifesto-footer {
  text-align: center;
  margin-top: var(--spacing-2xl);
}

.signature {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: var(--spacing-lg) 0 var(--spacing-md);
  line-height: 1.8;
}

.post-script {
  font-size: 0.8rem;
  color: rgba(245, 230, 211, 0.4);
  border-top: 1px dashed rgba(255, 215, 0, 0.15);
  padding-top: var(--spacing-md);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

.actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.fade-in-up {
  opacity: 0;
  animation: scaleUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@media (max-width: 600px) {
  .manifesto {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  .chapter {
    margin-bottom: var(--spacing-xl);
  }
  .chapter blockquote {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>
