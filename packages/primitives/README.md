# @lcpereira/nst-ds-primitives

Web Components universais do Design System. Compatível com qualquer stack: React, Angular, Vue, PHP, Vanilla JS.

## Instalação

### NPM/Yarn

```bash
yarn add @lcpereira/nst-ds-primitives
# ou
npm install @lcpereira/nst-ds-primitives
```

### CDN (Sem NPM)

Use diretamente no HTML via CDN, sem precisar de npm ou bundler:

**Opção 1: GitHub Pages (Recomendado)**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Minha App</title>
  
  <!-- 1. Importar CSS do Foundation (escolha o brand) -->
  <link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/foundation/nst-theme1.css">
  
  <!-- 2. Importar CSS dos Primitives -->
  <link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/primitives/nst-ds.css">
  
  <!-- 3. Importar JavaScript dos Primitives - IMPORTANTE: Use type="module" -->
  <script type="module" src="https://lcpereira.github.io/nst-ds/primitives/nst-ds.esm.js"></script>
</head>
<body>
  <!-- Usar os componentes -->
  <nst-button variant="primary" size="md">Clique aqui</nst-button>
  <nst-input type="text" placeholder="Digite algo..."></nst-input>
  <nst-card padding="md">
    <h2>Card Title</h2>
    <p>Card content</p>
  </nst-card>
</body>
</html>
```

**Opção 2: jsDelivr (GitHub Repository)**
```html
<!-- Foundation CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/foundation/dist/css/nst-theme1.css">

<!-- Primitives CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nst-ds.css">

<!-- Primitives JS - IMPORTANTE: Use type="module" -->
<script type="module" src="https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nst-ds.esm.js"></script>
```

Veja [CDN.md](../../CDN.md) para mais detalhes sobre as opções de CDN.

## Uso

### HTML/Vanilla JS (CDN)

**GitHub Pages:**
```html
<!-- Foundation CSS -->
<link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/foundation/nst-theme1.css">

<!-- Primitives CSS -->
<link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/primitives/nst-ds.css">

<!-- Primitives JS - IMPORTANTE: Use type="module" e nst-ds.esm.js -->
<script type="module" src="https://lcpereira.github.io/nst-ds/primitives/nst-ds.esm.js"></script>

<!-- Usar os componentes -->
<nst-button variant="primary">Clique aqui</nst-button>
```

**⚠️ IMPORTANTE:** Sempre use `type="module"` no script tag e o arquivo `nst-ds.esm.js`. Sem isso, você receberá o erro: "Cannot use import statement outside a module"

**jsDelivr (alternativa):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/foundation/dist/css/nst-theme1.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nst-ds.css">
<script type="module" src="https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nst-ds.esm.js"></script>
```

### HTML/Vanilla JS (NPM)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@lcpereira/nst-ds-foundation/dist/css/nst-theme1.css">
  <script type="module" src="node_modules/@lcpereira/nst-ds-primitives/dist/bundle/nst-ds.esm.js"></script>
</head>
<body>
  <nst-button variant="primary" size="md">Clique aqui</nst-button>
  <nst-input type="text" placeholder="Digite algo..."></nst-input>
  <nst-card padding="md">
    <h2>Card Title</h2>
    <p>Card content</p>
  </nst-card>
</body>
</html>
```

### React (NPM)

```tsx
import '@lcpereira/nst-ds-primitives/dist/bundle/nst-ds.css';
import { defineCustomElements } from '@lcpereira/nst-ds-primitives/loader';

defineCustomElements();

function App() {
  return (
    <nst-button variant="primary">Clique aqui</ds-button>
  );
}
```

### PHP / Outras Stacks

```php
<!DOCTYPE html>
<html>
<head>
  <!-- Foundation CSS -->
  <link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/foundation/nst-theme1.css">
  
  <!-- Primitives CSS -->
  <link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/primitives/nst-ds.css">
  
  <!-- Primitives JS - IMPORTANTE: Use type="module" e nst-ds.esm.js -->
  <script type="module" src="https://lcpereira.github.io/nst-ds/primitives/nst-ds.esm.js"></script>
</head>
<body>
  <?php echo '<nst-button variant="primary">Botão PHP</nst-button>'; ?>
</body>
</html>
```

**⚠️ IMPORTANTE para PHP:**
- Sempre use `type="module"` no script tag
- Use o arquivo `nst-ds.esm.js` (não `nst-ds.js`)
- Sem `type="module"`, você receberá: "Cannot use import statement outside a module"

## Componentes Disponíveis

- `<nst-button>` - Botão com variantes e tamanhos
  - Variantes: `primary`, `secondary`, `outline`, `ghost`
  - Tamanhos: `sm`, `md`, `lg`

- `<nst-input>` - Campo de entrada
  - Tipos: `text`, `email`, `password`, etc.
  - Suporta eventos: `inputChange`, `inputFocus`, `inputBlur`

- `<nst-card>` - Card container
  - Padding: `sm`, `md`, `lg`

- `<nst-spinner>` - Indicador de carregamento
  - Tamanhos: `sm`, `md`, `lg`

- `<nst-badge>` - Badge/etiqueta
  - Variantes: `default`, `primary`, `secondary`, `success`, `warning`, `error`
  - Tamanhos: `sm`, `md`

## Arquivos Disponíveis

### Via NPM
- `dist/bundle/nst-ds.css` - CSS dos componentes
- `dist/bundle/nst-ds.esm.js` - JavaScript ESM
- `dist/loader/index.js` - Loader para React

### Via CDN (GitHub Pages)
- CSS: `https://lcpereira.github.io/nst-ds/primitives/nst-ds.css`
- JS: `https://lcpereira.github.io/nst-ds/primitives/nst-ds.esm.js` ⚠️ Use com `type="module"`

### Via CDN (jsDelivr - alternativa)
- CSS: `https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nst-ds.css`
- JS: `https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nst-ds.esm.js` ⚠️ Use com `type="module"`

## Notas

- **IMPORTANTE:** Sempre use `type="module"` no script tag e o arquivo `nst-ds.esm.js`
- Todos os componentes herdam tokens do `@lcpereira/nst-ds-foundation` via CSS variables (com prefixo `--nst-`)
- Funciona em qualquer navegador moderno (com suporte a ES Modules e Custom Elements)
- Não requer build step quando usado via CDN
- Compatível com PHP, Ruby, Python, Java e qualquer stack que renderize HTML
- Se receber erro "Cannot use import statement outside a module", verifique se está usando `type="module"` e `nst-ds.esm.js`
