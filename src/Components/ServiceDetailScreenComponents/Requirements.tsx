import { FileText } from "lucide-react-native";
import { Text, View } from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import type { RequirementsProps } from "../../Types/types";

export function Requirements({ items }: RequirementsProps) {
  const { colors, isDark } = useTheme();
  return (<View className="gap-1">
    <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper mb-2">O que preparar</Text>
    {items.map(item => <View key={item.name} className={`flex-row gap-3 py-4 border-b ${isDark ? "border-dark-rule" : "border-rule"}`}>
      <FileText size={21} color={colors.brand} />
      <View className="flex-1 gap-1">
        <Text className="text-body-copy font-normal text-ink dark:text-paper">{item.name}</Text>
        <Text className="text-caption font-normal text-body dark:text-soft">{item.description}</Text>
        <Text className="text-label font-semibold text-brand dark:text-dark-brand">{item.required ? "Obrigatório" : "Opcional"}</Text>
      </View>
    </View>)}
  </View>);
}
