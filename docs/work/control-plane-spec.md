# Operator Control Plane: Public Spec Excerpt

**Audience:** Hiring managers, product leaders, portfolio visitors

---

## One-line recommendation

**Notion owns identity; Cursor owns human ops and preferred schedule execution; Claude owns shadow audit.** Scale by adding registered agents and automations: not by inventing a parallel agent system.

---

## Layered architecture

```text
1. Human control
   ├─ Cursor Agents Window + Chief of Staff agent
   ├─ Canvas Cockpit (ops dashboards)
   └─ Notion CEO Control Panel (deep drill)

2a. Identity and authority (Notion)
    ├─ Decision Log / Operating Spec
    ├─ Agent Registry + Agent Task Registry
    └─ Agent Runs / Handoffs (evidence)

2b. Execution hosts
    ├─ Cursor Automations (preferred schedule host)
    ├─ Claude Shadow (audit / render only)
    └─ ChatGPT (connector island)

3. Versioned procedures
   └─ GitHub skills library (65 skills, 35 scheduled)
```

---

## Core rules (load-bearing)

| Rule | What it means |
|------|---------------|
| **Single Active Writer** | One runtime may mutate each task's system of record. Others skip. |
| **Identity ≠ execution** | Agent identity lives in Notion, durable across chat windows. |
| **Audit ≠ ownership** | Shadow audit reports failures; it does not silently repair. |
| **Explicit islands** | If a connector only works on one host, name it. |
| **Human judgment on top** | Agents produce noise. Clint decides what becomes true. |

---

[← Back to Operator Control Plane](control-plane.md)
