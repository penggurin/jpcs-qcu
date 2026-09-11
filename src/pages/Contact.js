import '../App.css';

// ── Department data ───────────────────────────────────────────────
const executives = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'President',
    email: 'jpcsqcu.president@gmail.com',
    phone: '+63 993 036 1476',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: 'Vice President – Internal',
    email: 'jpcsqcu.vpinternal@gmail.com',
    phone: '+63 945 624 1168',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Vice President – External',
    email: 'jpcsqcu.vpexternal@gmail.com',
    phone: '+63 927 148 6751',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Executive Secretary',
    email: 'jpcs.qcu@gmail.com',
    phone: '+63 945 678 9012',
  },
];

const departments = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    title: 'Associate Secretary',
    email: 'jpcsqcu.documents@gmail.com',
    phone: '+63 912 111 2222',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
    title: 'Human Resources',
    email: 'jpcsqcu.hr@gmail.com',
    phone: '+63 912 222 3333',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: 'Financial Treasury',
    email: 'jpcsqcu.finance@gmail.com',
    phone: '+63 963 381 9812',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Internal Audit',
    email: 'jpcsqcu.audit@gmail.com',
    phone: '+63 912 444 5555',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Creative Media',
    email: 'jpcsqcu.creativemedia@gmail.com',
    phone: '+63 905 495 1011',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Marketing & Publicity',
    email: 'jpcsqcu.marketing@gmail.com',
    phone: '+63 993 813 8449',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Partnerships & Collaborations',
    email: 'jpcsqcu.collaborations@gmail.com',
    phone: '+63 967 173 0840',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Logistics & Operations',
    email: 'jpcsqcu.operations@gmail.com',
    phone: '+63 912 888 9999',
  },
];

function DeptCard({ dept }) {
  return (
    <div className="dept-card">
      <div className="dept-card-icon">{dept.icon}</div>
      <div className="dept-card-title">{dept.title}</div>
      <div className="dept-card-email">{dept.email}</div>
      <div className="dept-card-phone">{dept.phone}</div>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact-page-wrapper">

      {/* ── Background glows ── */}
      <div className="contact-glow contact-glow-1" />
      <div className="contact-glow contact-glow-2" />
      <div className="contact-glow contact-glow-3" />
      <div className="contact-sweep" />

      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-eyebrow">
            <span className="page-hero-eyebrow-dot" /> CONNECT WITH US
          </div>
          <h1 className="page-hero-title">
            CONTACT <span className="page-hero-gold">US</span>
          </h1>
          <p className="page-hero-sub">
            Get in touch with the JPCS-QCU Chapter. Reach out to our departments,
            locate our campus office, or send us a message directly.
          </p>
        </div>
      </section>

      {/* ── Chapter Executives ── */}
      <section className="dept-section">
        <div className="dept-container">
          <div className="section-eyebrow reveal">REACH OUR DEPARTMENTS</div>
          <h2 className="section-heading reveal">CHAPTER <span className="gold">EXECUTIVES</span></h2>
          <div className="dept-grid dept-grid-4">
            {executives.map((d, i) => <DeptCard dept={d} key={i} />)}
          </div>
        </div>
      </section>

      {/* ── Chapter Departments ── */}
      <section className="dept-section dept-section-alt">
        <div className="dept-container">
          <div className="section-eyebrow reveal">GET IN TOUCH</div>
          <h2 className="section-heading reveal">CHAPTER <span className="gold">DEPARTMENTS</span></h2>
          <div className="dept-grid dept-grid-3">
            {departments.map((d, i) => <DeptCard dept={d} key={i} />)}
          </div>
        </div>
      </section>

      {/* ── Campus Location ── */}
      <section className="campus-section">
        <div className="dept-container">
          <div className="section-eyebrow reveal">FIND US</div>
          <h2 className="section-heading reveal">OUR CHAPTER <span className="gold">LOCATION</span></h2>

          <div className="campus-map-wrap">
            <div className="campus-map-label">CAMPUS MAP</div>
            <iframe
              title="QCU San Bartolome Campus Map"
              className="campus-map-iframe"
              src="https://maps.google.com/maps?q=Quezon+City+University+San+Bartolome+673+Quirino+Highway+Novaliches+Quezon+City&output=embed&z=17"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="campus-info-row">
            <div className="campus-info-item">
              <span className="campus-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <div className="campus-info-label">HQ Address</div>
                <div className="campus-info-value">
                  Quezon City University, 673 Quirino Highway,<br />
                  San Bartolome, Novaliches, Quezon City,<br />
                  Philippines 1116
                </div>
              </div>
            </div>
            <div className="campus-info-item">
              <span className="campus-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div>
                <div className="campus-info-label">Office Hours</div>
                <div className="campus-info-value">Monday – Friday, 8:00 AM – 5:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}

export default Contact;
