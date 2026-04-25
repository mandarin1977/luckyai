import {
  PALM_READING_PROMPT,
  PALM_READING_HONEST_PROMPT,
  MISFORTUNE_PROMPT,
  MISFORTUNE_HONEST_PROMPT,
  SAJU_PROMPT,
  SAJU_HONEST_PROMPT
} from '../utils/prompts';
import {
  getPalmFallback,
  getMisfortuneFallback,
  getSajuFallback
} from '../utils/fallbacks';

export function useGemini() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // API 호출 시도. 실패 시 null 반환 (호출자가 fallback 처리).
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
    const prompt = mode === 'honest' ? PALM_READING_HONEST_PROMPT : PALM_READING_PROMPT;
    const contents = [{
      parts: [
        { text: prompt },
        {
          inline_data: {
            mime_type: 'image/jpeg',
            data: imageBase64
          }
        }
      ]
    }];
    const result = await callGemini(contents);
    return result ?? getPalmFallback(mode);
  };

  const translateMisfortune = async (userInput, mode = 'lucky') => {
    const template = mode === 'honest' ? MISFORTUNE_HONEST_PROMPT : MISFORTUNE_PROMPT;
    const prompt = template.replace('{userInput}', userInput);
    const contents = [{ parts: [{ text: prompt }] }];
    const result = await callGemini(contents);
    return result ?? getMisfortuneFallback(mode);
  };

  /**
   * @param {object} saju  calculateSaju() 결과 — 계산된 4기둥 + 일간 + 오행
   * @param {string} gender
   * @param {'lucky'|'honest'} mode
   */
  const analyzeSaju = async (saju, gender, mode = 'lucky') => {
    const template = mode === 'honest' ? SAJU_HONEST_PROMPT : SAJU_PROMPT;
    const pillarDisplay = (p) => (p ? p.display : '(시간 미상 — 시주 생략)');

    const prompt = template
      .replaceAll('{yearPillar}', pillarDisplay(saju.yearPillar))
      .replaceAll('{monthPillar}', pillarDisplay(saju.monthPillar))
      .replaceAll('{dayPillar}', pillarDisplay(saju.dayPillar))
      .replaceAll('{hourPillar}', pillarDisplay(saju.hourPillar))
      .replaceAll('{dayStem}', `${saju.dayStem.hanzi}(${saju.dayStem.korean})`)
      .replaceAll('{mainElement}', saju.mainElement)
      .replaceAll('{gender}', gender);

    const contents = [{ parts: [{ text: prompt }] }];
    const result = await callGemini(contents);
    return result ?? getSajuFallback(mode);
  };

  return { analyzePalm, translateMisfortune, analyzeSaju };
}
