import React from 'react';
import { Link } from 'react-router-dom';
import { CaseStudyNav } from './caseStudyNav';

// ── Shared primitives (mirror the case-study look used across the site) ──────
function Section({ label, children, id }) {
  return (
    <section id={id} style={{ marginBottom: '80px', scrollMarginTop: '88px' }}>
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
      fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3.2vw, 32px)',
      lineHeight: '1.25', marginBottom: '20px', color: 'var(--ink)',
    }}>{children}</h2>
  );
}

function Body({ children }) {
  return (
    <p style={{
      fontSize: '17px', color: 'var(--ink-soft)', lineHeight: '1.8',
      marginBottom: '16px', fontWeight: '300', maxWidth: '740px',
    }}>{children}</p>
  );
}

function SubHead({ children }) {
  return (
    <h3 style={{
      fontFamily: 'var(--serif)', fontSize: '20px', lineHeight: '1.3',
      margin: '32px 0 12px', color: 'var(--ink)',
    }}>{children}</h3>
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

function Quote({ label, children }) {
  return (
    <blockquote style={{ margin: '20px 0', paddingLeft: '22px', borderLeft: '3px solid var(--border)' }}>
      {label && <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>{label}</div>}
      <p style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--ink)', lineHeight: '1.6', margin: 0 }}>&ldquo;{children}&rdquo;</p>
    </blockquote>
  );
}

function List({ items }) {
  return (
    <ul style={{ margin: '8px 0 20px', paddingLeft: '0', listStyle: 'none', maxWidth: '740px' }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '16px', color: 'var(--ink-soft)', lineHeight: '1.7', marginBottom: '10px' }}>
          <span style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Metrics({ items }) {
  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '28px 0' }}>
      {items.map((m, i) => (
        <div key={i} style={{ flex: '1 1 160px', minWidth: '160px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '22px 24px' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '40px', lineHeight: '1', color: 'var(--accent)', marginBottom: '10px' }}>{m.value}</div>
          <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.5' }}>{m.label}</div>
        </div>
      ))}
    </div>
  );
}

// A framed image or looping video. No fixed aspect ratio, so wide diagrams and
// tall panels both display in full.
function Figure({ src, video, caption, max = '760px', tight = false }) {
  return (
    <figure style={{ margin: tight ? '0 0 12px' : '32px auto', maxWidth: tight ? '100%' : max }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(62,42,31,0.10)', background: 'var(--white)' }}>
        {video ? (
          <video src={video} autoPlay loop muted playsInline preload="metadata" style={{ display: 'block', width: '100%' }} />
        ) : (
          <img src={src} alt={caption || ''} loading="lazy" style={{ display: 'block', width: '100%' }} />
        )}
      </div>
      {caption && <figcaption style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '10px' }}>{caption}</figcaption>}
    </figure>
  );
}

function Block({ block, IMG, tight }) {
  if (block.p) return <Body>{block.p}</Body>;
  if (block.sub) return <SubHead>{block.sub}</SubHead>;
  if (block.quote) return <Quote label={block.quote.label}>{block.quote.text}</Quote>;
  if (block.callout) return <Callout label={block.callout.label}>{block.callout.text}</Callout>;
  if (block.list) return <List items={block.list} />;
  if (block.metrics) return <Metrics items={block.metrics} />;
  if (block.columns) return (
    <div className="cs-2col">
      {block.columns.map((col, ci) => (
        <div key={ci}>{col.map((b, bi) => <Block key={bi} block={b} IMG={IMG} tight />)}</div>
      ))}
    </div>
  );
  if (block.img) return <Figure src={`${IMG}/${block.img}`} caption={block.cap} max={block.max} tight={tight} />;
  if (block.video) return <Figure video={`${IMG}/${block.video}`} caption={block.cap} max={block.max} tight={tight} />;
  return null;
}

export default function NarrativeCaseStudy({ data }) {
  const IMG = `/case-studies/${data.slug}`;
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--cs-bg)', '--accent': data.accent, '--accent-light': data.accentLight }}>

      {/* Hero */}
      <div style={{ background: 'var(--cs-bg)', borderBottom: '1px solid var(--border)', padding: '120px 40px 0' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', paddingBottom: '48px' }}>
          <div className="fade-up stagger-1" style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {data.tags.map(tag => (
              <span key={tag} style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent)', background: 'var(--accent-light)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.04em' }}>{tag}</span>
            ))}
          </div>
          <h1 className="fade-up stagger-2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px, 4.5vw, 50px)', lineHeight: '1.12', color: 'var(--ink)', marginBottom: '20px' }}>
            {data.title}
          </h1>
          <p className="fade-up stagger-3" style={{ fontSize: '17px', color: 'var(--ink-soft)', lineHeight: '1.8', fontWeight: '300' }}>
            {data.subtitle}
          </p>
        </div>
        {data.heroImage && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', border: '1px solid var(--border)', borderBottom: 'none' }}>
              {data.heroImage.endsWith('.mp4')
                ? <video src={`${IMG}/${data.heroImage}`} autoPlay loop muted playsInline style={{ display: 'block', width: '100%' }} />
                : <img src={`${IMG}/${data.heroImage}`} alt={data.title} style={{ display: 'block', width: '100%' }} />}
            </div>
          </div>
        )}
      </div>

      {/* Meta strip */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${data.meta.length}, 1fr)`, gap: '0' }}>
          {data.meta.map(({ label, value }, i) => (
            <div key={label} style={{ padding: '24px 20px', borderRight: i < data.meta.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
              <div style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: '500' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="cs-body">
        <div className="cs-layout">
          <CaseStudyNav sections={data.sections} />
          <div className="cs-content">
            {data.beats.map(beat => {
              const inner = (
                <>
                  {beat.heading && <H2>{beat.heading}</H2>}
                  {beat.blocks.map((block, i) => <Block key={i} block={block} IMG={IMG} />)}
                </>
              );
              if (beat.dark) {
                return (
                  <Section key={beat.id} id={beat.id}>
                    <div style={{
                      background: '#290137', borderRadius: '16px', padding: '40px 40px 44px',
                      '--ink': '#ffffff', '--ink-soft': 'rgba(255,255,255,0.80)', '--ink-muted': 'rgba(255,255,255,0.62)',
                      '--white': 'rgba(255,255,255,0.06)', '--border': 'rgba(255,255,255,0.18)',
                      '--accent': '#C4B5FD', '--accent-light': 'rgba(196,181,253,0.16)',
                    }}>
                      {beat.label && (
                        <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ width: '24px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
                          {beat.label}
                        </div>
                      )}
                      {inner}
                    </div>
                  </Section>
                );
              }
              return (
                <Section key={beat.id} id={beat.id} label={beat.label}>
                  {inner}
                </Section>
              );
            })}

            {/* Next project nav */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--ink-soft)', fontWeight: '500' }}>
                ← All Work
              </Link>
              {data.next && (
                <Link to={data.next.link} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--ink)', fontWeight: '500' }}>
                  Next: {data.next.label} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
