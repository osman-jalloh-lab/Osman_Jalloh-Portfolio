export const NAME = 'Osman Jalloh';
export const ROLE_LABEL = 'Security & Compliance Professional';
export const ROLE_SUMMARY = "Security+ and CySA+ certified. I run federal compliance deadlines and enterprise IT operations for two organizations at once, then build the software that makes sure nothing falls through.";

export const CONTACT = {
  email: 'osmanjalloh104@gmail.com',
  schoolEmail: 'osman.jalloh@g.austincc.edu',
  phone: '737-704-4182',
  location: 'Austin, TX',
  linkedin: 'https://www.linkedin.com/in/osman-jalloh5858',
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
    idLine: 'Austin Community College, completed 5/18/2025',
    desc: 'Occupational Skills Award in computer networking, 12 credit hours.',
    img: '/certs/computer-networking-osa.png',
    document: '/certs/computer-networking-osa.pdf',
    tone: 4,
  },
  {
    id: 'programming-osa',
    stamp: 'ACC OSA',
    name: 'Computer Programming Occupational Skills Award',
    idLine: 'Austin Community College, completed 5/18/2025',
    desc: 'Occupational Skills Award in computer programming fundamentals, 12 credit hours.',
    img: '/certs/computer-programming-osa.png',
    tone: 0,
  },
  {
    id: 'ibm-grc',
    stamp: 'IBM VERIFIED',
    name: 'Cybersecurity Compliance Framework, Standards & Regulations',
    idLine: 'IBM, via Coursera, completed Jul 10, 2026',
    desc: 'Governance, risk, and compliance frameworks and regulatory standards, authorized by IBM Skills Network.',
    img: '/certs/ibm-grc-compliance-framework.png',
    document: '/certs/ibm-grc-compliance-framework.pdf',
    verifyUrl: 'https://coursera.org/verify/8E5HXBB3EK3L',
    tone: 1,
  },
  {
    id: 'google-ai-fundamentals',
    stamp: 'GOOGLE VERIFIED',
    name: 'AI Fundamentals',
    idLine: 'Google, via Coursera, completed Jul 10, 2026',
    desc: 'Online course authorized by Google and offered through Coursera.',
    img: '/certs/google-ai-fundamentals.png',
    document: '/certs/google-ai-fundamentals.pdf',
    verifyUrl: 'https://coursera.org/verify/MV3E9NSA825T',
    tone: 2,
  },
];

export const SUMMARY_PARAGRAPHS = [
  'I am a cybersecurity and IT professional based in Austin, TX. I hold CompTIA Security+ and CySA+ certifications, completed my degree in Network Systems and Cybersecurity from Austin Community College in May 2026 with a 3.9 GPA, and am currently pursuing my B.S. while working two roles simultaneously.',
  'My work spans three domains: security and compliance (NIST 800-53, HIPAA, I-9 compliance, E-Verify), IT operations (Tier 1/2 helpdesk, Active Directory, M365, workstation imaging), and AI-native development (full-stack web apps, LLM API integration, nine-agent AI operating system).',
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
    pitch: 'Nine-agent personal AI operating system. Built to automate everything.',
    stack: ['Next.js', 'Prisma', 'Turso', 'Claude API', 'Vercel', 'Telegram API'],
    status: 'IN DEVELOPMENT',
    github: 'https://github.com/osman-jalloh-lab/myos',
  },
  {
    no: '02',
    name: 'I-9 Compliance Hub',
    pitch: 'AI-powered I-9 and visa compliance platform. 1,300+ employees. Running in production at ACC.',
    stack: ['Next.js', 'Claude API', 'Perplexity AI', 'Power Automate', 'Netlify'],
    status: 'LIVE',
    live: 'https://visadata.netlify.app',
    github: 'https://github.com/osman-jalloh-lab/i9-Compliance-HUB',
  },
  {
    no: '03',
    name: 'Lavaal',
    pitch: 'Enterprise IT hardware platform for West Africa. Security audited. Production deployed.',
    stack: ['React', 'Node.js', 'REST APIs', 'Netlify', 'OWASP'],
    status: 'LIVE',
    github: 'https://github.com/osman-jalloh-lab/Lavaal-',
  },
  {
    no: '04',
    name: 'AI-literacy',
    pitch: 'AI companion and prompt toolkit for HR staff. Salary placement tool and rate calculator built in.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Express.js', 'Node.js'],
    status: 'LIVE',
    github: 'https://github.com/osman-jalloh-lab/AI-literacy-',
  },
];

export const SECURITY_LAB = [
  { label: 'Elastic Stack SIEM', desc: 'Real-time alert monitoring, log ingestion, and threat detection.' },
  { label: 'pfSense Firewall', desc: 'WAN/LAN/DMZ segmentation, IDS/IPS, and custom firewall rules.' },
  { label: 'Ubuntu Attack VMs', desc: 'MITRE ATT&CK-mapped attack simulations.' },
  { label: 'Python Scripts', desc: 'Custom detection logic, anomaly detection, and automated reporting.' },
  { label: 'MITRE ATT&CK', desc: 'Credential access, lateral movement, and persistence simulations.' },
  { label: 'VirtualBox', desc: 'Multi-VM isolated lab environment.' },
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
