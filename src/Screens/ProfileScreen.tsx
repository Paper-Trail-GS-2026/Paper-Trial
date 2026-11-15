import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemePreference } from "../Components/ProfileScreenComponents/ThemePreference";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import { BottomNavigation } from "../Navigation/BottomNavigation";
import { ProfileScreenProps } from "../Types/types";

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  return (<SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-ground dark:bg-navy-2">
    <StatusBar style={isDark ? "light" : "dark"} />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
          <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper">Seu espaço</Text>
          <View className="gap-3 rounded-2xl border p-5 bg-paper dark:bg-navy border-rule dark:border-dark-rule">
            <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">{user?.name || "Visitante"}</Text>
          </View>
          <View className="gap-4">
            <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Preferências</Text>
            <ThemePreference />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AboutScreen")}
            activeOpacity={0.8}
            accessibilityRole="button"
            className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-soft dark:bg-dark-soft">
            <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">Sobre o PaperTrail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => void logout()}
            activeOpacity={0.8}
            accessibilityRole="button"
            className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-transparent">
            <Text className="text-label font-semibold text-danger dark:text-dark-danger text-center">Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <BottomNavigation active="ProfileScreen" />
  </SafeAreaView>);
}
