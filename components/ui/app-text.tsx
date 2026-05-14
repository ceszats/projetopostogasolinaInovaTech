import type { TextProps, TextStyle } from "react-native";
import { Text } from "react-native";
import { useTheme } from "@/hooks/theme/use-theme";

type AppTextVariant = "body" | "label" | "muted" | "title" | "caption";

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
};

export function AppText({ variant = "body", style, ...props }: AppTextProps) {
  const { colors, tokens } = useTheme();

  const variants = {
    body: {
      color: colors.foreground,
      fontSize: tokens.font.size.md,
      lineHeight: tokens.font.lineHeight.md,
      fontWeight: tokens.font.weight.regular,
    },
    label: {
      color: colors.foreground,
      fontSize: tokens.font.size.sm,
      lineHeight: tokens.font.lineHeight.sm,
      fontWeight: tokens.font.weight.semibold,
    },
    muted: {
      color: colors.muted,
      fontSize: tokens.font.size.sm,
      lineHeight: tokens.font.lineHeight.sm,
      fontWeight: tokens.font.weight.regular,
    },
    title: {
      color: colors.foreground,
      fontSize: tokens.font.size.xl,
      lineHeight: tokens.font.lineHeight.xl,
      fontWeight: tokens.font.weight.bold,
    },
    caption: {
      color: colors.muted,
      fontSize: tokens.font.size.xs,
      lineHeight: tokens.font.lineHeight.xs,
      fontWeight: tokens.font.weight.medium,
    },
  } satisfies Record<AppTextVariant, TextStyle>;

  return <Text style={[variants[variant], style]} {...props} />;
}
