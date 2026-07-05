import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import TaxManagementCaseStudy from './TaxManagementCaseStudy';
import NarrativeCaseStudy from './NarrativeCaseStudy';
import revvityData from './caseStudies/revvity';
import cryptoData from './caseStudies/crypto';
import greenpeaceData from './caseStudies/greenpeace';
import aChanceData from './caseStudies/aChanceInLife';
import { CaseStudyNav } from './caseStudyNav';

// ── GLOBAL STYLES ──────────────────────────────────────────
const globalStyles = `
  @font-face {
    font-family: 'Carlito';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/carlito-400.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Carlito';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/carlito-700.woff2') format('woff2');
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #FAF8F5;
    --cs-bg: #FDFDFC;
    --ink: #3E2A1F;
    --ink-soft: #6B4E3D;
    --ink-muted: #A08B7A;
    --accent: #1A4D2E;
    --accent-light: #E4EDE5;
    --border: #E8E3DC;
    --white: #FFFFFF;
    --serif: 'Carlito', 'Calibri', 'Segoe UI', sans-serif;
    --sans: 'Carlito', 'Calibri', 'Segoe UI', sans-serif;
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

  /* Case study: two-column body (sticky section nav + content) */
  .cs-body { padding: 80px 100px; }
  .cs-layout { display: flex; gap: 48px; align-items: flex-start; }
  .cs-content { flex: 1 1 auto; min-width: 0; }
  .cs-nav { position: sticky; top: 96px; width: 190px; flex: 0 0 190px; align-self: flex-start; }
  .cs-layout::after { content: ''; flex: 0 0 190px; }
  @media (max-width: 1100px) {
    .cs-nav { display: none; }
    .cs-layout { display: block; }
    .cs-content { max-width: none; }
    .cs-layout::after { display: none; }
  }
  @media (max-width: 900px) {
    .cs-body { padding: 60px 24px; }
  }

  /* Home page: work cards grid */
  .work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  @media (max-width: 720px) {
    .work-grid { grid-template-columns: 1fr; }
  }

  /* Case study: two-up comparison (before/after, image+prompts) */
  .cs-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0; align-items: start; }
  @media (max-width: 720px) {
    .cs-2col { grid-template-columns: 1fr; }
  }

  /* About: bio text + portrait */
  .about-bio { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; align-items: start; }
  @media (max-width: 720px) {
    .about-bio { grid-template-columns: 1fr; }
  }

  /* About page: match the case-study content band (100px pad + 190 nav + 48 gap = 338) */
  .about-body { padding: 140px 338px 80px; }
  @media (max-width: 1100px) { .about-body { padding: 120px 100px 80px; } }
  @media (max-width: 900px) { .about-body { padding: 100px 24px 80px; } }
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
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
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
    subtitle: 'Designing Contact List + PRM, from "who do I call?" to a full partner relationship layer for cloud marketplace sellers.',
    tags: ['B2B SaaS', 'AI Features', 'Systems Design', 'PRM'],
    color: '#1A4D2E',
    bgColor: '#E4EDE5',
    image: '/thumbs/suger-prm.jpg',
    link: '/case-study/suger-prm',
    live: true,
  },
  {
    id: 'tax-management',
    number: '02',
    company: 'Suger · AI Product Designer · 2026',
    title: 'Tax Management: Revenue-to-Tax Reconciliation',
    subtitle: 'A 0→1 feature that audits whether every dollar of marketplace revenue is represented in the tax books, then explains the gaps and fixes the missing records with one click.',
    tags: ['B2B SaaS', 'AI Features', 'Fintech / Tax', '0→1'],
    color: '#1F4E46',
    bgColor: '#E1EDE9',
    image: '/thumbs/tax-management.jpg',
    link: '/case-study/tax-management',
    live: true,
  },
  {
    id: 'revvity',
    number: '03',
    company: 'Revvity · Product Designer · 2024',
    title: 'Redesigning Revvity\'s Homogenizer Workstation',
    subtitle: 'Streamlined a complex lab workflow, cutting implementation time by 68% and increasing team efficiency by 1.5×.',
    tags: ['B2B SaaS', 'Biotech', 'Workflow Design'],
    color: '#1A4D2E',
    bgColor: '#E8F5EC',
    image: '/thumbs/revvity.jpg',
    link: '/case-study/revvity',
    live: true,
  },
  {
    id: 'crypto',
    number: '04',
    company: 'Crypto Arsenal · UX Designer · 2023',
    title: 'Redesigning a Crypto Trading Dashboard',
    subtitle: 'Smarter source input for TradingView. Improved workflow efficiency by 15% through data visualization and user flow optimization.',
    tags: ['Dashboard', 'Data Viz', 'B2B SaaS'],
    color: '#7C2D12',
    bgColor: '#FEF3EC',
    image: '/thumbs/crypto.jpg',
    link: '/case-study/crypto-arsenal',
    live: true,
  },
  {
    id: 'greenpeace',
    number: '05',
    company: 'Greenpeace · UX Designer · 2024',
    title: 'Greenpeace Ambassador Program',
    subtitle: 'Pitched a volunteer-to-ambassador journey with a self-serve digital approval flow, backed by a 22-page service design blueprint.',
    tags: ['Service Design', 'NGO', 'Research'],
    color: '#064E3B',
    bgColor: '#ECFDF5',
    image: '/thumbs/greenpeace.jpg',
    link: '/case-study/greenpeace',
    live: true,
  },
  {
    id: 'a-chance-in-life',
    number: '06',
    company: 'A Chance in Life · UX Researcher & Designer · 2024',
    title: 'Run to Donate: A Fitness Challenge App',
    subtitle: 'A run-to-donate concept for A Chance in Life, turning everyday walks and runs into donations, backed by user research and a full app flow.',
    tags: ['Mobile App', 'UX Research', 'NGO'],
    color: '#1D4ED8',
    bgColor: '#E8F0FE',
    image: '/thumbs/a-chance-in-life.jpg',
    link: '/case-study/a-chance-in-life',
    live: true,
  },
];

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

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

  const content = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 18px 40px rgba(62,42,31,0.14)' : '0 2px 12px rgba(62,42,31,0.05)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', background: project.bgColor, aspectRatio: '16 / 10', overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
        <span style={{
          position: 'absolute', top: '14px', left: '14px',
          fontFamily: 'var(--serif)', fontSize: '13px', fontWeight: '600',
          color: 'var(--ink)', background: 'rgba(255,255,255,0.88)',
          padding: '3px 10px', borderRadius: '100px',
        }}>{project.number}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '8px', fontWeight: '400', letterSpacing: '0.02em' }}>
          {project.company}
        </div>
        <div style={{
          fontFamily: 'var(--serif)',
          fontSize: '22px',
          lineHeight: '1.25',
          marginBottom: '10px',
          color: hovered ? project.color : 'var(--ink)',
          transition: 'color 0.3s ease',
        }}>
          {project.title}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.6', marginBottom: '16px' }}>
          {project.subtitle}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {project.tags.map(tag => (
            <span key={tag} style={tagStyle(project.color, project.bgColor)}>{tag}</span>
          ))}
          {!project.live && (
            <span style={tagStyle('#888', '#F0F0F0')}>Framer ↗</span>
          )}
        </div>
      </div>
    </div>
  );

  const linkStyle = { textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' };
  if (project.live) {
    return <Link to={project.link} style={linkStyle}>{content}</Link>;
  }
  return <a href={project.link} target="_blank" rel="noreferrer" style={linkStyle}>{content}</a>;
}

function HomePage() {
  return (
    <div style={{ paddingTop: '140px', maxWidth: '1040px', margin: '0 auto', padding: '140px 40px 80px' }}>
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
        <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '24px' }}>
          Selected Work
        </div>
        <div className="work-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
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
  const IMG = '/about-media';
  const heading = { fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3.2vw, 30px)', lineHeight: '1.25', color: 'var(--ink)', margin: '0 0 20px' };
  const para = { fontSize: '17px', color: 'var(--ink-soft)', lineHeight: '1.8', marginBottom: '18px', fontWeight: '300' };
  const frame = { width: '100%', display: 'block', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 8px 30px rgba(62,42,31,0.08)' };

  return (
    <div className="about-body">
      <div className="fade-up stagger-1" style={{ marginBottom: '48px' }}>
        <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '20px' }}>About</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: '1.15', margin: 0 }}>
          A little bit about me
        </h1>
      </div>

      {/* Bio + portrait */}
      <div className="fade-up stagger-2 about-bio" style={{ marginBottom: '72px' }}>
        <div>
          <p style={para}>I'm a product designer with 3+ years across B2B SaaS startups and enterprise software, spanning cloud marketplace tooling, biotech platforms, and NGO service design.</p>
          <p style={para}>Currently at Suger, I design AI-powered features for a Cloud GTM platform used by companies selling on AWS, GCP, and Azure. I've worked directly with AWS on AI MCP feature launches, designed CRM-integrated tools like an engagement score built on Salesforce, and led the full website rebuild in under two weeks using AI-assisted development tools like Claude Code and Lovable. I'm comfortable owning design end-to-end, from shaping product scope with PMs to shipping alongside engineers in Agile workflows.</p>
          <p style={para}>Before that, I was at Revvity, a large-scale biotech company, where I led new product initiatives, drove design-system accessibility improvements (WCAG), and streamlined workflows that reduced implementation time by 70%. That role taught me how to operate inside complex enterprise systems while keeping the user experience sharp.</p>
          <p style={{ ...para, marginBottom: 0 }}>I hold a Master of Information in UX Design from the University of Toronto, with a focus on accessibility, research, and systems thinking. I also have a background in healthcare and have done design work with Greenpeace, which keeps me grounded in designing for real people, not just edge cases.</p>
        </div>
        <div>
          <img src={`${IMG}/portrait.jpg`} alt="Samantha Ho" loading="lazy" style={{ ...frame, aspectRatio: '3 / 4', objectFit: 'cover' }} />
        </div>
      </div>

      {/* How I got into UX */}
      <div className="fade-up" style={{ marginBottom: '72px' }}>
        <h2 style={heading}>How I got into UX</h2>
        <p style={{ ...para, maxWidth: '740px' }}>Before becoming a designer, I worked as a disability management associate, helping employees navigate workplace accommodations and return-to-work programs. I saw firsthand how poor workflows and unclear systems could add unnecessary stress to people already facing challenges. That experience sparked my passion for designing tools and processes that remove friction, empower users, and make complex systems easier to navigate, and it ultimately led me to UX design.</p>
        <div className="cs-2col">
          <img src={`${IMG}/ux-1.jpg`} alt="" loading="lazy" style={frame} />
          <img src={`${IMG}/ux-2.jpg`} alt="" loading="lazy" style={frame} />
        </div>
      </div>

      {/* Recommendations */}
      <div className="fade-up" style={{ marginBottom: '72px' }}>
        <h2 style={heading}>Recommendations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { quote: 'I had the pleasure of supervising Samantha during her co-op term, and she made an outstanding contribution to our team. She quickly adapted to our fast-paced environment at Revvity, demonstrating a keen ability to learn new concepts and apply them effectively, especially in the complex healthcare UX space. Samantha impressed me with her strong work ethic, attention to detail, and proactive approach to problem-solving. She consistently delivered high-quality work, met challenging deadlines, and was always eager to help colleagues. Her curiosity and commitment to understanding both UX principles and the healthcare sector resulted in solutions that were both practical and innovative.', name: 'Sharath Sundar', title: 'Manager, UX & AI Ops @ Revvity · managed me directly' },
            { quote: "Samantha is an exceptionally talented UX designer. Throughout my time working with her, I've seen her bring countless digital interface projects to life. I am consistently impressed by her ability to transform design requirements into tangible, user-friendly screens with remarkable fluidity. She is also deeply thoughtful about the user experience. As her UX researcher, I appreciated how readily she sought insights on UX principles and best practices to refine her work. Her proactive approach highlights both her dedication to excellence and her strong commitment to cross-functional collaboration.", name: 'Dareen Christabel', title: 'UX Researcher @ Revvity · same team' },
          ].map(({ quote, name, title }) => (
            <div key={name} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px 30px' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: 'var(--ink)', lineHeight: '1.7', margin: '0 0 16px' }}>&ldquo;{quote}&rdquo;</p>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)' }}>{name}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '2px' }}>{title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* When I'm not designing */}
      <div className="fade-up" style={{ marginBottom: '56px' }}>
        <h2 style={heading}>When I'm not designing</h2>
        <p style={{ ...para, maxWidth: '740px' }}>You'll probably find me with paint on my hands, flying down a snowy hill, or running around Toronto training for my next marathon. I love finding new ways to challenge myself, whether it's experimenting with watercolor techniques, snowboarding new terrain, or hitting a new personal record on race day. 🤗</p>
        <div className="cs-2col">
          <img src={`${IMG}/hobby-1.jpg`} alt="" loading="lazy" style={frame} />
          <img src={`${IMG}/hobby-2.jpg`} alt="" loading="lazy" style={frame} />
        </div>
      </div>

      {/* Contact */}
      <div className="fade-up" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
function Section({ label, children, style, id }) {
  return (
    <section id={id} style={{ marginBottom: '80px', scrollMarginTop: '88px', ...style }}>
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
      fontSize: '17px', color: 'var(--ink-soft)', lineHeight: '1.8',
      marginBottom: '16px', fontWeight: '300', maxWidth: '740px', ...style,
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

function ProductMedia({ src, caption }) {
  const isVideo = src.endsWith('.mp4');
  const frame = {
    maxWidth: '100%', width: '100%', display: 'block',
    borderRadius: '10px', border: '1px solid var(--border)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  };
  return (
    <div style={{ margin: '32px auto', textAlign: 'center' }}>
      {isVideo ? (
        <video src={src} style={frame} autoPlay loop muted playsInline preload="metadata" />
      ) : (
        <img src={src} style={frame} loading="lazy" alt={caption} />
      )}
      {caption && <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '8px' }}>{caption}</div>}
    </div>
  );
}

function Quote({ children, cite }) {
  return (
    <blockquote style={{ margin: '28px 0', paddingLeft: '22px', borderLeft: '3px solid var(--accent)' }}>
      <p style={{ fontFamily: 'var(--serif)', fontSize: '19px', color: 'var(--ink)', lineHeight: '1.6', margin: 0 }}>&ldquo;{children}&rdquo;</p>
      <footer style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '10px' }}>{cite}</footer>
    </blockquote>
  );
}

function PartnerDiscoverySection() {
  const [activeTab, setActiveTab] = useState('discovery');
  const [discoveryStep, setDiscoveryStep] = useState('list');
  const [inviteStep, setInviteStep] = useState(1);

  const tabs = [
    { id: 'discovery', label: '🔍 Partner Discovery' },
    { id: 'invite', label: '✦ Invite Wizard' },
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
      { id: 'cosell', label: 'Partner Co-Sells' },
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

  const scoreLabel = (s) => (s >= 90 ? 'High' : s >= 75 ? 'Medium' : 'Low');
  const partners = [
    { name: 'Stratosphere IT', type: 'Reseller', channels: ['AWS', 'Azure', 'GCP'], targets: 'Acme Corp, Northwind, +12', rev: '$4.2M', score: 94 },
    { name: 'NexGen Consulting', type: 'SI', channels: ['Azure', 'GCP'], targets: 'Globex, Initech, +7', rev: '$3.1M', score: 87 },
    { name: 'CloudSync Solutions', type: 'Reseller', channels: ['AWS', 'Azure'], targets: 'Umbrella Data, Hooli, +10', rev: '$2.5M', score: 91 },
    { name: 'DataBridge Partners', type: 'SI', channels: ['AWS'], targets: 'Stark Systems, +6', rev: '$1.9M', score: 78 },
    { name: 'Meridian Software', type: 'ISV', channels: ['Azure'], targets: 'Wayne Retail, +4', rev: '$1.6M', score: 72 },
    { name: 'PeakCloud Tech', type: 'ISV', channels: ['AWS'], targets: 'Soylent, +3', rev: '$890K', score: 68 },
  ];

  const renderDiscoveryList = () => (
    <div style={{ background: '#f8fafc' }}>
      <NavBar />
      <SubTabs active="discovery" />
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '20px', color: '#1e293b', fontWeight: '600', marginBottom: '4px' }}>✦ Suggested Partners <span style={{ color: '#94a3b8', fontWeight: '500' }}>(6)</span></h3>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Marketplace partners with potential deals matching your CRM accounts.</div>
          </div>
          <button onClick={() => setDiscoveryStep('invite')} style={{ background: '#F97316', color: 'white', fontSize: '13px', fontWeight: '600', padding: '10px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', flexShrink: 0 }}>+ Invite Partner</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {partners.map(p => (
            <div key={p.name} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{p.name}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '600', color: scoreColor(p.score) }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: scoreColor(p.score) }} />{scoreLabel(p.score)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '100px', background: `${typeColors[p.type]}1a`, color: typeColors[p.type] }}>{p.type}</span>
                {p.channels.map(c => (
                  <span key={c} style={{ fontSize: '10px', fontWeight: '600', padding: '2px 6px', borderRadius: '4px', background: channelColors[c].bg, color: channelColors[c].color }}>{c}</span>
                ))}
              </div>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '3px' }}>Recommended Targets</div>
              <div style={{ fontSize: '12px', color: '#475569', marginBottom: '12px' }}>{p.targets}</div>
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>Potential Revenue</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>{p.rev}</div>
                </div>
                <button onClick={() => setDiscoveryStep('invite')} style={{ background: 'white', color: '#334155', fontSize: '12px', fontWeight: '600', padding: '7px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>Invite</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const wizardSteps = ['Purpose', 'Context', 'Tone', 'Email', 'Review'];
  const radio = (on) => ({ width: '15px', height: '15px', borderRadius: '50%', border: on ? '5px solid #F97316' : '2px solid #cbd5e1', flexShrink: 0 });
  const fieldLabel = { fontSize: '11px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' };
  const fieldBox = { border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1e293b', background: 'white' };

  const renderInviteFlow = () => (
    <div style={{ background: '#f8fafc' }}>
      <div style={{ background: '#1a1a2e', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span onClick={() => { setInviteStep(1); setDiscoveryStep('list'); if (activeTab === 'invite') setActiveTab('discovery'); }} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', cursor: 'pointer' }}>← Back</span>
        <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Partner Engagement</div>
      </div>
      <div style={{ padding: '24px' }}>
        {/* 5-step stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '22px', flexWrap: 'wrap' }}>
          {wizardSteps.map((label, i) => {
            const n = i + 1; const active = inviteStep === n; const done = inviteStep > n;
            return (
              <React.Fragment key={label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: done ? '#10B981' : active ? '#F97316' : '#e2e8f0', color: (done || active) ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>{done ? '✓' : n}</div>
                  <span style={{ fontSize: '12px', color: active ? '#1e293b' : '#64748b', fontWeight: active ? '600' : '400' }}>{label}</span>
                </div>
                {i < wizardSteps.length - 1 && <div style={{ width: '22px', height: '1px', background: '#e2e8f0' }} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* STEP 1, Purpose + mode + domain classification */}
        {inviteStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 14px', background: 'white' }}>
                <span style={radio(false)} /><span style={{ fontSize: '13px', color: '#475569' }}>Select recommended partner</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '2px solid #F97316', borderRadius: '8px', padding: '12px 14px', background: '#fff7ed' }}>
                <span style={radio(true)} /><span style={{ fontSize: '13px', color: '#1e293b', fontWeight: '600' }}>Invite a new partner</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div><label style={fieldLabel}>Partner Company Name</label><div style={fieldBox}>Stratosphere IT</div></div>
              <div><label style={fieldLabel}>Contact Email Address</label><div style={fieldBox}>mike@stratosphere-it.example</div></div>
            </div>
            {/* Domain-classification preview (live = Case C) */}
            <div style={{ border: '1px solid #e9d5ff', background: 'linear-gradient(135deg,#faf5ff,#f3e8ff)', borderRadius: '8px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '15px' }}>✦</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#7C3AED' }}>Stratosphere IT</span>
                {['AWS', 'Azure'].map(c => <span key={c} style={{ fontSize: '10px', fontWeight: '600', padding: '2px 6px', borderRadius: '4px', background: channelColors[c].bg, color: channelColors[c].color }}>{c}</span>)}
              </div>
              <div style={{ fontSize: '12px', color: '#6b21a8' }}>We recognise this partner as a marketplace reseller on the channels above.</div>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Detected from the email domain: <strong>A</strong> existing Suger customer · <strong>B</strong> new (direct) · <strong style={{ color: '#7C3AED' }}>C known reseller ✓</strong></div>
          </div>
        )}

        {/* STEP 2, Context */}
        {inviteStep === 2 && (
          <div>
            <label style={fieldLabel}>Context about your collaboration goals (optional)</label>
            <div style={{ ...fieldBox, minHeight: '96px', color: '#475569', lineHeight: '1.6' }}>We share 14 accounts in financial services and see strong co-sell potential on AWS. Would love to align on joint pipeline for FY26.</div>
          </div>
        )}

        {/* STEP 3, Tone */}
        {inviteStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[['Professional', true], ['Casual', false], ['Custom', false]].map(([t, on]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', border: on ? '2px solid #F97316' : '1px solid #e2e8f0', background: on ? '#fff7ed' : 'white', borderRadius: '8px', padding: '12px 14px' }}>
                <span style={radio(on)} /><span style={{ fontSize: '13px', color: on ? '#1e293b' : '#475569', fontWeight: on ? '600' : '400' }}>{t}</span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 4, AI-drafted email */}
        {inviteStep === 4 && (
          <div style={{ background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', border: '1px solid #e9d5ff', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '16px' }}>✦</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#7C3AED' }}>AI-drafted email</span>
              <span style={{ display: 'inline-flex', gap: '3px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#A855F7', opacity: 0.5 + (i * 0.15), animation: `fadeIn 1.4s ease-in-out ${i * 0.2}s infinite alternate` }} />)}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#6b21a8', marginBottom: '8px' }}>Subject: Partnering on shared AWS accounts</div>
            <div style={{ background: 'white', border: '1px solid #e9d5ff', borderRadius: '6px', padding: '16px', fontSize: '13px', color: '#1e293b', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '10px' }}>Hi Mike,</div>
              <div style={{ marginBottom: '10px' }}>I noticed we share <strong>14 accounts</strong>, particularly in financial services, which aligns closely with your team's expertise.</div>
              <div style={{ marginBottom: '10px' }}>With your <strong>AWS Advanced Tier</strong> status, there's a real opportunity to collaborate on co-sell motions around these shared customers.</div>
              <div>Looking forward to hearing from you,<br />Samantha</div>
            </div>
          </div>
        )}

        {/* STEP 5, Review */}
        {inviteStep === 5 && (
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Review &amp; send</div>
            {[['Partner', 'Stratosphere IT (new · reseller)'], ['Purpose', 'Account Overlap'], ['Recipient', 'mike@stratosphere-it.example'], ['Tone', 'Professional']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>{k}</span><span style={{ color: '#1e293b', fontWeight: '500' }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* SENT confirmation */}
        {inviteStep === 6 && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#DCFCE7', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '12px' }}>✓</div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>Invitation sent to Stratosphere IT</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>It'll appear under Collaborations → Threads as an outbound invite.</div>
            </div>
            <button onClick={() => { setInviteStep(1); setDiscoveryStep('list'); setActiveTab('discovery'); }} style={{ background: 'white', color: '#1e293b', fontSize: '13px', fontWeight: '500', padding: '10px 18px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>← Back to Discovery</button>
          </div>
        )}

        {/* Wizard footer nav */}
        {inviteStep <= 5 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={() => setInviteStep(Math.max(1, inviteStep - 1))} disabled={inviteStep === 1}
              style={{ background: 'white', color: inviteStep === 1 ? '#cbd5e1' : '#1e293b', fontSize: '13px', fontWeight: '500', padding: '9px 18px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: inviteStep === 1 ? 'default' : 'pointer' }}>Back</button>
            <button onClick={() => setInviteStep(inviteStep + 1)}
              style={{ background: '#F97316', color: 'white', fontSize: '13px', fontWeight: '600', padding: '9px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>{inviteStep === 5 ? 'Send ↗' : 'Next'}</button>
          </div>
        )}
      </div>
    </div>
  );

  const threads = [
    { partner: 'CloudSync Solutions', type: 'Account Overlap', subject: 'Partnering on shared AWS accounts', accounts: 'Acme Corp +3', state: 'Accepted', dir: 'Outbound', recipient: 'dana@cloudsync.example', created: 'Jun 2' },
    { partner: 'Stratosphere IT', type: 'Account Overlap', subject: 'Co-sell on financial services book', accounts: 'Northwind +13', state: 'Sent', dir: 'Outbound', recipient: 'mike@stratosphere-it.example', created: 'Just now' },
    { partner: 'NexGen Consulting', type: 'Deal Collaboration', subject: 'Joint pursuit, Globex migration', accounts: 'Globex', state: 'Accepted', dir: 'Inbound', recipient: 'you@yourco.example', created: 'May 28' },
    { partner: 'DataBridge Partners', type: 'Network Invitation', subject: 'Intro, partner network', accounts: 'Stark Systems', state: 'Declined', dir: 'Outbound', recipient: 'ops@databridge.example', created: 'May 20' },
    { partner: 'Meridian Software', type: 'Account Overlap', subject: 'Overlap on Wayne Retail', accounts: 'Wayne Retail', state: 'Accepted', dir: 'Inbound', recipient: 'you@yourco.example', created: 'May 15' },
  ];

  const stateStyle = (s) => (
    s === 'Accepted' ? { color: '#166534', bg: '#DCFCE7' } :
    s === 'Sent' ? { color: '#92400E', bg: '#FEF3C7' } :
    { color: '#991B1B', bg: '#FEE2E2' }
  );
  const dirStyle = (d) => (d === 'Inbound' ? { color: '#0369A1', bg: '#E0F2FE' } : { color: '#475569', bg: '#F1F5F9' });

  const renderCollab = () => (
    <div style={{ background: '#f8fafc' }}>
      <NavBar />
      <SubTabs active="collab" />
      <div style={{ padding: '24px' }}>
        {/* Threads / Pending Invitations sub-tabs */}
        <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <div style={{ padding: '8px 0', fontSize: '13px', fontWeight: '600', color: '#1e293b', borderBottom: '2px solid #F97316', display: 'flex', gap: '6px', alignItems: 'center' }}>Threads <span style={{ fontSize: '10px', background: '#e2e8f0', color: '#64748b', padding: '1px 6px', borderRadius: '100px' }}>5</span></div>
          <div style={{ padding: '8px 0', fontSize: '13px', color: '#64748b', display: 'flex', gap: '6px', alignItems: 'center' }}>Pending Invitations <span style={{ fontSize: '10px', background: '#e2e8f0', color: '#64748b', padding: '1px 6px', borderRadius: '100px' }}>1</span></div>
        </div>
        {/* Threads table */}
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1.6fr 0.8fr 0.9fr 1.3fr 0.7fr 32px', gap: '8px', padding: '10px 14px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            {['Partner', 'Type', 'Subject', 'State', 'Direction', 'Recipient', 'Created', ''].map(h => (
              <div key={h} style={{ fontSize: '9px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</div>
            ))}
          </div>
          {threads.map((t, i) => {
            const st = stateStyle(t.state); const dr = dirStyle(t.dir);
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1.6fr 0.8fr 0.9fr 1.3fr 0.7fr 32px', gap: '8px', padding: '11px 14px', borderBottom: i < threads.length - 1 ? '1px solid #f1f5f9' : 'none', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b' }}>{t.partner}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{t.type}</div>
                <div style={{ fontSize: '11px', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.subject}</div>
                <div><span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '100px', background: st.bg, color: st.color }}>{t.state}</span></div>
                <div><span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '100px', background: dr.bg, color: dr.color }}>{t.dir}</span></div>
                <div style={{ fontSize: '11px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.recipient}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{t.created}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center' }}>👁</div>
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
    <Section id="prototype" label="06 · Prototype, Partner Discovery & Collaborations">
      <H2>Two prototypes push the model further: one helps sellers find partners worth pursuing, the other turns "I should reach out" into a one-click, AI-drafted invite.</H2>
      <Body>
        Finding a partner worth pursuing was its own problem; sellers were relying on gut and hallway conversations. Partner Discovery ranks candidate partners by account overlap and channel fit, so the shortlist is data-backed instead of remembered. The Invite Wizard then drafts the outreach from those same signals, and the Collaborations tab picks up once a partner accepts: shared accounts auto-map and activity starts flowing into the main dashboard. Try the three tabs below to walk each flow.
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

      <Callout label="AI Design Decision">
        The invite message is generated from the same signals that scored the partner, shared accounts, cloud tier, industry fit. Sellers always see the draft before sending and can Regenerate or Edit. Trust comes from making AI's reasoning legible, not from automating the send.
      </Callout>

      {/* Invite intelligence, domain classification + data-integrity decisions */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '12px', color: 'var(--ink)' }}>One invite button, three cases</h3>
        <Body>An invite isn't just an email, it can link two organizations together. So as the seller types a contact email, the system quietly classifies the domain, and provisions the partnership correctly only once the partner accepts. Nothing is created until acceptance, the classification is server-stamped and re-checked at accept time, and the nightly sync is idempotent so it never clobbers a channel a human set.</Body>
        <div style={{ margin: '20px 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1.2fr', background: 'var(--ink)', padding: '10px 14px' }}>
            {['Case', 'The domain is…', 'What happens on acceptance'].map(h => (
              <div key={h} style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>
          {[
            { c: 'A', domain: 'An existing Suger org', out: 'Paired inbound + outbound invites; both orgs get linked partnerships' },
            { c: 'B', domain: 'Brand-new / unknown', out: 'A "shadow org" is created; channel tagged "Direct"' },
            { c: 'C', domain: 'A known marketplace reseller', out: 'Partnership tagged with the real marketplace channel(s), not "Direct"' },
          ].map((r, i) => (
            <div key={r.c} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1.2fr', padding: '12px 14px', background: i % 2 === 0 ? 'var(--white)' : 'var(--bg)', borderTop: '1px solid var(--border)', alignItems: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent)', fontFamily: 'var(--serif)' }}>{r.c}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: '600', paddingRight: '12px' }}>{r.domain}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{r.out}</div>
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
          Prototyped in Lovable, then rebuilt in-product ↗
        </div>
        <a href="https://suger-prm.lovable.app" target="_blank" rel="noreferrer" style={{
          background: '#F97316', color: 'white', fontSize: '13px', fontWeight: '600',
          padding: '10px 20px', borderRadius: '100px',
          display: 'inline-flex', alignItems: 'center', gap: '6px',
        }}>
          Early prototype ↗
        </a>
      </div>
    </Section>
  );
}

const PRM_SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'contact-list', label: 'Contact List' },
  { id: 'prm', label: 'PRM' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'system', label: 'System' },
  { id: 'impact', label: 'Impact' },
  { id: 'next', label: "What's Next" },
  { id: 'ai-tools', label: 'AI Tools' },
  { id: 'reflection', label: 'Reflection' },
];

function SugerCaseStudy() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--cs-bg)', '--accent': '#4A3222', '--accent-light': '#EDE5D8' }}>
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-bg)', borderBottom: '1px solid var(--border)', padding: '120px 40px 0', paddingTop: '120px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column-reverse', gap: 0 }}>
          <div style={{ position: 'relative', borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', width: '100%', maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ background: '#1a1a2e', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '4px', padding: '4px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginLeft: '4px' }}>console.suger.io/partners</div>
              <span style={{ background: '#F97316', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '100px' }}>PrimeOne DS</span>
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
                  {['Tasks', 'Partner Files', 'Training'].map(b => (
                    <button key={b} style={{ border: '1px solid #e2e8f0', fontSize: '9px', color: '#64748b', padding: '4px 10px', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>{b}</button>
                  ))}
                  <button style={{ background: '#F97316', color: 'white', fontSize: '9px', fontWeight: '600', padding: '4px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>+ Invite Partner</button>
                </div>
              </div>

              {/* KPI cards */}
              <div style={{ padding: '0 12px 8px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { label: 'ACTIVE PARTNERS', value: '15', delta: '+3% vs prior period' },
                  { label: 'PARTNER-INFLUENCED PIPELINE', value: '$1.8M', delta: '+15%' },
                  { label: 'PARTNER-SOURCED REVENUE', value: '$1.3M', delta: '+8%' },
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
                  { dot: '#16a34a', text: 'Co-Sell Won, TechStart SaaS Expansion closed, $95K', meta: 'CloudSync Solutions · Yesterday' },
                  { dot: '#d97706', text: 'Deal Registered, Bolt Cloud Migration, $175K (Pending)', meta: 'CloudSync · 2 days ago' },
                  { dot: '#ea580c', text: 'Co-Sell Tagged, Vertex AI Workloads tagged, $340K', meta: 'Stratosphere IT · 2 days ago' },
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
                  { label: 'Partner Co-Sells', active: false },
                ].map(t => (
                  <span key={t.label} style={{ background: t.active ? '#1e293b' : '#f1f5f9', color: t.active ? 'white' : '#64748b', fontSize: '9px', fontWeight: '600', padding: '4px 10px', borderRadius: '100px' }}>{t.label}</span>
                ))}
              </div>

              {/* Partners table */}
              <div style={{ padding: '0 16px 12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.8fr 0.9fr 0.9fr 1fr 0.8fr 0.8fr 0.7fr', gap: '8px', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                  {['Partner Name', 'Connected', 'Partner Types', 'Channels', 'Partner Manager', 'Total Rev', 'Upcoming', 'Last Activity'].map(h => (
                    <div key={h} style={{ fontSize: '8px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>{h}</div>
                  ))}
                </div>
                {[
                  { name: 'CloudSync Solutions', type: 'RESELLER', connected: true, channels: ['AWS', 'Azure'], mgr: 'Jane Doe', total: '$2.5M', up: '$420K', last: 'Jun 17' },
                  { name: 'DataBridge Partners', type: 'SI', connected: true, channels: ['AWS'], mgr: 'Sam Lee', total: '$1.9M', up: '$180K', last: 'Jun 14' },
                  { name: 'NexGen Consulting', type: 'SI', connected: false, channels: ['Azure', 'GCP'], mgr: 'Jane Doe', total: '$3.1M', up: '$560K', last: 'Jun 18' },
                ].map(p => (
                  <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.8fr 0.9fr 0.9fr 1fr 0.8fr 0.8fr 0.7fr', gap: '8px', padding: '8px 0', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '600', color: '#1e293b' }}>{p.name}</div>
                    <div style={{ fontSize: '9px', fontWeight: '600', color: p.connected ? '#16a34a' : '#94a3b8' }}>{p.connected ? '✓ Connected' : '—'}</div>
                    <div><span style={{ fontSize: '8px', fontWeight: '600', background: '#f1f5f9', color: '#64748b', padding: '1px 6px', borderRadius: '100px' }}>{p.type}</span></div>
                    <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                      {p.channels.map(c => {
                        const s = c === 'AWS' ? { bg: '#fff3e0', color: '#FF9900' } : c === 'Azure' ? { bg: '#e3f2ff', color: '#0078D4' } : { bg: '#e8f0fe', color: '#4285F4' };
                        return <span key={c} style={{ background: s.bg, color: s.color, fontSize: '8px', padding: '1px 5px', borderRadius: '3px' }}>{c}</span>;
                      })}
                    </div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>{p.mgr}</div>
                    <div style={{ fontSize: '10px', fontWeight: '600', color: '#1e293b' }}>{p.total}</div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>{p.up}</div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>{p.last}</div>
                  </div>
                ))}
              </div>
            </div>
            <a href="https://suger-prm.lovable.app" target="_blank" rel="noreferrer" style={{ background: '#F97316', padding: '10px 16px', textAlign: 'center', fontSize: '11px', fontWeight: '600', color: 'white', display: 'block', textDecoration: 'none', width: '100%' }}>↗ View the early Lovable prototype</a>
          </div>

          <div style={{ paddingTop: '48px', paddingBottom: '80px', maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <div className="fade-up stagger-1" style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['B2B SaaS', 'AI Features', 'Systems Design', 'PRM'].map(tag => (
                <span key={tag} style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent)', background: 'var(--accent-light)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.04em' }}>{tag}</span>
              ))}
            </div>
            <h1 className="fade-up stagger-2" style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 52px)',
              lineHeight: '1.1', color: 'var(--ink)', marginBottom: '20px',
            }}>
              Suger Partner Intelligence System
            </h1>
            <p className="fade-up stagger-3" style={{
              fontSize: '16px', color: 'var(--ink-soft)', lineHeight: '1.8',
              fontWeight: '300', marginBottom: '24px',
            }}>
              What started as a contact list became something bigger. Finding the right person to call was only step one, sellers also needed to track the relationship, attribute revenue, and know which partners were worth investing in.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '100px', background: 'var(--accent-light)', color: 'var(--accent)' }}>Contact List</span>
              <span style={{ color: 'var(--ink-muted)' }}>→</span>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '100px', background: 'var(--accent-light)', color: 'var(--accent)' }}>Partner Profiles</span>
              <span style={{ color: 'var(--ink-muted)' }}>→</span>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '100px', background: 'var(--accent)', color: 'white' }}>AI Relationship Layer</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '8px' }}>The scope expanded as the design revealed a bigger opportunity</div>
          </div>
        </div>
      </div>

      {/* Meta strip */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
          {[
            { label: 'Company', value: 'Suger.io' },
            { label: 'Role', value: 'Product Designer (Lead)' },
            { label: 'Timeline', value: '2025–2026' },
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
      <div className="cs-body">
        <div className="cs-layout">
          <CaseStudyNav sections={PRM_SECTIONS} />
          <div className="cs-content">

        {/* Context */}
        <Section id="context" label="01 · Context">
          <H2>I was brought on to fix a narrow problem: sellers couldn't find the right cloud contact. The way they used what I shipped revealed a much bigger one.</H2>
          <Body>Suger's co-sell console had a deceptively simple gap: when a seller went to submit a co-sell, they couldn't reliably find the right person to contact at AWS, Azure, or GCP. So they guessed, pulling names from memory, submitting referrals to the wrong reps, or pinging their CSM just to get one. Deals stalled before they ever really started, and no one could say why with any precision.</Body>
          <Body>So I designed Contact List, an AI-powered surface that surfaced predicted cloud contacts based on historical co-sell data, account coverage, and domain associations. It shipped. Sellers started using it.</Body>
          <Body>But as I watched how sellers actually used Contact List, a bigger pattern emerged. Finding the right contact was only the first step. After the call, sellers had no way to track what happened. There was no unified view of the partner relationship, no way to attribute revenue, no way to know which partners were worth doubling down on. The data existed in Suger. It was just scattered.</Body>
          <Callout label="The pivot">Contact List was a feature. What sellers actually needed was a partner intelligence system. That realization turned a contact table into the foundation for PRM.</Callout>
          <Callout label="The real challenge">This was as much an organizational problem as a design one. I was evolving a feature that had already shipped, across a US design team and an engineering team in China, on a phased timeline, co-designing the data surfaces with our PM. The design question was inseparable from the delivery question: what could we ship in one quarter, in what order, without forcing a rebuild later?</Callout>
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
        <Section id="problem" label="02 · The Problem">
          <H2>The deeper I looked, the clearer it got: the real problem wasn't one deal at a time. It was that no one could see a partner relationship whole.</H2>
          <Body>The problem lived at two levels, and they turned out to be the same one. Before a deal, sellers couldn't find the right contact. After a deal, they couldn't see the relationship that contact belonged to. Both traced back to a single root cause: the data existed in Suger, but it was organized for the system, not for the seller.</Body>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '12px', color: 'var(--ink)' }}>Phase 1: Who do I call?</h3>
            <Body>The co-sell flow asks sellers to submit an opportunity with a cloud contact. But contact selection was essentially manual. Sellers had to know the right AWS PSM or GCP rep for their region, industry, and deal size from memory. Most didn't. They'd pick the wrong person, get ignored, or loop in their CSM just to find a name. The frustrating part: the data to solve this already existed in our system, historical co-sell outcomes, account coverage mappings, domain associations. We just weren't surfacing it.</Body>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '12px', color: 'var(--ink)' }}>Phase 2: What happens after the call?</h3>
            <Body>Sellers who worked with resellers and channel partners had no unified view of those relationships. CPPOs were in the Offers tab. Co-sells were in the Co-Sell tab. Shared accounts were buried in Account Mapping. Revenue attributed to a partner required manual cross-referencing across four different pages. The same data gap existed at both the individual and the company level, which is why solving one without the other would have left sellers with half the picture.</Body>
            <Quote cite="Channel Manager, discovery interview">By the time I've pulled up Offers, Co-Sell, and Account Mapping to piece one partner together, I've lost the thread on what I was even trying to decide.</Quote>          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '32px 0' }}>
            <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ef4444', marginBottom: '16px' }}>Before, Data by Type</div>
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
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#166534', marginBottom: '16px' }}>After, Data by Partner</div>
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
        <Section id="discovery" label="03 · Discovery">
          <H2>Before opening Figma, we studied how every existing PRM tool solved this, and found the gap they all left open.</H2>
          <Body>Before touching Figma, Gabriel (PM) and I researched how existing PRM tools approached these problems, and more usefully, where they broke down. We looked closely at Euler, Impartner, and Crossbeam/PartnerTap, mapping each against one question: how fast does a seller actually get value, and what has to happen before they do? I owned the design and information-architecture decisions; Gabriel and I set the Phase 1 scope together. Impartner and Euler gated value behind partner login or payment features we didn't need, while Crossbeam's account-mapping model came closest to ours, and we already had that data in the backend. The pattern that emerged from that comparison shaped our entire strategy.</Body>

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
        <Section id="contact-list" label="04 · Design: Contact List">
          <H2>On paper, the assignment was simple: give sellers a filterable list of cloud contacts so they'd stop guessing at names.</H2>
          <Body>So I designed Contact List from scratch: a structured, filterable view of cloud reps, buyers, and partners. But the moment I looked at the data behind it, the real design problem surfaced. Our backend could already predict who to call. The question was no longer whether we could build a list; it was how much of that intelligence to put in front of a seller without eroding their trust in it.</Body>
          <Quote cite="Account Executive, discovery interview">Half the time I'm picking an AWS rep off a hunch. If they go quiet, I've lost a week, and I still don't know if I asked the right person.</Quote>
          <Body>The core table handled three user types (cloud reps, buyers, and partners) with 14 columns: Name, Source, Role, Cloud Partner, Managed Domains, Industries, Owners, Region, Coverage Location, # of Accounts, Open Pipeline, Closed Won, Success Rate, and Last Updated.</Body>

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '16px', color: 'var(--ink)' }}>The AI confidence design challenge</h3>
            <Body>The most interesting decision: how much AI intelligence do we surface to the user? Our backend predicted relevant contacts based on historical co-sell outcomes and account overlap. The question was what to show.</Body>
            <ExplorationTable rows={[
              { option: 'Option A: Confidence scores', rationale: 'Show a numeric score (e.g. "87% match") next to each predicted contact, letting sellers evaluate prediction quality.', decision: 'Rejected, cognitive overhead. Sellers act on names, not probabilities.', verdict: 'rejected' },
              { option: 'Option B: Source badges only', rationale: 'Show where each contact came from (Predicted, Referral, Uploaded) without a score. Tells sellers why without asking them to evaluate.', decision: 'Adopted, balanced signal, low friction.', verdict: 'adopted' },
              { option: 'Option C: No AI signals', rationale: 'Clean list with no provenance indicators. Simpler UI but sellers lose trust, they can\'t tell which contacts are reliable vs. guessed.', decision: 'Rejected, breaks trust in the data.', verdict: 'rejected' },
            ]} />
            <Body>The confidence score lived in the backend and informed ranking. But we deliberately didn't expose the number in the UI. The 'Predicted' badge (yellow) and 'Referral' badge (green) gave sellers enough signal to calibrate trust without adding a number they'd have to interpret.</Body>
            <Callout label="The tradeoff I own">Sellers wanted the fastest path to a name; cloud reps, further down the funnel, wanted to know why an account surfaced. I optimized the shipped view for sellers and kept the confidence signal in the backend. That was the right call for launch, and it is also the tradeoff I would revisit first (see Reflection).</Callout>
          </div>

          <Body>What shipped: a sortable table with horizontal scroll and a column picker, a "Show My Contacts" toggle for relationship-based filtering, a Contact Detail page split into Accounts, Opportunities, and Co-Sell tabs, source badges (Predicted, Referral, Uploaded), and a Salesforce Lightning integration rebuilt in SLDS v2.</Body>

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
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '8px' }}>Contact List, 14-column table with AI source badges (Predicted, Referral, Uploaded)</div>
          </div>
        </Section>

        {/* PRM */}
        <Section id="prm" label="05 · Design: PRM">
          <H2>The core decision wasn't visual. It was whether to keep organizing partner data by transaction type, the way the product already did, or rebuild it around the partner.</H2>
          <Body>PRM Phase 1 was the bigger design challenge, not because individual components were complex, but because one architectural decision would shape every surface downstream. The product already stored partner data by transaction type: CPPOs in one place, co-sells in another, shared accounts in a third. Reorganizing it around the partner meant rethinking the data model, not just the layout. Every screen that followed depended on getting this one call right.</Body>

          <ExplorationTable rows={[
            { option: 'Organized by type (current)', rationale: 'Offers tab shows all CPPOs. Co-Sell tab shows all referrals. Sellers must mentally join these to understand one partner relationship.', decision: 'Current state, too much cognitive load across four pages.', verdict: 'rejected' },
            { option: 'Organized by partner (new)', rationale: 'One Partner Profile shows all CPPOs, co-sells, shared accounts, revenue, and timeline for a specific partner company.', decision: 'Adopted, partner-centric model.', verdict: 'adopted' },
          ]} />

          <Body>For the profile layout, I chose anchored sections with sticky navigation over a single long scroll or hidden tabs, so sellers can jump between CPPOs, co-sells, and shared accounts without losing the context of the others.</Body>

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>AI Partner Overview card</h3>
            <Body>An auto-scraped, AI-generated summary of the partner company, specializations, key products, target industries, known customers, updated periodically in the background. Reduces the prep work sellers do before a partner QBR without requiring any manual data entry.</Body>
          </div>

          <div style={{ margin: '40px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>The Shadow Partner problem</h3>
            <Body>In Phase 1, all partners are "shadow partners", they exist in Suger derived from transaction data but have no Suger login and potentially inconsistent names across CPPOs and co-sells. This shaped every design decision: every section needed a graceful degraded state, domain matching as primary key, and a "Possible duplicate" indicator for partners with >90% name similarity.</Body>
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
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '8px' }}>Partner Profile, Revenue metrics, AI overview, and basic information panel</div>
          </div>

          <div style={{ margin: '48px 0 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>Designing for an offshore build</h3>
            <Body>Because engineering was in a timezone twelve hours away, ambiguity was expensive: a spec that read fine in California could cost a full sprint if it was misread overnight. So I over-specified the hard parts, annotated the shadow-partner edge cases and degraded states directly on the flows, and used the Lovable prototype as a clickable source of truth the team could walk through instead of interpreting static frames. Shipping on the PrimeOne design system did the rest, fewer round-trips on visual details meant the conversation stayed on behavior.</Body>
          </div>
        </Section>

        {/* Prototype, Partner Discovery & Collaborations */}
        <PartnerDiscoverySection />

        {/* The System */}
        <Section id="system" label="07 · The System">
          <H2>Contact List and PRM were never two projects. They're the same problem at different altitudes, running on one shared data layer.</H2>
          <Body>Contact List works at the level of a single person; PRM works at the level of the partner company that person belongs to. But both answer the same question: who should I engage, and what's our history with them? And both read from the same account-mapping backend. Designing them together meant a contact tagged in one surface enriches the partner record in the other, with no duplicate data entry. That shared layer is what makes the two feel like one product instead of two tools bolted together.</Body>

          <div style={{ background: 'var(--bg)', border: '1px dashed var(--border)', borderRadius: '8px', padding: '16px', marginTop: '24px', marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
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

          <Callout label="Systems thinking">I could have designed Contact List as a standalone table and called it done. But understanding how it fed into PRM shaped the data model, interaction patterns, and information architecture on both sides. They needed to feel like one coherent product.</Callout>
        </Section>

        {/* Impact */}
        <Section id="impact" label="08 · Impact">
          <H2>Phase 1 is still shipping, so rather than project metrics I can't yet defend, I'm showing the design decisions themselves, and the outcome each one is built to move.</H2>
          <Body>PRM Phase 1 is still in active development, so I won't pretend to have adoption numbers yet. What I can point to are the design decisions themselves. Each one made a specific, measurable bet about how sellers would work. Below are four that changed what a seller can actually do, and underneath each, the outcome it was built to move. The honest version of impact is naming those bets clearly, not inventing results.</Body>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '32px 0' }}>
            {[
              { symbol: '4→1', title: 'Pages collapsed into one', desc: 'Reorganizing by partner instead of transaction type meant sellers no longer needed to cross-reference Offers, Co-Sell, Agreements, and Account Mapping to understand one partner relationship.' },
              { symbol: '0', title: 'Partner signups required for Day 1 value', desc: 'Every competing PRM tool requires partner adoption before sellers get value. Phase 1 delivers full seller intelligence from existing marketplace transaction data alone.' },
              { symbol: '✦', title: 'AI that works in the background', desc: 'The AI Partner Overview card auto-scrapes company intelligence so sellers arrive at partner QBRs prepared, without any manual data entry or research.' },
              { symbol: '3', title: 'Interaction patterns reused across surfaces', desc: 'The Share Portal UX pattern built for Contact List was extended directly into PRM. The account mapping backend powers both contact predictions and partner shared accounts.' },
            ].map(({ symbol, title, desc }) => (
              <div key={title} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'var(--accent)', lineHeight: '1' }}>{symbol}</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--ink)', marginBottom: '8px' }}>{title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <Body>If Phase 1 has one lesson, it's scope discipline: cutting six of ten candidate features is what made it shippable, and it worked because the data was already there to reorganize, and because Contact List and PRM were designed as one connected system rather than two.</Body>

          <div style={{ margin: '40px 0 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '6px', color: 'var(--ink)' }}>How we'll measure Phase 1</h3>
            <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '20px' }}>These are targets we're instrumenting, not results. Phase 1 is still shipping.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { metric: 'Contact accuracy', target: 'Share of co-sells submitted to a Predicted or Referral contact versus a manual guess.' },
                { metric: 'Time-to-contact', target: 'Minutes from opening a co-sell to selecting a cloud rep.' },
                { metric: 'Partner-view adoption', target: 'Share of channel-active sellers using the Partner Profile weekly.' },
                { metric: 'Attribution coverage', target: 'Percent of partner revenue auto-attributed without manual cross-referencing.' },
              ].map(({ metric, target }) => (
                <div key={metric} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-light)', padding: '2px 8px', borderRadius: '100px' }}>Target</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--ink)' }}>{metric}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{target}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* What's Next */}
        <Section id="next" label="09 · What's Next">
          <H2>The features I cut from Phase 1 weren't dropped. They were sequenced, and now they're the roadmap.</H2>
          <Body>Phase 1 deliberately shipped only what worked from existing marketplace data with zero partner adoption required. The features that needed partner buy-in or new infrastructure were pushed to later phases, and that sequencing is now playing out in the product. Every later phase leans on the partner-centric data model Phase 1 established, which is what lets them ship without a rebuild.</Body>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', margin: '32px 0 0' }}>
            {[
              { title: 'Commissions and payouts', body: 'Set a commission plan once; payouts calculate automatically on deal close, with SPIFFs and overrides. This depends on partner-level revenue attribution, the exact data model Phase 1 established.', src: '/case-studies/prm/product/commission-plans.mp4' },
              { title: 'White-label partner portal', body: 'The whole program under the customer\'s own domain and brand; partners never see Suger. It extends the seller-facing surfaces outward to partners themselves.', src: '/case-studies/prm/product/white-label-portal.mp4' },
              { title: 'Partner LMS and enablement', body: 'Courses, quizzes, and certifications inside the portal, so partners are trained and certified to sell.', src: '/case-studies/prm/product/partner-lms.mp4' },
            ].map(({ title, body, src }) => (
              <div key={title}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', margin: '0 0 8px' }}>{title}</h3>
                <Body>{body}</Body>
                <ProductMedia src={src} caption={title} />
              </div>
            ))}
          </div>

          <Callout label="Why the order held up">Each later phase leans on the partner-centric data model from Phase 1. Reorganizing data by partner first is what makes commissions, attribution, and portal views possible without a rebuild.</Callout>
        </Section>

        {/* AI Tools */}
        <Section id="ai-tools" label="10 · AI in My Workflow">
          <H2>I leaned on AI tools deliberately throughout, to move faster on exploration without handing over the design decisions.</H2>
          <Body>AI didn't replace any part of my process. It compressed the slow parts. I used it to stand up structural prototypes, generate layout variations to react against, and even build the AI-powered features I was designing, while keeping every actual design decision my own. The rule I held to: AI drafts, I decide. Here's where each tool earned its place.</Body>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
            {[
              { tool: 'Claude Code', use: 'Rapid prototyping and portfolio rebuild. Used to generate and iterate on front-end components without blocking on dev cycles.' },
              { tool: 'Lovable', use: 'Built the PRM structural prototype to validate information architecture before committing to high-fidelity design.' },
              { tool: 'Figma Make', use: 'Prompt-driven component iteration. Useful for quickly generating layout variations to test with stakeholders.' },
              { tool: 'Google Stitch', use: 'Connection Hub panel design, drafted prompts that I ran myself to maintain design ownership while moving fast.' },
              { tool: 'Claude (API)', use: 'AI Partner Overview card, auto-scraped and summarized partner company intelligence directly in the product.' },
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
        <Section id="reflection" label="11 · Reflection">
          <H2>Looking back, three things I'd do differently, most of them about messiness I underestimated going in.</H2>
          <Body>Shipping Phase 1 taught me as much about what I'd missed as what I got right. Most of my regrets trace back to the same theme: I designed confidently from the seller's point of view, and underestimated the messiness underneath. The other users I wasn't designing for, the edge cases, and how dirty real partner data would be. None were fatal, but each cost iteration cycles I could have saved.</Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
            {[
              { title: 'Involve cloud reps earlier', body: 'We designed primarily from the seller\'s perspective. Post-launch, cloud reps wanted more context about why accounts were highlighted, a confidence signal we removed from the seller-facing view.' },
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
          <Link to="/case-study/revvity" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--ink)', fontWeight: '500' }}>
            Next: Revvity Homogenizer →
          </Link>
        </div>
          </div>
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
          <Route path="/case-study/tax-management" element={<TaxManagementCaseStudy />} />
          <Route path="/case-study/revvity" element={<NarrativeCaseStudy data={revvityData} />} />
          <Route path="/case-study/crypto-arsenal" element={<NarrativeCaseStudy data={cryptoData} />} />
          <Route path="/case-study/greenpeace" element={<NarrativeCaseStudy data={greenpeaceData} />} />
          <Route path="/case-study/a-chance-in-life" element={<NarrativeCaseStudy data={aChanceData} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
