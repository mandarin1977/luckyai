# LuckyAI ✨

> "AI-powered optimism, scientifically unfounded."
>
> 당신의 모든 것이 길조입니다.

LuckyAI는 Google Gemini를 활용해 사용자의 손금·사주·일상의 불운을 **무조건 좋게** 해석해주는 Vue 3 SPA입니다. 어떤 입력이 들어오든 우주적 관점에서 길조로 재해석합니다.

**🔗 Live Demo:** https://luckyai-six.vercel.app

---

## ⚠️ 시작하기 전에 — 마음의 준비

> LuckyAI는 **자주 틀립니다.** 하지만 그 틀림은 언제나 당신의 행복을 향한 방향으로 틀립니다.
>
> LuckyAI는 **환각에 빠지곤 합니다.** 다만 그 환각 속에서 당신은 늘 왕업지상(王業之相)입니다.
>
> LuckyAI는 **과학적 근거가 없습니다.** 그 대신 당신을 응원하는 마음 하나는 진심입니다.
>
> _— 오류가 잦지만, 착한 AI가 드리는 말씀_

그러니 결과는 **재미로** 즐기고, **기분 좋아지는 용도**로만 사용해주세요. 사주 결과 나쁘게 나와도 LuckyAI는 눈을 질끈 감고 "대길"이라 외쳐드립니다 🍀

---

## ✨ 주요 기능

세 가지 점괘 모두 **두 가지 모드**로 해석해드립니다:

| | 🍀 **LuckyAI 모드** | 🔮 **전통·객관 해석 모드** |
|---|---|---|
| 톤 | 무조건 긍정, 재치, 길조 | 원리대로, 가감없이, 학술적 |
| 점수 | 85~99점 보장 | 1~100점 솔직하게 |
| 재미 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 현실성 | ⭐ | ⭐⭐⭐⭐ |

### 🖐 손금 분석
손바닥 사진을 업로드하면 네 가지 손금(생명·감정·지능·운명선)을 분석하고 향후 1년 예언, 행운의 숫자/색까지 알려드립니다.

### 🔯 사주 풀이
생년월일시·성별·양력/음력을 입력하면 사주 네 기둥(연주·월주·일주·시주)과 주요 오행을 뽑아 풀이합니다. 행운의 숫자·색상 포함.

### 🌌 불운 변환기
안 좋았던 일을 적으면 우주적 관점에서 재해석해드리거나(🍀), 균형잡힌 시각으로 객관 분석해드립니다(🧐). 그럴듯한 통계 수치, 미래의 복, 명언까지 함께.

### 💫 두 모드 비교하기
결과 화면에서 **"다른 모드로 보기"** 버튼 하나로 같은 입력에 대한 두 가지 해석을 즉시 비교할 수 있습니다.

### 😺 운세 클리커 (`/clicker`)
캐릭터를 클릭하면 41종의 길조 메시지가 랜덤으로 떠오르는 미니게임. 마일스톤(10/30/50/100/200회) 달성 시 특별 메시지가 표시되고, 5클릭마다 캐릭터 이모지가 12종 중에서 바뀝니다. 도파민형 인터렉션.

### 🥠 운세 로또 (`/lotto`)
다섯 개의 포춘쿠키 중 하나를 골라 갈라보는 한 번의 의식적 선택형 미니게임. 선택한 쿠키가 흔들리며 갈라지는 애니메이션 → 베이지색 종이 카드에 38종 지혜 메시지 + 행운의 숫자/색이 등장합니다. 클리커보다 진중한 톤.

### 🌟 오늘의 한 마디 (홈)
홈 화면에 매일 다른 길조 메시지가 표시됩니다. localStorage에 날짜별로 캐시되어 하루 동안 같은 메시지가 유지되며, '↻ 다른 한 마디' 버튼으로 즉석 변경도 가능합니다.

### 📜 LuckyAI 선언문 (`/manifesto`)
"우리는 진실을 거부합니다" — 4장 구성의 진지한 학술 톤 매니페스토. 시대 진단, 우리의 선택, 기술의 새로운 정의, 사용자에게. **이그노벨상 정신**(먼저 웃게, 다음 생각하게)에 따라 무용성을 진지하게 선언하는 페이지.

### 📊 무용성 메트릭 (결과 카드 내)
모든 결과 카드 하단에 자가 신뢰도 평가가 표시됩니다.
- 객관적 사실 부합률: **0%**
- 미래 예측 정확도: **측정 불가**
- 플라시보 효과 보장률: **100%**
- 기술적 진지함: **매우 높음**

자기인식적 자조로 컨셉의 진정성을 강화합니다.

### 📜 길조 인증서 (PNG 다운로드)
손금/사주/불운 결과 카드의 **'📜 인증서 발급'** 버튼으로 인증서 모달이 열리고, "이미지로 저장"을 누르면 PNG로 다운로드됩니다 (`html-to-image` 사용). 베이지+금색 이중 보더, 빨간 도장(✿ LUCKY ✿ AI 印), LuckyAI 연구소(없음) 서명, 인증서 번호(LKY-XXXX) 포함. 친구에게 자랑하기 좋습니다.

---

## 🛠 기술 스택

- **Vue 3** (`<script setup>` Composition API) + **Vite**
- **Vue Router** (SPA 라우팅, Vercel rewrite로 직링크 대응)
- **Google Gemini API** (`gemini-2.5-flash`) — 텍스트 + 이미지 멀티모달
- **lunar-javascript** — 만세력 기반 사주 4기둥 결정론적 계산
- **html-to-image** — 인증서 PNG 다운로드
- **Pretendard Variable** — 한국어 친화 모던 산세리프
- **Vanilla CSS** (CSS Variables 기반 디자인 시스템, 모바일 반응형)
- **Vercel** 배포 (자동 재배포 + SPA rewrite)

### 프롬프트 전략
같은 API, 같은 입력을 **서로 다른 system prompt**로 호출해 두 페르소나(낙관주의 도사 / 전통 학자)를 만들어냅니다. 모델 하나로 두 가지 인격을 연출하는 간단하면서도 효과적인 구조입니다.

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
├── assets/styles/           # variables.css, main.css (디자인 토큰)
├── components/
│   ├── AppHeader.vue        # sticky 헤더 (로고 = 홈 링크)
│   ├── AppFooter.vue        # GitHub 링크 + 카피라이트
│   ├── StarryBackground.vue # 별 패럴럭스 배경
│   ├── ImageUploader.vue    # 손금 사진 업로더 (모바일 분기)
│   ├── MobileUploadModal.vue# 모바일용 카메라/앨범 선택 (Teleport)
│   ├── FallbackNotice.vue   # API 실패 시 안내 팝업 + 클리커/로또 진입
│   ├── UselessnessMetrics.vue # 결과 카드 자가 신뢰도 평가 (정직한 무용성)
│   └── CertificateModal.vue # 길조 인증서 모달 + PNG 다운로드
├── composables/
│   ├── useGemini.js         # analyzePalm / analyzeSaju / translateMisfortune
│   ├── useDevice.js         # 모바일 감지
│   └── useLoadingTip.js     # 로딩 중 길조 메시지 회전
├── router/index.js          # /, /palm, /saju, /misfortune, /clicker, /lotto, /manifesto
├── utils/
│   ├── prompts.js                 # 6종 프롬프트 (3 기능 × 2 모드)
│   ├── saju.js                    # lunar-javascript 기반 만세력 계산
│   ├── fallbacks.js               # API 실패 시 더미 데이터 (12종)
│   ├── clickerMessages.js         # 클리커/오늘의 한 마디 풀 (41종)
│   └── fortuneCookieMessages.js   # 운세 로또 지혜 메시지 풀 (38종)
├── views/
│   ├── HomeView.vue         # 히어로 + CTA + 오늘의 한 마디 + 미니게임 입구
│   ├── PalmReadingView.vue
│   ├── SajuView.vue
│   ├── MisfortuneView.vue
│   ├── ClickerView.vue      # 운세 클리커 미니게임
│   ├── LottoView.vue        # 운세 로또(포춘쿠키) 미니게임
│   └── ManifestoView.vue    # LuckyAI 선언문 (이그노벨상 정신)
└── main.js
```

## 🛡️ 안전망 / 데모 친화 설계

- **API 실패 fallback** — Gemini 호출이 실패하면 (rate limit, 네트워크, 파싱 오류) 미리 준비한 더미 데이터로 자동 대체. 사용자에겐 결과가 항상 보임.
- **DEMO 뱃지** — fallback 결과는 결과 카드 우상단에 빨간 `⚠ DEMO` 뱃지로 명시.
- **안내 팝업** — fallback 발생 시 한 번 떠서 한도 소진을 안내하고, 그동안 운세 클리커(😺) 또는 운세 로또(🥠)로 놀 수 있도록 유도.
- **만세력 계산은 로컬** — 사주 4기둥은 lunar-javascript로 결정론적 계산. API가 죽어도 명식은 항상 정확.

---

## 📜 한 줄 안내

이 프로젝트는 **재미**를 위한 것입니다. AI 응답은 오락 목적이며, 실제 운세·통계·조언으로 받아들이지 마세요. 다만 기분 나쁜 하루 끝에 한 번 돌려보면 조금은 웃을 수 있을지도 모릅니다 🌠
