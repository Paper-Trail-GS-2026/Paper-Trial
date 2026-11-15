import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLoginForm } from "../../Hooks/useLoginForm";
import { useTheme } from "../../Context/ThemeContext";

export function LoginForm() {
  const { colors } = useTheme();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { formData, errors, isSubmitting, submitError, updateField, handleLogin } = useLoginForm();
  const [recovery, setRecovery] = useState(false);
  return (
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
  );
}
