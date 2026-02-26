# SSOT (Single Source of Truth)

이 문서는 `rocket-terms` 프로젝트의 문서 구조/운영 규칙에 대한 단일 기준(Single Source of Truth)이다.

## 1. 문서 저장 구조

개인정보 처리방침 문서는 아래 경로를 따른다.

```text
docs/policies/privacy/versions/<policy-date>.mdx
```

여기서 `policy-date`는 `YYYY-MM-DD` 형식이다.

## 2. 버전 매핑 파일

앱 마케팅 버전(`CFBundleShortVersionString`)과 정책 날짜의 매핑은 아래 파일에 저장한다.

```text
docs/policies/privacy/version-map.json
```

매핑 스키마:

- `minAppVersion`: 해당 정책이 적용되는 최소 앱 버전(semver)
- `policyDate`: 노출할 정책 날짜(`YYYY-MM-DD`)

## 3. Frontmatter 필수 항목

문서에는 아래 필드를 반드시 포함한다.

- `title`
- `description`
- `policyDate` (`YYYY-MM-DD`)
- `effectiveDate` (`YYYY-MM-DD`)

## 4. 버전 선택 규칙

- 입력 앱 버전 기준으로, `minAppVersion <= 앱 버전` 조건을 만족하는 매핑 중 가장 큰 `minAppVersion`의 `policyDate`를 선택한다.
- 매핑이 하나도 없으면 정책 날짜 파일 중 최신 날짜를 기본 정책으로 사용한다.
- 기존 정책 파일을 수정/덮어쓰기보다 새 날짜 파일 추가를 우선한다.

## 5. 작업 절차 규칙 (중요)

모든 구조/정책/운영 규칙 변경 작업은 아래 순서를 따른다.

1. SSOT(`SSOT.md`)를 먼저 업데이트한다.
2. SSOT와 일치하도록 코드/문서 파일을 수정한다.
3. 검증(타입체크/린트/빌드)을 수행한다.

이 규칙은 `AGEGNT.md`에 동일하게 명시하며, 에이전트 작업의 기본 절차로 적용한다.

## 6. 사용자 노출 정책

- 사용자에게 실제로 노출하는 문서 범위는 `privacy`만 허용한다.
- 루트(`/`)는 최신 개인정보 처리방침 1건만 노출한다.
- 고객지원 페이지는 `/support` 단일 경로로 노출한다.
- 정책 날짜별 고정 경로는 아래 구조를 따른다.

```text
/policies/privacy/<policy-date>/
```

- 버전 전환 UI는 상단 셀렉트 박스 하나만 제공하며, 선택 시 같은 문서의 다른 정책 날짜 경로로 이동한다.
- `/policies/privacy/` 경로는 최신 정책을 노출하는 고정 진입점으로 사용한다.
- `/policies/privacy/?appVersion=<x.y.z>`로 진입하면 버전 매핑 규칙에 따라 정책 날짜 경로로 연결한다.
- 공개 URL 기준 도메인은 `https://one-more-floor.com`을 사용한다.

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
