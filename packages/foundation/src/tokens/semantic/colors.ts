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
    link?: string;
    linkHover?: string;
    linkActive?: string;
    border?: string;
  };
  
  button?: {
    primary?: {
      background?: string;
      text?: string;
      border?: string;
      hover?: {
        background?: string;
        text?: string;
        border?: string;
      };
    };
    secondary?: {
      background?: string;
      text?: string;
      border?: string;
      hover?: {
        background?: string;
        text?: string;
        border?: string;
      };
    };
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
};

