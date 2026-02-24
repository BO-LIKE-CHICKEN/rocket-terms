# Rocket Terms

앱별 `이용약관` / `개인정보 처리방침` 문서를 MDX로 관리하고, 웹에서 HTML로 제공하는 문서 서비스입니다.

## 스택

- Next.js (App Router)
- Fumadocs (MDX 문서 렌더링, 사이드바/검색)

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속.

## 문서 구조

```text
content/docs/apps/<app-slug>/<terms|privacy>/<version>.mdx
```

예시:

```text
content/docs/apps/rocket-chat/terms/1.1.0.mdx
```

각 문서의 frontmatter에는 아래 필드를 사용합니다.

```yaml
---
title: Rocket Chat 이용약관
description: Rocket Chat 서비스 이용약관 1.1.0
app: rocket-chat
kind: terms
version: "1.1.0"
effectiveDate: "2026-02-20"
---
```

## 버전 관리

- 홈(`/`)에서 앱별 최신 버전 자동 노출
- 문서 상세(`/docs/...`)에서 버전 칩으로 버전 이동
- 같은 앱/문서 타입의 버전을 semver 기준으로 정렬

## 새 버전 추가

```bash
npm run add-version -- \
  --app rocket-chat \
  --kind terms \
  --version 1.2.0 \
  --effective-date 2026-03-01
```

옵션:

- `--title`
- `--description`

실행 시:

1. MDX 파일 생성
2. 해당 폴더 `meta.json` 갱신(사이드바 반영)
3. 앱/문서 메뉴 메타 자동 보정
