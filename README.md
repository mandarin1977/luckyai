# LuckyAI ✨

> "AI-powered optimism, scientifically unfounded."
>
> 당신의 모든 것이 길조입니다.

LuckyAI는 Google Gemini를 활용해 사용자의 손금과 일상의 불운을 **무조건 좋게** 해석해주는 Vue 3 SPA입니다. 어떤 입력이 들어오든 우주적 관점에서 길조로 재해석합니다.

## ✨ 주요 기능

- **🖐 손금 분석** — 손바닥 사진을 업로드하면 30년 경력의 동양 손금 전문가 페르소나가 4가지 손금(생명·감정·지능·운명선)을 모두 길조로 풀이하고 향후 1년 예언, 행운의 숫자/색을 제시합니다.
- **🌌 불운 변환기** — 안 좋았던 일을 적으면 우주적·철학적 관점으로 재해석해 그럴듯한 통계 수치, 미래의 복, 명언과 함께 길조로 바꿔줍니다.
- **📱 모바일/데스크탑 대응** — 모바일에서는 카메라/앨범 선택 바텀 시트, 데스크탑에서는 파일 다이얼로그를 띄우는 분기 처리.

## 🛠 기술 스택

- Vue 3 (`<script setup>`) + Vite
- Vue Router
- Google Gemini API (`gemini-2.5-flash`)
- Vanilla CSS (CSS Variables 기반)

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example`을 복사해 `.env`를 만들고 [Google AI Studio](https://aistudio.google.com/app/apikey)에서 발급받은 키를 넣어주세요.

```bash
cp .env.example .env
```

```env
VITE_GEMINI_API_KEY=발급받은_키
```

### 3. 개발 서버 실행

```bash
npm run dev
```

기본 포트: `http://localhost:5173`

### 4. 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 📁 폴더 구조

```
src/
├── assets/styles/      # 글로벌 CSS (variables, main)
├── components/         # 재사용 컴포넌트 (Header, Footer, Uploader 등)
├── composables/        # useGemini, useDevice
├── router/             # Vue Router 설정
├── utils/prompts.js    # Gemini 프롬프트
├── views/              # HomeView, PalmReadingView, MisfortuneView
├── App.vue
└── main.js
```

## 📜 라이선스

이 프로젝트는 학습용으로 작성되었으며, AI 응답은 오락 목적입니다. 실제 운세나 통계로 받아들이지 마세요.
