import {
  NAME, ROLE_LABEL, ROLE_SUMMARY, CONTACT, CREDENTIALS, SUMMARY_PARAGRAPHS,
  EXPERIENCE, COMPETENCIES, PROJECTS, EDUCATION, VIDEOS,
} from './data';
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
  return (
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
            {c.img && (
              <div className="seal-card__links">
                <a href={c.img} target="_blank" rel="noreferrer">View certificate &#8594;</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Summary() {
  return (
    <section className="wrap summary">
      <div className="summary__grid">
        <span className="eyebrow">Summary</span>
        <div>
          {SUMMARY_PARAGRAPHS.map((p) => (<p key={p}>{p}</p>))}
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
            <a className="proj" href={proj.link} target="_blank" rel="noreferrer" key={proj.no}>
              <div className="proj__no">{proj.no}</div>
              <h3>{proj.name}</h3>
              <p>{proj.pitch}</p>
              <span className="proj__arrow">View project &#8594;</span>
            </a>
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
          <a href={`tel:${CONTACT.phone.replace(/-/g, '')}`}>{CONTACT.phone}</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a>
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
        <Footer />
      </main>
    </div>
  );
}
