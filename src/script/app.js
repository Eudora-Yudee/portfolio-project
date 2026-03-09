const roles = ["Frontend Developer", "UI-Focused Engineer", "I Turn Designs into Reality"];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function type() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 48 : 80);
}
type();

const grid = document.getElementById('projects-grid');

projects.forEach((project, i) => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <div class="card-image">
      <img src="${project.image}" alt="${project.name}" loading="lazy">
      <div class="card-overlay">
        <a href="${project.liveLink}" target="_blank" class="view-btn">
          View Live <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
    <div class="card-body">
      <h3>${project.name}</h3>
      <p>${project.description}</p>
    </div>`;
  grid.appendChild(card);
  setTimeout(() => card.classList.add('card-animate'), 200 + i * 150);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const navbar = document.getElementById('navbar');
const sections = ['home', 'about', 'projects', 'contact'];

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  const scrollPos = window.scrollY + 100;
  sections.forEach(id => {
    const sec = document.getElementById(id);
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (sec && link) {
      const isActive = scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight;
      link.classList.toggle('active', isActive);
    }
  });
});

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

const html      = document.documentElement;
const themeBtn  = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

themeBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
});

document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.textContent = '✓ Message sent! I\'ll be in touch soon.';
  msg.classList.add('show');
  e.target.reset();
  setTimeout(() => msg.classList.remove('show'), 4000);
});
