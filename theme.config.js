/**
 * Abastece Manaus - Design System Tokens
 * Identidade utilitaria inspirada em economia, combustivel e Manaus.
 *
 * Estrutura:
 * - baseColors: paleta bruta
 * - themeColors: mapeamento light/dark consumido pelo app
 * - tokens: espacamento, raio, tipografia, sombras e gradientes
 */

const baseColors = {
  forest: {
    DEFAULT: '#15803D',
    light: '#22C55E',
    dark: '#14532D',
    tint: '#F0FDF4',
  },
  amber: {
    DEFAULT: '#F59E0B',
    light: '#FBBF24',
    dark: '#B45309',
    tint: '#FFFBEB',
  },
  red: {
    DEFAULT: '#DC2626',
    light: '#F87171',
    dark: '#991B1B',
  },
  fuel: {
    gasoline: '#2563EB',
    ethanol: '#16A34A',
    diesel: '#7C3AED',
    gnv: '#0EA5E9',
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

const themeColors = {
  primary: { light: baseColors.forest.DEFAULT, dark: baseColors.forest.light },
  secondary: { light: baseColors.amber.DEFAULT, dark: baseColors.amber.light },
  accent: { light: baseColors.amber.dark, dark: baseColors.amber.light },

  background: { light: baseColors.slate[50], dark: '#07130B' },
  surface: { light: '#FFFFFF', dark: '#102016' },
  card: { light: '#FFFFFF', dark: '#14261A' },

  foreground: { light: baseColors.slate[900], dark: '#ECFDF3' },
  muted: { light: baseColors.slate[600], dark: '#A7B8AA' },
  border: { light: baseColors.slate[200], dark: '#24452F' },
  tint: { light: baseColors.forest.DEFAULT, dark: baseColors.forest.light },

  success: { light: baseColors.forest.DEFAULT, dark: baseColors.forest.light },
  warning: { light: baseColors.amber.dark, dark: baseColors.amber.light },
  error: { light: baseColors.red.DEFAULT, dark: baseColors.red.light },

  priceCheap: { light: baseColors.forest.DEFAULT, dark: baseColors.forest.light },
  priceMedium: { light: baseColors.amber.DEFAULT, dark: baseColors.amber.light },
  priceExpensive: { light: baseColors.red.DEFAULT, dark: baseColors.red.light },

  fuelGasoline: { light: baseColors.fuel.gasoline, dark: '#60A5FA' },
  fuelEthanol: { light: baseColors.fuel.ethanol, dark: '#4ADE80' },
  fuelDiesel: { light: baseColors.fuel.diesel, dark: '#A78BFA' },
  fuelGnv: { light: baseColors.fuel.gnv, dark: '#38BDF8' },
};

const tokens = {
  radius: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
  },
  font: {
    size: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 17,
      xl: 22,
      xxl: 28,
    },
    lineHeight: {
      xs: 16,
      sm: 18,
      md: 22,
      lg: 24,
      xl: 30,
      xxl: 36,
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extraBold: '800',
    },
  },
  shadows: {
    soft: {
      shadowColor: baseColors.slate[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
    },
    medium: {
      shadowColor: baseColors.slate[900],
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.07,
      shadowRadius: 14,
      elevation: 3,
    },
    premium: {
      shadowColor: baseColors.forest.DEFAULT,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 4,
    },
  },
  gradients: {
    primary: [baseColors.forest.light, baseColors.forest.DEFAULT],
    secondary: [baseColors.amber.light, baseColors.amber.DEFAULT],
    nature: [baseColors.forest.DEFAULT, '#059669'],
    surface: ['#FFFFFF', baseColors.forest.tint],
  },
};

module.exports = {
  themeColors,
  tokens,
  baseColors,
};
