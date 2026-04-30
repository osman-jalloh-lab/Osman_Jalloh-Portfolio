import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import './App.css';

/* ── PALETTE ─────────────────────────────────────────────── */
const PAL = {
  bg:          '#eaf0ee',
  bg2:         '#dce8e4',
  sidebar:     '#0d2233',
  accent:      '#38bdf8',
  card:        '#ffffff',
  text:        '#0d1e2a',
  textMid:     '#3a5a6a',
  sectionDark: '#0d2233',
};

const PaletteCtx = createContext(PAL);

/* ── DATA ────────────────────────────────────────────────── */
const NAV = ['Overview', 'Experience', 'Education', 'Projects', 'Skills', 'Contact'];

const STATS = [
  { n: '2+',  label: 'Years Exp' },
  { n: '4',   label: 'Projects' },
  { n: '2',   label: 'Certs' },
  { n: '12+', label: 'Skills' },
];

const EXPERIENCE = [
  {
    title:  'HR Technical Support & Compliance Auditor',
    org:    'Austin Community College',
    period: '2023 — Present',
    bullets: [
      'Automates I-9 compliance for 1,300+ employee records across 11 campuses — audit prep reduced from days to hours',
      'Workday HRIS support, onboarding audits, and internal documentation maintenance',
      'Built live compliance platforms in production tracking EAD expirations across F-1, H-1B, H-4 EAD, and C33 visa categories',
      'Zero missed reverification deadlines since deployment',
    ],
    tags: ['Workday', 'I-9', 'HIPAA', 'NIST 800-53'],
  },
  {
    title:  'IT Cybersecurity Intern',
    org:    'Austin State Hospital',
    period: 'May — Aug 2024',
    bullets: [
      'Reviewed access logs and managed user access controls in a HIPAA-regulated healthcare environment',
      'Documented security incidents and tracked support trends',
      'Applied least-privilege thinking to real-world access control workflows',
    ],
    tags: ['Access Control', 'HIPAA', 'Incident Documentation'],
  },
];

const EDUCATION = [
  {
    degree: 'AAS, Computer Information Systems',
    school: 'Austin Community College',
    period: 'In Progress',
    tags: ['Network Security', 'Systems Administration', 'Cybersecurity Fundamentals', 'Database Management'],
  },
  {
    degree: 'CompTIA Security+ & CySA+ Certified',
    school: 'CompTIA — Active Certifications',
    period: '2024',
    desc: 'Industry-recognized certifications in cybersecurity principles, threat detection, security analytics, and incident response.',
    tags: ['Security+', 'CySA+', 'Threat Detection', 'Incident Response'],
  },
];

const PROJECTS = [
  {
    id: 'hrhub',
    name: 'HR Hub — Intelligent Compliance',
    category: 'HRIS / Compliance',
    link: 'https://visadata.netlify.app/',
    desc: 'Live compliance platform automating I-9 management for 1,300+ employee records across 11 campuses at Austin Community College — reducing audit preparation from days to hours.',
    features: [
      'Interactive I-9 Builder for List A, B & C documents',
      'Real-time USCIS M-274 handbook guidance',
      'EAD Extension & Receipt Rule verification',
      'Automated Section 3 reverification workflows',
    ],
    tags: ['DHS Compliance', 'M-274 SOPs', 'HIPAA', 'NIST 800-53'],
  },
  {
    id: 'i9hub',
    name: 'I-9 Compliance Hub',
    category: 'HRIS / Compliance',
    link: 'https://visadata.netlify.app/',
    desc: 'Tracks EAD expirations for employees across F-1, H-1B, H-4 EAD, and C33 visa categories — zero missed reverification deadlines since deployment.',
    features: [
      'EAD expiration tracking across all major visa categories',
      'Automated reverification deadline alerts',
      'Zero missed deadlines since production deployment',
      'Integrated with employer compliance audit workflows',
    ],
    tags: ['E-Verify', 'I-9 Compliance', 'EAD Tracking', 'Access Control'],
  },
  {
    id: 'grc',
    name: 'GRC Automation Pipeline',
    category: 'GRC / Automation',
    desc: 'Replaced a 3-day manual audit process with an automated Python pipeline — generating audit-ready compliance dashboards in minutes.',
    features: [
      'Automated control mapping to NIST 800-53 and HIPAA',
      'Generates audit-ready dashboards from raw compliance data',
      'Reduced reporting cycle from 3 days to minutes',
      'Built with Python and Power Automate',
    ],
    tags: ['Python', 'Power Automate', 'NIST 800-53', 'GRC'],
  },
  {
    id: 'soc',
    name: 'SOC Lab — Security Monitoring',
    category: 'Security / SOC',
    link: 'https://securityflavor.netlify.app/',
    desc: 'Enterprise-grade security monitoring using Elastic Stack SIEM and pfSense across a three-zone network architecture mapped to MITRE ATT&CK.',
    features: [
      'Elastic Stack SIEM with custom detection rules',
      'pfSense firewall across a three-zone network architecture',
      'Threat mapping to MITRE ATT&CK framework',
      'Interactive analyst challenge and resilience observer',
    ],
    tags: ['Elastic Stack', 'SIEM', 'pfSense', 'MITRE ATT&CK'],
  },
];

const SKILLS = {
  'GRC & Compliance':  ['NIST 800-53', 'NIST CSF', 'HIPAA', 'SOC 2', 'ISO 27001', 'I-9 Compliance', 'E-Verify', 'Workday'],
  'Security & SOC':    ['CompTIA Security+', 'CompTIA CySA+', 'SIEM / Elastic Stack', 'pfSense', 'MITRE ATT&CK', 'Active Directory', 'Access Control', 'Incident Response'],
  'Tools & Automation':['Python', 'Power Automate', 'Linux', 'TCP/IP & VPN', 'Audit Reporting', 'GRC Dashboards'],
};

const CERTS = ['CompTIA Security+', 'CompTIA CySA+', 'Networking OSA', 'Programming OSA'];

const PROJECT_BG = ['#0d2233', '#1a2e1a', '#2e1a2a', '#1a1f3a'];

/* ── HELPERS ─────────────────────────────────────────────── */
function hex2rgba(hex, a = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

/* ── SHARED UI ───────────────────────────────────────────── */
function SLabel({ children, style }) {
  const p = useContext(PaletteCtx);
  return (
    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: p.accent, ...style }}>
      {children}
    </div>
  );
}

function Tag({ children, light, white }) {
  const p = useContext(PaletteCtx);
  const borderColor = white ? 'rgba(255,255,255,0.25)' : light ? hex2rgba(p.accent, 0.4) : p.accent;
  const textColor   = white ? 'rgba(255,255,255,0.65)' : light ? hex2rgba(p.accent, 0.7) : p.accent;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: 100, padding: '3px 12px', fontFamily: 'Space Mono, monospace', fontSize: 9, color: textColor, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
}

function TagFilled({ children }) {
  const p = useContext(PaletteCtx);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', background: p.accent, borderRadius: 100, padding: '5px 16px', fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#fff', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
}

function BtnPrimary({ children, href, style, onClick }) {
  const p = useContext(PaletteCtx);
  const [hov, setHov] = useState(false);
  const s = { display: 'inline-flex', alignItems: 'center', gap: 8, background: hov ? hex2rgba(p.accent, 0.85) : p.accent, color: '#fff', border: 'none', borderRadius: 100, padding: '12px 28px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s', transform: hov ? 'translateY(-1px)' : 'none', ...style };
  return href
    ? <a href={href} style={s} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>
    : <button style={s} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</button>;
}

function BtnOutline({ children, href, darkMode, style }) {
  const p = useContext(PaletteCtx);
  const [hov, setHov] = useState(false);
  const borderC = darkMode ? 'rgba(255,255,255,0.35)' : p.sectionDark;
  const s = { display: 'inline-flex', alignItems: 'center', gap: 8, background: hov ? (darkMode ? 'rgba(255,255,255,0.1)' : p.sectionDark) : 'transparent', color: hov && !darkMode ? '#fff' : darkMode ? 'rgba(255,255,255,0.85)' : p.text, border: `1.5px solid ${borderC}`, borderRadius: 100, padding: '11px 24px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 500, cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s', transform: hov ? 'translateY(-1px)' : 'none', ...style };
  return <a href={href || '#'} style={s} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>;
}

/* ── SIDEBAR ─────────────────────────────────────────────── */
function Sidebar({ active, onNav, mobileOpen, onMobileClose }) {
  const p = useContext(PaletteCtx);
  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onMobileClose} />}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`} style={{ background: p.sidebar, borderRight: `1px solid ${hex2rgba('#000000', 0.08)}` }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, gap: 10 }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', background: hex2rgba(p.accent, 0.2), border: `2px solid ${p.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 17, color: p.accent }}>
            OJ
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: 15, color: '#fff', lineHeight: 1.2 }}>Osman Jalloh</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: hex2rgba(p.accent, 0.8), letterSpacing: '0.08em', marginTop: 4, lineHeight: 1.5 }}>INFO SECURITY · GRC</div>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 20 }} />
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {NAV.map(item => {
            const id = item.toLowerCase();
            const isAct = active === id;
            return (
              <button key={item} onClick={() => { onNav(id); onMobileClose(); }} style={{ background: isAct ? hex2rgba(p.accent, 0.15) : 'transparent', border: 'none', borderRadius: 10, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: isAct ? 600 : 400, fontSize: 13, color: isAct ? p.accent : 'rgba(255,255,255,0.45)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
                {isAct && <div style={{ width: 3, height: 14, background: p.accent, borderRadius: 2, flexShrink: 0 }} />}
                {item}
              </button>
            );
          })}
        </nav>
        <a href="/resume.pdf" download style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: p.accent, color: '#fff', border: 'none', borderRadius: 100, padding: '10px 16px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', marginTop: 16, transition: 'opacity 0.2s' }}>
          ↓ Resume
        </a>
      </aside>
    </>
  );
}

/* ── OVERVIEW ────────────────────────────────────────────── */
function OverviewSection() {
  const p = useContext(PaletteCtx);
  const [ref, vis] = useInView(0.05);
  return (
    <section id="overview" ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(60px,8vw,80px) clamp(24px,6vw,60px)', background: p.bg, position: 'relative', overflow: 'hidden', transition: 'background 0.4s' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 80% 20%, ${hex2rgba(p.accent, 0.07)} 0%, transparent 60%)`, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 760, position: 'relative' }}>
        <SLabel style={{ marginBottom: 20, opacity: vis ? 1 : 0, transition: 'opacity 0.6s' }}>— Portfolio · {new Date().getFullYear()}</SLabel>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(72px,10vw,124px)', lineHeight: 0.92, letterSpacing: '-0.02em', color: p.text, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'opacity 0.9s, transform 0.9s cubic-bezier(.22,1,.36,1)' }}>
          Osman<br /><em style={{ fontStyle: 'italic', color: p.accent }}>Jalloh</em>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0', opacity: vis ? 1 : 0, transition: 'opacity 0.9s 0.1s' }}>
          <div style={{ width: 48, height: 2, background: p.accent, borderRadius: 2 }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: p.accent, letterSpacing: '0.15em' }}>INFORMATION SECURITY · GRC ANALYST</span>
        </div>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, lineHeight: 1.7, color: p.textMid, maxWidth: 520, opacity: vis ? 1 : 0, transition: 'opacity 0.9s 0.2s' }}>
          CompTIA Security+ and CySA+ certified analyst with 2+ years of hands-on experience in access control auditing, HIPAA and NIST 800-53 compliance, and building live security platforms serving 1,300+ employees at Austin Community College.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap', opacity: vis ? 1 : 0, transition: 'opacity 0.9s 0.3s' }}>
          <BtnPrimary href="#projects">View Projects</BtnPrimary>
          <BtnOutline href="#contact">Get in Touch</BtnOutline>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 0, marginTop: 72, borderTop: `1px solid ${hex2rgba(p.text, 0.1)}`, paddingTop: 40, opacity: vis ? 1 : 0, transition: 'opacity 0.9s 0.4s', flexWrap: 'wrap' }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ flex: '1 1 80px', paddingRight: 32, borderRight: i < STATS.length - 1 ? `1px solid ${hex2rgba(p.text, 0.1)}` : 'none', marginRight: i < STATS.length - 1 ? 32 : 0, marginBottom: 16 }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 48, color: p.text, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: p.accent, letterSpacing: '0.15em', marginTop: 6, textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── EXPERIENCE ──────────────────────────────────────────── */
function ExperienceSection() {
  const p = useContext(PaletteCtx);
  const [ref, vis] = useInView();
  return (
    <section id="experience" ref={ref} style={{ padding: 'clamp(60px,8vw,80px) clamp(24px,6vw,60px)', background: p.sectionDark, color: '#fff', position: 'relative', overflow: 'hidden', transition: 'background 0.4s' }}>
      <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: hex2rgba(p.accent, 0.06), pointerEvents: 'none' }} />
      <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.7s' }}>
        <SLabel style={{ color: p.accent, marginBottom: 12 }}>Work History</SLabel>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,48px)', color: '#fff', marginBottom: 52, lineHeight: 1 }}>Experience</h2>
        {EXPERIENCE.map((exp, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'clamp(120px,20vw,200px) 1fr', gap: 'clamp(20px,4vw,40px)', paddingBottom: 48, marginBottom: i < EXPERIENCE.length - 1 ? 48 : 0, borderBottom: i < EXPERIENCE.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none', opacity: vis ? 1 : 0, transition: `opacity 0.6s ${i * 0.15}s` }}>
            <div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: p.accent, letterSpacing: '0.1em', marginBottom: 8 }}>{exp.period}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                {exp.tags.map(t => <Tag key={t} light>{t}</Tag>)}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: 'clamp(20px,3vw,26px)', color: '#fff', marginBottom: 4 }}>{exp.title}</h3>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>{exp.org}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {exp.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    <span style={{ color: p.accent, flexShrink: 0, marginTop: 2 }}>—</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── EDUCATION ───────────────────────────────────────────── */
function EducationSection() {
  const p = useContext(PaletteCtx);
  const [ref, vis] = useInView();
  return (
    <section id="education" ref={ref} style={{ padding: 'clamp(60px,8vw,80px) clamp(24px,6vw,60px)', background: p.bg, transition: 'background 0.4s' }}>
      <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.7s' }}>
        <SLabel style={{ marginBottom: 12 }}>Academic Foundation</SLabel>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,48px)', color: p.text, marginBottom: 48, lineHeight: 1 }}>Education &amp; Training</h2>
        <div className="edu-grid">
          {EDUCATION.map((ed, i) => (
            <div key={i} style={{ background: p.card, borderRadius: 20, border: `1px solid ${hex2rgba(p.text, 0.07)}`, padding: 32, opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ${i * 0.15}s, transform 0.6s ${i * 0.15}s` }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: p.accent, letterSpacing: '0.1em', marginBottom: 12 }}>{ed.period}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: 22, color: p.text, marginBottom: 8, lineHeight: 1.2 }}>{ed.degree}</h3>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: p.accent, fontWeight: 500, marginBottom: ed.desc ? 12 : 20 }}>{ed.school}</p>
              {ed.desc && <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: p.textMid, lineHeight: 1.6, marginBottom: 20 }}>{ed.desc}</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {ed.tags.map(t => <span key={t} style={{ display: 'inline-flex', border: `1.5px solid ${hex2rgba(p.text, 0.2)}`, borderRadius: 100, padding: '3px 12px', fontFamily: 'Space Mono, monospace', fontSize: 9, color: p.textMid, letterSpacing: '0.05em' }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ────────────────────────────────────────────── */
function ProjectsSection() {
  const p = useContext(PaletteCtx);
  const [active, setActive] = useState(0);
  const [ref, vis] = useInView(0.05);
  const proj = PROJECTS[active];

  return (
    <section id="projects" ref={ref} style={{ paddingTop: 'clamp(60px,8vw,80px)', background: p.bg2, overflow: 'hidden', transition: 'background 0.4s' }}>
      <div style={{ padding: '0 clamp(24px,6vw,60px)', opacity: vis ? 1 : 0, transition: 'opacity 0.7s' }}>
        <SLabel style={{ marginBottom: 12 }}>Detailed Work</SLabel>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,48px)', color: p.text, marginBottom: 40, lineHeight: 1 }}>Projects &amp; Experience</h2>
      </div>
      <div className="projects-layout" style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.7s 0.2s' }}>
        <div className="project-tabs-col" style={{ borderRight: `1px solid ${hex2rgba(p.text, 0.1)}` }}>
          {PROJECTS.map((pr, i) => (
            <button key={pr.id} onClick={() => setActive(i)} style={{ textAlign: 'left', border: 'none', borderRadius: 12, padding: '14px 16px', cursor: 'pointer', background: active === i ? p.card : 'transparent', boxShadow: active === i ? '0 4px 16px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: active === i ? p.accent : hex2rgba(p.text, 0.2), transition: 'background 0.2s', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: active === i ? 600 : 400, fontSize: 13, color: active === i ? p.text : p.textMid, lineHeight: 1.3 }}>{pr.name}</span>
              </div>
            </button>
          ))}
        </div>
        <div key={proj.id} style={{ background: PROJECT_BG[active], padding: 'clamp(28px,5vw,48px) clamp(24px,5vw,52px)', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.35s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', marginBottom: 10 }}>{proj.category}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(24px,3vw,36px)', color: '#fff', lineHeight: 1.1 }}>{proj.name}</h3>
            </div>
            {proj.link && <BtnOutline href={proj.link} darkMode style={{ flexShrink: 0 }}>Launch ↗</BtnOutline>}
          </div>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>{proj.desc}</p>
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 28 }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: 14 }}>KEY FEATURES</div>
            <div className="features-grid">
              {proj.features.map((f, fi) => (
                <div key={fi} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                  <span style={{ color: p.accent, flexShrink: 0 }}>→</span>{f}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
            {proj.tags.map(t => <Tag key={t} white>{t}</Tag>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SKILLS ──────────────────────────────────────────────── */
function SkillsSection() {
  const p = useContext(PaletteCtx);
  const [ref, vis] = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: 'clamp(60px,8vw,80px) clamp(24px,6vw,60px)', background: p.bg, transition: 'background 0.4s' }}>
      <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.7s' }}>
        <SLabel style={{ marginBottom: 12 }}>Technical Matrix</SLabel>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,48px)', color: p.text, marginBottom: 48, lineHeight: 1 }}>Targeted Skills</h2>
        <div className="skills-grid-new">
          {Object.entries(SKILLS).map(([cat, items], ci) => (
            <div key={cat} style={{ background: p.card, borderRadius: 20, border: `1px solid ${hex2rgba(p.text, 0.07)}`, padding: 32, opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ${ci * 0.12}s, transform 0.6s ${ci * 0.12}s` }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: p.accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>{cat}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {items.map((skill, si) => (
                  <div key={si} style={{ padding: '12px 0', borderBottom: si < items.length - 1 ? `1px solid ${hex2rgba(p.text, 0.07)}` : 'none', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: p.text, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{skill}</span>
                    <span style={{ color: p.accent, fontSize: 11 }}>✦</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <SLabel style={{ marginBottom: 20 }}>Certifications</SLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {CERTS.map(c => <TagFilled key={c}>{c}</TagFilled>)}
          </div>
        </div>
        {/* ATS keyword block */}
        <p className="ats-keywords" aria-hidden="true">
          NIST 800-53, NIST CSF, HIPAA, SOC 2, ISO 27001, I-9 Compliance, E-Verify, Workday,
          Active Directory, SIEM, Elastic Stack, pfSense, MITRE ATT&amp;CK, GRC, Access Control,
          Audit, Risk Assessment, Python, Power Automate, CompTIA Security+, CompTIA CySA+,
          Information Security, GRC Analyst, Compliance Analyst, Cybersecurity Analyst
        </p>
      </div>
    </section>
  );
}

/* ── CONTACT ─────────────────────────────────────────────── */
function ContactSection() {
  const p = useContext(PaletteCtx);
  const [ref, vis] = useInView();
  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(60px,8vw,80px) clamp(24px,6vw,60px)', background: p.sectionDark, position: 'relative', overflow: 'hidden', transition: 'background 0.4s' }}>
      <div style={{ position: 'absolute', bottom: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: hex2rgba(p.accent, 0.06), pointerEvents: 'none' }} />
      <div style={{ maxWidth: 580, opacity: vis ? 1 : 0, transition: 'opacity 0.7s' }}>
        <SLabel style={{ color: p.accent, marginBottom: 12 }}>Get in Touch</SLabel>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(40px,5vw,52px)', color: '#fff', marginBottom: 16, lineHeight: 1 }}>
          Let's Work<br /><em style={{ color: p.accent, fontStyle: 'italic' }}>Together</em>
        </h2>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 40 }}>
          Seeking Information Security, GRC Analyst, and Compliance Analyst roles. CompTIA Security+ and CySA+ certified with live production platforms.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <BtnPrimary href="mailto:osmanjalloh104@gmail.com">Send a Message</BtnPrimary>
          <BtnOutline href="https://www.linkedin.com/in/osman-jalloh-a0680030a" darkMode>LinkedIn ↗</BtnOutline>
        </div>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="mailto:osmanjalloh104@gmail.com" style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: hex2rgba(p.accent, 0.8), textDecoration: 'none', letterSpacing: '0.05em' }}>✉ osmanjalloh104@gmail.com</a>
          <a href="tel:7377044182" style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: hex2rgba(p.accent, 0.8), textDecoration: 'none', letterSpacing: '0.05em' }}>☎ 737-704-4182</a>
        </div>
      </div>
      <div style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: 20, color: 'rgba(255,255,255,0.35)' }}>Osman Jalloh</div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>INFO SECURITY · GRC · COMPLIANCE · {new Date().getFullYear()}</div>
      </div>
    </section>
  );
}

/* ── APP ─────────────────────────────────────────────────── */
function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.background = PAL.bg;
    document.body.style.color = PAL.text;
  }, []);

  useEffect(() => {
    const sections = NAV.map(n => n.toLowerCase());
    const main = document.getElementById('main-scroll');
    if (!main) return;
    const onScroll = () => {
      let cur = 'overview';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 100 <= main.scrollTop) cur = id;
      });
      setActiveSection(cur);
    };
    main.addEventListener('scroll', onScroll, { passive: true });
    return () => main.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = useCallback((id) => {
    const el = document.getElementById(id);
    const main = document.getElementById('main-scroll');
    if (el && main) main.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    setActiveSection(id);
  }, []);

  return (
    <PaletteCtx.Provider value={PAL}>
      <div className="app-shell">
        {/* Mobile top bar */}
        <header className="mobile-header" style={{ background: PAL.sidebar }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: 16, color: '#fff' }}>Osman Jalloh</div>
          <button className="menu-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </header>

        <Sidebar active={activeSection} onNav={handleNav} mobileOpen={menuOpen} onMobileClose={() => setMenuOpen(false)} />

        <main id="main-scroll" className="main-scroll">
          <OverviewSection />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </PaletteCtx.Provider>
  );
}

export default App;
