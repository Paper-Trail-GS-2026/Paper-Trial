import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../Context/ThemeContext";
import type { AppNavigation, BottomNavigationProps } from "../Types/types";
import { navigationItems } from "../Data/NavigationData";

export function BottomNavigation({ active }: BottomNavigationProps) {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<AppNavigation>();

  return (
    <View className="flex-row border-t border-rule bg-paper dark:border-dark-rule dark:bg-navy" style={{ paddingBottom: bottom }}>
      {navigationItems.map(({ route, label, icon: Icon }) => {
        const selected = route === active;
        const color = selected ? colors.brand : colors.textMuted;

        return (
          <TouchableOpacity
            key={route}
            onPress={() => navigation.navigate(route)}
            accessibilityState={{ selected }}
            className="flex-1 min-h-16 items-center justify-center gap-1 py-3"
          >
            <Icon strokeWidth={1.7} size={22} color={color} />
            <Text className="text-xs" style={{ color }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
