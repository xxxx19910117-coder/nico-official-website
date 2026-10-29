const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const toast = document.querySelector('.toast');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
});

document.querySelectorAll('.video-card').forEach((card) => {
  const url = card.dataset.instagramUrl?.trim();
  if (!url) return;
  card.querySelectorAll('.is-disabled').forEach((element) => {
    element.classList.remove('is-disabled');
    element.removeAttribute('aria-disabled');
    element.removeAttribute('tabindex');
    if (element.matches('.video-thumb, .video-link')) element.href = url;
    if (element.matches('.video-thumb')) {
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    }
  });
  const link = card.querySelector('.video-link');
  if (link) {
    link.textContent = 'Instagramで動画を見る ↗';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
