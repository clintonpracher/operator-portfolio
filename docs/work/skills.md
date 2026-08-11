---
layout: sectioned
title: Skills
permalink: /work/skills/
---

{% include skills-hero.html %}

{% include skills-audience-toggle.html %}

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
