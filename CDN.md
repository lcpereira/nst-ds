# CDN - NSTech Design System

Este documento lista todas as formas de acessar os arquivos do Design System via CDN.

## Opções de CDN

### 1. GitHub Pages (Recomendado)

Após o primeiro deploy, os arquivos estarão disponíveis em:

**Foundation CSS:**
- NSTech: `https://lcpereira.github.io/nst-ds/foundation/css/nstech.css`
- NSApps: `https://lcpereira.github.io/nst-ds/foundation/css/nsapps.css`

**Primitives:**
- CSS: `https://lcpereira.github.io/nst-ds/primitives/bundle/nstech-ds.css`
- JS: `https://lcpereira.github.io/nst-ds/primitives/bundle/nstech-ds.esm.js`

### 2. jsDelivr (GitHub Repository)

Funciona diretamente do repositório GitHub:

**Foundation CSS:**
- NSTech: `https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/foundation/dist/css/nstech.css`
- NSApps: `https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/foundation/dist/css/nsapps.css`

**Primitives:**
- CSS: `https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nstech-ds.css`
- JS: `https://cdn.jsdelivr.net/gh/lcpereira/nst-ds@main/packages/primitives/dist/bundle/nstech-ds.esm.js`

**Nota:** Para versões específicas, substitua `@main` por `@v1.0.0` (tag) ou `@commit-hash`.

### 3. jsDelivr (npm - GitHub Packages)

**Nota:** GitHub Packages não oferece CDN público via jsDelivr/unpkg. Use uma das opções acima.

## Exemplo Completo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha App</title>
  
  <!-- Foundation CSS (escolha o brand) -->
  <link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/foundation/css/nstech.css">
  
  <!-- Primitives CSS -->
  <link rel="stylesheet" href="https://lcpereira.github.io/nst-ds/primitives/bundle/nstech-ds.css">
  
  <!-- Primitives JS -->
  <script type="module" src="https://lcpereira.github.io/nst-ds/primitives/bundle/nstech-ds.esm.js"></script>
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

## Configuração do GitHub Pages

1. Vá em **Settings** > **Pages** no seu repositório
2. Selecione **Source**: `GitHub Actions`
3. A action `cdn-deploy.yml` será executada automaticamente após cada push no `main`

## Atualização dos Arquivos

Os arquivos são atualizados automaticamente quando:
- Você faz push no branch `main`
- Os arquivos em `packages/foundation/dist/css/` ou `packages/primitives/dist/bundle/` são modificados
- Você executa manualmente a action "Deploy CDN Assets"

