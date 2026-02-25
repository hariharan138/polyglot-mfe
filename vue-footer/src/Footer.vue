<template>
  <footer class="f" id="about">
    <div class="f__top">
      <div class="f__inner">
        <div class="f__brand-col">
          <div class="f__brand">
            <span class="f__mark">◈</span>
            Polyglot MFE
          </div>
          <p class="f__tagline">
            A learning demo showing how Angular, Next.js, React,
            and Vue can coexist as Web Components in a single shell —
            with no iframes and no shared bundling.
          </p>
          <p class="f__copy">© {{ year }} Polyglot MFE Demo. Built for learning.</p>
        </div>

        <div class="f__cols">
          <div class="f__col">
            <p class="f__col-head">Stack</p>
            <ul>
              <li><a href="#" class="f__link"><span class="f__dot dot-ng"></span>Angular 18</a></li>
              <li><a href="#" class="f__link"><span class="f__dot dot-next"></span>Next.js 14</a></li>
              <li><a href="#" class="f__link"><span class="f__dot dot-react"></span>React 18</a></li>
              <li><a href="#" class="f__link"><span class="f__dot dot-vue"></span>Vue 3</a></li>
            </ul>
          </div>
          <div class="f__col">
            <p class="f__col-head">Tooling</p>
            <ul>
              <li><a href="#" class="f__link">Vite Shell</a></li>
              <li><a href="#" class="f__link">Rollup WC Build</a></li>
              <li><a href="#" class="f__link">Angular Elements</a></li>
              <li><a href="#" class="f__link">defineCustomElement</a></li>
            </ul>
          </div>
          <div class="f__col">
            <p class="f__col-head">Resources</p>
            <ul>
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components" target="_blank" class="f__link">Web Components MDN</a></li>
              <li><a href="https://vitejs.dev" target="_blank" class="f__link">Vite Docs</a></li>
              <li><a href="https://angular.dev/guide/elements" target="_blank" class="f__link">Angular Elements</a></li>
              <li><a href="https://vuejs.org/guide/extras/web-components" target="_blank" class="f__link">Vue &amp; WC</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="f__bottom">
      <div class="f__inner f__bottom-inner">
        <span class="f__wc-tag">
          <code>&lt;vue-footer&gt;</code>
          <span class="f__sep">·</span>
          Built with Vue 3 + Vite
        </span>
        <span class="f__port">:5175</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.f {
  background: var(--bg, #07070d);
  border-top: 1px solid var(--border, rgba(255,255,255,0.07));
  font-family: var(--font, 'Inter', system-ui, sans-serif);
  color: var(--text, #e2e2f0);
}
.f__inner {
  max-width: var(--max, 1100px);
  margin: 0 auto;
  padding: 0 2rem;
}

/* top */
.f__top { padding: 4rem 0 3rem; }
.f__top .f__inner {
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
}
.f__brand-col {
  flex: 0 0 300px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.f__brand {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: -0.02em;
  color: var(--text, #e2e2f0);
}
.f__mark { color: var(--green, #4ade80); font-size: 1.05rem; }
.f__tagline {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--muted, rgba(226,226,240,0.5));
  margin: 0;
}
.f__copy {
  font-size: 0.78rem;
  color: var(--muted-2, rgba(226,226,240,0.25));
  margin: 0;
  margin-top: auto;
}

/* cols */
.f__cols {
  flex: 1;
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  min-width: 0;
}
.f__col { min-width: 120px; }
.f__col-head {
  margin: 0 0 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--muted-2, rgba(226,226,240,0.25));
}
.f__col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.f__link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--muted, rgba(226,226,240,0.5));
  text-decoration: none;
  transition: color 0.15s;
}
.f__link:hover { color: var(--text, #e2e2f0); }
.f__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-ng   { background: #f87171; }
.dot-next { background: var(--text, #e2e2f0); opacity: 0.5; }
.dot-react { background: var(--sky, #38bdf8); }
.dot-vue  { background: var(--green, #4ade80); }

/* bottom bar */
.f__bottom {
  border-top: 1px solid var(--border, rgba(255,255,255,0.07));
  padding: 1rem 0;
}
.f__bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.f__wc-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--muted, rgba(226,226,240,0.5));
}
.f__wc-tag code {
  font-size: 0.75rem;
  color: var(--green, #4ade80);
  background: rgba(74,222,128,0.08);
  padding: 0.15rem 0.45rem;
  border-radius: 5px;
  border: 1px solid rgba(74,222,128,0.2);
}
.f__sep { color: var(--border-hi, rgba(255,255,255,0.13)); }
.f__port {
  font-size: 0.72rem;
  font-weight: 600;
  font-family: monospace;
  color: var(--muted-2, rgba(226,226,240,0.25));
  border: 1px solid var(--border, rgba(255,255,255,0.07));
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}
</style>
