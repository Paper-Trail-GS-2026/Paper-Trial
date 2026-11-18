import { useEffect, useRef, useState } from "react";
import type { ComponentRef } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bot, Send, X } from "lucide-react-native";
import { useTheme } from "../Context/ThemeContext";
import { sendChatMessage } from "../Services/chatbot";
import { LoadindCircle } from "./LoadindCircle";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export function ChatbotWidget() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [previousInteractionId, setPreviousInteractionId] = useState<string>();
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      });
    }
  }, [messages, open]);

  const submit = async () => {
    const text = question.trim();
    if (!text || text.length > 500 || pending) {
      setError(!text ? "Digite uma pergunta." : "Digite uma mensagem de até 500 caracteres.");
      return;
    }

    setError("");
    setQuestion("");
    setPending(true);
    setMessages((current) => [...current, { role: "user", text }]);

    try {
      const response = await sendChatMessage(text, undefined, previousInteractionId);
      setPreviousInteractionId(response.interaction_id);
      setMessages((current) => [...current, { role: "assistant", text: response.resposta }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível conversar com o chatbot.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {!open && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Abrir assistente virtual"
          onPress={() => setOpen(true)}
          activeOpacity={0.85}
          className="absolute h-16 w-16 items-center justify-center rounded-full bg-brand dark:bg-dark-brand"
          style={{
            right: 20,
            bottom: Math.max(insets.bottom, 16) + 76,
            zIndex: 50,
            elevation: 8,
          }}
        >
          <Bot size={28} strokeWidth={1.8} color={colors.onBrand} />
        </TouchableOpacity>
      )}

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(8, 15, 30, 0.35)" }}
        >
          <View
            className="self-end w-full rounded-t-3xl border-t border-rule bg-paper px-4 pt-4 dark:border-dark-rule dark:bg-navy"
            style={{
              maxHeight: "72%",
              paddingBottom: Math.max(insets.bottom, 12),
            }}
          >
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-brand dark:bg-dark-brand">
                  <Bot size={23} strokeWidth={1.8} color={colors.onBrand} />
                </View>
                <View>
                  <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">
                    Assistente PaperTrail
                  </Text>
                  <Text className="text-caption text-body dark:text-soft">
                    Perguntas gerais sobre serviços
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Fechar assistente"
                onPress={() => setOpen(false)}
                className="h-11 w-11 items-center justify-center rounded-full bg-soft dark:bg-dark-soft"
              >
                <X size={21} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollRef}
              className="mb-3"
              style={{ minHeight: 120, maxHeight: 360 }}
              contentContainerStyle={{ gap: 10, paddingVertical: 4 }}
              keyboardShouldPersistTaps="handled"
            >
              {!messages.length && (
                <View className="rounded-2xl bg-soft p-4 dark:bg-dark-soft">
                  <Text className="text-body-copy text-ink dark:text-paper">
                    Olá! Posso ajudar com dúvidas sobre documentos, requisitos e preparo para atendimentos.
                  </Text>
                </View>
              )}
              {messages.map((message, index) => (
                <View
                  key={`${message.role}:${index}`}
                  className={`max-w-[86%] rounded-2xl p-3 ${
                    message.role === "user"
                      ? "self-end bg-brand dark:bg-dark-brand"
                      : "self-start bg-soft dark:bg-dark-soft"
                  }`}
                >
                  <Text
                    className={`text-body-copy ${
                      message.role === "user"
                        ? "text-paper dark:text-navy-2"
                        : "text-ink dark:text-paper"
                    }`}
                  >
                    {message.text}
                  </Text>
                </View>
              ))}
              {pending && (
                <View className="self-start rounded-2xl bg-soft px-4 py-3 dark:bg-dark-soft">
                  <LoadindCircle label="Pensando…" size={18} />
                </View>
              )}
            </ScrollView>

            {!!error && (
              <Text accessibilityRole="alert" className="mb-2 text-caption text-danger dark:text-dark-danger">
                {error}
              </Text>
            )}

            <View className="flex-row items-end gap-2">
              <TextInput
                accessibilityLabel="Mensagem para o assistente"
                placeholder="Digite sua pergunta…"
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.brand}
                multiline
                maxLength={500}
                editable={!pending}
                value={question}
                onChangeText={setQuestion}
                textAlignVertical="top"
                className="min-h-12 max-h-28 flex-1 rounded-xl border border-rule px-3 py-3 text-body-copy text-ink dark:border-dark-rule dark:text-paper"
              />
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Enviar mensagem"
                disabled={!question.trim() || pending}
                onPress={() => void submit()}
                className="h-12 w-12 items-center justify-center rounded-xl bg-brand dark:bg-dark-brand"
                style={{ opacity: !question.trim() || pending ? 0.55 : 1 }}
              >
                <Send size={21} strokeWidth={1.8} color={colors.onBrand} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
