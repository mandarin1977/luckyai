<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="show" class="modal-overlay" @click="close">
        <div class="notice-card" @click.stop>
          <div class="notice-icon">🌙</div>
          <h3>잠시 우주의 통신이 막혔습니다</h3>
          <p class="main-msg">
            오늘의 Gemini API 한도가 소진되어<br />
            아래 결과는 <strong>준비된 데모 데이터</strong>로 보여드립니다.
          </p>
          <p class="sub-msg">하루가 지나면 정상적으로 다시 동작합니다 🍀</p>
          <button class="btn btn-primary close-btn" @click="close">확인했습니다</button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean
});

const emit = defineEmits(['close']);

const close = () => emit('close');
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

.close-btn {
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
