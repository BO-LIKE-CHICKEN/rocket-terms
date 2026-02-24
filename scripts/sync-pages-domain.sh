#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  sync-pages-domain.sh --domain <example.com> [--repo <owner/repo>] [--best-effort]

Options:
  --domain       Custom domain to bind to GitHub Pages (required)
  --repo         GitHub repository in owner/repo form (default: detect from env/git)
  --best-effort  Do not fail if API update or HTTPS enforcement is not ready yet
EOF
}

domain=""
repo=""
best_effort="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain)
      domain="${2:-}"
      shift 2
      ;;
    --repo)
      repo="${2:-}"
      shift 2
      ;;
    --best-effort)
      best_effort="true"
      shift 1
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$domain" ]]; then
  echo "Missing required --domain" >&2
  usage
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required." >&2
  exit 1
fi

resolve_repo_from_git() {
  local remote_url
  remote_url="$(git config --get remote.origin.url 2>/dev/null || true)"

  if [[ "$remote_url" =~ ^git@github\.com:([^/]+/[^/]+)(\.git)?$ ]]; then
    echo "${BASH_REMATCH[1]}"
    return 0
  fi

  if [[ "$remote_url" =~ ^https://github\.com/([^/]+/[^/]+)(\.git)?$ ]]; then
    echo "${BASH_REMATCH[1]}"
    return 0
  fi

  return 1
}

if [[ -z "$repo" ]]; then
  repo="${GITHUB_REPOSITORY:-}"
fi

if [[ -z "$repo" ]]; then
  repo="$(resolve_repo_from_git || true)"
fi

if [[ -z "$repo" ]]; then
  echo "Could not detect repository. Pass --repo <owner/repo>." >&2
  exit 1
fi

handle_failure() {
  local message="$1"
  if [[ "$best_effort" == "true" ]]; then
    echo "::warning::$message"
    exit 0
  fi
  echo "$message" >&2
  exit 1
}

echo "Applying custom domain '$domain' to '$repo'..."
if ! gh api -X PUT "repos/$repo/pages" -f cname="$domain" >/dev/null 2>&1; then
  handle_failure "Failed to set custom domain via Pages API."
fi

echo "Custom domain updated. Trying to enforce HTTPS..."

attempts=20
sleep_seconds=15

for ((i=1; i<=attempts; i++)); do
  if gh api -X PUT "repos/$repo/pages" -f cname="$domain" -F https_enforced=true >/dev/null 2>&1; then
    echo "HTTPS is now enforced."
    exit 0
  fi

  cert_state="$(gh api "repos/$repo/pages" --jq '.https_certificate.state // "unknown"' 2>/dev/null || echo "unknown")"
  https_enforced="$(gh api "repos/$repo/pages" --jq '.https_enforced // false' 2>/dev/null || echo "false")"

  echo "Attempt $i/$attempts: certificate_state=$cert_state https_enforced=$https_enforced"
  sleep "$sleep_seconds"
done

handle_failure "Custom domain is set, but HTTPS enforcement is not ready yet. Retry later; certificate provisioning may still be in progress."

