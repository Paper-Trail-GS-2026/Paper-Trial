import { LoadindCircle } from "../LoadindCircle";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRegisterForm } from "../../Hooks/useRegisterForm";
import { useTheme } from "../../Context/ThemeContext";

export function RegisterForm() {
  const { colors } = useTheme();
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { formData, errors, submitError, isSubmitting, updateField, handleRegister } = useRegisterForm();
  return (<View className="gap-4">
    <View className="gap-2">
      <Text className="text-label font-semibold text-ink dark:text-paper">Como podemos chamar você?</Text>
      <View className={`flex-row items-center rounded-xl border bg-paper dark:bg-navy ${nameFocused ? "border-brand dark:border-dark-brand" : "border-rule dark:border-dark-rule"}`}>
        <TextInput
          placeholder="Seu nome ou apelido"
          value={formData.name}
          onChangeText={(text) => updateField("name", text)}
          maxLength={60}
          accessibilityLabel="Como podemos chamar você?"
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.brand}
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
          className="min-h-12 flex-1 px-4 py-3.5 text-body-copy text-ink dark:text-paper" />
      </View>
      {!!errors.name && <Text accessibilityLiveRegion="polite" className="text-caption font-normal text-danger dark:text-dark-danger">{errors.name}</Text>}
    </View>
    <View className="gap-2">
      <Text className="text-label font-semibold text-ink dark:text-paper">E-mail</Text>
      <View className={`flex-row items-center rounded-xl border bg-paper dark:bg-navy ${emailFocused ? "border-brand dark:border-dark-brand" : "border-rule dark:border-dark-rule"}`}>
        <TextInput
          placeholder="seu.email@exemplo.com"
          value={formData.email}
          onChangeText={(text) => updateField("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          accessibilityLabel="E-mail"
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.brand}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          className="min-h-12 flex-1 px-4 py-3.5 text-body-copy text-ink dark:text-paper" />
      </View>
      {!!errors.email && <Text accessibilityLiveRegion="polite" className="text-caption font-normal text-danger dark:text-dark-danger">{errors.email}</Text>}
    </View>
    <View className="gap-2">
      <Text className="text-label font-semibold text-ink dark:text-paper">Senha</Text>
      <View className={`flex-row items-center rounded-xl border bg-paper dark:bg-navy ${passwordFocused ? "border-brand dark:border-dark-brand" : "border-rule dark:border-dark-rule"}`}>
        <TextInput
          placeholder="Sua senha"
          value={formData.senha}
          onChangeText={(text) => updateField("senha", text)}
          autoCapitalize="none"
          autoComplete="off"
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
      {!!errors.senha && <Text accessibilityLiveRegion="polite" className="text-caption font-normal text-danger dark:text-dark-danger">{errors.senha}</Text>}
    </View>
    <View className="gap-2">
      <Text className="text-label font-semibold text-ink dark:text-paper">Confirmar senha</Text>
      <View className={`flex-row items-center rounded-xl border bg-paper dark:bg-navy ${confirmPasswordFocused ? "border-brand dark:border-dark-brand" : "border-rule dark:border-dark-rule"}`}>
        <TextInput
          placeholder="Repita sua senha"
          value={formData.confirmarSenha}
          onChangeText={(text) => updateField("confirmarSenha", text)}
          autoCapitalize="none"
          autoComplete="off"
          accessibilityLabel="Confirmar senha"
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.brand}
          secureTextEntry={!confirmPasswordVisible}
          onFocus={() => setConfirmPasswordFocused(true)}
          onBlur={() => setConfirmPasswordFocused(false)}
          className="min-h-12 flex-1 px-4 py-3.5 text-body-copy text-ink dark:text-paper" />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          accessibilityRole="button"
          accessibilityLabel={confirmPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
          className="min-h-12 min-w-12 items-center justify-center">
          {confirmPasswordVisible ? <EyeOff size={20} color={colors.textMuted} /> : <Eye size={20} color={colors.textMuted} />}
        </TouchableOpacity>
      </View>
      {!!errors.confirmarSenha && <Text accessibilityLiveRegion="polite" className="text-caption font-normal text-danger dark:text-dark-danger">{errors.confirmarSenha}</Text>}
    </View>
    {!!submitError && <Text accessibilityLiveRegion="polite" className="text-caption font-normal text-danger dark:text-dark-danger">{submitError}</Text>}
    <TouchableOpacity
      onPress={handleRegister}
      activeOpacity={0.8}
      accessibilityRole="button"
      disabled={isSubmitting}
      accessibilityState={{ disabled: isSubmitting, busy: isSubmitting }}
      className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-navy-2 dark:bg-dark-brand">
      {isSubmitting ? <LoadindCircle label="Criando conta…" tone="onBrand" /> : <Text className="text-label font-semibold text-paper dark:text-navy-2 text-center">Experimentar o PaperTrail</Text>}
    </TouchableOpacity>
  </View>);
}
