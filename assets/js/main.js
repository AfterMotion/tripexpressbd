/* Trip Express BD - page behaviour.
   DOM first, always. The 3D journey is imported lazily and only when the device
   earns it; everything below works with WebGL switched off. */
(function () {
  'use strict';

  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduceMotion = mqReduce.matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var desktop = window.matchMedia('(min-width: 1040px)');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  $('#yr').textContent = new Date().getFullYear();

  /* ================= theme ================= */
  var themeBtn = $('#themeBtn');
  var themeUse = $('#themeBtn use');

  function systemDark() { return window.matchMedia('(prefers-color-scheme: dark)').matches; }
  function currentTheme() {
    var a = document.documentElement.getAttribute('data-theme');
    return a || (systemDark() ? 'dark' : 'light');
  }
  function paintTheme() {
    var dark = currentTheme() === 'dark';
    themeUse.setAttribute('href', 'assets/icons.svg#' + (dark ? 'i-sun' : 'i-moon'));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  paintTheme();
  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('te-theme', next); } catch (e) {}
    paintTheme();
  });

  /* ================= smooth scroll =================
     One eased curve for every in-page jump - nav, rail, drawer, hero buttons and
     the skip link. Native `scroll-behavior: smooth` is off in CSS: browsers give
     it different durations and it cannot be interrupted, so a visitor who starts
     scrolling mid-animation gets dragged back. This can be. */
  /* Measured, not read from a token: --te-chrome-h is a calc() and custom
     properties come back unresolved from getComputedStyle. */
  function chromeH() {
    var h = (hdr && hdr.offsetHeight) || 64;
    if (rail && rail.getAttribute('data-show') === 'true') h += rail.offsetHeight;
    return h;
  }
  var scrollAnim = 0;

  function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
  }

  function scrollToY(to, done) {
    cancelAnimationFrame(scrollAnim);
    var from = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    to = clamp(to, 0, Math.max(0, max));
    var dist = to - from;
    if (reduceMotion || Math.abs(dist) < 2) { window.scrollTo(0, to); if (done) done(); return; }

    // Distance-aware duration: a short hop should not take as long as a full-page
    // flight, and nothing should ever take longer than a second.
    var dur = clamp(320 + Math.abs(dist) * 0.32, 380, 980);
    var t0 = 0;
    var interrupted = false;
    var onWheel = function () { interrupted = true; };
    var release = function () {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onWheel);
    };
    // A visitor who starts scrolling owns the scroll - the animation stands down.
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onWheel, { passive: true });

    scrollAnim = requestAnimationFrame(function step(ts) {
      if (!t0) t0 = ts;
      if (interrupted) { release(); return; }
      var p = Math.min(1, (ts - t0) / dur);
      window.scrollTo(0, from + dist * easeInOutQuint(p));
      if (p < 1) scrollAnim = requestAnimationFrame(step);
      else { release(); if (done) done(); }
    });
  }

  function scrollToId(id, focusTarget) {
    var el = document.querySelector(id);
    if (!el) return;
    var y = window.scrollY + el.getBoundingClientRect().top - chromeH() - 12;
    scrollToY(y, function () {
      if (focusTarget === false) return;
      // move focus without a second jump, so keyboard users land where they clicked
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    if (!document.querySelector(id)) return;
    e.preventDefault();
    if (drawer.getAttribute('data-open') === 'true') setDrawer(false);
    scrollToId(id);
    history.replaceState(null, '', id);
  });

  /* ================= header, progress, rail ================= */
  var hdr = $('#hdr');
  var progress = $('#progress');
  var rail = $('#rail');
  var railIn = $('#railIn');
  var railLinks = $$('#rail a');
  var ticking = false;
  var lastY = window.scrollY;
  var railShown = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY;
      hdr.classList.toggle('is-stuck', y > 8);
      // the header wears the journey's colours for as long as it is over them
      if (journey) {
        hdr.classList.toggle('is-over', journey.getBoundingClientRect().bottom > hdr.offsetHeight + 8);
      }

      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--p', max > 0 ? clamp(y / max, 0, 1) : 0);

      /* The rail arrives once the journey is behind you, and gets out of the way
         while you are reading downward. Scrolling back up is the gesture that
         means "I want to navigate", so that is when it returns. */
      if (!desktop.matches) {
        var past = y > window.innerHeight * 0.6;
        var divingDown = y > lastY + 6;      // only an active downward scroll hides it
        if (!past) railShown = false;
        else if (divingDown) railShown = false;
        else railShown = true;
        rail.setAttribute('data-show', railShown ? 'true' : 'false');
      } else {
        rail.setAttribute('data-show', 'false');
      }

      // floating WhatsApp appears once the visitor is past the journey
      var pastHero = y > window.innerHeight * 0.75;
      fab.setAttribute('data-show', pastHero ? 'true' : 'false');
      if (pastHero && !fabPulsed) {
        fabPulsed = true;
        fab.setAttribute('data-expanded', 'true');
        setTimeout(function () { fab.setAttribute('data-expanded', 'false'); }, 4200);
      }

      lastY = y;
      updateJourney();
      galleryDrift();
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var fab = $('#fab');
  var fabPulsed = false;
  var fabBlocked = false;

  /* The floating action stands down over the enquiry form and the footer: the
     visitor is already at the conversion point, and a fixed pill sitting on top of
     the form's own copy is just an obstacle. */
  if ('IntersectionObserver' in window) {
    var fabIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.target.id === 'contact') fabBlocked = e.isIntersecting; });
      fab.setAttribute('data-hide', fabBlocked ? 'true' : 'false');
    }, { rootMargin: '-10% 0px -10% 0px' });
    var contactEl = $('#contact');
    if (contactEl) fabIO.observe(contactEl);
  }

  /* ================= drawer ================= */
  var drawer = $('#drawer');
  var drawerPn = $('.drawer__pn', drawer);
  var menuBtn = $('#menuBtn');
  var lastFocus = null;

  function setDrawer(open) {
    drawer.setAttribute('data-open', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) {
      lastFocus = document.activeElement;
      markHere();
      $('#drawerClose').focus();
    } else if (lastFocus && lastFocus.offsetParent !== null) {
      lastFocus.focus();
    }
  }
  menuBtn.addEventListener('click', function () { setDrawer(true); });
  $('#drawerClose').addEventListener('click', function () { setDrawer(false); });
  $('#drawerBd').addEventListener('click', function () { setDrawer(false); });

  /* Drag the panel away. A drawer you can only dismiss by hitting a 44px X in the
     far corner is a desktop drawer wearing a phone's clothes. */
  (function dragToClose() {
    var x0 = 0, y0 = 0, dx = 0, active = false, decided = false;
    drawerPn.addEventListener('touchstart', function (e) {
      if (drawer.getAttribute('data-open') !== 'true') return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
      dx = 0; active = true; decided = false;
    }, { passive: true });

    drawerPn.addEventListener('touchmove', function (e) {
      if (!active) return;
      var mx = e.touches[0].clientX - x0;
      var my = e.touches[0].clientY - y0;
      if (!decided) {
        // let a vertical swipe scroll the panel instead of dragging it
        if (Math.abs(my) > Math.abs(mx)) { active = false; return; }
        decided = true;
        drawer.classList.add('is-dragging');
      }
      dx = Math.max(0, mx);
      drawerPn.style.setProperty('--drag', dx + 'px');
    }, { passive: true });

    var end = function () {
      if (!active) return;
      active = false;
      drawer.classList.remove('is-dragging');
      drawerPn.style.removeProperty('--drag');
      if (dx > drawerPn.offsetWidth * 0.3) setDrawer(false);
    };
    drawerPn.addEventListener('touchend', end, { passive: true });
    drawerPn.addEventListener('touchcancel', end, { passive: true });
  })();

  drawer.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = $$('a[href], button', drawer).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var i = f.indexOf(document.activeElement);
    e.preventDefault();
    f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
  });

  /* ================= scroll spy =================
     One source of truth for "where am I", painted into the desktop nav, the
     mobile rail and the drawer at the same time. */
  var navLinks = $$('#nav a');
  var spyIds = ['top', 'destinations', 'tours', 'included', 'portfolio', 'reports', 'contact'];
  var spySections = spyIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var currentId = null;

  function paintActive(list, id) {
    list.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  function markHere() {
    $$('.dnav').forEach(function (a) {
      a.classList.toggle('is-here', a.getAttribute('href') === '#' + currentId);
    });
  }

  function spy() {
    var line = window.scrollY + chromeH() + window.innerHeight * 0.28;
    var found = null;
    spySections.forEach(function (s) {
      if (window.scrollY + s.getBoundingClientRect().top <= line) found = s.id;
    });
    if (found === currentId) return;
    currentId = found;
    paintActive(navLinks, currentId);
    paintActive(railLinks, currentId);
    markHere();

    // keep the active chip inside the rail's viewport
    var chip = railLinks.filter(function (a) { return a.classList.contains('is-active'); })[0];
    if (chip && railIn) {
      var want = chip.offsetLeft - railIn.clientWidth / 2 + chip.offsetWidth / 2;
      railIn.scrollTo({ left: Math.max(0, want), behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }
  window.addEventListener('scroll', function () { requestAnimationFrame(spy); }, { passive: true });
  spy();

  /* ================= reveal ================= */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var rvIO = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { rvIO.observe(el); });
  } else {
    $$('.rv').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ================= stat counters ================= */
  if ('IntersectionObserver' in window) {
    var sIO = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        var el = e.target;
        var end = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dec = (String(end).split('.')[1] || '').length;
        if (reduceMotion) { el.textContent = end.toFixed(dec) + suffix; return; }
        var t0 = 0;
        (function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / 1500);
          el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.4 });
    $$('[data-count]').forEach(function (s) { sIO.observe(s); });
  }

  /* ================= destination rail ================= */
  var track = $('#destTrack');
  var destBar = $('#destBar');
  function paintDestBar() {
    if (!track) return;
    var overflow = track.scrollWidth - track.clientWidth;
    if (overflow <= 4) {
      destBar.style.setProperty('--w', '100%');
      track.setAttribute('data-at', 'all');
      return;
    }
    var ratio = track.clientWidth / track.scrollWidth;
    var pos = track.scrollLeft / overflow;
    destBar.style.setProperty('--w', (ratio * 100) + '%');
    destBar.style.setProperty('--x', (pos * (100 / ratio - 100)) + '%');
    track.setAttribute('data-at', pos < 0.02 ? 'start' : pos > 0.98 ? 'end' : 'mid');
  }
  if (track) {
    track.addEventListener('scroll', function () { requestAnimationFrame(paintDestBar); }, { passive: true });
    window.addEventListener('resize', paintDestBar);
    // arrow keys walk the rail when it has focus
    track.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var step = track.clientWidth * 0.7 * (e.key === 'ArrowRight' ? 1 : -1);
      track.scrollBy({ left: step, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    paintDestBar();
  }

  /* ================= gallery: infinite columns, mono until looked at ========= */
  var PHOTOS = [
    { n: 'g00', w: 2048, h: 1536, trip: 'Explore Nepal', alt: 'Trip Express BD travellers seated together on the Dhaka to Kathmandu flight' },
    { n: 'g01', w: 2048, h: 1536, trip: 'Explore Nepal', alt: 'Tourist coaches at Pokhara bus park with the snow-covered Annapurna range behind' },
    { n: 'g02', w: 2048, h: 1536, trip: 'Explore Nepal', alt: 'The Nepal team with their luggage at Tribhuvan International Airport arrivals' },
    { n: 'g03', w: 2048, h: 1614, trip: 'Explore Nepal', alt: 'The group resting in the lobby of their Kathmandu hotel' },
    { n: 'g04', w: 720,  h: 960,  trip: 'Explore Nepal', alt: 'Boarding the Biman Bangladesh aircraft on the apron at Dhaka' },
    { n: 'g05', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'The Meghalaya team at the Indian border welcome arch' },
    { n: 'g06', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'Dinner together at a restaurant in Shillong' },
    { n: 'g07', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'The team aboard the tour coach on the road to Shillong' },
    { n: 'g08', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'The group outside the Dawki land port building' },
    { n: 'g09', w: 1536, h: 2048, trip: 'Meghalaya by Road', alt: 'Travellers in life jackets standing in the pool below a Meghalaya waterfall' },
    { n: 'g10', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'The team on the open grassland hills above Cherrapunji' },
    { n: 'g11', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'The group beside their car on a Meghalaya roadside' },
    { n: 'g12', w: 1536, h: 2048, trip: 'Meghalaya by Road', alt: 'Travellers on the roof of the tourist minibus at a highway stop' },
    { n: 'g13', w: 1536, h: 2048, trip: 'Meghalaya by Road', alt: 'Four travellers with backpacks at the border checkpoint' },
    { n: 'g14', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'The team with arms raised on a cliff viewpoint above a Meghalaya valley' },
    { n: 'g15', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'Evening at Police Bazar in Shillong' },
    { n: 'g16', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'Sharing a meal at the hotel restaurant' },
    { n: 'g17', w: 1536, h: 2048, trip: 'Meghalaya by Road', alt: 'The group at the foot of a twin waterfall in Meghalaya' },
    { n: 'g18', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'The team on the rocks beside the turquoise Umngot river pool at Dawki' },
    { n: 'g19', w: 1536, h: 2048, trip: 'Meghalaya by Road', alt: 'The group with their vehicles at the land port' },
    { n: 'g20', w: 1536, h: 2048, trip: 'Meghalaya by Road', alt: 'A thali of rice and curries served on the Meghalaya trip' },
    { n: 'g21', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'The team relaxing in the hotel lounge' },
    { n: 'g22', w: 2048, h: 1536, trip: 'Meghalaya by Road', alt: 'The group outside the Royal Green hotel in Shillong' }
  ];

  var gal = $('#gallery');
  var galEnd = $('#galEnd');
  var sentinel = $('#galSentinel');
  var cols = [];
  var shown = 0;
  var BATCH = 6;

  function colCount() {
    var w = window.innerWidth;
    return w >= 1280 ? 4 : w >= 1040 ? 3 : w >= 560 ? 2 : 1;
  }
  function buildCols() {
    var n = colCount();
    if (cols.length === n) return;
    gal.innerHTML = '';
    cols = [];
    for (var i = 0; i < n; i++) {
      var c = document.createElement('div');
      c.className = 'gal__col';
      gal.appendChild(c);
      cols.push(c);
    }
    var was = shown;
    shown = 0;
    append(was || BATCH);
  }

  var itemIO = ('IntersectionObserver' in window && !reduceMotion)
    ? new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' })
    : null;

  // On touch there is no hover, so the photo nearest the middle of the screen
  // comes to colour instead.
  var focusIO = (!fine && 'IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target.classList.toggle('is-focus', e.isIntersecting); });
      }, { rootMargin: '-38% 0px -38% 0px' })
    : null;

  function append(count) {
    var made = 0;
    while (shown < PHOTOS.length && made < count) {
      var p = PHOTOS[shown];
      var col = cols[shown % cols.length];
      var b = document.createElement('button');
      b.className = 'gal__item';
      b.type = 'button';
      b.style.setProperty('--d', (made % 3) * 70 + 'ms');
      b.setAttribute('data-i', shown);
      b.setAttribute('aria-label', 'Open photo ' + (shown + 1) + ' of ' + PHOTOS.length + ': ' + p.alt);
      b.innerHTML = '<img src="assets/img/gallery/' + p.n + '-640.webp"'
        + ' srcset="assets/img/gallery/' + p.n + '-640.webp 640w, assets/img/gallery/' + p.n + '-1280.webp 1280w"'
        + ' sizes="(min-width:1280px) 330px, (min-width:1040px) 380px, (min-width:560px) 46vw, 92vw"'
        + ' width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async" alt="' + p.alt + '">'
        + '<span class="gal__cap"><svg class="ic" aria-hidden="true">'
        + '<use href="assets/icons.svg#i-pin"></use></svg>' + p.trip + '</span>';
      col.appendChild(b);
      if (itemIO) itemIO.observe(b); else b.classList.add('is-in');
      if (focusIO) focusIO.observe(b);
      shown++; made++;
    }
    if (shown >= PHOTOS.length) {
      galEnd.hidden = false;
      if (loadIO) loadIO.disconnect();
    }
  }

  var loadIO = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) append(BATCH);
      }, { rootMargin: '600px 0px' })
    : null;

  buildCols();
  if (loadIO) loadIO.observe(sentinel);
  else append(PHOTOS.length);

  /* Counter-drift: odd columns travel with the scroll, even columns against it,
     so the wall of photographs breathes instead of sliding as one slab. Capped at
     20px of travel, desktop only - the brand bans parallax on touch. */
  var driftOn = fine && !reduceMotion && desktop.matches;
  var galleryVisible = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { galleryVisible = e[0].isIntersecting; }, { rootMargin: '200px' })
      .observe(gal);
  }
  function galleryDrift() {
    if (!driftOn || !galleryVisible) return;
    var r = gal.getBoundingClientRect();
    // -1 .. 1 as the block travels through the viewport
    var t = clamp((window.innerHeight / 2 - (r.top + r.height / 2)) / (window.innerHeight / 2 + r.height / 2), -1, 1);
    for (var i = 0; i < cols.length; i++) {
      var dir = i % 2 === 0 ? 1 : -1;
      cols[i].style.setProperty('--drift', (t * 20 * dir).toFixed(2) + 'px');
    }
  }

  var rz;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      buildCols();
      driftOn = fine && !reduceMotion && desktop.matches;
      if (!driftOn) cols.forEach(function (c) { c.style.removeProperty('--drift'); });
    }, 220);
  });

  /* ================= lightbox ================= */
  var lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbCount = $('#lbCount');
  var lbIndex = 0, lbOpener = null;

  function lbShow(i) {
    lbIndex = (i + PHOTOS.length) % PHOTOS.length;
    var p = PHOTOS[lbIndex];
    lbImg.src = 'assets/img/gallery/' + p.n + '-1280.webp';
    lbImg.alt = p.alt;
    lbImg.width = p.w; lbImg.height = p.h;
    lbCap.textContent = p.trip;
    lbCount.textContent = (lbIndex + 1) + ' / ' + PHOTOS.length;
  }
  function lbOpen(i, opener) {
    lbOpener = opener; lbShow(i);
    lb.setAttribute('data-open', 'true');
    document.documentElement.style.overflow = 'hidden';
    $('#lbClose').focus();
  }
  function lbClose() {
    lb.setAttribute('data-open', 'false');
    document.documentElement.style.overflow = '';
    lbImg.removeAttribute('src');
    if (lbOpener) lbOpener.focus();
  }
  gal.addEventListener('click', function (e) {
    var btn = e.target.closest('.gal__item');
    if (btn) lbOpen(parseInt(btn.getAttribute('data-i'), 10), btn);
  });
  $('#lbClose').addEventListener('click', lbClose);
  $('#lbPrev').addEventListener('click', function () { lbShow(lbIndex - 1); });
  $('#lbNext').addEventListener('click', function () { lbShow(lbIndex + 1); });
  $('.lb__stage').addEventListener('click', function (e) { if (e.target === e.currentTarget) lbClose(); });

  document.addEventListener('keydown', function (e) {
    if (lb.getAttribute('data-open') === 'true') {
      if (e.key === 'Escape') lbClose();
      else if (e.key === 'ArrowLeft') lbShow(lbIndex - 1);
      else if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
      else if (e.key === 'Tab') {
        var f = $$('button', lb);
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    } else if (e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') {
      setDrawer(false);
    }
  });

  var sx = 0;
  lb.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });

  /* ================= card tilt (CSS 3D, desktop only) ================= */
  if (fine && !reduceMotion) {
    $$('.tilt').forEach(function (host) {
      var card = $('.card', host);
      host.addEventListener('pointermove', function (e) {
        var r = host.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'translate(2px,-6px) rotateX(' + (-py * 2.5) + 'deg) rotateY(' + (px * 2.5) + 'deg)';
      });
      host.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  /* ================= form ================= */
  var form = $('#enquiry');
  var BD_PHONE = /^(?:\+?880|0)1[3-9]\d{8}$/;
  function bad(field, isBad) { field.closest('.field').classList.toggle('is-bad', isBad); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#f-name'), phone = $('#f-phone'), dest = $('#f-dest');
    bad(name, name.value.trim().length < 2);
    bad(phone, !BD_PHONE.test(phone.value.replace(/[\s-]/g, '')));
    bad(dest, dest.value === '');
    var firstBad = form.querySelector('.field.is-bad input, .field.is-bad select');
    if (firstBad) {
      firstBad.focus();
      firstBad.setAttribute('aria-invalid', 'true');
      return;
    }
    $('#formOk').setAttribute('data-show', 'true');
    form.reset();
    $('#formOk').scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  $$('#enquiry input, #enquiry select, #enquiry textarea').forEach(function (el) {
    el.addEventListener('input', function () { bad(el, false); el.removeAttribute('aria-invalid'); });
  });

  /* ================================================================
     THE JOURNEY - scroll drives the flight; the flight drives the DOM
     ================================================================ */
  var journey = $('.journey');
  var stage = $('#stage');
  var canvas = $('#journeyCanvas');
  var wp = $('#wp'), wpName = $('#wpName'), wpSub = $('#wpSub');
  var flightbar = $('#flightbar');
  var scene = null;

  function journeyProgress() {
    var r = journey.getBoundingClientRect();
    var total = journey.offsetHeight - stage.offsetHeight;
    if (total <= 0) return 0;
    return clamp(-r.top / total, 0, 1);
  }
  function updateJourney() {
    var p = journeyProgress();
    flightbar.style.setProperty('--p', p);
    if (scene) scene.setProgress(p);
  }

  function onWaypoint(id) {
    $$('.dest[data-fly]').forEach(function (b) {
      b.classList.toggle('is-live', id != null && b.getAttribute('data-fly') === id);
    });
    if (!id || !scene) { wp.setAttribute('data-on', 'false'); return; }
    var w = scene.waypoints.filter(function (x) { return x.id === id; })[0];
    if (!w) return;
    wpName.textContent = w.label;
    wpSub.textContent = w.sub;
    wp.setAttribute('data-on', 'true');
  }

  // Destination buttons fly the camera. They work as plain links when 3D is off.
  $$('.dest[data-fly]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-fly');
      var go = b.getAttribute('data-go');
      if (scene && scene.flyTo(id)) {
        $$('.dest[data-fly]').forEach(function (o) { o.setAttribute('aria-current', String(o === b)); });
        if (!desktop.matches) {
          // on mobile the stage is pinned under the header; bring it fully into
          // view rather than scrolling the button out of reach
          scrollToY(window.scrollY + stage.getBoundingClientRect().top - chromeH() + 1, null);
        }
      } else if (go) {
        scrollToId(go);
      }
    });
  });

  canvas.addEventListener('te:contextlost', function () {
    journey.classList.remove('is-live');   // the photograph takes over, never a blank box
    wp.setAttribute('data-on', 'false');
    scene = null;
  });

  function boot() {
    if (scene) return;
    Promise.all([import('./three.brand.js'), import('./scene.js')])
      .then(function (mods) {
        var tier = mods[0].detectTier();
        if (tier === 'off') return;
        scene = mods[1].createJourneyScene({
          canvas: canvas,
          tierName: tier,
          onReady: function () { journey.classList.add('is-live'); updateJourney(); },
          onWaypoint: onWaypoint,
        });
        if (scene && location.search.indexOf('verify') > -1) console.log('[TE] brand colour', scene.verify());
      })
      .catch(function () { /* the photograph is already the fallback */ });
  }

  if ('IntersectionObserver' in window) {
    var bootIO = new IntersectionObserver(function (entries, obs) {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      if ('requestIdleCallback' in window) requestIdleCallback(boot, { timeout: 1600 });
      else setTimeout(boot, 400);
    }, { rootMargin: '200px' });
    bootIO.observe(canvas);
  }

  mqReduce.addEventListener('change', function (e) {
    reduceMotion = e.matches;
    if (reduceMotion && scene) { scene.dispose(); scene = null; journey.classList.remove('is-live'); }
  });

  window.addEventListener('pagehide', function () { if (scene) { scene.dispose(); scene = null; } });

  onScroll();
})();
