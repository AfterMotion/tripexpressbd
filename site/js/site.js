/* ============================================================
   Trip Express BD - Deployable Vanilla JS Behaviors
   Zero frameworks. Accessible drawer, tabs, FAQ, filters,
   lightbox, theme switch, and explicit static-form mode.
   ============================================================ */
(() => {
  'use strict';

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" hidden aria-hidden="true">
    <symbol id="i-plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></symbol>
    <symbol id="i-mountain" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></symbol>
    <symbol id="i-palm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/></symbol>
    <symbol id="i-layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></symbol>
    <symbol id="i-chev-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></symbol>
    <symbol id="i-chev-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></symbol>
    <symbol id="i-chev-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.9 1.2-.5 0-1.1.1-3.8-1-3.2-1.3-5.2-4.5-5.4-4.7-.1-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5.2.6.9 2.2.9 2.4.1.2.1.4 0 .6-.1.2-.2.3-.4.5l-.5.6c-.2.2-.3.4-.1.7.2.3 1 1.6 2.1 2.6 1.5 1.3 2.7 1.7 3 1.9.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.5-.3.8-.2.3.1 2 .9 2.3 1.1.3.2.5.3.6.4 0 .2 0 .9-.2 1.5z"/></symbol>
  </svg>`;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', sprite);

    /* 1. Light / Night Ocean Theme Switch */
    const root = document.documentElement;
    const themeBtn = $('#teThemeBtn');
    const setTheme = (t) => {
      root.setAttribute('data-theme', t);
      if (themeBtn) {
        themeBtn.textContent = t === 'dark' ? 'Theme: Night Ocean' : 'Night Ocean';
        themeBtn.setAttribute('aria-pressed', String(t === 'dark'));
      }
      try { localStorage.setItem('te-site-theme', t); } catch (_) {}
    };
    try {
      const saved = localStorage.getItem('te-site-theme');
      if (saved === 'dark' || saved === 'light') setTheme(saved);
    } catch (_) {}
    themeBtn?.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

    /* 2. Mobile Navigation Drawer (Focus Managed) */
    const drawer = $('#teDrawer'), backdrop = $('#teBackdrop'), menuBtn = $('#teMenuBtn');
    let lastFocus = null;
    const closeDrawer = () => {
      drawer?.classList.remove('is-open');
      backdrop?.classList.remove('is-open');
      menuBtn?.setAttribute('aria-expanded', 'false');
      lastFocus?.focus();
    };
    menuBtn?.addEventListener('click', () => {
      lastFocus = document.activeElement;
      drawer?.classList.add('is-open');
      backdrop?.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      $('#teDrawerClose')?.focus();
    });
    $('#teDrawerClose')?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);

    /* 3. Disclosure / FAQ Accordions & Keyboard Tabs */
    $$('[data-acc-btn]').forEach(btn => btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    }));

    $$('[role="tablist"]').forEach(list => {
      const tabs = $$('[role="tab"]', list);
      tabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => {
            const on = t === tab;
            t.setAttribute('aria-selected', String(on));
            const p = document.getElementById(t.getAttribute('aria-controls'));
            if (p) p.hidden = !on;
          });
        });
        tab.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
            tabs[next].focus();
            tabs[next].click();
          }
        });
      });
    });

    /* 4. Photo Lightbox Dialog */
    const lb = $('#teLightbox'), lbTriggers = $$('[data-lb-src]');
    let lbIdx = 0;
    const showLb = (i) => {
      if (!lb || !lbTriggers.length) return;
      lbIdx = (i + lbTriggers.length) % lbTriggers.length;
      const t = lbTriggers[lbIdx];
      $('#teLbImg').src = t.dataset.lbSrc;
      $('#teLbImg').alt = t.dataset.lbCap || 'Trip Express BD photograph';
      $('#teLbCap').textContent = t.dataset.lbCap || '';
      $('#teLbCount').textContent = `${lbIdx + 1} / ${lbTriggers.length}`;
    };
    lbTriggers.forEach((el, idx) => el.addEventListener('click', () => {
      lastFocus = el;
      showLb(idx);
      lb?.classList.add('is-open');
      $('#teLbClose')?.focus();
    }));
    const closeLb = () => { lb?.classList.remove('is-open'); lastFocus?.focus(); };
    $('#teLbClose')?.addEventListener('click', closeLb);
    $('#teLbPrev')?.addEventListener('click', () => showLb(lbIdx - 1));
    $('#teLbNext')?.addEventListener('click', () => showLb(lbIdx + 1));

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

    /* 5. Tours Catalog Filter / Search / Sort */
    const tourGrid = $('#teTourGrid');
    if (tourGrid) {
      let region = 'all', mode = 'all';
      const qEl = $('#teTourSearch'), sortEl = $('#teTourSort'), cntEl = $('#teTourCount'), emptyEl = $('#teTourEmpty');
      const rBtns = $$('[data-filter-region]'), mBtns = $$('[data-filter-mode]');
      const applyTours = () => {
        const q = (qEl?.value || '').trim().toLowerCase();
        const cards = [...tourGrid.children];
        let shown = 0;
        cards.forEach(c => {
          const vis = (region === 'all' || c.dataset.region === region)
            && (mode === 'all' ? true : mode === 'open' ? c.dataset.open === 'true' : c.dataset.mode === mode)
            && (!q || (c.dataset.tags + ' ' + c.textContent).toLowerCase().includes(q));
          c.hidden = !vis;
          if (vis) shown++;
        });
        if (sortEl && sortEl.value !== 'featured') {
          [...cards].sort((a, b) => sortEl.value === 'price-asc'
            ? (Number(a.dataset.price || 999999) - Number(b.dataset.price || 999999))
            : (Number(b.dataset.price || 0) - Number(a.dataset.price || 0))
          ).forEach(c => tourGrid.appendChild(c));
        }
        if (cntEl) cntEl.textContent = `${shown} of ${cards.length} routes shown`;
        if (emptyEl) emptyEl.hidden = shown > 0;
      };
      const resetTours = () => {
        region = 'all'; mode = 'all';
        if (qEl) qEl.value = ''; if (sortEl) sortEl.value = 'featured';
        rBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filterRegion === 'all')));
        mBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filterMode === 'all')));
        applyTours();
      };
      rBtns.forEach(b => b.addEventListener('click', () => { region = b.dataset.filterRegion; rBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b))); applyTours(); }));
      mBtns.forEach(b => b.addEventListener('click', () => { mode = b.dataset.filterMode; mBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b))); applyTours(); }));
      qEl?.addEventListener('input', applyTours);
      sortEl?.addEventListener('change', applyTours);
      $('#teTourReset')?.addEventListener('click', resetTours);
      $('#teTourEmptyReset')?.addEventListener('click', resetTours);
    }

    /* 6. Reports Category Filter */
    const artGrid = $('#teArtGrid');
    if (artGrid) {
      const aBtns = $$('[data-art-filter]');
      aBtns.forEach(b => b.addEventListener('click', () => {
        const f = b.dataset.artFilter;
        aBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        [...artGrid.children].forEach(c => { c.hidden = !(f === 'all' || c.dataset.cat === f); });
      }));
    }

    /* 7. Explicit Static-Form Validation (Never Fakes Server Confirmation) */
    const eqForm = $('#teEnquiryForm');
    if (eqForm) {
      const nEl = $('#eqName'), pEl = $('#eqPhone'), dEl = $('#eqDest'), stEl = $('#eqStatus');
      const pre = new URLSearchParams(location.search).get('tour');
      if (pre && dEl && [...dEl.options].some(o => o.value === pre)) dEl.value = pre;
      const chk = (el, id, bad) => {
        const err = document.getElementById(id);
        if (bad) { el.setAttribute('aria-invalid', 'true'); err?.classList.add('is-on'); }
        else { el.removeAttribute('aria-invalid'); err?.classList.remove('is-on'); }
        return !bad;
      };
      const vN = () => chk(nEl, 'errName', !nEl.value.trim());
      const vP = () => chk(pEl, 'errPhone', !/^01[3-9]\d{8}$/.test(pEl.value.replace(/[\s\-()]/g, '').replace(/^\+?880/, '0')));
      const vD = () => chk(dEl, 'errDest', !dEl.value);
      nEl?.addEventListener('blur', vN);
      pEl?.addEventListener('blur', vP);
      dEl?.addEventListener('change', vD);

      eqForm.addEventListener('submit', (e) => {
        const actionUrl = (eqForm.getAttribute('action') || '').trim();
        const isConfigured = actionUrl && actionUrl !== '#configured-endpoint-required';
        if (![vN(), vP(), vD()].every(Boolean)) {
          e.preventDefault();
          eqForm.querySelector('[aria-invalid="true"]')?.focus();
          return;
        }
        if (!isConfigured) {
          e.preventDefault();
          const summary = encodeURIComponent(`Tour Enquiry: ${dEl.options[dEl.selectedIndex].text} | Name: ${nEl.value.trim()} | Phone: ${pEl.value.trim()}`);
          stEl.hidden = false;
          stEl.className = 'te-alert te-alert--warning';
          stEl.innerHTML = '<strong>No form endpoint configured (Static Mode):</strong> Validation succeeded, but this static host has no backend endpoint yet - nothing was submitted. <a class="te-link" href="https://wa.me/8801838754207?text=' + summary + '">Send pre-filled details on WhatsApp</a> or call <span class="te-num">01838-754207</span>.';
        }
      });
    }
  });
})();
