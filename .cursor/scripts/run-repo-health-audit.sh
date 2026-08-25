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
  )
  for hub in "${candidates[@]}"; do
    if [[ -f "$hub/scripts/audit-repo-health.mjs" ]]; then
      echo "$hub"
      return 0
    fi
  done
  return 1
}

HUB="$(resolve_hub || true)"
if [[ -z "$HUB" ]]; then
  echo "ERROR: CP hub not found. Set CP_PRODUCT_ADVISORY_ROOT or clone ~/CP-Product-Advisory." >&2
  exit 1
fi

exec node "$HUB/scripts/audit-repo-health.mjs" --from-cwd --write-json "$@"
