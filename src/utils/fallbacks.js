// API 호출 실패 시 사용할 안전망 더미 데이터.
// rate limit / 네트워크 오류 / 파싱 오류 등 어떤 이유든 결과는 항상 보장.
// KO/EN 두 언어 모두 지원. 각 카테고리 5종 변형으로 다양성 확보.

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ─────────────────────────────────────────────
// 손금 (KO)
// ─────────────────────────────────────────────
const PALM_LUCKY_KO = [
  {
    score: 95,
    mainFortune: '당신의 손바닥엔 우주의 별자리가 깃들어 있습니다',
    analysis: {
      lifeLine: '굵고 선명한 생명선이 강한 생명력과 활기찬 에너지를 품고 있어, 90세까지 건강한 삶이 예견됩니다.',
      heartLine: '곡선이 자연스럽게 흐르는 감정선은 따뜻하고 풍요로운 사랑운을 의미합니다. 인복이 끊이지 않을 형상.',
      headLine: '또렷한 지능선이 명석한 두뇌와 직관력을 보여줍니다. 학업과 사업 모두에서 두각을 나타낼 손금.',
      fateLine: '선명하게 뻗은 운명선은 자신만의 길을 개척하는 강한 의지를 의미하며, 30대 이후 큰 성취가 있겠습니다.'
    },
    prediction: '2026년 가을, 예상치 못한 귀인을 만나 인생의 전환점을 맞이하게 됩니다. 새로운 도전을 두려워하지 마세요.',
    luckyNumber: 7,
    luckyColor: '황금색'
  },
  {
    score: 92,
    mainFortune: '백 년에 한 번 나올까 말까 한 길조의 손금입니다',
    analysis: {
      lifeLine: '생명선이 굵게 손목까지 이어지며, 풍부한 활력과 끈기를 의미합니다. 노년까지 건강하실 상.',
      heartLine: '감정선이 깊고 길어, 진실한 사랑과 깊은 우정에 둘러싸인 인생이 펼쳐집니다.',
      headLine: '지능선이 두뇌선과 분리되어 있어 독립적이고 창의적인 사고력을 의미합니다. 문제 해결의 천재.',
      fateLine: '운명선이 토성구로 곧게 향해, 사회적 성취와 명예가 함께하는 손금입니다.'
    },
    prediction: '2026년 봄, 그동안 노력해온 일에서 큰 결실을 맺습니다. 재물과 명예가 함께 따라오는 시기.',
    luckyNumber: 18,
    luckyColor: '비단처럼 빛나는 진홍색'
  },
  {
    score: 97,
    mainFortune: '손바닥에 만개한 행운의 꽃, 만사형통의 상',
    analysis: {
      lifeLine: '생명선이 부드럽게 뻗으며 분기가 많아 다재다능한 인생을 의미합니다. 경험이 자산이 되는 형상.',
      heartLine: '감정선이 두 갈래로 갈라져 있어, 가족과 사회 양쪽에서 두루 사랑받는 운을 보입니다.',
      headLine: '지능선이 길고 휘어 있어 예술적 감각과 분석력을 모두 갖춘 만능형. 표현력의 천재.',
      fateLine: '운명선이 손목 깊은 곳에서 시작되어 평생에 걸쳐 자신만의 영역을 구축하는 손금입니다.'
    },
    prediction: '2026년 여름, 그동안 쌓아온 인맥이 결실로 이어집니다. 작은 인연이 큰 기회로 변하는 시기.',
    luckyNumber: 33,
    luckyColor: '눈부신 백금색'
  },
  {
    score: 89,
    mainFortune: '귀인이 다섯 명, 평생 외롭지 않은 인복의 손금',
    analysis: {
      lifeLine: '생명선이 굴곡 없이 매끄러워 평탄하고 안정된 인생 흐름을 의미합니다.',
      heartLine: '감정선이 적당히 길고 곡선이 우아하여, 따뜻한 가정을 이루는 상.',
      headLine: '지능선이 단단하게 뻗어 신중한 판단력을 보여줍니다. 신뢰받는 리더의 손금.',
      fateLine: '운명선이 중앙으로 곧게 올라가, 본인의 노력으로 이루는 성공이 약속되어 있습니다.'
    },
    prediction: '2026년 초, 새로운 사람과의 만남이 운명적인 인연으로 발전합니다.',
    luckyNumber: 5,
    luckyColor: '봄날의 연두색'
  },
  {
    score: 94,
    mainFortune: '재물의 강이 손바닥을 따라 흐르는 형상',
    analysis: {
      lifeLine: '생명선이 두툼하게 형성되어 있어 강한 체력과 회복력을 의미합니다.',
      heartLine: '감정선의 끝이 위로 향해, 적극적이고 긍정적인 연애운이 보입니다.',
      headLine: '지능선이 명료하게 끝맺어 결단력이 빠르고 정확한 사람.',
      fateLine: '운명선에 분지선이 보여 다양한 수입원이 형성되는 형상입니다.'
    },
    prediction: '2026년 9월경, 부수입의 기회가 자연스럽게 찾아옵니다. 작은 시도가 큰 보상으로.',
    luckyNumber: 21,
    luckyColor: '가을 황혼의 호박색'
  }
];

const PALM_HONEST_KO = [
  {
    score: 72,
    mainFortune: '균형잡힌 손금이 안정적인 인생 흐름을 보여줍니다',
    analysis: {
      lifeLine: '생명선의 길이와 굵기는 평균 수준으로, 건강관리에 꾸준히 신경쓰면 큰 문제가 없을 것으로 보입니다.',
      heartLine: '감정선은 비교적 또렷하나 중간에 약간의 끊김이 있어, 감정 기복에 주의가 필요한 시기가 있을 수 있습니다.',
      headLine: '지능선은 길게 뻗어있어 사고력이 우수하나, 실행력과의 균형을 의식하는 것이 좋습니다.',
      fateLine: '운명선은 흐릿한 편입니다. 이는 외부 환경보다 본인의 의지로 길을 만들어가는 유형임을 시사합니다.'
    },
    prediction: '2026년은 큰 변화보다는 기존 노력의 결실이 서서히 나타나는 해가 될 것입니다. 인내가 필요한 시기입니다.',
    luckyNumber: 23,
    luckyColor: '차분한 청록색'
  },
  {
    score: 65,
    mainFortune: '특정 영역의 발달이 두드러진 개성있는 손금',
    analysis: {
      lifeLine: '생명선이 짧지 않으나 중간에 잔금이 있어, 환경 변화에 따른 컨디션 관리가 중요해 보입니다.',
      heartLine: '감정선이 길고 직선에 가까워 이성적이고 침착한 성향을 의미하나, 표현이 다소 절제될 수 있습니다.',
      headLine: '지능선이 가지를 치고 있어 다방면에 관심이 많은 유형. 한 분야에 집중할 때 진가가 발휘됩니다.',
      fateLine: '운명선이 중간에서 시작되어 인생 후반부에 자기 길을 찾게 되는 흐름이 보입니다.'
    },
    prediction: '2026년은 새로운 시도보다 기존의 강점을 정리하고 다지는 시기로 활용하는 것이 적절합니다.',
    luckyNumber: 14,
    luckyColor: '안정감을 주는 짙은 갈색'
  },
  {
    score: 78,
    mainFortune: '주요 선들이 또렷한 비교적 양호한 손금',
    analysis: {
      lifeLine: '생명선이 손목 부근까지 명확히 이어지며, 체력과 회복력이 평균 이상으로 보입니다.',
      heartLine: '감정선의 출발점이 약간 낮은 편으로, 감정에 충실하나 때로 휘둘릴 수 있는 성향이 보입니다.',
      headLine: '지능선이 안정되게 직선으로 뻗어, 논리적 사고가 강점이며 충동적 판단은 적은 편입니다.',
      fateLine: '운명선은 또렷하나 약간의 잔금이 있어, 진로 선택에 작은 변동이 있을 수 있습니다.'
    },
    prediction: '2026년은 직장이나 학업에서 안정적 성장이 예상됩니다. 큰 도약보다는 꾸준함이 결과로 이어집니다.',
    luckyNumber: 11,
    luckyColor: '담담한 회녹색'
  },
  {
    score: 60,
    mainFortune: '강약이 뚜렷한 변화 많은 손금',
    analysis: {
      lifeLine: '생명선이 부분적으로 굵고 가늘어 변화에 민감한 체질로 추정됩니다. 컨디션 관리가 중요합니다.',
      heartLine: '감정선이 짧은 편으로, 사람과의 관계에서 거리감을 두려는 경향이 보입니다.',
      headLine: '지능선이 두뇌선과 일부 겹쳐 시작되어, 신중하지만 결정에 시간이 걸리는 유형입니다.',
      fateLine: '운명선이 군데군데 끊겨 있어, 인생에서 진로 변경이 몇 차례 있을 가능성이 보입니다.'
    },
    prediction: '2026년은 큰 결정을 내리기엔 다소 이른 시기입니다. 정보 수집과 관망이 적절합니다.',
    luckyNumber: 7,
    luckyColor: '차분한 베이지색'
  },
  {
    score: 75,
    mainFortune: '안정적이고 단정한 인상의 손금',
    analysis: {
      lifeLine: '생명선이 깔끔하게 호를 그리며, 별다른 굴곡 없이 무난한 인생 흐름이 예상됩니다.',
      heartLine: '감정선이 부드럽게 휘어 있어 따뜻한 성품이 드러납니다. 가족 관계가 인생의 축이 될 가능성.',
      headLine: '지능선이 완만하게 끝맺어, 협력적인 성향과 균형 감각이 강점입니다.',
      fateLine: '운명선이 비교적 곧게 뻗어 있어, 한 분야에서 꾸준히 자리잡는 유형으로 보입니다.'
    },
    prediction: '2026년은 안정과 신뢰 형성에 적합한 해입니다. 무리한 변화보다는 단단한 기반 다지기에 집중하세요.',
    luckyNumber: 8,
    luckyColor: '단정한 진남색'
  }
];

// ─────────────────────────────────────────────
// 손금 (EN)
// ─────────────────────────────────────────────
const PALM_LUCKY_EN = [
  {
    score: 95,
    mainFortune: 'Your palm holds the constellations of the universe',
    analysis: {
      lifeLine: 'A bold, clear life line carries strong vitality and lively energy, indicating a healthy life through the age of 90.',
      heartLine: 'A naturally curving heart line signifies warm, abundant fortune in love. A shape blessed with unbroken human connections.',
      headLine: 'A distinct head line reveals a brilliant mind and sharp intuition. A palm destined to shine in both study and enterprise.',
      fateLine: 'A clearly extending fate line shows strong will to forge your own path, with great achievements coming after your 30s.'
    },
    prediction: 'Autumn 2026 brings an unexpected benefactor and a turning point in your life. Do not fear new challenges.',
    luckyNumber: 7,
    luckyColor: 'Gold'
  },
  {
    score: 92,
    mainFortune: 'An auspicious palm that appears barely once in a century',
    analysis: {
      lifeLine: 'The life line runs thick all the way to the wrist — a sign of abundant vitality and tenacity. Health into old age.',
      heartLine: 'The heart line is deep and long, foretelling a life surrounded by true love and deep friendship.',
      headLine: 'A head line separated from the brain line indicates independent, creative thought. A genius of problem-solving.',
      fateLine: 'The fate line rises straight toward Saturn — a palm where social achievement and honor walk together.'
    },
    prediction: 'In spring 2026, your prolonged efforts bear great fruit. Wealth and recognition arrive together during this period.',
    luckyNumber: 18,
    luckyColor: 'Silk-bright crimson'
  },
  {
    score: 97,
    mainFortune: 'A flower of fortune in full bloom — a palm of universal prosperity',
    analysis: {
      lifeLine: 'The life line flows softly with many branches, indicating a versatile life. Experiences become assets.',
      heartLine: 'The heart line splits into two, suggesting affection from both family and society. Universally loved.',
      headLine: 'A long, curving head line shows both artistic sensibility and analytical power. A genius of expression.',
      fateLine: 'The fate line begins deep at the wrist — a palm that builds its own domain across an entire lifetime.'
    },
    prediction: 'Summer 2026 brings the harvest of your network. Small connections transform into major opportunities.',
    luckyNumber: 33,
    luckyColor: 'Brilliant platinum'
  },
  {
    score: 89,
    mainFortune: 'Five benefactors await — a palm never lonely in life',
    analysis: {
      lifeLine: 'The life line is smooth without bends, indicating an even, stable life flow.',
      heartLine: 'A moderately long, gracefully curved heart line — a sign of building a warm family.',
      headLine: 'A firmly extending head line shows careful judgment. A palm of a trusted leader.',
      fateLine: 'The fate line rises straight through the center — success built by your own effort is promised.'
    },
    prediction: 'Early 2026, an encounter with someone new develops into a fated connection.',
    luckyNumber: 5,
    luckyColor: 'Spring lime green'
  },
  {
    score: 94,
    mainFortune: 'A river of wealth flows along your palm',
    analysis: {
      lifeLine: 'A thick, well-formed life line indicates strong stamina and recovery.',
      heartLine: 'The heart line tilts upward at its end — proactive and positive in romance.',
      headLine: 'A clearly terminating head line shows quick, accurate decisiveness.',
      fateLine: 'Branching off the fate line suggests multiple income streams forming.'
    },
    prediction: 'Around September 2026, side-income opportunities arrive naturally. Small attempts bring large rewards.',
    luckyNumber: 21,
    luckyColor: 'Amber of autumn dusk'
  }
];

const PALM_HONEST_EN = [
  {
    score: 72,
    mainFortune: 'A balanced palm suggesting a stable life trajectory',
    analysis: {
      lifeLine: 'The life line is average in length and thickness — with consistent health care, no major issues are expected.',
      heartLine: 'The heart line is relatively clear but has a small break, indicating periods where emotional fluctuation may need attention.',
      headLine: 'The head line extends well, suggesting strong reasoning, though it would be wise to balance reflection with action.',
      fateLine: 'The fate line is faint — implying a type that carves its own path through will rather than circumstance.'
    },
    prediction: '2026 will likely be a year of slow, steady fruition rather than dramatic change. Patience is required.',
    luckyNumber: 23,
    luckyColor: 'Calm teal'
  },
  {
    score: 65,
    mainFortune: 'A distinctive palm with marked development in specific areas',
    analysis: {
      lifeLine: 'The life line is not short, but minor cross-lines suggest condition management amid environmental shifts.',
      heartLine: 'A long, near-straight heart line indicates a rational and composed disposition, though expression may be reserved.',
      headLine: 'A branching head line suggests broad interests — true talent shows when you focus on a single domain.',
      fateLine: 'The fate line begins mid-palm, suggesting your true path is found in the latter half of life.'
    },
    prediction: '2026 is more suited to consolidating existing strengths than starting new ventures.',
    luckyNumber: 14,
    luckyColor: 'Grounding deep brown'
  },
  {
    score: 78,
    mainFortune: 'A relatively favorable palm with clearly defined major lines',
    analysis: {
      lifeLine: 'The life line extends clearly to the wrist, suggesting above-average stamina and recovery.',
      heartLine: 'The heart line starts somewhat low, indicating loyalty to feelings but occasional susceptibility to being swayed.',
      headLine: 'A stable, straight head line shows logical thinking as a strength, with few impulsive decisions.',
      fateLine: 'The fate line is clear but with small cross-marks, hinting at minor career-path adjustments.'
    },
    prediction: '2026 suggests stable growth in work or studies. Consistency rather than dramatic leaps brings results.',
    luckyNumber: 11,
    luckyColor: 'Composed sage green'
  },
  {
    score: 60,
    mainFortune: 'A palm with marked variation — high contrast lines',
    analysis: {
      lifeLine: 'The life line varies in thickness, suggesting a constitution sensitive to change. Condition management matters.',
      heartLine: 'A shorter heart line suggests a tendency to keep some distance in interpersonal relations.',
      headLine: 'A head line partially overlapping with the life line indicates careful but slow decision-making.',
      fateLine: 'A fragmented fate line suggests a few possible career changes throughout life.'
    },
    prediction: '2026 may be early for major decisions. Information gathering and observation are appropriate.',
    luckyNumber: 7,
    luckyColor: 'Calm beige'
  },
  {
    score: 75,
    mainFortune: 'A neat and stable palm with composed character',
    analysis: {
      lifeLine: 'A cleanly arcing life line suggests a smooth life flow without major disruption.',
      heartLine: 'A softly curving heart line reveals warmth — family relationships likely become the axis of life.',
      headLine: 'A gently terminating head line indicates collaborative tendencies and a good sense of balance.',
      fateLine: 'A relatively straight fate line suggests a type that establishes itself steadily in one domain.'
    },
    prediction: '2026 is suited to building stability and trust. Focus on solidifying your foundation rather than pursuing change.',
    luckyNumber: 8,
    luckyColor: 'Composed deep blue'
  }
];

// ─────────────────────────────────────────────
// 불운 변환 (KO)
// ─────────────────────────────────────────────
const MISFORTUNE_LUCKY_KO = [
  {
    reframedTitle: '우주가 당신에게 보낸 위장된 축복',
    cosmicReason: '동양 철학에서 음과 양은 끊임없이 순환합니다. 지금 겪고 계신 어려움은 곧 다가올 큰 기쁨을 위한 우주적 균형 조정에 불과합니다. 별의 정렬이 당신을 보호하고 있습니다.',
    probability: '긍정 나비효과 발동 확률: 91.3%',
    futureBenefit: '이 사건을 계기로 그동안 미뤄왔던 결정을 내리게 되며, 6개월 내에 예상치 못한 행운이 찾아옵니다.',
    wisdom: "노자가 말하길, '재앙 속에 복이 깃들어 있고, 복 속에 재앙이 숨어있다.' 지금 보이는 것이 전부가 아닙니다."
  },
  {
    reframedTitle: '다음 단계로 가기 위한 우주의 신호',
    cosmicReason: '현자들은 모든 사건에 의미가 있다고 보았습니다. 이번 일은 당신이 한 단계 도약하기 직전의 준비 과정입니다. 우주의 시간표에 따라 모든 것이 정확히 맞아떨어지고 있습니다.',
    probability: '전화위복 확률: 87.6%',
    futureBenefit: '이 경험으로 단단해진 마음이 향후 더 큰 기회를 잡을 수 있는 그릇이 됩니다.',
    wisdom: "에머슨이 말하길, '운명은 인격의 다른 이름이다.' 지금의 시련이 당신을 만드는 중입니다."
  },
  {
    reframedTitle: '인생 시나리오의 깜짝 반전 장면',
    cosmicReason: '훌륭한 이야기에는 반드시 위기가 등장합니다. 우주는 당신의 이야기를 더 풍성하게 만들기 위해 이 장면을 배치한 것입니다. 클라이맥스가 임박했다는 신호입니다.',
    probability: '극적 반전 발생 확률: 93.4%',
    futureBenefit: '이 일을 회상할 때마다 당신은 미소짓게 될 것입니다. "그때 그 일이 없었다면 지금이 없었지"라고.',
    wisdom: "장자가 말하길, '잘못 보이는 것이 가장 잘된 것이다.' 작은 실수가 큰 흐름의 일부일 뿐입니다."
  },
  {
    reframedTitle: '하늘이 보낸 휴식 권고문',
    cosmicReason: '우주는 당신이 너무 빠르게 달려왔다고 판단하고, 잠시 쉬어가라는 신호를 보낸 것입니다. 이런 작은 사건은 보통 큰 번아웃을 막아주는 우주의 안전장치입니다.',
    probability: '회복 보너스 확률: 88.9%',
    futureBenefit: '이번 휴식기 동안 의외의 통찰을 얻게 되며, 다음 기회는 더 큰 그릇에 담깁니다.',
    wisdom: "공자가 말하길, '서두르면 도달하지 못한다.' 지금의 멈춤이 더 빠른 길을 열어줍니다."
  },
  {
    reframedTitle: '당신만 받는 우주 한정판 메시지',
    cosmicReason: '같은 사건이라도 누가 겪느냐에 따라 의미가 달라집니다. 이 일은 당신의 다음 챕터를 위해 정확히 당신에게 맞춰 보내진 메시지입니다. 우주는 결코 무작위로 일을 일으키지 않습니다.',
    probability: '맞춤형 길조 확률: 95.1%',
    futureBenefit: '이 경험은 당신에게만 의미가 있는 통찰로 변환되며, 향후 비슷한 상황에서 빛을 발합니다.',
    wisdom: "황금 사슬에 매여 있어도 자유롭다고 믿는 자가 진정 자유로운 자라. — 우주적 익명의 현자"
  }
];

const MISFORTUNE_HONEST_KO = [
  {
    reframedTitle: '누구나 겪는 일상의 작은 시행착오',
    cosmicReason: '예기치 못한 사건들은 일상에서 자연스럽게 발생합니다. 통계적으로 이런 일들은 시간이 지나면 큰 영향을 미치지 않는 경우가 대부분이며, 적절한 대처가 가장 중요합니다.',
    probability: '일반적으로 78%는 일주일 내에 자연스럽게 해소됨',
    futureBenefit: '이 경험을 통해 비슷한 상황에서의 대처 능력을 한 단계 발전시킬 수 있습니다.',
    wisdom: "에픽테토스: '우리를 동요시키는 것은 사건 그 자체가 아니라, 그 사건에 대한 우리의 판단이다.'"
  },
  {
    reframedTitle: '감정을 정리하고 다음을 준비하는 시점',
    cosmicReason: '심리학 연구에 따르면 부정적 사건의 영향은 시간에 따라 자연스럽게 감소합니다. 지금 느끼는 감정의 강도는 영구적이지 않으며, 대처 방식이 회복 속도를 결정합니다.',
    probability: '일주일 내 감정 회복 확률: 약 70%',
    futureBenefit: '감정을 인정하고 정리하는 과정 자체가 정신적 회복탄력성을 강화시킵니다.',
    wisdom: "마르쿠스 아우렐리우스: '네가 외부의 일에 마음이 흔들린다면, 그 일이 너를 괴롭히는 것이 아니라 그 일에 대한 너의 판단이 너를 괴롭히는 것이다.'"
  },
  {
    reframedTitle: '예상 가능한 범주의 일상적 변수',
    cosmicReason: '대부분의 일상 사건은 예측 가능한 통계적 분포 안에서 발생합니다. 이번 일도 그 분포의 일부이며, 본인의 통제 가능 영역과 그렇지 않은 영역을 구분하는 것이 핵심입니다.',
    probability: '본인 책임 비중: 약 30~40%',
    futureBenefit: '통제 가능한 부분에 집중하는 습관을 들이면, 비슷한 상황에서의 스트레스가 현저히 감소합니다.',
    wisdom: "스토아 학파의 핵심 격언: '내가 통제할 수 있는 것은 오직 내 반응뿐이다.'"
  },
  {
    reframedTitle: '단기적 불편함, 장기적으로는 미미',
    cosmicReason: '인간의 뇌는 부정적 경험을 단기적으로 과대평가하는 경향이 있습니다(부정성 편향). 6개월 후 돌아보면 이 사건은 기억에서 거의 사라져 있을 가능성이 높습니다.',
    probability: '6개월 후 기억 잔존율: 약 15%',
    futureBenefit: '시간이 가장 효과적인 처방인 경우가 많습니다. 무리한 즉각적 대응보다 자연스러운 흐름을 두는 것이 좋습니다.',
    wisdom: "칼 융: '우리가 느끼는 가장 큰 짐은 어제와 내일이다. 오늘만으로도 우리에게 충분하다.'"
  },
  {
    reframedTitle: '감정과 사실을 분리해서 볼 때',
    cosmicReason: '사건 자체와 사건에 대한 해석은 다른 영역입니다. 사실의 층위와 감정의 층위를 분리해 들여다보면, 실제 손실은 감정이 만들어낸 인상보다 작은 경우가 많습니다.',
    probability: '실제 객관적 영향: 약 25%',
    futureBenefit: '메타인지적 거리두기 훈련의 좋은 사례가 됩니다. 감정의 진폭이 클수록 학습 효과도 큽니다.',
    wisdom: "빅터 프랭클: '자극과 반응 사이에는 공간이 있다. 그 공간에 우리의 자유와 성장이 있다.'"
  }
];

// ─────────────────────────────────────────────
// 불운 변환 (EN)
// ─────────────────────────────────────────────
const MISFORTUNE_LUCKY_EN = [
  {
    reframedTitle: 'A blessing from the universe in disguise',
    cosmicReason: 'In Eastern philosophy, yin and yang circulate endlessly. The hardship you face now is merely a cosmic balance adjustment preparing the great joy ahead. The alignment of the stars is protecting you.',
    probability: 'Positive butterfly-effect probability: 91.3%',
    futureBenefit: 'This event will trigger you to make a long-postponed decision, and unexpected fortune will arrive within 6 months.',
    wisdom: "As Laozi said: 'Within calamity dwells fortune, and within fortune hides calamity.' What you see now is not the whole."
  },
  {
    reframedTitle: 'A cosmic signal for your next stage',
    cosmicReason: 'The wise have always seen meaning in every event. This is preparation just before your leap to the next level. According to the timetable of the universe, everything is aligning precisely.',
    probability: 'Turn-misfortune-into-fortune probability: 87.6%',
    futureBenefit: 'The strengthened heart from this experience becomes the vessel that catches greater opportunity ahead.',
    wisdom: "Emerson said, 'Fate is another name for character.' The trial you face is shaping you."
  },
  {
    reframedTitle: 'A surprise plot twist in the script of your life',
    cosmicReason: 'Every great story requires a crisis. The universe placed this scene to make your story richer. It is a sign that the climax is near.',
    probability: 'Dramatic-reversal probability: 93.4%',
    futureBenefit: "Whenever you recall this, you will smile and say: 'If that hadn't happened, today wouldn't be.'",
    wisdom: "Zhuangzi said, 'What appears mistaken is often most well-made.' A small slip is just part of a larger flow."
  },
  {
    reframedTitle: 'A heaven-sent recommendation for rest',
    cosmicReason: 'The cosmos judged you have been running too fast and sent a sign to pause. Such small events often act as cosmic safety devices preventing greater burnout.',
    probability: 'Recovery-bonus probability: 88.9%',
    futureBenefit: 'During this rest, you gain unexpected insight, and your next opportunity arrives in a larger vessel.',
    wisdom: "Confucius said, 'He who hastens does not arrive.' The pause now opens a faster path."
  },
  {
    reframedTitle: 'A cosmic limited-edition message — for you only',
    cosmicReason: 'Even the same event means different things depending on who experiences it. This event was tailored precisely for you, sent for your next chapter. The universe never acts at random.',
    probability: 'Personalized-fortune probability: 95.1%',
    futureBenefit: 'This experience converts into insight meaningful only to you, and shines bright in similar future situations.',
    wisdom: "'He who believes himself free even in golden chains is truly free.' — an anonymous cosmic sage"
  }
];

const MISFORTUNE_HONEST_EN = [
  {
    reframedTitle: 'A small everyday setback most people experience',
    cosmicReason: 'Unexpected events occur naturally in daily life. Statistically, most such events have little lasting impact over time, and how you respond matters most.',
    probability: 'Generally 78% resolve naturally within a week',
    futureBenefit: 'This experience can advance your ability to handle similar situations one step further.',
    wisdom: "Epictetus: 'Men are disturbed not by the things which happen, but by their opinions about those things.'"
  },
  {
    reframedTitle: 'A moment to process emotions and prepare for what is next',
    cosmicReason: 'Psychological research shows that the impact of negative events naturally diminishes over time. The intensity you feel now is not permanent, and your coping style determines the speed of recovery.',
    probability: 'Probability of emotional recovery within a week: ~70%',
    futureBenefit: 'The very act of acknowledging and processing emotions strengthens psychological resilience.',
    wisdom: "Marcus Aurelius: 'If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it.'"
  },
  {
    reframedTitle: 'An everyday variable within an expected range',
    cosmicReason: 'Most daily events occur within predictable statistical distributions. This event is part of that distribution; the key is to distinguish between what you can control and what you cannot.',
    probability: 'Personal responsibility weight: ~30–40%',
    futureBenefit: 'Building the habit of focusing on what you control significantly reduces stress in similar future situations.',
    wisdom: "A core Stoic maxim: 'The only thing I can control is my response.'"
  },
  {
    reframedTitle: 'Short-term inconvenience, long-term negligible',
    cosmicReason: 'The human brain tends to overweight negative experience in the short term (negativity bias). Looking back six months from now, this event will likely have nearly faded from memory.',
    probability: 'Memory-retention rate after 6 months: ~15%',
    futureBenefit: 'Time is often the most effective remedy. A natural pace tends to outperform forced immediate response.',
    wisdom: "Carl Jung: 'The greatest burden we carry is yesterday and tomorrow. Today alone is more than enough for us.'"
  },
  {
    reframedTitle: 'When emotion and fact are seen separately',
    cosmicReason: 'The event itself and the interpretation of the event belong to different layers. Looking through the layer of fact and the layer of emotion separately, the actual loss is often smaller than emotion suggests.',
    probability: 'Actual objective impact: ~25%',
    futureBenefit: 'A useful case for practicing meta-cognitive distance. The greater the emotional amplitude, the greater the learning.',
    wisdom: "Viktor Frankl: 'Between stimulus and response there is a space. In that space is our power to choose, and in that choice lies our growth.'"
  }
];

// ─────────────────────────────────────────────
// 사주 (KO)
// ─────────────────────────────────────────────
const SAJU_LUCKY_KO = [
  {
    score: 96,
    mainFortune: '왕업지상(王業之相)을 갖춘 비범한 명식입니다',
    analysis: {
      yearPillar: '연주의 기운이 깊어 조상의 음덕이 두텁고, 초년기부터 학업과 인덕이 뛰어났을 것입니다.',
      monthPillar: '월주에서 부모의 사랑과 가르침이 든든한 토대가 되어, 청년기에 큰 도약이 예견됩니다.',
      dayPillar: '일주가 빼어난 일간을 가져 본인의 그릇이 크고, 배우자 또한 큰 도움이 되는 인연을 만나게 됩니다.',
      hourPillar: '시주의 기운으로 말년의 안락과 후손의 영달이 약속되어 있습니다.'
    },
    prediction: '2026년부터 향후 1년은 대운의 흐름이 정점에 이르는 시기입니다. 새로운 시작이 큰 결실을 맺습니다.',
    luckyNumber: 8,
    luckyColor: '황금색'
  },
  {
    score: 94,
    mainFortune: '오행이 절묘하게 조화를 이루는 길격(吉格)의 사주',
    analysis: {
      yearPillar: '연주의 천간과 지지가 상생하여, 가문의 운기를 이어받은 귀한 명을 의미합니다.',
      monthPillar: '월주의 격국이 정관격으로 보이며, 학문과 명예에 인연이 깊은 시기를 보냈을 것입니다.',
      dayPillar: '일간이 강건하고 일지가 도와주어, 의지력과 실행력이 모두 뛰어난 큰 그릇입니다.',
      hourPillar: '시주에 재성이 자리하여 말년에 재물과 가족의 화목을 동시에 누립니다.'
    },
    prediction: '2026년은 합(合)의 운이 들어와 사업과 인간관계 양쪽에서 큰 발전이 있겠습니다.',
    luckyNumber: 27,
    luckyColor: '고요한 자주색'
  },
  {
    score: 98,
    mainFortune: '천을귀인이 함께하는 만세 길격의 명식',
    analysis: {
      yearPillar: '연주에 천을귀인이 자리하여, 어디를 가든 도와주는 인연이 따르는 인복의 명식입니다.',
      monthPillar: '월주의 인성이 강하게 작용하여 학문운과 자격운이 두루 좋습니다.',
      dayPillar: '일간이 봄철 양기에 힘입어 건록(建祿)으로 자리잡았으며, 자수성가의 상입니다.',
      hourPillar: '시주의 식상이 자녀운과 후학운으로 작용하여, 만년에 가르치는 자리가 자연스럽게 옵니다.'
    },
    prediction: '2026년은 큰 인연의 도래로 인생의 방향이 더욱 분명해지는 해입니다.',
    luckyNumber: 11,
    luckyColor: '천 년 묵은 비취색'
  },
  {
    score: 91,
    mainFortune: '문창귀인을 만난 학예(學藝)의 명식',
    analysis: {
      yearPillar: '연주에 문창귀인의 기운이 들어, 글과 예술에 일찍부터 두각을 나타냈을 것입니다.',
      monthPillar: '월주의 식신이 빛을 발해 표현력과 창작력이 평생의 자산이 됩니다.',
      dayPillar: '일주의 정관이 안정되어 사회적 신뢰가 두텁고, 자기 분야에서 인정받는 상.',
      hourPillar: '시주의 정인이 자리하여 말년에 후학을 양성하거나 명예로 이름을 남깁니다.'
    },
    prediction: '2026년은 본인의 작품·결과물이 외부에 알려지는 해입니다. 작은 발표 자리도 놓치지 마세요.',
    luckyNumber: 6,
    luckyColor: '먹빛이 깃든 청색'
  },
  {
    score: 93,
    mainFortune: '대길의 운로가 활짝 열리는 명식',
    analysis: {
      yearPillar: '연주의 정재가 든든해 가문의 재물 기반이 안정적이며, 그 음덕이 후대에 이어집니다.',
      monthPillar: '월주의 편관이 적절히 통제되어 추진력과 카리스마가 인생 전반의 강점이 됩니다.',
      dayPillar: '일주가 청수(淸秀)하여 고결한 인격과 깊은 통찰을 모두 갖춘 상.',
      hourPillar: '시주의 인수가 빛을 발해 후학과의 인연이 풍성한 말년이 약속됩니다.'
    },
    prediction: '2026년 하반기, 그동안 기다려온 자리가 자연스럽게 열립니다. 준비된 자에게 오는 기회.',
    luckyNumber: 19,
    luckyColor: '깊은 황토색'
  }
];

const SAJU_HONEST_KO = [
  {
    score: 70,
    mainFortune: '오행의 흐름이 비교적 균형잡힌 명식입니다',
    analysis: {
      yearPillar: '연주는 비교적 안정된 기운을 보이나, 초년의 환경 변화가 큰 편이었을 것으로 추정됩니다.',
      monthPillar: '월주의 십성으로 보아 활동적이고 진취적인 청년기를 보냈을 가능성이 높습니다.',
      dayPillar: '일간의 성격이 뚜렷하나 주변 간지와의 균형을 의식할 필요가 있습니다. 배우자 운은 양호한 편입니다.',
      hourPillar: '시주는 차분한 흐름으로, 말년에는 안정과 자기 성찰의 시기가 될 것으로 보입니다.'
    },
    prediction: '2026년은 외형적 변화보다는 내적 성장이 두드러지는 시기입니다. 무리한 결정을 자제하는 것이 좋습니다.',
    luckyNumber: 15,
    luckyColor: '은은한 자색'
  },
  {
    score: 63,
    mainFortune: '강점과 약점이 분명한 개성있는 명식',
    analysis: {
      yearPillar: '연주에 충(沖)이 있어 어린 시절 환경 변화나 가족 내 사건이 있었을 가능성이 보입니다.',
      monthPillar: '월주가 일간을 생조하여 청년기에는 노력 대비 성취가 비교적 잘 따라오는 흐름이었을 것입니다.',
      dayPillar: '일간이 다소 신약하여 의존성이 높을 수 있으나, 인간관계에서 도움을 받기 쉬운 장점이 있습니다.',
      hourPillar: '시주는 평이한 편으로, 말년의 큰 굴곡 없이 안정적인 흐름을 시사합니다.'
    },
    prediction: '2026년은 신중한 판단이 요구되는 해입니다. 큰 투자나 이직보다는 내실을 다지는 것이 적절합니다.',
    luckyNumber: 9,
    luckyColor: '차분한 군청색'
  },
  {
    score: 75,
    mainFortune: '비교적 안정된 격국을 갖춘 명식',
    analysis: {
      yearPillar: '연주의 천간과 지지가 자연스럽게 통기하여, 가족 분위기가 비교적 우호적이었을 것입니다.',
      monthPillar: '월주에 식신과 정관의 균형이 보여 사회 적응력이 좋고 갈등을 회피하는 경향이 있습니다.',
      dayPillar: '일간이 중화(中和)에 가까워 자기주장과 타협의 균형이 잡혀 있습니다. 배우자운은 무난한 편.',
      hourPillar: '시주의 기운이 약한 편으로, 자녀와의 관계에서 거리감이 있을 수 있으니 의식적인 노력이 도움됩니다.'
    },
    prediction: '2026년은 평이한 흐름이 예상됩니다. 큰 변화보다 점진적 개선에 시간을 투자하는 것이 적합합니다.',
    luckyNumber: 22,
    luckyColor: '차분한 모래색'
  },
  {
    score: 68,
    mainFortune: '특정 영역의 편중이 보이는 개성 강한 명식',
    analysis: {
      yearPillar: '연주에 비겁이 강하여 형제·동료와의 관계가 인생의 큰 축을 이룹니다.',
      monthPillar: '월주에 인성이 과다하여 결정 시 외부 의견에 휘둘리는 경향이 있을 수 있습니다.',
      dayPillar: '일간이 강하지만 재성이 다소 약해 재물 관리에 관한 학습이 필요한 명식.',
      hourPillar: '시주의 식상이 활성화되어 표현 욕구가 강하며, 창작·소통 분야에 잠재력이 있습니다.'
    },
    prediction: '2026년은 결정 권한을 남에게 양보하지 않는 것이 중요합니다. 본인의 직관을 믿는 연습이 필요합니다.',
    luckyNumber: 14,
    luckyColor: '바랜 진녹색'
  },
  {
    score: 72,
    mainFortune: '천간과 지지가 균형을 이루는 단정한 명식',
    analysis: {
      yearPillar: '연주의 정관이 자리하여 사회적 안정성과 책임감이 평생의 자산이 됩니다.',
      monthPillar: '월주의 격국이 큰 편차 없이 안정되어, 주변의 인정을 받는 흐름.',
      dayPillar: '일간이 청수하여 합리적 사고와 절제가 강점이며, 배우자 운은 평이한 편.',
      hourPillar: '시주의 인성이 자리하여 말년에 학문과 후학에 시간을 쓰는 흐름이 보입니다.'
    },
    prediction: '2026년은 본인의 안정된 기반 위에서 꾸준함을 증명하는 해가 될 것입니다.',
    luckyNumber: 4,
    luckyColor: '자연스러운 회청색'
  }
];

// ─────────────────────────────────────────────
// 사주 (EN)
// ─────────────────────────────────────────────
const SAJU_LUCKY_EN = [
  {
    score: 96,
    mainFortune: 'An extraordinary chart bearing the mark of royal-class destiny (王業之相)',
    analysis: {
      yearPillar: 'The Year Pillar carries deep ancestral blessing — early life would have been favored with study and good company.',
      monthPillar: 'The Month Pillar shows parental love and guidance as a firm foundation, foretelling great leaps in your youth.',
      dayPillar: 'The Day Pillar holds an outstanding Day Stem — your vessel is large, and you will meet a spouse who supports you greatly.',
      hourPillar: 'The Hour Pillar promises late-life comfort and the prosperity of descendants.'
    },
    prediction: 'From 2026, the next year sees the flow of grand fortune reach its peak. New beginnings bear great fruit.',
    luckyNumber: 8,
    luckyColor: 'Gold'
  },
  {
    score: 94,
    mainFortune: 'An auspicious chart with the Five Elements in exquisite harmony',
    analysis: {
      yearPillar: "Year Pillar's Stem and Branch nourish each other — a precious life inheriting family fortune.",
      monthPillar: 'The Month Pillar appears to form a Proper Officer (正官) frame — a period rich in academic and social honor.',
      dayPillar: 'The Day Stem is robust, supported by the Day Branch — both will and execution are excellent. A great vessel.',
      hourPillar: 'Wealth element sits in the Hour Pillar — late-life enjoys both material abundance and family harmony.'
    },
    prediction: '2026 brings the fortune of harmonious unions — significant growth in both business and relationships.',
    luckyNumber: 27,
    luckyColor: 'Quiet violet'
  },
  {
    score: 98,
    mainFortune: 'An ageless auspicious chart accompanied by Heavenly Nobility (天乙貴人)',
    analysis: {
      yearPillar: 'Heavenly Nobility resides in the Year Pillar — wherever you go, helpful connections follow. A chart of strong human fortune.',
      monthPillar: 'The Resource element of the Month Pillar acts strongly — academic and credential luck are both excellent.',
      dayPillar: 'The Day Stem stands on Establishment (建祿), nourished by spring yang energy — a self-made fortune.',
      hourPillar: 'The Output element of the Hour Pillar acts as descendant and disciple fortune — a teaching role naturally arrives in late life.'
    },
    prediction: '2026 sees the arrival of a major connection that clarifies your life direction.',
    luckyNumber: 11,
    luckyColor: 'Ancient jade'
  },
  {
    score: 91,
    mainFortune: 'A chart of letters and arts blessed by the Literary Star (文昌貴人)',
    analysis: {
      yearPillar: 'The Literary Star resides in the Year Pillar — early excellence in writing and the arts.',
      monthPillar: "The Month Pillar's Hurting Officer shines — expression and creativity become lifelong assets.",
      dayPillar: 'The Day Pillar holds a stable Proper Officer — strong social trust and recognition in your field.',
      hourPillar: 'The Direct Resource of the Hour Pillar suggests fostering students or leaving an honorable name in late life.'
    },
    prediction: '2026 is a year when your work and output become known to others. Do not miss even small public moments.',
    luckyNumber: 6,
    luckyColor: 'Ink-tinted blue'
  },
  {
    score: 93,
    mainFortune: 'A chart where the path of great fortune opens wide',
    analysis: {
      yearPillar: 'The Direct Wealth of the Year Pillar is sturdy — family wealth is stable, with blessings carried to descendants.',
      monthPillar: "The Month Pillar's Seven Killings is properly controlled — drive and charisma are lifelong strengths.",
      dayPillar: 'A pure and clean Day Pillar — both noble character and deep insight.',
      hourPillar: 'The Hour Pillar Resource shines — late life is rich with disciple and student connections.'
    },
    prediction: 'Late 2026, the position you have been waiting for opens naturally. An opportunity for the prepared.',
    luckyNumber: 19,
    luckyColor: 'Deep ochre'
  }
];

const SAJU_HONEST_EN = [
  {
    score: 70,
    mainFortune: 'A chart with relatively balanced flow of the Five Elements',
    analysis: {
      yearPillar: 'The Year Pillar shows a relatively stable energy, though early life likely held considerable environmental shifts.',
      monthPillar: 'The Ten Gods of the Month Pillar suggest an active, forward-moving youth.',
      dayPillar: "The Day Stem's character is distinct, but balance with surrounding Stems and Branches deserves attention. Spouse fortune is favorable.",
      hourPillar: 'The Hour Pillar shows a calm flow — late life appears to be a time of stability and self-reflection.'
    },
    prediction: '2026 emphasizes inner growth over outward change. Restraint from rash decisions is advised.',
    luckyNumber: 15,
    luckyColor: 'Soft violet'
  },
  {
    score: 63,
    mainFortune: 'A distinctive chart with clear strengths and weaknesses',
    analysis: {
      yearPillar: 'A Clash (沖) in the Year Pillar suggests changes in childhood environment or family events.',
      monthPillar: 'The Month Pillar nourishes the Day Stem — youth saw outcomes follow effort relatively well.',
      dayPillar: 'The Day Stem is somewhat weak, indicating some reliance on others, but with ease in receiving help through relationships.',
      hourPillar: 'The Hour Pillar is plain — implying a stable flow in later life without major upheavals.'
    },
    prediction: '2026 calls for careful judgment. Consolidating substance is more fitting than large investments or job changes.',
    luckyNumber: 9,
    luckyColor: 'Calm navy'
  },
  {
    score: 75,
    mainFortune: 'A chart with a relatively stable structure',
    analysis: {
      yearPillar: 'Stem and Branch of the Year Pillar communicate naturally — family atmosphere was likely cooperative.',
      monthPillar: 'A balance between Hurting Officer and Proper Officer suggests good social adaptation and conflict avoidance.',
      dayPillar: 'The Day Stem is near the middle path — balanced between assertion and compromise. Spouse fortune is moderate.',
      hourPillar: 'The Hour Pillar is somewhat weak — relationships with children may feel distant; conscious effort helps.'
    },
    prediction: '2026 suggests an even flow. Investing time in gradual improvement suits better than dramatic change.',
    luckyNumber: 22,
    luckyColor: 'Quiet sand'
  },
  {
    score: 68,
    mainFortune: 'A distinctive chart with skewed strengths in specific areas',
    analysis: {
      yearPillar: 'The Year Pillar holds strong Friend element — sibling and peer relationships form a major axis of life.',
      monthPillar: 'Excessive Resource in the Month Pillar may make decisions susceptible to outside opinion.',
      dayPillar: 'A strong Day Stem, but weaker Wealth element — learning around money management is helpful.',
      hourPillar: "The Hour Pillar's Output is active — strong expressive drive, with potential in creative and communication fields."
    },
    prediction: 'In 2026, do not yield decision-making to others. Practice trusting your intuition.',
    luckyNumber: 14,
    luckyColor: 'Faded deep green'
  },
  {
    score: 72,
    mainFortune: 'A neat chart with balance between Stems and Branches',
    analysis: {
      yearPillar: 'A Proper Officer in the Year Pillar — social stability and responsibility become lifelong assets.',
      monthPillar: "The Month Pillar's structure is steady without major variance — recognition flows from those around you.",
      dayPillar: 'A pure Day Stem — rational thought and self-control are strengths. Spouse fortune is moderate.',
      hourPillar: 'A Resource sits in the Hour Pillar — time spent on study and disciples in late life.'
    },
    prediction: '2026 will be a year of demonstrating consistency on your stable foundation.',
    luckyNumber: 4,
    luckyColor: 'Natural blue-grey'
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
