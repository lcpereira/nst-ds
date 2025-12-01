#!/usr/bin/env node
// Cria bundle único dos Web Components para uso via script tag

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos
const distDir = path.join(__dirname, '../dist');
const bundleDir = path.join(__dirname, '../dist/bundle');
const nstDsDir = path.join(distDir, 'nst-ds');
const cssPath = path.join(nstDsDir, 'nst-ds.css');
const esmPath = path.join(nstDsDir, 'nst-ds.esm.js');

// Criar diretório bundle se não existir
if (!fs.existsSync(bundleDir)) {
  fs.mkdirSync(bundleDir, { recursive: true });
}

// Copiar CSS (mantém compatibilidade com npm)
if (fs.existsSync(cssPath)) {
  const cssOutputPath = path.join(bundleDir, 'nst-ds.css');
  fs.copyFileSync(cssPath, cssOutputPath);
  
  // Gerar também nst-ds.css para CDN
  const cdnCssPath = path.join(bundleDir, 'nst-ds.css');
  fs.copyFileSync(cssPath, cdnCssPath);
} else {
  const minimalCss = `/* Design System - Primitives */\n`;
  const cssOutputPath = path.join(bundleDir, 'nst-ds.css');
  fs.writeFileSync(cssOutputPath, minimalCss, 'utf-8');
  const cdnCssPath = path.join(bundleDir, 'nst-ds.css');
  fs.writeFileSync(cdnCssPath, minimalCss, 'utf-8');
}

// Copiar todos os arquivos JS necessários (incluindo chunks com hash)
if (fs.existsSync(nstDsDir)) {
  const files = fs.readdirSync(nstDsDir);
  
  // Copiar o bundle principal
  if (fs.existsSync(esmPath)) {
    const esmOutputPath = path.join(bundleDir, 'nst-ds.esm.js');
    fs.copyFileSync(esmPath, esmOutputPath);
    
    // Gerar também nst-ds.js para CDN (copia do esm)
    const cdnJsPath = path.join(bundleDir, 'nst-ds.js');
    fs.copyFileSync(esmPath, cdnJsPath);
  }
  
  // Copiar todos os arquivos .js (chunks com hash como p-Bi2NqiEq.js, p-1d6cc663.entry.js, etc.)
  files.forEach(file => {
    if (file.endsWith('.js') && file !== 'nst-ds.esm.js' && !file.endsWith('.map')) {
      const sourcePath = path.join(nstDsDir, file);
      const destPath = path.join(bundleDir, file);
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

