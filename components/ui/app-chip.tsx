import type { PressableProps, TextStyle } from "react-native";
import { Pressable, Text } from "react-native";
import { useTheme } from "@/hooks/theme/use-theme";

type AppChipProps = PressableProps & {
  label: string;
  selected?: boolean;
};

export function AppChip({ label, selected = false, style, ...props }: AppChipProps) {
  const { colors, tokens } = useTheme();

  return (
    <Pressable
      style={(state) => [
        {
          alignItems: "center",
          backgroundColor: selected ? colors.primary : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
          borderRadius: tokens.radius.full,
          borderWidth: 1,
          minHeight: 36,
          justifyContent: "center",
          opacity: state.pressed ? 0.75 : 1,
          paddingHorizontal: tokens.space[3],
          paddingVertical: tokens.space[2],
        },
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: selected ? "#FFFFFF" : colors.foreground,
          fontSize: tokens.font.size.sm,
          fontWeight: tokens.font.weight.semibold,
          lineHeight: tokens.font.lineHeight.sm,
        } as TextStyle}
      >
        {label}
      </Text>
    </Pressable>
  );
}
