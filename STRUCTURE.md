# Repository structure

Public career package for [clintonpracher/operator-portfolio](https://github.com/clintonpracher/operator-portfolio) and [clintonpracher.com](https://clintonpracher.com/).

Authoritative factory lives in the private hub at `marketing-assets/operator-portfolio/`. This file ships with the public repo so readers know what is source vs generated.

## What to read first

| Path | Role |
|------|------|
| `README.md` | Leadership portfolio narrative (GitHub-first) |
| `STRUCTURE.md` | This guide |
| `work/case-studies/` | GitHub-readable enterprise and operator case studies |
| `resume/` | Sanitized public resume downloads + web resume source |
| `prompt_library/` | Approved public technical prompt examples |
| `docs/` | GitHub Pages site root (`clintonpracher.com`) |

## Authoritative vs generated

| Surface | Authoritative edit path | Generated / mirrored |
|---------|-------------------------|----------------------|
| Narrative + Explore links | `README.md` | n/a |
| Home page body | `content/home.md` | `docs/index.md` |
| About | `content/about/` | `docs/about/` |
| Work / case studies / skills templates | `work/` | `docs/work/` |
| Thought leadership index | `thought-leadership/` | `docs/thought-leadership/` |
| Writing posts | `writing/` | `docs/writing/` |
| Resume files | `resume/` | `docs/resume/` |
| Contact, experience data, includes | `integration/` | copied into `docs/` by design-kit apply |
| Layouts, CSS, kit defaults | `design-kit/site/` | copied into `docs/` then overlaid by `integration/` |
| Diagrams | `assets/diagrams/` | `docs/assets/diagrams/` |
| Live fleet counts | emitted by hub `scripts/portfolio_stats.py` | `integration/_data/stats.yml` · `docs/_generated/` |
| Prompt portfolio JSON | built from `prompt_library/` | `docs/_data/prompt_portfolio.json` |

Do not edit `docs/` as the standing path for content changes. Edit package sources, then run the hub mirror / publish scripts.

## Website vs GitHub

- **Website:** Jekyll builds from `docs/` (GitHub Pages source = `main` `/docs`).
- **GitHub README:** Markdown + SVG diagrams. Explore links that need assembled pages point at clintonpracher.com; case studies and resume downloads stay readable in-repo.
- Liquid includes in `work/README.md`, `work/skills.md`, and similar templates are for the site build. They are not complete pages on github.com.

## Supporting tools

| Path | Role |
|------|------|
| `scripts/` (hub) | `mirror-portfolio-docs.sh`, `publish-portfolio.sh`, `sync-portfolio.sh`, lints, resume build |
| `.cursor/` | Minimal public-safe repo-health monitor config for this workspace |
| `design-kit/` | Locked visual kit; not a second content SSOT |
| `integration/` | Site data and include overlays on top of the kit |

Private publish notes for hub operators: `PUBLISH.md` in the factory (not synced to the public clone).

## Diagrams

Current approved public diagrams:

- `assets/diagrams/architecture-one-glance.svg`
- `assets/diagrams/architecture-agent-control-plane-swimlanes.svg`

See `assets/diagrams/README.md` for generation limits (including the swimlane on-call band). Legacy detail SVG may remain for history; do not treat it as the README source.

## Privacy baseline

Website chrome may include phone via site_settings (About contact, home call link, footer when present), plus Las Vegas, email, LinkedIn, and website. Public resume downloads may include phone. Residential ZIP stays out of the public package. Private resume masters remain on the hub / OneDrive anchor.
