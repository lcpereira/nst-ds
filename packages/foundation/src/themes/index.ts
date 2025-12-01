import light from './light.json';
import dark from './dark.json';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    background: string;
    foreground: string;
    muted: string;
    'muted-foreground': string;
    border: string;
    input: string;
    ring: string;
  };
}

export const themes = {
  light,
  dark,
} as const;

export default themes;

