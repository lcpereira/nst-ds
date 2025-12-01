import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'nstech-ds',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'www',
      serviceWorker: null,
    },
    reactOutputTarget({
      componentCorePackage: '@lcpereira/nst-ds-primitives',
      proxiesFile: '../react/src/components/primitives.tsx',
      includeDefineCustomElements: false,
      includeImportCustomElements: true,
    }),
  ],
  globalStyle: 'src/global/global.css',
  devServer: {
    reloadStrategy: 'pageReload',
    port: 3333,
  },
};

