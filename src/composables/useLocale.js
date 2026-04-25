import { ref } from 'vue';

const STORAGE_KEY = 'lucky-locale';

const safeRead = (key) => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const safeWrite = (key, val) => {
  try { localStorage.setItem(key, val); } catch { /* ignore */ }
};

const initial = (() => {
  const saved = safeRead(STORAGE_KEY);
  if (saved === 'ko' || saved === 'en') return saved;
  // 기본값: 브라우저 언어가 ko로 시작하면 ko, 아니면 en
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('ko')) {
    return 'ko';
  }
  return 'en';
})();

// 모든 컴포넌트가 공유하는 단일 reactive state (모듈 스코프)
const locale = ref(initial);

export function useLocale() {
  const setLocale = (next) => {
    if (next !== 'ko' && next !== 'en') return;
    locale.value = next;
    safeWrite(STORAGE_KEY, next);
  };

  const toggleLocale = () => {
    setLocale(locale.value === 'ko' ? 'en' : 'ko');
  };

  return { locale, setLocale, toggleLocale };
}
