/**
 * Brands do Design System
 * Este arquivo é gerado automaticamente pelo script generate-brands.mjs
 * Para adicionar um novo brand, simplesmente adicione um arquivo .json na pasta brands/
 * 
 * Estrutura esperada do JSON:
 * {
 *   "brand": "nome-do-brand",
 *   "colors": {
 *     "primary": "#hexcolor",
 *     "secondary": "#hexcolor"
 *   }
 * }
 */

import example from './example.json';
import theme1 from './theme1.json';
import theme2 from './theme2.json';

export type Brand = 'example' | 'theme1' | 'theme2';

export interface BrandColors {
  brand: Brand;
  colors: {
    primary: string;
    secondary: string;
  };
}

export const brands = {
  example,
  theme1,
  theme2,
} as const;

export default brands;
