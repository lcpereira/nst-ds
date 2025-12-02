#!/usr/bin/env node
// Compila os estilos modulares do Foundation

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stylesDir = path.join(__dirname, '../src/styles');
const distCssDir = path.join(__dirname, '../dist/css');

// Função para processar imports CSS
function processImports(cssContent, baseDir) {
  return cssContent.replace(/@import\s+['"]([^'"]+)['"];?/g, (match, importPath) => {
    const fullPath = path.join(baseDir, importPath);
    if (fs.existsSync(fullPath)) {
      const importedContent = fs.readFileSync(fullPath, 'utf-8');
      return processImports(importedContent, path.dirname(fullPath));
    }
    console.warn(`Warning: Import not found: ${importPath}`);
    return '';
  });
}

// Ler e processar index.css
const indexCssPath = path.join(stylesDir, 'index.css');
if (fs.existsSync(indexCssPath)) {
  const indexContent = fs.readFileSync(indexCssPath, 'utf-8');
  const compiledStyles = processImports(indexContent, stylesDir);
  
  // Adicionar comentário
  const finalStyles = `/* Foundation Styles - Compiled from modular CSS */\n${compiledStyles}`;
  
  // Salvar em dist/css/foundation-styles.css
  if (!fs.existsSync(distCssDir)) {
    fs.mkdirSync(distCssDir, { recursive: true });
  }
  
  const outputPath = path.join(distCssDir, 'foundation-styles.css');
  fs.writeFileSync(outputPath, finalStyles, 'utf-8');
  
  console.log('✅ Foundation styles compiled successfully');
} else {
  console.error('❌ index.css not found');
  process.exit(1);
}

