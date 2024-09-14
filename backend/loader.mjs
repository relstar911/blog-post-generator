import { register } from 'ts-node';
import { pathToFileURL } from 'url';

register({
  project: './tsconfig.json',
  experimentalSpecifierResolution: 'node'
});

import('./src/app.ts');
