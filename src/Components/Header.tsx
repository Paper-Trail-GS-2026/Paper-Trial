import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../Context/ThemeContext";
import type { HeaderProps } from "../Types/types";

export function Header({
  title,
  back
}: HeaderProps) {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  return (
    <View className={`min-h-16 px-5 pt-3 flex-row items-center gap-3 ${isDark ? "border-dark-rule" : "border-rule"} ${isDark ? "bg-navy-2" : "bg-ground"}`}>
      {back ? <Pressable
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
        className="w-12 h-12 justify-center items-center"
      >
        <ArrowLeft size={23} color={colors.text} />
      </Pressable> : null}
      <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper flex-1">{title || "PaperTrail"}</Text>
    </View>
  );
}
