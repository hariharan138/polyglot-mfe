import React from 'react';

const steps = [
  {
    n: '01',
    title: 'Shell bootstraps',
    desc: 'The Vite shell parses mfe-config.ts and injects a <script> tag for each micro frontend — no bundling, no copy-paste.',
    accent: '#818cf8',
    glow: 'rgba(129,140,248,0.15)',
  },
  {
    n: '02',
    title: 'Web Component registers',
    desc: 'Each script calls customElements.define(). Angular, React, Vue, or Next.js boot inside that element — completely isolated.',
    accent: '#38bdf8',
    glow: 'rgba(56,189,248,0.15)',
  },
  {
    n: '03',
    title: 'Elements upgrade & render',
    desc: 'The custom elements already in the HTML upgrade in-place. One cohesive page, four independent runtimes, zero iframes.',
    accent: '#4ade80',
    glow: 'rgba(74,222,128,0.15)',
  },
];

const principles = [
  { icon: '⬡', label: 'Framework-agnostic contract', desc: 'Web Components API is the only shared interface.' },
  { icon: '⬡', label: 'Independent deployments',     desc: 'Each MFE can be built and released separately.' },
  { icon: '⬡', label: 'Dynamic loading',             desc: 'Scripts are injected by URL — no static imports in the Shell.' },
  { icon: '⬡', label: 'Zero iframes',                desc: 'Direct DOM composition, full CSS cascade support.' },
];

const s: Record<string, React.CSSProperties> = {
  wrap: {
    padding: '6rem 2rem',
    background: 'var(--surface, #0f0f1a)',
    borderTop: '1px solid var(--border, rgba(255,255,255,0.07))',
    borderBottom: '1px solid var(--border, rgba(255,255,255,0.07))',
  },
  inner: {
    maxWidth: 'var(--max, 1100px)',
    margin: '0 auto',
  },
  sectionBadge: {
    display: 'inline-block',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--sky, #38bdf8)',
    background: 'rgba(56,189,248,0.12)',
    border: '1px solid rgba(56,189,248,0.35)',
    padding: '0.35rem 0.75rem',
    borderRadius: 8,
    marginBottom: '1.25rem',
  },
  head: { marginBottom: '3.5rem' },
  label: {
    margin: '0 0 1rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'var(--sky, #38bdf8)',
  },
  title: {
    margin: '0 0 1rem',
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.15,
    color: 'var(--text, #e2e2f0)',
  },
  sub: {
    margin: 0,
    maxWidth: 520,
    fontSize: '1rem',
    lineHeight: 1.75,
    color: 'var(--muted, rgba(226,226,240,0.5))',
  },
  steps: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 0,
    marginBottom: '4rem',
    maxWidth: 680,
  },
  stepRow: {
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  connector: {
    width: 2,
    height: 32,
    marginLeft: 28,
    flexShrink: 0,
  },
  stepCard: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
    padding: '1.5rem 1.75rem',
    borderRadius: 'var(--r, 10px)',
    border: '1px solid',
    background: 'var(--bg, #07070d)',
  },
  stepN: {
    fontSize: '0.72rem',
    fontWeight: 700,
    fontFamily: 'monospace',
    letterSpacing: '0.06em',
    opacity: 0.9,
    paddingTop: '0.2rem',
    flexShrink: 0,
    width: 24,
  },
  stepTitle: {
    margin: '0 0 0.45rem',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: 'var(--text, #e2e2f0)',
  },
  stepDesc: {
    margin: 0,
    fontSize: '0.9rem',
    lineHeight: 1.7,
    color: 'var(--muted, rgba(226,226,240,0.5))',
  },
  divider: {
    height: 1,
    background: 'var(--border, rgba(255,255,255,0.07))',
    marginBottom: '3.5rem',
  },
  principles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
  },
  principle: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  principleIcon: {
    fontSize: '1rem',
    color: 'var(--indigo, #818cf8)',
    flexShrink: 0,
    marginTop: '0.1rem',
  },
  principleLabel: {
    margin: '0 0 0.3rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--text, #e2e2f0)',
    letterSpacing: '-0.01em',
  },
  principleDesc: {
    margin: 0,
    fontSize: '0.83rem',
    lineHeight: 1.6,
    color: 'var(--muted, rgba(226,226,240,0.5))',
  },
};

export function MiddleSection() {
  return (
    <section style={s.wrap} id="architecture">
      <div style={s.inner}>
        <p style={s.sectionBadge}>This section is <strong>React</strong></p>
        <div style={s.head}>
          <p style={s.label}>Architecture</p>
          <h2 style={s.title}>How it works.</h2>
          <p style={s.sub}>
            Three steps from shell bootstrap to fully rendered polyglot page.
          </p>
        </div>

        <div style={s.steps}>
          {steps.map((step, i) => (
            <div key={step.n} style={s.stepRow}>
              {i < steps.length - 1 && <div style={{ ...s.connector, background: step.accent + '44' }} />}
              <div style={{ ...s.stepCard, borderColor: step.accent + '33', boxShadow: `0 0 0 1px ${step.accent}22, 0 8px 32px ${step.glow}` }}>
                <span style={{ ...s.stepN, color: step.accent }}>{step.n}</span>
                <div>
                  <h3 style={s.stepTitle}>{step.title}</h3>
                  <p style={s.stepDesc}>{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={s.divider} />

        <div style={s.principles}>
          {principles.map((p) => (
            <div key={p.label} style={s.principle}>
              <span style={s.principleIcon}>{p.icon}</span>
              <div>
                <p style={s.principleLabel}>{p.label}</p>
                <p style={s.principleDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
