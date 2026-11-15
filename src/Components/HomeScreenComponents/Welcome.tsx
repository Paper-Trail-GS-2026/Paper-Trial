import { Pressable, Text, View } from "react-native";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import type { WelcomeProps } from "../../Types/types";

export function Welcome({ onProfile }: WelcomeProps) {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const name = user?.name.split(" ")[0] || "visitante";
  return <View className="flex-row items-center gap-4">
    <View className="flex-1 gap-1">
      <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper">Olá, {name}</Text>
      <Text className="text-body-copy font-normal text-body dark:text-soft">Vamos deixar tudo preparado?</Text>
    </View>
    <Pressable
      onPress={onProfile}
      accessibilityRole="button"
      accessibilityLabel="Abrir perfil"
      className={`h-12 w-12 items-center justify-center rounded-full active:opacity-70 ${isDark ? "bg-dark-soft" : "bg-soft"}`}>
      <Text className="text-label font-semibold text-brand dark:text-dark-brand">{name.slice(0, 2).toUpperCase()}</Text>
    </Pressable>
  </View>;
}
