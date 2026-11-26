/* ============================================================
   Trip Express BD - Admin Portal Controller (Client-Side Prototype)
   Security Note: Role toggling previews UI visibility ONLY.
   Real permission checks MUST execute server-side on API endpoints.
   ============================================================ */
(() => {
  'use strict';

  /* ---------- Inline Lucide SVG Sprite ---------- */
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" hidden aria-hidden="true">
    <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>
    <symbol id="i-list" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></symbol>
    <symbol id="i-sort" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></symbol>
    <symbol id="i-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></symbol>
    <symbol id="i-ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></symbol>
  </svg>`;
  document.body.insertAdjacentHTML('afterbegin', sprite);

  /* ---------- Role Capabilities (Client UI Visibility Demo) ---------- */
  const ROLES = {
    ops_lead: {
      label: 'Operations Lead',
      actor: 'MD Mirajul Islam (Ops Lead)',
      canVerify: true, canCreate: true, canEdit: true, canVoid: true, canPermissions: true,
      note: 'Full workspace UI visible. Server still validates JWT claims & DB ownership.'
    },
    desk_agent: {
      label: 'Booking Desk Agent',
      actor: 'Chattogram Counter #2',
      canVerify: false, canCreate: true, canEdit: true, canVoid: false, canPermissions: false,
      note: 'Desk Agent UI: Void & Role Matrix restricted; verify requires Finance/Ops.'
    },
    finance: {
      label: 'Finance Verifier',
      actor: 'Faysal J. Chowdhury (Finance)',
      canVerify: true, canCreate: false, canEdit: false, canVoid: false, canPermissions: false,
      note: 'Finance UI: Deposit verification enabled; seat creation/void hidden.'
    }
  };

  /* ---------- Seed Domain Dataset (Trip Express BD Routes & Banks) ---------- */
  const BOOKINGS = [
    { id: 'TE-NEP-041', name: 'Tariqul Islam', phone: '01819-440218', route: 'Explore Nepal 5D/4N', seats: 2, paid: 58500, total: 117000, status: 'pending_verify', bank: 'Islami Bank (Chawkbazar) · 20501620205843017', slip: 'IBBL-88412', note: 'দুইটি জানালার সিট ও নাগরকোটে পাশাপাশি রুম লাগবে (ঢাকা থেকে)' },
    { id: 'TE-NEP-042', name: 'Nusrat Jahan', phone: '01712-903411', route: 'Explore Nepal 5D/4N', seats: 1, paid: 58500, total: 58500, status: 'confirmed', bank: 'Eastern Bank (Agrabad) · 0011450000514', slip: 'EBL-55209', note: 'Passport valid through 2029, DAC departure OK' },
    { id: 'TE-KSH-019', name: 'Mahmudul Hasan', phone: '01838-221904', route: 'Kashmir Season 5', seats: 2, paid: 35000, total: 70000, status: 'confirmed', bank: 'Eastern Bank (Agrabad) · 0011450000514', slip: 'EBL-54108', note: 'Indian tourist visa valid till March, double room' },
    { id: 'TE-MEG-008', name: 'Farhana Yasmin', phone: '01621-504119', route: 'Meghalaya & Dawki', seats: 3, paid: 15000, total: 0, status: 'pending_verify', bank: 'Islami Bank (Chawkbazar) · 20501620205843017', slip: 'IBBL-87901', note: 'তামাবিল বর্ডার থেকে তাঁবু নিবাসী গ্রুপের সাথে যুক্ত হবেন' },
    { id: 'TE-NEP-039', name: 'Sajjad Hossain', phone: '01911-778120', route: 'Explore Nepal 5D/4N', seats: 2, paid: 121400, total: 121400, status: 'airfare_diff', bank: 'Islami Bank (Chawkbazar) · 20501620205843017', slip: 'IBBL-87544', note: 'Air ticket exceeded ৳36,000 ceiling by ৳2,200/seat settled' },
    { id: 'TE-NEP-040', name: 'Rashedul Alam', phone: '01840-901122', route: 'Explore Nepal 5D/4N', seats: 1, paid: 25000, total: 58500, status: 'pending_verify', bank: 'Eastern Bank (Agrabad) · 0011450000514', slip: 'EBL-55100', note: 'Balance due before Oct 10 ticket cutoff' },
    { id: 'TE-KSH-020', name: 'Anika Tabassum', phone: '01755-663210', route: 'Kashmir Season 5', seats: 1, paid: 35000, total: 35000, status: 'confirmed', bank: 'Islami Bank (Chawkbazar) · 20501620205843017', slip: 'IBBL-87003', note: 'Chattogram bus feeder coordinated at Dampara' },
    { id: 'TE-NEP-037', name: 'Kamrul Hasan', phone: '01815-332198', route: 'Explore Nepal 5D/4N', seats: 1, paid: 0, total: 58500, status: 'voided', bank: 'N/A', slip: 'NONE', note: 'Cancelled prior to ticket lock-in at guest request' },
    { id: 'TE-MEG-009', name: 'Imran Chowdhury', phone: '01674-112233', route: 'Meghalaya & Dawki', seats: 2, paid: 20000, total: 0, status: 'confirmed', bank: 'Eastern Bank (Agrabad) · 0011450000514', slip: 'EBL-53992', note: 'Dawki boating group pair confirmed' },
    { id: 'TE-NEP-043', name: 'Sumaiya Akter', phone: '01798-204060', route: 'Explore Nepal 5D/4N', seats: 2, paid: 40000, total: 117000, status: 'pending_verify', bank: 'Islami Bank (Chawkbazar) · 20501620205843017', slip: 'IBBL-88495', note: 'চট্টগ্রাম অফিস থেকে ডকুমেন্ট জমা দেয়া হয়েছে' },
    { id: 'TE-KSH-021', name: 'Tanvir Ahmed', phone: '01822-774411', route: 'Kashmir Season 5', seats: 1, paid: 35000, total: 35000, status: 'confirmed', bank: 'Eastern Bank (Agrabad) · 0011450000514', slip: 'EBL-54990', note: 'Season 5 overland single supplement requested' },
    { id: 'TE-NEP-044', name: 'Mehedi Hasan', phone: '01922-119900', route: 'Explore Nepal 5D/4N', seats: 1, paid: 58500, total: 58500, status: 'confirmed', bank: 'Islami Bank (Chawkbazar) · 20501620205843017', slip: 'IBBL-88510', note: 'On-arrival passport copy verified at Dui Number Gate' }
  ];

  const AUDIT = [
    { ts: '2026-11-26 22:40', actor: 'MD Mirajul Islam (Ops Lead)', action: 'SLIP_UPLOADED', target: 'TE-NEP-043', detail: 'Uploaded IBBL-88495 deposit slip (৳40,000)' },
    { ts: '2026-11-26 21:15', actor: 'Faysal J. Chowdhury (Finance)', action: 'AIRFARE_CAP_ADJUST', target: 'TE-NEP-039', detail: 'Recorded +৳2,200/seat diff above ৳36,000 ceiling' },
    { ts: '2026-11-26 19:02', actor: 'Faysal J. Chowdhury (Finance)', action: 'SLIP_VERIFIED', target: 'TE-NEP-042', detail: 'Cleared EBL-55209 on Agrabad statement (৳58,500)' },
    { ts: '2026-11-25 16:45', actor: 'Chattogram Counter #2', action: 'BOOKING_CREATED', target: 'TE-NEP-041', detail: 'Created 2-seat hold Explore Nepal (IBBL pending verify)' },
    { ts: '2026-11-25 11:20', actor: 'MD Mirajul Islam (Ops Lead)', action: 'BOOKING_VOIDED', target: 'TE-NEP-037', detail: 'Voided seat before air ticket issue per caller request' }
  ];

  const STATUS_META = {
    confirmed:      { label: 'Confirmed',      cls: 'te-badge--success' },
    pending_verify: { label: 'Pending Verify', cls: 'te-badge--warning' },
    airfare_diff:   { label: 'Airfare >৳36k',  cls: 'te-badge--info' },
    voided:         { label: 'Voided',         cls: 'te-badge--error' }
  };

  /* ---------- App State ---------- */
  const state = {
    role: 'ops_lead',
    view: 'bookings',
    dataMode: 'ready', // ready | loading | empty | error
    q: '',
    status: 'all',
    route: 'all',
    sortKey: 'id',
    sortDir: 'desc',
    page: 1,
    pageSize: 6,
    selected: new Set(),
    activeId: null,
    wizardStep: 1,
    confirmCallback: null
  };

  /* ---------- Utilities ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const bdt = (n) => '৳' + Number(n || 0).toLocaleString('en-IN');

  function esc(str) {
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  function toast(title, detail = '') {
    const stack = $('#toastStack');
    const el = document.createElement('div');
    el.className = 'adm-toast';
    el.setAttribute('role', 'status');
    el.innerHTML = `<div><strong>${esc(title)}</strong>${detail ? `<div style="font-size:12px;opacity:.9;margin-top:2px;">${esc(detail)}</div>` : ''}</div>
      <button class="te-btn te-btn--sm te-btn--ghost" type="button" aria-label="Dismiss notification" style="color:var(--te-p-n-0);padding:0 6px;"><svg class="ic ic--sm" aria-hidden="true"><use href="#i-x"></use></svg></button>`;
    el.querySelector('button').addEventListener('click', () => el.remove());
    stack.appendChild(el);
    setTimeout(() => { if (el.isConnected) el.remove(); }, 4800);
  }

  function logAudit(action, target, detail) {
    const now = new Date();
    const ts = now.toISOString().slice(0, 16).replace('T', ' ');
    AUDIT.unshift({ ts, actor: ROLES[state.role].actor, action, target, detail });
    renderAudit();
  }

  /* ---------- Theme & Density Controls ---------- */
  const root = document.documentElement;
  function syncToggleButtons() {
    $$('[data-set-density]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setDensity === (root.dataset.density || 'compact'))));
    $$('[data-set-theme]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setTheme === (root.dataset.theme || 'light'))));
    const hc = $('#hcToggle');
    if (hc) hc.setAttribute('aria-pressed', String(root.dataset.contrast === 'high'));
  }
  $$('[data-set-density]').forEach(b => b.addEventListener('click', () => {
    root.dataset.density = b.dataset.setDensity;
    syncToggleButtons();
    toast('Density updated', b.dataset.setDensity === 'compact' ? 'Compact (40px rows / 36px controls)' : 'Comfortable (48px rows / 44px controls)');
  }));
  $$('[data-set-theme]').forEach(b => b.addEventListener('click', () => {
    root.dataset.theme = b.dataset.setTheme;
    syncToggleButtons();
  }));
  $('#hcToggle')?.addEventListener('click', () => {
    root.dataset.contrast = root.dataset.contrast === 'high' ? 'standard' : 'high';
    syncToggleButtons();
  });

  /* ---------- Role & Permission-Aware Navigation ---------- */
  function perms() { return ROLES[state.role]; }

  function applyRoleUI() {
    const p = perms();
    $('#roleBannerNote').textContent = p.note;
    $$('[data-nav-view]').forEach(btn => {
      const v = btn.dataset.navView;
      const locked = (v === 'permissions' && !p.canPermissions) || (v === 'intake' && !p.canCreate);
      btn.setAttribute('data-locked', String(locked));
      const lockBadge = btn.querySelector('.adm-lock-tag');
      if (lockBadge) lockBadge.hidden = !locked;
    });
    const newBtn = $('#btnNewIntake');
    if (newBtn) newBtn.hidden = !p.canCreate;
    const bulkVoid = $('#bulkVoidBtn');
    if (bulkVoid) bulkVoid.hidden = !p.canVoid;
    const bulkVerify = $('#bulkVerifyBtn');
    if (bulkVerify) bulkVerify.hidden = !p.canVerify;

    if (state.view === 'permissions' && !p.canPermissions) {
      $('#permDeniedBanner').hidden = false;
      $('#permTableCard').hidden = true;
    } else if (state.view === 'permissions') {
      $('#permDeniedBanner').hidden = true;
      $('#permTableCard').hidden = false;
    }
    if (state.activeId) syncDrawerPermissions();
  }

  $('#roleSelect')?.addEventListener('change', (e) => {
    state.role = e.target.value;
    applyRoleUI();
    toast('Preview role switched: ' + ROLES[state.role].label, 'UI visibility updated; production RBAC requires server check.');
  });

  /* ---------- Navigation & Breadcrumbs ---------- */
  const VIEW_TITLES = {
    bookings: 'Bookings & Dispatch Queue',
    intake: 'New Seat Intake (3-Step)',
    audit: 'Audit & History Trail',
    permissions: 'Role Permissions Matrix'
  };

  function switchView(viewId) {
    state.view = viewId;
    $$('.adm-view').forEach(s => s.hidden = (s.id !== 'view-' + viewId));
    $$('[data-nav-view]').forEach(b => {
      const active = b.dataset.navView === viewId;
      b.classList.toggle('is-active', active);
      if (active) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    renderBreadcrumbs();
    applyRoleUI();
    closeMobileSidebar();
  }

  function renderBreadcrumbs() {
    const list = $('#admBreadcrumbs');
    let html = `<li><button type="button" data-jump="bookings">Ops Portal</button></li><li aria-hidden="true">/</li>`;
    if (state.activeId && state.view === 'bookings') {
      html += `<li><button type="button" id="crumbClearDetail">${VIEW_TITLES.bookings}</button></li><li aria-hidden="true">/</li><li aria-current="page" class="te-mono">${esc(state.activeId)}</li>`;
    } else {
      html += `<li aria-current="page">${VIEW_TITLES[state.view]}</li>`;
    }
    list.innerHTML = html;
    $('[data-jump="bookings"]', list)?.addEventListener('click', () => { closeDetailDrawer(); switchView('bookings'); });
    $('#crumbClearDetail', list)?.addEventListener('click', closeDetailDrawer);
  }

  $$('[data-nav-view]').forEach(b => b.addEventListener('click', () => switchView(b.dataset.navView)));
  $('#btnNewIntake')?.addEventListener('click', () => switchView('intake'));

  /* Mobile Sidebar */
  const sideEl = $('#admSide');
  const backdrop = $('#admBackdrop');
  function closeMobileSidebar() {
    sideEl.classList.remove('is-open');
    $('#admMenuBtn')?.setAttribute('aria-expanded', 'false');
    if (!detailOpen() && !cmdOpen() && !confirmOpen()) backdrop.classList.remove('is-open');
  }
  $('#admMenuBtn')?.addEventListener('click', () => {
    const open = sideEl.classList.toggle('is-open');
    $('#admMenuBtn').setAttribute('aria-expanded', String(open));
    backdrop.classList.toggle('is-open', open);
  });

  /* ---------- KPI Summaries ---------- */
  function renderKPIs() {
    const confirmedRev = BOOKINGS.filter(b => b.status === 'confirmed' || b.status === 'airfare_diff').reduce((s, b) => s + b.paid, 0);
    const activeSeats = BOOKINGS.filter(b => b.status !== 'voided').reduce((s, b) => s + b.seats, 0);
    const pendingCnt = BOOKINGS.filter(b => b.status === 'pending_verify').length;
    const diffCnt = BOOKINGS.filter(b => b.status === 'airfare_diff').length;
    $('#kpiDeposits').textContent = bdt(confirmedRev);
    $('#kpiSeats').textContent = activeSeats + ' Held';
    $('#kpiPending').textContent = pendingCnt + ' Slips';
    $('#kpiAirDiff').textContent = diffCnt + ' File' + (diffCnt === 1 ? '' : 's');
  }

  /* ---------- Filter, Sort, Pagination & Table States ---------- */
  function getFiltered() {
    const q = state.q.trim().toLowerCase();
    return BOOKINGS.filter(b => {
      if (state.status !== 'all' && b.status !== state.status) return false;
      if (state.route !== 'all' && !b.route.toLowerCase().includes(state.route)) return false;
      if (!q) return true;
      return (b.id + ' ' + b.name + ' ' + b.phone + ' ' + b.route + ' ' + b.note).toLowerCase().includes(q);
    }).sort((a, b) => {
      const dir = state.sortDir === 'asc' ? 1 : -1;
      if (state.sortKey === 'paid' || state.sortKey === 'seats') return (a[state.sortKey] - b[state.sortKey]) * dir;
      return String(a[state.sortKey]).localeCompare(String(b[state.sortKey])) * dir;
    });
  }

  function renderTable() {
    renderKPIs();
    const tbody = $('#bookingsTbody');
    const stateBox = $('#tableStateBox');
    const tableScroll = $('#tableScroll');
    const pagBar = $('#pagBar');

    if (state.dataMode === 'loading') {
      tableScroll.hidden = false; stateBox.hidden = true; pagBar.hidden = true;
      tbody.innerHTML = Array.from({ length: 5 }, () =>
        `<tr><td><div class="adm-skel" style="width:16px"></div></td><td><div class="adm-skel" style="width:92px"></div></td><td><div class="adm-skel" style="width:120px"></div></td><td><div class="adm-skel" style="width:140px"></div></td><td><div class="adm-skel" style="width:74px"></div></td><td><div class="adm-skel" style="width:90px"></div></td><td><div class="adm-skel" style="width:140px"></div></td><td><div class="adm-skel" style="width:60px"></div></td></tr>`
      ).join('');
      return;
    }
    if (state.dataMode === 'error') {
      tableScroll.hidden = true; pagBar.hidden = true; stateBox.hidden = false;
      stateBox.innerHTML = `<span class="te-badge te-badge--error">HTTP 503 · Ledger Unavailable</span>
        <h3>Unable to reach booking verification service</h3>
        <p style="max-width:46ch;color:var(--te-text-muted);">Simulated upstream timeout for UI verification. Your local edits are preserved.</p>
        <button class="te-btn te-btn--primary" type="button" id="retryLoadBtn">Retry connection</button>`;
      $('#retryLoadBtn').addEventListener('click', () => { state.dataMode = 'ready'; $('#dataModeSelect').value = 'ready'; renderTable(); toast('Reconnected', 'Live mock ledger restored.'); });
      return;
    }

    const rows = state.dataMode === 'empty' ? [] : getFiltered();
    if (!rows.length) {
      tableScroll.hidden = true; pagBar.hidden = true; stateBox.hidden = false;
      stateBox.innerHTML = `<span class="te-badge te-badge--neutral">0 Matching Bookings</span>
        <h3>No booking records match these filters</h3>
        <p style="max-width:46ch;color:var(--te-text-muted);">Clear search keywords or reset destination/status filters to view active groups.</p>
        <button class="te-btn te-btn--outline" type="button" id="emptyResetBtn">Reset all filters</button>`;
      $('#emptyResetBtn').addEventListener('click', () => {
        state.q = ''; state.status = 'all'; state.route = 'all'; state.dataMode = 'ready';
        $('#qSearch').value = ''; $('#fStatus').value = 'all'; $('#fRoute').value = 'all'; $('#dataModeSelect').value = 'ready';
        renderTable();
      });
      return;
    }

    tableScroll.hidden = false; stateBox.hidden = true; pagBar.hidden = false;
    const totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * state.pageSize;
    const slice = rows.slice(start, start + state.pageSize);

    tbody.innerHTML = slice.map(r => {
      const st = STATUS_META[r.status] || { label: r.status, cls: 'te-badge--neutral' };
      const chk = state.selected.has(r.id);
      return `<tr class="${chk ? 'is-selected' : ''}" data-row-id="${esc(r.id)}">
        <td data-label="Select" onclick="event.stopPropagation()">
          <input class="adm-check" type="checkbox" data-sel-id="${esc(r.id)}" ${chk ? 'checked' : ''} aria-label="Select ${esc(r.id)}">
        </td>
        <td data-label="Booking ID" class="te-mono"><strong>${esc(r.id)}</strong></td>
        <td data-label="Traveller"><strong>${esc(r.name)}</strong><br><span class="te-num" style="font-size:12px;color:var(--te-text-muted);">${esc(r.phone)}</span></td>
        <td data-label="Route">${esc(r.route)} <span class="te-num" style="color:var(--te-text-muted);">(${r.seats})</span></td>
        <td data-label="Paid (৳)" class="is-num te-num"><strong>${bdt(r.paid)}</strong></td>
        <td data-label="Status"><span class="te-badge ${st.cls}">${esc(st.label)}</span></td>
        <td data-label="Notes"><span class="adm-trunc" title="${esc(r.note)}">${esc(r.note)}</span></td>
        <td data-label="Action" onclick="event.stopPropagation()">
          <button class="te-btn te-btn--sm te-btn--outline" type="button" data-inspect="${esc(r.id)}">Inspect</button>
        </td>
      </tr>`;
    }).join('');

    // Sort aria attributes
    $$('[data-sort]').forEach(btn => {
      const th = btn.closest('th');
      th.setAttribute('aria-sort', btn.dataset.sort === state.sortKey ? (state.sortDir === 'asc' ? 'ascending' : 'descending') : 'none');
    });

    // Pagination UI
    $('#pagInfo').textContent = `Showing ${start + 1}–${Math.min(start + state.pageSize, rows.length)} of ${rows.length}`;
    $('#pagPrev').disabled = state.page <= 1;
    $('#pagNext').disabled = state.page >= totalPages;

    // Header select-all sync
    const allPageSel = slice.every(r => state.selected.has(r.id));
    const somePageSel = slice.some(r => state.selected.has(r.id));
    const selAll = $('#selectAll');
    if (selAll) { selAll.checked = allPageSel; selAll.indeterminate = !allPageSel && somePageSel; }

    // Bulk bar
    const bulkBar = $('#bulkBar');
    if (state.selected.size > 0) {
      bulkBar.hidden = false;
      $('#bulkCount').textContent = `${state.selected.size} booking${state.selected.size > 1 ? 's' : ''} selected`;
    } else {
      bulkBar.hidden = true;
    }

    // Bind row clicks & checkboxes
    $$('[data-sel-id]', tbody).forEach(cb => cb.addEventListener('change', () => {
      if (cb.checked) state.selected.add(cb.dataset.selId); else state.selected.delete(cb.dataset.selId);
      renderTable();
    }));
    $$('tr[data-row-id]', tbody).forEach(tr => tr.addEventListener('click', () => openDetailDrawer(tr.dataset.rowId)));
    $$('[data-inspect]', tbody).forEach(b => b.addEventListener('click', () => openDetailDrawer(b.dataset.inspect)));
  }

  $('#selectAll')?.addEventListener('change', (e) => {
    const slice = getFiltered().slice((state.page - 1) * state.pageSize, state.page * state.pageSize);
    slice.forEach(r => e.target.checked ? state.selected.add(r.id) : state.selected.delete(r.id));
    renderTable();
  });
  $('#qSearch')?.addEventListener('input', (e) => { state.q = e.target.value; state.page = 1; renderTable(); });
  $('#fStatus')?.addEventListener('change', (e) => { state.status = e.target.value; state.page = 1; renderTable(); });
  $('#fRoute')?.addEventListener('change', (e) => { state.route = e.target.value; state.page = 1; renderTable(); });
  $('#dataModeSelect')?.addEventListener('change', (e) => { state.dataMode = e.target.value; renderTable(); });
  $('#pageSizeSelect')?.addEventListener('change', (e) => { state.pageSize = Number(e.target.value); state.page = 1; renderTable(); });
  $('#pagPrev')?.addEventListener('click', () => { if (state.page > 1) { state.page--; renderTable(); } });
  $('#pagNext')?.addEventListener('click', () => { state.page++; renderTable(); });
  $$('[data-sort]').forEach(btn => btn.addEventListener('click', () => {
    const k = btn.dataset.sort;
    state.sortDir = (state.sortKey === k && state.sortDir === 'asc') ? 'desc' : 'asc';
    state.sortKey = k;
    renderTable();
  }));

  /* Bulk actions */
  $('#bulkClearBtn')?.addEventListener('click', () => { state.selected.clear(); renderTable(); });
  $('#bulkVerifyBtn')?.addEventListener('click', () => {
    if (!perms().canVerify) return;
    let cnt = 0;
    BOOKINGS.forEach(b => { if (state.selected.has(b.id) && b.status === 'pending_verify') { b.status = 'confirmed'; cnt++; logAudit('SLIP_VERIFIED', b.id, 'Bulk deposit verification approved'); } });
    state.selected.clear();
    renderTable();
    toast(`Verified ${cnt} deposit slip(s)`, 'Status changed to Confirmed.');
  });
  $('#bulkVoidBtn')?.addEventListener('click', () => {
    if (!perms().canVoid) return;
    openConfirm(`Void ${state.selected.size} selected booking(s)?`, 'Voided bookings remain visible in the audit ledger for financial reconciliation.', 'VOID', () => {
      const ids = [...state.selected];
      ids.forEach(id => {
        const rec = BOOKINGS.find(b => b.id === id);
        if (rec) { rec.status = 'voided'; logAudit('BOOKING_VOIDED', id, 'Bulk void executed by Ops Lead'); }
      });
      state.selected.clear();
      renderTable();
      toast('Bookings voided', ids.join(', '));
    });
  });

  /* ---------- Detail & Edit Slide-Over Drawer + Sticky Actions ---------- */
  const drawerEl = $('#detailDrawer');
  const detailOpen = () => drawerEl.classList.contains('is-open');
  let openerBeforeDrawer = null;

  function syncDrawerPermissions() {
    const p = perms();
    $('#dVoidBtn').hidden = !p.canVoid;
    $('#dVerifyBtn').hidden = !p.canVerify;
    $('#dSaveBtn').disabled = !p.canEdit;
    ['dName', 'dPhone', 'dPaid', 'dStatus', 'dNote'].forEach(id => { $('#' + id).readOnly = !p.canEdit; });
    $('#dStatus').disabled = !p.canEdit;
  }

  function openDetailDrawer(id) {
    const rec = BOOKINGS.find(b => b.id === id);
    if (!rec) return;
    openerBeforeDrawer = document.activeElement;
    state.activeId = id;
    $('#drawerHeading').textContent = `${rec.id} - ${rec.name}`;
    $('#dIdRo').value = rec.id;
    $('#dRouteRo').value = `${rec.route} (${rec.seats} seat${rec.seats > 1 ? 's' : ''})`;
    $('#dBankRo').value = `${rec.bank} · Slip ${rec.slip}`;
    $('#dName').value = rec.name;
    $('#dPhone').value = rec.phone;
    $('#dPaid').value = rec.paid;
    $('#dStatus').value = rec.status;
    $('#dNote').value = rec.note;
    $('#dErrName').classList.remove('is-on');
    $('#dErrPhone').classList.remove('is-on');

    const logs = AUDIT.filter(a => a.target === id);
    $('#drawerHistory').innerHTML = logs.length
      ? logs.map(a => `<div class="adm-timeline__item"><strong>${esc(a.action)}</strong> · <span class="te-num" style="color:var(--te-text-muted);">${esc(a.ts)}</span><br>${esc(a.detail)}<div style="font-size:12px;color:var(--te-text-muted);">${esc(a.actor)}</div></div>`).join('')
      : '<p style="color:var(--te-text-muted);">No changes recorded in current session log.</p>';

    syncDrawerPermissions();
    renderBreadcrumbs();
    drawerEl.classList.add('is-open');
    backdrop.classList.add('is-open');
    $('#drawerCloseBtn').focus();
  }

  function closeDetailDrawer() {
    drawerEl.classList.remove('is-open');
    state.activeId = null;
    renderBreadcrumbs();
    if (!cmdOpen() && !confirmOpen()) backdrop.classList.remove('is-open');
    openerBeforeDrawer?.focus();
  }

  $('#drawerCloseBtn')?.addEventListener('click', closeDetailDrawer);
  $('#drawerCancelBtn')?.addEventListener('click', closeDetailDrawer);

  // Drawer tabs keyboard & click
  const dTabs = $$('[data-dtab]');
  dTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      dTabs.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        $('#' + t.getAttribute('aria-controls')).hidden = !on;
      });
    });
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); dTabs[(idx + 1) % dTabs.length].focus(); dTabs[(idx + 1) % dTabs.length].click(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); dTabs[(idx - 1 + dTabs.length) % dTabs.length].focus(); dTabs[(idx - 1 + dTabs.length) % dTabs.length].click(); }
    });
  });

  $('#dSaveBtn')?.addEventListener('click', () => {
    if (!perms().canEdit || !state.activeId) return;
    const rec = BOOKINGS.find(b => b.id === state.activeId);
    const nOk = $('#dName').value.trim().length > 0;
    const pClean = $('#dPhone').value.replace(/[\s\-()]/g, '').replace(/^\+?880/, '0');
    const pOk = /^01[3-9]\d{8}$/.test(pClean);
    $('#dName').setAttribute('aria-invalid', String(!nOk));
    $('#dErrName').classList.toggle('is-on', !nOk);
    $('#dPhone').setAttribute('aria-invalid', String(!pOk));
    $('#dErrPhone').classList.toggle('is-on', !pOk);
    if (!nOk || !pOk) { toast('Validation failed', 'Check highlighted fields before saving.'); return; }

    rec.name = $('#dName').value.trim();
    rec.phone = $('#dPhone').value.trim();
    rec.paid = Number($('#dPaid').value || 0);
    rec.status = $('#dStatus').value;
    rec.note = $('#dNote').value.trim();
    logAudit('BOOKING_UPDATED', rec.id, `Updated details / paid ${bdt(rec.paid)} (${rec.status})`);
    renderTable();
    openDetailDrawer(rec.id);
    toast('Changes saved', `${rec.id} updated.`);
  });

  $('#dVerifyBtn')?.addEventListener('click', () => {
    if (!perms().canVerify || !state.activeId) return;
    const rec = BOOKINGS.find(b => b.id === state.activeId);
    rec.status = 'confirmed';
    logAudit('SLIP_VERIFIED', rec.id, `Verified ${rec.slip}`);
    renderTable();
    openDetailDrawer(rec.id);
    toast('Deposit verified', `${rec.id} marked Confirmed.`);
  });

  $('#dVoidBtn')?.addEventListener('click', () => {
    if (!perms().canVoid || !state.activeId) return;
    const id = state.activeId;
    openConfirm(`Void booking ${id}?`, 'This flags the seat inventory as released while keeping payment history locked in audit logs.', 'VOID', () => {
      const rec = BOOKINGS.find(b => b.id === id);
      rec.status = 'voided';
      logAudit('BOOKING_VOIDED', id, 'Voided from record drawer');
      renderTable();
      closeDetailDrawer();
      toast('Booking voided', id);
    });
  });

  /* ---------- Multi-Step Seat Intake (3-Step Workflow) ---------- */
  function setWizardStep(step) {
    state.wizardStep = step;
    [1, 2, 3].forEach(n => {
      const pane = $('#wizStep' + n);
      const pill = $('#wizInd' + n);
      if (pane) pane.hidden = (n !== step);
      if (pill) {
        pill.classList.toggle('is-active', n === step);
        pill.classList.toggle('is-done', n < step);
      }
    });
  }

  $('#wizNext1')?.addEventListener('click', () => {
    const capOk = $('#wCapAck').checked;
    $('#wErrCap').classList.toggle('is-on', !capOk);
    if (!capOk) { $('#wCapAck').focus(); return; }
    setWizardStep(2);
  });
  $('#wizBack2')?.addEventListener('click', () => setWizardStep(1));
  $('#wizNext2')?.addEventListener('click', () => {
    const nOk = $('#wName').value.trim().length > 0;
    const pClean = $('#wPhone').value.replace(/[\s\-()]/g, '').replace(/^\+?880/, '0');
    const pOk = /^01[3-9]\d{8}$/.test(pClean);
    $('#wName').setAttribute('aria-invalid', String(!nOk)); $('#wErrName').classList.toggle('is-on', !nOk);
    $('#wPhone').setAttribute('aria-invalid', String(!pOk)); $('#wErrPhone').classList.toggle('is-on', !pOk);
    if (!nOk || !pOk) return;
    $('#wReviewSummary').textContent = `${$('#wRoute').value} · ${$('#wSeats').value} seat(s) · ${$('#wName').value.trim()} (${$('#wPhone').value.trim()})`;
    setWizardStep(3);
  });
  $('#wizBack3')?.addEventListener('click', () => setWizardStep(2));

  $('#intakeForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!perms().canCreate) { toast('Restricted', 'Role lacks booking create permissions.'); return; }
    const id = 'TE-NEW-' + Math.floor(100 + Math.random() * 899);
    BOOKINGS.unshift({
      id,
      name: $('#wName').value.trim(),
      phone: $('#wPhone').value.trim(),
      route: $('#wRoute').value,
      seats: Number($('#wSeats').value || 1),
      paid: Number($('#wAmount').value || 0),
      total: Number($('#wAmount').value || 0),
      status: 'pending_verify',
      bank: $('#wBank').value,
      slip: $('#wSlip').value.trim() || 'COUNTER-CASH',
      note: $('#wNote').value.trim() || 'Added via Ops Intake Wizard'
    });
    logAudit('BOOKING_CREATED', id, `Created via 3-step intake (${$('#wRoute').value})`);
    e.target.reset();
    setWizardStep(1);
    switchView('bookings');
    state.dataMode = 'ready'; state.page = 1;
    renderTable();
    toast('Seat hold created: ' + id, 'Added to Bookings Queue for verification.');
  });

  /* ---------- Command / Search Palette (Ctrl+K) ---------- */
  const cmdDialog = $('#cmdModal');
  const cmdOpen = () => cmdDialog.classList.contains('is-open');
  let cmdIndex = 0;

  function buildCommands(q) {
    const term = q.trim().toLowerCase();
    const base = [
      { label: 'Go to Bookings & Dispatch Queue', tag: 'View', run: () => switchView('bookings') },
      { label: 'Start New Seat Intake (3-Step Wizard)', tag: 'View', run: () => switchView('intake') },
      { label: 'Open Audit & History Trail', tag: 'View', run: () => switchView('audit') },
      { label: 'Open Role Permissions Matrix', tag: 'RBAC', run: () => switchView('permissions') },
      { label: 'Toggle Density (Compact ↔ Comfortable)', tag: 'UI', run: () => { root.dataset.density = root.dataset.density === 'compact' ? 'comfortable' : 'compact'; syncToggleButtons(); } },
      { label: 'Toggle Theme (Light ↔ Night Ocean Dark)', tag: 'UI', run: () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; syncToggleButtons(); } },
      { label: 'Preview State: Loading Skeleton', tag: 'State', run: () => { state.dataMode = 'loading'; $('#dataModeSelect').value = 'loading'; switchView('bookings'); renderTable(); } },
      { label: 'Preview State: Server Error (503)', tag: 'State', run: () => { state.dataMode = 'error'; $('#dataModeSelect').value = 'error'; switchView('bookings'); renderTable(); } }
    ];
    BOOKINGS.slice(0, 8).forEach(b => base.push({
      label: `${b.id} - ${b.name} (${b.route})`, tag: bdt(b.paid),
      run: () => { switchView('bookings'); openDetailDrawer(b.id); }
    }));
    return term ? base.filter(x => (x.label + ' ' + x.tag).toLowerCase().includes(term)) : base;
  }

  function renderCmdList() {
    const items = buildCommands($('#cmdInput').value);
    if (cmdIndex >= items.length) cmdIndex = 0;
    const ul = $('#cmdList');
    ul.innerHTML = items.length ? items.map((it, idx) =>
      `<li><button type="button" class="adm-cmd-item ${idx === cmdIndex ? 'is-hi' : ''}" data-cmd-idx="${idx}"><span>${esc(it.label)}</span><span class="adm-kbd">${esc(it.tag)}</span></button></li>`
    ).join('') : '<li style="padding:12px;color:var(--te-text-muted);">No matching command or booking ID.</li>';
    $$('[data-cmd-idx]', ul).forEach(b => b.addEventListener('click', () => {
      items[Number(b.dataset.cmdIdx)].run();
      closeCmd();
    }));
  }

  function openCmd() {
    cmdDialog.classList.add('is-open');
    backdrop.classList.add('is-open');
    $('#cmdInput').value = '';
    cmdIndex = 0;
    renderCmdList();
    $('#cmdInput').focus();
  }
  function closeCmd() {
    cmdDialog.classList.remove('is-open');
    if (!detailOpen() && !confirmOpen() && !sideEl.classList.contains('is-open')) backdrop.classList.remove('is-open');
  }
  $('#cmdBtn')?.addEventListener('click', openCmd);
  $('#cmdClose')?.addEventListener('click', closeCmd);
  $('#cmdInput')?.addEventListener('input', () => { cmdIndex = 0; renderCmdList(); });
  $('#cmdInput')?.addEventListener('keydown', (e) => {
    const items = buildCommands($('#cmdInput').value);
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdIndex = (cmdIndex + 1) % Math.max(1, items.length); renderCmdList(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); cmdIndex = (cmdIndex - 1 + Math.max(1, items.length)) % Math.max(1, items.length); renderCmdList(); }
    if (e.key === 'Enter' && items[cmdIndex]) { e.preventDefault(); items[cmdIndex].run(); closeCmd(); }
  });

  /* ---------- Destructive Confirmation AlertDialog ---------- */
  const confirmEl = $('#confirmModal');
  const confirmOpen = () => confirmEl.classList.contains('is-open');
  function openConfirm(title, desc, keyword, cb) {
    $('#confirmTitle').textContent = title;
    $('#confirmDesc').textContent = desc;
    $('#confirmKeywordLabel').textContent = keyword;
    $('#confirmInput').value = '';
    $('#confirmInput').dataset.expected = keyword;
    $('#confirmErr').classList.remove('is-on');
    state.confirmCallback = cb;
    confirmEl.classList.add('is-open');
    backdrop.classList.add('is-open');
    $('#confirmInput').focus();
  }
  function closeConfirm() {
    confirmEl.classList.remove('is-open');
    state.confirmCallback = null;
    if (!detailOpen() && !cmdOpen() && !sideEl.classList.contains('is-open')) backdrop.classList.remove('is-open');
  }
  $('#confirmCancel')?.addEventListener('click', closeConfirm);
  $('#confirmProceed')?.addEventListener('click', () => {
    const exp = $('#confirmInput').dataset.expected;
    if ($('#confirmInput').value.trim().toUpperCase() !== exp) {
      $('#confirmErr').classList.add('is-on');
      $('#confirmInput').focus();
      return;
    }
    const fn = state.confirmCallback;
    closeConfirm();
    fn?.();
  });

  /* Global keyboard shortcuts + backdrop click */
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); cmdOpen() ? closeCmd() : openCmd(); }
    if (e.key === 'Escape') {
      if (confirmOpen()) closeConfirm();
      else if (cmdOpen()) closeCmd();
      else if (detailOpen()) closeDetailDrawer();
      else if (sideEl.classList.contains('is-open')) closeMobileSidebar();
    }
  });
  backdrop?.addEventListener('click', () => { closeConfirm(); closeCmd(); closeDetailDrawer(); closeMobileSidebar(); });

  /* ---------- Render Audit Table ---------- */
  function renderAudit() {
    const tb = $('#auditTbody');
    if (!tb) return;
    tb.innerHTML = AUDIT.map(a => `<tr>
      <td data-label="Timestamp" class="te-mono" style="white-space:nowrap;">${esc(a.ts)}</td>
      <td data-label="Actor">${esc(a.actor)}</td>
      <td data-label="Event"><span class="te-badge te-badge--info te-mono">${esc(a.action)}</span></td>
      <td data-label="Target" class="te-mono"><strong>${esc(a.target)}</strong></td>
      <td data-label="Detail">${esc(a.detail)}</td>
    </tr>`).join('');
  }

  /* Init */
  syncToggleButtons();
  applyRoleUI();
  renderBreadcrumbs();
  renderTable();
  renderAudit();
})();
