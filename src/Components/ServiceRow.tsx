import { BusFront,CarFront,ChevronRight,House } from "lucide-react-native";
import { Pressable,Text,View } from "react-native";
import { useTheme } from "../Context/ThemeContext";
import type { ServiceRowProps } from "../Types/types";

export function ServiceRow({ service, onPress }: ServiceRowProps) {
  const { colors, isDark } = useTheme();
  const Icon = service.id === "1" ? CarFront : service.id === "2" ? BusFront : House;
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Ver ${service.name}`}
    className={`flex-row items-center gap-3.5 rounded-xl border p-3.5 active:opacity-70 ${isDark ? "bg-navy border-dark-rule" : "bg-paper border-rule"}`}>
    <View className={`h-11 w-11 items-center justify-center rounded-xl ${isDark ? "bg-dark-soft" : "bg-soft"}`}><Icon size={22} strokeWidth={1.7} color={colors.brand} /></View>
    <View className="flex-1 gap-1">
      <Text className="text-xs font-normal text-body dark:text-soft uppercase tracking-wide">{service.category}</Text>
      <Text className="text-base text-ink dark:text-paper font-medium">{service.name}</Text>
      <Text numberOfLines={1} className="text-caption font-normal text-body dark:text-soft">{service.description}</Text>
    </View>
    <ChevronRight size={18} color={colors.textMuted} />
  </Pressable>;
}
