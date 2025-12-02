# Brands - Customização de Cores

Brands permitem customizar cores do Design System de forma granular.

## Estrutura Básica

```json
{
  "brand": "nome-do-brand",
  "colors": {
    "primary": "#hexcolor",
    "secondary": "#hexcolor"
  }
}
```

## Customização Granular de Componentes

Você pode customizar cores de componentes específicos:

```json
{
  "brand": "meu-brand",
  "colors": {
    "primary": "#ff3d03",
    "secondary": "#ff7f00"
  },
  "components": {
    "header": {
      "background": "#ffffff",
      "text": "#171717",
      "border": "#e5e5e5"
    },
    "footer": {
      "background": "#f5f5f5",
      "text": "#737373",
      "border": "#e5e5e5"
    },
    "navbar": {
      "background": "#ffffff",
      "text": "#171717",
      "brand": "#ff3d03",
      "link": "#171717",
      "linkHover": "#ff3d03",
      "linkActive": "#ff3d03",
      "border": "#e5e5e5"
    },
    "button": {
      "primary": {
        "background": "#ff3d03",
        "text": "#ffffff",
        "border": "#ff3d03",
        "hover": {
          "background": "#e63503",
          "text": "#ffffff",
          "border": "#e63503"
        }
      },
      "secondary": {
        "background": "#ff7f00",
        "text": "#ffffff",
        "border": "#ff7f00"
      }
    }
  }
}
```

## Sistema de Fallback

- Se você **não definir** uma cor de componente, o sistema usa o valor padrão definido em `color-tokens.css`
- Você pode customizar **apenas uma cor** ou **todas as cores**
- Cores podem ser em formato **hex** (`#ff3d03`) ou **CSS variable** (`var(--nst-color-primary)`)
- As brands sobrescrevem diretamente os tokens (ex: `--nst-color-navbar-brand`), sem sufixos especiais

## Exemplo Mínimo

```json
{
  "brand": "minimal",
  "colors": {
    "primary": "#6366f1",
    "secondary": "#8b5cf6"
  }
}
```

Apenas customiza primary e secondary, todos os componentes usam os valores padrão.

## Exemplo Customizado

```json
{
  "brand": "custom",
  "colors": {
    "primary": "#6366f1",
    "secondary": "#8b5cf6"
  },
  "components": {
    "navbar": {
      "brand": "#ff0000"
    }
  }
}
```

Customiza apenas a cor do navbar-brand, mantendo todas as outras cores padrão.
