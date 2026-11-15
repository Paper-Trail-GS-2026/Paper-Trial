import { Moon } from "lucide-react-native";
import { Switch, Text, View } from "react-native";
import { useTheme } from "../../Context/ThemeContext";

export function ThemePreference() {
  const { colors, isDark, toggleTheme } = useTheme();
  return (<View className="flex-row gap-3.5 items-center min-h-16">
    <Moon size={23} color={colors.brand} />
    <View className="flex-1 gap-1">
      <Text className="text-label font-semibold text-ink dark:text-paper">Tema escuro</Text>
      <Text className="text-caption font-normal text-body dark:text-soft">Mais conforto para sua leitura.</Text>
    </View>
    <Switch
      accessibilityLabel="Usar tema escuro"
      value={isDark}
      onValueChange={toggleTheme}
      trackColor={{
        false: colors.border,
        true: colors.brand
      }}
      thumbColor={colors.surface}
      className="min-w-12 min-h-12" />
  </View>);
}
