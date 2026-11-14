import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { DeletePreparationModalProps } from "../Types/types";

export function DeletePreparationModal({ onConfirm, onCancel }: DeletePreparationModalProps) {
  return (
    <Modal transparent animationType="none" visible onRequestClose={onCancel}>
      <SafeAreaView className="flex-1 bg-black/50">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}>
            <View accessibilityViewIsModal onAccessibilityEscape={onCancel} className="w-full max-w-lg self-center gap-3 rounded-2xl border p-5 bg-paper dark:bg-navy border-rule dark:border-dark-rule">
              <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Excluir este preparativo?</Text>
              <Text className="text-body-copy font-normal text-body dark:text-soft">As marcações desta lista serão removidas.</Text>
              <TouchableOpacity
                onPress={onConfirm}
                activeOpacity={0.8}
                accessibilityRole="button"
                className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-transparent">
                <Text className="text-label font-semibold text-danger dark:text-dark-danger text-center">Confirmar exclusão</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onCancel}
                activeOpacity={0.8}
                accessibilityRole="button"
                className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-soft dark:bg-dark-soft">
                <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">Manter preparativo</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
