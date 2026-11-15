import { Pressable, ScrollView, Text } from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import type { StatusFilterProps } from "../../Types/types";

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const { isDark } = useTheme();
  return (<ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      gap: 8
    }}>
    {(["Todos", "Em andamento", "Prontos"] as const).map(status => <Pressable
      key={status}
      onPress={() => onChange(status)}
      accessibilityRole="button"
      accessibilityState={{
        selected: value === status
      }}
      className={`min-h-12 px-4 justify-center rounded-3xl ${value === status ? isDark ? "bg-dark-brand" : "bg-brand" : isDark ? "bg-dark-soft" : "bg-soft"}`}>
      <Text className={`text-label font-semibold ${value === status ? "text-paper dark:text-navy-2" : "text-brand dark:text-dark-brand"}`}>{status}</Text>
    </Pressable>)}
  </ScrollView>);
}
