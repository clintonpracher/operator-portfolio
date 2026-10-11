# Resume

This is the public resume for Clinton J. Pracher, a product and platform executive focused on enterprise platforms, data products, AI portfolios, and FIX-SCALE product environments.

## Target roles

- Principal Product Management (Platform, Data, AI)
- Director or Senior Director, Product Management
- Head of Platform / Data / AI Product

## Formats

| Surface | URL / file | Notes |
|---------|------------|-------|
| **Web resume** | [resume.md](resume.md) → `/resume/resume/` | **Live** fleet counts via `site.data.stats` with `as_of`. Contact icons (header + bottom connect): phone, location/email/LinkedIn/website as configured in site_settings. |
| **PDF download** | [clinton-pracher-platform-data-ai-resume.pdf](clinton-pracher-platform-data-ai-resume.pdf) | **Static** public export. Includes phone; no residential ZIP. |
| **Word download** | [clinton-pracher-platform-data-ai-resume.docx](clinton-pracher-platform-data-ai-resume.docx) | **Static** public export; not the private master. Includes phone; no residential ZIP. |
| **Plain text** | `clinton-pracher-platform-data-ai-resume.txt` | **Static** companion from public resume build. |

The **Download my resume** button on the web resume serves the **PDF only**.

Public resume patches: `practice-operations/claude-skills/resume-builder/references/patches_platform_portfolio_site.json`. Rebuild from the hub:

```bash
./scripts/build-portfolio-resume.sh
./scripts/lint-portfolio-privacy.sh
```

Do **not** hardcode skill / automation / scheduled-task counts in static resume copy. Website surfaces use live stats with an as-of date.

## Private source

Resume-advisor skill, OneDrive anchors, and `docs/product/YYYY-MM/portfolio/resume/` hold the private master archive (may retain private contact details).
