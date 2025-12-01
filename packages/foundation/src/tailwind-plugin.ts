import type { Config } from 'tailwindcss';
import { colors, spacing, radii, typography, motion, zIndex } from './tokens/core';

/**
 * Plugin Tailwind para tokens do Design System
 */
export default function tailwindPlugin() {
  return function ({ addBase }: { addBase: (styles: Record<string, any>) => void }) {
    addBase({
      ':root': {
        // Colors
        ...Object.entries(colors.neutral).reduce((acc, [key, value]) => {
          acc[`--nst-color-neutral-${key}`] = value;
          return acc;
        }, {} as Record<string, string>),
        
        // Spacing
        ...Object.entries(spacing).reduce((acc, [key, value]) => {
          acc[`--nst-spacing-${key}`] = value;
          return acc;
        }, {} as Record<string, string>),
        
        // Radii
        ...Object.entries(radii).reduce((acc, [key, value]) => {
          acc[`--nst-radius-${key}`] = value;
          return acc;
        }, {} as Record<string, string>),
        
        // Typography
        '--nst-font-sans': typography.fontFamily.sans.join(', '),
        '--nst-font-mono': typography.fontFamily.mono.join(', '),
        
        // Motion
        '--nst-transition-default': motion.transition.default,
        '--nst-transition-colors': motion.transition.colors,
        
        // Z-Index
        ...Object.entries(zIndex).reduce((acc, [key, value]) => {
          acc[`--nst-z-${key}`] = String(value);
          return acc;
        }, {} as Record<string, string>),
      },
    });
  };
}

/**
 * Configuração Tailwind com tokens
 */
export const tailwindConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        neutral: Object.entries(colors.neutral).reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>),
        semantic: {
          success: colors.semantic.success,
          warning: colors.semantic.warning,
          error: colors.semantic.error,
          info: colors.semantic.info,
        },
      },
      spacing: spacing,
      borderRadius: radii,
      fontFamily: {
        sans: [...typography.fontFamily.sans],
        mono: [...typography.fontFamily.mono],
      },
      fontSize: Object.entries(typography.fontSize).reduce((acc, [key, value]) => {
        if (Array.isArray(value)) {
          acc[key] = [value[0] as string, { lineHeight: (value[1] as { lineHeight: string }).lineHeight }];
        } else if (typeof value === 'string') {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string | [string, { lineHeight: string }]>),
      fontWeight: typography.fontWeight,
      transitionDuration: motion.duration,
      transitionTimingFunction: motion.easing,
      zIndex: Object.entries(zIndex).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>),
    },
  },
};

