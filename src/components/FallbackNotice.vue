<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="show" class="modal-overlay" @click="close">
        <div class="notice-card" @click.stop>
          <div class="notice-icon">🌙</div>
          <h3>{{ t.title }}</h3>
          <p class="main-msg" v-html="t.mainMsg"></p>
          <p class="sub-msg">{{ t.subMsg }}</p>

          <div class="action-stack">
            <button class="btn btn-primary" @click="goTo('/clicker')">
              {{ t.clickerBtn }}
            </button>
            <button class="btn btn-primary" @click="goTo('/lotto')">
              {{ t.lottoBtn }}
            </button>
            <button class="btn btn-secondary" @click="close">{{ t.okBtn }}</button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from '../composables/useLocale';

defineProps({ show: Boolean });
const emit = defineEmits(['close']);
const router = useRouter();
const { locale } = useLocale();

const STRINGS = {
  ko: {
    title: '잠시 우주의 통신이 막혔습니다',
    mainMsg: '오늘의 Gemini API 한도가 소진되어<br />아래 결과는 <strong>준비된 데모 데이터</strong>로 보여드립니다.',
    subMsg: '하루가 지나면 정상적으로 다시 동작합니다 🍀',
    clickerBtn: '😺 운세 클리커로 놀기',
    lottoBtn: '🥠 운세 로또 뽑기',
    okBtn: '확인했습니다'
  },
  en: {
    title: 'The cosmic transmission is briefly blocked',
    mainMsg: "Today's Gemini API quota is used up — <br />the result below is <strong>prepared demo data</strong>.",
    subMsg: 'It will work normally again tomorrow 🍀',
    clickerBtn: '😺 Play Fortune Clicker',
    lottoBtn: '🥠 Draw Fortune Lotto',
    okBtn: 'Got it'
  }
};

const t = computed(() => STRINGS[locale.value]);

const close = () => emit('close');

const goTo = (path) => {
  emit('close');
  router.push(path);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.notice-card {
  width: 100%;
  max-width: 440px;
  background: var(--color-bg);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-2xl) var(--spacing-xl);
  box-shadow: 0 14px 50px rgba(0, 0, 0, 0.6);
  text-align: center;
  animation: modalPop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.notice-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.35));
}

.notice-card h3 {
  color: var(--color-accent);
  font-size: 1.3rem;
  margin-bottom: var(--spacing-md);
}

.main-msg {
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.main-msg strong {
  color: var(--color-accent);
  font-weight: 600;
}

.sub-msg {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-xl);
}

.action-stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.action-stack .btn {
  width: 100%;
  min-width: 0;
}

@keyframes modalPop {
  from { transform: scale(0.92); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
