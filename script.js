document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('menu-close');
  const sideMenu = document.getElementById('side-menu');
  const backdrop = document.getElementById('menu-backdrop');
  const menuLinks = sideMenu.querySelectorAll('a');

  function openMenu() {
    sideMenu.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    sideMenu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    sideMenu.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    sideMenu.setAttribute('aria-hidden', 'true');
  }

  toggleBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Clicking the backdrop closes the menu
  backdrop.addEventListener('click', closeMenu);

  // Close menu when an internal anchor link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu.classList.contains('open')) {
      closeMenu();
    }
  });
});







const copyLinkBtn = document.getElementById('copy-link-btn');
const citeBtn = document.getElementById('cite-btn');

function flashIcon(button, successIconClass) {
  const icon = button.querySelector('i');
  if (!icon) return;
  const originalClass = icon.className;

  icon.className = `bi ${successIconClass}`;
  button.classList.add('copied');

  setTimeout(() => {
    icon.className = originalClass;
    button.classList.remove('copied');
  }, 1500);
}

if (copyLinkBtn) {
  copyLinkBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flashIcon(copyLinkBtn, 'bi-check-lg');
    } catch (_) {
      // Fallback if clipboard permission is blocked
    }
  });
}

if (citeBtn) {
  citeBtn.addEventListener('click', async () => {
    const titleText = document.querySelector('.main-content .title')?.innerText.trim() || document.title;
    const authorText = document.querySelector('.main-content .author')?.innerText.trim() || '';
    const citation = `${authorText ? authorText + '. ' : ''}"${titleText}." Latinaris. ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(citation);
      flashIcon(citeBtn, 'bi-check-lg');
    } catch (_) {
      // Fallback if clipboard permission is blocked
    }
  });
}