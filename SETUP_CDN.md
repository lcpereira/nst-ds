# Configuração do CDN - Guia Rápido

## ✅ O que já está pronto

- ✅ Workflow criado (`.github/workflows/cdn-deploy.yml`)
- ✅ Permissões configuradas
- ✅ Scripts de build prontos
- ✅ Arquivo HTML de índice criado

## 🔧 Configuração Necessária (1 passo)

### 1. Habilitar GitHub Pages

1. Vá no seu repositório: `https://github.com/lcpereira/nst-ds`
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione: **GitHub Actions**
5. Clique em **Save**

**Pronto!** Agora o CDN está configurado.

## 🚀 Como usar

### Opção 1: Execução Automática

A action será executada automaticamente quando:
- Você fizer push no branch `main`
- Os arquivos CSS/JS forem modificados

### Opção 2: Execução Manual

1. Vá em **Actions** no GitHub
2. Selecione **Deploy CDN Assets**
3. Clique em **Run workflow**
4. Selecione o branch `main`
5. Clique em **Run workflow**

## 📍 URLs do CDN

Após o primeiro deploy, os arquivos estarão disponíveis em:

**Foundation:**
- `https://lcpereira.github.io/nst-ds/foundation/css/nstech.css`
- `https://lcpereira.github.io/nst-ds/foundation/css/nsapps.css`

**Primitives:**
- `https://lcpereira.github.io/nst-ds/primitives/bundle/nstech-ds.css`
- `https://lcpereira.github.io/nst-ds/primitives/bundle/nstech-ds.esm.js`

**Página de índice:**
- `https://lcpereira.github.io/nst-ds/`

## ⚠️ Importante

- O primeiro deploy pode levar alguns minutos
- Certifique-se de que os pacotes foram buildados antes (execute `yarn build` localmente ou deixe a action fazer)
- Se os arquivos `dist/` não existirem, a action irá buildá-los automaticamente

## 🔍 Verificar se funcionou

1. Após executar a action, vá em **Actions** > **Deploy CDN Assets**
2. Verifique se o job `deploy` foi concluído com sucesso (✓ verde)
3. Acesse `https://lcpereira.github.io/nst-ds/` no navegador
4. Você deve ver a página de índice com todos os links

## ❓ Problemas comuns

**Erro: "GitHub Pages is currently disabled"**
- Solução: Habilite o GitHub Pages nas configurações (passo 1 acima)

**Erro: "No build output found"**
- Solução: Certifique-se de que os arquivos foram buildados. A action faz isso automaticamente, mas você pode executar `yarn build` localmente primeiro

**URLs não funcionam após deploy**
- Solução: Aguarde alguns minutos. O GitHub Pages pode levar até 10 minutos para propagar as mudanças

