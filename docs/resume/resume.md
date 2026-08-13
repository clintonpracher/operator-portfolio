---
layout: resume
title: Resume
permalink: /resume/resume/
---

<div class="resume-header-block">

<h1 class="resume-header__title">Clinton J. Pracher</h1>

<p class="resume-tagline"><strong>DIRECTOR · AI/ML PLATFORMS</strong><br><strong>AGENTIC SYSTEMS · ENTERPRISE READINESS</strong></p>

<div class="resume-contact-row">
  {% include resume-header-icons.html %}
</div>

<div class="cta-row resume-header__cta">
  <a class="button button--primary" href="{{ site.data.site_settings.resume_pdf | relative_url }}" download>Download my resume</a>
</div>

</div>

## Summary

{% assign c = site.data.candidate %}
<p class="resume-summary">{{ c.positioning }}</p>

## Executive scope

{% include executive-scope.html %}

## Selected leadership proof

{% include leadership-proof.html %}

{% include resume-experience.html %}

{% include resume-education.html %}
