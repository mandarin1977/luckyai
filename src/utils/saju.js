import { Solar, Lunar } from 'lunar-javascript';

const STEM_TO_ELEMENT = {
  '甲': '목', '乙': '목',
  '丙': '화', '丁': '화',
  '戊': '토', '己': '토',
  '庚': '금', '辛': '금',
  '壬': '수', '癸': '수'
};

const HANZI_TO_KOREAN = {
  '甲': '갑', '乙': '을', '丙': '병', '丁': '정', '戊': '무',
  '己': '기', '庚': '경', '辛': '신', '壬': '임', '癸': '계',
  '子': '자', '丑': '축', '寅': '인', '卯': '묘', '辰': '진', '巳': '사',
  '午': '오', '未': '미', '申': '신', '酉': '유', '戌': '술', '亥': '해'
};

function toKorean(ganzhi) {
  return ganzhi.split('').map(c => HANZI_TO_KOREAN[c] || c).join('');
}

function formatPillar(ganzhi) {
  if (!ganzhi) return null;
  return {
    hanzi: ganzhi,
    korean: toKorean(ganzhi),
    display: `${ganzhi}(${toKorean(ganzhi)})`
  };
}

/**
 * 생년월일시 → 사주 4기둥 계산
 * @param {string} birthDate  'YYYY-MM-DD'
 * @param {string} birthHour  '모름' or '{n}시'
 * @param {string} calendar   '양력' | '음력'
 */
export function calculateSaju(birthDate, birthHour, calendar) {
  const [y, m, d] = birthDate.split('-').map(Number);
  const hourMatch = birthHour && birthHour.match(/(\d+)시/);
  const hour = hourMatch ? parseInt(hourMatch[1], 10) : 12; // default noon if unknown
  const hourUnknown = !hourMatch;

  const base = calendar === '음력'
    ? Lunar.fromYmdHms(y, m, d, hour, 0, 0)
    : Solar.fromYmdHms(y, m, d, hour, 0, 0).getLunar();

  const ec = base.getEightChar();

  const yearPillar = formatPillar(ec.getYear());
  const monthPillar = formatPillar(ec.getMonth());
  const dayPillar = formatPillar(ec.getDay());
  const hourPillar = hourUnknown ? null : formatPillar(ec.getTime());

  const dayStem = ec.getDayGan(); // 일간 (본인)
  const mainElement = STEM_TO_ELEMENT[dayStem] || '';

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayStem: { hanzi: dayStem, korean: HANZI_TO_KOREAN[dayStem] || dayStem },
    mainElement,
    hourUnknown
  };
}
