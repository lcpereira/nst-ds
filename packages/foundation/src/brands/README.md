# Brands - Customização Centralizada de Cores

Brands permitem customizar **todas as cores** do Design System em um único lugar centralizado: a seção `colors`.

## Estrutura Completa

Todas as cores podem ser definidas na seção `colors` do brand:

```json
{
  "brand": "meu-brand",
  "colors": {
    // Cores de marca (obrigatórias)
    "primary": "#ff3d03",
    "secondary": "#ff7f00",
    
    // Cores semânticas (opcionais)
    "success": "#10b981",
    "error": "#ef4444",
    "warning": "#f59e0b",
    "info": "#3b82f6",
    
    // Cores do tema light (opcionais)
    "background": "#ffffff",
    "foreground": "#171717",
    "muted": "#f5f5f5",
    "mutedForeground": "#737373",
    "border": "#e5e5e5",
    "input": "#e5e5e5",
    "ring": "#ff3d03",
    
    // Cores do tema dark (opcionais)
    "dark": {
      "background": "#0a0a0a",
      "foreground": "#fafafa",
      "muted": "#171717",
      "mutedForeground": "#a3a3a3",
      "border": "#262626",
      "input": "#262626",
      "ring": "#ff7f00"
    },
    
    // Cores de componentes (opcionais)
    "components": {
      "navbar": {
        "background": "#ffffff",
        "text": "#171717",
        "border": "#e5e5e5",
        "brand": "#ff3d03",
        "brandHover": "#e63503"
      },
      "navItem": {
        "background": "transparent",
        "text": "#171717"
      },
      "navLink": {
        "default": "#171717",
        "hover": "#ff3d03",
        "active": "#ff3d03",
        "disabled": "#737373"
      },
      "button": {
        "background": "transparent",
        "text": "#171717",
        "border": "#e5e5e5",
        "outlinePrimary": "#ff3d03",
        "outlinePrimaryHoverBackground": "#ff3d03",
        "outlinePrimaryHoverText": "#ffffff",
        "outlineDanger": "#ef4444",
        "outlineDangerHoverBackground": "#ef4444",
        "outlineDangerHoverText": "#ffffff"
      }
    }
  }
}
```

## Estrutura Mínima

Apenas `primary` e `secondary` são obrigatórios. Todas as outras cores usam valores padrão:

```json
{
  "brand": "minimal",
  "colors": {
    "primary": "#6366f1",
    "secondary": "#8b5cf6"
  }
}
```

## Sistema de Fallback

- **Cores não definidas** usam valores padrão do sistema
- Você pode customizar **apenas algumas cores** ou **todas as cores**
- Cores podem ser em formato **hex** (`#ff3d03`), **hsl** (`hsl(12 100% 50%)`), **rgb** ou **CSS variable** (`var(--nst-color-primary)`)
- As cores definidas **sobrescrevem** os valores padrão

## Cores Disponíveis

### Cores de Marca (obrigatórias)
- `primary` - Cor primária da marca
- `secondary` - Cor secundária da marca

### Cores Semânticas (opcionais)
- `success` - Cor de sucesso (padrão: `#059669`)
- `error` - Cor de erro (padrão: `#dc2626`)
- `warning` - Cor de aviso (padrão: `#d97706`)
- `info` - Cor de informação (padrão: `#2563eb`)

### Cores do Tema Light (opcionais)
- `background` - Cor de fundo (padrão: `#ffffff`)
- `foreground` - Cor de texto principal (padrão: `#171717`)
- `muted` - Cor de fundo suave (padrão: `#f5f5f5`)
- `mutedForeground` - Cor de texto secundário (padrão: `#737373`)
- `border` - Cor de borda (padrão: `#e5e5e5`)
- `input` - Cor de borda de input (padrão: `#e5e5e5`)
- `ring` - Cor de foco/ring (padrão: `#0A5FFF`)

### Cores do Tema Dark (opcionais)
Todas as cores acima podem ser redefinidas para dark mode dentro de `dark`:
- `dark.background` - Cor de fundo no dark mode (padrão: `#0a0a0a`)
- `dark.foreground` - Cor de texto no dark mode (padrão: `#fafafa`)
- ... e assim por diante

### Cores de Componentes (opcionais)
Definidas dentro de `colors.components`:
- `navbar.*` - Cores da navbar
- `navItem.*` - Cores dos itens de navegação
- `navLink.*` - Cores dos links de navegação
- `button.*` - Cores dos botões

## Exemplos

### Exemplo 1: Apenas cores básicas
```json
{
  "brand": "simple",
  "colors": {
    "primary": "#6366f1",
    "secondary": "#8b5cf6"
  }
}
```

### Exemplo 2: Cores básicas + semânticas
```json
{
  "brand": "semantic",
  "colors": {
    "primary": "#6366f1",
    "secondary": "#8b5cf6",
    "success": "#22c55e",
    "error": "#ef4444",
    "warning": "#f59e0b",
    "info": "#3b82f6"
  }
}
```

### Exemplo 3: Cores completas com dark mode
```json
{
  "brand": "complete",
  "colors": {
    "primary": "#ff3d03",
    "secondary": "#ff7f00",
    "background": "#ffffff",
    "foreground": "#171717",
    "dark": {
      "background": "#0a0a0a",
      "foreground": "#fafafa"
    }
  }
}
```

### Exemplo 4: Customização completa
Veja `example.json` para um exemplo completo com todas as cores customizadas.

## Compatibilidade

A estrutura antiga (com `components` no nível raiz) ainda é suportada para compatibilidade, mas recomenda-se usar `colors.components` para centralização.
