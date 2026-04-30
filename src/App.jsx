import React, { useState, useEffect } from 'react';
import './App.css';

const PROJECTS = [
  {
    id: 'i9-app',
    title: 'HR Hub – Intelligent Compliance',
    link: 'https://visadata.netlify.app/',
    description: 'Live compliance platform automating I-9 management for 1,300+ employee records across 11 campuses at Austin Community College — reducing audit preparation from days to hours.',
    details: 'Features a real-time I-9 Builder for acceptable document determination, standardized SOPs from the M-274 handbook, and verified extension policies for EAD codes. Built to streamline onboarding workflows and ensure audit-readiness at scale.',
    tags: ['Interactive Scenarios', 'DHS Compliance', 'M-274 SOPs', 'Risk Mitigation', 'HIPAA', 'NIST 800-53'],
    features: [
      'Interactive I-9 Builder for List A, B, and C documents',
      'Real-time guidance from USCIS M-274 handbook',
      'EAD Extension & Receipt Rule verification',
      'Automated Section 3 reverification workflows',
      'Live in production — serving Austin Community College HR operations',
    ],
  },
  {
    id: 'i9-compliance-hub',
    title: 'I-9 Compliance Hub',
    link: 'https://visadata.netlify.app/',
    description: 'Tracks EAD expirations for employees across multiple visa categories including F-1, H-1B, H-4 EAD, and C33 — zero missed reverification deadlines since deployment.',
    details: 'Built to solve a real gap in employer compliance workflows: missed EAD expiration deadlines trigger fines and audit exposure. This tool monitors work authorization end dates, categorizes visa types, and surfaces upcoming reverification windows automatically.',
    tags: ['EAD Tracking', 'Visa Compliance', 'E-Verify', 'I-9 Compliance', 'Access Control'],
    features: [
      'EAD expiration tracking across F-1, H-1B, H-4 EAD, and C33 categories',
      'Automated reverification deadline alerts',
      'Zero missed deadlines since deployment in production',
      'Integrated with employer compliance audit workflows',
    ],
  },
  {
    id: 'grc-pipeline',
    title: 'GRC Automation Pipeline',
    description: 'Replaced a 3-day manual audit process with an automated Python pipeline — generating audit-ready compliance dashboards in minutes.',
    details: 'Designed to address the time cost of manual GRC reporting. The pipeline ingests raw control data, maps it to NIST 800-53 and HIPAA control families, and produces structured audit-ready dashboards. Built with Python and Power Automate, mapped to NIST CSF.',
    tags: ['Python', 'Power Automate', 'NIST 800-53', 'NIST CSF', 'GRC', 'Audit Automation'],
    features: [
      'Automated control mapping to NIST 800-53 and HIPAA frameworks',
      'Generates audit-ready dashboards from raw compliance data',
      'Reduced reporting cycle from 3 days to minutes',
      'Built with Python and Power Automate',
    ],
  },
  {
    id: 'soc-lab',
    title: 'SOC Lab – Security Monitoring',
    link: 'https://securityflavor.netlify.app/',
    description: 'Enterprise-grade security monitoring using Elastic Stack SIEM and pfSense across a three-zone network architecture mapped to MITRE ATT&CK.',
    details: 'Configured a full SOC simulation environment with Elastic Stack SIEM for log ingestion and alerting, pfSense for network segmentation, and threat detection rules mapped to MITRE ATT&CK. Includes a Terminal Challenge, Analyst Dashboard, and Resilience Observer.',
    tags: ['Elastic Stack', 'SIEM', 'pfSense', 'MITRE ATT&CK', 'Incident Response', 'Active Directory'],
    features: [
      'Elastic Stack SIEM with custom detection rules',
      'pfSense firewall across a three-zone network architecture',
      'Threat mapping to MITRE ATT&CK framework',
      'Interactive analyst challenge and resilience observer modules',
    ],
  },
];

const NAV_LINKS = [
  { href: '#overview',       label: 'Overview',         id: 'overview' },
  { href: '#certifications', label: 'Certifications',   id: 'certifications' },
  { href: '#experience',     label: 'Experience',       id: 'experience' },
  { href: '#education',      label: 'Education',        id: 'education' },
  { href: '#projects',       label: 'Work & Projects',  id: 'projects' },
  { href: '#skills',         label: 'Technical Skills', id: 'skills' },
  { href: '#contact',        label: 'Contact',          id: 'contact' },
];

const CERTS = [
  { title: 'CompTIA Security+ (SY0-701)', desc: 'Foundation in cybersecurity principles and practices.', color: '#e11d48' },
  { title: 'CompTIA CySA+', desc: 'Advanced security analytics and incident response.', color: '#0ea5e9' },
  { title: 'Computer Networking Award', desc: 'Occupational Skills Award in Networking.', color: '#059669' },
  { title: 'Computer Programming Award', desc: 'Occupational Skills Award in Programming.', color: '#7c3aed' },
];

function App() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0].id);
  const [activeSection, setActiveSection] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  const currentProject = PROJECTS.find(p => p.id === activeProject);

  // Scroll spy – highlight active nav link
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Scroll animations – reveal elements as they enter the viewport
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!menuOpen) return;
    const handle = e => {
      if (!e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [menuOpen]);

  return (
    <div className="dashboard-container">
      {/* Mobile top bar */}
      <header className="mobile-header">
        <div className="mobile-brand">OJ — Osman Jalloh</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile overlay */}
      {menuOpen && <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="avatar">OJ</div>
          <div className="brand-name">Osman Jalloh</div>
          <div className="brand-title">Information Security & GRC Analyst</div>
        </div>
        <nav className="side-nav">
          {NAV_LINKS.map(link => (
            <a
              key={link.id}
              href={link.href}
              className={activeSection === link.id ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <a href="/resume.pdf" className="btn btn-primary w-full" download>
            ↓ Download Resume
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">

        {/* Hero */}
        <section id="overview" className="hero-section">
          <div className="hero-eyebrow">
            <span className="status-dot" />
            Available for Opportunities
          </div>
          <h1 className="hero-title">
            Information Security and{' '}
            <span className="gradient-text">GRC Analyst</span>
          </h1>
          <p className="intro-text">
            CompTIA Security+ and CySA+ certified analyst with 2 years of hands-on experience
            in access control auditing, HIPAA and NIST 800-53 compliance, and building live
            security platforms serving 1,300+ employees at Austin Community College.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View My Work ↗</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Certifications</span>
            </div>
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Live Projects</span>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="animate-on-scroll">
          <span className="section-label">Verified Credibility</span>
          <h2>Technical Certifications</h2>
          <div className="cert-grid">
            {CERTS.map((cert, i) => (
              <div
                key={i}
                className="card cert-card animate-on-scroll"
                style={{ '--cert-color': cert.color }}
              >
                <div className="cert-icon">✓</div>
                <div className="cert-info">
                  <h3>{cert.title}</h3>
                  <p>{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="cert-footer">
            These certifications reflect my foundation in security principles, log awareness, risk analysis, and secure system practices.
          </p>
        </section>

        {/* Philosophy */}
        <section id="how-i-work" className="animate-on-scroll">
          <span className="section-label">Philosophy</span>
          <div className="card philosophy-card">
            <div className="quote-mark">&ldquo;</div>
            <h3>How I Work</h3>
            <p>
              I approach systems carefully. I focus on preventing errors, documenting decisions,
              and understanding how technical actions affect compliance and risk.
              I am comfortable working with sensitive data and prefer clarity over shortcuts.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="animate-on-scroll">
          <span className="section-label">Professional Timeline</span>
          <h2>Experience Snapshot</h2>
          <div className="timeline">

            <div className="timeline-item animate-on-scroll">
              <div className="timeline-marker">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>
              <div className="card timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3>HR Technical Support & Compliance Auditor</h3>
                    <span className="company">Austin Community College</span>
                  </div>
                  <span className="time-badge current">Current</span>
                </div>
                <p>Focus: Workday support, onboarding audits, and internal documentation maintenance.</p>
              </div>
            </div>

            <div className="timeline-item animate-on-scroll">
              <div className="timeline-marker">
                <div className="timeline-dot" />
              </div>
              <div className="card timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3>IT Cybersecurity Intern</h3>
                    <span className="company">Austin State Hospital</span>
                  </div>
                  <span className="time-badge">May – Aug 2024</span>
                </div>
                <p>Reviewed access logs, managed user access controls, documented security incidents, and tracked support trends in a HIPAA-regulated healthcare environment.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Education */}
        <section id="education" className="animate-on-scroll">
          <span className="section-label">Academic Foundation</span>
          <h2>Education & Training</h2>
          <div className="education-grid">
            <div className="card edu-card animate-on-scroll">
              <div className="edu-icon">🎓</div>
              <h3>AAS, Computer Information Systems</h3>
              <span className="company">Austin Community College</span>
              <p className="time-period-inline">In Progress</p>
              <div className="tags">
                {['Network Security', 'Systems Administration', 'Cybersecurity Fundamentals', 'Database Management'].map(s => (
                  <span key={s} className="badge">{s}</span>
                ))}
              </div>
            </div>
            <div className="card edu-card animate-on-scroll">
              <div className="edu-icon">💻</div>
              <h3>CompTIA Security+ & CySA+ Certified</h3>
              <span className="company">CompTIA</span>
              <p className="time-period-inline">Active Certifications</p>
              <p>Industry-recognized certifications in cybersecurity principles, threat detection, security analytics, and incident response.</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="animate-on-scroll">
          <span className="section-label">Detailed Work</span>
          <h2>Projects & Experience</h2>
          <div className="projects-explorer card">
            <div className="projects-tabs">
              {PROJECTS.map(project => (
                <button
                  key={project.id}
                  className={`project-tab ${activeProject === project.id ? 'active' : ''}`}
                  onClick={() => setActiveProject(project.id)}
                >
                  <span className="folder-icon">📁</span>
                  {project.title}
                </button>
              ))}
            </div>
            <div className="project-display" key={activeProject}>
              <div className="project-header">
                <h3>{currentProject.title}</h3>
                {currentProject.link && (
                  <a
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary project-cta"
                  >
                    Launch ↗
                  </a>
                )}
              </div>
              <p className="project-description">{currentProject.description}</p>
              <p className="project-details">{currentProject.details}</p>
              {currentProject.features && (
                <div className="project-features">
                  <h4>Key Highlights</h4>
                  <ul>
                    {currentProject.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}
              <div className="tags">
                {currentProject.tags.map(tag => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="animate-on-scroll">
          <span className="section-label">Technical Matrix</span>
          <h2>Targeted Skills</h2>
          <div className="skills-grid">
            <div className="card skills-group animate-on-scroll">
              <div className="skills-icon">🗂️</div>
              <h3>GRC & Compliance</h3>
              <div className="skill-tags">
                {['NIST 800-53', 'NIST CSF', 'HIPAA', 'SOC 2', 'ISO 27001', 'I-9 Compliance', 'E-Verify', 'Workday', 'Audit & Risk Assessment'].map(s => (
                  <span key={s} className="skill-tag hris">{s}</span>
                ))}
              </div>
            </div>
            <div className="card skills-group animate-on-scroll">
              <div className="skills-icon">🛡️</div>
              <h3>Security & SOC</h3>
              <div className="skill-tags">
                {['CompTIA Security+', 'CompTIA CySA+', 'SIEM', 'Elastic Stack', 'pfSense', 'MITRE ATT&CK', 'Active Directory', 'Access Control', 'Incident Response'].map(s => (
                  <span key={s} className="skill-tag security">{s}</span>
                ))}
              </div>
            </div>
            <div className="card skills-group animate-on-scroll">
              <div className="skills-icon">⚙️</div>
              <h3>Tools & Automation</h3>
              <div className="skill-tags">
                {['Python', 'Power Automate', 'Linux', 'TCP/IP & VPN', 'Ticketing Systems', 'GRC Dashboards'].map(s => (
                  <span key={s} className="skill-tag it">{s}</span>
                ))}
              </div>
            </div>
          </div>
          {/* ATS keyword block – plain text for scrapers */}
          <p className="ats-keywords" aria-hidden="true">
            Keywords: NIST 800-53, NIST CSF, HIPAA, SOC 2, ISO 27001, I-9 Compliance, E-Verify,
            Workday, Active Directory, SIEM, Elastic Stack, pfSense, MITRE ATT&CK, GRC,
            Access Control, Audit, Risk Assessment, Python, Power Automate,
            CompTIA Security+, CompTIA CySA+, Information Security, GRC Analyst,
            Compliance Analyst, Cybersecurity Analyst
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="animate-on-scroll">
          <span className="section-label">Get in Touch</span>
          <div className="card contact-card">
            <h2>Let's build reliable systems together.</h2>
            <p>Seeking Information Security, GRC Analyst, or Compliance Analyst roles. CompTIA Security+ and CySA+ certified with live production platforms.</p>
            <div className="contact-links">
              <a href="mailto:osmanjalloh104@gmail.com" className="contact-link">
                <span className="contact-link-icon">✉</span>
                osmanjalloh104@gmail.com
              </a>
              <a href="tel:7377044182" className="contact-link">
                <span className="contact-link-icon">☎</span>
                737-704-4182
              </a>
              <a href="https://www.linkedin.com/in/osman-jalloh-a0680030a" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-link-icon">in</span>
                LinkedIn
              </a>
              <a href="https://github.com/osmanjalloh" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-link-icon">gh</span>
                GitHub
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
