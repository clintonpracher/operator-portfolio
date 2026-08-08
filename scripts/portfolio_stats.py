#!/usr/bin/env python3
"""Portfolio stats helper published with operator-portfolio.

Canonical generator runs from the CP Product Advisory monorepo:
  scripts/portfolio_stats.py

This copy exists in the public portfolio repo for transparency and
GitHub language detection. It reads pre-generated stats when present.
"""

from __future__ import annotations

import json
from pathlib import Path

STATS_PATH = Path(__file__).resolve().parents[1] / "docs/_generated/stats.json"


def main() -> int:
    if not STATS_PATH.is_file():
        print("stats.json not found; run monorepo portfolio_stats.py before publish")
        return 1
    data = json.loads(STATS_PATH.read_text(encoding="utf-8"))
    print(json.dumps(data, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
