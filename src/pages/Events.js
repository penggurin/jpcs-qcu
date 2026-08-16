import { useState, useEffect, useRef } from 'react';
import '../App.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ── HOW TO ADD PHOTOS ─────────────────────────────────────────────
// 1. Drop your image into the matching folder inside src/events/
// 2. Replace  null  with:  require('../events/folder-name/your-photo.jpg')
// ─────────────────────────────────────────────────────────────────

const FB_FALLBACK = 'https://www.facebook.com/jpcsqcu';

const allEvents = [
  // ── HOSTED 2024-2025 ─────────────────────────────────────────────
  {
    category: 'hosted',
    year: 2024,
    schoolYear: '2024–2025',
    date: 'Nov 23, 2024',
    type: 'Seminar',
    mode: 'Onsite',
    location: 'Student Assistance Resource Center, Ground Floor, Academic Bldg., QCU',
    attendees: null,
    title: 'Unlocking the Power of Azure: Navigating Cloud Solutions for Seamless Integration',
    img: require('../events/hosted-2024-2025/unlocking-azure/photo.jpg'),
    link: null,
  },
  {
    category: 'hosted',
    year: 2025,
    schoolYear: '2024–2025',
    date: 'Feb 10 – Mar 10, 2025',
    type: 'Techathon',
    mode: 'Online',
    location: 'Google Meet',
    attendees: 150,
    title: 'International Women\'s Day 2025 Global Techathon',
    img: require('../events/hosted-2024-2025/iwd-techathon/photo.jpg'),
    link: null,
  },
  {
    category: 'hosted',
    year: 2025,
    schoolYear: '2024–2025',
    date: 'Mar 5, 2025',
    type: 'University-wide Programming Contest',
    mode: 'Onsite',
    location: 'Bautista Building, Room 603',
    attendees: null,
    title: 'CodeQuest 2025: Competition Execution on University Week',
    img: require('../events/hosted-2024-2025/codequest-2025/photo.jpg'),    
    link: null,
  },
  {
    category: 'hosted',
    year: 2025,
    schoolYear: '2024–2025',
    date: 'May 9, 2025',
    type: 'Workshop',
    mode: 'Online',
    location: 'Google Meet',
    attendees: 31,
    title: 'Free Coding Bootcamp: Data Visualization Workshop',
    img: require('../events/hosted-2024-2025/data-viz-workshop/photo.jpg'),
    link: null,
  },
  // ── HOSTED 2025-2026 ─────────────────────────────────────────────
  {
    category: 'hosted',
    year: 2025,
    schoolYear: '2025–2026',
    date: 'Sep 25, 29 & Oct 1, 2025',
    type: 'Bootcamp',
    mode: 'Onsite',
    location: 'Korea–Philippines IT Training Center, Room 201',
    attendees: 90,
    title: 'LOGIC UNLOCKED: Compiling Clarity for Code Mastery',
    img: require('../events/hosted-2025-2026/logic-unlocked/photo.jpg'),
    link: null,
  },
  {
    category: 'hosted',
    year: 2025,
    schoolYear: '2025–2026',
    date: 'Nov 25, 2025',
    type: 'Seminar',
    mode: 'Onsite',
    location: 'Auditorium, Bautista Bldg, QCU Main',
    attendees: null,
    title: 'Occupational Safety: Digital Security and Ethical Workplace Practices',
    img: require('../events/hosted-2025-2026/occupational-safety/photo.jpg'),
    link: null,
  },
  {
    category: 'hosted',
    year: 2025,
    schoolYear: '2025–2026',
    date: 'Dec 18, 2025',
    type: 'Coding Competition',
    mode: 'Onsite',
    location: 'IK603 Bautista Building',
    attendees: null,
    title: 'CODESORTIUM: The Ultimate Code Challenge',
    img: require('../events/hosted-2025-2026/codesortium/photo.jpg'),
    link: null,
  },
  {
    category: 'hosted',
    year: 2026,
    schoolYear: '2025–2026',
    date: 'Mar 3, 2026',
    type: 'Programming Competition',
    mode: 'Onsite',
    location: 'Quezon City University San Bartolome Campus – Main',
    attendees: null,
    title: 'DEVCUP: CCS Programming Competition',
    img: require('../events/hosted-2025-2026/devcup/photo.jpg'),
    link: null,
  },
  {
    category: 'hosted',
    year: 2026,
    schoolYear: '2025–2026',
    date: 'May 20, 2026',
    type: 'Student Research Conference',
    mode: 'Onsite',
    location: 'University Auditorium & New Academic Building Lobby, QCU',
    attendees: 823,
    title: 'SYNERGY 2026',
    img: require('../events/hosted-2025-2026/synergy-2026/photo.jpg'),
    link: null,
  },
  // ── JOINED 2024-2025 ─────────────────────────────────────────────
  {
    category: 'joined',
    year: 2024,
    schoolYear: '2024–2025',
    date: 'Aug 28, 2024',
    type: 'Seminar',
    mode: 'Onsite',
    location: 'Quezon City University Gymnasium',
    attendees: null,
    title: 'Tech-Preneurship 2024: Empowering CCS Students for Innovative Ventures',
    img: require('../events/joined-2024-2025/tech-preneurship/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2024,
    schoolYear: '2024–2025',
    date: 'Sep 21, 2024',
    type: 'Parade',
    mode: 'Onsite',
    location: 'Quezon City University Open Grounds',
    attendees: null,
    title: 'Welcome Walk 2024: Tayo ang QCU, Tayo sa QC',
    img: require('../events/joined-2024-2025/welcome-walk/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2024,
    schoolYear: '2024–2025',
    date: 'Nov 4, 2024',
    type: 'Seminar',
    mode: 'Onsite',
    location: 'FEU Tech Innovation Center (FITC)',
    attendees: 10,
    title: 'Ground Zero: Charting the Path to Success',
    img: require('../events/joined-2024-2025/ground-zero/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2024,
    schoolYear: '2024–2025',
    date: 'Nov 30, 2024',
    type: 'Seminar',
    mode: 'Online',
    location: 'Google Meet',
    attendees: null,
    title: 'JPCS National Geek Speaks',
    img: require('../events/joined-2024-2025/jpcs-geek-speaks/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2025,
    schoolYear: '2024–2025',
    date: 'Jan 10, 2025',
    type: 'Service Learning',
    mode: 'Onsite',
    location: '6th Floor, Audio Visual Room, New Academic Building',
    attendees: null,
    title: 'A Round Table Discussion on Designing and Implementing a High Impact Service-Learning Program for Community Development',
    img: require('../events/joined-2024-2025/round-table/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2025,
    schoolYear: '2024–2025',
    date: 'Jan 20, 2025',
    type: 'Workshop',
    mode: 'Onsite',
    location: 'Academic Bldg., Room 507',
    attendees: null,
    title: 'QCU YES: Transformational Leadership',
    img: require('../events/joined-2024-2025/qcu-yes/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2025,
    schoolYear: '2024–2025',
    date: 'Jan 25, 2025',
    type: 'Workshop',
    mode: 'Online',
    location: 'Google Meet',
    attendees: null,
    title: 'Introduction to Core DAO and Blockchain Technology',
    img: require('../events/joined-2024-2025/core-dao/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2025,
    schoolYear: '2024–2025',
    date: 'Mar 7, 2025',
    type: 'Seminar',
    mode: 'Onsite',
    location: 'Auditorium, 7th Floor, Bautista Building, QCU',
    attendees: null,
    title: 'Cyber Security Seminar with a Demonstration of Ethical Hacking',
    img: require('../events/joined-2024-2025/cyber-security/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2025,
    schoolYear: '2024–2025',
    date: 'Apr 24, 2025',
    type: 'Exhibit',
    mode: 'Onsite',
    location: 'Bautista Building, Room IK603',
    attendees: '42 groups',
    title: 'SYNERGY 2025: Exhibit Documentation',
    img: require('../events/joined-2024-2025/synergy-2025/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2025,
    schoolYear: '2024–2025',
    date: 'Apr 30, 2025',
    type: 'Org Fest',
    mode: 'Onsite',
    location: 'Quezon City University Triangle',
    attendees: null,
    title: 'ALAB IN IT: SummerSaya 2025 Org Fest',
    img: require('../events/joined-2024-2025/alab-in-it/photo.jpg'),
    link: null,
  },
  // ── JOINED 2025-2026 ─────────────────────────────────────────────
  {
    category: 'joined',
    year: 2025,
    schoolYear: '2025–2026',
    date: 'Aug 15, 2025',
    type: 'Parade',
    mode: 'Onsite',
    location: 'Quezon City University San Bartolome Campus – Main',
    attendees: null,
    title: 'Freshmen Welcome Walk for AY 2025–2026',
    img: require('../events/joined-2025-2026/freshmen-welcome-walk/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2025,
    schoolYear: '2025–2026',
    date: 'Aug 19, 2025',
    type: 'Summit',
    mode: 'Onsite',
    location: 'Radiate Hall, 2F, The Globe Tower, 32nd St, Taguig',
    attendees: 5,
    title: 'Globe – INNOVIA COSMIC NEXUS',
    img: require('../events/joined-2025-2026/innovia-cosmic-nexus/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2025,
    schoolYear: '2025–2026',
    date: 'Oct 16, 2025',
    type: 'Seminar',
    mode: 'Onsite',
    location: 'Auditorium, Bautista Bldg, QCU Main',
    attendees: 150,
    title: 'Alumni Talks',
    img: require('../events/joined-2025-2026/alumni-talks/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2026,
    schoolYear: '2025–2026',
    date: 'May 4, 2026',
    type: 'Org Fest',
    mode: 'Onsite',
    location: 'QCU Triangle',
    attendees: null,
    title: 'ORG DAY 2026',
    img: require('../events/joined-2025-2026/org-day-2026/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2026,
    schoolYear: '2025–2026',
    date: 'May 23, 2026',
    type: 'Block Screening',
    mode: 'Onsite',
    location: 'Ayala Trinoma Cinema 3, Quezon City',
    attendees: 8,
    title: 'Globe – The Mandalorian and Grogu Block Screening',
    img: require('../events/joined-2025-2026/mandalorian-screening/photo.jpg'),
    link: null,
  },
  // ── JOINED 2026-2027 ─────────────────────────────────────────────
  {
    category: 'joined',
    year: 2026,
    schoolYear: '2026–2027',
    date: 'May 25, 2026',
    type: 'Workshop',
    mode: 'Onsite',
    location: '5F Coherco Corporate Centre, 116 V.A. Rufino St., Legaspi Village, Makati City',
    attendees: 4,
    title: 'Canva Resume & Interview Workshop',
    img: require('../events/joined-2026-2027/canva-resume-workshop/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2026,
    schoolYear: '2026–2027',
    date: 'Jun 16, 2026',
    type: 'Workshop',
    mode: 'Onsite',
    location: '5F Coherco Corporate Centre, 116 V.A. Rufino St., Legaspi Village, Makati City',
    attendees: 5,
    title: 'Kadakareer X Canva Pride Month Career Workshop',
    img: require('../events/joined-2026-2027/kadakareer-canva/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2026,
    schoolYear: '2026–2027',
    date: 'Jun 27, 2026',
    type: 'QC Youth Organization Assembly',
    mode: 'Onsite',
    location: 'QC MICE Center, Diliman, Quezon City',
    attendees: 3,
    title: 'QC Youth Organization Assembly 2026',
    img: require('../events/joined-2026-2027/qc-youth-assembly/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2026,
    schoolYear: '2026–2027',
    date: 'Jun 29, 2026',
    type: 'Seminar',
    mode: 'Onsite',
    location: 'Ang Bahay ng Alumni Convention Center, UP Diliman',
    attendees: 6,
    title: 'THE GENZENNIAL TOUR',
    img: require('../events/joined-2026-2027/genzennial-tour/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2026,
    schoolYear: '2026–2027',
    date: 'Jul 10, 2026',
    type: 'Workshop',
    mode: 'Online',
    location: 'Google Meet',
    attendees: 5,
    title: 'StellarX PH Online Workshop Series: Empowering Stellar Builders',
    img: require('../events/joined-2026-2027/stellarx-workshop/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2026,
    schoolYear: '2026–2027',
    date: 'Jul 16, 2026',
    type: 'Webinar',
    mode: 'Online',
    location: 'Zoom',
    attendees: 4,
    title: 'PCS MMM–TECHTALKS',
    img: require('../events/joined-2026-2027/pcs-techtalks/photo.jpg'),
    link: null,
  },
  {
    category: 'joined',
    year: 2026,
    schoolYear: '2026–2027',
    date: 'Jul 18, 2026',
    type: 'Workshop',
    mode: 'Online',
    location: 'Google Meet',
    attendees: 5,
    title: 'Commit to the Cloud: Hands-on Introduction to Git, Github & Cloud Deployment with AWS Amplify',
    img: require('../events/joined-2026-2027/commit-to-cloud/photo.jpg'),
    link: null,
  },
];

// helpers
const YEARS = ['ALL', '2026', '2025', '2024'];
const CATS  = ['ALL', 'HOSTED', 'JOINED'];

function getModeIcon(mode) {
  return mode === 'Online'
    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}

// ── Facebook icon ─────────────────────────────────────────────────
function FbIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

// ── Event modal ───────────────────────────────────────────────────
function EventModal({ ev, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const fbLink = ev.link || FB_FALLBACK;

  return (
    <div className="ev-modal-backdrop" onClick={onClose}>
      <div className="ev-modal" onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button className="ev-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Image */}
        <div className="ev-modal-img-wrap">
          {ev.img
            ? <img src={ev.img} alt={ev.title} className="ev-modal-img" />
            : <div className="ev-modal-img-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="40" height="40">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
          }
          {/* Badges over image */}
          <div className={`ev-card-tag ${ev.category === 'hosted' ? 'ev-card-tag-hosted' : 'ev-card-tag-joined'}`}>
            <span className="ev-card-tag-dot" />
            {ev.category === 'hosted' ? 'Hosted' : 'Joined'}
          </div>
          <div className={`ev-card-mode ${ev.mode === 'Online' ? 'ev-card-mode-online' : 'ev-card-mode-onsite'}`}>
            {getModeIcon(ev.mode)} {ev.mode}
          </div>
        </div>

        {/* Body */}
        <div className="ev-modal-body">
          <div className="ev-modal-meta">
            <span className="ev-card-date">{ev.date}</span>
            <span className="ev-modal-sy">{ev.schoolYear}</span>
            {ev.attendees && (
              <span className="ev-card-attendees">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="12" height="12">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                {ev.attendees} attendees
              </span>
            )}
          </div>

          <div className="ev-modal-type">{ev.type}</div>
          <h2 className="ev-modal-title">{ev.title}</h2>

          <div className="ev-modal-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {ev.location}
          </div>

          <div className="ev-modal-actions">
            <a
              href={fbLink}
              target="_blank"
              rel="noreferrer"
              className="ev-modal-fb-btn"
            >
              <FbIcon size={16} />
              {ev.link ? 'View on Facebook' : 'Learn More'}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Event card ────────────────────────────────────────────────────
function EventCard({ ev, i, onClick }) {
  return (
    <div
      className="ev-card reveal"
      style={{ transitionDelay: `${(i % 6) * 0.07}s` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {/* Image */}
      <div className="ev-card-img">
        {ev.img ? (
          <img src={ev.img} alt={ev.title} />
        ) : (
          <div className="ev-card-img-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="28" height="28">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>Upload image</span>
          </div>
        )}
        {/* Category badge */}
        <div className={`ev-card-tag ${ev.category === 'hosted' ? 'ev-card-tag-hosted' : 'ev-card-tag-joined'}`}>
          <span className="ev-card-tag-dot" />
          {ev.category === 'hosted' ? 'Hosted' : 'Joined'}
        </div>
        {/* Mode badge */}
        <div className={`ev-card-mode ${ev.mode === 'Online' ? 'ev-card-mode-online' : 'ev-card-mode-onsite'}`}>
          {getModeIcon(ev.mode)} {ev.mode}
        </div>
      </div>

      {/* Body */}
      <div className="ev-card-body">
        <div className="ev-card-meta-row">
          <span className="ev-card-date">{ev.date}</span>
          {ev.attendees && (
            <span className="ev-card-attendees">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {ev.attendees}
            </span>
          )}
        </div>
        <h3 className="ev-card-title">{ev.title}</h3>
        <div className="ev-card-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {ev.location}
        </div>

        {/* Facebook link or fallback */}
        <a
          href={ev.link || FB_FALLBACK}
          target="_blank"
          rel="noreferrer"
          className={`ev-card-btn ev-card-btn-fb ${ev.link ? '' : 'ev-card-btn-fb-fallback'}`}
          onClick={e => e.stopPropagation()}
        >
          <FbIcon size={13} />
          {ev.link ? 'View on Facebook' : 'Learn More'}
        </a>
      </div>
    </div>
  );
}

function Events() {
  const [activeYear, setActiveYear] = useState('ALL');
  const [activeCat,  setActiveCat]  = useState('ALL');
  const [selected,   setSelected]   = useState(null);

  // Re-run the observer whenever the filtered list changes so newly
  // rendered cards get picked up immediately.
  const bodyRef = useScrollReveal({ threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  // Re-trigger reveal on filter change: reset card classes then re-observe
  useEffect(() => {
    const container = bodyRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('.ev-card.reveal'));
    // briefly strip visible so cards animate in again after a filter change
    cards.forEach(c => c.classList.remove('visible'));
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );
      cards.forEach(c => observer.observe(c));
      return () => observer.disconnect();
    }, 30); // tiny delay lets React flush the new DOM
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeYear, activeCat]);

  // Hero reveal refs
  const eyebrowRef = useRef(null);
  const titleRef   = useRef(null);
  const subRef     = useRef(null);

  useEffect(() => {
    const heroEls = [eyebrowRef.current, titleRef.current, subRef.current];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    heroEls.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = allEvents.filter(e => {
    const yearOk = activeYear === 'ALL' || String(e.year) === activeYear;
    const catOk  = activeCat  === 'ALL' || e.category.toUpperCase() === activeCat;
    return yearOk && catOk;
  });

  const hostedCount = filtered.filter(e => e.category === 'hosted').length;
  const joinedCount = filtered.filter(e => e.category === 'joined').length;

  return (
    <div className="page-wrapper">

      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div ref={eyebrowRef} className="page-hero-eyebrow reveal">
            <span className="page-hero-eyebrow-dot" /> JPCS – QCU CHAPTER
          </div>
          <h1 ref={titleRef} className="page-hero-title reveal" style={{ transitionDelay: '0.1s' }}>
            EVENT <span className="page-hero-gold">SHOWCASE</span>
          </h1>
          <p ref={subRef} className="page-hero-sub reveal" style={{ transitionDelay: '0.2s' }}>
            Explore our past hackathons, workshops, and seminars where our community
            pushed the boundaries of tech and brought bold ideas to life.
          </p>
        </div>
      </section>

      {/* ── Filters + grid ── */}
      <section className="events-body">
        <div className="events-body-inner" ref={bodyRef}>

          {/* Filter bar */}
          <div className="events-filter-bar reveal">
            {/* Category toggle */}
            <div className="events-filter-group">
              <span className="events-filter-label">Category:</span>
              <div className="events-filter-pills">
                {CATS.map(c => (
                  <button
                    key={c}
                    className={`events-filter-pill ${activeCat === c ? 'active' : ''}`}
                    onClick={() => setActiveCat(c)}
                  >
                    {c === 'ALL' ? 'All' : c === 'HOSTED' ? 'Hosted' : 'Joined'}
                  </button>
                ))}
              </div>
            </div>

            {/* Year filter */}
            <div className="events-filter-group">
              <span className="events-filter-label">Year:</span>
              <div className="events-filter-pills">
                {YEARS.map(y => (
                  <button
                    key={y}
                    className={`events-filter-pill ${activeYear === y ? 'active' : ''}`}
                    onClick={() => setActiveYear(y)}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Count summary */}
            <div className="events-filter-summary">
              <span className="ev-summary-chip ev-summary-hosted">{hostedCount} Hosted</span>
              <span className="ev-summary-chip ev-summary-joined">{joinedCount} Joined</span>
            </div>
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="ev-grid">
              {filtered.map((ev, i) => (
                <EventCard
                  ev={ev}
                  i={i}
                  key={`${ev.category}-${ev.title}`}
                  onClick={() => setSelected(ev)}
                />
              ))}
            </div>
          ) : (
            <div className="events-empty reveal">No events found for the selected filters.</div>
          )}

        </div>
      </section>

      {/* ── Modal ── */}
      {selected && <EventModal ev={selected} onClose={() => setSelected(null)} />}

    </div>
  );
}

export default Events;
