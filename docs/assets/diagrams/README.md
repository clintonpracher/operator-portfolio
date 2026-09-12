# Diagram assets

Public SVG diagrams for clintonpracher.com. Prefer SVG exports from Lucid; name files `{slug}.svg`.

## Enterprise public labeling

Diagrams on the public site use **product-facing labels**, not personal names or solo-operator org-chart titles.

| Internal / ops label | Public diagram label |
|----------------------|----------------------|
| Clinton Pracher / Clint | Decision maker |
| August Reeve · Chief of Staff | Orchestration agent |
| CP Product Advisory / personal ops | Independent operating model |
| Personal | Personal domain |
| Knowledge Base | Registry and identity |
| Agent Orchestration Layer | Scheduled and interactive execution |
| Audit layer | Read-only verification |
| Specialist agents · on-call | Specialist agents · on-call |

Internal ops truth with full names lives in `docs/product/2026-08/architecture-diagram-current-state.md` (not mirrored to the public site).

## Files

| File | Used on |
|------|---------|
| `architecture-one-glance.svg` | Work, Skills (Operator view), control-plane spec, Operator Control Plane case study (summary) |
| `architecture-agent-control-plane-swimlanes.svg` | Operator Control Plane case study (detail swimlanes) |
| `architecture-control-plane-detail.svg` | Legacy detail layout (superseded by swimlanes on case study) |
| `architecture-one-glance.png` | Social / TeeterBeaker (optional) |

Source Mermaid (structure reference): `architecture-agent-control-plane-swimlanes.mmd`

Public SVG (layout SSOT): run `node marketing-assets/operator-portfolio/scripts/render-control-plane-swimlanes-svg.mjs` after layout changes. Mirrors `.cursor/canvases/cp-control-plane-architecture.canvas.tsx`.

Visual: Imperious Luxury tokens (`midnight-authority`, `imperious-purple`, `slate-clarity`, Outfit/DM Sans).
