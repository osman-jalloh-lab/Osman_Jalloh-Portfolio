// v3 content. Pulls facts from the dossier data so there is one source of truth.
import { CONTACT, EXPERIENCE, COMPETENCIES, CREDENTIALS } from '../dossier/data.js';

export { CONTACT, EXPERIENCE, CREDENTIALS };

export const HERO = {
  first: 'Osman',
  last: 'Jalloh',
  role: 'Security, GRC & IT Operations',
  place: 'Austin, TX',
  // Higgsfield drone pull-back from the bridge photo. Falls back to the photo if missing.
  video: '/video/bridge.mp4',
  poster: '/photo/osman-bridge.webp',
  tagline: ['Compliance that holds.', 'Systems that run themselves.'],
};

export const STATEMENT =
  'I work where security, compliance and operations meet. I hold federal deadlines for 1,300+ employees across 11 campuses, run enterprise support for the UT System, and build the tools I wish my teams had. Controls first, evidence second, deadlines always.';

export const STATS = [
  { value: 1300, suffix: '+', label: 'I-9 records owned' },
  { value: 11, suffix: '', label: 'Campuses covered' },
  { value: 7, suffix: '', label: 'Credentials earned' },
  { value: 3.9, suffix: '', label: 'GPA', decimals: 1 },
];

export const MARQUEE = [
  'Security+', 'CySA+', 'IBM GRC', 'NIST 800-53', 'E-Verify', 'UX / UI Design',
  'Higgsfield', 'Claude Code', 'Power Automate', 'Next.js', 'MITRE ATT&CK', 'M365',
];

export const WORK = [
  {
    no: '01',
    name: 'I-9 Compliance Hub',
    kind: 'Production platform',
    desc: 'AI-powered compliance hub serving 1,300+ employee records across 11 Austin Community College campuses. SOPs, decision trees and knowledge management in one place.',
    tags: ['AI', 'Compliance', 'Netlify'],
    link: 'https://visadata.netlify.app',
    cta: 'Visit live site',
    tone: 'blue',
  },
  {
    no: '02',
    name: 'Hermes OS',
    kind: 'Personal AI operating system',
    desc: 'Nine-agent system built to automate everything, with additive-only change control so nothing breaks quietly.',
    tags: ['Next.js', 'Prisma', 'Turso', 'Vercel'],
    link: 'https://github.com/osman-jalloh-lab/myos',
    cta: 'View on GitHub',
    tone: 'ink',
  },
  {
    no: '03',
    name: 'VERIFIED',
    kind: 'UFCU Develop U Hackathon, 1st place',
    desc: 'Onboarding concept and the Nova credit-product component that cut repeated identity and eligibility checks for noncitizen members.',
    tags: ['Fintech', 'UX', 'Team build'],
    img: '/photo/hackathon.webp',
    imgAlt: 'Osman holding the UFCU Develop U first place check',
    tone: 'mint',
  },
  {
    no: '04',
    name: 'Lavaal',
    kind: 'B2B storefront',
    desc: 'Enterprise IT hardware for the West Africa market, security audited against the OWASP Top 10.',
    tags: ['E-commerce', 'OWASP', 'Security audit'],
    link: 'https://github.com/osman-jalloh-lab/Lavaal-',
    cta: 'View on GitHub',
    tone: 'warm',
  },
];

const LEVELS = {
  'NIST 800-53': 3, 'Risk Assessment': 3, 'MITRE ATT&CK': 3, 'SOC Lab': 3, HIPAA: 3,
  'Form I-9': 5, 'E-Verify': 5, Reverification: 4, 'SOP Authorship': 4,
  'Tier 1/2 Support': 4, 'Active Directory': 3, M365: 4, 'Endpoint Mgmt': 3,
  'Claude API': 4, 'Claude Code': 4, ChatGPT: 4, 'Power Automate': 4, 'GitHub Actions': 2,
  React: 4, 'Next.js': 4, 'Node.js': 3, Prisma: 3, Vercel: 4, Python: 3,
  'UX Design': 4, 'UI Design': 4, Higgsfield: 4, 'AI Video': 3,
};

export const SKILLS = COMPETENCIES.map((g) => ({
  title: g.title,
  items: g.tags.map((t) => ({ name: t, level: LEVELS[t] ?? 3 })),
}));

export const TOUR = {
  src: '/video/inside.mp4',
  stages: [
    { at: 0.0, kicker: '01', title: 'The person', body: 'Security and compliance professional in Austin. Calm under deadlines, loud about controls.' },
    { at: 0.3, kicker: '02', title: 'The method', body: 'Risk mapped to NIST 800-53. Evidence kept. Compliance turned into systems people can actually follow.' },
    { at: 0.62, kicker: '03', title: 'The build', body: 'When a process depends on memory, I automate it. Python, Power Automate, Claude Code.' },
  ],
};
