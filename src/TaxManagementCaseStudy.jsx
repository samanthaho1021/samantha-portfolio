import React from 'react';
import { Link } from 'react-router-dom';
import { CaseStudyNav } from './caseStudyNav';

// ── Local case-study primitives (mirrors the shared ones in App.js so this
//    case study is fully self-contained in its own file) ───────────────────
const IMG = '/case-studies/tax-management';
const VID = '/case-studies/tax-management/video';

const TAX_SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'role', label: 'Role & Bet' },
  { id: 'connect', label: 'Connect & Audit' },
  { id: 'review', label: 'Review' },
  { id: 'hard-cases', label: 'Hard Cases' },
  { id: 'design-system', label: 'Design System' },
  { id: 'impact', label: 'Impact' },
];

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

// A product screenshot OR looping video in a browser-chrome frame.
// The media area is a fixed proportional "screen" (16:10): a video fills it
// exactly, while a taller static screenshot scrolls inside the frame.
function Figure({ src, video, poster, alt, caption, url = 'insulin.suger.io/tax', max = '760px', ratio = '16 / 10' }) {
  return (
    <figure style={{ margin: '32px 0', maxWidth: max, marginLeft: 'auto', marginRight: 'auto' }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(62,42,31,0.10)' }}>
        <div style={{ background: '#1a1a2e', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '4px', padding: '4px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginLeft: '4px' }}>{url}</div>
        </div>
        {/* Fixed proportional screen; tall stills scroll within it */}
        <div style={{ aspectRatio: ratio, overflow: 'auto', background: 'var(--white)' }}>
          {video ? (
            <video src={video} poster={poster} autoPlay loop muted playsInline preload="metadata"
                   style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <img src={src} alt={alt} loading="lazy" style={{ display: 'block', width: '100%' }} />
          )}
        </div>
      </div>
      {caption && <figcaption style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '10px' }}>{caption}</figcaption>}
    </figure>
  );
}

// A small labelled swatch for the design-system snapshot.
function Swatch({ hex, name, note }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ width: '28px', height: '28px', borderRadius: '6px', background: hex, border: '1px solid var(--border)', flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink)' }}>{name}</div>
        <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>{note}</div>
      </div>
    </div>
  );
}

export default function TaxManagementCaseStudy() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--cs-bg)', '--accent': '#1F4E46', '--accent-light': '#E1EDE9' }}>

      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-bg)', borderBottom: '1px solid var(--border)', padding: '120px 40px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column-reverse' }}>
          <div style={{ position: 'relative', borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', width: '100%', maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ background: '#1a1a2e', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '4px', padding: '4px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginLeft: '4px' }}>insulin.suger.io/tax</div>
            </div>
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
              <video src={`${VID}/hero.mp4`} poster={`${IMG}/08-audit-dashboard.png`} autoPlay loop muted playsInline
                     style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div style={{ paddingTop: '48px', paddingBottom: '80px', maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <div className="fade-up stagger-1" style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['B2B SaaS', 'AI Features', 'Fintech / Tax', '0→1'].map(tag => (
                <span key={tag} style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent)', background: 'var(--accent-light)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.04em' }}>{tag}</span>
              ))}
            </div>
            <h1 className="fade-up stagger-2" style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 52px)',
              lineHeight: '1.1', color: 'var(--ink)', marginBottom: '20px',
            }}>
              Tax Management — auditing revenue against the tax books
            </h1>
            <p className="fade-up stagger-3" style={{
              fontSize: '16px', color: 'var(--ink-soft)', lineHeight: '1.8', fontWeight: '300', marginBottom: '24px',
            }}>
              Marketplace sellers never really know if every dollar of revenue is represented in their tax
              software — until an audit. I shaped a feature that checks it automatically, explains the gaps
              in plain language, and fixes the missing records with one click.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '100px', background: 'var(--accent-light)', color: 'var(--accent)' }}>Audit</span>
              <span style={{ color: 'var(--ink-muted)' }}>→</span>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '100px', background: 'var(--accent-light)', color: 'var(--accent)' }}>Explain</span>
              <span style={{ color: 'var(--ink-muted)' }}>→</span>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '100px', background: 'var(--accent)', color: 'white' }}>Remediate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meta strip */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
          {[
            { label: 'Company', value: 'Suger.io' },
            { label: 'Role', value: 'Product Designer → PM lens' },
            { label: 'Timeline', value: '2026' },
            { label: 'Status', value: 'MVP · In Progress' },
          ].map(({ label, value }, i) => (
            <div key={label} style={{ padding: '24px 20px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
              <div style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: '500' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '80px 40px' }}>
        <div className="cs-layout">
          <CaseStudyNav sections={TAX_SECTIONS} />
          <div className="cs-content">

        {/* 01 · Context */}
        <Section id="context" label="01 · Context">
          <H2>The gap nobody sees until it's expensive</H2>
          <Body>
            Software companies that sell through AWS, Azure, and GCP end up with revenue scattered across
            many channels. Their tax software — Avalara, Stripe Tax, Anrok — is supposed to hold a matching
            tax record for every taxable sale. But records go missing, get filed under the wrong
            jurisdiction, or get counted twice when a marketplace already remitted the tax.
          </Body>
          <Body>
            Suger already sees all of that revenue. That vantage point is the whole opportunity: we can
            reconcile what a seller *earned* against what their tax system *recorded*, and surface the gaps
            before an auditor does.
          </Body>
          <Callout label="The framing">
            Suger isn't a tax engine — it doesn't compute rates or judge compliance. It's a reconciliation
            layer: read the revenue, read the tax records, and explain where the two disagree.
          </Callout>
        </Section>

        {/* 02 · My role & the product bet */}
        <Section id="role" label="02 · Role & the product bet">
          <H2>Designing the scope, not just the screens</H2>
          <Body>
            I came from a product-design background, but on this feature the highest-leverage work was
            product judgment: deciding what the product should <em>refuse</em> to do. A tax feature can
            balloon into a compliance engine fast. The bet was to stay narrow — audit and remediate — and
            lean on the tax provider for everything downstream.
          </Body>
          <ExplorationTable rows={[
            { option: 'Audit layer (chosen)', rationale: 'Verify that revenue Suger already sees is represented in the tax software; flag gaps, mismatches, duplicates.', decision: 'Adopted — leverages Suger’s unique revenue visibility.', verdict: 'adopted' },
            { option: 'Full tax engine', rationale: 'Compute rates, validate jurisdictions, own compliance end to end.', decision: 'Rejected — too broad; competes with the tax software.', verdict: 'rejected' },
            { option: 'Persist a 2nd tax ledger', rationale: 'Store a full copy of the provider’s tax data inside Suger.', decision: 'Rejected — read per audit; no system-of-record confusion.', verdict: 'rejected' },
            { option: 'Auto-write corrections', rationale: 'Silently create missing records the moment a gap is found.', decision: 'Rejected — every write is explicit + reversible in v1.', verdict: 'rejected' },
          ]} />
          <Callout label="Why it matters">
            Each &ldquo;no&rdquo; kept the surface shippable and safe: nothing writes to a customer&rsquo;s tax
            system without a person approving that exact record.
          </Callout>
        </Section>

        {/* 03 · Flow — connect & audit */}
        <Section id="connect" label="03 · Flow — connect & audit">
          <H2>From zero to a coverage number in a few clicks</H2>
          <Body>
            Onboarding is a three-step connect flow: choose a provider, authorize read access (write is
            gated behind an explicit opt-in), then run the first audit. The authorize step is deliberate
            about trust — it spells out that Suger only creates records when you approve each one.
          </Body>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '8px 0' }}>
            <Figure src={`${IMG}/02-onboarding-choose-provider.png`} alt="Choose a tax provider" caption="Step 1 — choose the tax provider" max="100%" />
            <Figure src={`${IMG}/03-onboarding-authorize.png`} alt="Authorize scopes" caption="Step 2 — authorize (read + approve-only write)" max="100%" />
          </div>
          <Figure src={`${IMG}/06-empty-run-first-audit.png`} alt="Run your first audit" caption="Run the first audit — Suger compares AWS / Azure / GCP revenue against the provider" />
        </Section>

        {/* 04 · Flow — review findings */}
        <Section id="review" label="04 · Flow — review the findings">
          <H2>A coverage number, then the story behind it</H2>
          <Body>
            The audit resolves into one honest headline — how much revenue is actually covered — and a
            breakdown by status and by cloud source. Below it, a filterable table lists every finding, each
            tagged Covered, Uncovered, Ambiguous, Duplicate, or Partner-handled.
          </Body>
          <Figure video={`${VID}/review.mp4`} poster={`${IMG}/08-audit-dashboard.png`} caption="Coverage dashboard — filter findings by status and scan the table" max="820px" />
          <Body>
            Clicking any finding opens a side panel with an AI-written explanation in plain language and the
            single recommended action — so a finance user isn&rsquo;t left interpreting raw tax jargon.
          </Body>
          <Figure video={`${VID}/writeback.mp4`} poster={`${IMG}/09-finding-assistant-writeback.png`} caption="Finding detail — approve the AI's proposed record and Suger writes it back to the provider" />
        </Section>

        {/* 05 · The hard cases */}
        <Section id="hard-cases" label="05 · Designing the hard cases">
          <H2>Where the real design work lived</H2>
          <Body>
            The happy path is easy. The credibility of a tax tool comes from how it handles the messy,
            genuinely-ambiguous cases — the ones where guessing would be worse than asking.
          </Body>

          <div style={{ margin: '32px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>Ambiguous matches — refuse to guess</h3>
            <Body>
              When several tax records could match one sale, the product doesn&rsquo;t pick for you. It shows
              ranked candidates with confidence scores and asks you to confirm — or create a new record.
            </Body>
            <Figure video={`${VID}/resolve.mp4`} poster={`${IMG}/10-finding-ambiguous-candidates.png`} caption="Ambiguous match — pick the right candidate and confirm the link" />
          </div>

          <div style={{ margin: '32px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>Marketplace facilitator &amp; duplicates</h3>
            <Body>
              Under marketplace-facilitator rules, the cloud often already collected and remitted the tax —
              so the seller owes nothing, but the transaction still needs documenting. A naive tool would
              scream &ldquo;uncovered.&rdquo; Instead there&rsquo;s a distinct &ldquo;Partner-handled&rdquo; state, and when tax was
              genuinely collected twice, a one-click void that keeps an audit trail.
            </Body>
            <Figure src={`${IMG}/11-finding-duplicate-void.png`} alt="Duplicate tax finding with void action" caption="Duplicate — tax collected twice; void the provider record, keep the trail" />
          </div>

          <div style={{ margin: '32px 0' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>Already-filed periods → amendments</h3>
            <Body>
              A correction to a period you&rsquo;ve already filed can&rsquo;t just be pushed. Those route into an
              amendment flow with segregation of duties — the person who flags it isn&rsquo;t the person who signs
              it off.
            </Body>
            <Figure src={`${IMG}/14-amended-returns.png`} alt="Filing calendar and amended returns" caption="Filing calendar + amended-returns worklist" />
          </div>
        </Section>

        {/* 06 · Design system snapshot */}
        <Section id="design-system" label="06 · Design system">
          <H2>A status vocabulary that carries the product</H2>
          <Body>
            Because every screen is really about &ldquo;what state is this money in?&rdquo;, the status palette does a
            lot of the communicating. I built a small, semantic system on shadcn/ui conventions — Inter for
            text, JetBrains Mono for tabular currency — with one color per finding state used everywhere.
          </Body>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px 24px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', margin: '24px 0' }}>
            <Swatch hex="#16A34A" name="Covered" note="Matched to a tax record" />
            <Swatch hex="#DC2626" name="Uncovered" note="No matching record" />
            <Swatch hex="#7C3AED" name="Ambiguous" note="Discrepancy / multiple matches" />
            <Swatch hex="#DB2777" name="Duplicate" note="Tax collected twice" />
            <Swatch hex="#D97706" name="Partner-handled" note="Marketplace facilitated" />
            <Swatch hex="#6E56CF" name="Suger violet" note="Brand accent" />
          </div>
          <Figure src={`${IMG}/13-action-history.png`} alt="Action history log" caption="The same status vocabulary and tabular type carry through to the action-history log" />
        </Section>

        {/* 07 · Impact / what's next */}
        <Section id="impact" label="07 · Impact & what's next">
          <H2>Shippable because it stayed narrow</H2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '32px 0' }}>
            {[
              { symbol: '1', title: 'One honest number', desc: 'A single coverage % that a finance lead can trust, with the full breakdown one click away.' },
              { symbol: '0', title: 'Silent writes', desc: 'Nothing hits the customer’s tax system without a person approving that exact record.' },
              { symbol: '6', title: 'Finding states', desc: 'A semantic status system that turns raw tax discrepancies into decisions anyone can act on.' },
              { symbol: '✦', title: 'AI as explainer', desc: 'Plain-language explanations and a single recommended action per finding — not a chatbot bolt-on.' },
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
          <Callout label="Roadmap">
            The indirect-tax MVP is the wedge. Next is Direct Tax — AI-prepared income-tax returns,
            multi-state nexus monitoring, and R&amp;D credits — with a self-service-first, optional-CPA
            filing model. Sequenced deliberately: prove the audit loop before taking on preparation.
          </Callout>
          <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '16px' }}>
            Note: product data shown is illustrative — customer names, figures, and records are fictional placeholders.
          </div>
        </Section>

        {/* Footer nav */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--ink-soft)', fontWeight: '500' }}>
            ← All Work
          </Link>
          <Link to="/case-study/suger-prm" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--ink)', fontWeight: '500' }}>
            Next: Suger Partner Intelligence →
          </Link>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
