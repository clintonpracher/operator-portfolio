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

const roleCardsPanel = document.querySelector('.role-cards-panel');
if (roleCardsPanel) {
  const mobileRolesQuery = window.matchMedia('(max-width: 40rem)');

  const syncRoleCardsPanel = () => {
    if (mobileRolesQuery.matches) {
      roleCardsPanel.removeAttribute('open');
      return;
    }

    roleCardsPanel.setAttribute('open', '');
  };

  syncRoleCardsPanel();
  mobileRolesQuery.addEventListener('change', syncRoleCardsPanel);
}
