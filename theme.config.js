/** @type {const} */
const themeColors = {
  // ── 🦜 Inspiração: Papagaio-real da Amazônia ──────────────────────────
  // Escarlate das asas   → #C21A2C  (claro)  |  #F05060  (escuro)
  // Cobalto das penas    → #1B2EA6  (claro)  |  #09115A  (fundo escuro)

  // Vermelho-escarlate: mais vivo e saturado que o anterior
  primary:    { light: '#C21A2C', dark: '#F05060' },

  // Fundos com tint azulado sutil — "céu da floresta amazônica"
  background: { light: '#F3F5FE', dark: '#09115A' },
  surface:    { light: '#E8ECFA', dark: '#0F1B75' },

  // Texto: navy profundo no claro → máximo contraste; gelo azulado no escuro
  foreground: { light: '#0D1B5E', dark: '#EEF0FF' },
  muted:      { light: '#4E598A', dark: '#8490CC' },

  // Bordas com tint cobalto — harmoniza com o fundo
  border:     { light: '#B0BADF', dark: '#1F30A0' },

  // Semânticas — verde floresta para success, mantém coerência tropical
  success:    { light: '#166534', dark: '#4ADE80' },
  warning:    { light: '#B45309', dark: '#FCD34D' },
  error:      { light: '#9B1515', dark: '#FCA5A5' },

  // Accent: cobalto no claro (asas do papagaio), escarlate no escuro
  accent:     { light: '#1B2EA6', dark: '#F05060' },

  // Card levemente mais frio que o fundo
  card:       { light: '#FFFFFF', dark: '#0C1868' },
  tint:       { light: '#C21A2C', dark: '#F05060' },
};

module.exports = { themeColors };
