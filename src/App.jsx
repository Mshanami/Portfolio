import { useState, useEffect } from 'react';
import {
  Terminal, MapPin, Mail, Phone, ExternalLink, GraduationCap, Award,
  Server, Code2, Wrench, Send, Circle, ChevronRight, Globe, Linkedin,
  Sparkles, BookOpen
} from 'lucide-react';

/* ---------------------------------------------------------------- */
/*  Data                                                              */
/* ---------------------------------------------------------------- */

const TERMINAL_LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'bongani_mngomezulu' },
  { type: 'cmd', text: 'cat role.txt' },
  { type: 'out', text: 'IT Specialist · Web Developer' },
  { type: 'cmd', text: 'locate --current' },
  { type: 'out', text: 'East London, Eastern Cape, South Africa' },
  { type: 'cmd', text: 'status --check' },
  { type: 'out', text: '\u25CF open to new opportunities', accent: true },
];

const SKILL_GROUPS = [
  {
    title: 'IT Support & Service Management',
    icon: Server,
    items: [
      { name: 'Hardware & software installation', level: 92 },
      { name: 'Service desk & desktop support', level: 90 },
      { name: 'Network configuration & troubleshooting', level: 82 },
      { name: 'ITIL service management principles', level: 80 },
      { name: 'Database management', level: 70 },
    ],
  },
  {
    title: 'Web Development',
    icon: Code2,
    items: [
      { name: 'WordPress CMS & cPanel', level: 90 },
      { name: 'HTML, CSS & JavaScript', level: 85 },
      { name: 'Website deployment & hosting', level: 85 },
      { name: 'SEO fundamentals', level: 70 },
    ],
  },
  {
    title: 'AI & Productivity Tools',
    icon: Sparkles,
    items: [
      { name: 'Microsoft Azure AI (apps & agents)', level: 75 },
      { name: 'Microsoft 365 administration', level: 88 },
      { name: 'Grammarly admin & onboarding', level: 85 },
      { name: 'AI literacy training & facilitation', level: 80 },
    ],
  },
];

const TOOLS = [
  'Microsoft 365', 'Microsoft Azure AI', 'WordPress', 'cPanel', 'Grammarly Admin',
  'Microsoft Bookings', 'WSU LibGuides', 'POS Systems', 'Git',
];

const SOFT_SKILLS = ['Excellent work ethic', 'Time management', 'Teamwork'];

const EXPERIENCE = [
  {
    version: 'v2025.03',
    status: 'active',
    role: 'Library IT Technician',
    org: 'Walter Sisulu University — Phyllis Ntantala Collaborative Library',
    period: 'Mar 2025 — Present · East London',
    points: [
      'Facilitate researchers and students on the use of AI for research, promoting responsible and ethical use of Generative AI tools in academic work',
      'Provide hands-on support for digital tools and platforms, including installing and configuring AI/research software and Grammarly access',
      'Develop user guides and WSU LibGuides to improve access to digital collections and services',
      'Manage Grammarly as an administrator — handling invitations, onboarding and usage compliance for staff and students',
      'Prepare training venues with the technology and materials facilitators need for staff and student sessions',
      'Built the library\u2019s Microsoft Bookings platform for venue bookings',
    ],
  },
  {
    version: 'v2023.09',
    status: 'done',
    role: 'Web and IT Technician',
    org: 'House 87',
    period: 'Sep 2023 — Jan 2025 · East London',
    points: [
      'Managed website updates, backups and security',
      'Worked in cPanel and WordPress CMS to manage development, hosting, domains and server configuration',
      'Provided technical support for POS systems, resolving transaction and hardware/software issues',
      'Troubleshot camera performance and connectivity issues',
      'Resolved hardware and software issues on desktops and network devices',
      'Administered Microsoft user accounts and email',
    ],
  },
  {
    version: 'v2023.02',
    status: 'active',
    role: 'Freelance Desktop Technician',
    org: 'Self-employed',
    period: 'Feb 2023 — Present · East London',
    points: [
      'Provide technical support to WSU students for desktop and laptop hardware, software and network issues',
      'Assist with system installations, software upgrades and configurations for academic needs',
      'Troubleshoot hardware failures, software glitches and connectivity issues promptly',
      'Advise on data backup, recovery and cybersecurity best practices',
      'Deliver affordable, reliable service that has built lasting trust with student clients',
    ],
  },
];

const EDUCATION = [
  {
    icon: GraduationCap,
    title: 'Advanced Diploma in Information Resource & Management',
    org: 'University of South Africa (UNISA)',
    period: 'Jan 2025 — Dec 2025',
    points: [
      'Service management frameworks (ITIL) — service design, delivery and improvement',
      'Identifying, resolving and preventing IT disruptions, including root cause analysis',
      'Network architecture, protocols and security; database design, management and optimization',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Diploma in Information & Communication Technology',
    org: 'Walter Sisulu University',
    period: 'Feb 2021 — Dec 2023 · Cum Laude',
    points: [
      'Hardware/software troubleshooting, network configuration and system maintenance',
      'IT service management principles and methodologies (ITIL)',
      'Introduction to data analytics and visualization using Python',
    ],
  },
  {
    icon: GraduationCap,
    title: 'National Senior Certificate',
    org: 'Inkosi Justice Nxumalo Technical High School',
    period: 'Jan 2020 — Dec 2020',
    points: [],
  },
];

const COURSES = [
  { name: 'Develop generative AI apps in Azure', org: 'Microsoft Learn', period: 'Feb 2026 — Mar 2026' },
  { name: 'Develop AI agents on Azure', org: 'Microsoft Learn', period: 'Feb 2026 — Mar 2026' },
  { name: 'Benefits and Risks of AI', org: 'Elsevier', period: 'Apr 2025' },
  { name: 'Data & Communication Networks', org: 'Cisco Academy', period: 'Feb 2022 — Nov 2023' },
  { name: 'JavaScript Data Structures & Algorithms', org: 'freeCodeCamp', period: 'Oct 2022 — Jan 2023' },
  { name: 'Responsive Web Design', org: 'freeCodeCamp', period: 'Feb 2022 — Jun 2022' },
  { name: 'IT Essentials', org: 'Cisco Academy', period: 'Mar 2021 — Dec 2021' },
];

const PROJECTS = [
  {
    title: 'Library Microsoft Bookings Platform',
    tag: 'Microsoft 365 · Service Design',
    desc: 'Built and rolled out the Microsoft Bookings system used for venue bookings at the Phyllis Ntantala Collaborative Library.',
    link: null,
  },
  {
    title: 'WSU LibGuides & Research Guides',
    tag: 'Documentation · AI Literacy',
    desc: 'Authored user guides and LibGuides helping researchers and students access digital collections and use Generative AI tools responsibly.',
    link: null,
  },
  {
    title: 'Client WordPress Sites',
    tag: 'WordPress · cPanel · SEO',
    desc: 'Managed development, hosting and server configuration for House 87 client sites — covering updates, backups, security and SEO.',
    link: null,
  },
  {
    title: 'Personal Developer Portfolio',
    tag: 'Web · Firebase',
    desc: 'An earlier personal site showcasing front-end and WordPress work, hosted on Firebase.',
    link: 'https://bongani-dev.web.app/',
  },
];

const NAV_ITEMS = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'education', label: 'education' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
];

/* ---------------------------------------------------------------- */
/*  Terminal intro animation                                          */
/* ---------------------------------------------------------------- */

function TerminalIntro() {
  const [rendered, setRendered] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[lineIdx];

    if (line.type === 'cmd') {
      if (charIdx <= line.text.length) {
        const t = setTimeout(() => setCharIdx((c) => c + 1), 32);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setRendered((r) => [...r, line]);
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, 220);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setRendered((r) => [...r, line]);
      setLineIdx((i) => i + 1);
    }, 280);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  const current = TERMINAL_LINES[lineIdx];
  const typingCmd = current && current.type === 'cmd' && charIdx <= current.text.length;
  const finished = lineIdx >= TERMINAL_LINES.length;

  return (
    <div className="pf-surface pf-mono" style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <div className="pf-term-bar">
        <span className="pf-dot" style={{ background: '#ff5f56' }} />
        <span className="pf-dot" style={{ background: '#ffbd2e' }} />
        <span className="pf-dot" style={{ background: '#27c93f' }} />
        <span className="pf-muted" style={{ marginLeft: '12px', fontSize: '12px' }}>
          bongani@portfolio: ~
        </span>
      </div>
      <div style={{ padding: '20px', minHeight: '210px', fontSize: '14px', lineHeight: '1.9' }}>
        {rendered.map((l, i) =>
          l.type === 'cmd' ? (
            <div key={i}>
              <span className="pf-accent">$</span> {l.text}
            </div>
          ) : (
            <div key={i} className={l.accent ? 'pf-accent' : ''} style={{ paddingLeft: '16px' }}>
              {l.accent && <span className="pf-pulse-dot" style={{ marginRight: '6px' }}>\u25CF</span>}
              {l.accent ? l.text.replace('\u25CF ', '') : l.text}
            </div>
          )
        )}
        {typingCmd && (
          <div>
            <span className="pf-accent">$</span> {current.text.slice(0, charIdx)}
            <span className="pf-blink">\u258C</span>
          </div>
        )}
        {finished && <span className="pf-blink">\u258C</span>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Small building blocks                                             */
/* ---------------------------------------------------------------- */

function SectionLabel({ index, title }) {
  return (
    <div className="pf-mono" style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '28px' }}>
      <span className="pf-accent" style={{ fontSize: '13px' }}>{index}</span>
      <h2 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.02em' }}>{title}</h2>
      <div style={{ flex: 1, height: '1px', background: '#1f2733' }} />
    </div>
  );
}

function Meter({ name, level }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '14px' }}>{name}</span>
        <span className="pf-mono pf-muted" style={{ fontSize: '12px' }}>{level}%</span>
      </div>
      <div className="pf-bar-track" style={{ height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
        <div className="pf-bar-fill" style={{ width: `${level}%`, height: '100%', borderRadius: '4px' }} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Main component                                                    */
/* ---------------------------------------------------------------- */

export default function Portfolio() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General inquiry', message: '' });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitTicket = () => {
    const subject = encodeURIComponent(`[Portfolio] ${form.subject} — ${form.name || 'New contact'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:mabongahbongani420@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

        .pf-root {
          background-color: #0a0e14;
          background-image: radial-gradient(circle, #1a212c 1px, transparent 1px);
          background-size: 28px 28px;
          color: #e3e8ef;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }
        .pf-mono { font-family: 'JetBrains Mono', monospace; }
        .pf-accent { color: #5eead4; }
        .pf-amber { color: #f5a623; }
        .pf-muted { color: #8694a6; }
        .pf-surface {
          background: #10151c;
          border: 1px solid #1f2733;
        }
        .pf-bar-track { background: #1c2330; }
        .pf-bar-fill { background: linear-gradient(90deg, #2dd4bf, #5eead4); }
        .pf-term-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: #161c26;
          border-bottom: 1px solid #1f2733;
        }
        .pf-dot { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }
        .pf-blink { animation: pf-blink 1s steps(2, start) infinite; color: #5eead4; }
        @keyframes pf-blink { to { visibility: hidden; } }
        .pf-pulse-dot { display: inline-block; animation: pf-pulse 1.8s ease-in-out infinite; }
        @keyframes pf-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .pf-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid #1f2733;
          color: #8694a6;
          background: #10151c;
        }
        .pf-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #8694a6;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 4px;
          transition: color 0.15s ease;
        }
        .pf-nav-link:hover { color: #5eead4; }
        .pf-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          border-radius: 6px;
          padding: 10px 18px;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.1s ease;
          border: 1px solid #1f2733;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .pf-btn:hover { opacity: 0.85; }
        .pf-btn:active { transform: scale(0.98); }
        .pf-btn-primary { background: #5eead4; color: #0a0e14; border-color: #5eead4; font-weight: 600; }
        .pf-btn-ghost { background: transparent; color: #e3e8ef; }
        .pf-input {
          width: 100%;
          background: #0a0e14;
          border: 1px solid #1f2733;
          border-radius: 6px;
          padding: 10px 12px;
          color: #e3e8ef;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .pf-input:focus { border-color: #5eead4; }
        .pf-card {
          background: #10151c;
          border: 1px solid #1f2733;
          border-radius: 10px;
          padding: 22px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .pf-card:hover { border-color: #2dd4bf; transform: translateY(-2px); }
        .pf-log-line { border-left: 2px solid #1f2733; padding-left: 20px; position: relative; }
        .pf-log-dot {
          position: absolute;
          left: -6px;
          top: 4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0a0e14;
          border: 2px solid #5eead4;
        }
        a.pf-link { color: #5eead4; text-decoration: none; border-bottom: 1px dotted #5eead4; }
        a.pf-link:hover { color: #99f6e9; }
        ::selection { background: #5eead4; color: #0a0e14; }
        @media (max-width: 720px) {
          .pf-hide-mobile { display: none; }
        }
      `}</style>

      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(8px)', background: 'rgba(10,14,20,0.75)', borderBottom: '1px solid #1f2733' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="pf-mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
            <Terminal size={16} className="pf-accent" />
            bongani@portfolio
          </div>
          <nav style={{ display: 'flex', gap: '4px' }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} className="pf-nav-link pf-hide-mobile" onClick={() => scrollTo(item.id)}>
                ./{item.label}
              </button>
            ))}
            <button className="pf-nav-link" onClick={() => scrollTo('contact')} style={{ color: '#5eead4' }}>
              <span className="pf-hide-mobile">./</span>contact →
            </button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 24px' }}>

        {/* HERO */}
        <section style={{ padding: '64px 0 56px', display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          <div>
            <div style={{ position: 'relative', width: '96px', height: '96px', marginBottom: '20px' }}>
              <img
                src="/profile.jpg"
                alt="Bongani Mngomezulu"
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #5eead4',
                  display: 'block',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#5eead4',
                  border: '3px solid #0a0e14',
                }}
                className="pf-pulse-dot"
              />
            </div>
            <div className="pf-mono pf-muted" style={{ fontSize: '13px', marginBottom: '10px', letterSpacing: '0.08em' }}>
              PORTFOLIO // EAST LONDON, SOUTH AFRICA
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px' }}>
              Bongani Mngomezulu
            </h1>
            <p style={{ fontSize: '18px', color: '#8694a6', maxWidth: '600px', marginBottom: '24px', lineHeight: 1.6 }}>
              IT Specialist and Web Developer with over two years in higher-education
              IT environments — service desk operations, computer labs, AI literacy
              training, and website deployment.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button className="pf-btn pf-btn-primary" onClick={() => scrollTo('experience')}>
                View experience <ChevronRight size={14} />
              </button>
              <button className="pf-btn pf-btn-ghost" onClick={() => scrollTo('contact')}>
                <Mail size={14} /> Get in touch
              </button>
            </div>
          </div>
          <TerminalIntro />
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: '40px 0' }}>
          <SectionLabel index="01" title="about" />
          <div className="pf-card">
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#c7d0db', marginBottom: '14px' }}>
              I'm a dedicated ICT professional with over two years of hands-on
              experience in higher-education environments, including technical
              support at Walter Sisulu University, alongside web and technical
              support roles. My work spans service desk operations, managing
              computer labs, desktop support, database management and website
              deployment.
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#c7d0db', marginBottom: '14px' }}>
              I hold a Diploma in Information &amp; Communication Technology (Cum
              Laude) from Walter Sisulu University and recently completed an
              Advanced Diploma in Information Resource Management from the
              University of South Africa — covering IT service management,
              network architecture and database administration. Combined with
              practical experience, this lets me provide effective technical
              solutions, maintain responsive systems and improve user experiences
              in academic settings.
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#c7d0db' }}>
              Based in East London, Eastern Cape, and eager to keep growing my
              career in IT support — particularly where AI literacy, service
              management and web skills can all come into play.
            </p>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ padding: '40px 0' }}>
          <SectionLabel index="02" title="skills" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {SKILL_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div className="pf-card" key={group.title}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <Icon size={18} className="pf-accent" />
                    <h3 className="pf-mono" style={{ fontSize: '14px', fontWeight: 600 }}>{group.title}</h3>
                  </div>
                  {group.items.map((item) => (
                    <Meter key={item.name} {...item} />
                  ))}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="pf-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Wrench size={18} className="pf-accent" />
                <h3 className="pf-mono" style={{ fontSize: '14px', fontWeight: 600 }}>Tools & platforms</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TOOLS.map((tool) => (
                  <span className="pf-tag" key={tool}>{tool}</span>
                ))}
              </div>
            </div>
            <div className="pf-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Award size={18} className="pf-accent" />
                <h3 className="pf-mono" style={{ fontSize: '14px', fontWeight: 600 }}>Working style</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SOFT_SKILLS.map((skill) => (
                  <span className="pf-tag" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ padding: '40px 0' }}>
          <SectionLabel index="03" title="experience" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {EXPERIENCE.map((job) => (
              <div className="pf-log-line" key={job.version}>
                <span className="pf-log-dot" />
                <div className="pf-mono pf-muted" style={{ fontSize: '12px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="pf-accent">{job.version}</span>
                  <span>{job.period}</span>
                  {job.status === 'active' && (
                    <span style={{ color: '#5eead4', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Circle size={8} fill="#5eead4" className="pf-pulse-dot" /> ongoing
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '2px' }}>{job.role}</h3>
                <div className="pf-muted" style={{ fontSize: '14px', marginBottom: '12px' }}>{job.org}</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: 0, listStyle: 'none' }}>
                  {job.points.map((point, i) => (
                    <li key={i} style={{ fontSize: '14px', color: '#c7d0db', lineHeight: 1.6, display: 'flex', gap: '10px' }}>
                      <span className="pf-accent pf-mono" style={{ flexShrink: 0 }}>›</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" style={{ padding: '40px 0' }}>
          <SectionLabel index="04" title="education & certifications" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {EDUCATION.map((edu) => {
              const Icon = edu.icon;
              return (
                <div className="pf-card" key={edu.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Icon size={20} className="pf-accent" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px', lineHeight: 1.4 }}>{edu.title}</h3>
                    <div className="pf-muted" style={{ fontSize: '13px', marginBottom: '4px' }}>{edu.org}</div>
                    {edu.period && (
                      <div className="pf-mono pf-amber" style={{ fontSize: '12px', marginBottom: edu.points.length ? '10px' : 0 }}>{edu.period}</div>
                    )}
                    {edu.points.length > 0 && (
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: 0, listStyle: 'none' }}>
                        {edu.points.map((point, i) => (
                          <li key={i} style={{ fontSize: '12.5px', color: '#8694a6', lineHeight: 1.5, display: 'flex', gap: '6px' }}>
                            <span className="pf-accent pf-mono" style={{ flexShrink: 0 }}>›</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pf-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <BookOpen size={18} className="pf-accent" />
              <h3 className="pf-mono" style={{ fontSize: '14px', fontWeight: 600 }}>Courses & training</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              {COURSES.map((course) => (
                <div key={course.name} style={{ borderLeft: '2px solid #1f2733', paddingLeft: '12px' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#e3e8ef', lineHeight: 1.4 }}>{course.name}</div>
                  <div className="pf-muted" style={{ fontSize: '12px', marginTop: '2px' }}>{course.org}</div>
                  <div className="pf-mono pf-amber" style={{ fontSize: '11px', marginTop: '2px' }}>{course.period}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{ padding: '40px 0' }}>
          <SectionLabel index="05" title="selected work" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {PROJECTS.map((project) => (
              <div className="pf-card" key={project.title}>
                <div className="pf-mono pf-tag" style={{ display: 'inline-block', marginBottom: '14px' }}>{project.tag}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{project.title}</h3>
                <p style={{ fontSize: '14px', color: '#8694a6', lineHeight: 1.6, marginBottom: project.link ? '14px' : 0 }}>
                  {project.desc}
                </p>
                {project.link && (
                  <a className="pf-link pf-mono" href={project.link} target="_blank" rel="noreferrer" style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    visit site <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
          <p className="pf-muted" style={{ fontSize: '13px', marginTop: '18px' }}>
            More projects and live links coming soon — get in touch for examples of recent work.
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: '40px 0 80px' }}>
          <SectionLabel index="06" title="contact" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="pf-card">
              <div className="pf-term-bar" style={{ margin: '-22px -22px 18px -22px', borderRadius: '10px 10px 0 0' }}>
                <span className="pf-dot" style={{ background: '#ff5f56' }} />
                <span className="pf-dot" style={{ background: '#ffbd2e' }} />
                <span className="pf-dot" style={{ background: '#27c93f' }} />
                <span className="pf-muted pf-mono" style={{ marginLeft: '12px', fontSize: '12px' }}>new_ticket.sh</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input
                  className="pf-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="pf-input"
                  placeholder="Your email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <select
                  className="pf-input"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  <option>General inquiry</option>
                  <option>Job opportunity</option>
                  <option>Freelance project</option>
                  <option>Other</option>
                </select>
                <textarea
                  className="pf-input"
                  placeholder="What can I help with?"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button className="pf-btn pf-btn-primary" onClick={submitTicket} style={{ justifyContent: 'center' }}>
                  <Send size={14} /> Submit ticket
                </button>
                <p className="pf-muted" style={{ fontSize: '12px', textAlign: 'center' }}>
                  Opens your email client — nothing is sent automatically.
                </p>
              </div>
            </div>

            <div className="pf-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={18} className="pf-accent" />
                <a className="pf-link" href="mailto:mabongahbongani420@gmail.com">mabongahbongani420@gmail.com</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={18} className="pf-accent" />
                <a className="pf-link" href="tel:+27607017420">060 701 7420</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Linkedin size={18} className="pf-accent" />
                <a className="pf-link" href="https://www.linkedin.com/in/bongani-mngomezulu-08b68b235/" target="_blank" rel="noreferrer">
                  linkedin.com/in/bongani-mngomezulu
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} className="pf-accent" />
                <span className="pf-muted">East London, Eastern Cape, South Africa</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Globe size={18} className="pf-accent" />
                <span className="pf-muted">Open to on-site, hybrid and remote roles</span>
              </div>
              <div className="pf-mono pf-tag" style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                <Circle size={8} fill="#5eead4" className="pf-pulse-dot" style={{ color: '#5eead4' }} />
                response time: usually within 24h
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid #1f2733', padding: '20px 24px' }}>
        <div className="pf-mono pf-muted" style={{ maxWidth: '1024px', margin: '0 auto', fontSize: '12px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span>© {new Date().getFullYear()} Bongani Mngomezulu</span>
          <span>status: <span className="pf-accent">online</span></span>
        </div>
      </footer>
    </div>
  );
}
