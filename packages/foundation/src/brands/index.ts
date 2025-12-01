/**
 * Brands do Design System NSTech
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

import nsapps from './nsapps.json';
import nstech from './nstech.json';

export type Brand = 'nsapps' | 'nstech';

export interface BrandColors {
  brand: Brand;
  colors: {
    primary: string;
    secondary: string;
  };
}

export const brands = {
  nsapps,
  nstech,
} as const;

export default brands;
