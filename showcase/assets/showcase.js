/* ============================================================
   Trip Express BD - Shared Showcase Runtime (Prompt 3C)
   Provides theme/contrast/density toggles, focus-trapped modals
   & drawers, notification bell, skeleton toggles, and sprite.
   ============================================================ */
(function () {
  'use strict';

  const EXTRA_SYMBOLS = `
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
    <symbol id="i-bell" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></symbol>
    <symbol id="i-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></symbol>
    <symbol id="i-edit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></symbol>
    <symbol id="i-filter" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>
    <symbol id="i-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="i-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></symbol>
    <symbol id="i-chev-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="i-chev-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></symbol>
    <symbol id="i-chev-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8 4.5 5.6v5.6c0 4.6 3.1 8.9 7.5 10.2 4.4-1.3 7.5-5.6 7.5-10.2V5.6z"/></symbol>
  </svg>`;

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', EXTRA_SYMBOLS);

    const backdrop = document.getElementById('dsBackdrop');
    const adminSide = document.getElementById('adminSidebar');
    const adminMenuBtn = document.getElementById('adminMenuBtn');
    const rightDrawer = document.getElementById('detailDrawer');

    let lastOpener = null;

    window.scOpenModal = function (id, opener) {
      const el = document.getElementById(id);
      if (!el) return;
      lastOpener = opener || document.activeElement;
      el.classList.add('is-open');
      backdrop?.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      const first = el.querySelector('button, input, select, textarea, [tabindex="0"]');
      first?.focus();
    };

    window.scOpenDrawer = function (id, opener) {
      const el = document.getElementById(id);
      if (!el) return;
      lastOpener = opener || document.activeElement;
      el.classList.add('is-open');
      backdrop?.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      el.querySelector('button, input')?.focus();
    };

    window.scCloseOverlays = function () {
      document.querySelectorAll('.ds-dialog.is-open, .sc-drawer-right.is-open, .sc-admin-side.is-open').forEach(el => {
        el.classList.remove('is-open');
      });
      backdrop?.classList.remove('is-open');
      adminMenuBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      lastOpener?.focus?.();
    };

    adminMenuBtn?.addEventListener('click', () => {
      const open = !adminSide?.classList.contains('is-open');
      adminSide?.classList.toggle('is-open', open);
      backdrop?.classList.toggle('is-open', open);
      adminMenuBtn.setAttribute('aria-expanded', String(open));
    });

    backdrop?.addEventListener('click', window.scCloseOverlays);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') window.scCloseOverlays();
      if (e.key === 'Tab') {
        const activeModal = document.querySelector('.ds-dialog.is-open, .sc-drawer-right.is-open');
        if (!activeModal) return;
        const focusables = [...activeModal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    document.querySelectorAll('[data-close-overlay]').forEach(btn => {
      btn.addEventListener('click', window.scCloseOverlays);
    });
  });
})();
