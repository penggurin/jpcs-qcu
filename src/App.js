import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './App.css';

import About    from './pages/About';
import Events   from './pages/Events';
import Officers from './pages/Officers';
import Contact  from './pages/Contact';
import Footer   from './components/Footer';

import ev1  from './events-showcase/event-1.jpg';
import ev2  from './events-showcase/event-2.jpg';
import ev3  from './events-showcase/event-3.jpg';
import ev4  from './events-showcase/event-4.jpg';
import ev5  from './events-showcase/event-5.jpg';
import ev6  from './events-showcase/event-6.jpg';
import ev7  from './events-showcase/event-7.jpg';
import ev8  from './events-showcase/event-8.jpg';
import ev9  from './events-showcase/event-9.jpg';
import ev10 from './events-showcase/event-10.jpg';
import ev11 from './events-showcase/event-11.jpg';
import ev12 from './events-showcase/event-12.jpg';
import ev13 from './events-showcase/event-13.jpg';
import ev14 from './events-showcase/event-14.jpg';
import ev15 from './events-showcase/event-15.jpg';
import ev16 from './events-showcase/event-16.jpg';
import ev17 from './events-showcase/event-17.jpg';
import ev18 from './events-showcase/event-18.jpg';
import ev19 from './events-showcase/event-19.jpg';
import ev20 from './events-showcase/event-20.jpg';
import ev21 from './events-showcase/event-21.jpg';
import ev22 from './events-showcase/event-22.jpg';
import ev23 from './events-showcase/event-23.jpg';
import ev24 from './events-showcase/event-24.jpg';
import ev25 from './events-showcase/event-25.jpg';
import ev26 from './events-showcase/event-26.jpg';
import ev27 from './events-showcase/event-27.jpg';
import ev28 from './events-showcase/event-28.jpg';
import ev29 from './events-showcase/event-29.jpg';
import ev30 from './events-showcase/event-30.jpg';
import ev31 from './events-showcase/event-31.jpg';
import ev32 from './events-showcase/event-32.jpg';

let jpcsLogo;
try { jpcsLogo = require('./jpcs-logo.png'); } catch { jpcsLogo = null; }

// ── Scroll to top on route change ───────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ── Scroll-reveal hook ───────────────────────────────────────────────
export function useReveal() {
  const location = useLocation();
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);
}

// ── Navbar ──────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const location = useLocation();

  // close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Home',     to: '/'         },
    { label: 'About',    to: '/about'    },
    { label: 'Events',   to: '/events'   },
    { label: 'Officers', to: '/officers' },
    { label: 'Contact',  to: '/contact'  },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <NavLink to="/" className="nav-logo">
          <div className="nav-logo-img-wrap">
            {jpcsLogo ? (
              <img src={jpcsLogo} alt="JPCS Logo" className="nav-logo-img" />
            ) : (
              <div className="nav-logo-placeholder">
                <div className="logo-ring" />
                <span className="logo-inner">J</span>
              </div>
            )}
          </div>
          <div className="nav-logo-text">
            <span className="logo-main">Junior Philippine Computer Society</span>
            <span className="logo-sub">Quezon City University – Chapter</span>
          </div>
        </NavLink>

        {/* Desktop nav pill */}
        <div className="nav-right nav-right-desktop">
          <div className="nav-pill">
            <ul className="nav-links">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''} end={to === '/'}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <a href="https://forms.gle/SkoTu8CwGFeBSivU8" target="_blank" rel="noreferrer" className="btn-join">
              Join Us
            </a>
          </div>
        </div>

        {/* Mobile hamburger button */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className={`nav-drawer-backdrop ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`} role="dialog" aria-label="Navigation menu">
        <div className="nav-drawer-header">
          <div className="nav-drawer-logo">
            {jpcsLogo
              ? <img src={jpcsLogo} alt="JPCS" className="nav-drawer-logo-img" />
              : <span className="logo-inner" style={{ fontSize: 18, color: 'var(--gold)' }}>J</span>
            }
            <div>
              <div className="logo-main" style={{ fontSize: 12 }}>JPCS – QCU Chapter</div>
              <div className="logo-sub"  style={{ fontSize: 10 }}>Junior Philippine Computer Society</div>
            </div>
          </div>
          <button className="nav-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <ul className="nav-drawer-links">
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => `nav-drawer-link ${isActive ? 'active' : ''}`}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href="https://forms.gle/SkoTu8CwGFeBSivU8"
          target="_blank"
          rel="noreferrer"
          className="btn-join nav-drawer-join"
          onClick={() => setMenuOpen(false)}
        >
          Join Us
        </a>
      </div>
    </>
  );
}

// ── Hero section ─────────────────────────────────────────────────────
function HeroSection() {
  const canvasRef = useRef(null);
  const [blink, setBlink] = useState(true);
  // intro phases: 'bracket' → 'expand' → 'reveal' → 'done'
  // Start as 'done' if already seen this session (avoids flash on SPA navigation)
  const [intro, setIntro] = useState(
    () => sessionStorage.getItem('jpcs_intro_seen') ? 'done' : 'bracket'
  );
  const location = useLocation();

  // PCB-style circuit board background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf;

    // Colours — maroon → red-orange → amber
    const C = ['rgba(180,30,30,', 'rgba(200,60,20,', 'rgba(190,100,20,'];
    const BEND = 8;   // corner radius (px)

    // ── helpers ──────────────────────────────────────────────────────
    // Convert fractional (fx,fy) in [0,1] to canvas px, snapped to grid G
    const G = 32;
    const px = (fx) => Math.round((fx * W) / G) * G;
    const py = (fy) => Math.round((fy * H) / G) * G;

    // Draw one polyline with rounded 90° bends
    const drawTrace = (pts, color, alpha = 0.28) => {
      if (pts.length < 2) return;
      ctx.beginPath();
      ctx.lineWidth   = 1.5;
      ctx.strokeStyle = `${color}${alpha})`;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        if (pts[i + 1]) ctx.arcTo(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y, BEND);
        else            ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();
    };

    // Small pad at a point
    const drawPad = (x, y, color) => {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${color}0.7)`;
      ctx.fill();
    };

    // Position along a polyline at t∈[0,1]
    const tracePos = (pts, t) => {
      let total = 0;
      const segs = pts.slice(0, -1).map((p, i) => {
        const d = Math.hypot(pts[i+1].x - p.x, pts[i+1].y - p.y);
        total += d;
        return d;
      });
      let rem = t * total;
      for (let i = 0; i < segs.length; i++) {
        if (rem <= segs[i]) {
          const f = segs[i] > 0 ? rem / segs[i] : 0;
          return { x: pts[i].x + (pts[i+1].x - pts[i].x) * f,
                   y: pts[i].y + (pts[i+1].y - pts[i].y) * f };
        }
        rem -= segs[i];
      }
      return pts[pts.length - 1];
    };

    // ── Wire definitions — built once per resize ─────────────────────
    // Each wire: { pts: [{x,y}…], color, pulse:{t,speed,dir} }
    let wires = [];

    const build = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      wires = [];

      // Helper: add a fan cluster
      // origin (ox,oy) in px; lines: array of waypoint arrays in px offsets from origin
      const fan = (ox, oy, lines, colorIdx = 0) => {
        lines.forEach((pts, k) => {
          const color = C[(colorIdx + k) % C.length];
          wires.push({
            pts: pts.map(([dx, dy]) => ({ x: ox + dx, y: oy + dy })),
            color,
            pulse: { t: Math.random(), speed: 0.0008 + Math.random() * 0.001, dir: 1 },
          });
        });
      };

      // ── TOP-LEFT cluster — vertical stem → right fan ──────────────
      fan(px(0.06), py(0.10), [
        [[0,0],[0, 80],[160, 80]],
        [[0,0],[0, 96],[192, 96]],
        [[0,0],[0,112],[224,112]],
        [[0,0],[0,128],[256,128]],
        [[0,0],[0,144],[288,144]],
      ], 0);

      // ── TOP-LEFT secondary — short downward traces ────────────────
      fan(px(0.06), py(0.10), [
        [[0,0],[0,-64]],
        [[8,0],[8,-96]],
        [[16,0],[16,-80]],
      ], 1);

      // ── TOP-RIGHT cluster — horizontal stem → down fan ────────────
      fan(px(0.75), py(0.08), [
        [[0,0],[-80, 0],[-80,128]],
        [[0,0],[-96, 0],[-96,160]],
        [[0,0],[-112,0],[-112,192]],
        [[0,0],[-128,0],[-128,224]],
      ], 2);

      // ── BOTTOM-LEFT cluster — up then right ───────────────────────
      fan(px(0.08), py(0.82), [
        [[0,0],[0,-96],[128,-96]],
        [[0,0],[0,-80],[160,-80]],
        [[0,0],[0,-64],[192,-64]],
      ], 0);

      // ── BOTTOM-RIGHT cluster — left fan ───────────────────────────
      fan(px(0.88), py(0.80), [
        [[0,0],[0,-80],[-128,-80]],
        [[0,0],[0,-96],[-160,-96]],
        [[0,0],[0,-112],[-192,-112]],
        [[0,0],[0,-128],[-224,-128]],
      ], 1);

      // ── CENTER-LEFT — Z-shape long trace ─────────────────────────
      fan(px(0.04), py(0.45), [
        [[0,0],[96,0],[96,96],[256,96]],
        [[0,8],[88,8],[88,88],[256,88]],
        [[0,16],[80,16],[80,80],[256,80]],
      ], 2);

      // ── CENTER-RIGHT — reverse Z ──────────────────────────────────
      fan(px(0.96), py(0.50), [
        [[0,0],[-96,0],[-96,-96],[-256,-96]],
        [[0,8],[-88,8],[-88,-88],[-256,-88]],
        [[0,16],[-80,16],[-80,-80],[-256,-80]],
      ], 0);

      // ── Mid-top lone traces — sparse decoration ───────────────────
      fan(px(0.45), py(0.04), [
        [[0,0],[0, 64],[ 96, 64],[ 96,128]],
        [[8,0],[8, 80],[104, 80],[104,160]],
        [[-8,0],[-8,48],[-80,48],[-80,96]],
      ], 1);
    };

    // ── Mobile guard — skip circuit drawing on small screens ─────────
    const MOBILE_BREAKPOINT = 768;
    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    build();

    // ── Render loop ──────────────────────────────────────────────────
    let tick = 0;
    const draw = () => {
      // Stop the loop entirely on mobile — no drawing, no RAF cost
      if (isMobile()) {
        ctx.clearRect(0, 0, W, H);
        return;
      }

      tick++;
      ctx.clearRect(0, 0, W, H);

      // Subtle dot grid
      for (let x = 0; x <= W; x += G) {
        for (let y = 0; y <= H; y += G) {
          ctx.beginPath();
          ctx.arc(x, y, 0.7, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(180,30,30,0.06)';
          ctx.fill();
        }
      }

      wires.forEach(wire => {
        const { pts, color, pulse } = wire;

        // static trace
        drawTrace(pts, color, 0.25);

        // pads at endpoints
        drawPad(pts[0].x, pts[0].y, color);
        drawPad(pts[pts.length-1].x, pts[pts.length-1].y, color);

        // advance pulse
        pulse.t += pulse.speed * pulse.dir;
        if (pulse.t >= 1) { pulse.t = 1; pulse.dir = -1; }
        if (pulse.t <= 0) { pulse.t = 0; pulse.dir =  1; }

        const pos = tracePos(pts, pulse.t);

        // glow
        const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 9);
        grd.addColorStop(0, `${color}0.5)`);
        grd.addColorStop(1, `${color}0)`);
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();

        // bright dot
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${color}1)`; ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    const onResize = () => {
      build();
      // If resizing from mobile → desktop, kick the loop back off
      if (!isMobile()) draw();
    };

    draw();

    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Intro sequence — runs ONLY on a hard page load/refresh, not on SPA navigation.
  // sessionStorage flag is cleared on tab close but persists across in-page navigation.
  useEffect(() => {
    if (location.pathname !== '/') return;

    const SEEN_KEY = 'jpcs_intro_seen';
    const alreadySeen = sessionStorage.getItem(SEEN_KEY);

    if (alreadySeen) {
      // Skip straight to done — no animation
      setIntro('done');
      return;
    }

    // First load this session — play the animation then mark as seen
    sessionStorage.setItem(SEEN_KEY, '1');
    setIntro('bracket');
    const t1 = setTimeout(() => setIntro('expand'),  900);
    const t2 = setTimeout(() => setIntro('reveal'),  1600);
    const t3 = setTimeout(() => setIntro('done'),    2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [location.pathname]);

  return (
    <section className="hero-v2">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Canvas handles the animated circuit background */}

      {/* ── Intro overlay ── */}
      {intro !== 'done' && (
        <div className={`intro-overlay intro-overlay--${intro}`}>
          <div className="intro-bracket-wrap">
            <span className="intro-bracket intro-bracket-left">&lt;</span>
            <span className="intro-bracket-content">
              <h1 className="hero-v2-title" style={{ margin: 0 }}>JPCS - QCU</h1>
            </span>
            <span className="intro-bracket intro-bracket-right">&gt;</span>
          </div>
        </div>
      )}

      {/* Corner HUD brackets */}
      <div className="hud-corner hud-tl" />
      <div className="hud-corner hud-tr" />
      <div className="hud-corner hud-bl" />
      <div className="hud-corner hud-br" />



      {/* Center content */}
      <div className="hero-v2-center">
        <div className="hero-v2-tagline">
          Code Your <span className="hero-v2-tagline-accent">Success</span> 
          <span className={`hero-v2-cursor ${blink ? 'visible' : ''}`}>_</span>
        </div>


        <h1 className="hero-v2-title">JPCS - QCU</h1>

        <div className="hero-v2-sub1">JUNIOR PHILIPPINE COMPUTER SOCIETY</div>
        <div className="hero-v2-sub2">QUEZON CITY UNIVERSITY CHAPTER</div>

        {/* Code bracket decoration */}
        <div className="hero-v2-brackets" aria-hidden="true">
          <span className="hero-v2-bracket-left">&lt;/&gt;</span>
        </div>

        <div className="hero-v2-buttons">
          <a
            href="https://forms.gle/SkoTu8CwGFeBSivU8"
            target="_blank"
            rel="noreferrer"
            className="btn-v2-primary"
          >
            &gt; APPLY TODAY
          </a>
          <NavLink to="/about" className="btn-v2-ghost">
            &gt; LEARN MORE
          </NavLink>
        </div>
      </div>

    </section>
  );
}

// ── Events Showcase images ────────────────────────────────────────────
const showcaseRow1 = [ev1,ev2,ev3,ev4,ev5,ev6,ev7,ev8,ev9,ev10,ev11,ev12,ev13,ev14,ev15,ev16]
  .map((src, i) => ({ id: i + 1, src }));
const showcaseRow2 = [ev17,ev18,ev19,ev20,ev21,ev22,ev23,ev24,ev25,ev26,ev27,ev28,ev29,ev30,ev31,ev32]
  .map((src, i) => ({ id: i + 17, src }));

// ── Events Showcase component ─────────────────────────────────────────
function EventsShowcase() {
  const [hoveredRow, setHoveredRow] = useState(null); // 1 | 2 | null
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const renderTrack = (items, rowNum, direction) => {
    // Duplicate for seamless loop
    const doubled = [...items, ...items];
    return (
      <div
        className={`ev-showcase-track-wrap ev-showcase-track-wrap--${direction}`}
        onMouseEnter={() => setHoveredRow(rowNum)}
        onMouseLeave={() => { setHoveredRow(null); setHoveredIdx(null); }}
      >
        <div
          className={`ev-showcase-track ev-showcase-track--${direction}`}
          style={{ animationPlayState: hoveredRow === rowNum ? 'paused' : 'running' }}
        >
          {doubled.map((item, i) => {
            const realIdx = i % items.length;
            const key = `${rowNum}-${i}`;
            const isHovered = hoveredRow === rowNum && hoveredIdx === realIdx;
            const isDimmed  = hoveredRow === rowNum && hoveredIdx !== null && !isHovered;
            return (
              <div
                key={key}
                className={`ev-showcase-item ${isHovered ? 'ev-showcase-item--active' : ''} ${isDimmed ? 'ev-showcase-item--dimmed' : ''}`}
                onMouseEnter={() => setHoveredIdx(realIdx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {item.src
                  ? <img src={item.src} alt={`Event ${item.id}`} className="ev-showcase-img" draggable="false" />
                  : <div className="ev-showcase-placeholder"><span>EVENT {item.id}</span></div>
                }
                <div className="ev-showcase-item-overlay" />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="ev-showcase-section">
      {/* Section header */}
      <div className="ev-showcase-header">
        <div className="ev-showcase-eyebrow">
          <span className="ev-showcase-eyebrow-dot" /> OUR EVENTS &amp; CAMPAIGNS
        </div>
        <h2 className="ev-showcase-title">
          MOMENTS THAT <span className="text-gold">MATTER</span>
        </h2>
        <p className="ev-showcase-sub">
          From hackathons to workshops — a glimpse of the energy JPCS-QCU brings every year.
        </p>
      </div>

      {/* Marquee rows */}
      <div className="ev-showcase-rows">
        {renderTrack(showcaseRow1, 1, 'left')}
        {renderTrack(showcaseRow2, 2, 'right')}
      </div>

      {/* CTA */}
      <div className="ev-showcase-cta">
        <NavLink to="/events" className="btn-v2-ghost">&gt; VIEW ALL EVENTS</NavLink>
      </div>
    </section>
  );
}

// ── About the Chapter section ────────────────────────────────────────
let eventPhoto1, eventPhoto2, eventPhoto3;
try { eventPhoto1 = require('./events/hosted-2025-2026/synergy-2026/photo.jpg'); } catch { eventPhoto1 = null; }
try { eventPhoto2 = require('./events/hosted-2024-2025/codequest-2025/photo.jpg'); } catch { eventPhoto2 = null; }
try { eventPhoto3 = require('./events/hosted-2025-2026/logic-unlocked/photo.jpg'); } catch { eventPhoto3 = null; }

function AboutChapter() {
  return (
    <section className="home-about">
      {/* Background grid */}
      <div className="home-about-grid-bg" />

      <div className="home-about-inner">

        {/* ── Left: text ── */}
        <div className="home-about-text reveal-left">
          <div className="home-about-eyebrow">ABOUT THE CHAPTER</div>
          <h2 className="home-about-title">
            A COMMUNITY OF<br />INNOVATORS
          </h2>
          <p className="home-about-body">
            The Junior Philippine Computer Society – QCU Chapter is the premier
            student-led technology organization at Quezon City University. We are
            dedicated to nurturing the potential of every CS student, providing
            them with the resources, mentorship, and community needed to excel
            in the digital age.
          </p>

          <div className="home-about-stats">
            <div className="home-about-stat">
              <div className="home-about-stat-num">50+</div>
              <div className="home-about-stat-label">ACTIVE MEMBERS</div>
            </div>
            <div className="home-about-stat-divider" />
            <div className="home-about-stat">
              <div className="home-about-stat-num">10+</div>
              <div className="home-about-stat-label">ANNUAL EVENTS</div>
            </div>
            <div className="home-about-stat-divider" />
            <div className="home-about-stat">
              <div className="home-about-stat-num">2024</div>
              <div className="home-about-stat-label">ESTABLISHED</div>
            </div>
          </div>

          <NavLink to="/about" className="btn-v2-ghost" style={{ marginTop: 8, width: 'fit-content' }}>
            &gt; READ MORE
          </NavLink>
        </div>

        {/* ── Right: digital image collage ── */}
        <div className="home-about-collage reveal-right">

          {/* Scanline overlay on whole collage */}
          <div className="collage-scanlines" />

          {/* Main large image */}
          <div className="collage-main">
            {eventPhoto1
              ? <img src={eventPhoto1} alt="JPCS Event" className="collage-img" />
              : <CollagePlaceholder label="EVENT PHOTO 01" icon="◈" />
            }
            <div className="collage-main-tag">SYNERGY 2026</div>
            <div className="collage-corner collage-corner-tl" />
            <div className="collage-corner collage-corner-br" />
          </div>

          {/* Stack of two smaller images */}
          <div className="collage-stack">
            <div className="collage-small">
              {eventPhoto2
                ? <img src={eventPhoto2} alt="JPCS Event" className="collage-img" />
                : <CollagePlaceholder label="EVENT PHOTO 02" icon="◉" />
              }
              <div className="collage-corner collage-corner-tl" />
              <div className="collage-small-tag">CODEQUEST 2025</div>
            </div>
            <div className="collage-small">
              {eventPhoto3
                ? <img src={eventPhoto3} alt="JPCS Event" className="collage-img" />
                : <CollagePlaceholder label="EVENT PHOTO 03" icon="⬡" />
              }
              <div className="collage-corner collage-corner-tl" />
              <div className="collage-small-tag">LOGIC UNLOCKED</div>
            </div>
          </div>

          {/* Floating HUD badge */}
          <div className="collage-hud-badge">
            <span className="collage-hud-dot" />
            LIVE COMMUNITY
          </div>

        </div>
      </div>
    </section>
  );
}

function CollagePlaceholder({ label, icon }) {
  return (
    <div className="collage-placeholder">
      <div className="collage-placeholder-icon">{icon}</div>
      <div className="collage-placeholder-label">{label}</div>
      <div className="collage-placeholder-hint">drop photo here</div>
    </div>
  );
}

// ── Home ─────────────────────────────────────────────────────────────
function Home() {
  return (
    <>
      <HeroSection />
      <AboutChapter />
      <EventsShowcase />
    </>
  );
}

// ── App shell ────────────────────────────────────────────────────────
// ── Custom cursor ─────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  // ring lags behind with lerp
  const mouse   = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring    = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const raf     = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // dot snaps instantly
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onEnter = (e) => {
      const isClickable = e.target.closest('a, button, [role="button"], input, textarea, select, label');
      ringEl.classList.toggle('cursor-ring--hover', !!isClickable);
    };

    const animate = () => {
      const lerp = 0.12;
      ring.current.x += (mouse.current.x - ring.current.x) * lerp;
      ring.current.y += (mouse.current.y - ring.current.y) * lerp;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef}  className="cursor-ring"  aria-hidden="true" />
      <div ref={dotRef}   className="cursor-dot"   aria-hidden="true" />
    </>
  );
}

function AppShell() {
  useReveal();

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/about"    element={<About />}    />
        <Route path="/events"   element={<Events />}   />
        <Route path="/officers" element={<Officers />} />
        <Route path="/contact"  element={<Contact />}  />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
