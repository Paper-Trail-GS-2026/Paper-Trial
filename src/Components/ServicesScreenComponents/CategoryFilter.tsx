import { Pressable, ScrollView, Text } from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import type { CategoryFilterProps } from "../../Types/types";

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const { isDark } = useTheme();
  return (<ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      gap: 8
    }}>
    {[{ id: null, name: "Todos" }, ...categories].map(category => <Pressable
      key={category.id ?? "all"}
      accessibilityRole="button"
      accessibilityState={{
        selected: selected === category.id
      }}
      onPress={() => onSelect(category.id)}
      className={`min-h-12 px-4 justify-center rounded-3xl ${selected === category.id ? isDark ? "bg-dark-brand" : "bg-navy-2" : isDark ? "bg-navy" : "bg-paper"} border ${selected === category.id ? isDark ? "border-dark-brand" : "border-navy-2" : isDark ? "border-dark-rule" : "border-rule"}`}>
      <Text className={`text-label font-semibold ${selected === category.id ? "text-paper dark:text-navy-2" : "text-body dark:text-soft"}`}>{category.name}</Text>
    </Pressable>)}
  </ScrollView>);
}
