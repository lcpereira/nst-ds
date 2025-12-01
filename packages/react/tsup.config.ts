import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Gerado separadamente se necessário
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom', '@lcpereira/nst-ds-foundation', '@lcpereira/nst-ds-primitives'],
});

