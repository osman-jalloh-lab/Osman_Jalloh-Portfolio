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
