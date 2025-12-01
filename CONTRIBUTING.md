# Guia de Contribuição

## Estrutura do Projeto

Este é um mono-repo gerenciado pelo Turborepo com 3 pacotes principais:

1. **Foundation** - Tokens, themes e brands
2. **Primitives** - Web Components universais
3. **React** - Componentes React completos

## Desenvolvimento

### Setup Inicial

```bash
# Instalar dependências
yarn install

# Build de todos os pacotes
yarn build
```

### Desenvolvimento Local

```bash
# Desenvolvimento com watch mode
yarn dev

# Build de um pacote específico
cd packages/foundation && yarn build
cd packages/primitives && yarn build
cd packages/react && yarn build
```

## Adicionando Novos Tokens

1. Edite os arquivos em `packages/foundation/src/tokens/core/`
2. Execute `yarn build` no pacote foundation
3. Os CSS files serão gerados automaticamente

## Adicionando Novos Web Components

1. Crie o componente em `packages/primitives/src/components/`
2. Use CSS variables do foundation
3. O Stencil gerará automaticamente os wrappers React

## Adicionando Novos Componentes React

1. Crie o componente em `packages/react/src/components/ui/`
2. Use Tailwind com tokens do foundation
3. Siga os padrões do shadcn/ui

## Convenções

- Use TypeScript em todos os arquivos
- Siga os padrões de código existentes
- Adicione testes quando apropriado
- Documente mudanças significativas

