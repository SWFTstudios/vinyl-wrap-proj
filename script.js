/* =====================================================================
   APEX SKIN STUDIO — script.js
   Vanilla JavaScript. No dependencies.
   Handles: sticky nav state, mobile menu, active links, scroll reveal,
   FAQ accordion, and the multi-step wrap-inquiry wizard (Apply page).
   Every block guards for the elements it needs, so this one file can be
   shared safely across all pages.
   ===================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. NAV — shrink/darken on scroll + mobile menu toggle
     ------------------------------------------------------------------ */
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && mobileMenu) {
    const closeMenu = () => {
      toggle.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close when a link is tapped
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    // Close on Escape
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  /* Highlight the current page in the nav based on filename */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && href === './') || href === './' + path) {
      link.classList.add('is-active');
    }
  });

  /* ------------------------------------------------------------------
     2. SCROLL REVEAL — subtle motion via IntersectionObserver
     ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }

  /* ------------------------------------------------------------------
     3. FAQ ACCORDION
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-faq]').forEach((item) => {
    const q = item.querySelector('.faq__q');
    const a = item.querySelector('.faq__a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      q.setAttribute('aria-expanded', String(open));
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    });
  });

  /* ------------------------------------------------------------------
     4. GENERIC "choice" cards (checkbox/radio) toggling
        Used on the apply wizard AND anywhere else .choice appears.
     ------------------------------------------------------------------ */
  function syncChoice(choice) {
    const input = choice.querySelector('input');
    if (!input) return;
    if (input.type === 'radio') {
      // clear siblings in the same group
      document.querySelectorAll('input[name="' + input.name + '"]').forEach((sib) => {
        const c = sib.closest('.choice');
        if (c) c.classList.toggle('is-selected', sib.checked);
      });
    } else {
      choice.classList.toggle('is-selected', input.checked);
    }
  }
  document.querySelectorAll('.choice').forEach((choice) => {
    const input = choice.querySelector('input');
    if (!input) return;
    // reflect any pre-checked state
    if (input.checked) syncChoice(choice);
    input.addEventListener('change', () => syncChoice(choice));
  });

  /* ------------------------------------------------------------------
     5. NEWSLETTER / simple fake-submit forms
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-fake-submit]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.querySelector('[data-submit-msg]');
      form.querySelectorAll('input,button').forEach((el) => (el.disabled = true));
      if (msg) { msg.textContent = "You're on the list. Check your inbox for the next drop."; msg.style.color = 'var(--green)'; }
    });
  });

  /* ==================================================================
     6. MULTI-STEP WRAP INQUIRY WIZARD  (Apply page)
     ================================================================== */
  const wizard = document.querySelector('[data-wizard]');
  if (!wizard) return; // not on the apply page — stop here

  const panels   = Array.from(wizard.querySelectorAll('.step-panel'));
  const bar      = wizard.querySelector('[data-progress-bar]');
  const curLabel = wizard.querySelector('[data-step-current]');
  const totLabel = wizard.querySelector('[data-step-total]');
  const stepName = wizard.querySelector('[data-step-name]');
  const btnPrev  = wizard.querySelector('[data-prev]');
  const btnNext  = wizard.querySelector('[data-next]');
  const btnSubmit= wizard.querySelector('[data-submit]');
  const confirm  = wizard.querySelector('[data-confirm]');
  const wizardBody = wizard.querySelector('[data-wizard-body]');

  const stepNames = panels.map((p) => p.getAttribute('data-step-title') || '');
  let current = 0;
  const total = panels.length;
  if (totLabel) totLabel.textContent = String(total);

  function showStep(i) {
    current = Math.max(0, Math.min(i, total - 1));
    panels.forEach((p, idx) => p.classList.toggle('is-active', idx === current));

    // progress
    const pct = ((current + 1) / total) * 100;
    if (bar) bar.style.width = pct + '%';
    if (curLabel) curLabel.textContent = String(current + 1);
    if (stepName) stepName.textContent = stepNames[current];

    // nav buttons
    if (btnPrev) btnPrev.hidden = current === 0;
    const isLast = current === total - 1;
    if (btnNext) btnNext.hidden = isLast;
    if (btnSubmit) btnSubmit.hidden = !isLast;

    // move focus / scroll to top of wizard for context
    wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (isLast) buildReview();
  }

  /* --- Validation: only required text inputs in the current panel --- */
  function validateStep() {
    const panel = panels[current];
    let ok = true;
    panel.querySelectorAll('[required]').forEach((el) => {
      const errEl = el.closest('.field')?.querySelector('.field__error');
      const valid = el.value.trim() !== '' && el.checkValidity();
      el.classList.toggle('is-error', !valid);
      if (errEl) errEl.classList.toggle('is-visible', !valid);
      if (!valid) ok = false;
    });
    return ok;
  }

  /* --- Build the review summary from all collected inputs --- */
  function buildReview() {
    const out = wizard.querySelector('[data-review]');
    if (!out) return;
    const val = (name) => {
      const el = wizard.querySelector('[name="' + name + '"]');
      return el ? el.value.trim() : '';
    };
    // gather checked choices (checkbox groups) by name
    const checkedList = (name) => Array.from(
      wizard.querySelectorAll('input[name="' + name + '"]:checked')
    ).map((i) => i.getAttribute('data-label') || i.value).join(', ');
    const radioVal = (name) => {
      const el = wizard.querySelector('input[name="' + name + '"]:checked');
      return el ? (el.getAttribute('data-label') || el.value) : '';
    };

    const rider = [val('name'), val('email'), val('phone'), val('instagram')].filter(Boolean).join('  ·  ');
    const bike  = [val('year'), val('make'), val('model')].filter(Boolean).join(' ');

    const rows = [
      ['Rider',            rider],
      ['Bike',             bike],
      ['Current color',    val('color')],
      ['Fairing condition',val('condition')],
      ['Wrap goal',        checkedList('goal')],
      ['Style direction',  checkedList('style')],
      ['Timeline',         radioVal('timeline')],
      ['Budget range',     val('budget')],
      ['Filming consent',  radioVal('consent')],
      ['Notes',            val('notes')],
    ];

    out.innerHTML = rows.map(([k, v]) =>
      '<div class="review__row"><span class="review__k">' + k +
      '</span><span class="review__v">' + escapeHtml(v) + '</span></div>'
    ).join('');
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]
    ));
  }

  /* --- Wire up navigation --- */
  if (btnNext) btnNext.addEventListener('click', () => {
    if (validateStep()) showStep(current + 1);
  });
  if (btnPrev) btnPrev.addEventListener('click', () => showStep(current - 1));

  // Clear error styling as the user types
  wizard.querySelectorAll('input, select, textarea').forEach((el) => {
    el.addEventListener('input', () => {
      el.classList.remove('is-error');
      const errEl = el.closest('.field')?.querySelector('.field__error');
      if (errEl) errEl.classList.remove('is-visible');
    });
  });

  /* --- Fake submit -> confirmation screen --- */
  wizard.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    if (wizardBody) wizardBody.style.display = 'none';
    if (confirm) confirm.classList.add('is-active');
    // NOTE: hook a real endpoint / email service here later.
    window.scrollTo({ top: wizard.offsetTop - 80, behavior: 'smooth' });
  });

  // init
  showStep(0);
})();
