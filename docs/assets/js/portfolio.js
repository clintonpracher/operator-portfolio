const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

if (toggle && navigation) {
  const closeNavigation = () => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('site-nav--open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('site-nav--open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeNavigation();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });
}

const skillsToggle = document.querySelector('.skills-audience-toggle');

if (skillsToggle) {
  const defaultAudience =
    skillsToggle.dataset.defaultAudience || 'director_vp';
  const panels = document.querySelectorAll('.skills-audience-panel');
  const pills = [...skillsToggle.querySelectorAll('.skills-audience-toggle__pill')];
  const status = skillsToggle.querySelector('.skills-audience-toggle__status');
  const storageKey = 'skillsAudience';

  const isValidAudience = (audienceId) =>
    pills.some((pill) => pill.dataset.audience === audienceId);

  const setAudience = (audienceId, persist = true) => {
    const audience = isValidAudience(audienceId) ? audienceId : defaultAudience;

    panels.forEach((panel) => {
      const match = panel.dataset.audience === audience;
      panel.hidden = !match;
    });

    pills.forEach((pill) => {
      const selected = pill.dataset.audience === audience;
      pill.setAttribute('aria-selected', String(selected));
      pill.classList.toggle('skills-audience-toggle__pill--selected', selected);
    });

    if (status) {
      const label = pills.find((pill) => pill.dataset.audience === audience)?.textContent?.trim();
      if (label) status.textContent = `Viewing skills for ${label}.`;
    }

    if (persist) {
      try {
        localStorage.setItem(storageKey, audience);
      } catch (_error) {
        /* ignore storage failures */
      }

      const url = new URL(window.location.href);
      url.searchParams.set('audience', audience);
      window.history.replaceState({}, '', url);
    }
  };

  const params = new URLSearchParams(window.location.search);
  const queryAudience = params.get('audience');
  let storedAudience = null;

  try {
    storedAudience = localStorage.getItem(storageKey);
  } catch (_error) {
    storedAudience = null;
  }

  const initialAudience = isValidAudience(queryAudience)
    ? queryAudience
    : isValidAudience(storedAudience)
      ? storedAudience
      : defaultAudience;

  setAudience(initialAudience, false);

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      setAudience(pill.dataset.audience || defaultAudience);
    });
  });
}
