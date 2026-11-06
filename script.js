'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const lightbox = document.querySelector('.lightbox');
const largeImage = lightbox?.querySelector('img');
const galleryLinks = [...document.querySelectorAll('.gallery-item')];
let previousFocus = null;

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
  navigation.classList.remove('is-open');
}
if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    navigation.classList.toggle('is-open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

if (lightbox && largeImage) {
  galleryLinks.forEach(link => link.addEventListener('click', event => {
    if (typeof lightbox.showModal !== 'function') return; // Keep native image link working as a fallback.
    event.preventDefault();
    previousFocus = document.activeElement;
    largeImage.src = link.href;
    largeImage.alt = link.querySelector('img')?.alt || 'Работа ученика';
    lightbox.showModal();
    document.body.classList.add('lightbox-open');
  }));
  lightbox.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target !== lightbox) return;
    const bounds = lightbox.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      lightbox.close();
    }
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('lightbox-open');
    largeImage.removeAttribute('src');
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    previousFocus = null;
  });
}
