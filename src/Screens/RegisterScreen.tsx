import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../Components/Header";
import { RegisterForm } from "../Components/RegisterScreenComponents/RegisterForm";
import { useTheme } from "../Context/ThemeContext";

export function RegisterScreen() {
  const { isDark } = useTheme();
  return (<SafeAreaView edges={["top", "left", "right", "bottom"]} className="flex-1 bg-ground dark:bg-navy-2">
    <StatusBar style={isDark ? "light" : "dark"} />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <Header title="Cadastro" back />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-lg flex-1 px-6">
          <View className="gap-2.5">
            <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper">Tudo começa com um passo.</Text>
            <Text className="text-body-copy font-normal text-body dark:text-soft">Um espaço para organizar seus preparativos, no seu ritmo.</Text>
          </View>
          <RegisterForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>);
}
