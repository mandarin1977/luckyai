import { PALM_READING_PROMPT, MISFORTUNE_PROMPT } from '../utils/prompts';

export function useGemini() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const callGemini = async (contents) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.9
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const analyzePalm = async (imageBase64) => {
    const contents = [{
      parts: [
        { text: PALM_READING_PROMPT },
        {
          inline_data: {
            mime_type: 'image/jpeg',
            data: imageBase64
          }
        }
      ]
    }];
    return callGemini(contents);
  };

  const translateMisfortune = async (userInput) => {
    const prompt = MISFORTUNE_PROMPT.replace('{userInput}', userInput);
    const contents = [{
      parts: [
        { text: prompt }
      ]
    }];
    return callGemini(contents);
  };

  return { analyzePalm, translateMisfortune };
}
