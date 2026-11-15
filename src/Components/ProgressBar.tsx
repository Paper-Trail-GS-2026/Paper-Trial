import { Text, View } from "react-native";
import { useTheme } from "../Context/ThemeContext";
import type { ProgressProps } from "../Types/types";

export function Progress({
  completed,
  total
}: ProgressProps) {
  const { isDark } = useTheme();
  const percent = total ? Math.round(completed / total * 100) : 0;
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: total,
        now: completed
      }}
      accessibilityLabel={`${completed} de ${total} itens marcados`}
      className="gap-2"
    >
      <View className="flex-row justify-between gap-3">
        <Text className="text-caption font-normal text-body dark:text-soft">{completed} de {total} itens marcados</Text>
        <Text className="text-label font-semibold text-brand dark:text-dark-brand">{percent}%</Text>
      </View>
      <View className={`h-1.5 ${isDark ? "bg-dark-soft" : "bg-soft"} rounded-sm overflow-hidden`}>
        <View style={{ width: `${percent}%` }} className={`h-1.5 ${isDark ? "bg-dark-brand" : "bg-brand"} rounded-sm`} />
      </View>
    </View>
  );
}
