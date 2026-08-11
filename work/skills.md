---
layout: sectioned
title: Skills
permalink: /work/skills/
---

<div class="page-hero page-hero--with-proof page-hero--skills">
  <div class="page-hero__main">
    {% include skills-hero.html %}
    {% include skills-audience-toggle.html %}
  </div>
  <div class="page-hero__proof">
    {% include skills-hero-proof.html %}
  </div>
</div>

---

{% include technical-capabilities.html %}

---

{% assign caps = site.data.capabilities %}
{% assign default_audience = caps.default_audience | default: "director_vp" %}
{% for key in caps.audience_order %}
{% assign audience = caps.audiences[key] %}
{% if audience.show_agent_os %}
<div class="skills-audience-panel skills-agent-os-panel" data-audience="{{ key }}"{% if key != default_audience %} hidden{% endif %}>
{% include agent-os.html %}
</div>
{% endif %}
{% endfor %}
