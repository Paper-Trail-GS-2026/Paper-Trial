import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppPresentation } from "../Components/AboutScreenComponents/AppPresentation";
import { ProjectInfo } from "../Components/AboutScreenComponents/ProjectInfo";
import { Team } from "../Components/AboutScreenComponents/Team";
import { appInfo } from "../Data/AppInfo";
import { useTheme } from "../Context/ThemeContext";
import type { AboutScreenProps } from "../Types/types";

export function AboutScreen({ navigation }: AboutScreenProps) {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-ground dark:bg-navy-2">
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-3xl self-center px-5 pt-4 pb-8">
          <View className="gap-3 pb-6">
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Voltar à tela anterior"
              onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("HomeScreen")}
              className="min-h-12 min-w-12 self-start flex-row items-center gap-2"
            >
              <ArrowLeft size={20} color={colors.text} />
              <Text className="text-sm font-medium text-ink dark:text-paper">Voltar</Text>
            </TouchableOpacity>
            <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper">Sobre o PaperTrail</Text>
          </View>

          <View className="gap-6">
            <AppPresentation />
            <ProjectInfo />
            <Team />
            <Text className="text-center text-xs text-body dark:text-soft">{appInfo.project}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
