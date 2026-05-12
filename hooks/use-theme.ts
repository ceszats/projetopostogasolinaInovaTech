import { useColors } from './use-colors';
import { useColorScheme } from './use-color-scheme';
import { tokens } from '@/theme.config';

/**
 * Hook completo para acessar o sistema de design:
 * - colors: paleta light/dark atualizada
 * - tokens: shadows, radius e gradients persistentes
 * - isDark: helper booleano
 */
export function useTheme() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    colors,
    tokens,
    isDark,
  };
}
