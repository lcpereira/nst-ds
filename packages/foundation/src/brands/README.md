# Brands

Esta pasta contém os arquivos de configuração de cada brand do Design System.

## Como Adicionar um Novo Brand

1. **Crie um arquivo JSON** com o nome do brand (ex: `novobrand.json`)

2. **Use a seguinte estrutura:**

```json
{
  "brand": "novobrand",
  "colors": {
    "primary": "#0A5FFF",
    "secondary": "#1CC8EE"
  }
}
```

3. **Execute o build:**

```bash
yarn build
```

O sistema irá:
- ✅ Detectar automaticamente o novo brand
- ✅ Gerar os tipos TypeScript
- ✅ Criar o arquivo CSS em `dist/css/novobrand.css`
- ✅ Disponibilizar via CDN automaticamente

## Estrutura do JSON

- `brand` (string, obrigatório): Nome do brand (deve corresponder ao nome do arquivo sem .json)
- `colors.primary` (string, obrigatório): Cor primária em hexadecimal
- `colors.secondary` (string, obrigatório): Cor secundária em hexadecimal

## Exemplo

```json
{
  "brand": "minhaempresa",
  "colors": {
    "primary": "#FF6B6B",
    "secondary": "#4ECDC4"
  }
}
```

Após adicionar este arquivo e executar `yarn build`, você terá:
- `dist/css/minhaempresa.css` disponível
- Tipos TypeScript atualizados
- Acesso via `brands.minhaempresa` no código
