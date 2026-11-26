/* ============================================================
   SONY Vannet — CV / Portfolio
   Interactions & animation engine (vanilla JS, no dependencies)
   ============================================================ */

(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ----------------------------------------------------------
     1. Theme (persisted, respects OS preference)
     ---------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = $('#theme-toggle');
  const stored = localStorage.getItem('theme');
  const initial = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    $('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#071319' : '#f6f8fb');
    document.dispatchEvent(new CustomEvent('cv:themechange', { detail: { theme } }));
  };

  applyTheme(initial);

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  /* ----------------------------------------------------------
     2. Scroll reveals (IntersectionObserver + stagger)
     ---------------------------------------------------------- */
  const revealEls = $$('[data-reveal]');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    // stagger siblings that reveal together
    const groups = new Map();
    revealEls.forEach((el) => {
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, 0);
      const index = groups.get(parent);
      el.style.setProperty('--d', `${Math.min(index * 80, 480)}ms`);
      groups.set(parent, index + 1);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------
     3. Scroll progress + sticky nav + active link + to-top
     ---------------------------------------------------------- */
  const nav = $('#nav');
  const progress = $('#progress');
  const toTop = $('#to-top');
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');

  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

    nav?.classList.toggle('is-stuck', y > 40);

    if (toTop) {
      const shown = y > window.innerHeight * 0.8;
      toTop.classList.toggle('is-shown', shown);
      toTop.setAttribute('aria-hidden', String(!shown));
    }

    // active nav link
    let current = sections[0]?.id;
    const offset = y + (nav?.offsetHeight || 0) + 120;
    sections.forEach((section) => {
      if (offset >= section.offsetTop) current = section.id;
    });
    if (y + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1]?.id;
    }

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  /* ----------------------------------------------------------
     4. Mobile menu
     ---------------------------------------------------------- */
  const burger = $('#nav-burger');
  const menu = $('#nav-menu');

  const closeMenu = () => {
    menu?.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
    burger?.setAttribute('aria-label', 'Open menu');
  };

  burger?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (e) => {
    if (menu?.classList.contains('is-open') && !menu.contains(e.target) && !burger.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ----------------------------------------------------------
     5. Typed headline (language-aware, grapheme-safe)
     ---------------------------------------------------------- */
  const typedEl = $('#typed');

  const rolesFor = (lang) => window.CV_I18N?.get(lang)?.heroRoles ?? ['Junior Developer'];

  // Khmer stacks coeng/vowel signs into a single visible glyph, so slicing by
  // code unit would flash orphaned marks. Slice by grapheme cluster instead.
  const graphemes = (str) => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
      return [...seg.segment(str)].map((s) => s.segment);
    }
    return [...str];
  };

  if (typedEl) {
    let phrases = rolesFor(document.documentElement.lang).map(graphemes);
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = null;

    const tick = () => {
      const glyphs = phrases[phraseIndex] || [];
      charIndex += deleting ? -1 : 1;
      typedEl.textContent = glyphs.slice(0, charIndex).join('');

      let delay = deleting ? 45 : 85;
      if (!deleting && charIndex >= glyphs.length) {
        deleting = true;
        delay = 1700;
      } else if (deleting && charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 320;
      }
      timer = setTimeout(tick, delay);
    };

    if (prefersReduced) {
      typedEl.textContent = phrases[0].join('');
    } else {
      timer = setTimeout(tick, 500);
    }

    // restart the typewriter with the new language's roles
    document.addEventListener('cv:langchange', (e) => {
      phrases = rolesFor(e.detail.lang).map(graphemes);
      phraseIndex = 0;
      charIndex = 0;
      deleting = false;

      if (timer) clearTimeout(timer);

      if (prefersReduced) typedEl.textContent = phrases[0].join('');
      else timer = setTimeout(tick, 120);
    });
  }

  /* ----------------------------------------------------------
     6. Count-up stats
     ---------------------------------------------------------- */
  const counters = $$('[data-count]');

  if (counters.length) {
    const runCounter = (el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';

      if (prefersReduced) {
        el.textContent = target + suffix;
        return;
      }

      const duration = 1500;
      const start = performance.now();

      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ----------------------------------------------------------
     7. 3D tilt on cards
     ---------------------------------------------------------- */
  if (!prefersReduced && !isTouch && window.matchMedia('(pointer: fine)').matches) {
    const tiltEls = $$('[data-tilt]');

    tiltEls.forEach((el) => {
      let frame = null;

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;

        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          el.style.transform = `perspective(1000px) rotateX(${(-py * 9).toFixed(2)}deg) rotateY(${(px * 11).toFixed(2)}deg) scale(1.015)`;
        });
      };

      const reset = () => {
        if (frame) cancelAnimationFrame(frame);
        el.style.transform = '';
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', reset);
    });
  }

  /* ----------------------------------------------------------
     8. Custom cursor
     ---------------------------------------------------------- */
  if (!prefersReduced && !isTouch && window.matchMedia('(pointer: fine)').matches) {
    const ring = $('.cursor');
    const dot = $('.cursor-dot');

    if (ring && dot) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;
      let started = false;

      // Only reveal the custom cursor once a real pointer move happens,
      // so it never sits parked in the middle of the page on load.
      const start = () => {
        if (started) return;
        started = true;
        document.body.classList.add('has-cursor');
        requestAnimationFrame(loop);
      };

      const positioned = (x, y) => {
        mouseX = x;
        mouseY = y;
        ringX = x;
        ringY = y;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };

      window.addEventListener(
        'pointermove',
        (e) => {
          if (!started) {
            positioned(e.clientX, e.clientY);
            start();
            return;
          }
          mouseX = e.clientX;
          mouseY = e.clientY;
          dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        },
        { passive: true }
      );

      const loop = () => {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        requestAnimationFrame(loop);
      };

      const hoverables = 'a, button, .skill-card, .tool, .timeline__card, .social, input, textarea';

      document.addEventListener('pointerover', (e) => {
        if (e.target.closest(hoverables)) ring.classList.add('is-hover');
      });

      document.addEventListener('pointerout', (e) => {
        if (e.target.closest(hoverables)) ring.classList.remove('is-hover');
      });

      document.addEventListener('pointerdown', () => ring.classList.add('is-hover'));
      document.addEventListener('pointerup', () => ring.classList.remove('is-hover'));
    }
  }

  /* ----------------------------------------------------------
     9. Hero parallax (subtle, pointer-driven)
     ---------------------------------------------------------- */
  if (!prefersReduced && !isTouch) {
    const visual = $('.hero__visual');

    if (visual) {
      let raf = null;
      window.addEventListener(
        'pointermove',
        (e) => {
          const px = e.clientX / window.innerWidth - 0.5;
          const py = e.clientY / window.innerHeight - 0.5;

          if (raf) cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            visual.style.setProperty('translate', `${px * 18}px ${py * 14}px`);
          });
        },
        { passive: true }
      );
    }
  }

  /* ----------------------------------------------------------
     10. Contact form validation
     ---------------------------------------------------------- */
  const form = $('#contact-form');

  if (form) {
    const fields = {
      name: { input: $('#name'), error: $('#name-error') },
      email: { input: $('#email'), error: $('#email-error') },
      message: { input: $('#message'), error: $('#message-error') },
    };
    const note = $('#form-note');
    const submitBtn = $('#submit-btn');
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

    const setError = (key, hasError) => {
      const field = fields[key].input.closest('.field');
      field?.classList.toggle('has-error', hasError);
      fields[key].input.setAttribute('aria-invalid', String(hasError));
    };

    const validate = () => {
      const name = fields.name.input.value.trim();
      const email = fields.email.input.value.trim();
      const message = fields.message.input.value.trim();

      const results = {
        name: name.length >= 2,
        email: EMAIL_RE.test(email),
        message: message.length >= 4,
      };

      Object.entries(results).forEach(([key, valid]) => setError(key, !valid));
      return Object.values(results).every(Boolean);
    };

    Object.values(fields).forEach(({ input }) => {
      input.addEventListener('input', () => {
        const field = input.closest('.field');
        if (field?.classList.contains('has-error')) validate();
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validate()) {
        const firstBad = form.querySelector('.field.has-error input, .field.has-error textarea');
        firstBad?.focus();
        return;
      }

      const label = $('.btn__label', submitBtn);
      const t = (key) => window.CV_I18N?.t(key) ?? '';

      submitBtn.disabled = true;
      if (label) label.textContent = t('form.sending') || 'Sending…';

      // No backend wired up — simulate the round trip and point to email.
      setTimeout(() => {
        submitBtn.disabled = false;
        if (label) label.textContent = t('form.submit') || 'Send message';
        form.reset();
        Object.keys(fields).forEach((key) => setError(key, false));

        if (note) {
          note.textContent = t('form.sent');
          note.classList.add('is-shown');
          setTimeout(() => note.classList.remove('is-shown'), 6000);
        }
      }, 900);
    });
  }

  /* ----------------------------------------------------------
     11. Reduced-motion listener
     ---------------------------------------------------------- */
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) revealEls.forEach((el) => el.classList.add('is-visible'));
  });
})();
