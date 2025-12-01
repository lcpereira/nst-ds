#!/usr/bin/env node
// Gera index.ts dos brands dinamicamente

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brandsDir = path.join(__dirname, '../src/brands');
const outputFile = path.join(brandsDir, 'index.ts');

// Ler todos os arquivos JSON da pasta brands
const files = fs.readdirSync(brandsDir).filter(file => 
  file.endsWith('.json') && file !== 'index.json'
);

if (files.length === 0) {
  process.exit(0);
}

// Extrair nomes dos brands (remover .json)
const brandNames = files.map(file => file.replace('.json', ''));

// Validar que cada JSON tem a estrutura correta
const brands = {};
const brandTypes = [];

for (const brandName of brandNames) {
  const filePath = path.join(brandsDir, `${brandName}.json`);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const brandData = JSON.parse(content);
    
    // Validar estrutura
    if (!brandData.brand || !brandData.colors || !brandData.colors.primary || !brandData.colors.secondary) {
      continue;
    }
    
    brands[brandName] = brandData;
    brandTypes.push(`'${brandName}'`);
  } catch (error) {
    continue;
  }
}

if (Object.keys(brands).length === 0) {
  process.exit(1);
}

// Gerar o conteúdo do index.ts
const imports = brandNames.map(name => `import ${name} from './${name}.json';`).join('\n');
const brandType = brandTypes.join(' | ');
const exportsObject = brandNames.map(name => `  ${name},`).join('\n');

const indexContent = `/**
 * Brands do Design System
 * Este arquivo é gerado automaticamente pelo script generate-brands.mjs
 * Para adicionar um novo brand, simplesmente adicione um arquivo .json na pasta brands/
 * 
 * Estrutura esperada do JSON:
 * {
 *   "brand": "nome-do-brand",
 *   "colors": {
 *     "primary": "#hexcolor",
 *     "secondary": "#hexcolor"
 *   }
 * }
 */

${imports}

export type Brand = ${brandType};

export interface BrandColors {
  brand: Brand;
  colors: {
    primary: string;
    secondary: string;
  };
}

export const brands = {
${exportsObject}
} as const;

export default brands;
`;

// Escrever o arquivo
fs.writeFileSync(outputFile, indexContent, 'utf-8');

