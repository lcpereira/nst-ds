# NSTech Design System

Mono-repo do Design System da NSTech, contendo Foundation (tokens), Primitives (Web Components) e React (componentes completos).

## 📦 Estrutura

```
design-system/
├── packages/
│   ├── foundation/      # Tokens, themes, brands
│   ├── primitives/      # Web Components leves
│   └── react/           # Componentes React + shadcn
├── scripts/             # Build pipelines
└── turbo.json           # Configuração Turborepo
```

## 🚀 Início Rápido

```bash
# Instalar dependências
yarn install

# Build de todos os pacotes
yarn build

# Desenvolvimento
yarn dev
```

## 📦 Publicação

Para publicar os pacotes, use a GitHub Action:
1. Vá em Actions → "Publish Packages"
2. Clique em "Run workflow"
3. Digite a versão (ex: `1.0.0`)

Veja [PUBLISH.md](./PUBLISH.md) para mais detalhes.

## 📚 Pacotes

### @lcpereira/nst-ds-foundation
Tokens, temas e brands. Fonte única de verdade para cores, tipografia, spacing, etc.

**Uso NPM:**
```typescript
import { colors, spacing, brands } from '@lcpereira/nst-ds-foundation';
import '@lcpereira/nst-ds-foundation/dist/css/nstech.css';
```

**Uso CDN (sem npm):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">
<!-- ou nsapps.css, ambevtech.css -->
```

### @lcpereira/nst-ds-primitives
Web Components universais compatíveis com qualquer stack (React, Angular, Vue, PHP, Vanilla).

**Uso NPM:**
```html
<script type="module" src="node_modules/@lcpereira/nst-ds-primitives/dist/bundle/nstech-ds.esm.js"></script>
```

**Uso CDN (sem npm):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.esm.js"></script>

<ds-button variant="primary">Clique aqui</ds-button>
```

### @lcpereira/nst-ds-react
Componentes React completos com shadcn, Tailwind e acessibilidade.

**Uso:**
```tsx
import { Button, Input, Card } from '@lcpereira/nst-ds-react';
import '@lcpereira/nst-ds-react/styles';
```

## 🔧 Tecnologias

- **Turborepo** - Orquestração do mono-repo
- **TypeScript 5.7** - Tipagem em todos os pacotes
- **Stencil 4** - Web Components (Primitives)
- **React 19** - Framework (pacote React)
- **shadcn/ui** - Base de componentes (pacote React)
- **Tailwind CSS 3.4** - Estilização (pacote React)
- **Radix UI** - Componentes acessíveis (pacote React)

## 📖 Documentação

Cada pacote possui sua própria documentação:

- [Foundation](./packages/foundation/README.md) - Tokens, CSS vars, brands
- [Primitives](./packages/primitives/README.md) - Web Components (CDN/NPM)
- [React](./packages/react/README.md) - Componentes React completos

## 🌐 Uso via CDN (Sem NPM)

O Design System pode ser usado diretamente via CDN, sem necessidade de npm ou bundler:

### Foundation (CSS)
```html
<!-- Escolha o brand -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">
```

### Primitives (Web Components)
```html
<!-- CSS do Foundation primeiro -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">
<!-- CSS dos Primitives -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.css">
<!-- JavaScript dos Primitives -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.esm.js"></script>

<!-- Usar os componentes -->
<ds-button variant="primary">Clique aqui</ds-button>
```

Veja [exemplo completo](./examples/cdn-usage.html) de uso via CDN.

## 🏗️ Arquitetura

### Foundation (Repo 1)
- Tokens core (cores neutras, spacing, radii, typography, motion, z-index)
- Tokens de brand (apenas cores de marca: nstech, nsapps, ambevtech)
- Themes (light/dark)
- Gera CSS variables e plugin Tailwind

### Primitives (Repo 2)
- Web Components leves (átomos)
- Compatível com qualquer stack
- Herda tokens via CSS vars
- Wrappers React gerados automaticamente

### React (Repo 3)
- Componentes completos React
- Baseado em shadcn/ui
- Integração com Tailwind
- Acessibilidade completa (Radix UI)

