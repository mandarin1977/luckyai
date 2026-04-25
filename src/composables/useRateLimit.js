// 방문자별 일일 진짜 API 호출 횟수 제한.
// 한도 초과 시 useGemini가 fallback으로 자동 대체 (사용자에겐 DEMO 뱃지로 표시됨).
//
// dev/owner 우회: 브라우저 콘솔에서
//   localStorage.setItem('lucky-skip-throttle', '1')
// 입력하면 throttle 무효화. 새로고침 후 적용.

const STORAGE_KEY = 'lucky-rate-limit';
const BYPASS_KEY = 'lucky-skip-throttle';
const DAILY_LIMIT = 3; // 방문자 1명당 하루 진짜 API 호출 3회

const safeRead = (key) => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const safeWrite = (key, val) => {
  try { localStorage.setItem(key, val); } catch { /* ignore */ }
};

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const isBypassed = () => safeRead(BYPASS_KEY) === '1';

const readState = () => {
  try {
    const raw = safeRead(STORAGE_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const parsed = JSON.parse(raw);
    if (parsed.date !== todayKey()) {
      // 날짜 바뀌면 자동 리셋
      return { date: todayKey(), count: 0 };
    }
    return parsed;
  } catch {
    return { date: todayKey(), count: 0 };
  }
};

export function useRateLimit() {
  /**
   * API 호출을 시도해도 되는지 검사하고 카운트 증가.
   * @returns {boolean} true = 호출 OK, false = 한도 초과 (fallback 사용)
   */
  const checkAndIncrement = () => {
    if (isBypassed()) return true;
    const state = readState();
    if (state.count >= DAILY_LIMIT) {
      return false;
    }
    state.count++;
    safeWrite(STORAGE_KEY, JSON.stringify(state));
    return true;
  };

  const getRemaining = () => {
    if (isBypassed()) return Infinity;
    const state = readState();
    return Math.max(0, DAILY_LIMIT - state.count);
  };

  return { checkAndIncrement, getRemaining, DAILY_LIMIT };
}
