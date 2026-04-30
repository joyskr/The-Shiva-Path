const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    });
  },
  { threshold: 0.52 }
);

sections.forEach((section) => sectionObserver.observe(section));

const closeNav = () => {
  if (!header || !navToggle) return;
  header.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
};

const openNav = () => {
  if (!header || !navToggle) return;
  header.classList.add('nav-open');
  navToggle.setAttribute('aria-expanded', 'true');
};

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (!header) return;
    const isOpen = header.classList.contains('nav-open');
    if (isOpen) closeNav();
    else openNav();
  });
}

if (nav) {
  nav.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest('a[href^="#"]');
    if (!link) return;
    closeNav();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeNav();
});

document.addEventListener('click', (event) => {
  if (!header || !navToggle) return;
  if (!header.classList.contains('nav-open')) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (header.contains(target)) return;
  closeNav();
});

window.addEventListener('resize', () => closeNav());

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submit = form.querySelector('button[type="submit"]');
    if (!submit) return;
    const original = submit.textContent;
    submit.textContent = 'Received';
    submit.disabled = true;
    setTimeout(() => {
      submit.textContent = original;
      submit.disabled = false;
      form.reset();
    }, 1400);
  });
});

