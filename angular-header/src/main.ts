import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HeaderComponent } from './app/header/header.component';
import { appConfig } from './app/app.config';

(async function bootstrap() {
  const app = await createApplication(appConfig);
  const headerElement = createCustomElement(HeaderComponent, { injector: app.injector });
  if (!customElements.get('angular-header')) {
    customElements.define('angular-header', headerElement);
  }
})();
