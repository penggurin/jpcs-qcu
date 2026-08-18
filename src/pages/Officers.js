import { useEffect, useRef } from 'react';
import '../App.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ── Animated canvas background ────────────────────────────────────
function OfficersCanvas() {
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

    // Drifting orbs
    const orbs = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 120 + Math.random() * 220,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      // alternate maroon shades
      color: i % 2 === 0
        ? `rgba(107,26,26,${0.04 + Math.random() * 0.05})`
        : `rgba(155,38,38,${0.04 + Math.random() * 0.04})`,
    }));

    // Tiny gold-tinted particles
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.0 + 0.3,
      alpha: 0.12 + Math.random() * 0.22,
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
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, o.color);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Particles + lines
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
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(107,26,26,${0.09 * (1 - d / 100)})`;
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

  return <canvas ref={canvasRef} className="officers-canvas" />;
}

// ── Officer data ──────────────────────────────────────────────────
// img:     require('../officers/filename.jpg')
// socials: set URL strings, leave null to hide that icon

// placeholder socials — replace each URL with the real profile link
const PH = {
  fb:       'https://facebook.com',
  ig:       'https://instagram.com',
  github:   'https://github.com',
  linkedin: 'https://linkedin.com',
};

const adviser = [
  {
    name: 'Ms. Mary Jean M. Jayobo',
    role: 'Chapter Adviser',
    img: require('../officers/jayobo.jpg')
  },
  {
    name: 'Mr. Christian B. Escoto',
    role: 'Program Chair',
    img: require('../officers/escoto.jpg')
  },
];

const executives = [
  { name: 'Jay Marc M. Povadora',   role: 'Chapter President',        img: require('../officers/povadora.png'),   socials: {
    fb:       'https://www.facebook.com/share/1ERvwfZFGr/',
    ig:       'https://www.instagram.com/jaymarcccccc?igsh=bzVyaDQzcnZ0aXNt',
    github:   null,                    
    linkedin: 'https://www.linkedin.com/in/jaymarcccccc?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  } },
  { name: 'Aldrin Jazler M. Licup', role: 'Vice President – Internal', img: require('../officers/licup.png'), socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Lujille R. Pojas',       role: 'Vice President – External', img: null, socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Jean Piere R. Roxas',    role: 'Executive Secretary',       img: null, socials: {
    fb:       'https://www.facebook.com/jp.roxas.249867/',
    ig:       'https://www.instagram.com/roxas__jp/',
    github:   'https://github.com/penggurin',                        
    linkedin: 'https://linkedin.com/in/roxas-jean-piere-r-8bb80a385',
  } },
];

const directors = [
  { name: 'Jessa Mae S. Lotilla',       role: 'Director, Documentation & Compliance', img: require('../officers/lotilla.png'), socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Eixer Ram R. Alobba',        role: 'Director, Human Resources',            img: require('../officers/alobba.jpeg'), socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Jhayced Chua',               role: 'Director, Financial Treasury',         img: require('../officers/chuaboy.jpg'), socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Czamaria Marquez',           role: 'Director, Internal Audit',             img: null, socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Beverly Shayne L. Alaan',    role: 'Director, Creative Media',             img: require('../officers/alaan.jpg'), socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Cleo Mel P. Villanueva',     role: 'Director, Marketing & Publicity',      img: require('../officers/villanueva.jpg'), socials: {
    fb:       'https://www.facebook.com/CleoMelV',
    ig:       'https://www.instagram.com/lemoelcxxi/',
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Jeyanne L. Naynes',          role: 'Director, Partnerships & Sponsorships',img: require('../officers/naynes.jpg'), socials: {
    fb:       'https://www.facebook.com/jeyanne.naynes',
    ig:       'https://www.instagram.com/rt.jeaaa?igsh=cG9pMjVsMG45ZXho',
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Prince Rayven G. Francisco', role: 'Director, Logistics & Operations',     img: null, socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
];

const deputies = [
  { name: 'Annette Mikalah Q. Alconaba',       role: 'Deputy Director, Documentation & Compliance', img: null, socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Mary Hae Flordelize M. Sambrano',   role: 'Deputy Director, Human Resources',            img: require('../officers/sambrano.jpg'), socials: {
    fb:       'https://www.facebook.com/share/1Kx1quf8GL/?mibextid=wwXIfr',
    ig:       'https://www.instagram.com/da.hae_x0x0?igsh=MWdibmFqdm05eTJ1ZA%3D%3D&utm_source=qr',
    github:   'https://github.com/Mary-Hae',                        
    linkedin: 'https://www.linkedin.com/in/mary-hae-flordelize-sambrano?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  } },
  { name: 'Reymart A. Rivera',                 role: 'Deputy Director, Financial Treasury',         img: require('../officers/rivera.jpg'), socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Lorraine Chua',                     role: 'Deputy Director, Internal Audit',             img: require('../officers/chuagirl.jpeg'), socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Ana Beatriz T. Bosito',             role: 'Deputy Director, Creative Media',             img: null, socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Elieza Mae Z. Gabion',              role: 'Deputy Director, Marketing & Publicity',      img: null, socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Elisha Marianne S. Valeroso',       role: 'Deputy Director, Partnerships & Sponsorships',img: null, socials: {
    fb:       'https://www.facebook.com/share/1DJWiXdD7n/',
    ig:       null,
    github:   null,                        
    linkedin: null,
  } },
  { name: 'Christian James E. Tormes',         role: 'Deputy Director, Logistics & Operations',     img: require('../officers/tormes.jpg'), socials: {
    fb:       'https://web.facebook.com/chrstn.jeyzmz/',
    ig:       'https://www.instagram.com/chrstn.jeyzmz_/',
    github:   'https://github.com/eirinshan',                        
    linkedin: null,
  }  },
];

const bog = [
  { name: 'Migel Rodrene Vens Papa',    role: 'Board of Governors – 2nd Year', img: require('../officers/papa.jpeg'), socials: {
    fb:       null,
    ig:       null,
    github:   null,                        
    linkedin: null,
  }    },
  { name: 'Jilian Rai R. Tusañeza',   role: 'Board of Governors – 2nd Year', img: require('../officers/tusaneza.jpg'), socials: {
    fb:       'https://www.facebook.com/jiliantusaneza',
    ig:       'https://www.instagram.com/jilianraii/',
    github:   'https://github.com/cyberaii',                        
    linkedin: 'https://linkedin.com/in/jilian-rai-r-tusaneza-0ba5a8358',
  } },
];

// ── Social icon SVGs (brand colours) ─────────────────────────────
const SocialIcons = {
  fb: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  ),
  ig: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f09433"/>
          <stop offset="25%"  stopColor="#e6683c"/>
          <stop offset="50%"  stopColor="#dc2743"/>
          <stop offset="75%"  stopColor="#cc2366"/>
          <stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.196.157 3.545.632 2.198 1.98.85 3.328.156 4.978.072 6.836.014 8.117 0 8.525 0 12c0 3.475.014 3.883.072 5.164.084 1.858.559 3.508 1.907 4.856 1.347 1.347 2.997 1.822 4.855 1.907C8.117 23.986 8.525 24 12 24s3.883-.014 5.164-.072c1.858-.085 3.508-.56 4.856-1.907 1.347-1.348 1.822-2.998 1.907-4.856C23.986 15.883 24 15.475 24 12s-.014-3.883-.072-5.164c-.085-1.858-.56-3.508-1.907-4.856C20.674.632 19.024.157 17.166.072 15.883.014 15.475 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

// ── Silhouette ────────────────────────────────────────────────────
function Silhouette() {
  return (
    <svg className="officer-silhouette" viewBox="0 0 160 200" fill="none">
      <ellipse cx="80" cy="165" rx="52" ry="40" fill="rgba(255,255,255,0.07)" />
      <circle cx="80" cy="78"  r="38"           fill="rgba(255,255,255,0.1)"  />
      <rect   x="68" y="112"  width="24" height="20" rx="4" fill="rgba(255,255,255,0.08)" />
    </svg>
  );
}

// ── Card ──────────────────────────────────────────────────────────
function OfficerCard({ officer, large, index = 0 }) {
  const activeSocials = Object.entries(officer.socials || {}).filter(([, v]) => v !== null);

  return (
    <div
      className={`officer-card-new ${large ? 'officer-card-large' : ''} reveal-scale`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Photo */}
      <div className="officer-photo-wrap">
        {officer.img ? (
          <img src={officer.img} alt={officer.name} className="officer-photo" />
        ) : (
          <div className="officer-photo-placeholder"><Silhouette /></div>
        )}
        <div className="officer-photo-overlay" />
      </div>

      {/* Always-visible info at bottom */}
      <div className="officer-card-info">
        <div className="officer-card-name">{officer.name}</div>
        <div className="officer-card-role">{officer.role}</div>

        {/* Social icons — shown on hover via CSS, below role */}
        {activeSocials.length > 0 && (
          <>
            <div className="officer-socials-divider" />
            <div className="officer-card-socials">
              {activeSocials.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="officer-social-icon"
                  aria-label={key}
                  onClick={e => e.stopPropagation()}
                >
                  {SocialIcons[key]}
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Hover overlay — decorative red tint only */}
      <div className="officer-card-hover-overlay" />
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="officers-divider reveal">
      <div className="officers-divider-line" />
      <span className="officers-divider-label">{label}</span>
      <div className="officers-divider-line" />
    </div>
  );
}

function Officers() {
  const bodyRef = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  return (
    <div className="page-wrapper officers-page-wrapper">

      {/* ── Canvas bg ── */}
      <OfficersCanvas />

      {/* ── Glows ── */}
      <div className="officers-glow officers-glow-1" />
      <div className="officers-glow officers-glow-2" />
      <div className="officers-glow officers-glow-3" />

      {/* ── Sweep ── */}
      <div className="officers-sweep" />

      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-eyebrow">
            <span className="page-hero-eyebrow-dot" /> JPCS – QCU CHAPTER
          </div>
          <h1 className="page-hero-title">
            OUR <span className="page-hero-gold">OFFICERS</span>
          </h1>
          <p className="page-hero-sub">
            The minds behind the code. Meet the student officers orchestrating
            our workshops, initiatives, and community growth.
          </p>
          <div className="page-hero-badge">
            AY 2026 – 2027
          </div>
        </div>
      </section>

      <section className="officers-page">
        <div className="officers-body" ref={bodyRef}>

          {/* Adviser */}
          <SectionDivider label="CHAPTER ADVISER" />
          <div className="officers-grid officers-grid-adviser">
            {adviser.map((o, i) => <OfficerCard officer={o} large index={i} key={i} />)}
          </div>

          {/* Executives */}
          <SectionDivider label="CHAPTER EXECUTIVES" />
          <div className="officers-grid officers-grid-exec">
            {executives.map((o, i) => <OfficerCard officer={o} large index={i} key={i} />)}
          </div>

          {/* Directors */}
          <SectionDivider label="DIRECTORS" />
          <div className="officers-grid officers-grid-4">
            {directors.map((o, i) => <OfficerCard officer={o} index={i} key={i} />)}
          </div>

          {/* Deputy Directors */}
          <SectionDivider label="DEPUTY DIRECTORS" />
          <div className="officers-grid officers-grid-4">
            {deputies.map((o, i) => <OfficerCard officer={o} index={i} key={i} />)}
          </div>

          {/* Board of Governors */}
          <SectionDivider label="BOARD OF GOVERNORS" />
          <div className="officers-grid officers-grid-bog">
            {bog.map((o, i) => <OfficerCard officer={o} index={i} key={i} />)}
          </div>

        </div>
      </section>
    </div>
  );
}

export default Officers;
