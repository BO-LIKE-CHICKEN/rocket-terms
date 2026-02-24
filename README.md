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
- 커스텀 도메인 설정 시 자동으로 `basePath=/` 전환 + `out/CNAME` 생성

### 커스텀 도메인 + HTTPS 강제 준비 상태

아래만 설정하면, 이후 배포 시 도메인 바인딩과 HTTPS 강제를 자동 시도합니다.

1. Repository Variable 추가

```text
PAGES_CUSTOM_DOMAIN=<your-domain>
```

2. (권장) Repository Secret 추가  
`PAGES_ADMIN_TOKEN`: Pages 설정 API 권한이 있는 토큰  
토큰 권한은 GitHub Pages API 요구사항(`Pages:write`, `Administration:write`)을 따라야 합니다.

3. `main` 브랜치로 push

자동으로 실행되는 것:

- 정적 빌드 시 커스텀 도메인용 `basePath=/` 적용
- `out/CNAME` 생성
- Pages API로 `cname`와 `https_enforced=true` 적용 시도
- 인증서 발급 지연 시 `.github/workflows/sync-pages-domain.yml`가 매시간 재시도

### 도메인 전달 후 즉시 수동 동기화

```bash
yarn pages:sync-domain -- --domain <your-domain> --repo <owner/repo>
```

또는 Actions에서 `Sync Pages Custom Domain` 워크플로를 수동 실행해도 됩니다.

`one-more-floor.com` 고정으로 한 번에 준비하려면:

```bash
yarn pages:prepare-one-more-floor
```

## 새 버전 추가

```bash
yarn add-version \
  --app one-more-floor \
  --kind privacy \
  --version 1.1.0 \
  --effective-date 2026-03-01
```
