import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff } from "lucide-react-native";
import { useTheme } from "../Context/ThemeContext";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Brand } from "../Components/Brand";
import { useLoginForm } from "../Hooks/useLoginForm";
import type { LoginScreenProps } from "../Types/types";

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { isDark, colors } = useTheme();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { formData, errors, isSubmitting, submitError, updateField, handleLogin } = useLoginForm();
  const [recovery, setRecovery] = useState(false);
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
          <View className="gap-4 mt-4">
            <View className="gap-2">
              <Text className="text-label font-semibold text-ink dark:text-paper">E-mail</Text>
              <View className={`flex-row items-center rounded-xl border bg-paper dark:bg-navy ${emailFocused ? "border-brand dark:border-dark-brand" : "border-rule dark:border-dark-rule"}`}>
                <TextInput
                  placeholder="voce@email.com"
                  value={formData.email}
                  onChangeText={(value) => updateField("email", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="E-mail"
                  placeholderTextColor={colors.textMuted}
                  selectionColor={colors.brand}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="min-h-12 flex-1 px-4 py-3.5 text-body-copy text-ink dark:text-paper" />
              </View>
              {!!errors.email && <Text accessibilityLiveRegion="polite" className="text-caption text-danger dark:text-dark-danger">{errors.email}</Text>}
            </View>
            <View className="gap-2">
              <Text className="text-label font-semibold text-ink dark:text-paper">Senha</Text>
              <View className={`flex-row items-center rounded-xl border bg-paper dark:bg-navy ${passwordFocused ? "border-brand dark:border-dark-brand" : "border-rule dark:border-dark-rule"}`}>
                <TextInput
                  placeholder="••••••••"
                  value={formData.senha}
                  onChangeText={(value) => updateField("senha", value)}
                  autoCapitalize="none"
                  accessibilityLabel="Senha"
                  placeholderTextColor={colors.textMuted}
                  selectionColor={colors.brand}
                  secureTextEntry={!passwordVisible}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="min-h-12 flex-1 px-4 py-3.5 text-body-copy text-ink dark:text-paper" />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  accessibilityRole="button"
                  accessibilityLabel={passwordVisible ? "Ocultar senha" : "Mostrar senha"}
                  className="min-h-12 min-w-12 items-center justify-center">
                  {passwordVisible ? <EyeOff size={20} color={colors.textMuted} /> : <Eye size={20} color={colors.textMuted} />}
                </TouchableOpacity>
              </View>
              {!!errors.senha && <Text accessibilityLiveRegion="polite" className="text-caption text-danger dark:text-dark-danger">{errors.senha}</Text>}
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setRecovery(!recovery)}
              className="self-end min-h-12 justify-center">
              <Text className="text-caption font-normal text-brand dark:text-dark-brand">Esqueci minha senha</Text>
            </Pressable>
            {recovery && <Text accessibilityLiveRegion="polite" className="text-caption font-normal text-body dark:text-soft">Recuperação de senha indisponível no momento.</Text>}
            {!!submitError && <Text accessibilityLiveRegion="polite" className="text-caption text-danger dark:text-dark-danger">{submitError}</Text>}
            <TouchableOpacity
              onPress={() => void handleLogin()}
              disabled={isSubmitting}
              accessibilityState={{ disabled: isSubmitting, busy: isSubmitting }}
              activeOpacity={0.8}
              accessibilityRole="button"
              className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-navy-2 dark:bg-dark-brand">
              <Text className="text-label font-semibold text-paper dark:text-navy-2 text-center">{isSubmitting ? "Entrando..." : "Entrar"}</Text>
            </TouchableOpacity>
          </View>
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
