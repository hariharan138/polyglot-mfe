import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="h">
      <nav class="h__nav">
        <div class="h__nav-inner">
          <a class="h__brand" href="#">
            <span class="h__mark">◈</span>
            Polyglot MFE
          </a>
          <ul class="h__links">
            <li><a href="#features">Features</a></li>
            <li><a href="#architecture">Architecture</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <span class="h__tag">4 Frameworks · 1 Shell</span>
        </div>
      </nav>

      <section class="h__hero">
        <div class="h__grid-bg"></div>
        <div class="h__hero-inner">
          <p class="h__label">Micro Frontend Architecture Demo</p>
          <h1 class="h__title">
            One Page.<br>
            <span class="h__title-accent">Four Frameworks.</span>
          </h1>
          <p class="h__sub">
            Angular, Next.js, React, and Vue — each a self-contained Web Component,
            dynamically loaded and composed by a single Vite shell. No iframes. No bundling compromise.
          </p>
          <div class="h__pills">
            <span class="h__pill h__pill--angular">Angular 18</span>
            <span class="h__pill h__pill--next">Next.js 14</span>
            <span class="h__pill h__pill--react">React 18</span>
            <span class="h__pill h__pill--vue">Vue 3</span>
          </div>
        </div>
      </section>
    </header>
  `,
  styles: [`
    :host { display: block; }

    /* ── Nav ─────────────────────────────────────────── */
    .h__nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(7, 7, 13, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }
    .h__nav-inner {
      max-width: var(--max);
      margin: 0 auto;
      padding: 0 2rem;
      height: 58px;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .h__brand {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text);
      text-decoration: none;
      letter-spacing: -0.02em;
      flex-shrink: 0;
    }
    .h__mark { color: var(--indigo); font-size: 1.05rem; }
    .h__links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 0.25rem;
      flex: 1;
    }
    .h__links li a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.3rem 0.7rem;
      border-radius: 6px;
      transition: color 0.15s;
    }
    .h__links li a:hover { color: var(--text); }
    .h__tag {
      margin-left: auto;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: var(--muted);
      border: 1px solid var(--border-hi);
      padding: 0.28rem 0.8rem;
      border-radius: 999px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Hero ────────────────────────────────────────── */
    .h__hero {
      position: relative;
      padding: 7rem 2rem 6rem;
      overflow: hidden;
      background: radial-gradient(ellipse 90% 55% at 50% -10%, rgba(129, 140, 248, 0.13) 0%, transparent 65%);
    }
    .h__grid-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 64px 64px;
      -webkit-mask-image: radial-gradient(ellipse 85% 90% at 50% 0%, black 20%, transparent 100%);
      mask-image: radial-gradient(ellipse 85% 90% at 50% 0%, black 20%, transparent 100%);
      pointer-events: none;
    }
    .h__hero-inner {
      position: relative;
      max-width: var(--max);
      margin: 0 auto;
    }
    .h__label {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--indigo);
      margin: 0 0 1.5rem;
    }
    .h__title {
      margin: 0 0 1.5rem;
      font-size: clamp(2.6rem, 6vw, 4.75rem);
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -0.04em;
      color: var(--text);
    }
    .h__title-accent {
      background: linear-gradient(130deg, var(--indigo) 0%, var(--violet) 60%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .h__sub {
      max-width: 580px;
      font-size: 1.05rem;
      line-height: 1.75;
      color: var(--muted);
      margin: 0 0 2.5rem;
    }
    .h__pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .h__pill {
      font-size: 0.78rem;
      font-weight: 600;
      padding: 0.32rem 0.85rem;
      border-radius: 999px;
      border: 1px solid;
      letter-spacing: 0.02em;
    }
    .h__pill--angular { color: #f87171; border-color: rgba(248,113,113,0.35); background: rgba(248,113,113,0.08); }
    .h__pill--next    { color: #e2e2f0; border-color: rgba(226,226,240,0.2);  background: rgba(226,226,240,0.06); }
    .h__pill--react   { color: var(--sky);   border-color: rgba(56,189,248,0.35);  background: rgba(56,189,248,0.08); }
    .h__pill--vue     { color: var(--green); border-color: rgba(74,222,128,0.35); background: rgba(74,222,128,0.08); }
  `],
})
export class HeaderComponent {}
