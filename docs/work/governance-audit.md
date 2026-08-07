# Governance Audit Cycle

**Problem type:** FIX-SCALE: certification rigor for governed systems

---

## Problem

Daily governance scans detect rule violations, but detection is not certification. I needed periodic certification that the governed system still agrees with its own rules, with remediation authority, verification, and human judgment only when required.

---

## Three-night cycle

1. **Night 1. Read-Only:** Run full audit. Produce verdict. Split into fix pile and decide pile. Change nothing.
2. **Morning:** Decisions appear in daily brief. I disposition in under a minute.
3. **Night 2: Remediation:** Execute approved fixes. Own Audit Log record.
4. **Night 3: Verification:** Confirm fixes landed. Close cycle or escalate.

**Operating principle:** Deep system work happens when I'm not at the desk. I see decisions in the morning; the work is done at night.

---

## What I built

- **Three-night certification cycle** with separate Audit Log records per night
- **Surfacing taxonomy**, fix silently, stage and wait, or queue for human
- **Mechanical remediation**, missing relations, stale counts, superseded versions
- **Human-only gates**, intent, schema changes, deletions, money, published content
- **Separation**, daily scan = detection; audit = certification with verdict

---

## Outcome / proof

- Three separate records per cycle, found vs. changed vs. verified
- I decide in under a minute; hours of audit work happen overnight
- Remediation without verification is a claim, not a fix, night 3 is mandatory

---

[← Back to Work](README.md) · [Automation Fleet](automation-fleet.md)
