/* =========================================
   EKRAMUL PORTFOLIO — JAVASCRIPT
   ========================================= */

/* ---- Floating Particles ---- */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const colors = ['#00ff88', '#00e5ff', '#bf5af2'];
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
})();

/* ---- Navbar scroll effect + active link ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active section highlight
    const sections = ['hero','about','projects','experience','resume','contact'];
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
})();

/* ---- Hamburger Menu ---- */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

/* ---- Typed Role Animation ---- */
(function initTyped() {
  const el    = document.getElementById('typed-role');
  if (!el) return;
  const roles = [
    'Software Developer',
    'Python Developer',
    'Bash Automation Expert',
    'DevOps Enthusiast',
    'Data Analyst',
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = roles[roleIdx];
    el.textContent = deleting
      ? current.slice(0, charIdx--)
      : current.slice(0, charIdx++);

    let delay = deleting ? 60 : 100;

    if (!deleting && charIdx > current.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIdx < 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      charIdx  = 0;
      delay    = 400;
    }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ---- Counter Animation ---- */
(function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  let started    = false;

  function startCounters() {
    counters.forEach(counter => {
      const target   = +counter.dataset.target;
      const duration = 2000;
      const step     = target / (duration / 16);
      let current    = 0;

      const update = () => {
        current = Math.min(current + step, target);
        const val = Math.floor(current);
        if (target === 86) {
          counter.textContent = (val / 10).toFixed(1);
        } else if (target === 99) {
          counter.textContent = val + '%';
        } else {
          counter.textContent = val + '+';
        }
        if (current < target) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    });
  }

  const hero = document.getElementById('hero');
  const obs  = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      startCounters();
    }
  }, { threshold: 0.4 });
  if (hero) obs.observe(hero);
})();

/* ---- Scroll Reveal ---- */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

/* ---- Skill Bars Animation ---- */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => obs.observe(b));
})();

/* ---- Contact Form ---- */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn     = document.getElementById('contact-submit-btn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email-input').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      // Simple shake animation on empty fields
      [name, email, message].forEach((v, i) => {
        const inputs = ['contact-name','contact-email-input','contact-message'];
        if (!v) {
          const inp = document.getElementById(inputs[i]);
          inp.style.borderColor = '#ff4d6d';
          inp.style.animation = 'none';
          setTimeout(() => { inp.style.animation = ''; }, 10);
        }
      });
      return;
    }

    // Simulate sending
    btn.textContent = '⏳ Sending...';
    btn.disabled    = true;
    setTimeout(() => {
      btn.textContent = '✅ Sent!';
      success.style.display = 'block';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled    = false;
        success.style.display = 'none';
      }, 5000);
    }, 1500);
  });
})();

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ---- Cursor glow effect (optional flair) ---- */
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.1s ease, top 0.1s ease;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
})();
