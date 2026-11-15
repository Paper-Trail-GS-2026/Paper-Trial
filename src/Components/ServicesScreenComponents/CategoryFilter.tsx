import { Pressable, ScrollView, Text } from "react-native";
import { serviceCategories } from "../../Data/ServicesData";
import { useTheme } from "../../Context/ThemeContext";
import type { CategoryFilterProps } from "../../Types/types";

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { isDark } = useTheme();
  return (<ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      gap: 8
    }}>
    {serviceCategories.map(category => <Pressable
      key={category}
      accessibilityRole="button"
      accessibilityState={{
        selected: selected === category
      }}
      onPress={() => onSelect(category)}
      className={`min-h-12 px-4 justify-center rounded-3xl ${selected === category ? isDark ? "bg-dark-brand" : "bg-navy-2" : isDark ? "bg-navy" : "bg-paper"} border ${selected === category ? isDark ? "border-dark-brand" : "border-navy-2" : isDark ? "border-dark-rule" : "border-rule"}`}>
      <Text className={`text-label font-semibold ${selected === category ? "text-paper dark:text-navy-2" : "text-body dark:text-soft"}`}>{category}</Text>
    </Pressable>)}
  </ScrollView>);
}
