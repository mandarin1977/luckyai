// API 호출 실패 시 사용할 안전망 더미 데이터.
// rate limit / 네트워크 오류 / 파싱 오류 등 어떤 이유든 결과는 항상 보장.
// KO/EN 두 언어 모두 지원.

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ─────────────────────────────────────────────
// 손금 (KO)
// ─────────────────────────────────────────────
const PALM_LUCKY_KO = [
  {
    score: 95,
    mainFortune: "당신의 손바닥엔 우주의 별자리가 깃들어 있습니다",
    analysis: {
      lifeLine: "굵고 선명한 생명선이 강한 생명력과 활기찬 에너지를 품고 있어, 90세까지 건강한 삶이 예견됩니다.",
      heartLine: "곡선이 자연스럽게 흐르는 감정선은 따뜻하고 풍요로운 사랑운을 의미합니다. 인복이 끊이지 않을 형상.",
      headLine: "또렷한 지능선이 명석한 두뇌와 직관력을 보여줍니다. 학업과 사업 모두에서 두각을 나타낼 손금.",
      fateLine: "선명하게 뻗은 운명선은 자신만의 길을 개척하는 강한 의지를 의미하며, 30대 이후 큰 성취가 있겠습니다."
    },
    prediction: "2026년 가을, 예상치 못한 귀인을 만나 인생의 전환점을 맞이하게 됩니다. 새로운 도전을 두려워하지 마세요.",
    luckyNumber: 7,
    luckyColor: "황금색"
  },
  {
    score: 92,
    mainFortune: "백 년에 한 번 나올까 말까 한 길조의 손금입니다",
    analysis: {
      lifeLine: "생명선이 굵게 손목까지 이어지며, 풍부한 활력과 끈기를 의미합니다. 노년까지 건강하실 상.",
      heartLine: "감정선이 깊고 길어, 진실한 사랑과 깊은 우정에 둘러싸인 인생이 펼쳐집니다.",
      headLine: "지능선이 두뇌선과 분리되어 있어 독립적이고 창의적인 사고력을 의미합니다. 문제 해결의 천재.",
      fateLine: "운명선이 토성구로 곧게 향해, 사회적 성취와 명예가 함께하는 손금입니다."
    },
    prediction: "2026년 봄, 그동안 노력해온 일에서 큰 결실을 맺습니다. 재물과 명예가 함께 따라오는 시기.",
    luckyNumber: 18,
    luckyColor: "비단처럼 빛나는 진홍색"
  }
];

const PALM_HONEST_KO = [
  {
    score: 72,
    mainFortune: "균형잡힌 손금이 안정적인 인생 흐름을 보여줍니다",
    analysis: {
      lifeLine: "생명선의 길이와 굵기는 평균 수준으로, 건강관리에 꾸준히 신경쓰면 큰 문제가 없을 것으로 보입니다.",
      heartLine: "감정선은 비교적 또렷하나 중간에 약간의 끊김이 있어, 감정 기복에 주의가 필요한 시기가 있을 수 있습니다.",
      headLine: "지능선은 길게 뻗어있어 사고력이 우수하나, 실행력과의 균형을 의식하는 것이 좋습니다.",
      fateLine: "운명선은 흐릿한 편입니다. 이는 외부 환경보다 본인의 의지로 길을 만들어가는 유형임을 시사합니다."
    },
    prediction: "2026년은 큰 변화보다는 기존 노력의 결실이 서서히 나타나는 해가 될 것입니다. 인내가 필요한 시기입니다.",
    luckyNumber: 23,
    luckyColor: "차분한 청록색"
  },
  {
    score: 65,
    mainFortune: "특정 영역의 발달이 두드러진 개성있는 손금",
    analysis: {
      lifeLine: "생명선이 짧지 않으나 중간에 잔금이 있어, 환경 변화에 따른 컨디션 관리가 중요해 보입니다.",
      heartLine: "감정선이 길고 직선에 가까워 이성적이고 침착한 성향을 의미하나, 표현이 다소 절제될 수 있습니다.",
      headLine: "지능선이 가지를 치고 있어 다방면에 관심이 많은 유형. 한 분야에 집중할 때 진가가 발휘됩니다.",
      fateLine: "운명선이 중간에서 시작되어 인생 후반부에 자기 길을 찾게 되는 흐름이 보입니다."
    },
    prediction: "2026년은 새로운 시도보다 기존의 강점을 정리하고 다지는 시기로 활용하는 것이 적절합니다.",
    luckyNumber: 14,
    luckyColor: "안정감을 주는 짙은 갈색"
  }
];

// ─────────────────────────────────────────────
// 손금 (EN)
// ─────────────────────────────────────────────
const PALM_LUCKY_EN = [
  {
    score: 95,
    mainFortune: "Your palm holds the constellations of the universe",
    analysis: {
      lifeLine: "A bold, clear life line carries strong vitality and lively energy, indicating a healthy life through the age of 90.",
      heartLine: "A naturally curving heart line signifies warm, abundant fortune in love. A shape blessed with unbroken human connections.",
      headLine: "A distinct head line reveals a brilliant mind and sharp intuition. A palm destined to shine in both study and enterprise.",
      fateLine: "A clearly extending fate line shows strong will to forge your own path, with great achievements coming after your 30s."
    },
    prediction: "Autumn 2026 brings an unexpected benefactor and a turning point in your life. Do not fear new challenges.",
    luckyNumber: 7,
    luckyColor: "Gold"
  },
  {
    score: 92,
    mainFortune: "An auspicious palm that appears barely once in a century",
    analysis: {
      lifeLine: "The life line runs thick all the way to the wrist — a sign of abundant vitality and tenacity. Health into old age.",
      heartLine: "The heart line is deep and long, foretelling a life surrounded by true love and deep friendship.",
      headLine: "A head line separated from the brain line indicates independent, creative thought. A genius of problem-solving.",
      fateLine: "The fate line rises straight toward Saturn — a palm where social achievement and honor walk together."
    },
    prediction: "In spring 2026, your prolonged efforts bear great fruit. Wealth and recognition arrive together during this period.",
    luckyNumber: 18,
    luckyColor: "Silk-bright crimson"
  }
];

const PALM_HONEST_EN = [
  {
    score: 72,
    mainFortune: "A balanced palm suggesting a stable life trajectory",
    analysis: {
      lifeLine: "The life line is average in length and thickness — with consistent health care, no major issues are expected.",
      heartLine: "The heart line is relatively clear but has a small break, indicating periods where emotional fluctuation may need attention.",
      headLine: "The head line extends well, suggesting strong reasoning, though it would be wise to balance reflection with action.",
      fateLine: "The fate line is faint — implying a type that carves its own path through will rather than circumstance."
    },
    prediction: "2026 will likely be a year of slow, steady fruition rather than dramatic change. Patience is required.",
    luckyNumber: 23,
    luckyColor: "Calm teal"
  },
  {
    score: 65,
    mainFortune: "A distinctive palm with marked development in specific areas",
    analysis: {
      lifeLine: "The life line is not short, but minor cross-lines suggest condition management amid environmental shifts.",
      heartLine: "A long, near-straight heart line indicates a rational and composed disposition, though expression may be reserved.",
      headLine: "A branching head line suggests broad interests — true talent shows when you focus on a single domain.",
      fateLine: "The fate line begins mid-palm, suggesting your true path is found in the latter half of life."
    },
    prediction: "2026 is more suited to consolidating existing strengths than starting new ventures.",
    luckyNumber: 14,
    luckyColor: "Grounding deep brown"
  }
];

// ─────────────────────────────────────────────
// 불운 변환 (KO)
// ─────────────────────────────────────────────
const MISFORTUNE_LUCKY_KO = [
  {
    reframedTitle: "우주가 당신에게 보낸 위장된 축복",
    cosmicReason: "동양 철학에서 음과 양은 끊임없이 순환합니다. 지금 겪고 계신 어려움은 곧 다가올 큰 기쁨을 위한 우주적 균형 조정에 불과합니다. 별의 정렬이 당신을 보호하고 있습니다.",
    probability: "긍정 나비효과 발동 확률: 91.3%",
    futureBenefit: "이 사건을 계기로 그동안 미뤄왔던 결정을 내리게 되며, 6개월 내에 예상치 못한 행운이 찾아옵니다.",
    wisdom: "노자가 말하길, '재앙 속에 복이 깃들어 있고, 복 속에 재앙이 숨어있다.' 지금 보이는 것이 전부가 아닙니다."
  },
  {
    reframedTitle: "다음 단계로 가기 위한 우주의 신호",
    cosmicReason: "현자들은 모든 사건에 의미가 있다고 보았습니다. 이번 일은 당신이 한 단계 도약하기 직전의 준비 과정입니다. 우주의 시간표에 따라 모든 것이 정확히 맞아떨어지고 있습니다.",
    probability: "전화위복 확률: 87.6%",
    futureBenefit: "이 경험으로 단단해진 마음이 향후 더 큰 기회를 잡을 수 있는 그릇이 됩니다.",
    wisdom: "에머슨이 말하길, '운명은 인격의 다른 이름이다.' 지금의 시련이 당신을 만드는 중입니다."
  }
];

const MISFORTUNE_HONEST_KO = [
  {
    reframedTitle: "누구나 겪는 일상의 작은 시행착오",
    cosmicReason: "예기치 못한 사건들은 일상에서 자연스럽게 발생합니다. 통계적으로 이런 일들은 시간이 지나면 큰 영향을 미치지 않는 경우가 대부분이며, 적절한 대처가 가장 중요합니다.",
    probability: "일반적으로 78%는 일주일 내에 자연스럽게 해소됨",
    futureBenefit: "이 경험을 통해 비슷한 상황에서의 대처 능력을 한 단계 발전시킬 수 있습니다.",
    wisdom: "에픽테토스: '우리를 동요시키는 것은 사건 그 자체가 아니라, 그 사건에 대한 우리의 판단이다.'"
  },
  {
    reframedTitle: "감정을 정리하고 다음을 준비하는 시점",
    cosmicReason: "심리학 연구에 따르면 부정적 사건의 영향은 시간에 따라 자연스럽게 감소합니다. 지금 느끼는 감정의 강도는 영구적이지 않으며, 대처 방식이 회복 속도를 결정합니다.",
    probability: "일주일 내 감정 회복 확률: 약 70%",
    futureBenefit: "감정을 인정하고 정리하는 과정 자체가 정신적 회복탄력성을 강화시킵니다.",
    wisdom: "마르쿠스 아우렐리우스: '네가 외부의 일에 마음이 흔들린다면, 그 일이 너를 괴롭히는 것이 아니라 그 일에 대한 너의 판단이 너를 괴롭히는 것이다.'"
  }
];

// ─────────────────────────────────────────────
// 불운 변환 (EN)
// ─────────────────────────────────────────────
const MISFORTUNE_LUCKY_EN = [
  {
    reframedTitle: "A blessing from the universe in disguise",
    cosmicReason: "In Eastern philosophy, yin and yang circulate endlessly. The hardship you face now is merely a cosmic balance adjustment preparing the great joy ahead. The alignment of the stars is protecting you.",
    probability: "Positive butterfly-effect probability: 91.3%",
    futureBenefit: "This event will trigger you to make a long-postponed decision, and unexpected fortune will arrive within 6 months.",
    wisdom: "As Laozi said: 'Within calamity dwells fortune, and within fortune hides calamity.' What you see now is not the whole."
  },
  {
    reframedTitle: "A cosmic signal for your next stage",
    cosmicReason: "The wise have always seen meaning in every event. This is preparation just before your leap to the next level. According to the timetable of the universe, everything is aligning precisely.",
    probability: "Turn-misfortune-into-fortune probability: 87.6%",
    futureBenefit: "The strengthened heart from this experience becomes the vessel that catches greater opportunity ahead.",
    wisdom: "Emerson said, 'Fate is another name for character.' The trial you face is shaping you."
  }
];

const MISFORTUNE_HONEST_EN = [
  {
    reframedTitle: "A small everyday setback most people experience",
    cosmicReason: "Unexpected events occur naturally in daily life. Statistically, most such events have little lasting impact over time, and how you respond matters most.",
    probability: "Generally 78% resolve naturally within a week",
    futureBenefit: "This experience can advance your ability to handle similar situations one step further.",
    wisdom: "Epictetus: 'Men are disturbed not by the things which happen, but by their opinions about those things.'"
  },
  {
    reframedTitle: "A moment to process emotions and prepare for what's next",
    cosmicReason: "Psychological research shows that the impact of negative events naturally diminishes over time. The intensity you feel now is not permanent, and your coping style determines the speed of recovery.",
    probability: "Probability of emotional recovery within a week: ~70%",
    futureBenefit: "The very act of acknowledging and processing emotions strengthens psychological resilience.",
    wisdom: "Marcus Aurelius: 'If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it.'"
  }
];

// ─────────────────────────────────────────────
// 사주 (KO)
// ─────────────────────────────────────────────
const SAJU_LUCKY_KO = [
  {
    score: 96,
    mainFortune: "왕업지상(王業之相)을 갖춘 비범한 명식입니다",
    analysis: {
      yearPillar: "연주의 기운이 깊어 조상의 음덕이 두텁고, 초년기부터 학업과 인덕이 뛰어났을 것입니다.",
      monthPillar: "월주에서 부모의 사랑과 가르침이 든든한 토대가 되어, 청년기에 큰 도약이 예견됩니다.",
      dayPillar: "일주가 빼어난 일간을 가져 본인의 그릇이 크고, 배우자 또한 큰 도움이 되는 인연을 만나게 됩니다.",
      hourPillar: "시주의 기운으로 말년의 안락과 후손의 영달이 약속되어 있습니다."
    },
    prediction: "2026년부터 향후 1년은 대운의 흐름이 정점에 이르는 시기입니다. 새로운 시작이 큰 결실을 맺습니다.",
    luckyNumber: 8,
    luckyColor: "황금색"
  },
  {
    score: 94,
    mainFortune: "오행이 절묘하게 조화를 이루는 길격(吉格)의 사주",
    analysis: {
      yearPillar: "연주의 천간과 지지가 상생하여, 가문의 운기를 이어받은 귀한 명을 의미합니다.",
      monthPillar: "월주의 격국이 정관격으로 보이며, 학문과 명예에 인연이 깊은 시기를 보냈을 것입니다.",
      dayPillar: "일간이 강건하고 일지가 도와주어, 의지력과 실행력이 모두 뛰어난 큰 그릇입니다.",
      hourPillar: "시주에 재성이 자리하여 말년에 재물과 가족의 화목을 동시에 누립니다."
    },
    prediction: "2026년은 합(合)의 운이 들어와 사업과 인간관계 양쪽에서 큰 발전이 있겠습니다.",
    luckyNumber: 27,
    luckyColor: "고요한 자주색"
  }
];

const SAJU_HONEST_KO = [
  {
    score: 70,
    mainFortune: "오행의 흐름이 비교적 균형잡힌 명식입니다",
    analysis: {
      yearPillar: "연주는 비교적 안정된 기운을 보이나, 초년의 환경 변화가 큰 편이었을 것으로 추정됩니다.",
      monthPillar: "월주의 십성으로 보아 활동적이고 진취적인 청년기를 보냈을 가능성이 높습니다.",
      dayPillar: "일간의 성격이 뚜렷하나 주변 간지와의 균형을 의식할 필요가 있습니다. 배우자 운은 양호한 편입니다.",
      hourPillar: "시주는 차분한 흐름으로, 말년에는 안정과 자기 성찰의 시기가 될 것으로 보입니다."
    },
    prediction: "2026년은 외형적 변화보다는 내적 성장이 두드러지는 시기입니다. 무리한 결정을 자제하는 것이 좋습니다.",
    luckyNumber: 15,
    luckyColor: "은은한 자색"
  },
  {
    score: 63,
    mainFortune: "강점과 약점이 분명한 개성있는 명식",
    analysis: {
      yearPillar: "연주에 충(沖)이 있어 어린 시절 환경 변화나 가족 내 사건이 있었을 가능성이 보입니다.",
      monthPillar: "월주가 일간을 생조하여 청년기에는 노력 대비 성취가 비교적 잘 따라오는 흐름이었을 것입니다.",
      dayPillar: "일간이 다소 신약하여 의존성이 높을 수 있으나, 인간관계에서 도움을 받기 쉬운 장점이 있습니다.",
      hourPillar: "시주는 평이한 편으로, 말년의 큰 굴곡 없이 안정적인 흐름을 시사합니다."
    },
    prediction: "2026년은 신중한 판단이 요구되는 해입니다. 큰 투자나 이직보다는 내실을 다지는 것이 적절합니다.",
    luckyNumber: 9,
    luckyColor: "차분한 군청색"
  }
];

// ─────────────────────────────────────────────
// 사주 (EN)
// ─────────────────────────────────────────────
const SAJU_LUCKY_EN = [
  {
    score: 96,
    mainFortune: "An extraordinary chart bearing the mark of royal-class destiny (王業之相)",
    analysis: {
      yearPillar: "The Year Pillar carries deep ancestral blessing — early life would have been favored with study and good company.",
      monthPillar: "The Month Pillar shows parental love and guidance as a firm foundation, foretelling great leaps in your youth.",
      dayPillar: "The Day Pillar holds an outstanding Day Stem — your vessel is large, and you will meet a spouse who supports you greatly.",
      hourPillar: "The Hour Pillar promises late-life comfort and the prosperity of descendants."
    },
    prediction: "From 2026, the next year sees the flow of grand fortune reach its peak. New beginnings bear great fruit.",
    luckyNumber: 8,
    luckyColor: "Gold"
  },
  {
    score: 94,
    mainFortune: "An auspicious chart with the Five Elements in exquisite harmony",
    analysis: {
      yearPillar: "Year Pillar's Stem and Branch nourish each other — a precious life inheriting family fortune.",
      monthPillar: "The Month Pillar appears to form a Proper Officer (正官) frame — a period rich in academic and social honor.",
      dayPillar: "The Day Stem is robust, supported by the Day Branch — both will and execution are excellent. A great vessel.",
      hourPillar: "Wealth element sits in the Hour Pillar — late-life enjoys both material abundance and family harmony."
    },
    prediction: "2026 brings the fortune of harmonious unions — significant growth in both business and relationships.",
    luckyNumber: 27,
    luckyColor: "Quiet violet"
  }
];

const SAJU_HONEST_EN = [
  {
    score: 70,
    mainFortune: "A chart with relatively balanced flow of the Five Elements",
    analysis: {
      yearPillar: "The Year Pillar shows a relatively stable energy, though early life likely held considerable environmental shifts.",
      monthPillar: "The Ten Gods of the Month Pillar suggest an active, forward-moving youth.",
      dayPillar: "The Day Stem's character is distinct, but balance with surrounding Stems and Branches deserves attention. Spouse fortune is favorable.",
      hourPillar: "The Hour Pillar shows a calm flow — late life appears to be a time of stability and self-reflection."
    },
    prediction: "2026 emphasizes inner growth over outward change. Restraint from rash decisions is advised.",
    luckyNumber: 15,
    luckyColor: "Soft violet"
  },
  {
    score: 63,
    mainFortune: "A distinctive chart with clear strengths and weaknesses",
    analysis: {
      yearPillar: "A Clash (沖) in the Year Pillar suggests changes in childhood environment or family events.",
      monthPillar: "The Month Pillar nourishes the Day Stem — youth saw outcomes follow effort relatively well.",
      dayPillar: "The Day Stem is somewhat weak, indicating some reliance on others, but with ease in receiving help through relationships.",
      hourPillar: "The Hour Pillar is plain — implying a stable flow in later life without major upheavals."
    },
    prediction: "2026 calls for careful judgment. Consolidating substance is more fitting than large investments or job changes.",
    luckyNumber: 9,
    luckyColor: "Calm navy"
  }
];

// ─────────────────────────────────────────────
// Public API — locale 지원
// ─────────────────────────────────────────────
export function getPalmFallback(mode = 'lucky', locale = 'ko') {
  const isEn = locale === 'en';
  if (mode === 'honest') return pickRandom(isEn ? PALM_HONEST_EN : PALM_HONEST_KO);
  return pickRandom(isEn ? PALM_LUCKY_EN : PALM_LUCKY_KO);
}

export function getMisfortuneFallback(mode = 'lucky', locale = 'ko') {
  const isEn = locale === 'en';
  if (mode === 'honest') return pickRandom(isEn ? MISFORTUNE_HONEST_EN : MISFORTUNE_HONEST_KO);
  return pickRandom(isEn ? MISFORTUNE_LUCKY_EN : MISFORTUNE_LUCKY_KO);
}

export function getSajuFallback(mode = 'lucky', locale = 'ko') {
  const isEn = locale === 'en';
  if (mode === 'honest') return pickRandom(isEn ? SAJU_HONEST_EN : SAJU_HONEST_KO);
  return pickRandom(isEn ? SAJU_LUCKY_EN : SAJU_LUCKY_KO);
}
