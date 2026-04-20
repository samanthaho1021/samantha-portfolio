import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// ── GLOBAL STYLES ──────────────────────────────────────────
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #F9F7F4;
    --ink: #111111;
    --ink-soft: #555555;
    --ink-muted: #999999;
    --accent: #2D1B69;
    --accent-light: #EDE9FA;
    --border: #E2DDD8;
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
    background: scrolled ? 'rgba(249,247,244,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    transition: 'all 0.3s ease',
  };

  const logoStyle = {
    fontFamily: 'var(--serif)',
    fontSize: '18px',
    color: 'var(--ink)',
    fontStyle: 'italic',
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
    color: '#2D1B69',
    bgColor: '#EDE9FA',
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
    fontStyle: 'italic',
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
          fontStyle: 'italic',
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
          fontStyle: 'italic',
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
        <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontStyle: 'italic', color: 'var(--ink-soft)' }}>
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
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: '1.15', fontStyle: 'italic', marginBottom: '40px' }}>
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
      lineHeight: '1.2', fontStyle: 'italic', marginBottom: '20px', color: 'var(--ink)',
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
      <p style={{ fontSize: '15px', color: 'var(--accent)', lineHeight: '1.7', fontStyle: 'italic', margin: 0, fontFamily: 'var(--serif)', fontSize: '17px' }}>{children}</p>
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

function SugerCaseStudy() {
  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <div style={{ background: 'var(--accent)', padding: '80px 40px', marginBottom: '0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="fade-up stagger-1" style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['B2B SaaS', 'AI Features', 'Systems Design', 'PRM'].map(tag => (
              <span key={tag} style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.04em' }}>{tag}</span>
            ))}
          </div>
          <h1 className="fade-up stagger-2" style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: '1.1', fontStyle: 'italic', color: 'white', marginBottom: '24px',
          }}>
            Suger Partner Intelligence System
          </h1>
          <p className="fade-up stagger-3" style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7',
            maxWidth: '600px', fontWeight: '300',
          }}>
            Designing Contact List + PRM — from "who do I call?" to a full partner relationship layer for cloud marketplace sellers.
          </p>
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
          <H2>What Suger does, and who uses it</H2>
          <Body>Suger is a Cloud GTM automation platform. It helps software companies sell through cloud marketplaces — AWS, Azure, and GCP — by managing co-sell referrals, private offers (CPPOs), and partner relationships in one place.</Body>
          <Body>The primary users are sellers: Account Executives, Channel Managers, and Sales Ops teams at ISV companies. Their job is to close deals faster by working with cloud partners and resellers — but the tools they had weren't built for that job.</Body>
          <Callout label="The core tension">Suger already had the data — co-sell history, CPPO transactions, account mappings, cloud contacts. The problem was that it was organized by transaction type, not by the people and companies sellers actually needed to act on.</Callout>
        </Section>

        {/* Problem */}
        <Section label="02 · The Problem">
          <H2>Two problems that turned out to be one</H2>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontStyle: 'italic', marginBottom: '12px', color: 'var(--ink)' }}>Problem 1: Sellers didn't know who to call</h3>
            <Body>The co-sell flow asks sellers to submit an opportunity with a cloud contact. But contact selection was essentially manual — sellers had to know the right AWS PSM or GCP rep for their region, industry, and deal size from memory. Most didn't. They'd pick the wrong person, get ignored, or loop in their CSM just to find a name.</Body>
            <Callout label="Insight">The data to solve this already existed in our system — historical co-sell outcomes, account coverage mappings, domain associations. We just weren't surfacing it.</Callout>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontStyle: 'italic', marginBottom: '12px', color: 'var(--ink)' }}>Problem 2: Partner relationships lived nowhere</h3>
            <Body>Sellers who worked with resellers and channel partners had no unified view of those relationships. CPPOs were in the Offers tab. Co-sells were in the Co-Sell tab. Shared accounts were buried in Account Mapping. Revenue attributed to a partner required manual cross-referencing across four different pages.</Body>
            <Callout label="The connection">Contact List solved the "who do I call?" problem at the individual level. PRM solved the "how is this partnership going?" problem at the company level. The same underlying data gap was causing both — and solving one without the other would leave sellers with half the picture.</Callout>
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
        </Section>

        {/* Contact List */}
        <Section label="04 · Design — Contact List">
          <H2>Solving the "who do I call?" problem</H2>
          <Body>Contact List was a new product surface I designed from scratch — a structured, filterable view of cloud contacts enriched with AI-predicted signals to help sellers identify the right person to engage for a specific deal.</Body>
          <Body>The core table handled three user types (cloud reps, buyers, and partners) with 14 columns: Name, Source, Role, Cloud Partner, Managed Domains, Industries, Owners, Region, Coverage Location, # of Accounts, Open Pipeline, Closed Won, Success Rate, and Last Updated.</Body>

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontStyle: 'italic', marginBottom: '16px', color: 'var(--ink)' }}>The AI confidence design challenge</h3>
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
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontStyle: 'italic', marginBottom: '16px', color: 'var(--ink)' }}>Partner Profile design decisions</h3>
            <ExplorationTable rows={[
              { option: 'Long scroll', rationale: 'All five sections visible on one page. Easier to see everything but overwhelming for quick lookups.', decision: 'Rejected — too dense.', verdict: 'rejected' },
              { option: 'Horizontal tabs', rationale: 'Each section in its own tab. Clean but hides context — sellers can\'t see CPPO activity while reviewing co-sells.', decision: 'Partial — used for sub-sections only.', verdict: 'partial' },
              { option: 'Anchored sections', rationale: 'Sections stacked with sticky section navigation. Sellers can scroll or jump. Balances density with discoverability.', decision: 'Adopted — best of both.', verdict: 'adopted' },
            ]} />
          </div>

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontStyle: 'italic', marginBottom: '12px', color: 'var(--ink)' }}>AI Partner Overview card</h3>
            <Body>An auto-scraped, AI-generated summary of the partner company — specializations, key products, target industries, known customers — updated periodically in the background. Reduces the prep work sellers do before a partner QBR without requiring any manual data entry.</Body>
          </div>

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontStyle: 'italic', marginBottom: '12px', color: 'var(--ink)' }}>The Shadow Partner problem</h3>
            <Body>In Phase 1, all partners are "shadow partners" — they exist in Suger derived from transaction data but have no Suger login and potentially inconsistent names across CPPOs and co-sells. This shaped every design decision: every section needed a graceful degraded state, domain matching as primary key, and a "Possible duplicate" indicator for partners with >90% name similarity.</Body>
          </div>

          {/* Prototype link */}
          <div style={{
            background: 'var(--accent)', borderRadius: '12px', padding: '32px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '8px' }}>Interactive Prototype</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontStyle: 'italic', color: 'white', marginBottom: '8px' }}>PRM Phase 1 — Lovable Prototype</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Structure validated in Lovable. Final implementation in PrimeOne design system.</div>
            </div>
            <a
              href="https://preview--suger-prm.lovable.app"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'white', color: 'var(--accent)',
                padding: '12px 24px', borderRadius: '100px',
                fontSize: '14px', fontWeight: '600',
                flexShrink: 0,
              }}
            >
              View Prototype ↗
            </a>
          </div>
        </Section>

        {/* The System */}
        <Section label="06 · The System">
          <H2>How Contact List and PRM connect</H2>
          <Body>These weren't two separate projects. They're the same problem at different levels of abstraction.</Body>

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

        {/* Outcomes */}
        <Section label="07 · Outcomes">
          <H2>Early signals and what we're tracking</H2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '32px 0' }}>
            {[
              { metric: '~40%', label: 'Reduction in time-to-first-outreach', sub: 'Contact List · Predicted contacts reduced lookup friction' },
              { metric: '70%', label: 'Target Partners Tab adoption', sub: 'PRM · Sellers with existing CPPOs, first 2 weeks' },
              { metric: '30%', label: 'Target partner-tagged co-sells', sub: 'PRM · New submissions within 30 days' },
              { metric: '0', label: 'Partner signups required', sub: 'Phase 1 · All value delivered from existing data' },
            ].map(({ metric, label, sub }) => (
              <div key={metric} style={{ padding: '28px', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '42px', fontStyle: 'italic', color: 'var(--accent)', marginBottom: '8px', lineHeight: '1' }}>{metric}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* AI Tools */}
        <Section label="08 · AI in My Workflow">
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
        <Section label="09 · Reflection">
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
