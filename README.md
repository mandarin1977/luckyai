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

---

## 🛠 기술 스택

- **Vue 3** (`<script setup>` Composition API) + **Vite**
- **Vue Router** (SPA 라우팅, Vercel rewrite로 직링크 대응)
- **Google Gemini API** (`gemini-2.5-flash`) — 텍스트 + 이미지 멀티모달
- **Vanilla CSS** (CSS Variables 기반 디자인 시스템)
- **Vercel** 배포 (자동 재배포)

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
├── components/              # AppHeader, Footer, StarryBackground, ImageUploader 등
├── composables/
│   ├── useGemini.js         # analyzePalm / analyzeSaju / translateMisfortune
│   └── useDevice.js         # 모바일 감지
├── router/index.js          # /, /palm, /saju, /misfortune
├── utils/prompts.js         # 6종 프롬프트 (3 기능 × 2 모드)
├── views/
│   ├── HomeView.vue
│   ├── PalmReadingView.vue
│   ├── SajuView.vue
│   └── MisfortuneView.vue
└── main.js
```

---

## 📜 한 줄 안내

이 프로젝트는 **재미**를 위한 것입니다. AI 응답은 오락 목적이며, 실제 운세·통계·조언으로 받아들이지 마세요. 다만 기분 나쁜 하루 끝에 한 번 돌려보면 조금은 웃을 수 있을지도 모릅니다 🌠
