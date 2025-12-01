import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const brandsDir = path.join(__dirname, '../src/brands');
const brandFiles = fs.readdirSync(brandsDir).filter(file =>
  file.endsWith('.json') && file !== 'index.json'
);

const brands = {};
for (const file of brandFiles) {
  const brandName = file.replace('.json', '');
  try {
    const brandData = readJSON(path.join(brandsDir, file));
    if (brandData.brand && brandData.colors?.primary && brandData.colors?.secondary) {
      brands[brandName] = brandData;
    }
  } catch (error) {
    // Ignorar arquivos inválidos
  }
}

if (Object.keys(brands).length === 0) {
  process.exit(1);
}

const themes = {
  light: readJSON(path.join(__dirname, '../src/themes/light.json')),
  dark: readJSON(path.join(__dirname, '../src/themes/dark.json')),
};

const coreTokens = readJSON(path.join(__dirname, '../src/tokens/core/tokens.json'));

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function generateBrandCSS(brandName, brandData) {
  const [primaryH, primaryS, primaryL] = hexToHsl(brandData.colors.primary);
  const [secondaryH, secondaryS, secondaryL] = hexToHsl(brandData.colors.secondary);

  const cssVars = [];

  // Brand colors
  cssVars.push(`  --nst-color-primary: ${primaryH} ${primaryS}% ${primaryL}%;`);
  cssVars.push(`  --nst-color-primary-hex: ${brandData.colors.primary};`);
  cssVars.push(`  --nst-color-secondary: ${secondaryH} ${secondaryS}% ${secondaryL}%;`);
  cssVars.push(`  --nst-color-secondary-hex: ${brandData.colors.secondary};`);

  // Core tokens
  Object.entries(coreTokens.colors.neutral).forEach(([key, value]) => {
    cssVars.push(`  --nst-color-neutral-${key}: ${value};`);
  });

  Object.entries(coreTokens.spacing).forEach(([key, value]) => {
    cssVars.push(`  --nst-spacing-${key}: ${value};`);
  });

  Object.entries(coreTokens.radii).forEach(([key, value]) => {
    cssVars.push(`  --nst-radius-${key}: ${value};`);
  });

  cssVars.push(`  --nst-font-sans: ${coreTokens.typography.fontFamily.sans.join(', ')};`);
  cssVars.push(`  --nst-font-mono: ${coreTokens.typography.fontFamily.mono.join(', ')};`);

  Object.entries(coreTokens.typography.fontSize).forEach(([key, value]) => {
    cssVars.push(`  --nst-font-size-${key}: ${value};`);
  });

  Object.entries(coreTokens.typography.fontWeight).forEach(([key, value]) => {
    cssVars.push(`  --nst-font-weight-${key}: ${value};`);
  });

  Object.entries(coreTokens.motion.duration).forEach(([key, value]) => {
    cssVars.push(`  --nst-duration-${key}: ${value};`);
  });

  Object.entries(coreTokens.motion.easing).forEach(([key, value]) => {
    cssVars.push(`  --nst-easing-${key}: ${value};`);
  });

  cssVars.push(`  --nst-transition-default: ${coreTokens.motion.transition.default};`);
  cssVars.push(`  --nst-transition-colors: ${coreTokens.motion.transition.colors};`);

  Object.entries(coreTokens.zIndex).forEach(([key, value]) => {
    cssVars.push(`  --nst-z-${key}: ${value};`);
  });

  Object.entries(themes.light.colors).forEach(([key, value]) => {
    cssVars.push(`  --nst-color-${key}: ${value};`);
  });

  const lightCSS = `:root {\n${cssVars.join('\n')}\n}\n\n`;

  const darkVars = [];
  Object.entries(themes.dark.colors).forEach(([key, value]) => {
    darkVars.push(`  --nst-color-${key}: ${value};`);
  });

  const adjustedPrimaryL = Math.min(primaryL + 15, 100);
  darkVars.push(`  --nst-color-primary: ${primaryH} ${primaryS}% ${adjustedPrimaryL}%;`);

  const darkCSS = `.dark {\n${darkVars.join('\n')}\n}\n`;

  return lightCSS + darkCSS;
}

const distCssDir = path.join(__dirname, '../dist/css');
if (!fs.existsSync(distCssDir)) {
  fs.mkdirSync(distCssDir, { recursive: true });
}

// Gera CSS para cada brand (mantém compatibilidade com npm)
Object.entries(brands).forEach(([brandName, brandData]) => {
  const css = generateBrandCSS(brandName, brandData);
  // Manter nome original para npm
  const outputPath = path.join(distCssDir, `${brandName}.css`);
  fs.writeFileSync(outputPath, css, 'utf-8');
  
  // Gerar também com prefixo nst- para CDN
  const cdnOutputPath = path.join(distCssDir, `nst-${brandName}.css`);
  fs.writeFileSync(cdnOutputPath, css, 'utf-8');
});

