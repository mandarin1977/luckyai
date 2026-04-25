// 운세 로또(포춘쿠키) 전용 메시지 풀.
// 클리커보다 조금 더 지혜롭고 진중한 톤. KO/EN 지원.

const FORTUNE_COOKIE_MESSAGES_KO = [
  '당신이 망설이는 그 일이, 지금이 적기입니다',
  '가장 가까이 있는 사람이 가장 큰 도움이 됩니다',
  '오늘 떠오른 그 생각을 잊지 말고 적어두세요',
  '당신이 찾던 답은 이미 마음 속에 있습니다',
  '한 번 더 시도하면 막혔던 문이 열립니다',
  '결단을 미루는 시간만큼 기회도 미뤄집니다',
  '오늘의 선택이 1년 뒤 당신을 만듭니다',
  '7일 안에 의외의 사람으로부터 좋은 소식이 옵니다',
  '용서는 상대를 위한 것이 아니라 당신을 위한 것입니다',
  '오래 연락 못 한 사람에게 먼저 연락해보세요',
  '당신을 진심으로 응원하는 사람이 곁에 있습니다',
  '소중한 인연은 조용히 다가옵니다',
  '오늘 만나는 사람의 한 마디를 흘려듣지 마세요',
  '예상치 못한 곳에서 재물의 기운이 들어옵니다',
  '작은 절약이 큰 풍요를 부릅니다',
  '오늘 돈을 쓸 때, 한 번 더 생각해보세요',
  '당신의 노력이 늦어도 6개월 안에 결실을 맺습니다',
  '주변의 사소한 정보가 큰 기회로 이어집니다',
  '걱정의 80%는 실제로 일어나지 않습니다',
  '변화의 시기가 곧 찾아옵니다 — 두려워 마세요',
  '당신은 생각보다 강한 사람입니다',
  '오늘의 작은 친절이 내일의 큰 행운으로 돌아옵니다',
  '쉬는 것도 나아가는 한 걸음입니다',
  '지나간 일은 흘려보내고, 지금에 집중하세요',
  '완벽하지 않아도 충분합니다',
  '지금 가장 즐거운 일에 시간을 쓰세요',
  '행운의 별이 당신 위에 정렬되고 있습니다',
  '우주는 당신의 노력을 기억하고 있습니다',
  '오늘 만난 우연은 우연이 아닐지도 모릅니다',
  '바람의 방향이 당신 편으로 바뀌는 중입니다',
  '큰 흐름이 당신을 좋은 곳으로 이끌고 있습니다',
  '잠시의 시련은 더 큰 도약을 위한 준비입니다',
  '오늘의 첫 미소가 그날 하루의 운을 결정합니다',
  '평소와 다른 길로 한 번 가보세요',
  '거울 속 자신에게 친절히 말해보세요',
  '오늘은 평소 미뤄둔 일 하나를 끝내기 좋은 날',
  '잠들기 전 감사한 일 세 가지를 떠올려보세요'
];

const FORTUNE_COOKIE_MESSAGES_EN = [
  'The thing you hesitate over — now is the right time',
  'The person closest to you will be your greatest help',
  "Don't forget the thought that came to you today — write it down",
  'The answer you seek is already within your heart',
  'One more attempt and the closed door will open',
  'Opportunity is delayed by exactly the time you delay your decision',
  "Today's choice will make you a year from now",
  'Within 7 days, good news will arrive from an unexpected person',
  'Forgiveness is not for the other person — it is for you',
  'Reach out first to someone you have not spoken to in a while',
  'Someone who genuinely supports you is by your side',
  'A precious connection arrives quietly',
  "Do not let pass the words of someone you meet today",
  'The energy of fortune enters from an unexpected place',
  'Small thrift summons great abundance',
  'When spending today, think one more time',
  'Your effort will bear fruit within six months at the latest',
  'A small piece of information nearby leads to a great opportunity',
  '80% of worries never actually happen',
  'A time of change is coming — do not be afraid',
  'You are stronger than you think',
  "Today's small kindness returns as tomorrow's great fortune",
  'Resting is also a step forward',
  'Let the past pass — focus on the present',
  'You are enough, even when not perfect',
  'Spend your time on what brings you the most joy',
  'A lucky star is aligning above you',
  'The universe remembers your effort',
  'The coincidence you met today may not be a coincidence',
  'The wind is shifting in your direction',
  'A great current is carrying you to a good place',
  'A momentary trial is preparation for a greater leap',
  "The first smile of the day decides that day's fortune",
  'Try a different route than usual today',
  'Speak kindly to yourself in the mirror',
  'Today is a good day to finish that one thing you have been postponing',
  'Before sleeping, recall three things you are grateful for'
];

const COOKIE_LUCKY_COLORS_KO = [
  '황금색', '진홍색', '청록색', '깊은 자색', '은은한 분홍',
  '깊은 군청', '연한 살구색', '맑은 하늘색', '풀빛 녹색', '따뜻한 갈색'
];

const COOKIE_LUCKY_COLORS_EN = [
  'Gold', 'Crimson', 'Teal', 'Deep violet', 'Soft pink',
  'Deep navy', 'Pale apricot', 'Clear sky blue', 'Grassy green', 'Warm brown'
];

export const FORTUNE_COOKIE_MESSAGES = FORTUNE_COOKIE_MESSAGES_KO; // 하위 호환
export const COOKIE_LUCKY_COLORS = COOKIE_LUCKY_COLORS_KO; // 하위 호환

export function pickRandomFortune(lastFortune = '', locale = 'ko') {
  const pool = locale === 'en' ? FORTUNE_COOKIE_MESSAGES_EN : FORTUNE_COOKIE_MESSAGES_KO;
  let next;
  do {
    next = pool[Math.floor(Math.random() * pool.length)];
  } while (next === lastFortune && pool.length > 1);
  return next;
}

export function pickRandomColor(locale = 'ko') {
  const pool = locale === 'en' ? COOKIE_LUCKY_COLORS_EN : COOKIE_LUCKY_COLORS_KO;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function pickRandomNumber() {
  return Math.floor(Math.random() * 99) + 1;
}
