import { useState, useEffect, useRef } from 'react';
import {
  Terminal, MapPin, Mail, Phone, ExternalLink, GraduationCap, Award,
  Server, Code2, Wrench, Send, Circle, ChevronRight, Globe, Linkedin,
  Sparkles, BookOpen, Menu, X, Home, Briefcase, User, FolderOpen
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────── */

const TERMINAL_LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'bongani_mngomezulu' },
  { type: 'cmd', text: 'cat role.txt' },
  { type: 'out', text: 'IT Specialist · Web Developer' },
  { type: 'cmd', text: 'locate --current' },
  { type: 'out', text: 'East London, Eastern Cape, ZA' },
  { type: 'cmd', text: 'status --check' },
  { type: 'out', text: '● open to new opportunities', accent: true },
];

const SKILL_GROUPS = [
  {
    title: 'IT Support & Service Management', icon: Server,
    items: [
      { name: 'Hardware & software installation', level: 92 },
      { name: 'Service desk & desktop support', level: 90 },
      { name: 'Network configuration', level: 82 },
      { name: 'ITIL service management', level: 80 },
      { name: 'Database management', level: 70 },
    ],
  },
  {
    title: 'Web Development', icon: Code2,
    items: [
      { name: 'WordPress CMS & cPanel', level: 90 },
      { name: 'HTML, CSS & JavaScript', level: 85 },
      { name: 'Website deployment & hosting', level: 85 },
      { name: 'SEO fundamentals', level: 70 },
    ],
  },
  {
    title: 'AI & Productivity Tools', icon: Sparkles,
    items: [
      { name: 'Microsoft Azure AI', level: 75 },
      { name: 'Microsoft 365 administration', level: 88 },
      { name: 'Grammarly admin & onboarding', level: 85 },
      { name: 'AI literacy training', level: 80 },
    ],
  },
];

const TOOLS = ['Microsoft 365','Microsoft Azure AI','WordPress','cPanel','Grammarly Admin','Microsoft Bookings','WSU LibGuides','POS Systems','Git'];
const SOFT_SKILLS = ['Excellent work ethic','Time management','Teamwork'];

const EXPERIENCE = [
  {
    version: 'v2025.03', status: 'active',
    role: 'Library IT Technician',
    org: 'Walter Sisulu University — Phyllis Ntantala Library',
    period: 'Mar 2025 — Present',
    points: [
      'Facilitate researchers and students on responsible use of Generative AI tools in academic work',
      'Provide hands-on support for digital tools, AI/research software and Grammarly access',
      'Develop user guides and WSU LibGuides for digital collections and services',
      'Manage Grammarly as admin — invitations, onboarding and usage compliance',
      'Prepare training venues with technology and materials for staff/student sessions',
      'Built the library\'s Microsoft Bookings platform for venue bookings',
    ],
  },
  {
    version: 'v2023.09', status: 'done',
    role: 'Web and IT Technician',
    org: 'House 87',
    period: 'Sep 2023 — Jan 2025',
    points: [
      'Managed website updates, backups and security',
      'Used cPanel and WordPress CMS for development, hosting, domains and server config',
      'Provided technical support for POS systems',
      'Resolved hardware and software issues on desktops and network devices',
      'Administered Microsoft user accounts and email',
    ],
  },
  {
    version: 'v2023.02', status: 'active',
    role: 'Freelance Desktop Technician',
    org: 'Self-employed',
    period: 'Feb 2023 — Present',
    points: [
      'Technical support for WSU students — hardware, software and network issues',
      'System installations, upgrades and configurations for academic needs',
      'Data backup, recovery and cybersecurity best practices guidance',
    ],
  },
];

const EDUCATION = [
  {
    icon: GraduationCap,
    title: 'Advanced Diploma in Information Resource & Management',
    org: 'University of South Africa (UNISA)',
    period: 'Jan 2025 — Dec 2025',
    points: ['ITIL service design, delivery and improvement','Root cause analysis and IT disruption prevention','Network architecture, security and database optimization'],
  },
  {
    icon: GraduationCap,
    title: 'Diploma in Information & Communication Technology',
    org: 'Walter Sisulu University',
    period: 'Feb 2021 — Dec 2023 · Cum Laude',
    points: ['Hardware/software troubleshooting and system maintenance','IT service management (ITIL)','Data analytics and visualization using Python'],
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
  { name: 'Develop generative AI apps in Azure', org: 'Microsoft Learn', period: 'Feb–Mar 2026' },
  { name: 'Develop AI agents on Azure', org: 'Microsoft Learn', period: 'Feb–Mar 2026' },
  { name: 'Benefits and Risks of AI', org: 'Elsevier', period: 'Apr 2025' },
  { name: 'Data & Communication Networks', org: 'Cisco Academy', period: '2022–2023' },
  { name: 'JavaScript Data Structures & Algorithms', org: 'freeCodeCamp', period: '2022–2023' },
  { name: 'Responsive Web Design', org: 'freeCodeCamp', period: '2022' },
  { name: 'IT Essentials', org: 'Cisco Academy', period: '2021' },
];

const PROJECTS = [
  { title: 'Library Microsoft Bookings Platform', tag: 'Microsoft 365 · Service Design', desc: 'Built and rolled out the Microsoft Bookings system for venue bookings at the Phyllis Ntantala Collaborative Library.', link: null },
  { title: 'WSU LibGuides & Research Guides', tag: 'Documentation · AI Literacy', desc: 'Authored user guides and LibGuides helping researchers access digital collections and use Generative AI responsibly.', link: null },
  { title: 'Client WordPress Sites', tag: 'WordPress · cPanel · SEO', desc: 'Managed development, hosting and server config for House 87 client sites — updates, backups, security and SEO.', link: null },
  { title: 'Personal Developer Portfolio', tag: 'Web · Firebase', desc: 'Earlier personal site showcasing front-end and WordPress work, hosted on Firebase.', link: 'https://bongani-dev.web.app/' },
];

const NAV_ITEMS = [
  { id: 'about', label: 'about', Icon: User },
  { id: 'skills', label: 'skills', Icon: Wrench },
  { id: 'experience', label: 'experience', Icon: Briefcase },
  { id: 'education', label: 'education', Icon: GraduationCap },
  { id: 'projects', label: 'projects', Icon: FolderOpen },
  { id: 'contact', label: 'contact', Icon: Mail },
];

/* ─── useInView ─────────────────────────────────────────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── Reveal wrapper ─────────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Terminal ───────────────────────────────────────────────────── */
function TerminalIntro() {
  const [rendered, setRendered] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[lineIdx];
    if (line.type === 'cmd') {
      if (charIdx <= line.text.length) { const t = setTimeout(() => setCharIdx(c => c + 1), 32); return () => clearTimeout(t); }
      const t = setTimeout(() => { setRendered(r => [...r, line]); setLineIdx(i => i + 1); setCharIdx(0); }, 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setRendered(r => [...r, line]); setLineIdx(i => i + 1); }, 260);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);
  const current = TERMINAL_LINES[lineIdx];
  const typing = current && current.type === 'cmd' && charIdx <= current.text.length;
  const done = lineIdx >= TERMINAL_LINES.length;
  return (
    <div className="pf-surface pf-mono pf-term-glow" style={{ borderRadius: '10px', overflow: 'hidden' }}>
      <div className="pf-term-bar">
        <span className="pf-dot" style={{ background: '#ff5f56' }} />
        <span className="pf-dot" style={{ background: '#ffbd2e' }} />
        <span className="pf-dot" style={{ background: '#27c93f' }} />
        <span className="pf-muted" style={{ marginLeft: '10px', fontSize: '12px' }}>bongani@portfolio: ~</span>
      </div>
      <div style={{ padding: '16px', minHeight: '180px', fontSize: '13px', lineHeight: 1.9 }}>
        {rendered.map((l, i) => l.type === 'cmd'
          ? <div key={i} style={{ animation: 'pfFadeIn .3s ease' }}><span className="pf-accent">$</span> {l.text}</div>
          : <div key={i} className={l.accent ? 'pf-accent' : ''} style={{ paddingLeft: '14px', animation: 'pfFadeIn .3s ease' }}>
              {l.accent && <span className="pf-pulse" style={{ marginRight: 6 }}>●</span>}
              {l.accent ? l.text.replace('● ', '') : l.text}
            </div>
        )}
        {typing && <div><span className="pf-accent">$</span> {current.text.slice(0, charIdx)}<span className="pf-blink">▌</span></div>}
        {done && <span className="pf-blink">▌</span>}
      </div>
    </div>
  );
}

/* ─── Skill meter ────────────────────────────────────────────────── */
function Meter({ name, level, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontSize: '13px' }}>{name}</span>
        <span className="pf-mono pf-muted" style={{ fontSize: '11px' }}>{level}%</span>
      </div>
      <div className="pf-bar-bg" style={{ height: '5px', borderRadius: '3px', overflow: 'hidden' }}>
        <div className="pf-bar-fill" style={{ width: inView ? `${level}%` : '0%', height: '100%', borderRadius: '3px', transition: `width 1s cubic-bezier(.4,0,.2,1) ${delay}ms` }} />
      </div>
    </div>
  );
}

/* ─── Section label ──────────────────────────────────────────────── */
function SectionLabel({ index, title }) {
  return (
    <div className="pf-mono" style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '24px' }}>
      <span className="pf-accent" style={{ fontSize: '12px' }}>{index}</span>
      <h2 style={{ fontSize: '20px', fontWeight: 700 }}>{title}</h2>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,#2dd4bf22,transparent)' }} />
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General inquiry', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const submitTicket = () => {
    const s = encodeURIComponent(`[Portfolio] ${form.subject} — ${form.name || 'New contact'}`);
    const b = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:mabongahbongani420@gmail.com?subject=${s}&body=${b}`;
  };

  return (
    <div className="pf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        .pf-root {
          background-color: #0a0e14;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(94,234,212,.08) 0%, transparent 60%),
            radial-gradient(circle, #1a212c 1px, transparent 1px);
          background-size: 100% 100%, 28px 28px;
          color: #e3e8ef;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .pf-mono  { font-family: 'JetBrains Mono', monospace; }
        .pf-accent{ color: #5eead4; }
        .pf-amber { color: #f5a623; }
        .pf-muted { color: #8694a6; }

        .pf-surface   { background: #10151c; border: 1px solid #1f2733; }
        .pf-term-glow { box-shadow: 0 0 40px rgba(94,234,212,.06); }

        .pf-bar-bg   { background: #1c2330; }
        .pf-bar-fill { background: linear-gradient(90deg,#2dd4bf,#5eead4,#99f6e4); }

        .pf-term-bar {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 14px; background: #161c26; border-bottom: 1px solid #1f2733;
        }
        .pf-dot { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }

        .pf-blink { animation: pfBlink 1s steps(2,start) infinite; color: #5eead4; }
        @keyframes pfBlink { to { visibility: hidden; } }

        .pf-pulse { display: inline-block; animation: pfPulse 1.8s ease-in-out infinite; }
        @keyframes pfPulse { 0%,100%{opacity:1} 50%{opacity:.35} }

        @keyframes pfFadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pfHeroUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pfHeroScale { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
        @keyframes pfRingSpin { to { transform: rotate(360deg); } }
        @keyframes pfFloat { from{transform:translateY(100vh) scale(0);opacity:0} 10%{opacity:.4} 90%{opacity:.4} to{transform:translateY(-10vh) scale(1);opacity:0} }

        .pf-hero-1 { animation: pfHeroUp .65s ease .10s both; }
        .pf-hero-2 { animation: pfHeroUp .65s ease .22s both; }
        .pf-hero-3 { animation: pfHeroUp .65s ease .36s both; }
        .pf-hero-4 { animation: pfHeroUp .65s ease .50s both; }
        .pf-hero-t { animation: pfHeroScale .65s ease .62s both; }
        .pf-hero-p { animation: pfHeroUp .6s ease .06s both; }
        .pf-ring   { animation: pfRingSpin 8s linear infinite; }

        /* Tags */
        .pf-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          padding: 4px 10px; border-radius: 999px;
          border: 1px solid #1f2733; color: #8694a6; background: #10151c;
          transition: border-color .2s, color .2s; display: inline-block;
        }
        .pf-tag:hover { border-color: #5eead4; color: #5eead4; }

        /* Cards */
        .pf-card {
          background: #10151c; border: 1px solid #1f2733;
          border-radius: 10px; padding: 20px;
          transition: border-color .25s, transform .25s, box-shadow .25s;
          position: relative; overflow: hidden;
        }
        .pf-card::before {
          content:''; position: absolute; inset:0;
          background: radial-gradient(circle at top left, rgba(94,234,212,.04), transparent 60%);
          opacity: 0; transition: opacity .3s;
        }
        .pf-card:hover { border-color: #2dd4bf; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,.3); }
        .pf-card:hover::before { opacity: 1; }

        /* Timeline */
        .pf-timeline { border-left: 2px solid #1f2733; padding-left: 20px; position: relative; }
        .pf-tdot {
          position: absolute; left: -6px; top: 4px;
          width: 10px; height: 10px; border-radius: 50%;
          background: #0a0e14; border: 2px solid #5eead4; transition: box-shadow .3s;
        }
        .pf-timeline:hover .pf-tdot { box-shadow: 0 0 0 4px rgba(94,234,212,.2); }

        /* Buttons */
        .pf-btn {
          font-family: 'JetBrains Mono', monospace; font-size: 13px;
          border-radius: 6px; padding: 12px 20px;
          cursor: pointer; border: 1px solid #1f2733;
          display: inline-flex; align-items: center; gap: 8px;
          transition: opacity .15s, transform .15s, box-shadow .2s;
          -webkit-tap-highlight-color: transparent;
        }
        .pf-btn:active { transform: scale(.97); }
        .pf-btn-primary { background: #5eead4; color: #0a0e14; border-color: #5eead4; font-weight: 700; }
        .pf-btn-primary:hover { box-shadow: 0 0 20px rgba(94,234,212,.35); opacity: .92; }
        .pf-btn-ghost   { background: transparent; color: #e3e8ef; }
        .pf-btn-ghost:hover { border-color: #5eead4; color: #5eead4; }

        /* Inputs */
        .pf-input {
          width: 100%; background: #0a0e14; border: 1px solid #1f2733; border-radius: 6px;
          padding: 12px 14px; color: #e3e8ef;
          font-family: 'Inter', sans-serif; font-size: 16px; /* 16px prevents iOS zoom */
          outline: none; transition: border-color .2s, box-shadow .2s;
          -webkit-appearance: none; appearance: none;
        }
        .pf-input:focus { border-color: #5eead4; box-shadow: 0 0 0 3px rgba(94,234,212,.1); }

        /* Nav */
        .pf-nav-btn {
          font-family: 'JetBrains Mono', monospace; font-size: 13px;
          color: #8694a6; background: none; border: none; cursor: pointer;
          padding: 8px 6px; transition: color .2s; position: relative;
          -webkit-tap-highlight-color: transparent;
        }
        .pf-nav-btn::after {
          content:''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; background: #5eead4; transform: scaleX(0); transition: transform .2s;
        }
        .pf-nav-btn:hover { color: #5eead4; }
        .pf-nav-btn:hover::after { transform: scaleX(1); }

        /* Mobile drawer */
        .pf-drawer {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(10,14,20,.97);
          backdrop-filter: blur(16px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px;
          transition: opacity .25s, visibility .25s;
        }
        .pf-drawer-item {
          font-family: 'JetBrains Mono', monospace; font-size: 22px; font-weight: 600;
          color: #8694a6; background: none; border: none; cursor: pointer;
          padding: 14px 40px; border-radius: 8px; width: 100%; max-width: 280px; text-align: center;
          transition: color .2s, background .2s;
          -webkit-tap-highlight-color: transparent;
        }
        .pf-drawer-item:hover, .pf-drawer-item:active { color: #5eead4; background: rgba(94,234,212,.06); }

        /* Bottom nav (mobile only) */
        .pf-bottom-nav {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 30;
          background: rgba(10,14,20,.95); backdrop-filter: blur(12px);
          border-top: 1px solid #1f2733;
          padding: 8px 0 max(8px, env(safe-area-inset-bottom));
        }
        .pf-bnav-item {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;
          background: none; border: none; cursor: pointer; color: #8694a6;
          font-family: 'JetBrains Mono', monospace; font-size: 9px;
          padding: 4px 0; transition: color .2s;
          -webkit-tap-highlight-color: transparent;
        }
        .pf-bnav-item:hover, .pf-bnav-item.active { color: #5eead4; }

        /* Particles */
        .pf-particle {
          position: fixed; border-radius: 50%; background: #5eead4;
          pointer-events: none; z-index: 0; animation: pfFloat linear infinite;
        }

        a.pf-link { color: #5eead4; text-decoration: none; border-bottom: 1px dotted #5eead4; transition: color .2s; word-break: break-all; }
        a.pf-link:hover { color: #99f6e9; }
        ::selection { background: #5eead4; color: #0a0e14; }

        /* ── Mobile breakpoints ── */
        @media (max-width: 640px) {
          .pf-desktop-nav { display: none !important; }
          .pf-bottom-nav  { display: flex; }
          .pf-mobile-menu-btn { display: flex !important; }
          .pf-main { padding: 0 16px; }
          .pf-hero { padding: 40px 0 32px; gap: 24px; }
          .pf-hero-name { font-size: 36px !important; }
          .pf-hero-btns { flex-direction: column; }
          .pf-hero-btns .pf-btn { justify-content: center; }
          .pf-section { padding: 28px 0; }
          .pf-about-grid { grid-template-columns: 1fr !important; }
          .pf-card { padding: 16px; }
          .pf-pb-mobile { padding-bottom: 80px; }
        }

        @media (min-width: 641px) {
          .pf-mobile-menu-btn { display: none !important; }
        }
      `}</style>

      {/* Particles */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="pf-particle" style={{ width:`${2+i}px`, height:`${2+i}px`, left:`${10+i*18}%`, animationDuration:`${13+i*4}s`, animationDelay:`${i*2.2}s`, opacity:.12 }} />
      ))}

      {/* ── NAV ── */}
      <header style={{ position:'sticky', top:0, zIndex:20, backdropFilter:'blur(12px)', background: navScrolled ? 'rgba(10,14,20,.95)' : 'rgba(10,14,20,.6)', borderBottom:`1px solid ${navScrolled ? '#1f2733' : 'transparent'}`, transition:'background .3s, border-color .3s' }}>
        <div style={{ maxWidth:'1024px', margin:'0 auto', padding:'12px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div className="pf-mono" style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'14px', fontWeight:600 }}>
            <Terminal size={15} color="#5eead4" />
            <span>bongani<span style={{color:'#5eead4'}}>@</span>portfolio</span>
          </div>

          {/* Desktop nav */}
          <nav className="pf-desktop-nav" style={{ display:'flex', gap:'2px' }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} className="pf-nav-btn" onClick={() => scrollTo(item.id)}>
                ./{item.label}
              </button>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className="pf-mobile-menu-btn"
            style={{ background:'none', border:'none', cursor:'pointer', color:'#e3e8ef', padding:'6px', alignItems:'center', gap:'6px' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <div className="pf-drawer" style={{ opacity: menuOpen ? 1 : 0, visibility: menuOpen ? 'visible' : 'hidden' }}>
        <button style={{ position:'absolute', top:16, right:20, background:'none', border:'none', cursor:'pointer', color:'#e3e8ef' }} onClick={() => setMenuOpen(false)}>
          <X size={24} />
        </button>
        <div className="pf-mono pf-muted" style={{ fontSize:'12px', marginBottom:'16px', letterSpacing:'.1em' }}>NAVIGATE</div>
        {NAV_ITEMS.map((item, i) => (
          <button key={item.id} className="pf-drawer-item" onClick={() => scrollTo(item.id)} style={{ animation: menuOpen ? `pfFadeIn .3s ease ${i*60}ms both` : 'none' }}>
            ./{item.label}
          </button>
        ))}
      </div>

      {/* ── MAIN ── */}
      <main className="pf-main pf-pb-mobile" style={{ maxWidth:'1024px', margin:'0 auto', padding:'0 24px', position:'relative', zIndex:1 }}>

        {/* HERO */}
        <section className="pf-hero" style={{ padding:'60px 0 52px', display:'grid', gridTemplateColumns:'1fr', gap:'32px', opacity: heroVisible ? 1 : 0, transition:'opacity .3s' }}>
          <div>
            {/* Avatar */}
            <div className="pf-hero-p" style={{ position:'relative', width:'96px', height:'96px', marginBottom:'20px' }}>
              <svg className="pf-ring" style={{ position:'absolute', inset:'-8px', width:'calc(100% + 16px)', height:'calc(100% + 16px)' }} viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="56" fill="none" stroke="#5eead4" strokeWidth="1.5" strokeDasharray="8 6" opacity=".5" />
              </svg>
              <img src="/profile.jpg" alt="Bongani Mngomezulu" style={{ width:'96px', height:'96px', borderRadius:'50%', objectFit:'cover', border:'2px solid #5eead4', display:'block' }} />
              <span className="pf-pulse" style={{ position:'absolute', bottom:0, right:0, width:'18px', height:'18px', borderRadius:'50%', background:'#5eead4', border:'3px solid #0a0e14' }} />
            </div>

            <div className="pf-mono pf-muted pf-hero-1" style={{ fontSize:'12px', marginBottom:'10px', letterSpacing:'.08em' }}>PORTFOLIO // EAST LONDON, ZA</div>
            <h1 className="pf-hero-2 pf-hero-name" style={{ fontSize:'clamp(34px,7vw,54px)', fontWeight:800, lineHeight:1.1, marginBottom:'14px' }}>
              Bongani<br /><span style={{color:'#5eead4'}}>Mngomezulu</span>
            </h1>
            <p className="pf-hero-3" style={{ fontSize:'clamp(15px,2vw,18px)', color:'#8694a6', maxWidth:'540px', marginBottom:'24px', lineHeight:1.7 }}>
              IT Specialist &amp; Web Developer with 2+ years in higher-education IT —
              service desk, computer labs, AI literacy training and website deployment.
            </p>
            <div className="pf-hero-4 pf-hero-btns" style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <button className="pf-btn pf-btn-primary" onClick={() => scrollTo('experience')}>View experience <ChevronRight size={14} /></button>
              <button className="pf-btn pf-btn-ghost"   onClick={() => scrollTo('contact')}><Mail size={14} /> Get in touch</button>
            </div>
          </div>
          <div className="pf-hero-t"><TerminalIntro /></div>
        </section>

        {/* ABOUT */}
        <section id="about" className="pf-section" style={{ padding:'36px 0' }}>
          <Reveal><SectionLabel index="01" title="about" /></Reveal>
          <div className="pf-about-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'24px', alignItems:'start' }}>
            <Reveal delay={100}>
              <div className="pf-card" style={{ height:'100%' }}>
                <p style={{ fontSize:'15px', lineHeight:1.8, color:'#c7d0db', marginBottom:'14px' }}>
                  I'm a dedicated ICT professional with over two years of hands-on experience in higher-education
                  environments, including technical support at Walter Sisulu University alongside web and IT roles.
                  My work spans service desk operations, managing computer labs, desktop support, database management
                  and website deployment.
                </p>
                <p style={{ fontSize:'15px', lineHeight:1.8, color:'#c7d0db', marginBottom:'14px' }}>
                  I hold a Diploma in ICT (Cum Laude) from WSU and recently completed an Advanced Diploma in
                  Information Resource Management from UNISA — covering ITIL, network architecture and database
                  administration.
                </p>
                <p style={{ fontSize:'15px', lineHeight:1.8, color:'#c7d0db' }}>
                  Based in East London, Eastern Cape. Open to roles where AI literacy, service management and web
                  skills all come into play.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                <div style={{ position:'relative', borderRadius:'12px', overflow:'hidden', border:'1px solid #1f2733', lineHeight:0 }}>
                  <img src="/about-main.jpg" alt="Bongani at WSU Library" style={{ width:'100%', display:'block', objectFit:'cover', maxHeight:'340px', transition:'transform .5s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform='scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'18px 14px 12px', background:'linear-gradient(to top,rgba(10,14,20,.85),transparent)' }}>
                    <span className="pf-mono" style={{ fontSize:'12px', color:'#5eead4' }}>@ WSU Phyllis Ntantala Library</span>
                  </div>
                </div>
                <div style={{ position:'relative', borderRadius:'12px', overflow:'hidden', border:'1px solid #1f2733', lineHeight:0 }}>
                  <img src="/about-secondary.jpg" alt="Bongani in East London" style={{ width:'100%', display:'block', objectFit:'cover', maxHeight:'220px', objectPosition:'top', transition:'transform .5s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform='scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'18px 14px 12px', background:'linear-gradient(to top,rgba(10,14,20,.85),transparent)' }}>
                    <span className="pf-mono" style={{ fontSize:'12px', color:'#5eead4' }}>@ East London, Eastern Cape</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="pf-section" style={{ padding:'36px 0' }}>
          <Reveal><SectionLabel index="02" title="skills" /></Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'16px', marginBottom:'16px' }}>
            {SKILL_GROUPS.map((group, gi) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.title} delay={gi * 90}>
                  <div className="pf-card">
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                      <Icon size={17} color="#5eead4" />
                      <h3 className="pf-mono" style={{ fontSize:'13px', fontWeight:600 }}>{group.title}</h3>
                    </div>
                    {group.items.map((item, ii) => <Meter key={item.name} {...item} delay={gi * 70 + ii * 70} />)}
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'16px' }}>
            <Reveal delay={80}>
              <div className="pf-card">
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}><Wrench size={17} color="#5eead4" /><h3 className="pf-mono" style={{ fontSize:'13px', fontWeight:600 }}>Tools & platforms</h3></div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>{TOOLS.map(t => <span className="pf-tag" key={t}>{t}</span>)}</div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="pf-card">
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}><Award size={17} color="#5eead4" /><h3 className="pf-mono" style={{ fontSize:'13px', fontWeight:600 }}>Working style</h3></div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>{SOFT_SKILLS.map(s => <span className="pf-tag" key={s}>{s}</span>)}</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="pf-section" style={{ padding:'36px 0' }}>
          <Reveal><SectionLabel index="03" title="experience" /></Reveal>
          <div style={{ display:'flex', flexDirection:'column', gap:'32px' }}>
            {EXPERIENCE.map((job, i) => (
              <Reveal key={job.version} delay={i * 110}>
                <div className="pf-timeline">
                  <span className="pf-tdot" />
                  <div className="pf-mono pf-muted" style={{ fontSize:'11px', marginBottom:'6px', display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' }}>
                    <span className="pf-accent">{job.version}</span>
                    <span>{job.period}</span>
                    {job.status === 'active' && <span style={{ color:'#5eead4', display:'flex', alignItems:'center', gap:'4px' }}><Circle size={7} fill="#5eead4" className="pf-pulse" /> ongoing</span>}
                  </div>
                  <h3 style={{ fontSize:'17px', fontWeight:700, marginBottom:'2px' }}>{job.role}</h3>
                  <div className="pf-muted" style={{ fontSize:'13px', marginBottom:'10px' }}>{job.org}</div>
                  <ul style={{ display:'flex', flexDirection:'column', gap:'7px', listStyle:'none' }}>
                    {job.points.map((pt, pi) => (
                      <li key={pi} style={{ fontSize:'14px', color:'#c7d0db', lineHeight:1.6, display:'flex', gap:'9px' }}>
                        <span className="pf-accent pf-mono" style={{ flexShrink:0 }}>›</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="pf-section" style={{ padding:'36px 0' }}>
          <Reveal><SectionLabel index="04" title="education & certifications" /></Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'14px', marginBottom:'16px' }}>
            {EDUCATION.map((edu, i) => {
              const Icon = edu.icon;
              return (
                <Reveal key={edu.title} delay={i * 90}>
                  <div className="pf-card" style={{ display:'flex', gap:'12px', alignItems:'flex-start' }}>
                    <Icon size={18} color="#5eead4" style={{ flexShrink:0, marginTop:'2px' }} />
                    <div>
                      <h3 style={{ fontSize:'14px', fontWeight:700, marginBottom:'4px', lineHeight:1.4 }}>{edu.title}</h3>
                      <div className="pf-muted" style={{ fontSize:'12px', marginBottom:'3px' }}>{edu.org}</div>
                      {edu.period && <div className="pf-mono pf-amber" style={{ fontSize:'11px', marginBottom: edu.points.length ? '8px' : 0 }}>{edu.period}</div>}
                      {edu.points.length > 0 && (
                        <ul style={{ display:'flex', flexDirection:'column', gap:'4px', listStyle:'none' }}>
                          {edu.points.map((pt, pi) => (
                            <li key={pi} style={{ fontSize:'12px', color:'#8694a6', lineHeight:1.5, display:'flex', gap:'6px' }}>
                              <span className="pf-accent pf-mono" style={{ flexShrink:0 }}>›</span>{pt}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={180}>
            <div className="pf-card">
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}><BookOpen size={17} color="#5eead4" /><h3 className="pf-mono" style={{ fontSize:'13px', fontWeight:600 }}>Courses & training</h3></div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'12px' }}>
                {COURSES.map(course => (
                  <div key={course.name} style={{ borderLeft:'2px solid #1f2733', paddingLeft:'10px', transition:'border-color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='#5eead4'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='#1f2733'}>
                    <div style={{ fontSize:'13px', fontWeight:600, color:'#e3e8ef', lineHeight:1.4 }}>{course.name}</div>
                    <div className="pf-muted" style={{ fontSize:'11px', marginTop:'2px' }}>{course.org}</div>
                    <div className="pf-mono pf-amber" style={{ fontSize:'11px', marginTop:'2px' }}>{course.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="pf-section" style={{ padding:'36px 0' }}>
          <Reveal><SectionLabel index="05" title="selected work" /></Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'16px' }}>
            {PROJECTS.map((project, i) => (
              <Reveal key={project.title} delay={i * 90}>
                <div className="pf-card" style={{ height:'100%', display:'flex', flexDirection:'column' }}>
                  <div className="pf-tag" style={{ marginBottom:'12px' }}>{project.tag}</div>
                  <h3 style={{ fontSize:'15px', fontWeight:700, marginBottom:'7px' }}>{project.title}</h3>
                  <p style={{ fontSize:'13px', color:'#8694a6', lineHeight:1.6, flex:1 }}>{project.desc}</p>
                  {project.link && (
                    <a className="pf-link pf-mono" href={project.link} target="_blank" rel="noreferrer"
                      style={{ fontSize:'12px', display:'inline-flex', alignItems:'center', gap:'5px', marginTop:'12px' }}>
                      visit site <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}><p className="pf-muted" style={{ fontSize:'13px', marginTop:'16px' }}>More projects and live links coming soon — get in touch for examples of recent work.</p></Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pf-section" style={{ padding:'36px 0 80px' }}>
          <Reveal><SectionLabel index="06" title="contact" /></Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))', gap:'20px' }}>
            <Reveal delay={90}>
              <div className="pf-card">
                <div className="pf-term-bar" style={{ margin:'-20px -20px 16px -20px', borderRadius:'10px 10px 0 0' }}>
                  <span className="pf-dot" style={{ background:'#ff5f56' }} />
                  <span className="pf-dot" style={{ background:'#ffbd2e' }} />
                  <span className="pf-dot" style={{ background:'#27c93f' }} />
                  <span className="pf-muted pf-mono" style={{ marginLeft:'10px', fontSize:'12px' }}>new_ticket.sh</span>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <input className="pf-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} />
                  <input className="pf-input" placeholder="Your email" type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} />
                  <select className="pf-input" value={form.subject} onChange={e => setForm({...form,subject:e.target.value})}>
                    <option>General inquiry</option>
                    <option>Job opportunity</option>
                    <option>Freelance project</option>
                    <option>Other</option>
                  </select>
                  <textarea className="pf-input" placeholder="What can I help with?" rows={4} value={form.message} onChange={e => setForm({...form,message:e.target.value})} />
                  <button className="pf-btn pf-btn-primary" onClick={submitTicket} style={{ justifyContent:'center' }}>
                    <Send size={14} /> Submit ticket
                  </button>
                  <p className="pf-muted" style={{ fontSize:'12px', textAlign:'center' }}>Opens your email client — nothing sent automatically.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="pf-card" style={{ display:'flex', flexDirection:'column', gap:'16px', justifyContent:'center' }}>
                {[
                  { Icon:Mail,    content:<a className="pf-link" href="mailto:mabongahbongani420@gmail.com">mabongahbongani420@gmail.com</a> },
                  { Icon:Phone,   content:<a className="pf-link" href="tel:+27607017420">060 701 7420</a> },
                  { Icon:Linkedin,content:<a className="pf-link" href="https://www.linkedin.com/in/bongani-mngomezulu-08b68b235/" target="_blank" rel="noreferrer">linkedin.com/in/bongani-mngomezulu</a> },
                  { Icon:MapPin,  content:<span className="pf-muted">East London, Eastern Cape, South Africa</span> },
                  { Icon:Globe,   content:<span className="pf-muted">Open to on-site, hybrid and remote roles</span> },
                ].map(({Icon,content},i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                    <Icon size={17} color="#5eead4" style={{ flexShrink:0, marginTop:'2px' }} />
                    <div style={{ fontSize:'14px' }}>{content}</div>
                  </div>
                ))}
                <div className="pf-mono pf-tag" style={{ marginTop:'6px', display:'inline-flex', alignItems:'center', gap:'6px', width:'fit-content' }}>
                  <Circle size={7} fill="#5eead4" color="#5eead4" className="pf-pulse" />
                  response time: usually within 24h
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav className="pf-bottom-nav">
        {[
          { id:'about',      Icon:User,        label:'about'    },
          { id:'skills',     Icon:Wrench,      label:'skills'   },
          { id:'experience', Icon:Briefcase,   label:'work'     },
          { id:'projects',   Icon:FolderOpen,  label:'projects' },
          { id:'contact',    Icon:Mail,        label:'contact'  },
        ].map(({id,Icon,label})=>(
          <button key={id} className="pf-bnav-item" onClick={()=>scrollTo(id)}>
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <footer style={{ borderTop:'1px solid #1f2733', padding:'18px 24px', position:'relative', zIndex:1 }}>
        <div className="pf-mono pf-muted" style={{ maxWidth:'1024px', margin:'0 auto', fontSize:'12px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'8px' }}>
          <span>© {new Date().getFullYear()} Bongani Mngomezulu</span>
          <span>status: <span className="pf-accent">online</span></span>
        </div>
      </footer>
    </div>
  );
}
