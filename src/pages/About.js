import { useEffect, useRef, useState } from 'react';
import '../App.css';

// ── Animated canvas background ────────────────────────────────────
function AboutCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, raf;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();

    // Floating orbs
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 140 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      hue: i % 2 === 0 ? 'maroon' : 'gold',
      alpha: 0.04 + Math.random() * 0.05,
    }));

    // Tiny floating particles
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.1 + 0.3,
      alpha: 0.15 + Math.random() * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Soft radial orbs
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        const col = o.hue === 'maroon'
          ? `rgba(107,26,26,${o.alpha})`
          : `rgba(201,168,76,${o.alpha * 0.6})`;
        grad.addColorStop(0, col);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Particles + connections
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(107,26,26,${0.1 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="about-canvas" />;
}

let jpcsLogo;
try { jpcsLogo = require('../jpcs-logo.png'); } catch { jpcsLogo = null; }

// Partner logos — drop files into src/logos/ and update img below
const partnerLogos = [
  { name: 'NYC CORP',   img: require('../logos/nyc-corp.png') },
  { name: 'QCYDO',     img: require('../logos/qcydo.png') },
  { name: 'BSCS',      img: require('../logos/bscs.png') },
  { name: 'CCS',       img: require('../logos/ccs.png') },
  { name: 'PCS',       img: require('../logos/jpcs.jpg') },
  { name: 'QCU',       img: require('../logos/qcu.png') },
];

// ── Animated counter ──────────────────────────────────────────────
function animateCount(target, duration, delay, setValue) {
  setTimeout(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 30));
    const tick = () => {
      start += step;
      if (start >= target) { setValue(target); return; }
      setValue(start); setTimeout(tick, 30);
    };
    tick();
  }, delay);
}

function useStats(targets, duration = 1400) {
  const ref = useRef(null);
  const [values, setValues] = useState(targets.map(() => 0));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      targets.forEach((target, i) => {
        animateCount(target, duration, i * 100, (v) =>
          setValues(prev => { const next = [...prev]; next[i] = v; return next; })
        );
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return { values, ref };
}

// ── Marquee ───────────────────────────────────────────────────────
function LogoMarquee() {
  // Quadruple the items so the track is always wider than the viewport
  const items = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];
  return (
    <section className="marquee-section">
      <div className="marquee-header">
        <span className="marquee-header-line" />
        <span className="marquee-header-text">RECOGNIZED &amp; AFFILIATED WITH</span>
        <span className="marquee-header-line" />
      </div>
      <div className="marquee-track-wrap">
        <div className="marquee-track">
          {items.map((p, i) => (
            <div className="marquee-item" key={i}>
              {p.img
                ? <img src={p.img} alt={p.name} className="marquee-logo-img" />
                : <div className="marquee-logo-placeholder"><span className="marquee-logo-name">{p.name}</span></div>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Principles data ───────────────────────────────────────────────
const principles = [
  {
    num: '01', title: 'Innovation',
    body: 'We foster a culture of experimentation and creative problem-solving, encouraging members to explore new technologies and methodologies.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  },
  {
    num: '02', title: 'Integrity',
    body: 'We uphold the highest standards of ethics and honesty in all academic and professional pursuits, ensuring transparency and accountability.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    num: '03', title: 'Excellence',
    body: 'We strive for continuous improvement in technical skills and organizational processes, setting benchmarks for student excellence.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  },
  {
    num: '04', title: 'Collaboration',
    body: 'Collective knowledge is our greatest asset. We foster an environment where members learn from each other\'s strengths.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    num: '05', title: 'Service',
    body: 'We are committed to serving the community through technology, providing solutions and resources that benefit the greater good.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  },
];

// ── Objectives data ───────────────────────────────────────────────
const objectives = [
  {
    title: 'Maintain a Safe Environment',
    body: 'Protect the well-being of the community by strictly prohibiting bullying, harassment, or any form of physical and mental violence.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  },
  {
    title: 'Promote Professional Conduct',
    body: 'Require members to fulfill their roles with dedication while maintaining a culture of mutual respect and collaboration.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  },
  {
    title: 'Encourage Active Participation',
    body: 'Ensure all members are engaged and involved in meetings, workshops, and events organized by the chapter.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: 'Uphold Organizational Integrity',
    body: 'Direct all efforts toward defending and embodying the principles and regulations in the Constitution and By-Laws.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  },
];

// ── Main component ────────────────────────────────────────────────
function About() {
  const { values, ref } = useStats([50, 6, 9]);

  return (
    <div className="page-wrapper about-page-wrapper">

      {/* ── Global canvas bg ── */}
      <AboutCanvas />

      {/* ── Decorative glows ── */}
      <div className="about-glow about-glow-1" />
      <div className="about-glow about-glow-2" />
      <div className="about-glow about-glow-3" />

      {/* ── Diagonal light sweep ── */}
      <div className="about-sweep" />

      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-eyebrow">
            <span className="page-hero-eyebrow-dot" /> JPCS – QCU CHAPTER
          </div>
          <h1 className="page-hero-title">
            ABOUT OUR <span className="page-hero-gold">CHAPTER</span>
          </h1>
          <p className="page-hero-sub">
            The Junior Philippine Computer Society - QCU Chapter supports Computer Science
            students by making learning enjoyable and leveraging JPCS connections to foster
            growth and skill development.
          </p>
        </div>
      </section>

      {/* ── Vision / Mission / Stats ── */}
      <section className="about" id="about">
        <div className="about-container">

          <div className="about-cards reveal">
            <div className="about-card">
              <div className="about-card-bg-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="about-card-header">
                <span className="about-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </span>
                <h3 className="about-card-title">OUR VISION</h3>
              </div>
              <p className="about-card-text">
                To be recognized as a leading student organization for technical growth by committing
                to excellence and innovation, helping members become skilled professionals who create
                a positive impact through technology.
              </p>
              <div className="about-card-line" />
            </div>

            <div className="about-card">
              <div className="about-card-bg-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2L8 8H4l4 4-1.5 5.5L12 15l5.5 2.5L16 12l4-4h-4L12 2z"/>
                </svg>
              </div>
              <div className="about-card-header">
                <span className="about-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M12 2L8 8H4l4 4-1.5 5.5L12 15l5.5 2.5L16 12l4-4h-4L12 2z"/>
                  </svg>
                </span>
                <h3 className="about-card-title">OUR MISSION</h3>
              </div>
              <p className="about-card-text">
                To provide quality programs and industry-based collaborations to develop technical
                expertise, support professional growth, and build a collaborative community committed
                to driving progress and making a positive impact on society.
              </p>
              <div className="about-card-line" />
            </div>
          </div>

          <div className="about-stats reveal" ref={ref}>
            <div className="about-stat">
              <div className="about-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="about-stat-number">{values[0]}+</div>
              <div className="about-stat-label">MEMBERS ACTIVE</div>
              <div className="about-stat-desc">Real students. Real code.</div>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <div className="about-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  <polyline points="9 16 11 18 15 14"/>
                </svg>
              </div>
              <div className="about-stat-number">{values[1]}+</div>
              <div className="about-stat-label">ANNUAL EVENTS</div>
              <div className="about-stat-desc">Hackathons, webinars &amp; mixers.</div>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <div className="about-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                  <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
              </div>
              <div className="about-stat-number">{values[2]}+</div>
              <div className="about-stat-label">JOINED EVENTS YEARLY</div>
              <div className="about-stat-desc">Competitions, talks &amp; collaborations.</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── History ── */}
      <section className="about-history" id="history">
        <div className="about-history-inner reveal">
          <div className="about-history-logo">
            {jpcsLogo
              ? <img src={jpcsLogo} alt="JPCS" className="about-history-img" />
              : <div className="about-history-fallback"><span>JPCS</span></div>
            }
          </div>
          <div className="about-history-text">
            <h3 className="about-history-heading">
              <span className="about-history-icon">↺</span> Our History
            </h3>
            <p className="about-history-body">
              Founded on the principles of innovation and community, the Junior Philippine Computer
              Society – QCU Chapter began as a small assembly of passionate tech enthusiasts. Over
              the years it has grown into a formidable organization, recognized for its commitment
              to academic excellence and professional development.
            </p>
            <p className="about-history-body">
              Through rigorous workshops, expansive networking events, and community-driven projects,
              JPCS-QCU has continually adapted to the digital landscape, ensuring its members are not
              just passive learners, but active builders of the future.
            </p>
          </div>
        </div>
      </section>

      {/* ── Partner logos marquee ── */}
      <LogoMarquee />

      {/* ── Guiding Principles ── */}
      <section className="principles-section" id="principles">
        <div className="principles-container">
          <div className="principles-header reveal">
            <div className="principles-label">PRINCIPLES</div>
            <h2 className="principles-heading">
              Guiding Principles of the JPCS QCU Chapter
            </h2>
          </div>
          <div className="principles-cards">
            {principles.map((p, i) => (
              <div className="principle-card reveal" key={i} style={{ animationDelay: `${i * 0.08}s`, transitionDelay: `${i * 0.08}s` }}>
                <div className="principle-num">{p.num}</div>
                <div className="principle-icon-wrap">{p.icon}</div>
                <h3 className="principle-title">{p.title}</h3>
                <p className="principle-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Objectives ── */}
      <section className="objectives-section" id="objectives">
        <div className="objectives-container">
          <div className="objectives-header reveal">
            <div className="objectives-label">OBJECTIVES</div>
            <h2 className="objectives-heading">
              The JPCS QCU Chapter shall focus on these goals
            </h2>
          </div>
          <div className="objectives-cards">
            {objectives.map((o, i) => (
              <div className="objective-card reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="objective-num">0{i + 1}</div>
                <div className="objective-icon-wrap">{o.icon}</div>
                <h3 className="objective-title">{o.title}</h3>
                <p className="objective-body">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
