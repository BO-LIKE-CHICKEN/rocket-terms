---
title: "feat: 홍보 페이지 신설 (/app)"
type: feat
status: active
date: 2026-03-29
origin: docs/brainstorms/2026-03-29-promo-site-requirements.md
---

# feat: 홍보 페이지 신설 (/app)

## Overview

one-more-floor.com에 앱 다운로드 전환을 위한 홍보 페이지(`/app`)를 추가한다. 히어로, 기능 소개, 캐릭터 소개, 다운로드 CTA 4개 섹션으로 구성하며, sprite-sheet-cli에서 생성한 Tier 1 에셋(PNG)을 활용한다. 기존 `/`(랜딩), `/policies/`, `/support` 경로는 변경하지 않는다.

## Problem Frame

인스타그램 만화, App Store, 지인 추천 등 다양한 경로로 유입되는 방문자에게 앱의 소구점과 슬라임 캐릭터를 집중적으로 전달할 전용 페이지가 없다. 현재 랜딩 페이지는 간략한 소개와 CTA만 제공하며, 캐릭터 다양성이나 앱 기능의 깊이를 보여주지 못한다. (see origin: docs/brainstorms/2026-03-29-promo-site-requirements.md)

## Requirements Trace

- R1. 새 경로(`/app`)에 홍보 페이지 분리 배치. 기존 경로 유지.
- R2. 완전 정적 출력(Next.js static export). 서버 런타임 의존 없음.
- R3. 히어로: 메인 슬라임(민트) + 가치 제안 헤드라인 + App Store 배지 (above the fold).
- R4. Apple Smart App Banner 메타태그 (`app-id=6759623745`).
- R5. 기능 카드 3~4개: 클라임, 미션, 캡슐, 정복.
- R6. 각 카드에 앱 스크린샷 또는 슬라임 포즈 에셋 활용.
- R7. 6종 슬라임 전체를 카드 형태로 소개: 이름, 성격, 대표 포즈 이미지.
- R8. 스크롤에 따라 캐릭터가 하나씩 등장하는 애니메이션.
- R9. 하단 CTA: App Store 배지 + 슬라임 축하 포즈.
- R10. 푸터: 개인정보처리방침, 고객지원, 인스타그램 링크. 기존 푸터 패턴 재사용.

## Scope Boundaries

- 인스타/스토리 만화 섹션은 2차 범위
- 소셜 프루프(리뷰, 사용자 수) 섹션은 2차 범위
- 서버 사이드 기능(API, 분석 서버)은 범위 밖
- 다국어 지원은 범위 밖 -- 한국어만
- 기존 `/`(랜딩) 페이지 수정은 범위 밖 (푸터에 `/app` 링크 추가만 허용)

## Context & Research

### 기존 프로젝트 구조

- Next.js 16.1.6, React 19, TypeScript, Yarn 4.12.0
- `next.config.mjs`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`
- 라우팅: `app/(home)/page.tsx` (랜딩), `app/policies/` (정책), `app/support/` (고객지원)
- 스타일링: `app/global.css` 단일 파일, CSS 변수 기반, Pretendard 폰트
- 기존 랜딩 페이지 패턴: 섹션별 함수 컴포넌트 (`HeroSection`, `FeaturesSection`, `CtaSection`, `Footer`)를 `page.tsx` 내에 정의
- 디자인 토큰: `--mint`, `--mint-light`, `--peach`, `--navy-deep`, `--navy`, `--stair-blue`

### 에셋 현황

- sprite-sheet-cli Tier 1 에셋(132장) 완료. 6종 슬라임 각 22개 포즈 PNG.
- 슬라임 6종: mint, grape, ember, ocean, bubblegum, mountainClub
- 웹에서 PNG로 직접 사용 가능 (`next/image`는 static export에서 unoptimized)

### 스크롤 애니메이션 방침

- CSS-only `@keyframes` + `IntersectionObserver`로 구현. 외부 라이브러리(Framer Motion 등) 추가하지 않음.
- 번들 크기 최소화 우선. 정적 사이트 특성상 JS 의존도를 낮춤.

### 히어로 슬라임

- 정적 PNG 이미지 사용. 기존 CSS 슬라임 placeholder를 실제 에셋으로 교체.
- 애니메이션은 CSS `float` 효과만 적용 (기존 `@keyframes slime-float` 패턴 재사용).

### 경로 확정

- `/app` — 짧고 직관적. 기존 Next.js `app/` 디렉토리와 이름이 겹치지만, 라우트 그룹(`(app)`) 또는 `app/app/` 구조로 해결.

## Key Technical Decisions

- **라우트 구조**: `app/app/page.tsx`로 `/app` 경로 생성. Next.js App Router에서 `app/app/` 디렉토리가 곧 `/app` 라우트.
- **CSS 분리**: 홍보 페이지 전용 스타일은 `app/app/promo.css`로 분리하여 `page.tsx`에서 import. `global.css` 비대화 방지.
- **컴포넌트 구조**: 기존 랜딩 페이지 패턴(page.tsx 내 섹션 함수)을 따르되, 섹션 수가 많으므로 `app/app/_sections/` 디렉토리에 섹션별 분리.
- **스크롤 애니메이션**: 클라이언트 컴포넌트(`'use client'`)로 IntersectionObserver 훅을 한 개 만들고, 캐릭터 섹션에서 재사용.
- **이미지 최적화**: PNG를 `public/promo/` 하위에 배치. `<img>` 태그 직접 사용 (static export에서 `next/image`의 최적화가 비활성이므로 이점 없음).
- **Apple Smart App Banner**: `app/app/layout.tsx`에서 `<meta name="apple-itunes-app" content="app-id=6759623745">` 설정. 홍보 페이지 전용.

## Open Questions

### Resolved During Planning

- **히어로 애니메이션**: 정적 PNG + CSS float 효과 (기존 패턴 재사용)
- **스크롤 라이브러리**: CSS + IntersectionObserver (외부 의존성 없음)
- **경로**: `/app` 확정

### Deferred to Implementation

- 앱 스크린샷 확보 방법 (시뮬레이터 캡처 vs 목업) -- 기능 카드용 이미지
- 슬라임 6종의 대표 포즈 선정 -- Tier 1 에셋 중 어떤 포즈를 쓸지
- 축하 포즈 에셋 선정 -- CTA 섹션용

## Implementation Units

- [ ] **Unit 1: 라우트 셋업 + 페이지 스캐폴드**

  **Goal:** `/app` 경로에 홍보 페이지의 기본 구조를 생성하고, 빈 섹션 플레이스홀더로 빌드가 통과하는 상태를 만든다.

  **Requirements:** R1, R2

  **Dependencies:** 없음

  **Files:**
  - Create: `app/app/layout.tsx` -- 홍보 페이지 전용 레이아웃 (Smart App Banner 메타태그)
  - Create: `app/app/page.tsx` -- 메인 페이지, 섹션 컴포넌트 조합
  - Create: `app/app/promo.css` -- 홍보 페이지 전용 스타일 (초기 비어 있음)
  - Create: `app/app/_sections/` -- 섹션 컴포넌트 디렉토리

  **Approach:**
  - `app/app/layout.tsx`에서 `metadata.other`로 `apple-itunes-app` 메타태그 설정
  - `app/app/page.tsx`에서 각 섹션 컴포넌트를 import하여 조합. 초기에는 `<section>` placeholder만 배치
  - `promo.css`를 `page.tsx`에서 import. 기존 `global.css`의 색상 변수(`--mint`, `--navy-deep` 등) 재사용
  - 기존 랜딩 페이지의 `.landing-root` 패턴을 참고하되, 클래스 접두어를 `promo-`로 분리

  **Verification:**
  - `yarn build` 성공
  - `out/app/index.html` 파일 생성 확인
  - 해당 HTML에 `apple-itunes-app` 메타태그 포함 확인

- [ ] **Unit 2: 히어로 섹션 (슬라임 + 헤드라인 + App Store 배지)**

  **Goal:** 방문자가 페이지 진입 즉시 가치 제안과 다운로드 CTA를 보게 한다. 모바일에서 6초 이내에 above the fold에 표시.

  **Requirements:** R3, R4

  **Dependencies:** Unit 1

  **Files:**
  - Create: `app/app/_sections/hero-section.tsx`
  - Modify: `app/app/promo.css` -- 히어로 섹션 스타일 추가
  - Modify: `app/app/page.tsx` -- 히어로 섹션 import
  - Create: `public/promo/hero-mint.png` -- 민트 슬라임 대표 포즈 (에셋 복사)

  **Approach:**
  - 기존 랜딩 `HeroSection` 레이아웃 패턴(좌 텍스트 + 우 비주얼, 모바일에서 역순 스택) 재사용
  - CSS 슬라임 placeholder 대신 실제 민트 PNG 이미지 배치. `slime-float` 애니메이션 적용
  - 헤드라인: 짧은 가치 제안 (예: "한 층만 더 올라가면, 귀여운 슬라임이 기다려요")
  - App Store 배지: 공식 SVG 배지 사용. `https://apps.apple.com/app/id6759623745` 링크
  - `target="_blank"`, `rel="noopener noreferrer"` 속성

  **Verification:**
  - 데스크톱: 텍스트 좌측, 슬라임 이미지 우측 배치
  - 모바일(375px): 이미지 상단, 텍스트 + CTA 하단. above the fold에 모두 표시
  - App Store 배지 클릭 시 정상 이동

- [ ] **Unit 3: 기능 소개 섹션 (기능 카드 3~4개)**

  **Goal:** 앱의 핵심 기능 4가지를 시각적 카드로 전달하여 다운로드 동기를 부여한다.

  **Requirements:** R5, R6

  **Dependencies:** Unit 1

  **Files:**
  - Create: `app/app/_sections/features-section.tsx`
  - Modify: `app/app/promo.css` -- 기능 카드 스타일 추가
  - Modify: `app/app/page.tsx` -- 기능 섹션 import
  - Create: `public/promo/feature-climb.png` -- 클라임 기능 이미지
  - Create: `public/promo/feature-mission.png` -- 미션 기능 이미지
  - Create: `public/promo/feature-capsule.png` -- 캡슐 기능 이미지
  - Create: `public/promo/feature-conquest.png` -- 정복 기능 이미지

  **Approach:**
  - 기능 4개: 클라임(계단 오르기), 미션(일일/장기), 캡슐(보상/스킨), 정복(랜드마크)
  - 기존 `.feature-card` 글래스모피즘 스타일을 확장. 이미지 영역을 카드 상단에 추가
  - 데스크톱: 2x2 그리드. 모바일: 1열 스택
  - 각 카드: 상단 이미지(앱 스크린샷 또는 슬라임 포즈) + 제목 + 설명 1~2줄
  - 이미지는 `public/promo/` 하위에 배치. 구현 시 실제 에셋 확보 방법 결정

  **Verification:**
  - 4개 카드 정상 렌더링
  - 데스크톱 2x2, 모바일 1열 레이아웃 확인
  - 이미지 로드 실패 시 alt 텍스트 표시

- [ ] **Unit 4: 캐릭터 소개 섹션 (6종 슬라임 + 스크롤 애니메이션)**

  **Goal:** 6종 슬라임 전체를 매력적으로 소개하여 수집 욕구를 자극한다. 스크롤 시 캐릭터가 순차 등장.

  **Requirements:** R7, R8

  **Dependencies:** Unit 1

  **Files:**
  - Create: `app/app/_sections/characters-section.tsx` -- `'use client'` 컴포넌트
  - Create: `app/app/_hooks/use-scroll-reveal.ts` -- IntersectionObserver 기반 훅
  - Modify: `app/app/promo.css` -- 캐릭터 카드 + 애니메이션 스타일
  - Modify: `app/app/page.tsx` -- 캐릭터 섹션 import
  - Create: `public/promo/slime-mint.png` -- 민트 대표 포즈
  - Create: `public/promo/slime-grape.png` -- 포도 대표 포즈
  - Create: `public/promo/slime-ember.png` -- 엠버 대표 포즈
  - Create: `public/promo/slime-ocean.png` -- 오션 대표 포즈
  - Create: `public/promo/slime-bubblegum.png` -- 버블검 대표 포즈
  - Create: `public/promo/slime-mountain-club.png` -- 산악회 대표 포즈

  **Approach:**
  - 캐릭터 데이터 배열: `{ id, name, personality, image }` 6종 정의
  - 캐릭터 카드: 이미지 + 이름 + 성격 한 줄
  - 데스크톱: 3x2 그리드. 모바일: 2x3 또는 1열
  - `useScrollReveal` 훅: IntersectionObserver로 뷰포트 진입 감지, `data-revealed` 속성 토글
  - CSS 애니메이션: 초기 `opacity: 0; translate: 0 24px;` → 뷰포트 진입 시 `opacity: 1; translate: 0 0;` 트랜지션
  - 각 카드에 `transition-delay`를 인덱스 기반으로 설정하여 순차 등장 효과
  - `prefers-reduced-motion` 미디어 쿼리로 애니메이션 비활성화 대응

  **Verification:**
  - 6종 슬라임 전체 표시
  - 스크롤 시 카드가 순차적으로 fade-in + slide-up
  - `prefers-reduced-motion`에서 애니메이션 없이 즉시 표시
  - JS 비활성 시에도 카드가 보이는지 확인 (CSS `noscript` 대응 또는 기본 visible)

- [ ] **Unit 5: 다운로드 CTA 섹션 + 푸터 업데이트**

  **Goal:** 페이지 하단에서 다운로드를 한번 더 유도하고, 기존 푸터 패턴을 재사용하여 사이트 내비게이션을 제공한다.

  **Requirements:** R9, R10

  **Dependencies:** Unit 1

  **Files:**
  - Create: `app/app/_sections/cta-section.tsx`
  - Create: `app/app/_sections/footer-section.tsx`
  - Modify: `app/app/promo.css` -- CTA + 푸터 스타일
  - Modify: `app/app/page.tsx` -- CTA, 푸터 섹션 import
  - Modify: `app/(home)/page.tsx` -- 기존 푸터에 `/app` 링크 추가 (선택)
  - Create: `public/promo/cta-celebration.png` -- 슬라임 축하 포즈 이미지

  **Approach:**
  - CTA 섹션: 기존 `.landing-cta` 패턴 확장. 슬라임 축하 포즈 이미지 + App Store 배지 + 짧은 문구
  - 배경에 그라데이션 또는 glow 효과로 시각적 강조
  - 푸터: 기존 `.landing-footer` 패턴 재사용. 링크 목록: 개인정보처리방침(`/policies/privacy/`), 고객지원(`/support/`), 인스타그램(외부 링크)
  - 인스타그램 URL은 상수로 정의
  - 기존 랜딩 페이지 푸터에 `/app` (홍보 페이지) 링크 추가 검토

  **Verification:**
  - CTA 섹션에 App Store 배지 링크 정상 동작
  - 푸터 링크 3개 모두 정상 이동
  - 기존 랜딩 페이지 빌드 깨지지 않음

- [ ] **Unit 6: 정적 에셋 배치 + 빌드 검증**

  **Goal:** 모든 에셋을 `public/promo/`에 배치하고, 전체 정적 빌드가 성공하며 GitHub Pages 배포 준비가 완료된 상태를 확인한다.

  **Requirements:** R2 (정적 출력), 전체 품질

  **Dependencies:** Unit 2, 3, 4, 5 (모든 섹션 완료 후)

  **Files:**
  - Verify: `public/promo/` -- 모든 에셋 파일 존재 확인
  - Verify: `out/` -- 빌드 출력 디렉토리
  - Modify: `app/app/page.tsx` -- 최종 메타데이터 (OG 태그, description)

  **Approach:**
  - sprite-sheet-cli Tier 1 에셋에서 필요한 PNG를 `public/promo/`로 복사. 웹 용도에 맞게 리사이즈 (가로 최대 600px 권장)
  - 이미지 파일 크기 점검: 개별 200KB 이하 목표
  - `page.tsx`에 `export const metadata`로 OG 이미지, title, description 설정
  - `yarn build` 실행하여 `out/` 디렉토리 생성 확인
  - `out/app/index.html` 파일의 내용 확인: 메타태그, 이미지 경로, 링크 정상
  - `yarn lint` + `yarn types:check` 통과 확인

  **Verification:**
  - `yarn build` 성공 (exit 0)
  - `yarn lint` 경고/에러 없음
  - `yarn types:check` 통과
  - `out/app/index.html` 존재
  - `out/promo/` 하위에 모든 에셋 파일 존재
  - 이미지 참조 경로가 `trailingSlash` 및 `basePath` 설정과 호환

## System-Wide Impact

- **라우팅**: `/app` 경로 추가. 기존 경로에 영향 없음.
- **빌드 출력**: `out/app/index.html` 추가. `out/` 크기 증가 (에셋 PNG 용량만큼).
- **global.css**: 직접 수정하지 않음. `promo.css` 분리로 기존 스타일 영향 없음. 단, CSS 변수는 공유.
- **기존 랜딩 페이지**: 푸터에 `/app` 링크 추가 정도만 변경 가능성 있음.
- **bundle size**: `use-scroll-reveal.ts` 클라이언트 컴포넌트 1개 추가. IntersectionObserver만 사용하므로 번들 증가 미미.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Tier 1 에셋 미완료 시 이미지 누락 | placeholder 이미지로 먼저 빌드. 에셋 확정 후 교체 |
| `app/app/` 디렉토리 명이 혼동 유발 | 코드 리뷰 시 라우트 구조 문서화. 필요 시 `/promo`로 변경 검토 |
| 이미지 용량으로 빌드 출력 비대화 | 개별 200KB 이하 제한. WebP 전환은 2차 검토 |
| CSS 클래스 이름 충돌 | `promo-` 접두어로 전체 분리 |
| IntersectionObserver 미지원 브라우저 | 2026년 기준 지원율 99%+. 미지원 시 CSS 기본 visible 상태 |

## Sources & References

- **Origin document:** [docs/brainstorms/2026-03-29-promo-site-requirements.md](../../../../docs/brainstorms/2026-03-29-promo-site-requirements.md)
- `app/(home)/page.tsx` -- 기존 랜딩 페이지 패턴 (HeroSection, FeaturesSection, Footer)
- `app/global.css` -- 디자인 토큰, 랜딩 페이지 스타일
- `next.config.mjs` -- static export, trailingSlash, basePath 설정
- `app/layout.tsx` -- 루트 레이아웃, Pretendard 폰트, lang="ko"
- App Store ID: `6759623745` (Apple Smart App Banner용)
- App Store URL: `https://apps.apple.com/app/id6759623745`
