# Resume

This is the public resume for Clinton J. Pracher, a product and platform executive focused on enterprise platforms, data products, AI portfolios, and FIX-SCALE product environments.

## Target roles

- Principal Product Management (Platform, Data, AI)
- Director or Senior Director, Product Management
- Head of Platform / Data / AI Product

## Formats

| Surface | URL / file | Fleet numbers |
|---------|------------|---------------|
| **Web resume** | [resume.md](resume.md) → `/resume/resume/` | **Live** at Jekyll build via `site.data.stats` (skills, automations, scheduled tasks). Header contact row is four icon links: location (Las Vegas, NV maps search), email, LinkedIn, website. |
| **PDF download** | [clinton-pracher-platform-data-ai-resume.pdf](clinton-pracher-platform-data-ai-resume.pdf) | **Static** approved Word export (primary site download). |
| **Word download** | [clinton-pracher-platform-data-ai-resume.docx](clinton-pracher-platform-data-ai-resume.docx) | **Static** approved OneDrive master; hosted at direct URL, not linked from the resume page button. |
| **Plain text** | `clinton-pracher-platform-data-ai-resume.txt` | **Static** companion from repo build (not the web resume). |

The **Download my resume** button on the web resume serves the **PDF only**. Publish does not regenerate PDF or DOCX from the anchor unless you pass `--rebuild-resume` (avoid for the public site).

**Source of truth:** OneDrive `00_Main_Anchor_Resume/` (see `ONEDRIVE_PORTFOLIO_RESUME_DIR` in `scripts/lib/repo-config.sh`).

```bash
./scripts/sync-portfolio-resume-from-onedrive.sh
./scripts/publish-portfolio.sh
```

## Live stats on the web resume

Operator Control Plane proof on the web resume uses `leadership-proof.html` with `use_live_stats: true`. Counts come from `scripts/portfolio_stats.py` on every publish (same source as the home page and case studies). Do not hardcode skill or automation counts in web summary copy.

## Private source

Resume-advisor skill and `docs/product/YYYY-MM/portfolio/resume/` hold the private master archive.
