import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  HERO, STATEMENT, STATS, MARQUEE, WORK, SKILLS, TOUR,
  EXPERIENCE, CREDENTIALS, CONTACT,
} from './content.js';
import './site.css';

gsap.registerPlugin(ScrollTrigger);

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Drive a <video> from scroll on desktop. Touch browsers (iOS Safari in
   particular) will not paint frames from currentTime seeks on a video that
   has never played, so there we play it muted on a loop while in view.
   The poster image underneath shows until the first frame is ready. */
const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

function mountVideo(video, trigger) {
  const ready = () => video.classList.add('is-ready');
  video.addEventListener('error', () => video.remove(), { once: true });
  if (isTouch()) {
    video.loop = true;
    video.addEventListener('playing', ready, { once: true });
    const play = () => video.play().catch(() => {});
    ScrollTrigger.create({
      trigger, start: 'top bottom', end: 'bottom top',
      onEnter: play, onEnterBack: play,
      onLeave: () => video.pause(), onLeaveBack: () => video.pause(),
    });
    return;
  }
  video.addEventListener('loadeddata', ready, { once: true });
  if (video.readyState >= 2) ready();
  let target = 0;
  let raf = 0;
  const tick = () => {
    raf = 0;
    if (!video.duration) return;
    const t = target * (video.duration - 0.05);
    if (Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
  };
  ScrollTrigger.create({
    trigger, start: 'top top', end: 'bottom bottom',
    onUpdate: (self) => {
      target = self.progress;
      if (!raf) raf = requestAnimationFrame(tick);
    },
  });
}

function Loader({ onDone }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced()) { onDone(); return; }
    const o = { v: 0 };
    const tl = gsap.timeline();
    tl.to(o, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => setN(Math.round(o.v)) })
      .to(ref.current.querySelector('.loader__name'), { yPercent: -110, duration: 0.5, ease: 'power3.in' }, '+=0.1')
      .to(ref.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', onComplete: onDone }, '-=0.15');
    return () => tl.kill();
  }, [onDone]);
  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="loader__mask"><div className="loader__name">Osman Jalloh</div></div>
      <div className="loader__n">{String(n).padStart(3, '0')}</div>
    </div>
  );
}

function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav__logo" aria-label="Back to top">OJ<span>.</span></a>
      <nav aria-label="Primary">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
      </nav>
      <a href={`mailto:${CONTACT.email}`} className="nav__cta">
        <i className="dot" aria-hidden="true" /> Let&rsquo;s talk
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" data-hero>
      <div className="hero__sticky">
        <div className="hero__media" data-hero-media>
          <img src={HERO.poster} alt="Osman Jalloh on the Lamar pedestrian bridge with the Austin skyline behind him" className="hero__img" />
          <video className="hero__video" data-hero-video src={HERO.video} muted playsInline preload="auto" aria-hidden="true" />
          <div className="hero__shade" />
        </div>
        <h1 className="hero__name" aria-label={`${HERO.first} ${HERO.last}`}>
          <span className="hero__line" data-hero-l><span className="split">{HERO.first}</span></span>
          <span className="hero__line hero__line--r" data-hero-r><span className="split">{HERO.last}</span></span>
        </h1>
        <div className="hero__meta" data-hero-meta>
          <p className="mono">{HERO.role}</p>
          <p className="mono">Based in {HERO.place}</p>
        </div>
        <div className="hero__end" data-hero-end>
          {HERO.tagline.map((t, i) => <p key={i} className="hero__tag">{i === 1 ? <em>{t}</em> : t}</p>)}
        </div>
        <div className="hero__hint mono" data-hero-hint>Scroll</div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-label="Skills and credentials">
      <div className="marquee__track" data-marquee>
        {row.map((t, i) => <span key={i}>{t}<i aria-hidden="true">✦</i></span>)}
      </div>
    </div>
  );
}

function About() {
  const words = STATEMENT.split(' ');
  return (
    <section className="about wrap" id="about">
      <p className="eyebrow mono">(About)</p>
      <p className="statement" data-words>
        {words.map((w, i) => <span key={i} className="w">{w} </span>)}
      </p>
      <div className="about__grid">
        <figure className="about__photo" data-parallax-wrap>
          <img src="/photo/osman-jacket.webp" alt="Osman Jalloh in a grey shell jacket" data-parallax loading="lazy" />
        </figure>
        <div className="about__side">
          <dl className="stats">
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <dt className="mono">{s.label}</dt>
                <dd><span data-count={s.value} data-dec={s.decimals || 0}>{s.value}</span>{s.suffix}</dd>
              </div>
            ))}
          </dl>
          <p className="about__p">
            Security+ and CySA+ certified, IBM-certified in compliance frameworks and Enterprise Design Thinking, finishing a B.S. in Network Systems and Cybersecurity.
            Long-term, I want to bring enterprise-grade compliance to small businesses and nonprofits that cannot afford an enterprise headcount.
          </p>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="work wrap" id="work">
      <div className="sec-head">
        <p className="eyebrow mono">(Selected work)</p>
        <h2 className="h2">Things I&rsquo;ve <em>shipped</em></h2>
      </div>
      <div className="stack">
        {WORK.map((w, i) => (
          <article className={`card card--${w.tone}`} key={w.no} style={{ '--i': i }} data-card>
            <div className={`card__inner ${w.img ? 'has-img' : ''}`}>
              {w.img && <figure className="card__img"><img src={w.img} alt={w.imgAlt} loading="lazy" /></figure>}
              <div className="card__top mono"><span>{w.no}</span><span>{w.kind}</span></div>
              <h3 className="card__name">{w.name}</h3>
              <p className="card__desc">{w.desc}</p>
              <div className="card__foot">
                <ul className="card__tags">{w.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                {w.link && <a className="card__link" href={w.link} target="_blank" rel="noreferrer">{w.cta} <span aria-hidden="true">↗</span></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Tour() {
  return (
    <section className="tour" data-tour aria-label="How I think">
      <div className="tour__sticky">
        <img className="tour__poster" src="/photo/osman-portrait.jpg" alt="" aria-hidden="true" />
        <video className="tour__video" data-tour-video src={TOUR.src} muted playsInline preload="auto" aria-hidden="true" />
        <div className="tour__shade" />
        <div className="tour__copy wrap">
          {TOUR.stages.map((s, i) => (
            <div className="tour__stage" key={i} data-stage={s.at}>
              <p className="mono">{s.kicker} / How I think</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="tour__bar"><i data-tour-bar /></div>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section className="exp wrap" id="experience">
      <div className="sec-head">
        <p className="eyebrow mono">(Experience)</p>
        <h2 className="h2">Where I&rsquo;ve <em>worked</em></h2>
      </div>
      <ol className="exp__list">
        {EXPERIENCE.map((e, i) => (
          <li key={e.title} className={`row ${open === i ? 'is-open' : ''}`} data-reveal>
            <button className="row__head" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="row__when mono">{e.when.replace(' to ', ' – ').replace('PRESENT', 'Now')}</span>
              <span className="row__title">{e.title}</span>
              <span className="row__org">{e.org}</span>
              <span className="row__icon" aria-hidden="true" />
            </button>
            <div className="row__body">
              <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills wrap" id="skills">
      <div className="sec-head">
        <p className="eyebrow mono">(Skills)</p>
        <h2 className="h2">The <em>toolkit</em></h2>
      </div>
      <div className="skills__grid">
        {SKILLS.map((g) => (
          <div className="skill-group" key={g.title} data-reveal>
            <h3 className="mono">{g.title}</h3>
            <ul>
              {g.items.map((s) => (
                <li key={s.name}>
                  <span>{s.name}</span>
                  <span className="lvl" aria-label={`${s.level} out of 5`}>
                    {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= s.level ? 'on' : ''} />)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section className="creds" data-creds aria-label="Credentials">
      <div className="creds__sticky">
        <div className="creds__head wrap">
          <p className="eyebrow mono">(Credentials)</p>
          <h2 className="h2">Earned, <em>not claimed</em></h2>
        </div>
        <div className="creds__track" data-creds-track>
          {CREDENTIALS.map((c, i) => (
            <article className="cred" key={c.id}>
              <div className="cred__n mono">{String(i + 1).padStart(2, '0')}</div>
              <div className="cred__img">
                {c.img ? <img src={c.img} alt={`${c.name} certificate`} loading="lazy" /> : <span className="cred__mark">{c.name}</span>}
              </div>
              <h3>{c.name}</h3>
              <p className="mono">{c.idLine}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const f = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' });
    const t = () => setTime(f.format(new Date()));
    t();
    const id = setInterval(t, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <p className="eyebrow mono">(Contact)</p>
        <h2 className="contact__big" data-reveal>
          Let&rsquo;s work <em>together</em>
        </h2>
        <div className="contact__grid">
          <a className="contact__mail" href={`mailto:${CONTACT.email}`}>{CONTACT.email}<span aria-hidden="true">→</span></a>
          <figure className="contact__photo"><img src="/photo/osman-bridge-side.webp" alt="Osman Jalloh on the bridge at sunset" loading="lazy" /></figure>
        </div>
        <footer className="foot mono">
          <span>© 2026 Osman Jalloh</span>
          <span>Austin {time} CT</span>
          <span className="foot__links">
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href="#top">Back to top ↑</a>
          </span>
        </footer>
      </div>
    </section>
  );
}

export default function Site() {
  const root = useRef(null);
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        const el = id === '#top' ? 0 : document.querySelector(id);
        if (el === null) return;
        e.preventDefault();
        lenis.scrollTo(el, { duration: 1.4 });
      }),
    );
    window.__lenis = lenis;
    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    const rm = reduced();
    const ctx = gsap.context(() => {
      /* hero intro */
      gsap.from('.hero__line .split', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08 });
      gsap.from('[data-hero-media]', { scale: 0.85, opacity: 0, duration: 1.2, ease: 'expo.out' });
      gsap.from('[data-hero-meta], .nav', { opacity: 0, y: 12, duration: 0.8, delay: 0.4 });

      /* counters */
      document.querySelectorAll('[data-count]').forEach((el) => {
        const end = +el.dataset.count, dec = +el.dataset.dec;
        const o = { v: 0 };
        const fmt = (v) => (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US'));
        el.textContent = fmt(rm ? end : 0);
        if (rm) return;
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(o.v)) }),
        });
      });
      if (rm) return;

      /* hero: card expands to full bleed, name splits, video scrubs */
      const mm = gsap.matchMedia();
      mm.add({ desk: '(min-width: 800px)', mob: '(max-width: 799px)' }, (c) => {
        const start = c.conditions.desk ? 'inset(20% 33% 20% 33% round 28px)' : 'inset(26% 14% 22% 14% round 22px)';
        gsap.set('[data-hero-media]', { clipPath: start });
        const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: '55% bottom', scrub: true } });
        tl.to('[data-hero-media]', { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' }, 0)
          .to('[data-hero-l]', { xPercent: -40, opacity: 0, ease: 'none' }, 0)
          .to('[data-hero-r]', { xPercent: 40, opacity: 0, ease: 'none' }, 0)
          .to('[data-hero-meta], [data-hero-hint]', { opacity: 0, ease: 'none', duration: 0.3 }, 0);
        gsap.fromTo('[data-hero-end] .hero__tag', { yPercent: 60, opacity: 0 }, {
          yPercent: 0, opacity: 1, stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: '[data-hero]', start: '55% bottom', end: '80% bottom', scrub: true },
        });
      });
      const hv = document.querySelector('[data-hero-video]');
      if (hv) mountVideo(hv, '[data-hero]');

      /* marquee drifts, speeds with scroll velocity */
      const track = document.querySelector('[data-marquee]');
      const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        onUpdate: (s) => {
          const v = gsap.utils.clamp(-6, 6, s.getVelocity() / 300);
          gsap.to(loop, { timeScale: 1 + Math.abs(v), duration: 0.3, overwrite: true });
        },
      });

      /* statement word reveal */
      gsap.fromTo('[data-words] .w', { opacity: 0.12 }, {
        opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: '[data-words]', start: 'top 80%', end: 'bottom 45%', scrub: true },
      });

      /* parallax photos */
      gsap.utils.toArray('[data-parallax]').forEach((img) => {
        gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, scrub: true } });
      });

      /* stacking work cards: earlier cards scale back as the next arrives */
      const cards = gsap.utils.toArray('[data-card]');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const st = { trigger: cards[i + 1], start: 'top bottom', end: 'top 15%', scrub: true };
        gsap.to(card.querySelector('.card__inner'), { scale: 0.94, ease: 'none', scrollTrigger: st });
        gsap.to(card.querySelectorAll('.card__inner > *'), { opacity: 0, ease: 'none', scrollTrigger: { ...st, start: 'top 70%' } });
      });

      /* tour: video scrub + stage captions */
      const tv = document.querySelector('[data-tour-video]');
      const stages = gsap.utils.toArray('[data-stage]');
      if (tv) mountVideo(tv, '[data-tour]');
      ScrollTrigger.create({
        trigger: '[data-tour]', start: 'top top', end: 'bottom bottom',
        onUpdate: (s) => {
          gsap.set('[data-tour-bar]', { scaleX: s.progress });
          let cur = 0;
          stages.forEach((st, k) => { if (s.progress >= +st.dataset.stage) cur = k; });
          stages.forEach((st, k) => st.classList.toggle('is-on', k === cur));
        },
      });
      stages[0]?.classList.add('is-on');

      /* reveals */
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });

      /* credentials: vertical scroll drives a horizontal track */
      const track2 = document.querySelector('[data-creds-track]');
      const dist = () => Math.max(0, track2.scrollWidth - window.innerWidth + 48);
      gsap.to(track2, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '[data-creds]', start: 'top top', end: () => `+=${dist()}`, pin: '.creds__sticky', scrub: true, invalidateOnRefresh: true },
      });
    }, root);
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [ready]);

  return (
    <div ref={root} className={`site ${ready ? 'is-ready' : ''}`}>
      {!ready && <Loader onDone={done} />}
      <a className="skip" href="#about">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Tour />
        <Experience />
        <Skills />
        <Credentials />
        <Contact />
      </main>
    </div>
  );
}
