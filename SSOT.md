# SSOT (Single Source of Truth)

이 문서는 `rocket-terms` 프로젝트의 문서 구조/운영 규칙에 대한 단일 기준(Single Source of Truth)이다.

## 1. 문서 저장 구조

모든 약관/개인정보 문서는 아래 경로를 따른다.

```text
content/docs/apps/<app-slug>/<terms|privacy>/<version>.mdx
```

## 2. 현재 앱 식별자 규칙

- 현재 실서비스 앱 슬러그: `one-more-floor`
- 한층한층 개인정보 처리방침 경로: `content/docs/apps/one-more-floor/privacy/1.0.0.mdx`
- 추후 앱이 추가되면 `content/docs/apps/<new-app-slug>/...` 형태로 병렬 추가한다.

## 3. Frontmatter 필수 항목

문서에는 아래 필드를 반드시 포함한다.

- `title`
- `description`
- `app`
- `kind` (`terms` 또는 `privacy`)
- `version` (semver 권장)
- `effectiveDate` (`YYYY-MM-DD`)

## 4. 버전 운영 규칙

- 기존 버전 파일은 수정/덮어쓰기보다 새 버전 파일 추가를 우선한다.
- 버전은 semver 기준으로 최신 버전을 판별한다.
- 루트 문서 뷰는 `content/docs/apps/one-more-floor/privacy/*.mdx` 파일 집합을 기준으로 렌더링한다.

## 5. 작업 절차 규칙 (중요)

모든 구조/정책/운영 규칙 변경 작업은 아래 순서를 따른다.

1. SSOT(`SSOT.md`)를 먼저 업데이트한다.
2. SSOT와 일치하도록 코드/문서 파일을 수정한다.
3. 검증(타입체크/린트/빌드)을 수행한다.

이 규칙은 `AGEGNT.md`에 동일하게 명시하며, 에이전트 작업의 기본 절차로 적용한다.

## 6. 사용자 노출 정책

- 현재 공개 대상 앱은 `one-more-floor`이며, 다른 앱 문서는 사용자 노출 대상이 아니다.
- 사용자에게 실제로 노출하는 문서 범위는 `one-more-floor/privacy`만 허용한다.
- 루트(`/`)는 최신 개인정보 처리방침 1건만 노출한다.
- 버전별 고정 경로는 아래 구조를 따른다.

```text
/docs/apps/one-more-floor/privacy/<version>/
```

- 버전 전환 UI는 상단 셀렉트 박스 하나만 제공하며, 선택 시 같은 문서의 다른 버전 경로로 이동한다.
- `/docs/apps/one-more-floor/privacy/` 경로는 최신 버전을 노출하는 고정 진입점으로 사용한다.

## 7. 배포/정적 출력 정책

- 앱은 완전 정적 출력(Static Export)으로 배포한다.
- 빌드 결과물은 정적 파일(`out/`)만 사용하며 서버 런타임 의존성을 두지 않는다.
- 버전 페이지는 빌드 시점에 정적 생성한다.
- GitHub Pages 배포 시 기본 경로는 `/<repo-name>`이다.
- Repository Variable `PAGES_CUSTOM_DOMAIN`가 설정되면 `basePath`는 자동으로 `/`를 사용한다.
- 커스텀 도메인 사용 시 빌드 산출물에 `CNAME` 파일을 포함한다.
- Pages API를 통해 custom domain(`cname`) 및 HTTPS 강제(`https_enforced`)를 자동 동기화한다.

## 8. 검색엔진 비노출 정책

- 전체 페이지에 `noindex, nofollow` 메타 로봇 정책을 적용한다.
- `robots.txt`는 크롤링을 허용하되(`Allow: /`), 실제 색인 차단은 메타 로봇 정책으로 제어한다.
- 문서는 직접 URL 접근은 가능해야 하며, 인증/로그인 없이 열려야 한다(앱 심사 대응).
