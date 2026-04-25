<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click="close">
        <div class="bottom-sheet" @click.stop>
          <div class="sheet-header">
            <h3>사진 업로드 방식</h3>
            <button class="close-btn" @click="close">✕</button>
          </div>

          <div class="sheet-body">
            <label class="upload-option">
              <div class="option-icon">📷</div>
              <div class="option-text">카메라로 촬영하기</div>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                class="hidden-input"
                @change="handleFileSelect"
              />
            </label>

            <label class="upload-option">
              <div class="option-icon">🖼️</div>
              <div class="option-text">앨범에서 선택하기</div>
              <input
                type="file"
                accept="image/*"
                class="hidden-input"
                @change="handleFileSelect"
              />
            </label>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'file-selected'])

const close = () => {
  emit('close')
}

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    emit('file-selected', file);
    close();
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.bottom-sheet {
  width: 100%;
  max-width: 420px;
  background: var(--color-bg);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
  animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.sheet-header h3 {
  font-family: var(--font-body);
  font-size: 1.2rem;
  margin: 0;
}

.close-btn {
  font-size: 1.5rem;
  color: var(--color-text-muted);
}

.sheet-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.upload-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: var(--transition-fast);
}

.upload-option:active {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.98);
}

.option-icon {
  font-size: 1.5rem;
}

.option-text {
  font-weight: 500;
}

.hidden-input {
  display: none;
}

@keyframes modalPop {
  from {
    transform: scale(0.92);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
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
