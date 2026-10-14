// Skyla Urman — portfolio interactions. No dependencies.
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('mobile-menu');

  function setMenu(open, { returnFocus = false } = {}) {
    menu.classList.toggle('open', open);
    // the menu is a full-height sheet; the page behind it shouldn't scroll
    document.documentElement.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open && returnFocus) menuBtn.focus();
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false, { returnFocus: true });
    });
    window.matchMedia('(min-width: 980px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* ---------- Hero dot: park it at the end of the curve for reduced motion ---------- */
  const heroSvg = document.querySelector('.hero-svg');
  function syncHeroMotion() {
    if (!heroSvg || typeof heroSvg.pauseAnimations !== 'function') return;
    if (reduceMotion.matches) {
      heroSvg.pauseAnimations();
      heroSvg.setCurrentTime(9); // halfway through the 18s there-and-back = the coral endpoint
    } else {
      heroSvg.unpauseAnimations();
    }
  }
  syncHeroMotion();
  reduceMotion.addEventListener('change', syncHeroMotion);

  /* ---------- Engineer / creative toggle ---------- */
  const toggles = document.querySelectorAll('[data-persp]');
  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pick = btn.dataset.persp;
      toggles.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      document.querySelectorAll('[data-persp-list]').forEach((list) => {
        list.hidden = list.dataset.perspList !== pick; // un-hiding replays the .swap entrance
      });
    });
  });

  /* ---------- $ ping skyla ---------- */
  const pingBtn = document.getElementById('ping-btn');
  const pong = document.getElementById('pong');
  const replies = [
    'pong · 12ms · reply: hi there',
    'pong · 9ms · still here',
    'pong · 14ms · ok that is enough pinging',
    'pong · 11ms · fine, one more',
  ];
  let pings = 0;
  if (pingBtn && pong) {
    pingBtn.addEventListener('click', () => { pong.textContent = replies[pings++ % replies.length]; });
  }

  /* ---------- First-view reveals (process stagger, Tally strike): once each ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('seen'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('seen');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Links that start a message about something specific ---------- */
  // e.g. "Ask to join the beta" jumps to the form with that reason already picked.
  const needSelect = document.getElementById('f-need');
  document.querySelectorAll('a[data-need]').forEach((link) => {
    link.addEventListener('click', () => {
      if (needSelect) needSelect.value = link.dataset.need;
    });
  });

  /* ---------- Live project previews ---------- */
  // Screenshot by default; the client's real site loads only when the visitor asks.
  // While live, the project switches to a full-width frame with the write-up below, so
  // the site renders at its desktop layout at true size: readable and fully clickable.
  document.querySelectorAll('.shot[data-live-src]').forEach((shot) => {
    const view = shot.querySelector('.shot-view');
    const cover = shot.querySelector('.shot-cover');
    const closeBtn = shot.querySelector('.shot-close');
    const loading = shot.querySelector('.shot-loading');
    const proj = shot.closest('.proj');
    const liveBtn = proj ? proj.querySelector('.proj-live') : null;
    let frame = null;

    function open() {
      // Go full width first so the site loads at its desktop layout.
      if (proj) proj.classList.add('is-wide');
      frame = document.createElement('iframe');
      frame.className = 'shot-frame';
      frame.src = shot.dataset.liveSrc;
      frame.title = shot.dataset.liveTitle;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      // Interactive, but it can't navigate this page away.
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
      frame.addEventListener('load', () => {
        shot.classList.add('is-loaded');
        loading.textContent = '';
      }, { once: true });

      shot.classList.add('is-live');
      loading.textContent = 'loading the live site…';
      view.appendChild(frame);
      cover.hidden = true;
      if (liveBtn) liveBtn.hidden = true;
      closeBtn.hidden = false;
      closeBtn.focus({ preventScroll: true });
      // The live window is taller than the screenshot; bring all of it on screen.
      shot.scrollIntoView({ block: 'nearest' });
    }

    function close() {
      if (frame) frame.remove();
      frame = null;
      shot.classList.remove('is-live', 'is-loaded');
      if (proj) proj.classList.remove('is-wide');
      loading.textContent = '';
      closeBtn.hidden = true;
      cover.hidden = false;
      if (liveBtn) liveBtn.hidden = false;
      cover.focus({ preventScroll: true });
    }

    cover.addEventListener('click', open);
    if (liveBtn) liveBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
  });

  /* ---------- Contact form ---------- */
  const form = document.querySelector('.cform');
  if (!form) return;

  // JS takes over validation; without JS the browser's own required-field checks still apply.
  form.noValidate = true;

  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn.querySelector('.btn-label');
  const errorBox = document.getElementById('form-error');
  const statusBox = document.getElementById('form-status');
  const doneHeading = document.getElementById('done-h');
  const anotherBtn = document.getElementById('write-another');
  const nameInput = document.getElementById('f-name');
  const requiredFields = [
    { input: document.getElementById('f-email'), err: document.getElementById('f-email-err') },
    { input: document.getElementById('f-msg'), err: document.getElementById('f-msg-err') },
  ];
  const fieldsByName = { email: requiredFields[0], message: requiredFields[1] };
  const defaultFieldMsgs = requiredFields.map(({ err }) => err.textContent);

  function showFieldError(name, message) {
    const f = fieldsByName[name];
    if (!f || !message) return false;
    // Formspree sends fragments like "should be an email"; make them read as a sentence.
    const text = message.charAt(0).toUpperCase() + message.slice(1);
    f.err.textContent = /[.!?]$/.test(text) ? text : `${text}.`;
    f.err.hidden = false;
    f.input.setAttribute('aria-invalid', 'true');
    return true;
  }

  // Formspree answers a rejected submission with { errors: [{ field?, message }] }.
  async function readFormspreeErrors(res) {
    try {
      const data = await res.json();
      return Array.isArray(data.errors) ? data.errors : [];
    } catch {
      return [];
    }
  }

  function setPhase(phase) {
    form.classList.toggle('sending', phase === 'sending');
    form.classList.toggle('sent', phase === 'sent');
    submitBtn.disabled = phase === 'sending';
    submitLabel.textContent = phase === 'sending' ? 'Sending…' : 'Send it over';
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = !message;
  }

  function validate() {
    let firstBad = null;
    requiredFields.forEach(({ input, err }, i) => {
      err.textContent = defaultFieldMsgs[i];
      const ok = input.checkValidity() && input.value.trim() !== '';
      input.setAttribute('aria-invalid', String(!ok));
      err.hidden = ok;
      if (!ok && !firstBad) firstBad = input;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  requiredFields.forEach(({ input, err }) => {
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true' && input.checkValidity() && input.value.trim()) {
        input.setAttribute('aria-invalid', 'false');
        err.hidden = true;
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.classList.contains('sending')) return;
    showError('');
    if (!validate()) return;

    const endpoint = (form.dataset.endpoint || '').trim();
    if (!endpoint) {
      showError("This form isn't connected, so your message wasn't sent. Email me at skylaurman@gmail.com instead.");
      return;
    }

    setPhase('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setPhase('sent');
        statusBox.textContent = 'Message received. Thanks for reaching out.';
        doneHeading.focus({ preventScroll: true });
        return;
      }
      setPhase('idle');
      const errors = await readFormspreeErrors(res);
      const formLevel = errors.filter((er) => !showFieldError(er.field, er.message));
      const firstInvalid = requiredFields.find(({ input }) => input.getAttribute('aria-invalid') === 'true');
      if (firstInvalid) firstInvalid.input.focus();
      if (formLevel.length || !errors.length) {
        showError(formLevel.length
          ? `That didn't go through: ${formLevel.map((er) => er.message).join(' ')}`
          : 'Something went wrong sending that. Your message is still here, so try again in a moment.');
      }
    } catch (err) {
      setPhase('idle');
      showError("Couldn't reach the form service. Your message is still here, so try again in a moment, or email me at skylaurman@gmail.com.");
    }
  });

  anotherBtn.addEventListener('click', () => {
    form.reset();
    statusBox.textContent = '';
    setPhase('idle');
    nameInput.focus({ preventScroll: true });
  });
})();
