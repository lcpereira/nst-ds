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

// Carrega componentes padrão (pode não existir)
const componentsPath = path.join(__dirname, '../src/tokens/semantic/components.json');
const defaultComponents = fs.existsSync(componentsPath) 
  ? readJSON(componentsPath) 
  : {};

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
  const brandColors = brandData.colors || {};
  
  // Processar primary e secondary (obrigatórios)
  const [primaryH, primaryS, primaryL] = hexToHsl(brandColors.primary);
  const [secondaryH, secondaryS, secondaryL] = hexToHsl(brandColors.secondary);

  const cssVars = [];

  // Brand colors base (primary e secondary)
  cssVars.push(`  --nst-color-primary: ${primaryH} ${primaryS}% ${primaryL}%;`);
  cssVars.push(`  --nst-color-primary-hex: ${brandColors.primary};`);
  cssVars.push(`  --nst-color-secondary: ${secondaryH} ${secondaryS}% ${secondaryL}%;`);
  cssVars.push(`  --nst-color-secondary-hex: ${brandColors.secondary};`);
  
  // Cores semânticas (success, error, warning, info)
  // Se definidas no brand, usa elas; senão usa os defaults
  const semanticColorsMap = {
    success: brandColors.success || '#059669',
    error: brandColors.error || '#dc2626',
    warning: brandColors.warning || '#d97706',
    info: brandColors.info || '#2563eb',
  };
  
  Object.entries(semanticColorsMap).forEach(([key, hexValue]) => {
    const [h, s, l] = hexToHsl(hexValue);
    cssVars.push(`  --nst-color-${key}: ${h} ${s}% ${l}%;`);
  });
  
  // Cores do tema (background, foreground, muted, etc.)
  // Se definidas no brand, usa elas; senão usa os defaults do theme light
  const themeColorsMap = {
    background: brandColors.background || themes.light.colors.background,
    foreground: brandColors.foreground || themes.light.colors.foreground,
    muted: brandColors.muted || themes.light.colors.muted,
    'muted-foreground': brandColors.mutedForeground || themes.light.colors['muted-foreground'],
    border: brandColors.border || themes.light.colors.border,
    input: brandColors.input || themes.light.colors.input,
    ring: brandColors.ring || themes.light.colors.ring,
  };
  
  Object.entries(themeColorsMap).forEach(([key, value]) => {
    cssVars.push(`  --nst-color-${key}: ${value};`);
  });

  // Função auxiliar para obter valor aninhado do objeto
  function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Função para processar valores padrão, substituindo referências a primary
  function processValue(value) {
    if (typeof value !== 'string') return value;
    return value
      .replace(/hsl\(var\(--nst-color-primary\)\)/g, `hsl(${primaryH} ${primaryS}% ${primaryL}%)`)
      .replace(/hsl\(var\(--nst-color-primary\)\s*\/\s*0\.9\)/g, `hsl(${primaryH} ${primaryS}% ${Math.max(primaryL - 10, 0)}%)`);
  }

  // Mapeamento simplificado: caminho no JSON -> token CSS
  const componentMap = {
    'navbar.background': '--nst-color-navbar-bg',
    'navbar.text': '--nst-color-navbar-text',
    'navbar.border': '--nst-color-navbar-border',
    'navbar.brand': '--nst-color-navbar-brand',
    'navbar.brandHover': '--nst-color-navbar-brand-hover',
    'navItem.background': '--nst-color-nav-item-bg',
    'navItem.text': '--nst-color-nav-item-text',
    'navLink.default': '--nst-color-nav-link',
    'navLink.hover': '--nst-color-nav-link-hover',
    'navLink.active': '--nst-color-nav-link-active',
    'navLink.disabled': '--nst-color-nav-link-disabled',
    'button.background': '--nst-color-btn-bg',
    'button.text': '--nst-color-btn-text',
    'button.border': '--nst-color-btn-border',
    'button.outlinePrimary': '--nst-color-btn-outline-primary',
    'button.outlinePrimaryHoverBackground': '--nst-color-btn-outline-primary-hover-bg',
    'button.outlinePrimaryHoverText': '--nst-color-btn-outline-primary-hover-text',
    'button.outlineDanger': '--nst-color-btn-outline-danger',
    'button.outlineDangerHoverBackground': '--nst-color-btn-outline-danger-hover-bg',
    'button.outlineDangerHoverText': '--nst-color-btn-outline-danger-hover-text',
  };

  // Processa componentes customizados (colors.components ou components na raiz)
  const customizedTokens = new Set();
  const componentsSource = brandColors.components || brandData.components;
  
  if (componentsSource) {
    Object.entries(componentMap).forEach(([path, token]) => {
      const value = getNestedValue(componentsSource, path);
      if (value !== undefined && value !== null) {
        cssVars.push(`  ${token}: ${value};`);
        customizedTokens.add(token);
      }
    });
  }

  // Adiciona valores padrão para componentes não customizados
  Object.entries(componentMap).forEach(([path, token]) => {
    if (!customizedTokens.has(token)) {
      const defaultValue = getNestedValue(defaultComponents, path);
      if (defaultValue !== undefined) {
        cssVars.push(`  ${token}: ${processValue(defaultValue)};`);
      }
    }
  });

  // Core tokens (cores neutras - não customizáveis por brand)
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

  const lightCSS = `:root {\n${cssVars.join('\n')}\n}\n\n`;

  const darkVars = [];
  
  // Cores do tema dark - se definidas no brand, usa elas; senão usa os defaults
  const darkThemeColorsMap = {
    background: brandColors.dark?.background || themes.dark.colors.background,
    foreground: brandColors.dark?.foreground || themes.dark.colors.foreground,
    muted: brandColors.dark?.muted || themes.dark.colors.muted,
    'muted-foreground': brandColors.dark?.mutedForeground || themes.dark.colors['muted-foreground'],
    border: brandColors.dark?.border || themes.dark.colors.border,
    input: brandColors.dark?.input || themes.dark.colors.input,
    ring: brandColors.dark?.ring || themes.dark.colors.ring,
  };
  
  Object.entries(darkThemeColorsMap).forEach(([key, value]) => {
    darkVars.push(`  --nst-color-${key}: ${value};`);
  });

  // Primary ajustado para dark mode (mais claro)
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

