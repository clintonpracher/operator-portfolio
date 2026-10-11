# Portfolio scripts

| Script | Purpose |
|--------|---------|
| `portfolio_stats.py` | Local inspect helper: prints `docs/_generated/stats.json` after sync |
| `render-control-plane-swimlanes-svg.mjs` | Swimlane SVG generator (refuses to overwrite approved on-call band without `--force`) |

Canonical fleet-count generation runs in the private hub:

```bash
python3 scripts/portfolio_stats.py
```
