# Como Publicar os Pacotes

## Publicação via GitHub Actions

### Como Publicar

1. **Acesse o GitHub Actions:**
   - Vá em: https://github.com/lcpereira/nst-ds/actions
   - Clique em "Publish Packages"
   - Clique em "Run workflow"
   - Digite a versão (ex: `1.0.0`)
   - Clique em "Run workflow"

2. **A Action irá:**
   - Atualizar a versão em todos os pacotes
   - Fazer build de todos os pacotes
   - Publicar no GitHub Packages automaticamente

### Instalar Pacotes Publicados

No projeto que vai usar os pacotes:

1. **Criar `.npmrc` no projeto:**
```bash
@lcpereira:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_TOKEN
```

2. **Criar Personal Access Token:**
   - https://github.com/settings/tokens
   - Escopos: `read:packages`

3. **Instalar:**
```bash
yarn add @lcpereira/nst-ds-foundation@latest
yarn add @lcpereira/nst-ds-primitives@latest
yarn add @lcpereira/nst-ds-react@latest
```

## Versões

- Use semantic versioning: `1.0.0`, `1.0.1`, `1.1.0`, `2.0.0`
- A versão será aplicada a todos os 3 pacotes simultaneamente
- Após publicar, os pacotes estarão disponíveis em: https://github.com/lcpereira/nst-ds/packages

## CDN

Os pacotes também estarão disponíveis via CDN do jsDelivr:

```html
<!-- Foundation CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-foundation@latest/dist/css/nstech.css">

<!-- Primitives -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@lcpereira/nst-ds-primitives@latest/dist/bundle/nstech-ds.esm.js"></script>
```
