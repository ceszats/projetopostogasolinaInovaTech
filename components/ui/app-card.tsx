import type { ViewProps } from "react-native";
import { View } from "react-native";
import { useTheme } from "@/hooks/theme/use-theme";

type AppCardProps = ViewProps & {
  padded?: boolean;
};

export function AppCard({ padded = true, style, ...props }: AppCardProps) {
  const { colors, tokens } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          padding: padded ? tokens.space[4] : 0,
          ...tokens.shadows.soft,
        },
        style,
      ]}
      {...props}
    />
  );
}
