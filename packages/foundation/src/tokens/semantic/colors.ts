/**
 * Semantic Color Tokens
 * Tokens de cor semânticos que podem ser customizados por brand
 */

export interface SemanticColors {
  // Cores de marca (podem ser customizadas por brand)
  primary: string;
  secondary: string;
  
  // Cores semânticas (sucesso, erro, aviso, info)
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Cores de componentes (podem ser customizadas por brand)
  header?: {
    background?: string;
    text?: string;
    border?: string;
  };
  
  footer?: {
    background?: string;
    text?: string;
    border?: string;
  };
  
  navbar?: {
    background?: string;
    text?: string;
    brand?: string;
    brandHover?: string;
    border?: string;
  };
  
  navItem?: {
    background?: string;
    text?: string;
  };
  
  navLink?: {
    default?: string;
    hover?: string;
    active?: string;
    disabled?: string;
  };
  
  button?: {
    background?: string;
    text?: string;
    border?: string;
  };
}

/**
 * Default semantic colors
 * Valores padrão que serão usados se não customizados
 */
export const defaultSemanticColors: SemanticColors = {
  primary: 'var(--nst-color-primary)',
  secondary: 'var(--nst-color-secondary)',
  success: 'var(--nst-color-success)',
  error: 'var(--nst-color-error)',
  warning: 'var(--nst-color-warning)',
  info: 'var(--nst-color-info)',
  header: {
    background: 'var(--nst-color-background)',
    text: 'var(--nst-color-foreground)',
    border: 'var(--nst-color-border)',
  },
  footer: {
    background: 'var(--nst-color-background)',
    text: 'var(--nst-color-foreground)',
    border: 'var(--nst-color-border)',
  },
  navbar: {
    background: 'var(--nst-color-background)',
    text: 'var(--nst-color-foreground)',
    brand: 'var(--nst-color-primary)',
    brandHover: 'var(--nst-color-primary)',
    border: 'var(--nst-color-border)',
  },
  navItem: {
    background: 'transparent',
    text: 'var(--nst-color-foreground)',
  },
  navLink: {
    default: 'var(--nst-color-foreground)',
    hover: 'var(--nst-color-primary)',
    active: 'var(--nst-color-primary)',
    disabled: 'var(--nst-color-muted-foreground)',
  },
  button: {
    background: 'transparent',
    text: 'var(--nst-color-foreground)',
    border: 'var(--nst-color-border)',
  }
};

