# Setup Rápido para Publicar no GitHub Packages

## 1. Criar Personal Access Token

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Nome: `npm-publish`
4. Escopos: marque `write:packages` e `read:packages`
5. Gere e copie o token

## 2. Configurar Localmente

```bash
# Criar .npmrc.local (não será commitado)
cat > .npmrc.local << EOF
@lcpereira:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_TOKEN_AQUI
EOF
```

## 3. Atualizar package.json

Substitua `SEU_USERNAME` nos arquivos:
- `packages/foundation/package.json`
- `packages/primitives/package.json`
- `packages/react/package.json`

Pelo seu username do GitHub no campo `repository.url`.

## 4. Publicar

```bash
# Build
yarn build

# Publicar (use o token quando pedir)
cd packages/foundation
npm publish

cd ../primitives
npm publish

cd ../react
npm publish
```

## 5. Usar em Outros Projetos

No projeto que vai usar os pacotes:

```bash
# Criar .npmrc
cat > .npmrc << EOF
@lcpereira:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_TOKEN
EOF

# Instalar
yarn add @lcpereira/nst-ds-foundation@latest
yarn add @lcpereira/nst-ds-primitives@latest
yarn add @lcpereira/nst-ds-react@latest
```

## Alternativa: NPM Público

Se preferir npm público, remova o `publishConfig` dos package.json e use:

```bash
npm login
npm publish --access public
```

