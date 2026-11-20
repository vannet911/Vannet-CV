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
     9. Animated plexus background
        Layer 1 (CSS grid) + Layer 2 (this canvas) + Layer 3 (CSS vignette)
     ---------------------------------------------------------- */
  const PLEXUS = {
    density: 21000, // area per node
    minNodes: 34,
    maxNodes: 110,
    linkDist: 168,
    linkAlpha: 0.46,
    lineWidth: 0.8,
    hubRatio: 0.12,
    hubScale: 1.7,
    minR: 1.1,
    maxR: 1.5,
    speed: 0.11, // px per 60fps frame
    cursorDist: 210,
    cursorAlpha: 0.32,
    pulseCount: 10,
    pulseSpeedMin: 0.006,
    pulseSpeedMax: 0.01,
    pulseChance: 0.02, // per 60fps frame
    maxDPR: 2,
  };

  const canvas = $('#plexus');

  if (canvas) {
    const ctx = canvas.getContext('2d');

    let nodes = [];
    let pulses = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = null;
    let running = false;
    let lastTime = 0;

    const pointer = { x: -9999, y: -9999, active: false };

    const parseRGB = (value) => {
      if (!value) return { r: 14, g: 47, b: 63 };
      const hex = value.trim().match(/^#([\da-f]{3,8})$/i);
      if (hex) {
        let h = hex[1];
        if (h.length === 3) h = h.split('').map((c) => c + c).join('');
        return {
          r: parseInt(h.slice(0, 2), 16),
          g: parseInt(h.slice(2, 4), 16),
          b: parseInt(h.slice(4, 6), 16),
        };
      }
      const nums = value.match(/-?\d*\.?\d+/g);
      if (!nums) return { r: 14, g: 47, b: 63 };
      return { r: +nums[0], g: +nums[1], b: +nums[2] };
    };

    const rgba = (c, a) => `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;

    const theme = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        node: parseRGB(cs.getPropertyValue('--plexus-node')),
        hub: parseRGB(cs.getPropertyValue('--plexus-hub')),
        link: parseRGB(cs.getPropertyValue('--plexus-link')),
        pulse: parseRGB(cs.getPropertyValue('--plexus-pulse')),
      };
    };

    let colors = theme();

    const nodeCountFor = (w, h) =>
      Math.round(Math.min(PLEXUS.maxNodes, Math.max(PLEXUS.minNodes, (w * h) / PLEXUS.density)));

    const seed = () => {
      const count = nodeCountFor(width, height);
      const hubTotal = Math.round(count * PLEXUS.hubRatio);

      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2 * PLEXUS.speed,
        vy: (Math.random() - 0.5) * 2 * PLEXUS.speed,
        r: PLEXUS.minR + Math.random() * (PLEXUS.maxR - PLEXUS.minR),
        hub: i < hubTotal,
      }));
      pulses = [];
    };

    // Self-healing sizing: driven by comparing clientWidth on every draw,
    // not only by resize events / ResizeObserver.
    const syncSize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      const nextDpr = Math.min(window.devicePixelRatio || 1, PLEXUS.maxDPR);

      if (w === width && h === height && nextDpr === dpr) return false;

      width = w;
      height = h;
      dpr = nextDpr;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed();
      return true;
    };

    const step = (dt) => {
      // position update + wrap
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;
      }

      // pulses
      if (pulses.length < PLEXUS.pulseCount && Math.random() < PLEXUS.pulseChance * dt && nodes.length > 1) {
        const a = Math.floor(Math.random() * nodes.length);
        let b = Math.floor(Math.random() * nodes.length);
        if (b === a) b = (b + 1) % nodes.length;

        const d = Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y);
        if (d < PLEXUS.linkDist) {
          pulses.push({
            a,
            b,
            t: 0,
            speed: PLEXUS.pulseSpeedMin + Math.random() * (PLEXUS.pulseSpeedMax - PLEXUS.pulseSpeedMin),
          });
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed * dt;
        if (pulses[i].t >= 1) pulses.splice(i, 1);
      }
    };

    const BUCKETS = 12;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const maxD2 = PLEXUS.linkDist * PLEXUS.linkDist;
      const bucketSegs = Array.from({ length: BUCKETS }, () => []);

      // links, batched into opacity buckets so this stays a handful of strokes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxD2) continue;

          const d = Math.sqrt(d2);
          const alpha = (1 - d / PLEXUS.linkDist) * PLEXUS.linkAlpha;
          if (alpha <= 0.004) continue;

          const bucket = Math.min(BUCKETS - 1, Math.floor((alpha / PLEXUS.linkAlpha) * BUCKETS));
          bucketSegs[bucket].push(a.x, a.y, b.x, b.y);
        }
      }

      ctx.lineWidth = PLEXUS.lineWidth;
      ctx.lineCap = 'round';

      for (let b = 0; b < BUCKETS; b++) {
        const segs = bucketSegs[b];
        if (!segs.length) continue;

        ctx.strokeStyle = rgba(colors.link, PLEXUS.linkAlpha * ((b + 1) / BUCKETS));
        ctx.beginPath();
        for (let k = 0; k < segs.length; k += 4) {
          ctx.moveTo(segs[k], segs[k + 1]);
          ctx.lineTo(segs[k + 2], segs[k + 3]);
        }
        ctx.stroke();
      }

      // cursor links — flat 0.32 alpha within 210px
      if (pointer.active) {
        const cMax = PLEXUS.cursorDist * PLEXUS.cursorDist;
        ctx.strokeStyle = rgba(colors.hub, PLEXUS.cursorAlpha);
        ctx.lineWidth = PLEXUS.lineWidth;
        ctx.beginPath();

        for (const n of nodes) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          if (dx * dx + dy * dy > cMax) continue;

          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(colors.hub, 0.5);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hub ? n.r * PLEXUS.hubScale : n.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(n.hub ? colors.hub : colors.node, n.hub ? 0.95 : 0.55);
        ctx.fill();
      }

      // signal pulses travelling along links
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;

        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;

        const tailT = Math.max(0, p.t - 0.09);
        const tx = a.x + (b.x - a.x) * tailT;
        const ty = a.y + (b.y - a.y) * tailT;

        ctx.strokeStyle = rgba(colors.pulse, 0.5);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 1.9, 0, Math.PI * 2);
        ctx.fillStyle = rgba(colors.pulse, 0.95);
        ctx.fill();
      }
    };

    const loop = (now) => {
      if (!running) return;

      const dt = Math.min((now - lastTime) / (1000 / 60), 3) || 0;
      lastTime = now;

      if (syncSize()) {
        // canvas was resized mid-flight — keep colours fresh too
        colors = theme();
      }

      step(dt);
      draw();

      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    };

    // static first frame, then either animate or stay still
    syncSize();
    draw();

    if (!prefersReduced) start();

    // keep colours in sync with the theme
    document.addEventListener('cv:themechange', () => {
      colors = theme();
      if (!running) draw();
    });

    // safety net: redraw a static frame while paused so a resize still looks right
    window.addEventListener('resize', () => {
      if (!running) {
        syncSize();
        draw();
      }
    });

    // cursor tracking for the 210px links
    if (!prefersReduced && !isTouch) {
      window.addEventListener(
        'pointermove',
        (e) => {
          pointer.x = e.clientX;
          pointer.y = e.clientY;
          pointer.active = true;
        },
        { passive: true }
      );

      window.addEventListener(
        'pointerleave',
        () => {
          pointer.active = false;
        },
        { passive: true }
      );

      document.addEventListener('mouseleave', () => {
        pointer.active = false;
      });
    }

    // pause when the tab is hidden, resume when it returns
    document.addEventListener('visibilitychange', () => {
      if (prefersReduced) return;
      if (document.hidden) stop();
      else start();
    });
  }

  /* ----------------------------------------------------------
     10. Hero parallax (subtle, pointer-driven)
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
     11. Contact form validation
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
     12. Reduced-motion listener
     ---------------------------------------------------------- */
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) revealEls.forEach((el) => el.classList.add('is-visible'));
  });
})();
