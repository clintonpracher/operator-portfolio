# Paste: Repo Health Monitor (per workspace)

**One paste per registered or client Cursor workspace** · not on CP hub (CP uses federator + full morning chain).

Open: **https://cursor.com/automations** → **New automation** (in **that repo's** workspace)

Do **not** JSON-import. Adjust cron from [`scripts/lib/repo-ops-registry.mjs`](../../scripts/lib/repo-ops-registry.mjs).

---

## Preview

**What it does:** Each morning, runs repo-specific health checks (git clean, profile bundle from registry), writes a **Sweep Log** row titled `Repo Health` with **Clint Action**, and completes an Agent Runs row when the task is registered.

**When:** Staggered 6:07-6:09 AM PT per repo (see registry cron).

**What Clint sees:**
- Sidebar row under **that repository** (Grouping = Repository, Status = Needs attention) when Clint Action is Needs you or Broken
- Sweep Log: `Repo Health` + Repository slug
- Hub brief **All Repos** section (via CP federator) when action required

**What it will not do:** Run fleet-health, operations-trust, or the full CP morning chain. Does not replace CP hub automations.

---

## Source

### Field table

| Field | Value |
|-------|-------|
| Name | `Repo Health Monitor (Cursor)` |
| Trigger | Scheduled · **Custom cron** · see registry (e.g. `CRON_TZ=America/Los_Angeles 7 6 * * *` for founder-operating-system) |
| Description | Daily repo health → Sweep Log `Repo Health`. Sidebar under this repository. |
| Tools | **Notion** |

### Instructions (paste as-is)

```
Run repo-health-monitor using .cursor/skills/repo-health-monitor/SKILL.md exactly.

Read .cursor/repo-health.json at this repo root for slug and profile. If missing, stop with FLAGS naming missing config.

Hard gate before any mutate:
1. Read Agent Task Registry task repo-health-monitor when registered.
2. If Active Writer is not Cursor, write one Agent Runs row with Status = Skipped Not Owner, then stop.

Run local audit:
  bash .cursor/scripts/run-repo-health-audit.sh
Do not use practice-operations/ paths; those exist only on CP hub. The wrapper resolves ~/CP-Product-Advisory or CP_PRODUCT_ADVISORY_ROOT.

Write Sweep Log row title Repo Health (no date in title). Set **Notes** = `Repository: {slug}`. Clint Action per fleet-health-human-labels (All clear / FYI only / August queue / Needs you / Broken).

Artifact close: notion-artifact-close contract on CP hub when reachable. No em dashes.
```

### Skill path

`.cursor/skills/repo-health-monitor/SKILL.md` (bootstrapped by `scripts/bootstrap-repo-ops.sh`)

### JSON reference

`.cursor/automations/repo-health-monitor.json` (template; cron varies per repo)

### Cron (by slug · SSOT: `scripts/lib/repo-ops-registry.mjs`)

| Slug | Workspace | Cron | Pacific |
|------|-----------|------|---------|
| `founder-operating-system` | founder-operating-system | `CRON_TZ=America/Los_Angeles 7 6 * * *` | **6:07 AM** |
| `operator-portfolio` | operator-portfolio | `CRON_TZ=America/Los_Angeles 8 6 * * *` | **6:08 AM** |

**Design system:** embedded in CP hub at `design-system/`; no separate workspace monitor. Archived standalone GitHub repo is read-only history.

**If your dashboard still shows 6:11 / 6:12 / 6:13:** update Trigger only; Instructions unchanged.

**Path note (`operator-portfolio`):** Federator and `--slug operator-portfolio` prefer `~/operator-portfolio` when that clone exists; `--from-cwd` in the monorepo folder `marketing-assets/operator-portfolio` resolves hub via walk-up to CP repo root (not a git repo itself). Standalone Cloud workspace: set secret `CP_PRODUCT_ADVISORY_ROOT` to hub path, or wrapper runs satellite fallback checks when hub is unreachable.

---

## Deploy checklist

1. Run `bash scripts/bootstrap-repo-ops.sh --slug <slug> --path <path> --tier registered --profile <profile>`
2. Open **that workspace** in Cursor → paste automation above
3. Save **Disabled** → Enable after Active Writer flip
4. Run Once → confirm Sweep Log row + sidebar under correct repo
