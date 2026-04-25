import { computed } from 'vue';

export function useDevice() {
  const isMobile = computed(() => 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent)
  );
  return { isMobile };
}
