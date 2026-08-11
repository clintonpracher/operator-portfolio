# Prompt Library

Source of truth for the public **Prompt Library** on clintonpracher.com (`/prompt-library/`).

## Authoring contract

- **Author:** Clinton Pracher. Agent drafts require Clint edit and approval before `status: published`.
- **Voice:** Enterprise product operations. Decision systems, launch readiness, stakeholder alignment, AI product governance.
- **Do not include:** Cursor paths, skill packaging, Notion IDs, agent personas, client names, internal business ops, or AI/tooling attribution.
- **Lint:** `./scripts/lint-prompt-portfolio.sh` must pass before publish.
- **Build:** `./scripts/build-prompt-portfolio.mjs` compiles published entries into Jekyll data and detail pages.

## Files

| Path | Role |
|------|------|
| `catalog.json` | Metadata, author attestation, publish status |
| `prompts/<slug>.ts` | TypeScript prompt spec (displayed as code on site) |

## Publish gate

Only entries with `"status": "published"` in `catalog.json` appear on the site.
