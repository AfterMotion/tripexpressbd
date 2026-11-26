/* ============================================================
   Trip Express BD - Single Classic Vanilla JS Runtime
   Runs cleanly over both file:// and http://localhost (zero ES module CORS issues).
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
    <symbol id="i-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></symbol>
    <symbol id="i-chev-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></symbol>
    <symbol id="i-chev-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></symbol>
    <symbol id="i-chev-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>
    <symbol id="i-sort" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.9 1.2-.5 0-1.1.1-3.8-1-3.2-1.3-5.2-4.5-5.4-4.7-.1-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5.2.6.9 2.2.9 2.4.1.2.1.4 0 .6-.1.2-.2.3-.4.5l-.5.6c-.2.2-.3.4-.1.7.2.3 1 1.6 2.1 2.6 1.5 1.3 2.7 1.7 3 1.9.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.5-.3.8-.2.3.1 2 .9 2.3 1.1.3.2.5.3.6.4 0 .2 0 .9-.2 1.5z"/></symbol>
  </svg>`;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  function showToast(msg, sub = '') {
    let stack = $('#psToasts');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'psToasts';
      stack.className = 'ps-toasts';
      stack.setAttribute('aria-live', 'polite');
      document.body.appendChild(stack);
    }
    const item = document.createElement('div');
    item.className = 'ps-toast';
    item.innerHTML = '<div><strong></strong><div></div></div><button class="te-btn te-btn--sm te-btn--ghost" type="button" aria-label="Dismiss">×</button>';
    item.querySelector('strong').textContent = msg;
    const subEl = item.querySelector('div > div');
    if (sub) subEl.textContent = sub; else subEl.hidden = true;
    item.querySelector('button').addEventListener('click', () => item.remove());
    stack.appendChild(item);
    setTimeout(() => { if (item.isConnected) item.remove(); }, 4200);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', sprite);

    /* 1. Light / Night Ocean Theme Toggle (safe on file://) */
    const root = document.documentElement;
    const themeBtn = $('#psThemeBtn');
    const setTheme = (t) => {
      root.setAttribute('data-theme', t);
      if (themeBtn) {
        themeBtn.textContent = t === 'dark' ? 'Theme: Night Ocean' : 'Night Ocean';
        themeBtn.setAttribute('aria-pressed', String(t === 'dark'));
      }
      try { localStorage.setItem('te-ps-theme', t); } catch (_) {}
    };
    try {
      const saved = localStorage.getItem('te-ps-theme');
      if (saved === 'dark' || saved === 'light') setTheme(saved);
    } catch (_) {}
    themeBtn?.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

    /* 2. Mobile Drawer */
    const drawer = $('#psDrawer');
    const backdrop = $('#psBackdrop');
    const menuBtn = $('#psMenuBtn');
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
      $('#psDrawerClose')?.focus();
    });
    $('#psDrawerClose')?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);
    $$('a', drawer || document).forEach(a => a.addEventListener('click', () => {
      if (a.closest('#psDrawer')) closeDrawer();
    }));

    /* 3. Accordions & Tabs (Keyboard ArrowLeft / ArrowRight) */
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
            const panel = document.getElementById(t.getAttribute('aria-controls'));
            if (panel) panel.hidden = !on;
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

    /* 4. Lightbox */
    const lb = $('#psLightbox');
    const lbTriggers = $$('[data-lb-src]');
    let lbIdx = 0;
    const showLb = (i) => {
      if (!lb || !lbTriggers.length) return;
      lbIdx = (i + lbTriggers.length) % lbTriggers.length;
      const t = lbTriggers[lbIdx];
      $('#psLbImg').src = t.dataset.lbSrc;
      $('#psLbImg').alt = t.dataset.lbCap || 'Trip photo';
      $('#psLbCap').textContent = t.dataset.lbCap || '';
      $('#psLbCount').textContent = `${lbIdx + 1} / ${lbTriggers.length}`;
    };
    lbTriggers.forEach((el, idx) => el.addEventListener('click', () => {
      lastFocus = el;
      showLb(idx);
      lb?.classList.add('is-open');
      $('#psLbClose')?.focus();
    }));
    const closeLb = () => { lb?.classList.remove('is-open'); lastFocus?.focus(); };
    $('#psLbClose')?.addEventListener('click', closeLb);
    $('#psLbPrev')?.addEventListener('click', () => showLb(lbIdx - 1));
    $('#psLbNext')?.addEventListener('click', () => showLb(lbIdx + 1));

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

    /* 5. Tours Page Search, Chips & Sort */
    const tourGrid = $('#psTourGrid');
    if (tourGrid) {
      let region = 'all', mode = 'all';
      const qEl = $('#psTourSearch'), sortEl = $('#psTourSort'), cntEl = $('#psTourCount'), emptyEl = $('#psTourEmpty');
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
      $('#psTourReset')?.addEventListener('click', resetTours);
      $('#psTourEmptyReset')?.addEventListener('click', resetTours);
    }

    /* 6. Reports Category Chips */
    const artGrid = $('#psArtGrid');
    if (artGrid) {
      const aBtns = $$('[data-art-filter]');
      aBtns.forEach(b => b.addEventListener('click', () => {
        const f = b.dataset.artFilter;
        aBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        [...artGrid.children].forEach(c => { c.hidden = !(f === 'all' || c.dataset.cat === f); });
      }));
    }

    /* 7. Validation Forms (Home + Contact Page) */
    const eqForm = $('#psEnquiryForm');
    if (eqForm) {
      const nEl = $('#eqName'), pEl = $('#eqPhone'), dEl = $('#eqDest'), stEl = $('#eqStatus'), simErr = $('#eqSimErr');
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
        e.preventDefault();
        if (![vN(), vP(), vD()].every(Boolean)) { eqForm.querySelector('[aria-invalid="true"]')?.focus(); return; }
        stEl.hidden = false;
        if (simErr?.checked) {
          stEl.className = 'ps-alert ps-alert--error';
          stEl.textContent = 'Simulated server timeout (demo error state): Enquiry service unreachable. Uncheck error toggle and retry.';
          showToast('Submission failed (Demo)', 'Simulated network error active.');
          return;
        }
        const ref = 'TE-' + Math.floor(1000 + Math.random() * 9000);
        stEl.className = 'ps-alert ps-alert--success';
        stEl.textContent = `Demo confirmation ${ref}: Validated locally - no backend POST occurred. Message 01838-754207 on WhatsApp for live booking.`;
        showToast('Enquiry validated (' + ref + ')', 'Client-side demo complete.');
        eqForm.reset();
      });
    }

    /* 8. Operations Admin Shell (admin.html) */
    const admRoot = $('#psAdminRoot');
    if (admRoot) {
      const ROWS = [
        { id: 'TE-NEP-041', name: 'Tariqul Islam', route: 'Explore Nepal 5D/4N', paid: 58500, status: 'pending_verify', note: 'দুইটি জানালার সিট ও নাগরকোট রুম' },
        { id: 'TE-NEP-042', name: 'Nusrat Jahan', route: 'Explore Nepal 5D/4N', paid: 58500, status: 'confirmed', note: 'Passport valid 2029, DAC departure OK' },
        { id: 'TE-KSH-019', name: 'Mahmudul Hasan', route: 'Kashmir Season 5', paid: 35000, status: 'confirmed', note: 'Indian visa valid, double share' },
        { id: 'TE-MEG-008', name: 'Farhana Yasmin', route: 'Meghalaya & Dawki', paid: 15000, status: 'pending_verify', note: 'Tamabil border join with তাঁবু নিবাসী' },
        { id: 'TE-NEP-039', name: 'Sajjad Hossain', route: 'Explore Nepal 5D/4N', paid: 121400, status: 'airfare_diff', note: 'Air ticket >৳36,000 cap (+৳2,200/seat)' },
        { id: 'TE-NEP-040', name: 'Rashedul Alam', route: 'Explore Nepal 5D/4N', paid: 25000, status: 'pending_verify', note: 'Balance due prior to Oct 10 cutoff' }
      ];
      let role = 'ops_lead', sortDir = 'asc', stateMode = 'ready', activeId = null;
      const sel = new Set();

      const applyAdmRole = () => {
        const isOps = role === 'ops_lead', canVerify = isOps || role === 'finance', canCreate = isOps || role === 'desk_agent';
        $('#admRoleNote').textContent = `Preview role: ${role} - UI visibility demo only; server RBAC required.`;
        $('#admPermBtn')?.toggleAttribute('data-locked', !isOps);
        $('#admPermLock').hidden = isOps;
        $('#admPermDenied').hidden = isOps;
        $('#admPermMatrix').hidden = !isOps;
        $('#admVoidBtn').hidden = !isOps;
        $('#admBulkVoid').hidden = !isOps;
        $('#admBulkVerify').hidden = !canVerify;
        $('#admNewBtn').hidden = !canCreate;
      };

      const renderAdmRows = () => {
        const tb = $('#admTbody'), box = $('#admStateBox'), wrap = $('#admTableScroll');
        if (stateMode === 'loading') {
          wrap.hidden = false; box.hidden = true;
          tb.innerHTML = '<tr><td colspan="7"><div class="ps-skel"></div></td></tr>'.repeat(4);
          return;
        }
        if (stateMode === 'error') {
          wrap.hidden = true; box.hidden = false;
          box.innerHTML = '<div class="ps-card u-center stack"><span class="te-badge te-badge--error">HTTP 503 · Ledger Timeout</span><p class="u-mb-0">Simulated verification server error.</p><div><button class="te-btn te-btn--sm te-btn--primary" type="button" id="admRetry">Retry</button></div></div>';
          $('#admRetry').addEventListener('click', () => { stateMode = 'ready'; $('#admStateSel').value = 'ready'; renderAdmRows(); });
          return;
        }
        const q = ($('#admFilterQ')?.value || '').toLowerCase();
        const filtered = stateMode === 'empty' ? [] : ROWS.filter(r => !q || (r.id + r.name + r.route + r.note).toLowerCase().includes(q));
        if (!filtered.length) {
          wrap.hidden = true; box.hidden = false;
          box.innerHTML = '<div class="ps-card u-center stack"><span class="te-badge te-badge--neutral">0 Records</span><p class="u-mb-0">No booking records match filter.</p><div><button class="te-btn te-btn--sm te-btn--outline" type="button" id="admClearF">Reset filter</button></div></div>';
          $('#admClearF').addEventListener('click', () => { stateMode = 'ready'; $('#admStateSel').value = 'ready'; $('#admFilterQ').value = ''; renderAdmRows(); });
          return;
        }
        wrap.hidden = false; box.hidden = true;
        filtered.sort((a, b) => sortDir === 'asc' ? a.paid - b.paid : b.paid - a.paid);
        tb.innerHTML = filtered.map(r => {
          const map = { confirmed: ['Confirmed', 'success'], pending_verify: ['Pending Verify', 'warning'], airfare_diff: ['Airfare >৳36k', 'info'], voided: ['Voided', 'error'] }[r.status] || ['Open', 'neutral'];
          return `<tr class="${sel.has(r.id) ? 'is-selected' : ''}">
            <td data-label="Select"><input class="ps-check-box" type="checkbox" data-adm-sel="${r.id}" ${sel.has(r.id) ? 'checked' : ''} aria-label="Select ${r.id}"></td>
            <td data-label="Booking ID" class="te-mono"><strong>${r.id}</strong></td>
            <td data-label="Traveller">${r.name}</td>
            <td data-label="Route">${r.route}</td>
            <td data-label="Paid" class="is-num te-num">৳${r.paid.toLocaleString('en-IN')}</td>
            <td data-label="Status"><span class="te-badge te-badge--${map[1]}">${map[0]}</span></td>
            <td data-label="Action"><button class="te-btn te-btn--sm te-btn--outline" type="button" data-adm-open="${r.id}">Inspect</button></td>
          </tr>`;
        }).join('');
        $('#admBulkBar').hidden = sel.size === 0;
        $('#admBulkTxt').textContent = `${sel.size} selected`;
        $$('[data-adm-sel]', tb).forEach(cb => cb.addEventListener('change', () => {
          if (cb.checked) sel.add(cb.dataset.admSel); else sel.delete(cb.dataset.admSel);
          renderAdmRows();
        }));
        $$('[data-adm-open]', tb).forEach(b => b.addEventListener('click', () => openAdmDetail(b.dataset.admOpen)));
      };

      const openAdmDetail = (id) => {
        const r = ROWS.find(x => x.id === id); if (!r) return;
        activeId = id;
        $('#admDrawerTitle').textContent = `${r.id} - ${r.name}`;
        $('#admDetailId').value = r.id;
        $('#admDetailName').value = r.name;
        $('#admDetailNote').value = r.note;
        $('#admDetailDrawer').classList.add('is-open');
        backdrop?.classList.add('is-open');
      };
      const closeAdmDetail = () => {
        $('#admDetailDrawer').classList.remove('is-open');
        backdrop?.classList.remove('is-open');
      };

      $$('[data-adm-view]').forEach(b => b.addEventListener('click', () => {
        const v = b.dataset.admView;
        $$('.adm-pane').forEach(p => p.hidden = (p.id !== 'adm-' + v));
        $$('[data-adm-view]').forEach(x => x.classList.toggle('is-active', x === b));
        $('#admCrumbCurrent').textContent = b.textContent.trim();
      }));
      $('#admRoleSel')?.addEventListener('change', (e) => { role = e.target.value; applyAdmRole(); showToast('Role preview: ' + role); });
      $('#admDensityBtn')?.addEventListener('click', (e) => {
        const next = root.getAttribute('data-density') === 'compact' ? 'comfortable' : 'compact';
        root.setAttribute('data-density', next);
        e.target.textContent = 'Density: ' + (next === 'compact' ? 'Compact' : 'Comfortable');
        showToast('Density switched to ' + next);
      });
      $('#admStateSel')?.addEventListener('change', (e) => { stateMode = e.target.value; renderAdmRows(); });
      $('#admFilterQ')?.addEventListener('input', renderAdmRows);
      $('#admSortPaid')?.addEventListener('click', () => { sortDir = sortDir === 'asc' ? 'desc' : 'asc'; renderAdmRows(); });
      $('#admBulkVerify')?.addEventListener('click', () => {
        ROWS.forEach(r => { if (sel.has(r.id)) r.status = 'confirmed'; });
        sel.clear(); renderAdmRows(); showToast('Selected deposits verified');
      });
      $('#admBulkVoid')?.addEventListener('click', () => { $('#admConfirmModal').classList.add('is-open'); backdrop?.classList.add('is-open'); });
      $('#admDrawerClose')?.addEventListener('click', closeAdmDetail);
      $('#admSaveBtn')?.addEventListener('click', () => {
        const r = ROWS.find(x => x.id === activeId); if (!r) return;
        r.name = $('#admDetailName').value.trim() || r.name;
        r.note = $('#admDetailNote').value.trim();
        renderAdmRows(); closeAdmDetail(); showToast('Saved ' + r.id);
      });
      $('#admVoidBtn')?.addEventListener('click', () => { $('#admConfirmModal').classList.add('is-open'); });
      $('#admConfirmCancel')?.addEventListener('click', () => { $('#admConfirmModal').classList.remove('is-open'); if (!$('#admDetailDrawer').classList.contains('is-open')) backdrop?.classList.remove('is-open'); });
      $('#admConfirmOk')?.addEventListener('click', () => {
        ROWS.forEach(r => { if (sel.has(r.id) || r.id === activeId) r.status = 'voided'; });
        sel.clear(); $('#admConfirmModal').classList.remove('is-open'); closeAdmDetail(); renderAdmRows(); showToast('Booking voided (demo)', 'Audit entry recorded.');
      });

      // Command Search Modal (Ctrl+K)
      $('#admCmdBtn')?.addEventListener('click', () => { $('#admCmdModal').classList.add('is-open'); $('#admCmdIn').focus(); });
      $('#admCmdClose')?.addEventListener('click', () => $('#admCmdModal').classList.remove('is-open'));
      $('#admCmdIn')?.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        $$('[data-cmd-jump]').forEach(x => x.hidden = q && !x.textContent.toLowerCase().includes(q));
      });
      $$('[data-cmd-jump]').forEach(b => b.addEventListener('click', () => {
        $(`[data-adm-view="${b.dataset.cmdJump}"]`)?.click();
        $('#admCmdModal').classList.remove('is-open');
      }));
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#admCmdBtn')?.click(); }
      });

      applyAdmRole();
      renderAdmRows();
    }
  });
})();
