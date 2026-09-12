# Skills

I work across product strategy, portfolio systems, data platforms, and applied AI. The common thread is decision rights: making ownership, tradeoffs, and execution visible enough to scale.

---

## Control plane architecture

The public architecture shows how judgment, authority, execution, and evidence fit together. Internal workflows and implementation mechanics stay private.

Roles in the stack:

| Layer | Public role |
|-------|-------------|
| **Knowledge Base** | Registry, task ownership, and system-of-record rows |
| **Agent Orchestration Layer** | Interactive and scheduled execution under Active Writer rules |
| **Audit LLM / review layer** | Read-only verification and independent challenge |
| **Registered integrations** | CRM, calendar, email, meeting intelligence, research APIs, source control |

This is a governed multi-LLM system, not a tool collection. Each active task has one accountable writer. Review remains separate from ownership, and human judgment stays on top.

[Operating Model for Multi-Agent AI](/work/control-plane-spec/)

---

## Agent OS (live proof)

Counts refresh on publish via `portfolio_stats.py`. See [Operator Control Plane proof](proof/control-plane.md).

---

## Technical literacy

- **Python** (portfolio build, governance scripts)
- **HTML / CSS** (Jekyll layouts, Imperious + case-study presentation)
- **SQL** (data platform fluency; Snowflake certified)
- **JavaScript** (Node/React where build tooling applies)

Visual tooling: Mermaid, Lucid (diagrams export to SVG for public site).

[← Back to Work](README.md)
