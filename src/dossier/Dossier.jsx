import {
  NAME, ROLE_LABEL, ROLE_SUMMARY, CONTACT, CREDENTIALS, SUMMARY_PARAGRAPHS,
  EXPERIENCE, COMPETENCIES, PROJECTS, SECURITY_LAB, EDUCATION, VIDEOS,
} from './data';
import { useEffect, useState } from 'react';
import './dossier.css';

function VideoPanel({ src, className }) {
  return (
    <div className={`video-panel ${className || ''}`}>
      <video autoPlay muted loop playsInline preload="auto">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function Masthead() {
  return (
    <header className="masthead">
      <div className="wrap masthead__row">
        <span className="masthead__id">FILE / OJ-2026 / AUSTIN, TX</span>
        <nav className="masthead__nav">
          <a href="#credentials">Credentials</a>
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
          <a href="#security-lab">Lab</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <div className="hero__label">{ROLE_LABEL}</div>
          <h1 className="hero__name">{NAME}</h1>
          <p className="hero__role">{ROLE_SUMMARY}</p>
          <div className="hero__meta">
            <div><strong>Status</strong><span className="status"><i className="dot" />Open to opportunities</span></div>
            <div><strong>Based in</strong>{CONTACT.location}</div>
            <div><strong>Focus</strong>Security &amp; GRC / Compliance / IT Ops</div>
          </div>
          <div className="hero__actions">
            <a className="btn btn--solid" href={`mailto:${CONTACT.email}`}>Email me</a>
            <a className="btn btn--ghost" href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn btn--ghost" href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <VideoPanel src={VIDEOS.hero} className="video-panel--hero" />
      </div>
    </section>
  );
}

function Credentials() {
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    if (!activeCertificate) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActiveCertificate(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('certificate-viewer-open');
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.classList.remove('certificate-viewer-open');
    };
  }, [activeCertificate]);

  return (
    <>
      <section className="wrap seals" id="credentials">
        <div className="seals__head">
          <span className="eyebrow">Verified Credentials</span>
          <span className="status"><i className="dot" />Active</span>
        </div>
        <div className="seals__grid">
          {CREDENTIALS.map((c) => (
            <div className="seal-card" data-tone={c.tone} key={c.id}>
              <div className="seal-card__top">
                <div className={`stamp ${c.pending ? 'pending' : ''}`}><span>{c.stamp}</span></div>
                <div className="seal-card__body">
                  <strong>{c.name}</strong>
                  <div className="id">{c.idLine}</div>
                  <p>{c.desc}</p>
                </div>
              </div>
              {(c.document || c.img || c.verifyUrl) && (
                <div className="seal-card__links">
                  {c.verifyUrl && <a href={c.verifyUrl} target="_blank" rel="noreferrer">Verify credential &#8594;</a>}
                  {(c.document || c.img) && (
                    <button type="button" onClick={() => setActiveCertificate({ name: c.name, url: c.img || c.document })}>
                      View certificate &#8594;
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {activeCertificate && (
        <div className="certificate-viewer" role="dialog" aria-modal="true" aria-label={`${activeCertificate.name} certificate viewer`} onMouseDown={(event) => event.target === event.currentTarget && setActiveCertificate(null)}>
          <div className="certificate-viewer__panel">
            <div className="certificate-viewer__head">
              <div>
                <span className="eyebrow">Credential file</span>
                <strong>{activeCertificate.name}</strong>
              </div>
              <button type="button" onClick={() => setActiveCertificate(null)} aria-label="Close certificate viewer">Close</button>
            </div>
            <div className="certificate-viewer__document">
              {activeCertificate.url.endsWith('.pdf') ? (
                <iframe src={`${activeCertificate.url}#toolbar=0&navpanes=0&scrollbar=1`} title={`${activeCertificate.name} certificate`} />
              ) : (
                <img src={activeCertificate.url} alt={`${activeCertificate.name} certificate`} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Summary() {
  return (
    <section className="wrap summary">
      <div className="summary__grid">
        <span className="eyebrow">About</span>
        <div>
          {SUMMARY_PARAGRAPHS.map((p) => (<p key={p}>{p}</p>))}
          <div className="current-roles" aria-label="Current roles">
            <span className="current-roles__label">Current roles</span>
            {EXPERIENCE.slice(0, 2).map((role) => (
              <div className="current-role" key={role.title}>
                <span className="current-role__dot" aria-hidden="true" />
                <div>
                  <strong>{role.title}</strong>
                  <span>{role.org}</span>
                  <time>{role.when}</time>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="ledger" id="experience">
      <div className="wrap">
        <span className="eyebrow">Experience</span>
        <VideoPanel src={VIDEOS.experience} className="video-panel--banner" />
        <div className="ledger__list">
          {EXPERIENCE.map((exp) => (
            <div className="entry" key={exp.title + exp.org}>
              <div className="entry__when">{exp.when}</div>
              <div>
                <div className="entry__title">{exp.title}</div>
                <div className="entry__org">{exp.org}</div>
                <ul>
                  {exp.bullets.map((b) => (<li key={b}>{b}</li>))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetenciesSection() {
  return (
    <section className="wrap comp">
      <span className="eyebrow">Core Competencies</span>
      <div className="comp__grid">
        {COMPETENCIES.map((group) => (
          <div className="comp__group" data-tone={group.tone} key={group.title}>
            <h3>{group.title}</h3>
            <div className="tag-row">
              {group.tags.map((t) => (<span className="tag" key={t}>{t}</span>))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="wrap education">
      <span className="eyebrow">Education</span>
      <div className="education__grid">
        {EDUCATION.map((ed) => (
          <div className="education-row" key={ed.degree}>
            <div className="education-degree">{ed.degree}</div>
            <div className="education-school">{ed.school}</div>
            <div className="education-period">{ed.period}, {ed.gpa}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <span className="eyebrow">Selected Work</span>
        <VideoPanel src={VIDEOS.work} className="video-panel--banner" />
        <div className="work__grid">
          {PROJECTS.map((proj) => (
            <article className="proj" key={proj.no}>
              <div className="proj__head">
                <span className="proj__no">{proj.no}</span>
                <span className={`proj__status ${proj.status === 'LIVE' ? 'is-live' : 'is-building'}`}>{proj.status}</span>
              </div>
              <h3>{proj.name}</h3>
              <p>{proj.pitch}</p>
              <div className="proj__stack" aria-label={`${proj.name} technology stack`}>
                {proj.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="proj__actions">
                {proj.live && <a href={proj.live} target="_blank" rel="noreferrer">Live</a>}
                <a href={proj.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecurityLabSection() {
  return (
    <section className="security-lab" id="security-lab">
      <div className="wrap">
        <span className="eyebrow">Security Lab</span>
        <p className="security-lab__intro">Self-built cybersecurity home lab running on VirtualBox with multi-VM architecture.</p>
        <div className="security-lab__grid">
          {SECURITY_LAB.map((item) => (
            <article className="lab-card" key={item.label}>
              <div className="lab-card__title"><i aria-hidden="true" />{item.label}</div>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="wrap" id="contact">
      <div className="footer__grid">
        <h2>Hiring for security, GRC, or IT operations?</h2>
        <div className="footer__links">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/osman-jalloh5858</a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer">github.com/osman-jalloh-lab</a>
          <span>{CONTACT.location}</span>
        </div>
      </div>
      <div className="footer__meta">
        <span>Osman Jalloh, 2026</span>
        <span>Last verified July 2026</span>
      </div>
    </footer>
  );
}

export default function Dossier() {
  return (
    <div className="dossier-root">
      <Masthead />
      <main>
        <Hero />
        <Credentials />
        <Summary />
        <ExperienceSection />
        <CompetenciesSection />
        <EducationSection />
        <WorkSection />
        <SecurityLabSection />
        <Footer />
      </main>
    </div>
  );
}
