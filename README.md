# LuckyAI ✨

> *"AI-powered optimism, scientifically unfounded."*
>
> 당신의 모든 것이 길조입니다.

LuckyAI는 Google Gemini를 활용해 사용자의 손금·사주·일상의 불운을 **무조건 좋게** 해석해주는 Vue 3 SPA입니다. 어떤 입력이 들어오든 우주적 관점에서 길조로 재해석합니다.

🔗 **Live Demo:** https://luckyai-six.vercel.app  &nbsp;·&nbsp;  🌐 **Languages:** 한국어 / English (헤더 우상단 토글)

---

## 🏆 해커톤 컨셉 — "쓸모없는 AI 만들기"

본 프로젝트는 **'쓸모없는 AI 챔피언십(Useless AI Championship)'** 출품작입니다. 이그노벨상의 평가 기준 — *"먼저 사람들을 웃게 만들고, 그다음에는 생각하게 만든다"* — 를 그대로 따릅니다.

| 평가 기준 | LuckyAI의 답 |
|---|---|
| **참신하게 쓸모없는지 (웃음+창의)** | 어떤 사진/사주를 넣어도 무조건 길조 — 컨셉 자체가 유쾌한 무용성 |
| **사고의 전환** | 매니페스토와 무용성 메트릭으로 *"AI는 정확해야 하는가, 응원해야 하는가"* 화두 |
| **Google AI 정교한 활용** | Gemini 2.5 Flash 멀티모달 + 두 페르소나 프롬프트 + 만세력 하이브리드 |
| **실제 배포 완료** | Vercel 자동 재배포, KO/EN 다국어 |

자세한 철학은 [`/manifesto`](https://luckyai-six.vercel.app/manifesto) 페이지에서.

---

## ⚠️ 시작하기 전에 — 마음의 준비

> LuckyAI는 **자주 틀립니다.** 하지만 그 틀림은 언제나 당신의 행복을 향한 방향으로 틀립니다.
>
> LuckyAI는 **환각에 빠지곤 합니다.** 다만 그 환각 속에서 당신은 늘 왕업지상(王業之相)입니다.
>
> LuckyAI는 **과학적 근거가 없습니다.** 그 대신 당신을 응원하는 마음 하나는 진심입니다.
>
> _— 오류가 잦지만, 착한 AI가 드리는 말씀_

결과는 **재미로** 즐기고, **기분 좋아지는 용도**로만 사용해주세요. 사주 결과 나쁘게 나와도 LuckyAI는 눈을 질끈 감고 "대길"이라 외쳐드립니다 🍀

---

## ✨ 주요 기능

세 가지 점괘 모두 **두 가지 모드**로 해석해드립니다:

| | 🍀 **LuckyAI 모드** | 🔮 **전통·객관 해석 모드** |
|---|---|---|
| 톤 | 무조건 긍정, 재치, 길조 | 원리대로, 가감없이, 학술적 |
| 점수 | 85~99점 보장 | 1~100점 솔직하게 |
| 재미 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 현실성 | ⭐ | ⭐⭐⭐⭐ |

### 🖐 손금 분석 (`/palm`)
손바닥 사진을 업로드하면 네 가지 손금(생명·감정·지능·운명선)을 분석하고 향후 1년 예언, 행운의 숫자/색까지 알려드립니다. **Gemini 멀티모달**로 이미지를 직접 인식.

### 🔯 사주 풀이 (`/saju`)
생년월일시·성별·양력/음력을 입력하면 **만세력으로 결정론적 계산된** 사주 네 기둥(연주·월주·일주·시주)과 주요 오행이 명식 카드로 표시됩니다. 그 위에 Gemini가 해석을 얹는 **하이브리드 구조**.

### 🌌 불운 변환기 (`/misfortune`)
안 좋았던 일을 적으면 우주적 관점에서 재해석해드리거나(🍀), 균형잡힌 시각으로 객관 분석해드립니다(🧐). 그럴듯한 통계 수치, 미래의 복, 명언까지 함께.

### 💫 두 모드 비교하기
결과 화면에서 **"다른 모드로 보기"** 버튼 하나로 같은 입력에 대한 두 가지 해석을 즉시 비교. 같은 모델·같은 입력이 프롬프트만 바뀌어 어떻게 다르게 응답하는지를 시각적으로 보여주는 **이 앱의 핵심 USP**.

### 😺 운세 클리커 (`/clicker`)
캐릭터를 클릭하면 41종의 길조 메시지가 랜덤으로 떠오르는 미니게임. 마일스톤(10/30/50/100/200회) 달성 시 특별 메시지, 5클릭마다 캐릭터 이모지가 12종 중에서 바뀝니다. 도파민형 인터렉션.

### 🥠 운세 로또 (`/lotto`)
다섯 개의 포춘쿠키 중 하나를 골라 갈라보는 의식적 선택형 미니게임. 흔들리며 갈라지는 애니메이션 → 베이지 종이 카드에 38종 지혜 메시지 + 행운의 숫자/색이 등장합니다. 클리커보다 진중한 톤.

### 🌟 오늘의 한 마디 (홈)
홈 화면에 매일 다른 길조 메시지가 표시됩니다. localStorage에 날짜·언어별로 캐시되어 하루 동안 같은 메시지가 유지되며, '↻ 다른 한 마디' 버튼으로 즉석 변경도 가능.

### 📜 LuckyAI 선언문 (`/manifesto`)
*"우리는 진실을 거부합니다"* — 4장 구성의 진지한 학술 톤 매니페스토 (KO/EN 둘 다 제공). 이그노벨상 정신 — *먼저 웃게, 다음 생각하게* — 그대로 표현.

### 📊 무용성 메트릭 (결과 카드 내)
모든 결과 카드 하단에 자가 신뢰도 평가가 표시됩니다.
- 객관적 사실 부합률: **0%**
- 미래 예측 정확도: **측정 불가**
- 플라시보 효과 보장률: **100%**
- 기술적 진지함: **매우 높음**

자기인식적 자조로 컨셉의 진정성을 강화합니다.

### 📜 길조 인증서 (PNG 다운로드)
손금/사주/불운 결과 카드의 **'📜 인증서 발급'** 버튼으로 인증서 모달이 열리고, "이미지로 저장"을 누르면 PNG로 다운로드됩니다 (`html-to-image` 사용). 베이지+금색 이중 보더, 빨간 도장(✿ LUCKY ✿ AI 印), LuckyAI 연구소(없음) 서명, 인증서 번호(LKY-XXXX) 포함.

### 🌐 KO / EN 다국어
헤더 우상단 **`KO | EN` 토글**로 즉시 전환. 메뉴·버튼·팝업·매니페스토는 물론 **Gemini 응답 자체와 fallback 더미 데이터까지 영어로 출력**됩니다. 외국인 심사위원도 컨셉을 그대로 이해할 수 있도록 사주 명식의 한자(戊子·庚辰)는 영문 모드에서도 한자 + Day Pillar 설명이 병기됩니다.

---

## 🛠 기술 스택

- **Vue 3** (`<script setup>` Composition API) + **Vite**
- **Vue Router** — `/`, `/palm`, `/saju`, `/misfortune`, `/clicker`, `/lotto`, `/manifesto` (SPA, Vercel rewrite로 직링크 대응)
- **Google Gemini API** (`gemini-2.5-flash`) — 텍스트 + 이미지 멀티모달
- **lunar-javascript** — 만세력 기반 사주 4기둥 결정론적 계산
- **html-to-image** — 인증서 PNG 다운로드
- **Pretendard Variable** — 한국어/영문 모두 친화적인 모던 산세리프
- **Vanilla CSS** (CSS Variables 기반 디자인 시스템, 모바일 반응형)
- **Vercel** 배포 (자동 재배포 + SPA rewrite + OG 메타)

### 프롬프트 전략
같은 API, 같은 입력을 **서로 다른 system prompt**로 호출해 두 페르소나(낙관주의 도사 / 전통 학자)를 만들어냅니다. 모델 하나로 두 가지 인격을 연출. 영문 모드에서는 영문 프롬프트로 자동 전환되어 결과도 영어로 생성.

### 사주 하이브리드 설계
LLM은 정확한 계산이 약점이라 [Gemini가 사주 4기둥을 직접 뽑게 두면 환각이 자주 일어납니다](https://github.com/mandarin1977/luckyai/blob/main/src/utils/saju.js). 그래서:
- **만세력 계산** — `lunar-javascript`로 양/음력 변환 + 60갑자 결정론적으로 계산
- **해석만 Gemini에게** — 계산된 4기둥 + 일간 + 오행을 프롬프트에 박고 "재계산하지 말고 이 값 그대로 해석해" 강제
- 결과: **일주가 정확** + **해석은 Gemini의 자유로운 명리학 용어**

---

## 🛡️ 안전망 / 데모 친화 설계

LuckyAI는 *공개 URL을 해커톤에 제출한 상태에서 무료 Gemini API로 운영*되는 환경을 가정해 다층 안전망을 깔아두었습니다.

- **방문자별 일일 throttle (3회)** — `useRateLimit` composable이 localStorage 기반으로 visitor당 진짜 API 호출을 하루 3회로 제한. 초과 시 즉시 fallback. **무료 RPD가 visitor 한 명에게 전부 잡아먹히는 것을 방지**.
  - 개발자 우회: `localStorage.setItem('lucky-skip-throttle', '1')`
- **API 실패 fallback** — Gemini 호출이 실패하면(rate limit, 네트워크, 파싱 오류) 미리 준비한 **더미 데이터 60종**(3 기능 × 2 모드 × 2 언어 × 5 변형)으로 자동 대체. 사용자에겐 결과가 항상 보임.
- **DEMO 뱃지** — fallback 결과는 결과 카드 우상단에 빨간 `⚠ DEMO` 뱃지로 명시. 사용자가 진짜 결과인지 fallback인지 즉시 구분 가능.
- **안내 팝업** — fallback 발생 시 한 번 떠서 한도 소진을 안내하고, 그동안 운세 클리커(😺) 또는 운세 로또(🥠)로 놀 수 있도록 유도.
- **만세력 계산은 로컬** — 사주 4기둥은 결정론적 계산. API가 죽어도 명식은 항상 정확.
- **localStorage 안전 처리** — Safari 프라이빗 모드 등에서 `localStorage`가 throw해도 try/catch로 감싸 화면이 깨지지 않음.

---

## 🚀 로컬 실행

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 — Google AI Studio에서 키 발급
#    https://aistudio.google.com/app/apikey
echo "VITE_GEMINI_API_KEY=your_key_here" > .env

# 3. 개발 서버
npm run dev          # http://localhost:5173

# 4. 프로덕션 빌드
npm run build
npm run preview
```

---

## 📁 폴더 구조

```
src/
├── assets/styles/                # variables.css, main.css (디자인 토큰)
├── components/
│   ├── AppHeader.vue             # sticky 헤더 + KO/EN 토글
│   ├── AppFooter.vue             # 선언문/GitHub 링크
│   ├── StarryBackground.vue      # 별 패럴럭스 배경
│   ├── ImageUploader.vue         # 손금 사진 업로더 (모바일 분기)
│   ├── MobileUploadModal.vue     # 카메라/앨범 선택 모달 (Teleport)
│   ├── FallbackNotice.vue        # API 실패 시 안내 팝업 + 클리커/로또 진입
│   ├── UselessnessMetrics.vue    # 결과 카드 자가 신뢰도 평가 (정직한 무용성)
│   └── CertificateModal.vue      # 길조 인증서 모달 + PNG 다운로드
├── composables/
│   ├── useGemini.js              # analyzePalm / analyzeSaju / translateMisfortune
│   ├── useDevice.js              # 모바일 감지 (UA 기반)
│   ├── useLoadingTip.js          # 로딩 중 길조 메시지 회전 (2.5s 간격)
│   ├── useLocale.js              # KO/EN 글로벌 reactive 상태 + localStorage
│   └── useRateLimit.js           # 방문자 일일 API 호출 throttle (3회)
├── router/index.js               # 7개 라우트 (Home/Palm/Saju/Misfortune/Clicker/Lotto/Manifesto)
├── utils/
│   ├── prompts.js                # 12종 프롬프트 (3 기능 × 2 모드 × 2 언어)
│   ├── saju.js                   # lunar-javascript 기반 만세력 계산
│   ├── fallbacks.js              # API 실패 시 더미 데이터 (60종 = 3×2×2×5)
│   ├── clickerMessages.js        # 클리커/오늘의 한 마디 풀 (KO 41 + EN 41)
│   └── fortuneCookieMessages.js  # 운세 로또 지혜 메시지 풀 (KO 38 + EN 38)
├── views/
│   ├── HomeView.vue              # 히어로 + CTA + 오늘의 한 마디 + 미니게임 입구
│   ├── PalmReadingView.vue       # 손금 분석
│   ├── SajuView.vue              # 사주 풀이 (만세력 + Gemini 해석)
│   ├── MisfortuneView.vue        # 불운 변환기
│   ├── ClickerView.vue           # 운세 클리커 미니게임
│   ├── LottoView.vue             # 운세 로또(포춘쿠키) 미니게임
│   └── ManifestoView.vue         # LuckyAI 선언문 (KO/EN)
└── main.js
```

---

## 📜 한 줄 안내

이 프로젝트는 **재미**를 위한 것입니다. AI 응답은 오락 목적이며, 실제 운세·통계·조언으로 받아들이지 마세요. 다만 기분 나쁜 하루 끝에 한 번 돌려보면 조금은 웃을 수 있을지도 모릅니다 🌠

---

## 📄 In English

**LuckyAI** is a "Useless AI Championship" entry — an AI fortune teller that, by design, *only* gives auspicious readings. Whatever palm photo you upload, whatever Saju emerges from your birth date, whatever misfortune you describe, LuckyAI will reframe it as a great blessing.

The project follows the spirit of the Ig Nobel Prize: *"first make people laugh, then make them think."* While the output is intentionally unscientific, the engineering underneath is precise — Gemini 2.5 Flash multimodal for palm reading, deterministic manse-ryeok (萬歲曆) calculation for the Four Pillars, two-persona prompt engineering for the LuckyAI / Traditional dual modes, and a 60-variant fallback safety net so the demo never breaks.

Toggle the language to **EN** in the header and read the [Manifesto](https://luckyai-six.vercel.app/manifesto) for the full philosophy.
