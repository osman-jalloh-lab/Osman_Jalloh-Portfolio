// v3 content. Pulls facts from the dossier data so there is one source of truth.
import { CONTACT, EXPERIENCE as OLD_EXPERIENCE, COMPETENCIES } from '../dossier/data.js';

export { CONTACT };

export const HERO = {
  first: 'Osman',
  last: 'Jalloh',
  role: 'Compliance, Audit & IT Operations',
  place: 'Austin, TX',
  // Higgsfield drone pull-back from the bridge photo. Falls back to the photo if missing.
  video: '/video/bridge.mp4',
  poster: '/photo/osman-bridge.webp',
  tagline: ['Compliance that holds.', 'Systems that run themselves.'],
};

export const STATEMENT =
  'I work where compliance, identity and IT operations meet. I audit identity and employment-eligibility records against federal controls for 1,300+ employees across 11 campuses, keep UT System endpoints compliant through Intune, and build the tools I wish my teams had. Controls first, evidence second, deadlines always.';

export const STATS = [
  { value: 1300, suffix: '+', label: 'I-9 records owned' },
  { value: 11, suffix: '', label: 'Campuses covered' },
  { value: 9, suffix: '', label: 'Credentials earned' },
  { value: 3.9, suffix: '', label: 'GPA', decimals: 1 },
];

export const MARQUEE = [
  'Security+', 'CySA+', 'Compliance Frameworks', 'NIST 800-53', 'Identity Governance', 'Intune',
  'E-Verify', 'Design Thinking', 'UX / UI', 'Higgsfield', 'Claude Code', 'Power Automate', 'M365',
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

const EXTRA = {
  'Security & GRC': ['Compliance Frameworks', 'Audit & Evidence'],
  'Compliance Operations': ['Identity Governance', 'Workday'],
  'IT Operations': ['Intune', 'Autopilot'],
  'Design & Creative': ['Design Thinking'],
};
Object.assign(LEVELS, {
  'Compliance Frameworks': 3, 'Audit & Evidence': 4, 'Identity Governance': 4, Workday: 5,
  Intune: 3, Autopilot: 3, 'Design Thinking': 4,
});

export const SKILLS = COMPETENCIES.map((g) => ({
  title: g.title,
  items: [...g.tags, ...(EXTRA[g.title] || [])].map((t) => ({ name: t, level: LEVELS[t] ?? 3 })),
}));

/* "How I think": a fly-through wall. Each layer sits deeper in 3D space and
   scrolling moves the camera forward through them. Tiles are placed around the
   edges (x, y in vw/vh from center) so the middle stays open like a tunnel. */
export const DEPTH = [
  {
    tiles: [
      { src: '/photo/osman-bridge.webp', x: -34, y: -18, w: 22, r: 6 },
      { src: '/photo/osman-jacket.webp', x: 33, y: 16, w: 20, r: -5 },
      { word: 'NIST 800-53', x: 30, y: -30 },
      { word: 'Identity', x: -30, y: 30 },
    ],
  },
  { chapter: { n: '01', title: 'Controls first.', body: 'Every process gets mapped to a control before it gets automated. Risk named, owner named, deadline named.' } },
  {
    tiles: [
      { src: '/certs/ibm-compliance.webp', x: 34, y: -20, w: 24, r: -4 },
      { src: '/photo/hackathon.webp', x: -35, y: 14, w: 18, r: 5 },
      { word: 'Audit-ready', x: -28, y: -32 },
      { word: 'E-Verify', x: 28, y: 32 },
    ],
  },
  { chapter: { n: '02', title: 'Evidence, always.', body: 'If it is not documented, it did not happen. SOPs people actually follow, records that survive an audit.' } },
  {
    tiles: [
      { src: '/photo/osman-bridge-side.webp', x: 33, y: 10, w: 17, r: -6 },
      { src: '/certs/security-plus.png', x: -33, y: -18, w: 20, r: 4 },
      { word: 'Intune', x: -26, y: 30 },
      { word: 'Claude Code', x: 26, y: -32 },
    ],
  },
  { chapter: { n: '03', title: 'Automate the memory.', body: 'When a deadline depends on someone remembering, I build the system instead. Python, Power Automate, Claude Code.' } },
  {
    tiles: [
      { src: '/certs/ibm-design-thinking.webp', x: -32, y: 18, w: 22, r: -3 },
      { src: '/photo/osman-portrait.jpg', x: 34, y: -16, w: 22, r: 5 },
      { word: 'Design Thinking', x: 26, y: 30 },
      { word: 'Python', x: -28, y: -30 },
    ],
  },
  { finale: { src: '/photo/osman-bridge.webp', title: 'Then I ship it.' } },
];

/* Experience, updated from LinkedIn (Oct 2026). Older roles carry over from the dossier. */
export const EXPERIENCE = [
  {
    when: 'MAY 2026 to PRESENT',
    title: 'Client Services Associate, Information Technology',
    org: 'The University of Texas System',
    bullets: [
      'Resolve Tier 1 and Tier 2 tickets across Windows, Mac and Microsoft 365: account and access management, endpoint configuration, licensing, networking and printing',
      'Administer Microsoft Intune device enrollment and compliance policies so devices meet UT System security standards before they reach users',
      'Deploy and remove software with admin credentials so every change is authorized and auditable under UT System IT policy',
      'Diagnosed a recurring uniFLOW/Canon badge-release failure and escalated it with a structured technical summary',
      'Documented an Autopilot enrollment failure (0x80180014) with full context before it spread to more users',
      'Image and deploy Windows and Mac workstations, and run IT asset lifecycle: pickup, delivery, surplus and inventory',
    ],
  },
  {
    when: 'JUL 2024 to PRESENT',
    title: 'HR Specialist IV, Compliance, Audit & Identity Governance',
    org: 'Austin Community College',
    bullets: [
      'Audit employment-eligibility and identity-verification records for gaps, exceptions, expiration risk and regulatory issues',
      'Evaluate records against federal requirements and internal controls, keeping documentation audit-ready',
      'Investigate complex cases in employment authorization, identity documentation and reverification',
      'Run compliance monitoring and evidence collection in Workday, E-Verify and case-management systems',
      'Write SOPs, internal guidance and training that tighten control consistency and cut compliance risk',
      'Built the I-9 Compliance Hub and a GRC automation pipeline mapped to NIST 800-53',
    ],
  },
  ...OLD_EXPERIENCE.slice(2),
];

/* Credentials with real certificate images. */
export const CREDENTIALS = [
  { id: 'sec', name: 'CompTIA Security+', idLine: 'SY0-701', img: '/certs/security-plus.png' },
  { id: 'cysa', name: 'CompTIA CySA+', idLine: 'CS0-003', img: '/certs/cysa-plus.png' },
  { id: 'csap', name: 'CompTIA Security Analytics Professional', idLine: 'Stackable, Security+ and CySA+', img: '/certs/csap-badge.png' },
  { id: 'ibm-comp', name: 'Cybersecurity Compliance Framework, Standards & Regulations', idLine: 'IBM via Coursera, Jul 2026', img: '/certs/ibm-compliance.webp' },
  { id: 'ibm-edt', name: 'Enterprise Design Thinking Practitioner', idLine: 'IBM SkillsBuild, Aug 2026', img: '/certs/ibm-design-thinking.webp' },
  { id: 'google-ai', name: 'AI Fundamentals', idLine: 'Google via Coursera, Jul 2026', img: '/certs/google-ai.webp' },
  { id: 'acc-cert', name: 'Certificate, IT & Cybersecurity', idLine: 'ACC, May 2026, Scholastic Excellence', img: '/certs/acc-cybersecurity-cert.png' },
  { id: 'osa-net', name: 'Occupational Skills Award, Computer Networking', idLine: 'ACC, May 2025', img: '/certs/acc-osa-networking.webp' },
  { id: 'osa-prog', name: 'Occupational Skills Award, Computer Programming', idLine: 'ACC, May 2025', img: '/certs/acc-osa-programming.webp' },
];
