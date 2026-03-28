---
title: "Sticky 스크롤 애니메이션이 모바일에서 빈 화면/겹침 유발"
date: 2026-03-29
category: ui-bugs
module: rocket-terms
problem_type: ui_bug
component: frontend_stimulus
symptoms:
  - "모바일에서 홍보 페이지가 거의 빈 검정 화면으로 표시"
  - "히어로 헤더와 feature 슬라이드가 겹쳐서 표시"
  - "300-500dvh 컨테이너가 스크롤 공간만 차지하고 콘텐츠 안 보임"
root_cause: config_error
resolution_type: code_fix
severity: high
tags:
  - framer-motion
  - sticky-scroll
  - overflow-clip
  - mobile-safari
  - next-js
  - scroll-animation
---

# Sticky 스크롤 애니메이션이 모바일에서 빈 화면/겹침 유발

## Problem

Next.js + Framer Motion으로 구현한 "sticky + 스크롤 연동 컨텐츠 전환" 패턴이 모바일에서 빈 화면을 만들거나 섹션이 겹침. 토스/애플 스타일 scroll-driven cross-fade를 구현하려다 여러 번 실패.

## Symptoms

- 모바일(426px)에서 페이지 전체가 검정 빈 화면
- 히어로 헤더 텍스트와 feature 이미지가 동시에 보이며 겹침
- 300dvh 수평 스크롤 캐릭터 섹션이 viewport를 붕괴시킴
- sticky 요소가 고정 안 되고 일반 스크롤처럼 동작

## What Didn't Work

1. **`overflow: hidden` + `position: sticky`**: `overflow: hidden`이 새로운 스크롤 컨텍스트를 만들어서 sticky가 부모 기준으로 고정됨. viewport 기준 고정이 안 됨.
2. **300dvh 수평 스크롤 + sticky**: 높이가 너무 커서 모바일에서 콘텐츠가 보이지 않음. `overflow: hidden`과 결합되면 완전히 빈 화면.
3. **헤더와 feature 슬라이드 동시 `position: absolute; inset: 0`**: 스크롤 0% 지점에서 헤더(opacity: 1)와 첫 번째 feature(opacity: 1)가 겹침.
4. **`useScroll` offset 잘못 설정**: `["start end", "end start"]` 사용 → 올바른 값은 `["start start", "end end"]`.

## Solution

### 1. `overflow: hidden` → `overflow: clip`

```css
/* ❌ 이전 — sticky를 깨뜨림 */
.promo-features-sticky {
  overflow: hidden;
}

/* ✅ 수정 — sticky 유지하면서 콘텐츠 클리핑 */
.promo-features-sticky {
  overflow: clip;
}
```

루트 요소(`overflow-x`)도 동일하게 변경:
```css
.promo-root {
  overflow-x: clip;  /* hidden 아님! */
}
```

### 2. `useScroll` offset 올바르게 설정

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end end'],  // ✅ 올바른 값
});
```

- `['start start', 'end end']`: 요소 top이 viewport top에 닿을 때 0, 요소 bottom이 viewport bottom에 닿을 때 1
- `['start end', 'end start']`는 요소가 viewport에 들어오는 순간부터 나가는 순간까지 — sticky 패턴에는 부적합

### 3. 헤더/feature 겹침 방지 — 스크롤 범위 분리

```tsx
// 헤더: 0-15% 구간에서 보이다가 사라짐
const headerOpacity = useTransform(scrollYProgress, [0, 0.12, 0.15], [1, 1, 0]);

// Feature들: 15-100% 구간에서 순차 cross-fade
const featureStart = 0.15;
const featureRange = 0.85;
const segmentSize = featureRange / total;
const start = featureStart + index * segmentSize;
```

### 4. 높이와 단위

```css
.promo-features-outer {
  height: 500dvh;  /* dvh 사용 (모바일 주소창 대응) */
}

.promo-features-sticky {
  height: 100dvh;  /* vh 아닌 dvh */
}
```

- `dvh`(Dynamic Viewport Height)는 모바일 브라우저 주소창 변화에 대응
- `vh`와 `dvh`를 섞지 않기 — 일관되게 `dvh` 사용
- 500dvh 이하 유지 (600dvh+ 는 사용자가 갇힌 느낌)

### 5. 복잡한 패턴 실패 시 fallback

수평 스크롤(300dvh + sticky + useTransform translateX) 같은 복잡한 패턴이 모바일에서 동작 안 하면, 간단한 `whileInView` 그리드로 fallback:

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ type: 'spring', stiffness: 80, damping: 20 }}
>
```

## Why This Works

1. **`overflow: clip` vs `overflow: hidden`**: `clip`은 콘텐츠를 잘라내지만 새로운 스크롤 컨텍스트를 만들지 않음. `hidden`은 스크롤 컨텍스트를 만들어서 sticky의 기준점이 viewport에서 부모 요소로 변경됨.
2. **offset `['start start', 'end end']`**: sticky 패턴에서는 요소가 viewport 상단에 "고정"되기 시작하는 순간부터 추적해야 하므로, 두 시작점이 모두 `start`여야 함.
3. **스크롤 범위 분리**: absolute 포지셔닝된 요소들이 같은 opacity=1로 겹치는 건 z-index가 아니라 타이밍 문제. 헤더가 완전히 사라진 후에 feature가 나타나도록 범위를 분리하면 해결.

## Prevention

- **`overflow: hidden`은 sticky 조상에 절대 사용하지 않기.** `overflow: clip` 또는 제거.
- **`useScroll` offset은 항상 `['start start', 'end end']`로 시작.** 다른 값이 필요하면 의도적으로 변경.
- **모바일(390-430px)에서 먼저 테스트.** 데스크탑에서 작동하는 sticky 패턴이 모바일에서 깨지는 경우가 매우 많음.
- **복잡한 스크롤 패턴은 단계적으로 구현.** 먼저 간단한 `whileInView`로 작동 확인 → sticky cross-fade 추가 → 수평 스크롤 같은 고급 패턴은 마지막에.
- **dvh를 일관되게 사용.** vh와 dvh를 섞으면 모바일에서 높이 불일치 발생.

## Related Issues

- [CSS position: sticky not working? Try overflow: clip](https://www.terluinwebdesign.nl/en/css/position-sticky-not-working-try-overflow-clip-not-overflow-hidden/)
- [Framer Motion useScroll docs](https://motion.dev/docs/react-use-scroll)
- [Codrops: On-Scroll Animation Ideas for Sticky Sections](https://tympanus.net/codrops/2024/01/31/on-scroll-animation-ideas-for-sticky-sections/)
