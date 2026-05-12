/**
 * Abastece Manaus - Design System Tokens
 * Inspirado nas cores vibrantes do Papagaio-real da Amazônia.
 * 
 * Estrutura:
 * - baseColors: Definições brutas de cores (Paleta)
 * - themeColors: Mapeamento light/dark (consumido pelo hook useColors)
 * - tokens: Valores de espaçamento, raio, sombras e gradientes
 */

const baseColors = {
  scarlet: {
    DEFAULT: '#C21A2C',
    light: '#F05060',
    dark: '#8B0000',
  },
  cobalt: {
    DEFAULT: '#1B2EA6',
    deep: '#09115A',
    soft: '#4F60D0',
    tint: '#F3F5FE',
  },
  forest: {
    DEFAULT: '#166534',
    leaf: '#4ADE80',
    deep: '#052e16',
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    400: '#94A3B8',
    500: '#64748B',
    800: '#1E293B',
    900: '#0F172A',
  }
};

const themeColors = {
  // Cores principais
  primary:    { light: baseColors.scarlet.DEFAULT, dark: baseColors.scarlet.light },
  secondary:  { light: baseColors.cobalt.DEFAULT, dark: baseColors.cobalt.soft },
  accent:     { light: baseColors.forest.DEFAULT,  dark: baseColors.forest.leaf },

  // Backgrounds & Superfícies
  background: { light: baseColors.cobalt.tint,     dark: baseColors.cobalt.deep },
  surface:    { light: '#FFFFFF',                  dark: '#0C1868' },
  card:       { light: '#FFFFFF',                  dark: '#0F1B75' },
  
  // Tipografia
  foreground: { light: '#0D1B5E', dark: '#EEF0FF' },
  muted:      { light: baseColors.slate[500], dark: baseColors.slate[400] },

  // Elementos de UI
  border:     { light: baseColors.slate[200], dark: baseColors.cobalt.DEFAULT },
  tint:       { light: baseColors.scarlet.DEFAULT, dark: baseColors.scarlet.light },

  // Semântica
  success:    { light: baseColors.forest.DEFAULT, dark: baseColors.forest.leaf },
  warning:    { light: '#B45309', dark: '#FCD34D' },
  error:      { light: baseColors.scarlet.DEFAULT, dark: baseColors.scarlet.light },
};

const tokens = {
  radius: {
    xs: 8,
    sm: 12,
    md: 20, // Padrão para cards
    lg: 28, // Padrão para seções e modais
    xl: 36,
    full: 9999,
  },
  
  shadows: {
    soft: {
      shadowColor: baseColors.cobalt.deep,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    medium: {
      shadowColor: baseColors.cobalt.deep,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 5,
    },
    premium: {
      shadowColor: baseColors.scarlet.DEFAULT,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    }
  },

  gradients: {
    primary: [baseColors.scarlet.light, baseColors.scarlet.DEFAULT],
    secondary: [baseColors.cobalt.soft, baseColors.cobalt.DEFAULT],
    nature: [baseColors.forest.DEFAULT, '#059669'],
    surface: ['#FFFFFF', baseColors.cobalt.tint],
  }
};

module.exports = { 
  themeColors,
  tokens,
  baseColors 
};
