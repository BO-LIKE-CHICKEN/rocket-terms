# Rocket Terms

루트(`/`)와 버전 경로에서 `one-more-floor` 앱의 개인정보 처리방침 MDX를 보여주고, 상단 버전 셀렉트 박스로 버전을 전환하는 정적 웹앱입니다.

## SSOT

- 프로젝트 단일 기준 문서: [`SSOT.md`](./SSOT.md)
- 에이전트 작업 규칙: [`AGEGNT.md`](./AGEGNT.md)

## 스택

- Next.js (App Router)
- `gray-matter` (frontmatter 파싱)
- `remark` + `remark-gfm` + `remark-rehype` + `rehype-stringify` (MDX/Markdown 렌더)

## 시작하기

```bash
yarn install
yarn dev
```

브라우저에서 `http://localhost:3000` 접속.

## URL 구조

- 최신 문서(루트): `/`
- 최신 문서(고정 진입점): `/docs/apps/one-more-floor/privacy/`
- 버전 문서: `/docs/apps/one-more-floor/privacy/<version>/`

## 문서 구조

```text
content/docs/apps/<app-slug>/<terms|privacy>/<version>.mdx
```

현재 루트에서 실제로 노출하는 범위는 아래 경로입니다.

```text
content/docs/apps/one-more-floor/privacy/*.mdx
```

## 버전 전환 방식

- 상단 셀렉트 박스에서 버전 선택
- 선택 시 버전 고정 경로(`/docs/apps/one-more-floor/privacy/<version>/`)로 이동
- 루트(`/`)와 `/docs/apps/one-more-floor/privacy/`는 최신 버전 노출

## 정적 배포 / 비색인

- Next `output: export` 기반 완전 정적 출력
- `robots.txt` 크롤링 허용(`Allow: /`)
- 전역 메타 로봇 `noindex, nofollow`

## GitHub Pages 배포

- 워크플로: `.github/workflows/deploy-pages.yml`
- `main` 브랜치 push 시 `out/` 정적 산출물을 GitHub Pages로 배포
- 기본 `basePath`: `/<repo-name>`

커스텀 도메인 루트(`/`)로 배포할 경우, GitHub Repository Variables에 아래를 설정:

```text
NEXT_BASE_PATH=/
```

## 새 버전 추가

```bash
yarn add-version \
  --app one-more-floor \
  --kind privacy \
  --version 1.1.0 \
  --effective-date 2026-03-01
```
