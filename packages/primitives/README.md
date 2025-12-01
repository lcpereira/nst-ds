# @lcpereira/nst-ds-primitives

Web Components universais do Design System NSTech. Compatível com qualquer stack: React, Angular, Vue, PHP, Vanilla JS.

## Instalação

### NPM/Yarn

```bash
yarn add @lcpereira/nst-ds-primitives
# ou
npm install @lcpereira/nst-ds-primitives
```

### CDN (Sem NPM)

Use diretamente no HTML via CDN, sem precisar de npm ou bundler:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Minha App</title>
  
  <!-- 1. Importar CSS do Foundation (escolha o brand) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">
  
  <!-- 2. Importar CSS dos Primitives -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.css">
  
  <!-- 3. Importar JavaScript dos Primitives -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.esm.js"></script>
</head>
<body>
  <!-- Usar os componentes -->
  <ds-button variant="primary" size="md">Clique aqui</ds-button>
  <ds-input type="text" placeholder="Digite algo..."></ds-input>
  <ds-card padding="md">
    <h2>Card Title</h2>
    <p>Card content</p>
  </ds-card>
</body>
</html>
```

## Uso

### HTML/Vanilla JS (CDN)

```html
<!-- Importar via CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.esm.js"></script>

<!-- Usar os componentes -->
<ds-button variant="primary">Clique aqui</ds-button>
```

### HTML/Vanilla JS (NPM)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@lcpereira/nst-ds-foundation/dist/css/nstech.css">
  <script type="module" src="node_modules/@lcpereira/nst-ds-primitives/dist/bundle/nstech-ds.esm.js"></script>
</head>
<body>
  <ds-button variant="primary" size="md">Clique aqui</ds-button>
  <ds-input type="text" placeholder="Digite algo..."></ds-input>
  <ds-card padding="md">
    <h2>Card Title</h2>
    <p>Card content</p>
  </ds-card>
</body>
</html>
```

### React (NPM)

```tsx
import '@lcpereira/nst-ds-primitives/dist/bundle/nstech-ds.css';
import { defineCustomElements } from '@lcpereira/nst-ds-primitives/loader';

defineCustomElements();

function App() {
  return (
    <ds-button variant="primary">Clique aqui</ds-button>
  );
}
```

### PHP / Outras Stacks

```php
<!DOCTYPE html>
<html>
<head>
  <!-- Via CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.css">
  <script type="module" src="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.esm.js"></script>
</head>
<body>
  <?php echo '<ds-button variant="primary">Botão PHP</ds-button>'; ?>
</body>
</html>
```

## Componentes Disponíveis

- `<ds-button>` - Botão com variantes e tamanhos
  - Variantes: `primary`, `secondary`, `outline`, `ghost`
  - Tamanhos: `sm`, `md`, `lg`

- `<ds-input>` - Campo de entrada
  - Tipos: `text`, `email`, `password`, etc.
  - Suporta eventos: `inputChange`, `inputFocus`, `inputBlur`

- `<ds-card>` - Card container
  - Padding: `sm`, `md`, `lg`

- `<ds-spinner>` - Indicador de carregamento
  - Tamanhos: `sm`, `md`, `lg`

- `<ds-badge>` - Badge/etiqueta
  - Variantes: `default`, `primary`, `secondary`, `success`, `warning`, `error`
  - Tamanhos: `sm`, `md`

## Arquivos Disponíveis

### Via NPM
- `dist/bundle/nstech-ds.css` - CSS dos componentes
- `dist/bundle/nstech-ds.esm.js` - JavaScript ESM
- `dist/loader/index.js` - Loader para React

### Via CDN
- `https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.css`
- `https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.esm.js`

## Notas

- Todos os componentes herdam tokens do `@lcpereira/nst-ds-foundation` via CSS variables
- Funciona em qualquer navegador moderno (com suporte a Custom Elements)
- Não requer build step quando usado via CDN
- Compatível com PHP, Ruby, Python, Java e qualquer stack que renderize HTML
