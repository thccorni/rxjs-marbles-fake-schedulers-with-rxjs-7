import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'rxjs-marbles-fake-schedulers-with-rxjs-7',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
