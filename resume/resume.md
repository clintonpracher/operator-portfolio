---
layout: resume
title: Resume
permalink: /resume/resume/
---

# Clinton J. Pracher

<div class="resume-header-block">

<p class="resume-tagline"><strong>PRODUCT &amp; PLATFORM EXECUTIVE</strong><br><strong>DATA, AI &amp; ENTERPRISE TRANSFORMATION</strong></p>

<div class="resume-contact-row">
Las Vegas, NV · Remote US · <a href="mailto:clintonpracher@gmail.com">clintonpracher@gmail.com</a> · <a href="{{ site.data.site_settings.linkedin }}" rel="noopener noreferrer" target="_blank">LinkedIn</a> · <a href="https://clintonpracher.com">clintonpracher.com</a>
</div>

<div class="cta-row resume-header__cta">
  <a class="button button--primary" href="{{ site.data.site_settings.resume_pdf | relative_url }}" download>Download my resume</a>
  {% include linkedin-button.html %}
</div>

</div>

## Summary

{% assign c = site.data.candidate %}
{{ c.positioning }}

## Executive scope

{% include executive-scope.html %}

## Selected leadership proof

{% include leadership-proof.html %}

{% include resume-experience.html %}

{% include resume-education.html %}
