import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Gerado separadamente via tsc
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: [],
});

