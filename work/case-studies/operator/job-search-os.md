---
layout: case-study
title: "Job Search as a Governed Product System"
subtitle: "Selectable lanes, admission templates, and a full apply-to-interview pipeline"
proof_points:
  - Decision Systems
  - Control Plane
decision_shift: "From spray-and-pray applications to a scored pipeline with enforced intake and apply contracts."
at_a_glance:
  - Selectable search lanes (platform AI / MarTech / both)
  - Role Radar + Job Search Tracker admission templates (template_id on every create)
  - Full pipeline: outreach log, contacts, rubric baseline through debrief
  - Six-application weekly cap with OS-Driven cohort tracking
  - Nine integrated skills in one Job Search OS
---

## Career search fails the same way product orgs fail

Most job searches optimize activity: more applications, more networking, more tools. The failure mode is the same as a product org without portfolio discipline: lots of motion, weak decision quality, no system that survives a busy week.

I applied the same operating logic I use at enterprise scale to my own career pipeline.

## The diagnostic

The constraint was not effort. It was **ungoverned intake and broken handoffs**. Roles entered the tracker without Fit Tier, Search Year, or Role Radar links. Outreach and rubric scoring sat beside the tracker but were not wired through apply. Discovery ran, but nothing enforced admission at create time.

## What got built

**Job Search OS** as a governed product system (reactivated August 2026):

- **Selectable lanes**: `platform_ai`, `martech`, or `both`; Clint sets mode, sweep reads config each run
- **Two-stage gates**: PM function filter, director scope gate, then 0-9 rubric before Role Radar auto-write
- **Admission templates**: Role Radar and Job Search Tracker rows require `template_id` + read-back verify; tracker template carries OS-Driven apply checklist
- **Full apply pipeline**: tracker → Pre-Interview Rubric baseline → application-outreach (Outreach Log + Contacts) → interview-debrief post-round rows
- **Six-application weekly cap** with OS-Driven Net-New / Re-Apply cohort
- **Nine integrated skills** plus daily sweep (Notion + Apify; Gmail drafts retired)

**Overnight automation** at 6 AM runs lane-aware discovery. Clint dispositions Role Radar at desk; brief surfaces queue with lane + resume fit.

## What changed

Applications became a portfolio decision with enforced contracts, not a morale exercise. Low-scoring and wrong-function roles exit at intake. High-scoring roles get resume-advisor depth, rubric baseline, and outreach logging on a single tracker row.

The pipeline has one system of record (Notion), one execution host for scheduled work (Cursor), and triple-aligned Template Library rows for admission.

## If you cannot govern your own search, you cannot sell governance

Hiring managers for Platform / Data / AI roles are buying decision systems. Running a governed search is proof that the architecture works on the hardest customer: you.
