import { ref, watch, onUnmounted } from 'vue';
import { pickRandomMessage } from '../utils/clickerMessages';

/**
 * 로딩 중 길조 메시지를 일정 간격으로 회전시키는 composable.
 * @param {Ref<string>} stage  현재 stage ref
 * @param {string} loadingStage  로딩 상태 값 (기본 'loading')
 * @param {number} intervalMs  메시지 교체 주기 (기본 2500ms)
 */
export function useLoadingTip(stage, loadingStage = 'loading', intervalMs = 2500) {
  const tip = ref('');
  let timer = null;

  const start = () => {
    tip.value = pickRandomMessage('');
    timer = setInterval(() => {
      tip.value = pickRandomMessage(tip.value);
    }, intervalMs);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    tip.value = '';
  };

  watch(stage, (newStage) => {
    if (newStage === loadingStage) {
      start();
    } else {
      stop();
    }
  });

  onUnmounted(stop);

  return { tip };
}
