import React, { useEffect, useState } from 'react';

/**
 * Sticky left-rail section navigator for case study pages.
 * Numbered, uppercase labels with a scroll-spy active state (orange number +
 * ink label active; muted gray inactive) and thin dividers. Clicking a row
 * smooth-scrolls to that section. Hidden below 1100px via the `.cs-nav` class.
 *
 * @param {{ sections: {id: string, label: string}[] }} props
 */
export function CaseStudyNav({ sections }) {
  const [active, setActive] = useState(sections[0] && sections[0].id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        // Highlight the intersecting section closest to the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
  };

  return (
    <nav className="cs-nav" aria-label="Section navigation">
      {sections.map((s, i) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => go(s.id)}
            style={{
              display: 'grid', gridTemplateColumns: '26px 1fr', gap: '10px', alignItems: 'center',
              width: '100%', textAlign: 'left', cursor: 'pointer', background: 'transparent',
              border: 'none', borderTop: i === 0 ? 'none' : '1px solid var(--border)',
              padding: '15px 0', fontFamily: 'var(--sans)',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.04em', color: on ? '#F97316' : 'var(--ink-muted)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{
              fontSize: '13px', fontWeight: on ? '700' : '500', letterSpacing: '0.07em',
              textTransform: 'uppercase', color: on ? 'var(--ink)' : '#9AA1AC', transition: 'color 0.2s ease',
            }}>
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
