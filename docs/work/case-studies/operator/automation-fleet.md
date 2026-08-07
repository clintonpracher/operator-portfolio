---
layout: case-study
title: "Governed Automation at Fleet Scale"
subtitle: "Twenty-eight scheduled jobs, one Active Writer, and a fleet that reports its own health"
proof_points:
  - Control Plane
  - Operating Model
decision_shift: "From silent schedule failure to admitted gaps with a self-healing loop."
at_a_glance:
  - Cursor automations across six cutover waves
  - Active Writer registry with SKIPPED_NOT_OWNER discipline
  - Fleet health monitor and governance chain
  - ChatGPT to Cursor migration without duplicate runs
---

## The ops failure mode nobody schedules for

Running twenty-eight scheduled automations creates a classic failure mode: something stops running, nobody notices until the morning brief is stale or a CRM sync drifts.

I needed a fleet that could self-report health, admit gaps, and escalate only what requires human judgment.

## The diagnostic

Scheduled work without ownership is indistinguishable from scheduled work that failed quietly. The registry had to answer three questions every morning:

1. Who owns this write?
2. Did it run?
3. If not, is the gap admitted or hidden?

## What got built

**Twenty-eight Cursor automations** across six waves: CRM sync, career pipeline, governance chain, fleet health, content radar, morning brief.

**Active Writer governance.** Each job registered. Non-owners skip with `SKIPPED_NOT_OWNER`. No parallel heroic runs.

**Fleet health monitor.** Daily scan admits gaps to Governance Operations before Clint sits down.

**Governance chain.** Three-night audit cycle plus governance operations scan.

**Wave-based cutover.** ChatGPT tasks migrated to Cursor with explicit ownership transfer, not duplication.

| Category | Examples | Cadence |
|----------|----------|---------|
| Morning production | Morning brief, fleet health, job search sweep | Weekdays 6:00-6:30 AM PT |
| Overnight governance | Audit nights 1-3, governance scan | 2:00-4:00 AM PT |
| Business sync | CRM sync, pipeline dashboard | Daily / weekdays |
| Career | Job search sweep, weekly pipeline review | Daily / Friday |

## What changed

Silent failure stopped being the default. Gaps surface in Sweep Log and Agent Runs with evidence URLs. Cutover waves completed without breaking single-writer discipline.

Fleet health is detection. Governance audit is certification. Together they keep governed AI ops honest as the schedule grows.

## A fleet is an operating model

Automations are not scripts. They are commitments with owners. The fleet only scales when every commitment has one writer and one place to admit the truth when it slips.
