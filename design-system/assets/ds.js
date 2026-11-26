/* ============================================================
   Trip Express BD - Design System Showcase Interactivity
   Works offline without a backend; hydrates Lucide sprite,
   live search, theme/contrast/density controls, token inspector,
   and interactive component state demos.
   ============================================================ */
(function () {
  'use strict';

  /* Inline Lucide symbol sprite so icons render cleanly over both HTTP and file:// */
  const SPRITE_SYMBOLS = `
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
    <symbol id="i-plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></symbol>
    <symbol id="i-bus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></symbol>
    <symbol id="i-mountain" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></symbol>
    <symbol id="i-ship" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10.2V14M12 2v3m3.4 6.7 5.2 2.5a1 1 0 0 1 .5 1.1l-.5 2.2A6 6 0 0 1 14.8 22H9.2a6 6 0 0 1-5.8-4.5l-.5-2.2a1 1 0 0 1 .5-1.1l5.2-2.5a5 5 0 0 1 4.8 0M5 14v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/></symbol>
    <symbol id="i-palm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8c0-2.8-2.2-5-5-5s-5 2.2-5 5"/><path d="M13 8c2.8 0 5 2.2 5 5M13 8c-2.8 0-5 2.2-5 5M13 8c0-2.8 2.2-5 5-5s5 2.2 5 5"/><path d="M13 8v13M9 21h8"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10h18"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="9" cy="7" r="3.4"/><path d="M22 20v-1.5a4 4 0 0 0-3-3.85M16.2 3.8a4 4 0 0 1 0 6.6"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 3.8 5.5a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.6c.1 1 .3 1.9.7 2.8a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14 14 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.9.4 1.8.6 2.8.7a1.8 1.8 0 0 1 1.6 1.8z"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M18.5 5.5 5.5 18.5M5.5 5.5l13 13"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.2"/><circle cx="12" cy="7.9" r="1.05" fill="currentColor" stroke="none"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></symbol>
    <symbol id="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.2v2.2M12 19.6v2.2M4.2 12H2M22 12h-2.2M6.3 6.3 4.8 4.8M19.2 19.2l-1.5-1.5M17.7 6.3l1.5-1.5M4.8 19.2l1.5-1.5"/></symbol>
    <symbol id="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8z"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 7h17M3.5 12h17M3.5 17h12"/></symbol>
    <symbol id="i-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15.5M13.5 6l6 6-6 6"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.43 0 1.44 1.05 2.82 1.2 3.02.14.2 2.06 3.15 4.99 4.42.7.3 1.24.48 1.66.62.7.22 1.33.19 1.83.12.56-.09 1.74-.71 1.98-1.4.25-.68.25-1.27.18-1.39-.07-.12-.27-.2-.56-.34z"/><path d="M12.02 2.4A9.55 9.55 0 0 0 3.9 17.02L2.4 21.6l4.7-1.47a9.55 9.55 0 1 0 4.92-17.73zm0 17.47c-1.47 0-2.9-.4-4.15-1.14l-.3-.18-3.08.96.98-2.99-.2-.31a7.92 7.92 0 1 1 6.75 3.66z"/></symbol>
    <symbol id="i-facebook" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.98 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.85c0-2.51 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.18 22 17.04 22 12.06z"/></symbol>
  </svg>`;

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', SPRITE_SYMBOLS);

    const root = document.documentElement;
    const toastEl = document.getElementById('dsToast');
    let toastTimer;

    window.teToast = function (msg) {
      if (!toastEl) return;
      toastEl.textContent = msg;
      toastEl.classList.add('is-on');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 1800);
    };

    window.teCopy = function (text) {
      if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
      window.teToast('Copied: ' + text);
    };

    /* 1. Theme, High-Contrast, Density State */
    const themeBtn = document.getElementById('themeToggle');
    const contrastBtn = document.getElementById('contrastToggle');
    const densityBtn = document.getElementById('densityToggle');

    function syncLabels() {
      const dark = root.getAttribute('data-theme') === 'dark';
      const hc = root.getAttribute('data-contrast') === 'high';
      const compact = root.getAttribute('data-density') === 'compact';
      if (themeBtn) {
        themeBtn.setAttribute('aria-pressed', String(dark));
        themeBtn.textContent = dark ? 'Theme: Night Ocean' : 'Theme: Light';
      }
      if (contrastBtn) {
        contrastBtn.setAttribute('aria-pressed', String(hc));
        contrastBtn.textContent = hc ? 'Contrast: High' : 'Contrast: Standard';
      }
      if (densityBtn) {
        densityBtn.setAttribute('aria-pressed', String(compact));
        densityBtn.textContent = compact ? 'Density: Compact' : 'Density: Comfortable';
      }
    }

    try {
      const st = localStorage.getItem('te-ds-theme');
      const sc = localStorage.getItem('te-ds-contrast');
      const sd = localStorage.getItem('te-ds-density');
      if (st === 'dark' || st === 'light') root.setAttribute('data-theme', st);
      if (sc === 'high' || sc === 'standard') root.setAttribute('data-contrast', sc);
      if (sd === 'compact' || sd === 'comfortable') root.setAttribute('data-density', sd);
    } catch (_) {}
    syncLabels();

    themeBtn?.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('te-ds-theme', next); } catch (_) {}
      syncLabels();
    });
    contrastBtn?.addEventListener('click', () => {
      const next = root.getAttribute('data-contrast') === 'high' ? 'standard' : 'high';
      root.setAttribute('data-contrast', next);
      try { localStorage.setItem('te-ds-contrast', next); } catch (_) {}
      syncLabels();
    });
    densityBtn?.addEventListener('click', () => {
      const next = root.getAttribute('data-density') === 'compact' ? 'comfortable' : 'compact';
      root.setAttribute('data-density', next);
      try { localStorage.setItem('te-ds-density', next); } catch (_) {}
      syncLabels();
    });

    /* 2. Searchable Navigation + Scroll Spy */
    const searchInput = document.getElementById('dsSearchInput');
    const navLinks = [...document.querySelectorAll('.ds-nav-link')];
    const sections = [...document.querySelectorAll('.ds-sec')];

    searchInput?.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      navLinks.forEach(a => {
        const text = (a.textContent + ' ' + (a.dataset.tags || '')).toLowerCase();
        a.classList.toggle('is-hidden', Boolean(q) && !text.includes(q));
      });
      sections.forEach(sec => {
        const hay = (sec.dataset.search || sec.textContent).toLowerCase();
        sec.classList.toggle('is-hidden', Boolean(q) && !hay.includes(q));
      });
    });

    document.addEventListener('keydown', (e) => {
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput?.focus();
      }
    });

    /* Mobile sidebar drawer */
    const sidebar = document.getElementById('dsSidebar');
    const menuBtn = document.getElementById('dsMenuBtn');
    const backdrop = document.getElementById('dsBackdrop');

    function closeSidebar() {
      sidebar?.classList.remove('is-open');
      backdrop?.classList.remove('is-open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    }
    menuBtn?.addEventListener('click', () => {
      const open = !sidebar?.classList.contains('is-open');
      sidebar?.classList.toggle('is-open', open);
      backdrop?.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    backdrop?.addEventListener('click', closeSidebar);
    navLinks.forEach(a => a.addEventListener('click', () => { if (window.innerWidth < 1024) closeSidebar(); }));

    if ('IntersectionObserver' in window) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id));
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      sections.forEach(s => spy.observe(s));
    }

    /* 3. Interactive Token Reference Modal */
    const tokenDlg = document.getElementById('tokenRefDialog');
    const openTokenBtn = document.getElementById('openTokenRef');
    const closeTokenBtn = document.getElementById('closeTokenRef');
    let prevFocus = null;

    function openDialog(dlg) {
      if (!dlg) return;
      prevFocus = document.activeElement;
      dlg.classList.add('is-open');
      backdrop?.classList.add('is-open');
      const focusable = dlg.querySelector('button, input, [tabindex="0"]');
      focusable?.focus();
    }
    function closeDialogs() {
      document.querySelectorAll('.ds-dialog.is-open').forEach(d => d.classList.remove('is-open'));
      closeSidebar();
      prevFocus?.focus?.();
    }
    openTokenBtn?.addEventListener('click', () => openDialog(tokenDlg));
    closeTokenBtn?.addEventListener('click', closeDialogs);
    backdrop?.addEventListener('click', closeDialogs);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDialogs(); });

    /* 4. Interactive Component Specimens */
    // Loading button toggle
    const loadBtn = document.getElementById('demoLoadBtn');
    loadBtn?.addEventListener('click', () => {
      loadBtn.classList.add('is-loading');
      loadBtn.setAttribute('aria-busy', 'true');
      const orig = loadBtn.innerHTML;
      loadBtn.innerHTML = '<span class="te-spin" aria-hidden="true"></span> Checking seats…';
      setTimeout(() => {
        loadBtn.classList.remove('is-loading');
        loadBtn.removeAttribute('aria-busy');
        loadBtn.innerHTML = orig;
        window.teToast('Seat availability updated (4 left)');
      }, 1100);
    });

    // Forgiving Bangladeshi phone validation (blur + clear-on-fix)
    const phoneInput = document.getElementById('demoPhoneInput');
    const phoneMsg = document.getElementById('demoPhoneMsg');
    let phoneTouched = false;
    function validateBdPhone() {
      if (!phoneInput || !phoneMsg) return;
      const cleaned = phoneInput.value.replace(/[\s\-()]/g, '').replace(/^\+?880/, '0');
      const ok = /^01[3-9]\d{8}$/.test(cleaned);
      if (!phoneInput.value.trim()) {
        phoneInput.setAttribute('aria-invalid', 'true');
        phoneInput.classList.remove('is-valid');
        phoneMsg.className = 'te-error-msg';
        phoneMsg.textContent = 'Please enter a valid Bangladeshi mobile number (e.g. 01838-754207).';
      } else if (!ok) {
        phoneInput.setAttribute('aria-invalid', 'true');
        phoneInput.classList.remove('is-valid');
        phoneMsg.className = 'te-error-msg';
        phoneMsg.textContent = 'Must be 11 digits starting with 013–019 (spaces/hyphens allowed).';
      } else {
        phoneInput.removeAttribute('aria-invalid');
        phoneInput.classList.add('is-valid');
        phoneMsg.className = 'te-hint';
        phoneMsg.textContent = 'Valid BD mobile: ' + cleaned.slice(0, 5) + '-' + cleaned.slice(5);
      }
    }
    phoneInput?.addEventListener('blur', () => { phoneTouched = true; validateBdPhone(); });
    phoneInput?.addEventListener('input', () => { if (phoneTouched || phoneInput.getAttribute('aria-invalid') === 'true') validateBdPhone(); });

    // Accessible Tabs (ArrowLeft / ArrowRight)
    const tabBtns = [...document.querySelectorAll('[role="tab"]')];
    const tabPanels = [...document.querySelectorAll('[role="tabpanel"]')];
    tabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => activateTab(idx));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); activateTab((idx + 1) % tabBtns.length, true); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); activateTab((idx - 1 + tabBtns.length) % tabBtns.length, true); }
      });
    });
    function activateTab(i, focusIt) {
      tabBtns.forEach((b, k) => {
        const active = k === i;
        b.setAttribute('aria-selected', String(active));
        b.tabIndex = active ? 0 : -1;
        if (focusIt && active) b.focus();
      });
      tabPanels.forEach((p, k) => { p.hidden = k !== i; });
    }

    // Motion depart trigger
    const departBtn = document.getElementById('replayDepartBtn');
    const departBox = document.getElementById('departDemoBox');
    departBtn?.addEventListener('click', () => {
      if (!departBox) return;
      departBox.classList.remove('te-depart-play');
      void departBox.offsetWidth;
      departBox.classList.add('te-depart-play');
    });

    // Interactive toggle chips & selectable table rows
    document.querySelectorAll('.te-chip[data-toggle]').forEach(chip => {
      chip.addEventListener('click', () => {
        const next = chip.getAttribute('aria-pressed') !== 'true';
        chip.setAttribute('aria-pressed', String(next));
      });
    });

    document.querySelectorAll('[data-selectable-row]').forEach(row => {
      row.addEventListener('click', () => {
        row.classList.toggle('is-selected');
        const cb = row.querySelector('input[type="checkbox"]');
        if (cb) cb.checked = row.classList.contains('is-selected');
      });
    });

    // Visible Token Reference filter
    const tokFilter = document.getElementById('tokenFilterInput');
    const tokRows = [...document.querySelectorAll('#tokenRefTableBody tr')];
    tokFilter?.addEventListener('input', () => {
      const q = tokFilter.value.trim().toLowerCase();
      tokRows.forEach(tr => {
        tr.style.display = !q || tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });

    // Breakpoint readout
    const bpBadge = document.getElementById('bpReadout');
    function updateBp() {
      if (!bpBadge) return;
      const w = window.innerWidth;
      const name = w < 480 ? 'xs (4-col)' : w < 640 ? 'sm (4-col)' : w < 1024 ? 'md (8-col)' : w < 1280 ? 'lg (12-col)' : w < 1536 ? 'xl (12-col)' : '2xl (12-col)';
      bpBadge.textContent = w + 'px · ' + name;
    }
    window.addEventListener('resize', updateBp);
    updateBp();
  });
})();
