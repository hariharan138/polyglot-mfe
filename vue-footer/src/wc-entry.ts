import { createApp } from 'vue';
import Footer from './Footer.vue';

class VueFooterElement extends HTMLElement {
  private _app: ReturnType<typeof createApp> | null = null;

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);
    this._app = createApp(Footer);
    this._app.mount(mountPoint);
  }

  disconnectedCallback() {
    this._app?.unmount();
    this._app = null;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('vue-footer')) {
  customElements.define('vue-footer', VueFooterElement);
}
