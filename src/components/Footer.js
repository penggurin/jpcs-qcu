import { NavLink } from 'react-router-dom';
import '../App.css';

let jpcsLogo;
try { jpcsLogo = require('../jpcs-logo.png'); } catch { jpcsLogo = null; }

function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home',     to: '/'         },
    { label: 'About',    to: '/about'    },
    { label: 'Events',   to: '/events'   },
    { label: 'Officers', to: '/officers' },
    { label: 'Contact',  to: '/contact'  },
  ];

  return (
    <footer className="footer">
      {/* top divider line */}
      <div className="footer-top-line" />

      <div className="footer-inner">

        {/* ── Col 1: Brand ── */}
        <div className="footer-brand">
          <NavLink to="/" className="footer-logo-link">
            {jpcsLogo ? (
              <img src={jpcsLogo} alt="JPCS" className="footer-logo-img" />
            ) : null}
            <span className="footer-logo-text">JPCS-QCU</span>
          </NavLink>
          <p className="footer-tagline">
            Engineering the future through community, innovation, and digital excellence.
          </p>
          <div className="footer-contact-list">
            <span className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.9 16.5z" />
              </svg>
              09930361476
            </span>
            <span className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              jpcs.qcu@gmail.com
            </span>
          </div>
        </div>

        {/* ── Col 2: Quick links ── */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} className="footer-link" end={to === '/'}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3: About ── */}
        <div className="footer-col">
          <h4 className="footer-col-title">About JPCS</h4>
          <ul className="footer-links">
            <li><NavLink to="/about#history"    className="footer-link" onClick={() => setTimeout(() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' }), 100)}>Our History</NavLink></li>
            <li><NavLink to="/about#principles" className="footer-link" onClick={() => setTimeout(() => document.getElementById('principles')?.scrollIntoView({ behavior: 'smooth' }), 100)}>Guiding Principles</NavLink></li>
            <li><NavLink to="/about#objectives" className="footer-link" onClick={() => setTimeout(() => document.getElementById('objectives')?.scrollIntoView({ behavior: 'smooth' }), 100)}>Objectives</NavLink></li>
            <li><NavLink to="/about"            className="footer-link">Partner Organizations</NavLink></li>
          </ul>
        </div>

        {/* ── Col 4: Connect ── */}
        <div className="footer-col">
          <h4 className="footer-col-title">Connect</h4>
          <div className="footer-socials">
            {/* Facebook */}
            <a href="https://www.facebook.com/jpcs.qcu" target="_blank" rel="noreferrer" className="footer-social" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/jpcs.qcu" target="_blank" rel="noreferrer" className="footer-social" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/jpcs-qcu-chapter/
" target="_blank" rel="noreferrer" className="footer-social" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span className="footer-copy">
          © {year} JPCS-QCU Chapter. Code Your success.
        </span>
        <span className="footer-credit">Created by penggurin</span>
      </div>
    </footer>
  );
}

export default Footer;
