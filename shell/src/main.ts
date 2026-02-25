import { mfeConfig } from './mfe-config';
import { loadAllMfes } from './load-mfe';

async function bootstrap() {
  await loadAllMfes(mfeConfig);
}

bootstrap().catch((err) => {
  console.error('[Shell] Bootstrap failed:', err);
});
