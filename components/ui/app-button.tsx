import type { PressableProps, TextStyle } from "react-native";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { useTheme } from "@/hooks/theme/use-theme";

type AppButtonVariant = "primary" | "secondary" | "ghost";

type AppButtonProps = PressableProps & {
  title: string;
  loading?: boolean;
  variant?: AppButtonVariant;
};

export function AppButton({
  title,
  loading = false,
  variant = "primary",
  disabled,
  style,
  ...props
}: AppButtonProps) {
  const { colors, tokens } = useTheme();

  const variants = {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      textColor: "#FFFFFF",
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      textColor: "#111827",
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: colors.border,
      textColor: colors.foreground,
    },
  } as const;
  const current = variants[variant];

  return (
    <Pressable
      disabled={disabled || loading}
      style={(state) => [
        {
          alignItems: "center",
          backgroundColor: current.backgroundColor,
          borderColor: current.borderColor,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          minHeight: 44,
          justifyContent: "center",
          opacity: state.pressed || disabled ? 0.75 : 1,
          paddingHorizontal: tokens.space[4],
          paddingVertical: tokens.space[3],
        },
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={current.textColor} />
      ) : (
        <Text
          style={{
            color: current.textColor,
            fontSize: tokens.font.size.md,
            fontWeight: tokens.font.weight.semibold,
            lineHeight: tokens.font.lineHeight.md,
          } as TextStyle}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
