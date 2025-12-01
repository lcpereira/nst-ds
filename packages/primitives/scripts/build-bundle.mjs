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
const esmPath = path.join(distDir, 'nstech-ds/nstech-ds.esm.js');
const cssPath = path.join(distDir, 'nstech-ds/nstech-ds.css');
const loaderPath = path.join(distDir, 'loader/index.js');

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

// Criar bundle ESM para uso moderno
if (fs.existsSync(esmPath)) {
  const esmOutputPath = path.join(bundleDir, 'nstech-ds.esm.js');
  fs.copyFileSync(esmPath, esmOutputPath);
}

// Criar arquivo de exemplo de uso
const exampleHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NSTech Design System - Exemplo</title>
  
  <!-- 1. Importar CSS do Foundation (escolha o brand) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nstech-ds/foundation@latest/dist/css/nstech.css">
  <!-- ou -->
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nstech-ds/foundation@latest/dist/css/nsapps.css"> -->
  <!-- ou -->
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nstech-ds/foundation@latest/dist/css/ambevtech.css"> -->
  
  <!-- 2. Importar CSS dos Primitives -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nstech-ds/primitives@latest/dist/bundle/nstech-ds.css">
  
  <!-- 3. Importar JavaScript dos Primitives (ESM) -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/@nstech-ds/primitives@latest/dist/bundle/nstech-ds.esm.js"></script>
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
