import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// ── GLOBAL STYLES ──────────────────────────────────────────
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #FAF8F5;
    --ink: #3E2A1F;
    --ink-soft: #6B4E3D;
    --ink-muted: #A08B7A;
    --accent: #1A4D2E;
    --accent-light: #E4EDE5;
    --border: #E8E3DC;
    --white: #FFFFFF;
    --serif: 'Instrument Serif', Georgia, serif;
    --sans: 'DM Sans', -apple-system, sans-serif;
  }

  html { scroll-behavior: smooth; }
  
  body {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }

  ::selection {
    background: var(--accent);
    color: white;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .fade-up { animation: fadeUp 0.6s ease forwards; }
  .fade-in { animation: fadeIn 0.4s ease forwards; }

  .stagger-1 { animation-delay: 0.1s; opacity: 0; }
  .stagger-2 { animation-delay: 0.2s; opacity: 0; }
  .stagger-3 { animation-delay: 0.3s; opacity: 0; }
  .stagger-4 { animation-delay: 0.4s; opacity: 0; }
  .stagger-5 { animation-delay: 0.5s; opacity: 0; }
`;

// ── NAV ────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    padding: '0 40px',
    height: '64px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: scrolled ? 'rgba(250,248,245,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    transition: 'all 0.3s ease',
  };

  const logoStyle = {
    fontFamily: 'var(--serif)',
    fontSize: '18px',
    color: 'var(--ink)',
  };

  const linksStyle = {
    display: 'flex', gap: '32px', alignItems: 'center',
  };

  const linkStyle = (active) => ({
    fontFamily: 'var(--sans)',
    fontSize: '14px',
    fontWeight: '400',
    color: active ? 'var(--ink)' : 'var(--ink-soft)',
    transition: 'color 0.2s',
    letterSpacing: '0.01em',
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>Samantha Ho</Link>
      <div style={linksStyle}>
        <Link to="/" style={linkStyle(location.pathname === '/')}>Work</Link>
        <Link to="/about" style={linkStyle(location.pathname === '/about')}>About</Link>
        <a href="https://www.linkedin.com/in/samantha-ho-uxdesigner/" target="_blank" rel="noreferrer" style={linkStyle(false)}>LinkedIn</a>
        <a
          href="#"
          style={{
            ...linkStyle(false),
            background: 'var(--accent)',
            color: 'white',
            padding: '8px 18px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: '500',
          }}
        >
          Resume ↗
        </a>
      </div>
    </nav>
  );
}

// ── HOME PAGE ──────────────────────────────────────────────
const projects = [
  {
    id: 'suger-prm',
    number: '01',
    company: 'Suger · AI Product Designer · 2025–2026',
    title: 'Suger Partner Intelligence System',
    subtitle: 'Designing Contact List + PRM — from "who do I call?" to a full partner relationship layer for cloud marketplace sellers.',
    tags: ['B2B SaaS', 'AI Features', 'Systems Design', 'PRM'],
    color: '#1A4D2E',
    bgColor: '#E4EDE5',
    link: '/case-study/suger-prm',
    live: true,
  },
  {
    id: 'revvity',
    number: '02',
    company: 'Revvity · Product Designer · 2024',
    title: 'Redesigning Revvity\'s Homogenizer Workstation',
    subtitle: 'Streamlined a complex lab workflow, cutting implementation time by 68% and increasing team efficiency by 1.5×.',
    tags: ['B2B SaaS', 'Biotech', 'Workflow Design'],
    color: '#1A4D2E',
    bgColor: '#E8F5EC',
    link: 'https://samanthaho-productdesigner.framer.website/revvity',
    live: false,
  },
  {
    id: 'crypto',
    number: '03',
    company: 'Crypto Arsenal · UX Designer · 2023',
    title: 'Redesigning a Crypto Trading Dashboard',
    subtitle: 'Smarter source input for TradingView. Improved workflow efficiency by 15% through data visualization and user flow optimization.',
    tags: ['Dashboard', 'Data Viz', 'B2B SaaS'],
    color: '#7C2D12',
    bgColor: '#FEF3EC',
    link: 'https://samanthaho-productdesigner.framer.website/crypto-arsenal',
    live: false,
  },
  {
    id: 'greenpeace',
    number: '04',
    company: 'Greenpeace · UX Designer · 2024',
    title: 'Greenpeace Ambassador Program',
    subtitle: 'Pitched a volunteer-to-ambassador journey with a self-serve digital approval flow, backed by a 22-page service design blueprint.',
    tags: ['Service Design', 'NGO', 'Research'],
    color: '#064E3B',
    bgColor: '#ECFDF5',
    link: 'https://samanthaho-productdesigner.framer.website/greenpeace',
    live: false,
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    display: 'grid',
    gridTemplateColumns: '80px 1fr auto',
    gap: '0 32px',
    padding: '36px 0',
    borderTop: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    color: 'inherit',
  };

  const numStyle = {
    fontFamily: 'var(--serif)',
    fontSize: '13px',
    color: 'var(--ink-muted)',
    paddingTop: '4px',
  };

  const tagStyle = (color, bg) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 10px',
    borderRadius: '100px',
    fontSize: '11px',
    fontWeight: '500',
    color: color,
    background: bg,
    letterSpacing: '0.02em',
  });

  const arrowStyle = {
    fontSize: '20px',
    color: 'var(--ink-muted)',
    transform: hovered ? 'translate(4px, -4px)' : 'translate(0,0)',
    transition: 'transform 0.3s ease',
    alignSelf: 'flex-start',
    paddingTop: '4px',
  };

  const content = (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={numStyle}>{project.number}</div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '8px', fontWeight: '400', letterSpacing: '0.02em' }}>
          {project.company}
        </div>
        <div style={{
          fontFamily: 'var(--serif)',
          fontSize: '26px',
          lineHeight: '1.25',
          marginBottom: '10px',
          color: hovered ? project.color : 'var(--ink)',
          transition: 'color 0.3s ease',
        }}>
          {project.title}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.6', maxWidth: '600px', marginBottom: '16px' }}>
          {project.subtitle}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {project.tags.map(tag => (
            <span key={tag} style={tagStyle(project.color, project.bgColor)}>{tag}</span>
          ))}
          {!project.live && (
            <span style={tagStyle('#888', '#F0F0F0')}>Framer ↗</span>
          )}
        </div>
      </div>
      <div style={arrowStyle}>↗</div>
    </div>
  );

  if (project.live) {
    return <Link to={project.link} style={{ textDecoration: 'none', color: 'inherit' }}>{content}</Link>;
  }
  return <a href={project.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{content}</a>;
}

function HomePage() {
  return (
    <div style={{ paddingTop: '140px', maxWidth: '900px', margin: '0 auto', padding: '140px 40px 80px' }}>
      {/* Hero */}
      <div style={{ marginBottom: '80px' }}>
        <div className="fade-up stagger-1" style={{
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: '500',
          letterSpacing: '0.08em',
          color: 'var(--accent)',
          background: 'var(--accent-light)',
          padding: '4px 12px',
          borderRadius: '100px',
          marginBottom: '24px',
          textTransform: 'uppercase',
        }}>
          Available for new roles
        </div>

        <h1 className="fade-up stagger-2" style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(42px, 6vw, 68px)',
          lineHeight: '1.1',
          marginBottom: '24px',
          color: 'var(--ink)',
        }}>
          Hi, I'm Samantha —<br />
          <span style={{ color: 'var(--accent)' }}>product designer</span> crafting<br />
          intelligent B2B experiences.
        </h1>

        <p className="fade-up stagger-3" style={{
          fontSize: '18px',
          color: 'var(--ink-soft)',
          lineHeight: '1.7',
          maxWidth: '560px',
          fontWeight: '300',
        }}>
          Currently designing AI-powered features at{' '}
          <a href="https://suger.io" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontWeight: '500', borderBottom: '1px solid var(--accent-light)' }}>Suger</a>
          {' '}— a cloud marketplace platform serving companies like AWS, Azure, and GCP partners.
          4+ years in B2B SaaS, biotech, and NGO design.
        </p>

        <div className="fade-up stagger-4" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
          {['Figma', 'Claude Code', 'Lovable', 'Figma Make', 'SLDS v2', 'PrimeOne DS'].map(tool => (
            <span key={tool} style={{
              fontSize: '12px',
              color: 'var(--ink-soft)',
              background: 'var(--white)',
              border: '1px solid var(--border)',
              padding: '5px 12px',
              borderRadius: '100px',
              fontWeight: '400',
            }}>{tool}</span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="fade-up stagger-5">
        <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '0' }}>
          Selected Work
        </div>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>

      {/* Footer */}
      <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: 'var(--ink-soft)' }}>
          Samantha Ho
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="mailto:samanthaho1021@gmail.com" style={{ fontSize: '13px', color: 'var(--ink-soft)', transition: 'color 0.2s' }}>
            samanthaho1021@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/samantha-ho-uxdesigner/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>
            LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT PAGE ─────────────────────────────────────────────
function AboutPage() {
  return (
    <div style={{ paddingTop: '140px', maxWidth: '760px', margin: '0 auto', padding: '140px 40px 80px' }}>
      <div className="fade-up stagger-1">
        <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '24px' }}>About</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: '1.15', marginBottom: '40px' }}>
          Designer at the intersection of AI, data, and complex workflows.
        </h1>
      </div>

      <div className="fade-up stagger-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '48px' }}>
        <div>
          <img
            src="https://framerusercontent.com/images/v7xJ0K5zSE2FAS8h1Cvi2lQCfY0.jpg"
            alt="Samantha Ho"
            style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '12px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: '1.8', marginBottom: '20px', fontWeight: '300' }}>
            I'm a product designer with 3+ years across B2B SaaS startups and enterprise software — cloud marketplace tooling, biotech platforms, and NGO service design.
          </p>
          <p style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: '1.8', marginBottom: '20px', fontWeight: '300' }}>
            Currently at Suger, I design AI-powered features for a Cloud GTM platform. I've worked directly with AWS on AI MCP feature launches, designed CRM-integrated tools, and led the full website rebuild using AI-assisted development tools.
          </p>
          <p style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: '1.8', fontWeight: '300' }}>
            I'm comfortable owning design end-to-end — from shaping product scope with PMs to shipping alongside engineers in Agile workflows.
          </p>
        </div>
      </div>

      <div className="fade-up stagger-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
        {[
          { label: 'Education', items: ['M.I. UX Design, University of Toronto · 2025', 'BSc Anatomy & Cell Biology, McGill · 2020'] },
          { label: 'Currently', items: ['Product Designer @ Suger.io', 'Vancouver, BC · Open to opportunities'] },
          { label: 'Design', items: ['Figma · PrimeOne DS · SLDS v2', 'Claude Code · Lovable · Figma Make'] },
          { label: 'Process', items: ['Agile / Lean UX · Cross-functional', 'Research → Systems → Ship'] },
        ].map(({ label, items }) => (
          <div key={label} style={{ padding: '24px', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '12px' }}>{label}</div>
            {items.map(item => (
              <div key={item} style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: '6px', lineHeight: '1.5' }}>{item}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="fade-up stagger-4" style={{ display: 'flex', gap: '12px' }}>
        <a href="mailto:samanthaho1021@gmail.com" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--accent)', color: 'white', padding: '12px 24px',
          borderRadius: '100px', fontSize: '14px', fontWeight: '500',
        }}>Get in touch ↗</a>
        <a href="https://www.linkedin.com/in/samantha-ho-uxdesigner/" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--white)', color: 'var(--ink)', padding: '12px 24px',
          borderRadius: '100px', fontSize: '14px', fontWeight: '500',
          border: '1px solid var(--border)',
        }}>LinkedIn ↗</a>
      </div>
    </div>
  );
}

// ── CASE STUDY PAGE ────────────────────────────────────────
function Section({ label, children, style }) {
  return (
    <section style={{ marginBottom: '80px', ...style }}>
      {label && (
        <div style={{
          fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em',
          color: 'var(--accent)', textTransform: 'uppercase',
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
          {label}
        </div>
      )}
      {children}
    </section>
  );
}

function H2({ children }) {
  return (
    <h2 style={{
      fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.5vw, 36px)',
      lineHeight: '1.2', marginBottom: '20px', color: 'var(--ink)',
    }}>{children}</h2>
  );
}

function Body({ children, style }) {
  return (
    <p style={{
      fontSize: '16px', color: 'var(--ink-soft)', lineHeight: '1.8',
      marginBottom: '16px', fontWeight: '300', maxWidth: '680px', ...style,
    }}>{children}</p>
  );
}

function Callout({ label, children }) {
  return (
    <div style={{
      background: 'var(--accent-light)', borderLeft: '3px solid var(--accent)',
      padding: '20px 24px', borderRadius: '0 8px 8px 0', margin: '32px 0',
    }}>
      {label && <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</div>}
      <p style={{ color: 'var(--accent)', lineHeight: '1.7', margin: 0, fontFamily: 'var(--serif)', fontSize: '17px' }}>{children}</p>
    </div>
  );
}

function MetaCard({ label, value }) {
  return (
    <div style={{ padding: '20px', background: 'var(--white)', borderRadius: '10px', border: '1px solid var(--border)' }}>
      <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: '500', lineHeight: '1.5' }}>{value}</div>
    </div>
  );
}

function ExplorationTable({ rows }) {
  return (
    <div style={{ margin: '24px 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 160px', background: 'var(--ink)', padding: '12px 16px' }}>
        {['Option', 'Rationale', 'Decision'].map(h => (
          <div key={h} style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{h}</div>
        ))}
      </div>
      {rows.map(({ option, rationale, decision, verdict }, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '200px 1fr 160px',
          padding: '16px', borderTop: '1px solid var(--border)',
          background: i % 2 === 0 ? 'var(--white)' : 'var(--bg)',
        }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)', paddingRight: '16px' }}>{option}</div>
          <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.6', paddingRight: '16px' }}>{rationale}</div>
          <div style={{
            fontSize: '12px', fontWeight: '600',
            color: verdict === 'adopted' ? '#047857' : verdict === 'partial' ? '#D97706' : '#B91C1C',
            display: 'flex', alignItems: 'flex-start', gap: '4px',
          }}>
            <span>{verdict === 'adopted' ? '✓' : verdict === 'partial' ? '~' : '✕'}</span>
            <span>{decision}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PartnerDiscoverySection() {
  const [activeTab, setActiveTab] = useState('discovery');
  const [discoveryStep, setDiscoveryStep] = useState('list');
  const [inviteStep, setInviteStep] = useState(1);

  const tabs = [
    { id: 'discovery', label: '🔍 Partner Discovery' },
    { id: 'invite', label: '✦ AI Invite Flow' },
    { id: 'collab', label: '🤝 Collaborations' },
  ];

  const channelColors = {
    AWS: { color: '#FF9900', bg: '#FFF3E0' },
    Azure: { color: '#0078D4', bg: '#E3F2FF' },
    GCP: { color: '#4285F4', bg: '#E8F0FE' },
  };
  const typeColors = { Reseller: '#A855F7', SI: '#10B981', ISV: '#F59E0B' };
  const scoreColor = (s) => (s >= 90 ? '#10B981' : s >= 75 ? '#F59E0B' : '#EF4444');
  const scoreBg = (s) => (s >= 90 ? '#DCFCE7' : s >= 75 ? '#FEF3C7' : '#FEE2E2');

  const NavBar = () => (
    <div style={{ background: '#1a1a2e', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ fontFamily: 'var(--serif)', color: 'white', fontSize: '18px', fontWeight: '500' }}>suger</div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
          {['Dashboard', 'Partners', 'Deals', 'Accounts', 'Reports'].map(l => (
            <span key={l} style={{ color: l === 'Partners' ? 'white' : 'rgba(255,255,255,0.55)', fontWeight: l === 'Partners' ? '600' : '400' }}>{l}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>🔔</span>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F97316', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600' }}>SH</div>
      </div>
    </div>
  );

  const SubTabs = ({ active }) => {
    const items = [
      { id: 'all', label: 'All Partners' },
      { id: 'discovery', label: 'Partner Discovery' },
      { id: 'collab', label: 'Collaborations', badge: '6' },
    ];
    return (
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #e2e8f0', padding: '0 24px', background: 'white' }}>
        {items.map(item => {
          const on = item.id === active;
          return (
            <div key={item.id} style={{ padding: '14px 0', marginRight: '24px', fontSize: '14px', color: on ? '#1e293b' : '#64748b', fontWeight: on ? '600' : '400', borderBottom: on ? '2px solid #F97316' : '2px solid transparent', display: 'flex', gap: '6px', alignItems: 'center', cursor: 'pointer' }}>
              {item.label}
              {item.badge && <span style={{ fontSize: '10px', background: '#e2e8f0', color: '#64748b', padding: '1px 6px', borderRadius: '100px', fontWeight: '600' }}>{item.badge}</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const partners = [
    { name: 'Stratosphere IT', type: 'Reseller', channels: ['AWS', 'Azure', 'GCP'], shared: 14, rev: '$4.2M', score: 94 },
    { name: 'NexGen Consulting', type: 'SI', channels: ['Azure', 'GCP'], shared: 9, rev: '$3.1M', score: 87 },
    { name: 'CloudSync Solutions', type: 'Reseller', channels: ['AWS', 'Azure'], shared: 12, rev: '$2.5M', score: 91 },
    { name: 'DataBridge Partners', type: 'SI', channels: ['AWS'], shared: 7, rev: '$1.9M', score: 78 },
    { name: 'Meridian Software', type: 'ISV', channels: ['Azure'], shared: 5, rev: '$1.6M', score: 72 },
    { name: 'PeakCloud Tech', type: 'ISV', channels: ['AWS'], shared: 4, rev: '$890K', score: 68 },
  ];

  const renderDiscoveryList = () => (
    <div style={{ background: '#f8fafc' }}>
      <NavBar />
      <SubTabs active="discovery" />
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '20px', color: '#1e293b', fontWeight: '600', marginBottom: '4px' }}>Discover Partners</h3>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Find and invite partners ranked by compatibility with your accounts.</div>
          </div>
          <button onClick={() => setDiscoveryStep('invite')} style={{ background: '#F97316', color: 'white', fontSize: '13px', fontWeight: '600', padding: '10px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', flexShrink: 0 }}>+ Invite Partner</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {partners.map(p => (
            <div key={p.name} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{p.name}</div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: scoreColor(p.score), background: scoreBg(p.score), padding: '3px 8px', borderRadius: '100px' }}>{p.score}</div>
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '100px', background: `${typeColors[p.type]}1a`, color: typeColors[p.type] }}>{p.type}</span>
                {p.channels.map(c => (
                  <span key={c} style={{ fontSize: '10px', fontWeight: '600', padding: '2px 6px', borderRadius: '4px', background: channelColors[c].bg, color: channelColors[c].color }}>{c}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>
                <span>Shared accounts</span>
                <span style={{ color: '#1e293b', fontWeight: '600' }}>{p.shared}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '14px' }}>
                <span>Est. revenue</span>
                <span style={{ color: '#1e293b', fontWeight: '600' }}>{p.rev}</span>
              </div>
              <button onClick={() => setDiscoveryStep('invite')} style={{ width: '100%', background: '#F97316', color: 'white', fontSize: '12px', fontWeight: '600', padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Invite Partner</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInviteFlow = () => (
    <div style={{ background: '#f8fafc' }}>
      <div style={{ background: '#1a1a2e', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span onClick={() => { setInviteStep(1); setDiscoveryStep('list'); if (activeTab === 'invite') setActiveTab('discovery'); }} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', cursor: 'pointer' }}>← Back</span>
        <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Invite Partner — Stratosphere IT</div>
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { n: 1, label: 'AI Drafting Message' },
            { n: 2, label: 'Invite Sent' },
          ].map((s, i) => {
            const active = inviteStep === s.n;
            const done = inviteStep > s.n;
            return (
              <React.Fragment key={s.n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: done ? '#10B981' : active ? '#F97316' : '#e2e8f0', color: (done || active) ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600' }}>{done ? '✓' : s.n}</div>
                  <span style={{ fontSize: '13px', color: active ? '#1e293b' : '#64748b', fontWeight: active ? '600' : '400' }}>Step {s.n} · {s.label}</span>
                </div>
                {i < 1 && <div style={{ width: '40px', height: '1px', background: '#e2e8f0' }} />}
              </React.Fragment>
            );
          })}
        </div>

        {inviteStep === 1 ? (
          <div>
            <div style={{ background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', border: '1px solid #e9d5ff', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '16px' }}>✦</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#7C3AED' }}>AI Assistant</span>
                <span style={{ display: 'inline-flex', gap: '3px' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#A855F7', opacity: 0.5 + (i * 0.15), animation: `fadeIn 1.4s ease-in-out ${i * 0.2}s infinite alternate` }} />
                  ))}
                </span>
              </div>
              <div style={{ background: 'white', border: '1px solid #e9d5ff', borderRadius: '6px', padding: '16px', fontSize: '13px', color: '#1e293b', lineHeight: '1.7' }}>
                <div style={{ marginBottom: '10px' }}>Hi Mike,</div>
                <div style={{ marginBottom: '10px' }}>I came across Stratosphere IT while mapping out our partner ecosystem and noticed we share <strong>14 accounts</strong> — particularly in financial services, which aligns closely with your team's expertise.</div>
                <div style={{ marginBottom: '10px' }}>With your <strong>AWS Advanced Tier Partner</strong> status and deep vertical experience, there's a real opportunity to collaborate on co-sell motions around these shared customers.</div>
                <div style={{ marginBottom: '10px' }}>Would you be open to a quick intro call next week? I'd love to walk through how we work with partners like Stratosphere and explore where we could drive joint value.</div>
                <div>Looking forward to hearing from you,<br />Samantha</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => setInviteStep(2)} style={{ background: '#F97316', color: 'white', fontSize: '13px', fontWeight: '600', padding: '10px 18px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Send Invite ↗</button>
              <button style={{ background: 'white', color: '#1e293b', fontSize: '13px', fontWeight: '500', padding: '10px 16px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>Regenerate</button>
              <button style={{ background: 'white', color: '#1e293b', fontSize: '13px', fontWeight: '500', padding: '10px 16px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>Edit</button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#DCFCE7', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '12px' }}>✓</div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>Invite sent to Mike at Stratosphere IT</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>We'll notify you as soon as they respond.</div>
            </div>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#1e293b', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What happens next</div>
              {[
                'We notify you when Stratosphere IT accepts the invite',
                'Shared accounts are auto-mapped and visible in the Collaborations tab',
                'You can propose a joint co-sell opportunity or CPPO directly from the partner profile',
                'Activity shows up in your Partner Dashboard feed',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F97316', color: 'white', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: '13px', color: '#1e293b', lineHeight: '1.5' }}>{step}</div>
                </div>
              ))}
            </div>
            <button onClick={() => { setInviteStep(1); setDiscoveryStep('list'); setActiveTab('discovery'); }} style={{ background: 'white', color: '#1e293b', fontSize: '13px', fontWeight: '500', padding: '10px 18px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>← Back to Discovery</button>
          </div>
        )}
      </div>
    </div>
  );

  const collaborations = [
    { name: 'CloudSync Solutions', type: 'Reseller', channels: ['AWS', 'Azure'], status: 'Active', deals: 3, shared: 12, last: '2 days ago' },
    { name: 'Stratosphere IT', type: 'Reseller', channels: ['AWS', 'Azure', 'GCP'], status: 'Pending Acceptance', deals: 0, shared: 14, last: 'Just now' },
    { name: 'NexGen Consulting', type: 'SI', channels: ['Azure', 'GCP'], status: 'Active', deals: 2, shared: 9, last: '5 days ago' },
    { name: 'DataBridge Partners', type: 'SI', channels: ['AWS'], status: 'Active', deals: 1, shared: 7, last: '1 week ago' },
    { name: 'Meridian Software', type: 'ISV', channels: ['Azure'], status: 'Invited', deals: 0, shared: 5, last: '3 days ago' },
    { name: 'Cobalt Infrastructure', type: 'Reseller', channels: ['AWS', 'GCP'], status: 'Active', deals: 1, shared: 6, last: '1 week ago' },
  ];

  const statusStyle = (s) => {
    if (s === 'Active') return { color: '#10B981', bg: '#DCFCE7' };
    if (s === 'Pending Acceptance') return { color: '#D97706', bg: '#FEF3C7' };
    return { color: '#2563EB', bg: '#DBEAFE' };
  };
  const ctaFor = (s) => {
    if (s === 'Active') return { label: 'View →', bg: '#F97316', color: 'white' };
    if (s === 'Pending Acceptance') return { label: 'Pending', bg: '#f1f5f9', color: '#64748b' };
    return { label: 'Follow up', bg: '#f1f5f9', color: '#64748b' };
  };

  const renderCollab = () => (
    <div style={{ background: '#f8fafc' }}>
      <NavBar />
      <SubTabs active="collab" />
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', color: '#1e293b', fontWeight: '600', marginBottom: '4px' }}>Active Collaborations</h3>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Partners you've connected with — track deals, shared accounts, and activity.</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {collaborations.map(c => {
            const ss = statusStyle(c.status);
            const cta = ctaFor(c.status);
            return (
              <div key={c.name} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px', display: 'grid', gridTemplateColumns: '2.4fr 1.3fr 0.7fr 0.7fr 0.9fr 0.9fr', gap: '12px', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{c.name}</div>
                    <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '100px', background: `${typeColors[c.type]}1a`, color: typeColors[c.type] }}>{c.type}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {c.channels.map(ch => (
                      <span key={ch} style={{ fontSize: '10px', fontWeight: '600', padding: '2px 6px', borderRadius: '4px', background: channelColors[ch].bg, color: channelColors[ch].color }}>{ch}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '100px', background: ss.bg, color: ss.color }}>● {c.status}</span>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>Open deals</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{c.deals}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>Shared</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{c.shared}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>Last activity</div>
                  <div style={{ fontSize: '12px', color: '#1e293b' }}>{c.last}</div>
                </div>
                <button style={{ background: cta.bg, color: cta.color, border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{cta.label}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const frameContent =
    activeTab === 'discovery' && discoveryStep === 'list' ? renderDiscoveryList() :
    activeTab === 'discovery' && discoveryStep === 'invite' ? renderInviteFlow() :
    activeTab === 'invite' ? renderInviteFlow() :
    renderCollab();

  return (
    <Section label="06 · Prototype — Partner Discovery & Collaborations">
      <H2>Designing for partner discovery and AI-assisted outreach</H2>
      <Body>
        Two prototypes ship alongside the core PRM: a Partner Discovery surface that ranks candidate partners by account overlap and channel fit, and an AI-drafted outreach flow that turns "I should reach out" into a one-click invite. The Collaborations tab reflects the state after partners accept — shared accounts auto-map and activity flows into the main dashboard.
      </Body>

      <div style={{ display: 'flex', gap: '8px', margin: '24px 0 16px', flexWrap: 'wrap' }}>
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'invite') setInviteStep(1);
                if (tab.id === 'discovery') setDiscoveryStep('list');
              }}
              style={{
                padding: '9px 16px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: active ? 'var(--accent)' : 'var(--white)',
                color: active ? 'white' : 'var(--ink)',
                transition: 'all 0.2s',
                fontFamily: 'var(--sans)',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div style={{
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(62,42,31,0.08)',
      }}>
        {frameContent}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px' }}>
        <Callout label="AI Design Decision">
          The invite message is generated from the same signals that scored the partner — shared accounts, cloud tier, industry fit. Sellers always see the draft before sending and can Regenerate or Edit. Trust comes from making AI's reasoning legible, not from automating the send.
        </Callout>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '12px' }}>Collaborations tab key decisions</div>
          {[
            'Single row per partner — status, deals, shared accounts, last activity all visible without drilling in',
            'Distinct CTAs per state: View for Active, muted Pending/Follow up for inactive states — sellers know where to spend energy',
            'Status ordering bubbles Pending Acceptance and Invited to the top so follow-up actions surface first',
          ].map(d => (
            <div key={d} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.55', marginBottom: '8px' }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: '#1a1a2e',
        borderRadius: '12px',
        padding: '24px 28px',
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ color: 'white', fontSize: '15px', fontWeight: '500' }}>
          Explore the full PRM prototype in Lovable ↗
        </div>
        <a href="https://suger-prm.lovable.app" target="_blank" rel="noreferrer" style={{
          background: '#F97316', color: 'white', fontSize: '13px', fontWeight: '600',
          padding: '10px 20px', borderRadius: '100px',
          display: 'inline-flex', alignItems: 'center', gap: '6px',
        }}>
          Open Prototype ↗
        </a>
      </div>
    </Section>
  );
}

function SugerCaseStudy() {
  return (
    <div style={{ paddingTop: '100px', '--accent': '#4A3222', '--accent-light': '#EDE5D8' }}>
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#FAF8F5', borderBottom: '1px solid var(--border)', padding: '120px 40px 0', paddingTop: '120px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column-reverse', gap: 0 }}>
          <div style={{ position: 'relative', borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', width: '100%', maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ background: '#1a1a2e', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '4px', padding: '4px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginLeft: '4px' }}>suger-prm.lovable.app</div>
              <span style={{ background: '#F97316', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '100px' }}>Live ↗</span>
            </div>
            <div style={{ background: '#f8fafc', padding: 0, width: '100%' }}>
              {/* Top nav */}
              <div style={{ background: '#1a1a2e', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'white' }}>suger</div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {['Home', 'Marketplace', 'Co-Sell', 'Offers', 'Partners', 'Contacts'].map(l => (
                      <span key={l} style={{ fontSize: '10px', color: l === 'Partners' ? 'white' : '#94a3b8', fontWeight: l === 'Partners' ? '600' : '400' }}>{l}</span>
                    ))}
                  </div>
                </div>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F97316', fontSize: '9px', color: 'white', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JD</div>
              </div>

              {/* Alert banner */}
              <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '6px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#d97706', marginRight: '6px' }}>⚠</span>
                  <span style={{ fontSize: '10px', color: '#92400e' }}>6 items need attention: 4 co-sell invites, 2 deal registrations</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['View Invites', 'View Registrations'].map(b => (
                    <button key={b} style={{ fontSize: '9px', border: '1px solid #d97706', color: '#d97706', background: 'transparent', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}>{b}</button>
                  ))}
                </div>
              </div>

              {/* Page header */}
              <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Partners</div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>Manage your partner ecosystem and track performance</div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button style={{ border: '1px solid #e2e8f0', fontSize: '9px', color: '#64748b', padding: '4px 10px', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Partner Files</button>
                  <button style={{ background: '#F97316', color: 'white', fontSize: '9px', fontWeight: '600', padding: '4px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>+ Invite Partner</button>
                  <button style={{ border: '1px solid #e2e8f0', fontSize: '9px', color: '#64748b', padding: '4px 10px', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>My Partners</button>
                </div>
              </div>

              {/* KPI cards */}
              <div style={{ padding: '0 12px 8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {[
                  { label: 'ACTIVE PARTNERS', value: '15', delta: '+3% vs prior period' },
                  { label: 'PARTNER-INFLUENCED PIPELINE', value: '$1.8M', delta: '+15%' },
                  { label: 'PARTNER-SOURCED REVENUE', value: '$1.3M', delta: '+8%' },
                  { label: 'AVG. WIN RATE', value: '71%', delta: '+2%' },
                ].map(k => (
                  <div key={k.label} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px' }}>
                    <div style={{ fontSize: '8px', color: '#64748b', letterSpacing: '0.05em' }}>{k.label}</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{k.value}</div>
                    <div style={{ fontSize: '9px', color: '#16a34a' }}>{k.delta}</div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div style={{ padding: '0 12px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>Leading Partners by Revenue</div>
                  {[
                    { name: 'Stratosphere IT', width: '85%', value: '$4.2M' },
                    { name: 'CloudSync', width: '70%', value: '$2.5M' },
                    { name: 'NexGen', width: '65%', value: '$3.1M' },
                    { name: 'TerraForm', width: '45%', value: '$2.8M' },
                    { name: 'DataBridge', width: '40%', value: '$1.9M' },
                  ].map(b => (
                    <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <div style={{ fontSize: '9px', color: '#64748b', width: '80px', flexShrink: 0 }}>{b.name}</div>
                      <div style={{ height: '8px', borderRadius: '4px', background: '#2D1B69', width: b.width }} />
                      <div style={{ fontSize: '9px', color: '#1e293b' }}>{b.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>Pipeline at Risk</div>
                  <div style={{ fontSize: '8px', color: '#64748b', marginBottom: '8px' }}>Co-sells with 30+ days of no activity</div>
                  {[
                    { deal: 'Acme Migration', partner: 'Stratosphere IT', days: '45 days' },
                    { deal: 'HealthNet Deal', partner: 'NexGen', days: '38 days' },
                    { deal: 'Retail AI Project', partner: 'CloudSync', days: '32 days' },
                  ].map(r => (
                    <div key={r.deal} style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '4px', padding: '6px 8px', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '9px', fontWeight: '600', color: '#1e293b' }}>{r.deal}</div>
                        <div style={{ fontSize: '8px', color: '#64748b' }}>{r.partner}</div>
                      </div>
                      <div style={{ fontSize: '9px', fontWeight: '700', color: '#ea580c' }}>{r.days}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div style={{ padding: '0 16px 12px' }}>
                <div style={{ fontSize: '10px', fontWeight: '600', color: '#1e293b', marginBottom: '6px' }}>Recent Activity</div>
                {[
                  { dot: '#16a34a', text: 'Co-Sell Won — TechStart SaaS Expansion closed — $95K', meta: 'CloudSync Solutions · Yesterday' },
                  { dot: '#d97706', text: 'Deal Registered — Bolt Cloud Migration — $175K (Pending)', meta: 'CloudSync · 2 days ago' },
                  { dot: '#ea580c', text: 'Co-Sell Tagged — Vertex AI Workloads tagged — $340K', meta: 'Stratosphere IT · 2 days ago' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: '9px', color: '#1e293b' }}>{a.text}</span>
                    <span style={{ fontSize: '8px', color: '#64748b', marginLeft: 'auto' }}>{a.meta}</span>
                  </div>
                ))}
              </div>

              {/* Partners list tabs */}
              <div style={{ padding: '0 16px 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {[
                  { label: 'All Partners', active: true },
                  { label: 'Partner Discovery', active: false },
                  { label: 'Collaborations 6', active: false },
                ].map(t => (
                  <span key={t.label} style={{ background: t.active ? '#1e293b' : '#f1f5f9', color: t.active ? 'white' : '#64748b', fontSize: '9px', fontWeight: '600', padding: '4px 10px', borderRadius: '100px' }}>{t.label}</span>
                ))}
              </div>

              {/* Partners table */}
              <div style={{ padding: '0 16px 12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 70px 60px 60px 70px', gap: '8px', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                  {['Partner Name', 'Location', 'Channel', 'Revenue', 'Deals', 'Win Rate', 'Last Activity'].map(h => (
                    <div key={h} style={{ fontSize: '8px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>{h}</div>
                  ))}
                </div>
                {[
                  { name: 'CloudSync Solutions', type: 'Reseller', loc: 'San Francisco', channels: ['AWS', 'Azure'], rev: '$2.5M', deals: '1 open', win: '71%', winColor: '#16a34a', last: 'Feb 17' },
                  { name: 'DataBridge Partners', type: 'SI', loc: 'New York', channels: ['AWS'], rev: '$1.9M', deals: '1 open', win: '68%', winColor: '#d97706', last: 'Feb 14' },
                  { name: 'NexGen Consulting', type: 'SI', loc: 'London', channels: ['Azure', 'GCP'], rev: '$3.1M', deals: '1 open', win: '74%', winColor: '#16a34a', last: 'Feb 18' },
                ].map(p => (
                  <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 70px 60px 60px 70px', gap: '8px', padding: '8px 0', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '600', color: '#1e293b' }}>{p.name}</div>
                      <span style={{ fontSize: '8px', background: '#f1f5f9', color: '#64748b', padding: '1px 6px', borderRadius: '100px' }}>{p.type}</span>
                    </div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>{p.loc}</div>
                    <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                      {p.channels.map(c => {
                        const s = c === 'AWS' ? { bg: '#fff3e0', color: '#FF9900' } : c === 'Azure' ? { bg: '#e3f2ff', color: '#0078D4' } : { bg: '#e8f0fe', color: '#4285F4' };
                        return <span key={c} style={{ background: s.bg, color: s.color, fontSize: '8px', padding: '1px 5px', borderRadius: '3px' }}>{c}</span>;
                      })}
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: '600', color: '#1e293b' }}>{p.rev}</div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>{p.deals}</div>
                    <div style={{ fontSize: '10px', fontWeight: '600', color: p.winColor }}>{p.win}</div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>{p.last}</div>
                  </div>
                ))}
              </div>
            </div>
            <a href="https://suger-prm.lovable.app" target="_blank" rel="noreferrer" style={{ background: '#F97316', padding: '10px 16px', textAlign: 'center', fontSize: '11px', fontWeight: '600', color: 'white', display: 'block', textDecoration: 'none', width: '100%' }}>↗ View full prototype</a>
          </div>

          <div style={{ paddingTop: '48px', paddingBottom: '80px', maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <div className="fade-up stagger-1" style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['B2B SaaS', 'AI Features', 'Systems Design', 'PRM'].map(tag => (
                <span key={tag} style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent)', background: 'var(--accent-light)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.04em' }}>{tag}</span>
              ))}
            </div>
            <h1 className="fade-up stagger-2" style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 52px)',
              fontStyle: 'italic', lineHeight: '1.1', color: 'var(--ink)', marginBottom: '20px',
            }}>
              Suger Partner Intelligence System
            </h1>
            <p className="fade-up stagger-3" style={{
              fontSize: '16px', color: 'var(--ink-soft)', lineHeight: '1.8',
              fontWeight: '300', marginBottom: '24px',
            }}>
              What started as a contact list became something bigger. Finding the right person to call was only step one — sellers also needed to track the relationship, attribute revenue, and know which partners were worth investing in.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '100px', background: 'var(--accent-light)', color: 'var(--accent)' }}>Contact List</span>
              <span style={{ color: 'var(--ink-muted)' }}>→</span>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '100px', background: 'var(--accent-light)', color: 'var(--accent)' }}>Partner Profiles</span>
              <span style={{ color: 'var(--ink-muted)' }}>→</span>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '100px', background: 'var(--accent)', color: 'white' }}>AI Relationship Layer</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', fontStyle: 'italic', marginTop: '8px' }}>The scope expanded as the design revealed a bigger opportunity</div>
          </div>
        </div>
      </div>

      {/* Meta strip */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
          {[
            { label: 'Company', value: 'Suger.io' },
            { label: 'Role', value: 'Product Designer (Lead)' },
            { label: 'Timeline', value: '2025 – 2026' },
            { label: 'Status', value: 'Shipped · In Progress' },
          ].map(({ label, value }, i) => (
            <div key={label} style={{
              padding: '24px 20px',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
              <div style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: '500' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 40px' }}>

        {/* Context */}
        <Section label="01 · Context">
          <H2>It started with a contact list</H2>
          <Body>I was brought onto Suger's co-sell console to solve a straightforward problem: sellers couldn't find the right person to contact at AWS, Azure, or GCP. They were guessing at names, submitting referrals to the wrong reps, and losing deals before they started.</Body>
          <Body>So I designed Contact List — an AI-powered surface that surfaced predicted cloud contacts based on historical co-sell data, account coverage, and domain associations. It shipped. Sellers started using it.</Body>
          <Body>But as I watched how sellers actually used Contact List, a bigger pattern emerged. Finding the right contact was only the first step. After the call, sellers had no way to track what happened — no unified view of the partner relationship, no way to attribute revenue, no way to know which partners were worth doubling down on. The data existed in Suger. It was just scattered.</Body>
          <Callout label="The pivot">Contact List was a feature. What sellers actually needed was a partner intelligence system. That realization turned a contact table into the foundation for PRM.</Callout>
          <div style={{ fontSize: '14px', color: 'var(--ink-muted)', fontStyle: 'italic', margin: '16px 0 0' }}>This case study covers both: Contact List (shipped) and PRM Phase 1 (in development).</div>

          <div style={{ background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', margin: '32px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 32px 1.1fr 32px 1fr', gap: '12px', alignItems: 'stretch' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Cloud Marketplaces</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { name: 'AWS', bg: '#FF9900' },
                    { name: 'Azure', bg: '#0078D4' },
                    { name: 'GCP', bg: '#34A853' },
                  ].map(c => (
                    <div key={c.name} style={{ width: '100%', padding: '10px', background: c.bg, color: 'white', borderRadius: '6px', fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>{c.name}</div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'var(--ink-muted)' }}>→</div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Suger Console</div>
                <div style={{ background: 'var(--accent)', color: 'white', borderRadius: '8px', padding: '16px', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                  {[
                    'Co-Sell Referrals',
                    'Private Offers (CPPO)',
                    'Contact List ✦ new',
                    'Partner Profiles ✦ new',
                    'Account Mapping',
                  ].map(item => (
                    <div key={item} style={{ fontSize: '13px', fontWeight: '500' }}>• {item}</div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'var(--ink-muted)' }}>→</div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Seller Teams</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['Account Executives', 'Channel Managers', 'Sales Ops'].map(role => (
                    <div key={role} style={{ background: '#f1f5f9', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px', fontSize: '12px', color: 'var(--ink)' }}>{role}</div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '12px' }}>How Suger connects cloud marketplace data to seller workflows</div>
          </div>
        </Section>

        {/* Problem */}
        <Section label="02 · The Problem">
          <H2>From deal-level to partner-level thinking</H2>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '12px', color: 'var(--ink)' }}>Phase 1: Who do I call?</h3>
            <Body>The co-sell flow asks sellers to submit an opportunity with a cloud contact. But contact selection was essentially manual — sellers had to know the right AWS PSM or GCP rep for their region, industry, and deal size from memory. Most didn't. They'd pick the wrong person, get ignored, or loop in their CSM just to find a name.</Body>
            <Callout label="Insight">The data to solve this already existed in our system — historical co-sell outcomes, account coverage mappings, domain associations. We just weren't surfacing it.</Callout>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '12px', color: 'var(--ink)' }}>Phase 2: What happens after the call?</h3>
            <Body>Sellers who worked with resellers and channel partners had no unified view of those relationships. CPPOs were in the Offers tab. Co-sells were in the Co-Sell tab. Shared accounts were buried in Account Mapping. Revenue attributed to a partner required manual cross-referencing across four different pages.</Body>
            <Callout label="The connection">I didn't design Contact List and PRM as two separate projects. Contact List revealed the problem that PRM solved. The same data gap — contacts scattered, relationships untracked, revenue unattributed — existed at both the individual and company level. Solving one without the other would have left sellers with half the picture.</Callout>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '32px 0' }}>
            <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ef4444', marginBottom: '16px' }}>Before — Data by Type</div>
              {[
                'Offers tab → CPPOs',
                'Co-Sell tab → Referrals',
                'Account Mapping → Shared Accounts',
                'Analytics → Revenue',
              ].map(row => (
                <div key={row} style={{ borderLeft: '4px solid #ef4444', background: 'white', borderRadius: '4px', padding: '8px 12px', margin: '0 0 8px', fontSize: '13px', color: 'var(--ink)' }}>{row}</div>
              ))}
              <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '12px' }}>4 pages to understand 1 partner relationship</div>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#166534', marginBottom: '16px' }}>After — Data by Partner</div>
              <div style={{ background: 'var(--accent)', borderRadius: '8px', padding: '16px', color: 'white' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Acme Resellers</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['CPPOs', 'Co-Sells', 'Shared Accounts', 'Revenue'].map(pill => (
                    <span key={pill} style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '100px', fontSize: '11px' }}>{pill}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#166534', marginTop: '12px' }}>1 profile, complete partner context</div>
            </div>
          </div>
        </Section>

        {/* Discovery */}
        <Section label="03 · Discovery">
          <H2>Understanding the space before designing</H2>
          <Body>Before touching Figma, Gabriel (PM) and I researched how existing PRM tools approached these problems — and where they failed. We looked closely at Euler, Impartner, and Crossbeam/PartnerTap.</Body>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', margin: '32px 0' }}>
            {[
              { tool: 'Impartner', finding: 'Feature-complete but requires partners to log in before sellers get value. Partner adoption kills adoption.' },
              { tool: 'Euler', finding: 'Strong dashboard pattern (KPI cards + leading partners chart). But handles payments — out of our scope entirely.' },
              { tool: 'Crossbeam', finding: 'Built on account mapping ("which accounts does this partner know?"). We already had that data in our backend.' },
            ].map(({ tool, finding }) => (
              <div key={tool} style={{ padding: '20px', background: 'var(--white)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)', marginBottom: '8px' }}>{tool}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{finding}</div>
              </div>
            ))}
          </div>

          <Callout label="Phase 1 design principle">No partner login required to see partner value. All Phase 1 surfaces are seller-facing, built entirely from existing marketplace transaction data. This was our strategic advantage over every existing PRM tool.</Callout>

          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)', marginBottom: '12px', marginTop: '32px' }}>How Suger's approach differs</div>
          <div style={{ margin: '0 0 32px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', background: 'var(--ink)', padding: '10px 14px' }}>
              {['Feature', 'Euler', 'Impartner', 'Suger (Phase 1)'].map(h => (
                <div key={h} style={{ fontSize: '11px', fontWeight: '600', color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {[
              { feature: 'Partner login required', euler: 'Yes', impartner: 'Yes', suger: 'No ✓' },
              { feature: 'Handles payments', euler: 'Yes', impartner: 'No', suger: 'No (marketplace only)' },
              { feature: 'Account mapping', euler: 'Limited', impartner: 'Via integrations', suger: 'Native ✓' },
              { feature: 'Data source', euler: 'Manual + CRM', impartner: 'Manual + CRM', suger: 'Marketplace transactions ✓' },
              { feature: 'Time to seller value', euler: 'Weeks', impartner: 'Months', suger: 'Day 1 ✓' },
            ].map((row, i) => (
              <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', padding: '12px 14px', background: i % 2 === 0 ? 'var(--white)' : 'var(--bg)', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)' }}>{row.feature}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>{row.euler}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>{row.impartner}</div>
                <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600' }}>{row.suger}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact List */}
        <Section label="04 · Design — Contact List">
          <H2>Solving the "who do I call?" problem</H2>
          <Body>Contact List was a new product surface I designed from scratch — a structured, filterable view of cloud contacts enriched with AI-predicted signals to help sellers identify the right person to engage for a specific deal.</Body>
          <Body>The core table handled three user types (cloud reps, buyers, and partners) with 14 columns: Name, Source, Role, Cloud Partner, Managed Domains, Industries, Owners, Region, Coverage Location, # of Accounts, Open Pipeline, Closed Won, Success Rate, and Last Updated.</Body>

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '16px', color: 'var(--ink)' }}>The AI confidence design challenge</h3>
            <Body>The most interesting decision: how much AI intelligence do we surface to the user? Our backend predicted relevant contacts based on historical co-sell outcomes and account overlap. The question was what to show.</Body>
            <ExplorationTable rows={[
              { option: 'Option A: Confidence scores', rationale: 'Show a numeric score (e.g. "87% match") next to each predicted contact, letting sellers evaluate prediction quality.', decision: 'Rejected — cognitive overhead. Sellers act on names, not probabilities.', verdict: 'rejected' },
              { option: 'Option B: Source badges only', rationale: 'Show where each contact came from (Predicted, Referral, Uploaded) without a score. Tells sellers why without asking them to evaluate.', decision: 'Adopted — balanced signal, low friction.', verdict: 'adopted' },
              { option: 'Option C: No AI signals', rationale: 'Clean list with no provenance indicators. Simpler UI but sellers lose trust — they can\'t tell which contacts are reliable vs. guessed.', decision: 'Rejected — breaks trust in the data.', verdict: 'rejected' },
            ]} />
            <Body>The confidence score lived in the backend and informed ranking. But we deliberately didn't expose the number in the UI. The 'Predicted' badge (yellow) and 'Referral' badge (green) gave sellers enough signal to calibrate trust without adding a number they'd have to interpret.</Body>
          </div>

          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px', margin: '32px 0' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>What shipped</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                'Sortable 14-column table with horizontal scroll (~1,640px total width)',
                'Cloud Partner, region, currency filters + column picker',
                '"Show My Contacts" toggle for relationship-based filtering',
                'Contact Detail page: 70/30 split, Accounts / Opportunities / Co-Sell tabs',
                'Salesforce Lightning integration rebuilt in SLDS v2',
                'Source badges: Predicted (yellow), Referral (green), Uploaded (blue)',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.5' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>—</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', fontWeight: '600', background: 'var(--accent-light)', color: 'var(--accent)', padding: '3px 10px', borderRadius: '100px', marginBottom: '12px', display: 'inline-block' }}>Wireframe</span>
            <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', margin: '8px 0 32px' }}>
              <div style={{ background: '#f1f5f9', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                <div style={{ flex: 1, background: 'white', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px 12px', fontSize: '11px', color: 'var(--ink-muted)', marginLeft: '8px' }}>console.suger.io/contact</div>
              </div>
              <div style={{ background: 'var(--ink)', padding: '10px 16px', display: 'grid', gridTemplateColumns: '200px 80px 120px 100px 1fr 80px 100px 100px', gap: '8px' }}>
                {['Name', 'Source', 'Role', 'Cloud', 'Domains', 'Region', 'Pipeline', 'Success'].map(h => (
                  <div key={h} style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>
              {[
                { name: 'Bob Hardin · PSM', source: 'Predicted', role: 'PSM', cloud: 'AWS', domain: 'amazon.com', region: 'US West', pipeline: '$45K', success: '71%' },
                { name: 'Sarah Chen · AM', source: 'Referral', role: 'Account Mgr', cloud: 'Azure', domain: 'microsoft.com', region: 'US East', pipeline: '$120K', success: '84%' },
                { name: 'Mike Johnson · PSM', source: 'Predicted', role: 'PSM', cloud: 'GCP', domain: 'google.com', region: 'Central', pipeline: '$28K', success: '62%' },
                { name: 'Emily Rodriguez', source: 'Uploaded', role: 'Channel Mgr', cloud: 'AWS', domain: 'aws.amazon.com', region: 'US East', pipeline: '$89K', success: '78%' },
              ].map((row, i) => {
                const sourceStyle =
                  row.source === 'Predicted' ? { bg: '#fef9c3', color: '#854d0e' } :
                  row.source === 'Referral' ? { bg: '#dcfce7', color: '#166534' } :
                  { bg: '#dbeafe', color: '#1e40af' };
                const cloudStyle =
                  row.cloud === 'AWS' ? { bg: '#fff3e0', color: '#FF9900' } :
                  row.cloud === 'Azure' ? { bg: '#e3f2ff', color: '#0078D4' } :
                  { bg: '#e8f0fe', color: '#4285F4' };
                return (
                  <div key={row.name} style={{ padding: '10px 16px', display: 'grid', gridTemplateColumns: '200px 80px 120px 100px 1fr 80px 100px 100px', gap: '8px', borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--white)' : 'var(--bg)', alignItems: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--ink)' }}>{row.name}</div>
                    <div><span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '100px', background: sourceStyle.bg, color: sourceStyle.color }}>{row.source}</span></div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{row.role}</div>
                    <div><span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '100px', background: cloudStyle.bg, color: cloudStyle.color }}>{row.cloud}</span></div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{row.domain}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{row.region}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: '600' }}>{row.pipeline}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: '600' }}>{row.success}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '8px' }}>Contact List — 14-column table with AI source badges (Predicted, Referral, Uploaded)</div>
          </div>
        </Section>

        {/* PRM */}
        <Section label="05 · Design — Partner Relationship Management">
          <H2>Organizing data by partner, not by transaction type</H2>
          <Body>PRM Phase 1 was the bigger design challenge — not because individual components were complex, but because the architectural decision about how to organize partner data would shape every surface downstream.</Body>

          <ExplorationTable rows={[
            { option: 'Organized by type (current)', rationale: 'Offers tab shows all CPPOs. Co-Sell tab shows all referrals. Sellers must mentally join these to understand one partner relationship.', decision: 'Current state — too much cognitive load across four pages.', verdict: 'rejected' },
            { option: 'Organized by partner (new)', rationale: 'One Partner Profile shows all CPPOs, co-sells, shared accounts, revenue, and timeline for a specific partner company.', decision: 'Adopted — partner-centric model.', verdict: 'adopted' },
          ]} />

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '16px', color: 'var(--ink)' }}>Partner Profile design decisions</h3>
            <ExplorationTable rows={[
              { option: 'Long scroll', rationale: 'All five sections visible on one page. Easier to see everything but overwhelming for quick lookups.', decision: 'Rejected — too dense.', verdict: 'rejected' },
              { option: 'Horizontal tabs', rationale: 'Each section in its own tab. Clean but hides context — sellers can\'t see CPPO activity while reviewing co-sells.', decision: 'Partial — used for sub-sections only.', verdict: 'partial' },
              { option: 'Anchored sections', rationale: 'Sections stacked with sticky section navigation. Sellers can scroll or jump. Balances density with discoverability.', decision: 'Adopted — best of both.', verdict: 'adopted' },
            ]} />
          </div>

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>AI Partner Overview card</h3>
            <Body>An auto-scraped, AI-generated summary of the partner company — specializations, key products, target industries, known customers — updated periodically in the background. Reduces the prep work sellers do before a partner QBR without requiring any manual data entry.</Body>
          </div>

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>The Shadow Partner problem</h3>
            <Body>In Phase 1, all partners are "shadow partners" — they exist in Suger derived from transaction data but have no Suger login and potentially inconsistent names across CPPOs and co-sells. This shaped every design decision: every section needed a graceful degraded state, domain matching as primary key, and a "Possible duplicate" indicator for partners with >90% name similarity.</Body>
          </div>

          <div style={{ margin: '0 0 32px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', background: 'var(--accent-light)', color: 'var(--accent)', padding: '3px 10px', borderRadius: '100px', marginBottom: '12px', display: 'inline-block' }}>Wireframe</span>
            <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', margin: '8px 0 0' }}>
              <div style={{ background: '#f1f5f9', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                <div style={{ flex: 1, background: 'white', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px 12px', fontSize: '11px', color: 'var(--ink-muted)', marginLeft: '8px' }}>console.suger.io/partners/cloudsync</div>
              </div>
              <div style={{ background: 'var(--bg)', padding: '16px', display: 'flex', gap: '16px' }}>
                <div style={{ flex: '0 0 65%' }}>
                  <div style={{ background: 'var(--accent)', borderRadius: '8px', padding: '14px 16px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>CloudSync Solutions</div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '4px', background: '#FF9900', color: 'white' }}>AWS</span>
                        <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '4px', background: '#0078D4', color: 'white' }}>Azure</span>
                        <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '4px', background: '#22c55e', color: 'white' }}>Active</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['Share Co-Sell', 'Create CPPO'].map(b => (
                        <button key={b} style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.4)', color: 'white', background: 'transparent', cursor: 'pointer' }}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                    {[
                      { label: 'Total Revenue', value: '$2.5M', delta: '+12%', pos: true },
                      { label: 'Total Deals', value: '34', delta: '+5%', pos: true },
                      { label: 'Avg Deal Size', value: '$72K', delta: '-3%', pos: false },
                    ].map(m => (
                      <div key={m.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '6px', padding: '12px' }}>
                        <div style={{ fontSize: '10px', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{m.label}</div>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)' }}>{m.value}</div>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: m.pos ? '#22c55e' : '#ef4444' }}>{m.delta}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '8px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#7c3aed' }}>✦ AI Partner Overview</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Last scraped Mar 3</div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-soft)', lineHeight: '1.6', marginTop: '8px' }}>Cloud-native reseller specializing in multi-cloud migration. AWS Advanced Partner, Azure Gold. Focus: financial services & healthcare.</div>
                  </div>
                </div>
                <div style={{ flex: '0 0 35%' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Basic Information</div>
                  {[
                    ['Partner Manager', 'Jane Doe'],
                    ['Partner Type', 'Reseller'],
                    ['Partnership Since', 'Mar 14, 2024'],
                    ['Last Active', '2 days ago'],
                    ['Cloud Tier', 'AWS Advanced'],
                    ['CRM Account', '+ Connect'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid var(--border)', marginBottom: '10px', fontSize: '12px' }}>
                      <span style={{ color: 'var(--ink-muted)' }}>{k}</span>
                      <span style={{ color: k === 'CRM Account' ? 'var(--accent)' : 'var(--ink)', fontWeight: k === 'CRM Account' ? '600' : '400' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '8px' }}>Partner Profile — Revenue metrics, AI overview, and basic information panel</div>
          </div>

          {/* Prototype link */}
          <div style={{
            background: 'var(--accent)', borderRadius: '12px', padding: '32px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '8px' }}>Interactive Prototype</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'white', marginBottom: '8px' }}>PRM Phase 1 — Lovable Prototype</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Structure validated in Lovable. Final implementation in PrimeOne design system.</div>
            </div>
            <a
              href="https://preview--suger-prm.lovable.app"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#1A4D2E', color: 'white',
                padding: '12px 24px', borderRadius: '100px',
                fontSize: '14px', fontWeight: '600',
                flexShrink: 0,
              }}
            >
              View Prototype ↗
            </a>
          </div>
        </Section>

        {/* Prototype — Partner Discovery & Collaborations */}
        <PartnerDiscoverySection />

        {/* The System */}
        <Section label="07 · The System">
          <H2>How Contact List and PRM connect</H2>
          <Body>These weren't two separate projects. They're the same problem at different levels of abstraction.</Body>

          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', marginBottom: '20px', marginTop: '24px' }}>How data flows between Contact List and PRM</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'center', margin: '24px 0' }}>
            {[
              { label: 'Seller finds contact', primary: true },
              { arrow: true },
              { label: 'Tags on co-sell', primary: false },
              { arrow: true },
              { label: 'Partner record updated', primary: false },
              { arrow: true },
              { label: 'Revenue attributed', primary: false },
              { arrow: true },
              { label: 'Partner Profile enriched', primary: true },
            ].map((n, i) => n.arrow ? (
              <span key={i} style={{ fontSize: '20px', color: 'var(--ink-muted)' }}>→</span>
            ) : (
              <div key={i} style={{
                background: n.primary ? 'var(--accent)' : 'var(--accent-light)',
                color: n.primary ? 'white' : 'var(--accent)',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                textAlign: 'center',
                minWidth: '120px',
              }}>{n.label}</div>
            ))}
          </div>

          <div style={{ background: 'var(--bg)', border: '1px dashed var(--border)', borderRadius: '8px', padding: '16px', marginTop: '16px', marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', fontSize: '12px' }}>
              <div style={{ fontWeight: '700', color: 'var(--accent)', marginBottom: '6px' }}>Contact List</div>
              <div style={{ color: 'var(--ink-soft)' }}>Predicted contacts · Source badges · Account overlap</div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center' }}>
              <div>Shared data layer</div>
              <div>Account Mapping Backend</div>
            </div>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', fontSize: '12px' }}>
              <div style={{ fontWeight: '700', color: 'var(--accent)', marginBottom: '6px' }}>PRM Phase 1</div>
              <div style={{ color: 'var(--ink-soft)' }}>Shared Accounts · Partner Discovery · Co-sell attribution</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', margin: '32px 0', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
            {[
              { from: 'Contact List', arrow: '→', to: 'Co-sell submission', desc: 'Seller finds the right cloud rep, tags them on a co-sell' },
              { from: 'Co-sell submission', arrow: '→', to: 'Partner Profile', desc: 'Tagged co-sell immediately appears in that partner\'s Co-Sell History' },
              { from: 'CPPO transaction', arrow: '→', to: 'Partner Profile', desc: 'Revenue attributed, timeline updated, shadow partner record enriched' },
              { from: 'Account mapping backend', arrow: '→', to: 'Shared Accounts', desc: 'Same data model powers both contact predictions and partner account overlap' },
              { from: 'Share Portal (Contact List)', arrow: '→', to: 'Share Portal (PRM)', desc: 'UX pattern extended to partner level with visibility controls' },
            ].map(({ from, arrow, to, desc }, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 32px 180px 1fr', alignItems: 'center', padding: '16px 20px', background: 'var(--white)', gap: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)' }}>{from}</div>
                <div style={{ fontSize: '16px', color: 'var(--ink-muted)', textAlign: 'center' }}>{arrow}</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)' }}>{to}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-soft)', paddingLeft: '16px', borderLeft: '1px solid var(--border)' }}>{desc}</div>
              </div>
            ))}
          </div>

          <Callout label="Systems thinking">I could have designed Contact List as a standalone table and called it done. But understanding how it fed into PRM shaped the data model, interaction patterns, and information architecture on both sides. They needed to feel like one coherent product.</Callout>
        </Section>

        {/* Impact */}
        <Section label="08 · Impact">
          <H2>Design decisions that moved the needle</H2>
          <Body>PRM Phase 1 is in active development. Rather than projecting metrics, here are the concrete, defensible impacts of the design decisions themselves.</Body>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '32px 0' }}>
            {[
              { symbol: '4→1', title: 'Pages collapsed into one', desc: 'Reorganizing by partner instead of transaction type meant sellers no longer needed to cross-reference Offers, Co-Sell, Agreements, and Account Mapping to understand one partner relationship.' },
              { symbol: '0', title: 'Partner signups required for Day 1 value', desc: 'Every competing PRM tool requires partner adoption before sellers get value. Phase 1 delivers full seller intelligence from existing marketplace transaction data alone.' },
              { symbol: '✦', title: 'AI that works in the background', desc: 'The AI Partner Overview card auto-scrapes company intelligence so sellers arrive at partner QBRs prepared — without any manual data entry or research.' },
              { symbol: '3', title: 'Interaction patterns reused across surfaces', desc: 'The Share Portal UX pattern built for Contact List was extended directly into PRM. The account mapping backend powers both contact predictions and partner shared accounts.' },
            ].map(({ symbol, title, desc }) => (
              <div key={title} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'var(--accent)', fontStyle: 'italic', lineHeight: '1' }}>{symbol}</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--ink)', marginBottom: '8px' }}>{title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--accent-light)', borderRadius: '10px', padding: '20px 24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'Scope discipline', text: "Cutting 6 out of 10 potential features wasn't limiting — it made Phase 1 shippable in 4 weeks." },
              { label: 'Data before design', text: 'The best design decision was realizing we already had all the data we needed. We just needed to reorganize it.' },
              { label: 'Systems over features', text: 'Designing Contact List and PRM as connected surfaces, not separate projects, made both stronger.' },
            ].map(({ label, text }) => (
              <div key={label} style={{ flex: '1 1 220px', minWidth: '220px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{label}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{text}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* AI Tools */}
        <Section label="09 · AI in My Workflow">
          <H2>How I used AI tools throughout this project</H2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
            {[
              { tool: 'Claude Code', use: 'Rapid prototyping and portfolio rebuild. Used to generate and iterate on front-end components without blocking on dev cycles.' },
              { tool: 'Lovable', use: 'Built the PRM structural prototype to validate information architecture before committing to high-fidelity design.' },
              { tool: 'Figma Make', use: 'Prompt-driven component iteration. Useful for quickly generating layout variations to test with stakeholders.' },
              { tool: 'Google Stitch', use: 'Connection Hub panel design — drafted prompts that I ran myself to maintain design ownership while moving fast.' },
              { tool: 'Claude (API)', use: 'AI Partner Overview card — auto-scraped and summarized partner company intelligence directly in the product.' },
              { tool: 'Cursor', use: 'Code-adjacent design work. Helped iterate on design specs and technical documentation faster.' },
            ].map(({ tool, use }) => (
              <div key={tool} style={{ padding: '20px', background: 'var(--white)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)', marginBottom: '8px' }}>{tool}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{use}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Reflection */}
        <Section label="10 · Reflection">
          <H2>What I'd do differently</H2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
            {[
              { title: 'Involve cloud reps earlier', body: 'We designed primarily from the seller\'s perspective. Post-launch, cloud reps wanted more context about why accounts were highlighted — a confidence signal we removed from the seller-facing view.' },
              { title: 'Default view for the 14-column table', body: 'Correct for power users but overwhelming for first-time users. I\'d add a "Recommended columns" default showing only the 6-7 most used, with the full 14 via column picker.' },
              { title: 'More time on shadow partner deduplication', body: 'I underestimated how messy partner identity data would be. More time on the data model edge cases early would have saved iteration cycles on the Partner List view.' },
            ].map(({ title, body }) => (
              <div key={title} style={{ display: 'grid', gridTemplateColumns: '8px 1fr', gap: '16px', paddingLeft: '0' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', marginTop: '6px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', marginBottom: '4px' }}>{title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Next project nav */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--ink-soft)', fontWeight: '500' }}>
            ← All Work
          </Link>
          <a href="https://samanthaho-productdesigner.framer.website/revvity" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--ink)', fontWeight: '500' }}>
            Next: Revvity Homogenizer →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── APP ────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/case-study/suger-prm" element={<SugerCaseStudy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
