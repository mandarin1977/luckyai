// 운세 클리커 — 클릭할 때마다 랜덤으로 뜨는 길조 메시지.
// 일상적이고 살짝 어이없는 톤. KO/EN 지원.

export const CLICKER_CHARACTERS = ['😺', '🐱', '😻', '🐈', '🍀', '✨', '🌙', '⭐', '🌟', '💫', '🦋', '🐰'];

const CLICKER_MESSAGES_KO = [
  '오늘 양말이 짝짝이라면, 인생의 균형이 곧 잡힙니다',
  '엘리베이터에서 닫힘 버튼을 안 누르면 인복이 들어옵니다',
  '지하철에서 빈자리를 발견했다면 그 자리는 운명의 좌석',
  '냉장고 문을 정확히 두 번 여닫으면 재물운 +10',
  '왼발부터 신발을 신으면 그날 만나는 사람 모두에게 호감',
  '비둘기가 길을 막으면 잠시 멈추라는 우주의 신호',
  '지나가는 강아지가 짖으면 좋은 소식이 7일 안에 도착',
  '진동벨을 한 번에 받으면 그날 결정은 모두 옳습니다',
  '오늘 본 첫 문자가 ㅎ이면 웃을 일이 가득',
  '버스 번호의 합이 짝수면 인연이 가까이 있습니다',
  '신발끈이 풀렸다면 인생의 매듭도 풀릴 징조',
  '거울 속 자신에게 윙크하면 자신감 +5 (3회 연속이면 +15)',
  '물을 한 번에 다 마시면 결단력이 상승합니다',
  '휴지 마지막 한 칸이라면 절약의 신이 함께하는 중',
  '스마트폰 배터리가 17%면 17시간 안에 좋은 일이 옵니다',
  '오늘 답장이 빠른 사람이 있다면 그 사람이 인복',
  '복도에서 1초만 멈춰서면 우연의 신이 알아봅니다',
  '신호등 빨간불이 30초 이상이면 그날 운수가 대통',
  'ATM에서 잔액 확인만 해도 재물운이 인지합니다',
  '엘리베이터 거울 보고 미소 지으면 그날의 길조',
  '지금 이 메시지를 본 것 자체가 우주의 응원입니다',
  '클릭 한 번에 1년의 행운이 누적됩니다 (실화)',
  '우주는 지금 당신을 위해 정렬 중입니다',
  '오늘 별자리가 평소보다 0.3도 더 빛나고 있습니다',
  '당신이 모르는 사이, 누군가 당신을 떠올렸습니다',
  '바람의 방향이 당신 편으로 바뀌는 중입니다',
  '오늘 만나는 모든 우연은 우연이 아닙니다',
  '지금 들리는 소리가 음표가 되어 행운을 만듭니다',
  '맥도날드 감자튀김이 갈색에 가까우면 행운',
  '아메리카노에 얼음이 다 녹기 전에 다 마시면 시간 운 상승',
  '편의점에서 1+1 발견 시 그것은 운명적 만남',
  '신호등이 막 초록불로 바뀌는 순간 도착하면 타이밍의 신',
  '오늘 처음 본 고양이의 색이 행운의 색입니다',
  '카페 자리가 창가면 영감이 +10',
  '버스에 두 번 연속 자리가 비어있으면 인복이 두텁습니다',
  '여기서 30번 클릭하면 진짜 행운이 옵니다 (어쩌면)',
  'API가 살아나길 비는 마음이 우주에 닿았습니다',
  '내일 아침엔 모든 것이 정상으로 돌아옵니다 🍀',
  '클리커 게임을 하는 당신은 이미 마음의 여유가 있는 사람',
  '심심해서 누른 클릭이 인생을 바꿀지도 모릅니다',
  '이 메시지를 보고 웃었다면, 오늘 하루가 좋아질 확률 87.3%'
];

const CLICKER_MESSAGES_EN = [
  "If your socks don't match today, life's balance is about to align",
  "Don't press the elevator close button — good company is on its way",
  "An empty subway seat you found is the seat of destiny",
  "Open and close the fridge door exactly twice for +10 wealth",
  "Put on your left shoe first — everyone you meet today will warm to you",
  "A pigeon blocking your path is the universe's pause sign",
  "A passing dog barks? Good news will arrive within 7 days",
  "Catching a coffee buzzer on the first try means every choice today is correct",
  "If the first text you saw today started with 'h', laughter awaits",
  "If your bus number sums to an even number, fate is close by",
  "An untied shoelace foretells life's knots will loosen too",
  "Wink at yourself in the mirror for +5 confidence (+15 for 3 in a row)",
  "Drink water in one go and your decisiveness rises",
  "If you reached the last sheet of toilet paper, the god of thrift is with you",
  "Phone battery at 17%? Good news is coming within 17 hours",
  "If someone reply quickly today, that person is your fortune",
  "Pause one second in a hallway — the god of coincidence will notice",
  "A red light over 30 seconds means today's luck is grand",
  "Even checking your ATM balance is recognized by your wealth fortune",
  "Smile at yourself in an elevator mirror — auspicious sign of the day",
  "Reading this message itself is the universe cheering you on",
  "Each click adds one year of stored fortune (true story)",
  "The cosmos is currently aligning itself for you",
  "Today the constellations shine 0.3° brighter than usual",
  "Without you knowing, someone thought of you today",
  "The wind is shifting in your favor",
  "Every coincidence you meet today is no coincidence",
  "The sound you hear right now becomes a note of luck",
  "If McDonald's fries lean toward brown today, that's fortune",
  "Finish an iced americano before the ice melts — time-fortune rises",
  "A 1+1 deal at the convenience store is a fated meeting",
  "If you arrive exactly as the light turns green, you are the god of timing",
  "The color of the first cat you saw today is your lucky color",
  "A window seat at a cafe? Inspiration +10",
  "Two empty bus seats in a row means your social fortune is thick",
  "Click here 30 times for real luck (maybe)",
  "Your wish for the API to come back has reached the cosmos",
  "Tomorrow morning, everything returns to normal 🍀",
  "Anyone playing this clicker already has a calm enough heart",
  "A click out of boredom may yet change your life",
  "If you smiled at this message, your day improves with 87.3% probability"
];

export const CLICKER_MESSAGES = CLICKER_MESSAGES_KO; // 하위 호환

export function pickRandomCharacter(currentChar) {
  let next;
  do {
    next = CLICKER_CHARACTERS[Math.floor(Math.random() * CLICKER_CHARACTERS.length)];
  } while (next === currentChar && CLICKER_CHARACTERS.length > 1);
  return next;
}

export function pickRandomMessage(lastMessage = '', locale = 'ko') {
  const pool = locale === 'en' ? CLICKER_MESSAGES_EN : CLICKER_MESSAGES_KO;
  let next;
  do {
    next = pool[Math.floor(Math.random() * pool.length)];
  } while (next === lastMessage && pool.length > 1);
  return next;
}
