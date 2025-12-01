# @lcpereira/nst-ds-foundation

Tokens, themes e brands do Design System NSTech. Fonte única de verdade para cores, tipografia, spacing, motion e z-index.

## Instalação

### NPM/Yarn

```bash
yarn add @lcpereira/nst-ds-foundation
# ou
npm install @lcpereira/nst-ds-foundation
```

### CDN (Sem NPM)

Use diretamente no HTML via CDN:

```html
<!-- Escolha o brand que deseja usar -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">
<!-- ou -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nsapps.css">
<!-- ou -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/ambevtech.css">
```

## Uso

### JavaScript/TypeScript (NPM)

```typescript
import { colors, spacing, radii, brands, themes } from '@lcpereira/nst-ds-foundation';

// Usar tokens
const primaryColor = brands.nstech.colors.primary;
const spacingValue = spacing[4]; // '1rem'
```

### CSS (CDN ou NPM)

```html
<!-- Via CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">

<!-- Via NPM (se estiver usando bundler) -->
<!-- O caminho será: node_modules/@lcpereira/nst-ds-foundation/dist/css/nstech.css -->
```

### Tailwind

```javascript
// tailwind.config.js
import { tailwindConfig, tailwindPlugin } from '@lcpereira/nst-ds-foundation';

export default {
  ...tailwindConfig,
  plugins: [tailwindPlugin()],
};
```

## Brands Disponíveis

Os brands são detectados automaticamente! Qualquer arquivo `.json` na pasta `src/brands/` será incluído automaticamente.

### Brands Atuais

- `nstech` - Brand principal
  - CSS: `dist/css/nstech.css`
  - CDN: `https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css`

- `nsapps` - Brand NSApps
  - CSS: `dist/css/nsapps.css`
  - CDN: `https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nsapps.css`

### Adicionar Novo Brand

1. Crie um arquivo JSON em `src/brands/` (ex: `novobrand.json`)
2. Use a estrutura:
```json
{
  "brand": "novobrand",
  "colors": {
    "primary": "#0A5FFF",
    "secondary": "#1CC8EE"
  }
}
```
3. Execute `yarn build` - o sistema detectará automaticamente e gerará:
   - Tipos TypeScript atualizados
   - Arquivo CSS em `dist/css/novobrand.css`
   - Disponibilidade via CDN

Veja mais detalhes em [src/brands/README.md](./src/brands/README.md)

## Themes

- `light` - Tema claro (padrão)
- `dark` - Tema escuro

Os temas são aplicados automaticamente via CSS variables quando você adiciona a classe `.dark` ao elemento raiz:

```html
<html class="dark">
  <!-- Conteúdo com dark mode -->
</html>
```

## Estrutura dos Tokens

### Tokens Core (universais)
- `colors.neutral` - Cores neutras
- `spacing` - Espaçamentos
- `radii` - Border radius
- `typography` - Tipografia
- `motion` - Transições e animações
- `zIndex` - Camadas z-index

### Tokens de Brand (apenas cores)
- `brands.nstech.colors.primary` - Cor primária
- `brands.nstech.colors.secondary` - Cor secundária
