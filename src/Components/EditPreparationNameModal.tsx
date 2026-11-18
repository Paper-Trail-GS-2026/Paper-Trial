import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../Context/ThemeContext";
import type { EditPreparationNameModalProps } from "../Types/types";

export function EditPreparationNameModal({ title, onConfirm, onCancel, busy = false, error }: EditPreparationNameModalProps) {
  const { colors } = useTheme();
  const [draft, setDraft] = useState(title);
  const [draftFocused, setDraftFocused] = useState(false);
  const saveName = () => {
    if (!busy && draft.trim()) onConfirm(draft.trim());
  };

  return (
    <Modal transparent animationType="none" visible onRequestClose={() => { if (!busy) onCancel(); }}>
      <SafeAreaView className="flex-1 bg-black/50">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}>
            <View accessibilityViewIsModal onAccessibilityEscape={() => { if (!busy) onCancel(); }} className="w-full max-w-lg self-center gap-3 rounded-2xl border p-5 bg-paper dark:bg-navy border-rule dark:border-dark-rule">
              <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Editar nome do preparativo</Text>
              <View className="gap-2">
                <Text className="text-label font-semibold text-ink dark:text-paper">Nome do preparativo</Text>
                <View className={`flex-row items-center rounded-xl border bg-paper dark:bg-navy ${draftFocused ? "border-brand dark:border-dark-brand" : "border-rule dark:border-dark-rule"}`}>
                  <TextInput
                    value={draft}
                    onChangeText={setDraft}
                    maxLength={160}
                    editable={!busy}
                    autoFocus={true}
                    accessibilityLabel="Nome do preparativo"
                    placeholderTextColor={colors.textMuted}
                    selectionColor={colors.brand}
                    onFocus={() => setDraftFocused(true)}
                    onBlur={() => setDraftFocused(false)}
                    className="min-h-12 flex-1 px-4 py-3.5 text-body-copy text-ink dark:text-paper" />
                </View>
              </View>
              {error && <Text accessibilityRole="alert" className="text-body-copy text-danger dark:text-dark-danger">{error}</Text>}
              <TouchableOpacity
                onPress={saveName}
                activeOpacity={0.8}
                accessibilityRole="button"
                disabled={busy || !draft.trim()}
                accessibilityState={{ disabled: busy || !draft.trim(), busy }}
                className={`min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-navy-2 dark:bg-dark-brand ${!draft.trim() ? "opacity-50" : ""}`}>
                <Text className="text-label font-semibold text-paper dark:text-navy-2 text-center">{busy ? "Salvando…" : "Salvar nome"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={busy}
                onPress={onCancel}
                activeOpacity={0.8}
                accessibilityRole="button"
                className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-transparent">
                <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">Cancelar edição</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
