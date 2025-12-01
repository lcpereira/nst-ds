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
const nstechDsDir = path.join(distDir, 'nstech-ds');
const cssPath = path.join(nstechDsDir, 'nstech-ds.css');
const esmPath = path.join(nstechDsDir, 'nstech-ds.esm.js');

// Criar diretório bundle se não existir
if (!fs.existsSync(bundleDir)) {
  fs.mkdirSync(bundleDir, { recursive: true });
}

// Copiar CSS
if (fs.existsSync(cssPath)) {
  const cssOutputPath = path.join(bundleDir, 'nstech-ds.css');
  fs.copyFileSync(cssPath, cssOutputPath);
} else {
  const minimalCss = `/* NSTech Design System - Primitives */\n`;
  const cssOutputPath = path.join(bundleDir, 'nstech-ds.css');
  fs.writeFileSync(cssOutputPath, minimalCss, 'utf-8');
}

// Copiar todos os arquivos JS necessários (incluindo chunks com hash)
if (fs.existsSync(nstechDsDir)) {
  const files = fs.readdirSync(nstechDsDir);
  
  // Copiar o bundle principal
  if (fs.existsSync(esmPath)) {
    const esmOutputPath = path.join(bundleDir, 'nstech-ds.esm.js');
    fs.copyFileSync(esmPath, esmOutputPath);
  }
  
  // Copiar todos os arquivos .js (chunks com hash como p-Bi2NqiEq.js, p-1d6cc663.entry.js, etc.)
  files.forEach(file => {
    if (file.endsWith('.js') && file !== 'nstech-ds.esm.js' && !file.endsWith('.map')) {
      const sourcePath = path.join(nstechDsDir, file);
      const destPath = path.join(bundleDir, file);
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

// Criar arquivo de exemplo de uso
const exampleHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NSTech Design System - Exemplo</title>
  
  <!-- 1. Importar CSS do Foundation (escolha o brand) - GitHub Pages -->
  <link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/foundation/css/nstech.css">
  <!-- ou -->
  <!-- <link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/foundation/css/nsapps.css"> -->
  
  <!-- 2. Importar CSS dos Primitives -->
  <link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/primitives/bundle/nstech-ds.css">
  
  <!-- 3. Importar JavaScript dos Primitives (ESM) -->
  <script type="module" src="https://lcpereira.github.io/nst-ds/primitives/bundle/nstech-ds.esm.js"></script>
  
  <!-- Alternativa: jsDelivr -->
  <!--
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/foundation/dist/css/nstech.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nstech-ds.css">
  <script type="module" src="https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nstech-ds.esm.js"></script>
  -->
</head>
<body>
  <h1>NSTech Design System</h1>
  
  <!-- Usar os componentes -->
  <ds-button variant="primary" size="md">Clique aqui</ds-button>
  <ds-input type="text" placeholder="Digite algo..."></ds-input>
  <ds-card padding="md">
    <h2>Card Title</h2>
    <p>Card content</p>
  </ds-card>
</body>
</html>
`;

const examplePath = path.join(bundleDir, 'example.html');
fs.writeFileSync(examplePath, exampleHtml, 'utf-8');
