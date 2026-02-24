# AGEGNT 규칙

이 파일은 에이전트 작업 규칙을 정의한다.

## 기본 원칙

- 작업 시작 전 반드시 `SSOT.md`를 확인한다.
- 구조/정책/운영 규칙이 변경되는 요청은 **SSOT 업데이트를 먼저 수행한 뒤** 구현을 시작한다.
- 구현 결과는 SSOT와 불일치하면 안 된다.

## 작업 순서 (강제)

1. `SSOT.md` 업데이트
2. 코드/문서 작업 시작
3. `yarn types:check && yarn lint && yarn build` 검증

## 문서 경로 규칙

- 앱 문서 루트: `content/docs/apps`
- 앱별 문서: `content/docs/apps/<app-slug>/<terms|privacy>/<version>.mdx`
- 현재 기준 앱 슬러그: `one-more-floor`
