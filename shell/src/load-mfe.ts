import type { MfeEntry } from './mfe-config';

function loadStyle(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load style: ${href}`));
    document.head.appendChild(link);
  });
}

function loadScript(src: string, isModule: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    if (isModule) script.type = 'module';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Load one MFE: optional style, then script(s).
 * Uses scriptUrls if present, otherwise scriptUrl.
 * Scripts from dev servers (e.g. /src/ or .tsx/.ts) are loaded as module.
 * Style load failure is non-blocking so the script still loads (component can show without styles).
 */
export async function loadMfe(entry: MfeEntry): Promise<void> {
  if (entry.styleUrl) {
    try {
      await loadStyle(entry.styleUrl);
    } catch (err) {
      console.warn(`[Shell] Style failed for "${entry.name}" (component may still load):`, err);
    }
  }
  const urls = entry.scriptUrls ?? [entry.scriptUrl];
  for (const url of urls) {
    const isModule = url.includes('/src/') || url.endsWith('.tsx') || url.endsWith('.ts');
    await loadScript(url, isModule);
  }
}

/**
 * Load all MFEs in order. Elements must already exist in the DOM.
 */
export async function loadAllMfes(entries: MfeEntry[]): Promise<void> {
  for (const entry of entries) {
    try {
      await loadMfe(entry);
    } catch (err) {
      console.error(`[Shell] Failed to load MFE "${entry.name}":`, err);
    }
  }
}
