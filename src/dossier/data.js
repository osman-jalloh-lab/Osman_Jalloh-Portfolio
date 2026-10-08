export const NAME = 'Osman Jalloh';
export const ROLE_LABEL = 'Security & Compliance Professional';
export const ROLE_SUMMARY = "Security+ and CySA+ certified. I hold federal compliance deadlines and enterprise IT operations, and I automate the parts that shouldn't depend on memory.";

export const CONTACT = {
  email: 'osmanjalloh104@gmail.com',
  schoolEmail: 'osman.jalloh@g.austincc.edu',
  phone: '737-704-4182',
  location: 'Austin, TX',
  linkedin: 'https://linkedin.com/in/osmanjalloh',
  github: 'https://github.com/osman-jalloh-lab',
};

export const CREDENTIALS = [
  {
    id: 'security-plus',
    stamp: 'SEC+ VERIFIED',
    name: 'CompTIA Security+',
    idLine: 'SY0-701, certified 2025',
    desc: 'Network security. Threats and vulnerabilities. Identity and access management. Cryptography.',
    img: '/certs/security-plus.png',
    tone: 0,
  },
  {
    id: 'cysa-plus',
    stamp: 'CySA+ VERIFIED',
    name: 'CompTIA CySA+',
    idLine: 'CS0-003, certified 2025',
    desc: 'Threat and vulnerability management. Security operations. Incident response.',
    img: '/certs/cysa-plus.png',
    tone: 1,
  },
  {
    id: 'csap',
    stamp: 'CSAP STACKABLE',
    name: 'CompTIA Security Analytics Professional',
    idLine: 'Stackable certification',
    desc: 'Awarded automatically for holding both Security+ and CySA+ concurrently.',
    img: '/certs/csap-badge.png',
    tone: 2,
  },
  {
    id: 'acc-cert',
    stamp: 'ACC VERIFIED',
    name: 'Certificate, IT & Cybersecurity',
    idLine: 'LAN Systems, Network Admin Level I, May 17, 2026',
    desc: 'Austin Community College, awarded with Scholastic Excellence Designation.',
    img: '/certs/acc-cybersecurity-cert.png',
    tone: 3,
  },
  {
    id: 'networking-osa',
    stamp: 'ACC OSA',
    name: 'Computer Networking Occupational Skills Award',
    idLine: 'Austin Community College',
    desc: 'Occupational Skills Award in computer networking fundamentals.',
    tone: 4,
  },
  {
    id: 'programming-osa',
    stamp: 'ACC OSA',
    name: 'Computer Programming Occupational Skills Award',
    idLine: 'Austin Community College',
    desc: 'Occupational Skills Award in computer programming fundamentals.',
    tone: 0,
  },
  {
    id: 'ibm-grc',
    stamp: 'IBM GRC IN PROGRESS',
    name: 'IBM GRC Certification',
    idLine: 'Capstone, final project underway',
    desc: 'Completing the final project for a governance, risk, and compliance certification through IBM.',
    tone: 1,
    pending: true,
  },
];

export const SUMMARY_PARAGRAPHS = [
  'I work where security, compliance, and operations meet. At Austin Community College I manage Form I-9 and E-Verify compliance across more than 1,300 employee records and 11 campuses, the kind of work where a missed federal deadline has real consequences. At the University of Texas System I deliver Tier 1 and Tier 2 enterprise support across identity, Microsoft 365, and endpoint management.',
  'Certified in Security+ and CySA+, working toward a bachelor’s in Network Systems and Cybersecurity at Austin Community College. Outside of work I build the tools I wish my own teams had, including a nine-agent AI operating system and a production I-9 compliance platform. My long-term direction is GRC consulting for organizations that need enterprise-grade compliance without an enterprise headcount.',
];

export const EXPERIENCE = [
  {
    when: 'MAY 2026 to PRESENT',
    title: 'Client Services Associate',
    org: 'University of Texas System, Office of the CIO',
    bullets: [
      'Deliver Tier 1 and Tier 2 enterprise support across identity and access, Microsoft 365, software licensing, and endpoint operations',
      'Resolved tickets across Tier 1 and Tier 2 categories, spanning account access, licensing, hardware, and print systems',
      'Root-caused a recurring uniFLOW/Canon badge-release failure that had previously been treated as random',
      'Image, set up, and deploy computers for new users',
    ],
  },
  {
    when: 'JUL 2024 to PRESENT',
    title: 'Human Resources Operations Specialist',
    org: 'Austin Community College, HR',
    bullets: [
      'Own Form I-9 and E-Verify compliance across 1,300+ records and 11 campuses',
      'Use Workday HCM daily for onboarding reports, terminations, staffing tables, name changes, and requisition reports',
      'Built the I-9 Compliance Hub, a production AI platform live at visadata.netlify.app',
      'Built a GRC automation pipeline using Python, Power Automate, and NIST 800-53 control mapping',
    ],
  },
  {
    when: 'OCT 2025 to DEC 2025',
    title: 'AI Systems Integrator Intern',
    org: 'Sports Media Inc., remote',
    bullets: [
      'Conducted market research and trend analysis using AI tools',
      'Owned digital marketing metrics and data quality',
      'Tested AI-generated social media content and strategy',
    ],
  },
  {
    when: 'JUN 2025 to AUG 2025',
    title: 'IT Cybersecurity Intern',
    org: 'Austin State Hospital',
    bullets: [
      'Handled account provisioning and access control in a 24/7 HIPAA environment',
      'Identified XSS and SQL injection vulnerabilities and documented findings',
      'Applied SDLC and Agile principles, with incident documentation in TeamDynamix',
    ],
  },
  {
    when: '2013 to DEC 2023',
    title: 'Social Media Manager & Sales Lead',
    org: 'Waylor Waylor',
    bullets: [
      'Built a CRM that grew sales 50% to $10K per month',
      'Expanded daily customer capacity from 25 to 50',
      'Managed social media, promotions, and supply chain communications',
    ],
  },
];

export const COMPETENCIES = [
  { title: 'Security & GRC', tone: 0, tags: ['NIST 800-53', 'Risk Assessment', 'MITRE ATT&CK', 'SOC Lab', 'HIPAA'] },
  { title: 'Compliance Operations', tone: 1, tags: ['Form I-9', 'E-Verify', 'Reverification', 'SOP Authorship'] },
  { title: 'IT Operations', tone: 2, tags: ['Tier 1/2 Support', 'Active Directory', 'M365', 'Endpoint Mgmt'] },
  { title: 'AI & Automation', tone: 3, tags: ['Claude API', 'Claude Code', 'ChatGPT', 'Power Automate', 'GitHub Actions'] },
  { title: 'Building', tone: 4, tags: ['React', 'Next.js', 'Node.js', 'Prisma', 'Vercel', 'Python'] },
];

export const PROJECTS = [
  {
    no: '01',
    name: 'Hermes OS',
    pitch: 'Nine-agent personal AI operating system, built to automate everything. Next.js, Prisma, Turso, Vercel.',
    link: 'https://github.com/osman-jalloh-lab/myos',
  },
  {
    no: '02',
    name: 'I-9 Compliance Hub',
    pitch: 'AI-powered compliance platform serving 1,300+ employees, live in production at Austin Community College.',
    link: 'https://visadata.netlify.app',
  },
  {
    no: '03',
    name: 'Lavaal',
    pitch: 'Enterprise IT hardware for the West Africa market, security audited against the OWASP Top 10.',
    link: 'https://github.com/osman-jalloh-lab/Lavaal-',
  },
];

export const EDUCATION = [
  { degree: 'B.S. Network Systems and Cybersecurity', school: 'Austin Community College', period: 'Expected May 2028', gpa: 'GPA 3.9' },
  { degree: 'A.S. Network Systems and Cybersecurity', school: 'Austin Community College', period: 'May 2026', gpa: 'GPA 3.9' },
];

export const VIDEOS = {
  hero: '/video/orbit.mp4',
  experience: '/video/builder.mp4',
  work: '/video/closer.mp4',
};

/* ════════════════════════════════════════════════════════════════
   Portfolio upgrade 2: additive exports only. Nothing above changed.
   ════════════════════════════════════════════════════════════════ */

/* 1. Talking hero video ("recorded statement")
   Drop your recording at public/video/intro.mp4 (under 30 seconds).
   Until that file exists the hero falls back to fallbackSrc (orbit.mp4).
   captions: timed lines drawn over the video, shape { start, end, text }
   with seconds. Leave empty until you have recorded and know the timing.
   vtt: optional path to a .vtt file for a native caption track. Use
   either captions or vtt, not both. */
export const INTRO_VIDEO = {
  src: '/video/intro.mp4',
  poster: '/photo/osman-portrait.jpg',
  fallbackSrc: VIDEOS.hero,
  captions: [],
  vtt: null,
};

/* 2. Credential badge (flipping ID card)
   Placeholder badge number, deliberately not a real ACC or UT ID.
   Change the format to anything you like, but do not use a real ID. */
export const BADGE_NO = 'OJ-2026-001';

export const CERT_BAR = 'CompTIA Security+ (SY0-701) | CompTIA CySA+ (CS0-003) | IBM GRC Framework | Google AI Fundamentals | A.S. Network Systems and Cybersecurity, May 2026';

/* 3. Periodic table of skills
   Built from COMPETENCIES, so adding a tag there adds a tile here.
   Each entry maps a tag to [two-character symbol, level 1 to 5].
   LEVELS ARE MY DRAFT. Adjust any number to match how you rate yourself.
   1 = familiar, 3 = working proficiency, 5 = daily expert. */
const SKILL_META = {
  'NIST 800-53': ['Ni', 3],
  'Risk Assessment': ['Ra', 3],
  'MITRE ATT&CK': ['At', 3],
  'SOC Lab': ['So', 3],
  'HIPAA': ['Hi', 3],
  'Form I-9': ['I9', 5],
  'E-Verify': ['Ev', 5],
  'Reverification': ['Rv', 4],
  'SOP Authorship': ['Sp', 4],
  'Tier 1/2 Support': ['T2', 4],
  'Active Directory': ['Ad', 3],
  'M365': ['M3', 4],
  'Endpoint Mgmt': ['Em', 3],
  'Claude API': ['Ca', 4],
  'Claude Code': ['Cc', 4],
  'ChatGPT': ['Cg', 4],
  'Power Automate': ['Pa', 4],
  'GitHub Actions': ['Ga', 2],
  'React': ['Rc', 4],
  'Next.js': ['Nx', 4],
  'Node.js': ['Nd', 3],
  'Prisma': ['Pr', 3],
  'Vercel': ['Vc', 4],
  'Python': ['Py', 3],
};

export const SKILL_ELEMENTS = COMPETENCIES.flatMap((group) =>
  group.tags.map((name) => {
    const [symbol, level] = SKILL_META[name] || [name.slice(0, 2), 1];
    return { symbol, name, category: group.title, tone: group.tone, level };
  }),
);

/* 4. Sideways-scrolling achievements ("case files")
   Every figure below is documented elsewhere in this file or in your
   master profile. Two numbers from the original spec are NOT here
   because nothing on file supports them: the hackathon prize amount
   and a count of 100+ Section 3 reverifications. Add them back to the
   matching stat or detail line once you have confirmed them. */
export const ACHIEVEMENTS = [
  {
    id: 'develop-u',
    caseNo: 'FILE 001',
    title: 'UFCU Develop U Hackathon',
    stat: '1st place',
    detail: 'Team VERIFIED, a randomly assigned cross-functional team. Built the VERIFIED onboarding concept and the Nova credit-product component that cuts repeated identity and eligibility checks for noncitizen members.',
  },
  {
    id: 'i9-hub',
    caseNo: 'FILE 002',
    title: 'I-9 Compliance Hub',
    stat: '1,300+ records',
    detail: 'Production platform live across 11 campuses at Austin Community College. SOPs, decision trees, and knowledge management in one place.',
  },
  {
    id: 'sec-cysa',
    caseNo: 'FILE 003',
    title: 'Security+ and CySA+',
    stat: '2 certifications',
    detail: 'CompTIA Security+ (SY0-701) and CySA+ (CS0-003), which together earn the CSAP stackable credential.',
  },
  {
    id: 'reverification',
    caseNo: 'FILE 004',
    title: 'I-9 reverification program',
    stat: '80-90% on time',
    detail: 'Proactive outreach 30 to 90 days before work authorization expires, covering multiple visa and EAD categories.',
  },
  {
    id: 'hermes-os',
    caseNo: 'FILE 005',
    title: 'Hermes OS',
    stat: '9 agents',
    detail: 'Personal AI operating system built on Next.js, Prisma, Turso, and Vercel, with additive-only change control.',
  },
];

/* UI strings for the four new patterns. */
export const UI_COPY = {
  statement: {
    label: 'Recorded statement',
    playHint: 'Tap to play with sound',
    stopHint: 'Tap to mute and loop',
    rec: 'REC',
    ariaPlay: 'Play recorded statement with sound',
    ariaStop: 'Mute recorded statement and return to the silent loop',
  },
  badge: {
    header: 'Credential / OJ-2026',
    badgeLabel: 'Badge no.',
    stamp: 'CLEARED',
    flipHint: 'Tap to flip',
    flipBackHint: 'Tap to flip back',
    contactTitle: 'Contact',
    certTitle: 'Certifications',
    ariaFlip: 'flip credential badge to see contact details',
    ariaFlipBack: 'Flip credential badge back to the front',
  },
  skills: {
    eyebrow: 'Core Competencies',
    note: 'Corner number is proficiency, 1 to 5. Tap a tile to highlight its group.',
    ariaLegend: 'Skill groups',
  },
  achievements: {
    eyebrow: 'Case Files',
    outcome: 'Outcome',
    notes: 'Notes',
    prev: 'Previous case file',
    next: 'Next case file',
    region: 'Achievements, scroll sideways',
  },
};
