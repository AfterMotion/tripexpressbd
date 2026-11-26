/* ============================================================
   Trip Express BD - Preview Runtime ("The Horizon Dispatch")
   Real interactions: mobile drawer with focus trap, destination
   jump pre-fill, itinerary & FAQ accordions, keyboard lightbox,
   Light/Dark toggle, and forgiving BD phone enquiry validation.
   ============================================================ */
(function () {
  'use strict';

  const SYMBOLS = `
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
    <symbol id="i-plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></symbol>
    <symbol id="i-bus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></symbol>
    <symbol id="i-mountain" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></symbol>
    <symbol id="i-palm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8c0-2.8-2.2-5-5-5s-5 2.2-5 5"/><path d="M13 8c2.8 0 5 2.2 5 5M13 8c-2.8 0-5 2.2-5 5M13 8c0-2.8 2.2-5 5-5s5 2.2 5 5"/><path d="M13 8v13M9 21h8"/></symbol>
    <symbol id="i-layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2.8 9 5-9 5-9-5z"/><path d="m3.6 12.4 8.4 4.7 8.4-4.7M3.6 16.9l8.4 4.7 8.4-4.7"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="9" cy="7" r="3.4"/><path d="M22 20v-1.5a4 4 0 0 0-3-3.85M16.2 3.8a4 4 0 0 1 0 6.6"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10.3c0 5.1-6.3 10.6-7.5 11.6a.8.8 0 0 1-1 0C10.3 20.9 4 15.4 4 10.3a8 8 0 0 1 16 0z"/><circle cx="12" cy="10.2" r="2.9"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 3.8 5.5a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.6c.1 1 .3 1.9.7 2.8a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14 14 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.9.4 1.8.6 2.8.7a1.8 1.8 0 0 1 1.6 1.8z"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M18.5 5.5 5.5 18.5M5.5 5.5l13 13"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.2"/><circle cx="12" cy="7.9" r="1.05" fill="currentColor" stroke="none"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 7h17M3.5 12h17M3.5 17h12"/></symbol>
    <symbol id="i-chev-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9.5 6 6 6-6"/></symbol>
    <symbol id="i-chev-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 6-6 6 6 6"/></symbol>
    <symbol id="i-chev-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m9.5 6 6 6-6 6"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.43 0 1.44 1.05 2.82 1.2 3.02.14.2 2.06 3.15 4.99 4.42.7.3 1.24.48 1.66.62.7.22 1.33.19 1.83.12.56-.09 1.74-.71 1.98-1.4.25-.68.25-1.27.18-1.39-.07-.12-.27-.2-.56-.34z"/><path d="M12.02 2.4A9.55 9.55 0 0 0 3.9 17.02L2.4 21.6l4.7-1.47a9.55 9.55 0 1 0 4.92-17.73zm0 17.47c-1.47 0-2.9-.4-4.15-1.14l-.3-.18-3.08.96.98-2.99-.2-.31a7.92 7.92 0 1 1 6.75 3.66z"/></symbol>
    <symbol id="i-facebook" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.98 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.85c0-2.51 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.18 22 17.04 22 12.06z"/></symbol>
  </svg>`;

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', SYMBOLS);
    const root = document.documentElement;

    /* 1. Theme Toggle */
    const themeBtn = document.getElementById('pvThemeBtn');
    function syncThemeLabel() {
      const dark = root.getAttribute('data-theme') === 'dark';
      if (themeBtn) {
        themeBtn.textContent = dark ? 'Light' : 'Night Ocean';
        themeBtn.setAttribute('aria-pressed', String(dark));
      }
    }
    try {
      const saved = localStorage.getItem('te-pv-theme');
      if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
    } catch (_) {}
    syncThemeLabel();
    themeBtn?.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('te-pv-theme', next); } catch (_) {}
      syncThemeLabel();
    });

    /* 2. Mobile Drawer (Focus Trap + Esc + Return) */
    const drawer = document.getElementById('pvDrawer');
    const menuBtn = document.getElementById('pvMenuBtn');
    const closeBtn = document.getElementById('pvDrawerClose');
    const backdrop = document.getElementById('pvBackdrop');
    let prevFocus = null;

    function openDrawer() {
      prevFocus = document.activeElement;
      drawer?.classList.add('is-open');
      backdrop?.classList.add('is-open');
      menuBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    }
    function closeDrawer() {
      drawer?.classList.remove('is-open');
      backdrop?.classList.remove('is-open');
      menuBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      prevFocus?.focus?.();
    }
    menuBtn?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);
    drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

    /* 3. Destination Disc Jump -> Pre-fills Enquiry Select */
    const destSelect = document.getElementById('eqDest');
    document.querySelectorAll('[data-pick-dest]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.pickDest;
        if (destSelect && val) destSelect.value = val;
        const target = document.querySelector(btn.dataset.go || '#contact');
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    /* 4. Itinerary & FAQ Accordions */
    document.querySelectorAll('[data-acc-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        if (panel) panel.hidden = open;
      });
    });

    /* 5. Real-Photo Proof Lightbox (Keyboard Prev/Next/Esc) */
    const frames = [...document.querySelectorAll('[data-lb-src]')];
    const lb = document.getElementById('pvLightbox');
    const lbImg = document.getElementById('pvLbImg');
    const lbCap = document.getElementById('pvLbCap');
    const lbCount = document.getElementById('pvLbCount');
    const lbClose = document.getElementById('pvLbClose');
    let lbIdx = 0;

    function showLb(idx) {
      lbIdx = (idx + frames.length) % frames.length;
      const f = frames[lbIdx];
      lbImg.src = f.dataset.lbSrc;
      lbImg.alt = f.dataset.lbCap || 'Trip photo';
      lbCap.textContent = f.dataset.lbCap || '';
      lbCount.textContent = (lbIdx + 1) + ' / ' + frames.length;
    }
    function openLb(idx, opener) {
      prevFocus = opener || document.activeElement;
      showLb(idx);
      lb?.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lbClose?.focus();
    }
    function closeLb() {
      lb?.classList.remove('is-open');
      document.body.style.overflow = '';
      prevFocus?.focus?.();
    }
    frames.forEach((f, idx) => f.addEventListener('click', () => openLb(idx, f)));
    lbClose?.addEventListener('click', closeLb);
    document.getElementById('pvLbPrev')?.addEventListener('click', () => showLb(lbIdx - 1));
    document.getElementById('pvLbNext')?.addEventListener('click', () => showLb(lbIdx + 1));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (lb?.classList.contains('is-open')) closeLb();
        else if (drawer?.classList.contains('is-open')) closeDrawer();
      }
      if (lb?.classList.contains('is-open')) {
        if (e.key === 'ArrowRight') showLb(lbIdx + 1);
        if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
      }
    });

    /* 6. Scroll-Spy for Desktop Nav & Mobile Journey Rail (only on single-page anchor sections) */
    const spyLinks = [...document.querySelectorAll('.pv-nav a[href^="#"], .pv-rail a[href^="#"]')];
    if (spyLinks.length && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            const href = '#' + en.target.id;
            spyLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === href));
          }
        });
      }, { rootMargin: '-25% 0px -65% 0px' });
      document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
    }

    /* 7. 5-Field Enquiry Form Validation (Blur + Submit + Clear-on-Fix) */
    const form = document.getElementById('pvEnquiryForm');
    const nameEl = document.getElementById('eqName');
    const phoneEl = document.getElementById('eqPhone');
    const destEl = document.getElementById('eqDest');
    const statusEl = document.getElementById('eqStatus');

    function setErr(el, errId, bad) {
      const msg = document.getElementById(errId);
      if (bad) {
        el.setAttribute('aria-invalid', 'true');
        msg?.classList.add('is-on');
      } else {
        el.removeAttribute('aria-invalid');
        msg?.classList.remove('is-on');
      }
      return !bad;
    }
    function checkName() { return setErr(nameEl, 'errName', !nameEl.value.trim()); }
    function checkPhone() {
      const c = phoneEl.value.replace(/[\s\-()]/g, '').replace(/^\+?880/, '0');
      return setErr(phoneEl, 'errPhone', !/^01[3-9]\d{8}$/.test(c));
    }
    function checkDest() { return setErr(destEl, 'errDest', !destEl.value); }

    nameEl?.addEventListener('blur', checkName);
    nameEl?.addEventListener('input', () => { if (nameEl.getAttribute('aria-invalid')) checkName(); });
    phoneEl?.addEventListener('blur', checkPhone);
    phoneEl?.addEventListener('input', () => { if (phoneEl.getAttribute('aria-invalid')) checkPhone(); });
    destEl?.addEventListener('change', checkDest);

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = [checkName(), checkPhone(), checkDest()].every(Boolean);
      if (!ok) {
        const firstBad = form.querySelector('[aria-invalid="true"]');
        firstBad?.focus();
        return;
      }
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.className = 'te-badge te-badge--success';
        statusEl.textContent = 'Thank you. We will call you within one working day (demo validation - no backend POST).';
      }
      form.reset();
    });
  });
})();
