/* Trip Express BD - page behaviour.
   Pure DOM interaction: frosted drawer, full-bleed hero slider, interactive
   route map & timeline, smooth anchor scroll, 2-col responsive gallery + lightbox. */
(function () {
  'use strict';

  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduceMotion = mqReduce.matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var desktop = window.matchMedia('(min-width: 1040px)');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  var yrEl = $('#yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  /* ================= smooth scroll ================= */
  function chromeH() {
    return (hdr && hdr.offsetHeight) || 64;
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

    var dur = clamp(320 + Math.abs(dist) * 0.32, 380, 980);
    var t0 = 0;
    var interrupted = false;
    var onWheel = function () { interrupted = true; };
    var release = function () {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onWheel);
    };
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
    if (drawer && drawer.getAttribute('data-open') === 'true') setDrawer(false);
    scrollToId(id);
    history.replaceState(null, '', id);
  });

  /* ================= full-bleed hero photo slider ================= */
  var sliderApi = (function initHeroSlider() {
    var root = $('#heroSlider');
    if (!root) return null;
    var slides = $$('.hero-slide', root);
    var dots = $$('.hero-slider__dot', root);
    var tagEl = $('#slideTag');
    var titleEl = $('#slideTitle');
    var prevBtn = $('#slidePrev');
    var nextBtn = $('#slideNext');
    if (!slides.length) return null;

    var idx = 0;
    var timer = 0;

    function render(nextIndex) {
      idx = (nextIndex + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var on = i === idx;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
        if (on) {
          var t = s.querySelector('.hero-slide__tag');
          var h = s.querySelector('.hero-slide__cap strong');
          if (tagEl && t) tagEl.textContent = t.textContent;
          if (titleEl && h) titleEl.textContent = h.textContent;
        }
      });
      dots.forEach(function (d, i) {
        var on = i === idx;
        d.classList.toggle('is-active', on);
        d.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }

    function stop() { if (timer) { clearInterval(timer); timer = 0; } }
    function start() {
      stop();
      if (reduceMotion) return;
      timer = setInterval(function () { render(idx + 1); }, 5500);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { render(idx - 1); start(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { render(idx + 1); start(); });
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        var to = parseInt(d.getAttribute('data-to'), 10);
        if (!isNaN(to)) { render(to); start(); }
      });
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); render(idx - 1); start(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); render(idx + 1); start(); }
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    var sx = 0;
    root.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].clientX; stop(); }, { passive: true });
    root.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) render(idx + (dx < 0 ? 1 : -1));
      start();
    }, { passive: true });

    render(0);
    start();

    return {
      go: function (n) { if (!isNaN(n)) { render(n); start(); } },
      stop: stop
    };
  })();

  /* ================= interactive route map & timeline ================= */
  (function initRouteHub() {
    var hub = $('#routeHub');
    if (!hub) return;

    var ROUTES = {
      chattogram: {
        title: 'All 8 signature destinations',
        mode: 'Chattogram Hub · Origin',
        areas: '1301, Mosjid Goli, Dui Number Gate · All overland coaches & departure desks',
        href: '#tours',
        cta: 'Explore Tours'
      },
      meghalaya: {
        title: 'Meghalaya & Dawki Corridor',
        mode: 'By Road · 4 Days / 3 Nights',
        areas: 'Chattogram -> Tamabil / Dawki Land Port -> Umngot River -> Shillong -> Cherrapunji',
        href: '#tours',
        cta: 'View Package',
        slide: 0
      },
      nepal: {
        title: 'Explore Nepal Corridor',
        mode: 'By Air · 5 Days / 4 Nights · ৳58,500',
        areas: 'Dhaka Flight -> Kathmandu -> Nagarkot Sunrise -> Pokhara -> Sarangkot',
        href: '#included',
        cta: 'See Inclusions',
        slide: 1
      },
      kashmir: {
        title: 'Kashmir by Road · Season 5',
        mode: 'Overland · 11 Nights · ৳35,000',
        areas: 'Chattogram -> Kolkata -> Jammu -> Srinagar Valley (Flat 5-color route illustration)',
        href: '#tours',
        cta: 'See Kashmir Card'
      },
      sikkim: {
        title: 'Sikkim & Darjeeling Highlands',
        mode: 'Overland · Mega Group Departure',
        areas: 'Siliguri -> Gangtok -> North Sikkim -> Darjeeling Hills & Tea Gardens',
        href: '#contact',
        cta: 'Request Dates',
        slide: 3
      },
      maldives: {
        title: 'Maldives & Sri Lanka Circuit',
        mode: 'By Air · 7 Days',
        areas: 'Dhaka -> Colombo -> Kandy -> Male Island Group Departure',
        href: '#contact',
        cta: 'Enquire Now'
      }
    };

    var pins = $$('.map-pin', hub);
    var stops = $$('.route-stop', hub);
    var arcs = $$('.route-arc', hub);
    var titleEl = $('#routeFocusTitle');
    var modeEl = $('#routeMode');
    var areasEl = $('#routeAreas');
    var ctaEl = $('#routeCta');

    function selectStop(key) {
      var info = ROUTES[key];
      if (!info) return;

      pins.forEach(function (p) {
        p.classList.toggle('is-active', p.getAttribute('data-stop') === key);
      });
      stops.forEach(function (s) {
        s.classList.toggle('is-active', s.getAttribute('data-stop') === key);
      });
      arcs.forEach(function (a) {
        var r = a.getAttribute('data-route');
        a.classList.toggle('is-lit', key === 'chattogram' || r === key);
      });

      if (titleEl) titleEl.textContent = info.title;
      if (modeEl) modeEl.textContent = info.mode;
      if (areasEl) areasEl.textContent = info.areas;
      if (ctaEl) {
        ctaEl.setAttribute('href', info.href);
        ctaEl.textContent = info.cta;
      }
      if (typeof info.slide === 'number' && sliderApi) {
        sliderApi.go(info.slide);
      }
    }

    pins.forEach(function (p) {
      p.addEventListener('click', function () {
        selectStop(p.getAttribute('data-stop'));
      });
    });
    stops.forEach(function (s) {
      var btn = $('.route-stop__btn', s);
      if (btn) {
        btn.addEventListener('click', function () {
          selectStop(s.getAttribute('data-stop'));
        });
      }
    });

    selectStop('chattogram');
  })();

  /* ================= header, progress, fab ================= */
  var hdr = $('#hdr');
  var progress = $('#progress');
  var fab = $('#fab');
  var fabPulsed = false;
  var fabBlocked = false;
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY;
      if (hdr) hdr.classList.toggle('is-stuck', y > 8);

      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.setProperty('--p', max > 0 ? clamp(y / max, 0, 1) : 0);

      if (fab) {
        var pastHero = y > window.innerHeight * 0.72;
        fab.setAttribute('data-show', pastHero ? 'true' : 'false');
        if (pastHero && !fabPulsed) {
          fabPulsed = true;
          fab.setAttribute('data-expanded', 'true');
          setTimeout(function () { fab.setAttribute('data-expanded', 'false'); }, 4200);
        }
      }

      galleryDrift();
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  if ('IntersectionObserver' in window && fab) {
    var fabIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.target.id === 'contact') fabBlocked = e.isIntersecting; });
      fab.setAttribute('data-hide', fabBlocked ? 'true' : 'false');
    }, { rootMargin: '-10% 0px -10% 0px' });
    var contactEl = $('#contact');
    if (contactEl) fabIO.observe(contactEl);
  }

  /* ================= drawer ================= */
  var drawer = $('#drawer');
  var drawerPn = drawer ? $('.drawer__pn', drawer) : null;
  var menuBtn = $('#menuBtn');
  var lastFocus = null;

  function setDrawer(open) {
    if (!drawer || !menuBtn) return;
    drawer.setAttribute('data-open', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      lastFocus = document.activeElement;
      if (drawerPn) {
        drawerPn.scrollTop = 0;
        drawerPn.focus({ preventScroll: true });
      }
      markHere();
    } else if (lastFocus && lastFocus.offsetParent !== null) {
      lastFocus.focus();
    }
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setDrawer(true); });
  var closeBtn = $('#drawerClose');
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  var bdBtn = $('#drawerBd');
  if (bdBtn) bdBtn.addEventListener('click', function () { setDrawer(false); });

  if (drawerPn) {
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
  }

  if (drawer) {
    drawer.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = $$('a[href], button:not([tabindex="-1"])', drawer).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    });
  }

  /* ================= scroll spy ================= */
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
    markHere();
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

  /* ================= gallery: 2 columns mobile, 3-4 desktop ========= */
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
    return w >= 1280 ? 4 : w >= 1040 ? 3 : 2;
  }
  function buildCols() {
    if (!gal) return;
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

  var focusIO = (!fine && 'IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target.classList.toggle('is-focus', e.isIntersecting); });
      }, { rootMargin: '-34% 0px -34% 0px' })
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
        + ' sizes="(min-width:1280px) 330px, (min-width:1040px) 380px, 46vw"'
        + ' width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async" alt="' + p.alt + '">'
        + '<span class="gal__cap"><svg class="ic" aria-hidden="true">'
        + '<use href="assets/icons.svg#i-pin"></use></svg>' + p.trip + '</span>';
      col.appendChild(b);
      if (itemIO) itemIO.observe(b); else b.classList.add('is-in');
      if (focusIO) focusIO.observe(b);
      shown++; made++;
    }
    if (shown >= PHOTOS.length && galEnd) {
      galEnd.hidden = false;
      if (loadIO) loadIO.disconnect();
    }
  }

  var loadIO = ('IntersectionObserver' in window && sentinel)
    ? new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) append(BATCH);
      }, { rootMargin: '600px 0px' })
    : null;

  buildCols();
  if (loadIO && sentinel) loadIO.observe(sentinel);
  else if (gal) append(PHOTOS.length);

  var driftOn = fine && !reduceMotion && desktop.matches;
  var galleryVisible = false;
  if ('IntersectionObserver' in window && gal) {
    new IntersectionObserver(function (e) { galleryVisible = e[0].isIntersecting; }, { rootMargin: '200px' })
      .observe(gal);
  }
  function galleryDrift() {
    if (!driftOn || !galleryVisible || !gal) return;
    var r = gal.getBoundingClientRect();
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
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  }
  function lbClose() {
    lb.setAttribute('data-open', 'false');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    lbImg.removeAttribute('src');
    if (lbOpener) lbOpener.focus();
  }
  if (gal) {
    gal.addEventListener('click', function (e) {
      var btn = e.target.closest('.gal__item');
      if (btn) lbOpen(parseInt(btn.getAttribute('data-i'), 10), btn);
    });
  }
  if (lb) {
    $('#lbClose').addEventListener('click', lbClose);
    $('#lbPrev').addEventListener('click', function () { lbShow(lbIndex - 1); });
    $('#lbNext').addEventListener('click', function () { lbShow(lbIndex + 1); });
    $('.lb__stage').addEventListener('click', function (e) { if (e.target === e.currentTarget) lbClose(); });

    var sx = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  document.addEventListener('keydown', function (e) {
    if (lb && lb.getAttribute('data-open') === 'true') {
      if (e.key === 'Escape') lbClose();
      else if (e.key === 'ArrowLeft') lbShow(lbIndex - 1);
      else if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
      else if (e.key === 'Tab') {
        var f = $$('button', lb);
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    } else if (drawer && e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') {
      setDrawer(false);
    }
  });

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

  if (form) {
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
      var okBox = $('#formOk');
      var okTxt = $('#formOkText');
      if (okTxt) {
        var msg = encodeURIComponent('Tour Enquiry: ' + dest.value + ' | Name: ' + name.value.trim() + ' | Phone: ' + phone.value.trim());
        okTxt.innerHTML = 'Validated locally (static preview - no backend server). <a href="https://wa.me/8801838754207?text=' + msg + '">Tap to send on WhatsApp</a> or call <span class="te-num">01838-754207</span>.';
      }
      okBox.setAttribute('data-show', 'true');
      form.reset();
      okBox.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    $$('#enquiry input, #enquiry select, #enquiry textarea').forEach(function (el) {
      el.addEventListener('input', function () { bad(el, false); el.removeAttribute('aria-invalid'); });
    });
  }

  mqReduce.addEventListener('change', function (e) {
    reduceMotion = e.matches;
    if (reduceMotion && sliderApi) sliderApi.stop();
  });

  onScroll();
})();
