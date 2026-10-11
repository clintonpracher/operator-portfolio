#!/usr/bin/env python3
"""Print pre-generated portfolio fleet stats from docs/_generated/stats.json.

Authoritative generation runs from the CP Product Advisory monorepo:
  python3 scripts/portfolio_stats.py

This package copy is a local inspect helper after publish/sync. It does not
compute counts.
"""

from __future__ import annotations

import json
from pathlib import Path

STATS_PATH = Path(__file__).resolve().parents[1] / "docs/_generated/stats.json"


def main() -> int:
    if not STATS_PATH.is_file():
        print("stats.json not found; run monorepo scripts/portfolio_stats.py before publish")
        return 1
    data = json.loads(STATS_PATH.read_text(encoding="utf-8"))
    print(json.dumps(data, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
