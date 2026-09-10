#!/usr/bin/env bash
# Run repo health audit for a satellite workspace via CP hub scripts.
# Bootstrapped into registered/client repos by scripts/bootstrap-repo-ops.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

resolve_hub() {
  if [[ -n "${CP_PRODUCT_ADVISORY_ROOT:-}" && -f "${CP_PRODUCT_ADVISORY_ROOT}/scripts/audit-repo-health.mjs" ]]; then
    echo "$CP_PRODUCT_ADVISORY_ROOT"
    return 0
  fi
  local candidates=(
    "$HOME/CP-Product-Advisory"
    "$(dirname "$REPO_ROOT")/CP-Product-Advisory"
    "/workspace/CP-Product-Advisory"
  )
  for hub in "${candidates[@]}"; do
    if [[ -f "$hub/scripts/audit-repo-health.mjs" ]]; then
      echo "$hub"
      return 0
    fi
  done
  # Walk up from repo root (covers monorepo marketing-assets/operator-portfolio -> hub at repo root)
  local dir="$REPO_ROOT"
  local i=0
  while [[ $i -lt 6 ]]; do
    if [[ -f "$dir/scripts/audit-repo-health.mjs" ]]; then
      echo "$dir"
      return 0
    fi
    [[ "$dir" == "/" ]] && break
    dir="$(dirname "$dir")"
    i=$((i + 1))
  done
  return 1
}

run_satellite_fallback() {
  local slug profile fail=0 warn=0
  slug="$(node -e "try{console.log(JSON.parse(require('fs').readFileSync('.cursor/repo-health.json','utf8')).slug||'')}catch(e){process.exit(1)}" 2>/dev/null || echo "")"
  profile="$(node -e "try{console.log(JSON.parse(require('fs').readFileSync('.cursor/repo-health.json','utf8')).profile||'')}catch(e){process.exit(1)}" 2>/dev/null || echo "")"

  echo "Repo Health — ${slug:-unknown} — $(TZ=America/Los_Angeles date +%F) [satellite fallback, hub unreachable]"
  echo "Clint Action: FYI only"
  echo "  [warn] CP hub audit: Hub not found; set CP_PRODUCT_ADVISORY_ROOT for full profile checks"

  if [[ ! -f .cursor/repo-health.json ]]; then
    echo "  [fail] Repo health config: .cursor/repo-health.json missing"
    fail=$((fail + 1))
  else
    echo "  [pass] Repo health config: slug=${slug}, profile=${profile}"
  fi

  if [[ ! -f .cursor/scripts/run-repo-health-audit.sh ]]; then
    echo "  [fail] Audit wrapper: missing"
    fail=$((fail + 1))
  else
    echo "  [pass] Audit wrapper: present"
  fi

  if [[ ! -f .cursor/skills/repo-health-monitor/SKILL.md ]]; then
    echo "  [fail] Skill file: missing"
    fail=$((fail + 1))
  else
    echo "  [pass] Skill file: present"
  fi

  if [[ -d .git ]]; then
    local dirty
    dirty="$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')"
    if [[ "$dirty" == "0" ]]; then
      echo "  [pass] Git working tree: clean"
    else
      echo "  [warn] Git working tree: ${dirty} uncommitted change(s)"
      warn=$((warn + 1))
    fi
  else
    echo "  [warn] Git working tree: not a git repository"
    warn=$((warn + 1))
  fi

  if [[ "$profile" == "portfolio" || -f integration/_config.yml ]]; then
    if [[ -f integration/_config.yml ]]; then
      echo "  [pass] Jekyll site root: integration/_config.yml present"
    else
      echo "  [warn] Jekyll site root: integration/_config.yml missing"
      warn=$((warn + 1))
    fi
  fi

  if [[ $fail -gt 0 ]]; then
    echo "Clint Action: Broken"
    return 1
  fi
  return 0
}

HUB="$(resolve_hub || true)"
if [[ -z "$HUB" ]]; then
  echo "WARN: CP hub not found; running satellite fallback checks." >&2
  run_satellite_fallback
  exit $?
fi

exec node "$HUB/scripts/audit-repo-health.mjs" --from-cwd --write-json "$@"
