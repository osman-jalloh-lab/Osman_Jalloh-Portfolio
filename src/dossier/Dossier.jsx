import { useCallback, useEffect, useRef, useState } from 'react';
import {
  NAME, ROLE_LABEL, ROLE_SUMMARY, CONTACT, CREDENTIALS, SUMMARY_PARAGRAPHS,
  EXPERIENCE, COMPETENCIES, PROJECTS, EDUCATION, VIDEOS,
  INTRO_VIDEO, BADGE_NO, CERT_BAR, SKILL_ELEMENTS, ACHIEVEMENTS, UI_COPY,
} from './data';
import './dossier.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Flips to true once the element first enters the viewport.
   Reduced motion, or no IntersectionObserver, means visible from the start. */
function useInView(ref) {
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined' || prefersReducedMotion(),
  );
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

function VideoPanel({ src, className }) {
  return (
    <div className={`video-panel ${className || ''}`}>
      <video autoPlay muted loop playsInline preload="auto">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

const clock = (s) => {
  const n = Number.isFinite(s) ? Math.max(0, Math.floor(s)) : 0;
  return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
};

/* Hero "recorded statement". Silent muted loop by default, tap for sound.
   If public/video/intro.mp4 is missing it falls back to the orbit hero. */
function IntroVideo() {
  const copy = UI_COPY.statement;
  const videoRef = useRef(null);
  const [reduce] = useState(prefersReducedMotion);
  const [fallback, setFallback] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [caption, setCaption] = useState('');

  const toAmbient = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.currentTime = 0;
    setPlaying(false);
    if (!reduce) v.play().catch(() => {});
  }, [reduce]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      toAmbient();
      return;
    }
    v.currentTime = 0;
    v.muted = false;
    v.loop = false;
    setPlaying(true);
    v.play().catch(toAmbient);
  };

  const onTime = (e) => {
    const t = e.currentTarget.currentTime;
    setTime(Math.floor(t));
    const line = INTRO_VIDEO.captions.find((c) => t >= c.start && t < c.end);
    setCaption(line ? line.text : '');
  };

  return (
    <div
      className="video-panel video-panel--hero statement"
      data-playing={playing}
      data-fallback={fallback}
    >
      <video
        ref={videoRef}
        src={fallback ? INTRO_VIDEO.fallbackSrc : INTRO_VIDEO.src}
        poster={fallback ? undefined : INTRO_VIDEO.poster}
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setFallback(true)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={onTime}
        onEnded={toAmbient}
      >
        {INTRO_VIDEO.vtt && !fallback && (
          <track kind="captions" src={INTRO_VIDEO.vtt} srcLang="en" label="English" default />
        )}
      </video>
      {!fallback && (
        <>
          <div className="statement__hud" aria-hidden="true">
            <span className="statement__rec"><i />{copy.rec}</span>
            <span className="statement__time">{clock(time)} / {clock(duration)}</span>
          </div>
          <div className="statement__foot" aria-hidden="true">{copy.label}</div>
          {caption && <div className="statement__caption">{caption}</div>}
          <button
            type="button"
            className="statement__toggle"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? copy.ariaStop : copy.ariaPlay}
          >
            <span className="statement__hint">{playing ? copy.stopHint : copy.playHint}</span>
          </button>
        </>
      )}
    </div>
  );
}

/* Credential badge. The front is a button, the back holds real links, so
   only the visible face is interactive (the other one is inert). */
function IdCard() {
  const copy = UI_COPY.badge;
  const [flipped, setFlipped] = useState(false);
  const certLines = CERT_BAR.split(' | ');
  const backClick = (e) => {
    if (!e.target.closest('a, button')) setFlipped(false);
  };
  const site = (url) => url.replace(/^https?:\/\//, '');

  return (
    <div className="idcard" data-flipped={flipped}>
      <div className="idcard__inner">
        <button
          type="button"
          className="idcard__face idcard__front"
          onClick={() => setFlipped(true)}
          inert={flipped}
          aria-label={`${NAME}, ${copy.ariaFlip}`}
        >
          <span className="idcard__slot" aria-hidden="true" />
          <span className="idcard__header">{copy.header}</span>
          <span className="idcard__photo">
            <img src="/photo/osman-portrait.jpg" alt="" />
            <span className="stamp stamp--lg idcard__stamp" data-tone="1"><span>{copy.stamp}</span></span>
          </span>
          <span className="idcard__name">{NAME}</span>
          <span className="idcard__role">{ROLE_LABEL}</span>
          <span className="idcard__no"><em>{copy.badgeLabel}</em> {BADGE_NO}</span>
          <span className="idcard__hint">{copy.flipHint} &#8635;</span>
        </button>

        <div
          className="idcard__face idcard__back"
          onClick={backClick}
          inert={!flipped}
        >
          <span className="idcard__slot" aria-hidden="true" />
          <span className="idcard__header">{copy.contactTitle}</span>
          <ul className="idcard__list">
            <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><a href={`tel:${CONTACT.phone.replace(/-/g, '')}`}>{CONTACT.phone}</a></li>
            <li>{CONTACT.location}</li>
            <li><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">{site(CONTACT.linkedin)}</a></li>
            <li><a href={CONTACT.github} target="_blank" rel="noreferrer">{site(CONTACT.github)}</a></li>
          </ul>
          <span className="idcard__header idcard__header--sub">{copy.certTitle}</span>
          <ul className="idcard__list idcard__list--certs">
            {certLines.map((line) => (<li key={line}>{line}</li>))}
          </ul>
          <button
            type="button"
            className="idcard__flipback"
            onClick={() => setFlipped(false)}
            aria-label={copy.ariaFlipBack}
          >
            {copy.flipBackHint} &#8634;
          </button>
        </div>
      </div>
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
        <IntroVideo />
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
      <IdCard />
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

/* Periodic table of skills. Hover (mouse) previews a group, tap or click
   pins it, tap again to clear. Works with touch and keyboard. */
function CompetenciesSection() {
  const copy = UI_COPY.skills;
  const [pinned, setPinned] = useState(null);
  const [hover, setHover] = useState(null);
  const active = hover ?? pinned;
  const toggle = (category) => setPinned((p) => (p === category ? null : category));
  const mouseOnly = (fn) => (e) => { if (e.pointerType === 'mouse') fn(); };

  return (
    <section className="wrap comp">
      <span className="eyebrow">{copy.eyebrow}</span>
      <div className="legend" role="group" aria-label={copy.ariaLegend}>
        {COMPETENCIES.map((group) => (
          <button
            type="button"
            className="legend__item"
            data-tone={group.tone}
            data-on={active === group.title}
            aria-pressed={pinned === group.title}
            onClick={() => toggle(group.title)}
            onPointerEnter={mouseOnly(() => setHover(group.title))}
            onPointerLeave={mouseOnly(() => setHover(null))}
            key={group.title}
          >
            <i />{group.title}
          </button>
        ))}
      </div>
      <p className="legend__note">{copy.note}</p>
      <div className="elements" data-filtering={active ? 'on' : 'off'}>
        {SKILL_ELEMENTS.map((el) => (
          <button
            type="button"
            className="element"
            data-tone={el.tone}
            data-on={active === el.category}
            aria-pressed={pinned === el.category}
            aria-label={`${el.name}, ${el.category}, level ${el.level} of 5`}
            onClick={() => toggle(el.category)}
            onPointerEnter={mouseOnly(() => setHover(el.category))}
            onPointerLeave={mouseOnly(() => setHover(null))}
            key={el.name}
          >
            <span className="element__lvl" aria-hidden="true">{el.level}</span>
            <span className="element__sym" aria-hidden="true">{el.symbol}</span>
            <span className="element__name" aria-hidden="true">{el.name}</span>
          </button>
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

/* Sideways case files. Native scroll-snap does the work on touch. Mouse
   gets drag-to-scroll and arrow buttons. No library. */
function AchievementsSection() {
  const copy = UI_COPY.achievements;
  const frameRef = useRef(null);
  const stripRef = useRef(null);
  const drag = useRef({ x: 0, left: 0, id: null });
  const inView = useInView(frameRef);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [dragging, setDragging] = useState(false);

  const measure = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 2;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const step = (dir) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector('.case');
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    const w = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = stripRef.current;
    drag.current = { x: e.clientX, left: el.scrollLeft, id: e.pointerId };
    el.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e) => {
    if (!dragging || drag.current.id !== e.pointerId) return;
    stripRef.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const endDrag = (e) => {
    if (!dragging) return;
    const el = stripRef.current;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  return (
    <section className="achv" id="achievements">
      <div className="wrap">
        <div className="achv__head">
          <span className="eyebrow">{copy.eyebrow}</span>
          <div className="achv__nav">
            <button type="button" className="achv__btn" onClick={() => step(-1)} disabled={edge.start} aria-label={copy.prev}>&#8592;</button>
            <button type="button" className="achv__btn" onClick={() => step(1)} disabled={edge.end} aria-label={copy.next}>&#8594;</button>
          </div>
        </div>
        <div
          ref={frameRef}
          className={`achv__frame ${inView ? 'is-in' : ''}`}
          data-start={edge.start}
          data-end={edge.end}
        >
          <div
            ref={stripRef}
            className="strip"
            role="region"
            aria-label={copy.region}
            tabIndex={0}
            data-dragging={dragging}
            onScroll={measure}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {ACHIEVEMENTS.map((a, i) => (
              <article className="case reveal-item" data-tone={i % 5} style={{ '--i': i }} key={a.id}>
                <span className="case__no">{a.caseNo}</span>
                <h3>{a.title}</h3>
                <div>
                  <div className="case__label">{copy.outcome}</div>
                  <div className="case__stat">{a.stat}</div>
                </div>
                <div>
                  <div className="case__label">{copy.notes}</div>
                  <p>{a.detail}</p>
                </div>
              </article>
            ))}
          </div>
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
        <AchievementsSection />
        <Footer />
      </main>
    </div>
  );
}
