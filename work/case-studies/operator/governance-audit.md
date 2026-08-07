---
layout: case-study
title: "Three Nights to Certify the Fleet"
subtitle: "Read-only audit, approved remediation, verification: governance without theater"
proof_points:
  - Control Plane
  - Decision Systems
decision_shift: "From ad hoc fixes to a repeatable certification rhythm."
at_a_glance:
  - Night 1 read-only audit across registry and schedules
  - Night 2 approved remediation only
  - Night 3 post-fix verification
  - Governance Operations scan for daily drift
---

## Growth without certification is hope

As the Operator Control Plane grew, so did the attack surface for drift: stale registry rows, duplicate writers, schedules without Agent Runs evidence, titles with date tokens that break deduplication.

Daily fleet health catches acute failure. Periodic certification catches structural rot.

## The diagnostic

Governance fails when it is either too heavy (nobody runs it) or too light (nobody trusts it). The pattern had to fit three constraints:

1. **Read-only first.** See the truth before changing it.
2. **Approved remediation second.** No surprise writes.
3. **Verification third.** Prove the fix held.

## What got built

**Three-night certification cycle:**

- **Night 1:** Read-only audit across Agent Task Registry, Automations, and recent Agent Runs
- **Night 2:** Remediation from an approved list only
- **Night 3:** Post-fix verification and variance report

**Governance Operations scan** runs daily for drift between certification cycles.

**Log title hygiene:** sweep titles are type labels only; dates live in date columns.

## What changed

Registry rows either have a named Active Writer, explicit Pending Cutover, or Deprecated. Silent unowned work is treated as a defect.

Terminal Agent Runs rows require evidence URLs. Fleet health treats missing evidence as silent-fail even when the sweep log looks green.

## Certification is how systems think long term

A fleet that only reacts to alarms learns. A fleet that certifies on a rhythm compounds. The three-night pattern is the smallest loop that forces read, fix, and prove without collapsing audit into execution.
