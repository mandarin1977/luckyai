import { getPromptByLocale } from '../utils/prompts';
import {
  getPalmFallback,
  getMisfortuneFallback,
  getSajuFallback
} from '../utils/fallbacks';
import { useLocale } from './useLocale';

export function useGemini() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const { locale } = useLocale();

  const callGemini = async (contents) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.9
          }
        })
      });

      if (!response.ok) {
        console.warn(`Gemini API ${response.status} → fallback 사용`);
        return null;
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        console.warn('Gemini 응답이 비어있음 → fallback 사용');
        return null;
      }
      return JSON.parse(text);
    } catch (error) {
      console.warn('Gemini 호출 실패 → fallback 사용:', error.message);
      return null;
    }
  };

  const analyzePalm = async (imageBase64, mode = 'lucky') => {
    const prompt = getPromptByLocale('palm', mode, locale.value);
    const contents = [{
      parts: [
        { text: prompt },
        { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }
      ]
    }];
    const result = await callGemini(contents);
    return result
      ? { data: result, isFallback: false }
      : { data: getPalmFallback(mode, locale.value), isFallback: true };
  };

  const translateMisfortune = async (userInput, mode = 'lucky') => {
    const template = getPromptByLocale('misfortune', mode, locale.value);
    const prompt = template.replace('{userInput}', userInput);
    const contents = [{ parts: [{ text: prompt }] }];
    const result = await callGemini(contents);
    return result
      ? { data: result, isFallback: false }
      : { data: getMisfortuneFallback(mode, locale.value), isFallback: true };
  };

  /**
   * @param {object} saju  calculateSaju() 결과 — 계산된 4기둥 + 일간 + 오행
   * @param {string} gender
   * @param {'lucky'|'honest'} mode
   */
  const analyzeSaju = async (saju, gender, mode = 'lucky') => {
    const template = getPromptByLocale('saju', mode, locale.value);
    const pillarDisplay = (p) => {
      if (p) return p.display;
      return locale.value === 'en' ? '(Hour unknown — pillar omitted)' : '(시간 미상 — 시주 생략)';
    };

    const elementDisplay = locale.value === 'en'
      ? translateElement(saju.mainElement)
      : saju.mainElement;

    const prompt = template
      .replaceAll('{yearPillar}', pillarDisplay(saju.yearPillar))
      .replaceAll('{monthPillar}', pillarDisplay(saju.monthPillar))
      .replaceAll('{dayPillar}', pillarDisplay(saju.dayPillar))
      .replaceAll('{hourPillar}', pillarDisplay(saju.hourPillar))
      .replaceAll('{dayStem}', `${saju.dayStem.hanzi}(${saju.dayStem.korean})`)
      .replaceAll('{mainElement}', elementDisplay)
      .replaceAll('{gender}', genderDisplay(gender, locale.value));

    const contents = [{ parts: [{ text: prompt }] }];
    const result = await callGemini(contents);
    return result
      ? { data: result, isFallback: false }
      : { data: getSajuFallback(mode, locale.value), isFallback: true };
  };

  return { analyzePalm, translateMisfortune, analyzeSaju };
}

function translateElement(ko) {
  return { '목': 'Wood', '화': 'Fire', '토': 'Earth', '금': 'Metal', '수': 'Water' }[ko] || ko;
}

function genderDisplay(g, locale) {
  if (locale === 'en') return g === '남' ? 'Male' : 'Female';
  return g;
}
