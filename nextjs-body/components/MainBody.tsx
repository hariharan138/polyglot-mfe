'use client';

const frameworks = [
  {
    name: 'Angular',
    version: '18',
    role: 'Header · <angular-header>',
    desc: 'Compiled to a Web Component via Angular Elements. Zoneless change detection keeps it lean when hosted inside the Shell.',
    port: '4200',
    color: '#f87171',
    border: 'rgba(248,113,113,0.25)',
    bg: 'rgba(248,113,113,0.08)',
    icon: 'Ng',
  },
  {
    name: 'Next.js',
    version: '14',
    role: 'Body · <nextjs-body>',
    desc: 'App Router with React 18. Bundled via Rollup as an IIFE Web Component. This very section you\'re reading.',
    port: '3000',
    color: '#e2e2f0',
    border: 'rgba(226,226,240,0.18)',
    bg: 'rgba(226,226,240,0.05)',
    icon: '▲',
  },
  {
    name: 'React',
    version: '18',
    role: 'Middle · <react-middle>',
    desc: 'Vite-powered React app loaded as an ES module from its own dev server. No build step needed in development.',
    port: '5174',
    color: '#38bdf8',
    border: 'rgba(56,189,248,0.25)',
    bg: 'rgba(56,189,248,0.08)',
    icon: '⚛',
  },
  {
    name: 'Vue 3',
    version: '3',
    role: 'Footer · <vue-footer>',
    desc: 'defineCustomElement wraps a Vue SFC with scoped styles inlined. Vite serves it as a native ES module.',
    port: '5175',
    color: '#4ade80',
    border: 'rgba(74,222,128,0.25)',
    bg: 'rgba(74,222,128,0.08)',
    icon: '◉',
  },
];

const stats = [
  { n: '4', label: 'Frameworks' },
  { n: '1', label: 'Shell App' },
  { n: '0', label: 'iFrames' },
  { n: '5', label: 'Dev Ports' },
];

export function MainBody() {
  return (
    <main style={s.wrap}>
      <div style={s.inner} id="features">
        <div style={s.head}>
          <p style={s.label}>The Stack</p>
          <h2 style={s.title}>Four frameworks, zero compromises.</h2>
          <p style={s.sub}>
            Each section is an independently deployable micro frontend. They share a design system
            but are built, versioned, and served separately.
          </p>
        </div>

        <div style={s.grid}>
          {frameworks.map((f) => (
            <div key={f.name} style={{ ...s.card, borderColor: f.border }}>
              <div style={{ ...s.icon, color: f.color, background: f.bg }}>
                {f.icon}
              </div>
              <h3 style={{ ...s.cardName, color: f.color }}>
                {f.name} <span style={s.ver}>{f.version}</span>
              </h3>
              <p style={s.cardRole}>{f.role}</p>
              <p style={s.cardDesc}>{f.desc}</p>
              <div style={s.portRow}>
                <span style={{ ...s.port, borderColor: f.border, color: f.color }}>
                  :{f.port}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={s.statsWrap}>
          {stats.map((st) => (
            <div key={st.label} style={s.stat}>
              <span style={s.statN}>{st.n}</span>
              <span style={s.statL}>{st.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrap: {
    background: 'linear-gradient(180deg, var(--bg,#07070d) 0%, var(--surface,#0f0f1a) 50%, var(--bg,#07070d) 100%)',
    padding: '6rem 2rem',
    borderTop: '1px solid var(--border, rgba(255,255,255,0.07))',
    borderBottom: '1px solid var(--border, rgba(255,255,255,0.07))',
  },
  inner: {
    maxWidth: 'var(--max, 1100px)',
    margin: '0 auto',
  },
  head: {
    marginBottom: '4rem',
  },
  label: {
    margin: '0 0 1rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'var(--indigo, #818cf8)',
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
    maxWidth: 560,
    fontSize: '1rem',
    lineHeight: 1.75,
    color: 'var(--muted, rgba(226,226,240,0.5))',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1px',
    background: 'var(--border, rgba(255,255,255,0.07))',
    border: '1px solid var(--border, rgba(255,255,255,0.07))',
    borderRadius: 'var(--r, 10px)',
    overflow: 'hidden',
    marginBottom: '4rem',
  },
  card: {
    background: 'var(--surface, #0f0f1a)',
    padding: '2rem',
    borderLeft: '1px solid',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.6rem',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 10,
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    flexShrink: 0,
  },
  cardName: {
    margin: 0,
    fontSize: '1.05rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.4rem',
  },
  ver: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: 'var(--muted-2, rgba(226,226,240,0.25))',
    letterSpacing: 0,
  },
  cardRole: {
    margin: 0,
    fontSize: '0.78rem',
    fontWeight: 600,
    fontFamily: 'monospace',
    color: 'var(--muted, rgba(226,226,240,0.5))',
  },
  cardDesc: {
    margin: 0,
    fontSize: '0.87rem',
    lineHeight: 1.65,
    color: 'var(--muted, rgba(226,226,240,0.5))',
    flex: 1,
  },
  portRow: { marginTop: 'auto', paddingTop: '0.75rem' },
  port: {
    display: 'inline-block',
    fontSize: '0.72rem',
    fontWeight: 600,
    fontFamily: 'monospace',
    padding: '0.2rem 0.6rem',
    borderRadius: 999,
    border: '1px solid',
  },
  statsWrap: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1px',
    background: 'var(--border, rgba(255,255,255,0.07))',
    border: '1px solid var(--border, rgba(255,255,255,0.07))',
    borderRadius: 'var(--r, 10px)',
    overflow: 'hidden',
  },
  stat: {
    background: 'var(--surface, #0f0f1a)',
    padding: '1.75rem 2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.3rem',
  },
  statN: {
    fontSize: '2.5rem',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    lineHeight: 1,
    color: 'var(--text, #e2e2f0)',
  },
  statL: {
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--muted, rgba(226,226,240,0.5))',
  },
};
