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

function hexToHslString(hex) {
  const [h, s, l] = hexToHsl(hex);
  return `${h} ${s}% ${l}%`;
}

function generateBrandCSS(brandName, brandData) {
  const [primaryH, primaryS, primaryL] = hexToHsl(brandData.colors.primary);
  const [secondaryH, secondaryS, secondaryL] = hexToHsl(brandData.colors.secondary);

  const cssVars = [];

  // Brand colors base
  cssVars.push(`  --nst-color-primary: ${primaryH} ${primaryS}% ${primaryL}%;`);
  cssVars.push(`  --nst-color-primary-hex: ${brandData.colors.primary};`);
  cssVars.push(`  --nst-color-secondary: ${secondaryH} ${secondaryS}% ${secondaryL}%;`);
  cssVars.push(`  --nst-color-secondary-hex: ${brandData.colors.secondary};`);

  // Tokens de componentes customizáveis
  // Brands podem sobrescrever diretamente os tokens definidos em color-tokens.css
  // Mapeamento: propriedade JSON -> nome do token CSS
  const componentTokenMap = {
    'header.background': '--nst-color-header-bg',
    'header.text': '--nst-color-header-text',
    'header.border': '--nst-color-header-border',
    'footer.background': '--nst-color-footer-bg',
    'footer.text': '--nst-color-footer-text',
    'footer.border': '--nst-color-footer-border',
    'navbar.background': '--nst-color-navbar-bg',
    'navbar.text': '--nst-color-navbar-text',
    'navbar.brand': '--nst-color-navbar-brand',
    'navbar.link': '--nst-color-navbar-link',
    'navbar.linkHover': '--nst-color-navbar-link-hover',
    'navbar.linkActive': '--nst-color-navbar-link-active',
    'navbar.border': '--nst-color-navbar-border',
    'button.primary.background': '--nst-color-button-primary-bg',
    'button.primary.text': '--nst-color-button-primary-text',
    'button.primary.border': '--nst-color-button-primary-border',
    'button.primary.hover.background': '--nst-color-button-primary-hover-bg',
    'button.primary.hover.text': '--nst-color-button-primary-hover-text',
    'button.primary.hover.border': '--nst-color-button-primary-hover-border',
    'button.secondary.background': '--nst-color-button-secondary-bg',
    'button.secondary.text': '--nst-color-button-secondary-text',
    'button.secondary.border': '--nst-color-button-secondary-border',
    'button.secondary.hover.background': '--nst-color-button-secondary-hover-bg',
    'button.secondary.hover.text': '--nst-color-button-secondary-hover-text',
    'button.secondary.hover.border': '--nst-color-button-secondary-hover-border',
  };

  // Função auxiliar para obter valor aninhado do objeto
  function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Itera sobre o mapeamento e adiciona tokens customizados
  // Aceita qualquer formato de cor (hex, hsl, rgb, var, etc) - sem conversão
  Object.entries(componentTokenMap).forEach(([jsonPath, cssToken]) => {
    const value = getNestedValue(brandData.components, jsonPath);
    if (value !== undefined && value !== null) {
      cssVars.push(`  ${cssToken}: ${value};`);
    }
  });

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
  
  // Ler estilos compilados
  const stylesPath = path.join(distCssDir, 'foundation-styles.css');
  let stylesContent = '';
  if (fs.existsSync(stylesPath)) {
    stylesContent = '\n\n' + fs.readFileSync(stylesPath, 'utf-8');
  }
  
  // Combinar CSS variables + estilos
  const finalCss = css + stylesContent;
  
  // Manter nome original para npm
  const outputPath = path.join(distCssDir, `${brandName}.css`);
  fs.writeFileSync(outputPath, finalCss, 'utf-8');
  
  // Gerar também com prefixo nst- para CDN
  const cdnOutputPath = path.join(distCssDir, `nst-${brandName}.css`);
  fs.writeFileSync(cdnOutputPath, finalCss, 'utf-8');
});

