import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Brand } from "../Components/Brand";
import { LoginForm } from "../Components/LoginScreenComponents/LoginForm";
import { useTheme } from "../Context/ThemeContext";
import type { LoginScreenProps } from "../Types/types";

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { isDark } = useTheme();
  return <SafeAreaView edges={["top", "left", "right", "bottom"]} className="flex-1 bg-ground dark:bg-navy-2">
    <StatusBar style={isDark ? "light" : "dark"} />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-lg flex-1 px-6">
          <View className="pt-9">
            <Brand />
            <Text className="text-label font-semibold text-ink dark:text-paper mt-6">PaperTrail</Text>
            <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper mt-1">Organize-se antes de cada atendimento.</Text>
          </View>
          <LoginForm />
          <View className="mt-auto pt-10 flex-row flex-wrap justify-center items-center">
            <Text className="text-body-copy font-normal text-body dark:text-soft">Novo por aqui?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
              activeOpacity={0.8}
              accessibilityRole="button"
              className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-transparent">
              <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">Criar uma conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
