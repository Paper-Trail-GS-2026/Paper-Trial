import { Check, Square } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import type { ChecklistProps } from "../../Types/types";

export function Checklist({ items, completed, onToggle }: ChecklistProps) {
  const { colors, isDark } = useTheme();
  return (<View>
    <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper mb-2">Sua lista de preparação</Text>
    {items.map((item, index) => {
      const checked = completed.includes(index);
      return (<Pressable
        key={item.name}
        onPress={() => onToggle(index)}
        accessibilityRole="checkbox"
        accessibilityLabel={`${item.name}, ${item.required ? "obrigatório" : "opcional"}`}
        accessibilityState={{
          checked
        }}
        className={`flex-row gap-3.5 items-center min-h-20 py-5 border-b ${isDark ? "border-dark-rule" : "border-rule"} active:opacity-70`}>
        {checked ? <View className={`w-6 h-6 rounded ${isDark ? "bg-dark-brand" : "bg-brand"} items-center justify-center`}>
          <Check size={18} color={colors.onBrand} />
        </View> : <Square size={24} color={colors.textMuted} />}
        <View className="flex-1 gap-1">
          <Text className={`text-body-copy font-normal ${checked ? "text-mute dark:text-soft-line" : "text-ink dark:text-paper"} ${`${checked ? "line-through" : "no-underline"}`}`}>{item.name}</Text>
          <Text className="text-caption font-normal text-body dark:text-soft">{item.description}</Text>
          <Text className="text-label font-semibold text-brand dark:text-dark-brand">{item.required ? "Obrigatório" : "Opcional"}</Text>
        </View>
      </Pressable>);
    })}
  </View>);
}
