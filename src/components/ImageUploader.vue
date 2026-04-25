<template>
  <div class="image-uploader">
    <div v-if="!previewUrl" class="upload-area" @click="handleClick">
      <div class="upload-icon">✋</div>
      <p>{{ t.uploadPrompt }}</p>
      <span class="sub-text">{{ t.uploadHint }}</span>

      <input
        v-if="!isMobile"
        ref="desktopInput"
        type="file"
        accept="image/*"
        class="hidden-input"
        @change="handleFileSelect"
      />
    </div>

    <div v-else class="preview-area">
      <img :src="previewUrl" :alt="t.previewAlt" class="preview-img" />
      <button class="btn btn-secondary reupload-btn" @click="reset">{{ t.reupload }}</button>
    </div>

    <MobileUploadModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @file-selected="onFileSelected"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDevice } from '../composables/useDevice';
import { useLocale } from '../composables/useLocale';
import MobileUploadModal from './MobileUploadModal.vue';

const { isMobile } = useDevice();
const { locale } = useLocale();
const emit = defineEmits(['image-ready', 'reset']);

const STRINGS = {
  ko: {
    uploadPrompt: '손바닥 사진을 업로드해주세요',
    uploadHint: '가급적 밝은 곳에서 선명하게 찍어주세요',
    previewAlt: '손금 미리보기',
    reupload: '다시 올리기'
  },
  en: {
    uploadPrompt: 'Upload a photo of your palm',
    uploadHint: 'Best taken in good lighting and clearly focused',
    previewAlt: 'Palm preview',
    reupload: 'Upload Again'
  }
};

const t = computed(() => STRINGS[locale.value]);

const isModalOpen = ref(false);
const desktopInput = ref(null);
const previewUrl = ref(null);

const handleClick = () => {
  if (isMobile.value) {
    isModalOpen.value = true;
  } else {
    desktopInput.value?.click();
  }
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    onFileSelected(file);
  }
};

const onFileSelected = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target.result;
    
    // Extract base64 part
    const base64String = e.target.result.split(',')[1];
    emit('image-ready', base64String);
  };
  reader.readAsDataURL(file);
};

const reset = () => {
  previewUrl.value = null;
  if (desktopInput.value) desktopInput.value.value = '';
  emit('reset');
};
</script>

<style scoped>
.image-uploader {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.upload-area {
  border: 2px dashed rgba(255, 215, 0, 0.3);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-2xl) var(--spacing-md);
  text-align: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.02);
  transition: var(--transition-fast);
}

.upload-area:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 215, 0, 0.6);
}

.upload-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-sm);
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.2));
}

.upload-area p {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.sub-text {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.hidden-input {
  display: none;
}

.preview-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.preview-img {
  width: 100%;
  max-width: 300px;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: var(--border-radius-lg);
  border: 2px solid var(--color-accent);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
}

.reupload-btn {
  font-size: 0.9rem;
  padding: var(--spacing-sm) var(--spacing-lg);
}

/* btn and btn-secondary inherit from main.css */
</style>
