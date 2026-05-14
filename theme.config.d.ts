export const themeColors: {
  primary: { light: string; dark: string };
  secondary: { light: string; dark: string };
  accent: { light: string; dark: string };
  background: { light: string; dark: string };
  surface: { light: string; dark: string };
  card: { light: string; dark: string };
  foreground: { light: string; dark: string };
  muted: { light: string; dark: string };
  border: { light: string; dark: string };
  tint: { light: string; dark: string };
  success: { light: string; dark: string };
  warning: { light: string; dark: string };
  error: { light: string; dark: string };
};

export const tokens: {
  radius: Record<string, number>;
  shadows: Record<string, Record<string, unknown>>;
  gradients: Record<string, string[]>;
};

declare const themeConfig: {
  themeColors: typeof themeColors;
  tokens: typeof tokens;
};

export default themeConfig;
