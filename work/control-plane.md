# Operator Control Plane

**Problem type:** FIX-SCALE: operating model, governance, platform complexity

---

## Problem

Most product leaders scaling AI hit the same wall: more models, more agents, more dashboards, and less clarity about what is true. Three chat windows open. Every one thinks it is being helpful. Nobody can swear which system owns the morning brief, the CRM sync, or the audit trail.

The failure mode is not weak intelligence. It is conflicting state, duplicate writes, and eroded trust in the system of record.

---

## Decision architecture

![Operating architecture](../assets/architecture-one-glance.png)

**Core rule:** One Active Writer per task. If you are not the owner, you skip. No heroic double writes.

See also: [Public spec excerpt](control-plane-spec.md)

---

## What I built

- **Named concept:** Operator Control Plane: the ownership layer that assigns write authority across models, tools, and schedules
- **65 skills** in a versioned library, including 35 scheduled overnight tasks
- **28 Cursor automations** with Active Writer governance and fleet-health self-healing
- **Chief of Staff agent** orchestrating business and personal life on one decision architecture
- **Multi-MCP stack:** Notion, Gmail, Calendar, Fathom, GoHighLevel, Apify: unified under single-writer rules
- **Three-layer separation:** Identity (Notion) · Execution (Cursor) · Audit (Claude Shadow)

---

## Outcome / proof

| Scale | Evidence |
|-------|----------|
| **Enterprise** | 13-product AI/data portfolio across 100+ markets; $8M budget; 60+ team |
| **Solo operator** | Same decision architecture running product practice, job search, and personal admin on one operating logic |
| **Throughput** | Overnight automations produce morning brief, queue sweeps, governance scans |
| **Trust** | Adding a model feels like opening capacity, not opening a second brain |

---

## What I learned

> The wrong question is which model is best. The right question is which model owns this write today.

---

[← Back to Work](README.md) · [Writing index](../writing/README.md)
