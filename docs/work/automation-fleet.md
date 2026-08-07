# Automation Fleet + Fleet Health

**Problem type:** FIX-SCALE — governed scheduled execution at scale

---

## Problem

Running 28+ scheduled automations creates a classic ops failure mode: something stops running, nobody notices until the morning brief is stale or a CRM sync drifts.

I needed a fleet that could self-report health, admit gaps, and escalate only what requires human judgment.

---

## What I built

- **28 Cursor automations** across six waves: CRM sync, career, governance chain, fleet health, content, morning brief
- **Active Writer governance** — each job registered; non-owners skip with `SKIPPED_NOT_OWNER`
- **Fleet health monitor** — daily 6:25 AM scan; admits gaps to Governance Operations
- **Governance chain** — three-night audit cycle, governance operations scan
- **Wave-based cutover** — ChatGPT tasks migrated to Cursor with explicit ownership transfer

| Category | Examples | Cadence |
|----------|----------|---------|
| Morning production | Morning brief, fleet health, job search sweep | Weekdays 6:00-6:30 AM |
| Overnight governance | Audit nights 1-3, governance scan | 2:00-4:00 AM |
| Business sync | CRM sync, pipeline dashboard | Daily / weekdays |
| Career | Job search sweep, weekly pipeline review | Daily / Fri |

---

## Outcome / proof

- Morning brief shows fleet status every day
- Fleet health admits gaps before I see stale data
- Disabling a job is explicit — no ghost schedules
- Six waves of migration with ownership transfer, not duplication

---

[← Back to Work](README.md) · [Governance Audit](governance-audit.md)
