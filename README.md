# Rocket Terms

정적 개인정보 처리방침 문서를 웹으로 제공하는 프로젝트입니다.

## SSOT

- 프로젝트 기준 문서: [`SSOT.md`](./SSOT.md)
- 에이전트 규칙: [`AGEGNT.md`](./AGEGNT.md)

## URL 구조

- 루트 최신 정책: `/`
- 정책 최신 진입점: `/policies/privacy/`
- 정책 날짜별 문서: `/policies/privacy/<policy-date>/`
- 앱 버전 자동 선택 URL: `/policies/privacy/?appVersion=<cfbundle-short-version>`
- 고객지원 페이지: `/support`

예시:

- `/policies/privacy/2026-02-24/`
- `/policies/privacy/?appVersion=1.0.0`

## 문서 구조

```text
docs/policies/privacy/versions/<policy-date>.mdx
```

## Privacy Policy Version Map

앱 마케팅 버전(`CFBundleShortVersionString`)별 적용 정책을 날짜로 매핑합니다.

| 앱 버전(이상) | 정책 날짜 | 문서 경로 | 공개 URL |
| --- | --- | --- | --- |
| 1.0.0 | 2026-02-24 | `docs/policies/privacy/versions/2026-02-24.mdx` | `https://one-more-floor.com/policies/privacy/2026-02-24` |

맵 파일:

```text
docs/policies/privacy/version-map.json
```

### 선택 규칙

- 현재 앱 버전을 기준으로, `현재 앱 버전 이하` 매핑 중 가장 최신(가장 큰 버전)을 선택합니다.
- 매핑이 하나도 없으면 기본 정책(최신 파일)을 사용합니다.

## 로컬 실행

```bash
yarn install
yarn dev
```

## 새 정책 추가

```bash
yarn add-version \
  --min-app-version 1.1.0 \
  --policy-date 2026-04-01 \
  --effective-date 2026-04-01
```

## 배포

- 완전 정적 출력: Next `output: export`
- GitHub Pages 배포 워크플로: `.github/workflows/deploy-pages.yml`
- 커스텀 도메인/HTTPS 동기화 워크플로: `.github/workflows/sync-pages-domain.yml`

`one-more-floor.com` 도메인 준비 커맨드:

```bash
yarn pages:prepare-one-more-floor
```
