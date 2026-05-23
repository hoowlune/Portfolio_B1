// === ANNÉE FOOTER ===
document.getElementById('year').textContent = new Date().getFullYear();

// === ÉTOILES (canvas) ===
(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 7000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.1 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.3,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = Date.now() / 1000;
    stars.forEach(s => {
      const alpha = ((Math.sin(now * s.speed + s.phase) + 1) / 2) * 0.65 + 0.1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210, 200, 255, ${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  initStars();
  draw();
  window.addEventListener('resize', () => { resize(); initStars(); });
})();

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// === MENU MOBILE ===
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// === EFFET MACHINE À ÉCRIRE ===
const phrases = [
  'Développeuse web en formation',
  'Créatrice de jeux interactifs',
  'Passionnée par le code et le design',
  'Étudiante à Sup de Vinci',
];

let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;

const typedEl = document.getElementById('typed');

function typeWriter() {
  const current = phrases[phraseIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 2200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }

  setTimeout(typeWriter, deleting ? 45 : 78);
}

typeWriter();

// === TAROT : retournement au clic (support tactile) ===
document.querySelectorAll('.tarot-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// === SCROLL REVEAL ===
const revealSelectors = [
  '.section-title',
  '.about-text',
  '.about-card',
  '.arch-card',
  '.tarot-card',
  '.contact-intro',
  '.contact-card',
];

revealSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.09) + 's';
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// === LIENS NAV + POINTS ACTIFS AU SCROLL ===
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');
const dots       = document.querySelectorAll('.dot');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navLinkEls.forEach(link => link.classList.toggle('active', link.getAttribute('href') === id));
      dots.forEach(dot => dot.classList.toggle('active', dot.getAttribute('href') === id));
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObs.observe(s));
