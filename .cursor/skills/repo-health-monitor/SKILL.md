---
name: repo-health-monitor
description: >
  Satellite workspace repo health monitor. Uses CP hub audit script via
  .cursor/scripts/run-repo-health-audit.sh. Bootstrapped by bootstrap-repo-ops.sh.
metadata:
  source: cursor-automation
  host: cursor-automation
---

# Repo Health Monitor (satellite workspace)

Runs in **this workspace's** Cursor Automation context (not the private hub). Profile and slug come from `.cursor/repo-health.json`.

No em dashes. Never fabricate. Headless: never ask and wait.

## Hard gate

1. Read `.cursor/repo-health.json` for `slug` and `profile`. If missing, stop with FLAGS naming missing config.
2. When the private hub is reachable, read Agent Task Registry for `repo-health-monitor`. If Active Writer is not Cursor, write Agent Runs row Status = Skipped Not Owner and stop.
3. If Active Writer is Cursor (or task not registered), claim Agent Runs when a registry row exists.

Idempotency Key: `repo-health-monitor:<slug>:<today PT YYYY-MM-DD>`.

Agent Runs contract: load from the private hub `practice-operations/claude-skills/scheduled/_contracts/agent-runs.md` when the hub is reachable; otherwise populate all required scalar fields at claim and complete.

## STEP 1 · Run local audit

From this repo root:

```bash
bash .cursor/scripts/run-repo-health-audit.sh
```

Do **not** use `practice-operations/claude-skills/...` paths in this public package; those exist only on the private hub. If the wrapper fails, set Clint Action = Broken and name the hub resolution error in FLAGS.

Map checks to Clint Action:

| Condition | Clint Action |
|-----------|--------------|
| All checks pass | All clear |
| Warn only (dirty git, FYI lint) | FYI only |
| First-time fail, hub staff can fix | Queue for hub |
| Path missing, repeated fail, client exposure | Needs you |
| Monitor could not run or body blank | Broken |

## STEP 2 · Sweep Log (durable record)

When the private hub and Notion are reachable, write a Sweep Log row using the hub artifact and Sweep Log contracts (do not hardcode private database IDs in this public skill).

Query for title `Repo Health`, Sweep Date = today (America/Los_Angeles). Dedupe by **Notes** = `Repository: {slug}` (required). Reuse or create.

Properties:
- **Title** = `Repo Health` (no date in title)
- **Sweep Date** = today PT
- **Status** = Active
- **Notes** = `Repository: {slug}`
- **Lane Focus** = Cross-Lane
- **Sweep Health** = Light (All clear) | Standard | Heavy (Needs you / Broken)

Body (replace_content on close):
- **Clint Action:** {label}
- **Repository:** {slug}
- **Profile:** {profile}
- **Checks table:** `| Check | Status | Detail |`
- **FLAGS:** one line per non-pass check

## STEP 3 · Governance Operations (chronic only)

If the same check failed on 3+ consecutive days for this slug, admit a governance finding when hub contracts are reachable. Finding key pattern: `REPO-HEALTH|<slug>|<check-id>`.

## STEP 4 · Complete Agent Runs

Evidence URL = today's Repo Health Sweep Log page URL when written. Summary = Clint Action + fail count.
