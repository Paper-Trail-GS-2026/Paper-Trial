import { LoadindCircle } from "../LoadindCircle";
import { useState } from "react";
import { Linking, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useGuidance } from "../../Hooks/useGuidance";
import { useTheme } from "../../Context/ThemeContext";
import type { ApiGuidanceProps } from "../../Types/types";

export function ApiGuidance({ serviceId }: ApiGuidanceProps) {
  const { question, updateQuestion, validationError, submit, mutation } =
    useGuidance(serviceId);
  const { colors } = useTheme();
  const [sourceError, setSourceError] = useState("");
  const openSource = async (url: string) => {
    setSourceError("");
    try {
      await Linking.openURL(url);
    } catch {
      setSourceError("Não foi possível abrir a fonte. Tente novamente.");
    }
  };
  return (
    <View className="gap-3 rounded-2xl border p-5 bg-paper dark:bg-navy border-rule dark:border-dark-rule">
      <Text
        accessibilityRole="header"
        className="text-heading font-semibold text-ink dark:text-paper"
      >
        Ficou alguma dúvida?
      </Text>
      <Text className="text-body-copy text-body dark:text-soft">
        Pergunte sobre este serviço e consulte as fontes da orientação.
      </Text>
      <TextInput
        accessibilityLabel="Pergunta sobre o serviço"
        placeholder="O que você gostaria de saber?"
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.brand}
        multiline
        maxLength={500}
        editable={!mutation.isPending}
        value={question}
        onChangeText={(value) => {
          setSourceError("");
          updateQuestion(value);
        }}
        textAlignVertical="top"
        className="min-h-24 rounded-xl border border-rule dark:border-dark-rule p-3 text-body-copy text-ink dark:text-paper"
      />
      <Text className="text-caption text-body dark:text-soft">
        {question.length}/500
      </Text>
      {!!validationError && (
        <Text
          accessibilityRole="alert"
          className="text-body-copy text-body dark:text-soft"
        >
          {validationError}
        </Text>
      )}
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={{
          disabled: mutation.isPending,
          busy: mutation.isPending,
        }}
        disabled={mutation.isPending}
        onPress={() => {
          setSourceError("");
          void submit();
        }}
        className="min-h-14 justify-center rounded-xl px-5 py-3.5 bg-soft dark:bg-dark-soft"
      >
        {mutation.isPending ? (
          <LoadindCircle label="Buscando orientação…" />
        ) : (
          <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">
            {mutation.isError ? "Tentar novamente" : "Enviar pergunta"}
          </Text>
        )}
      </TouchableOpacity>
      {mutation.isError && (
        <Text
          accessibilityRole="alert"
          className="text-body-copy text-body dark:text-soft"
        >
          {mutation.error.message}
        </Text>
      )}
      {mutation.data && (
        <View accessibilityLiveRegion="polite" className="gap-3">
          {mutation.data.insufficientEvidence && (
            <Text className="text-label font-semibold text-ink dark:text-paper">
              Não há evidências suficientes nas fontes cadastradas.
            </Text>
          )}
          <Text className="text-body-copy text-ink dark:text-paper">
            {mutation.data.answer}
          </Text>
          {mutation.data.sources.map((source, index) => {
            let url: string | null = null;
            try {
              const parsed = new URL(source.sourceUrl);
              if (["http:", "https:"].includes(parsed.protocol))
                url = parsed.href;
            } catch {
              /* A fonte continua identificada mesmo sem um link válido. */
            }
            return (
              <View key={`${source.sourceUrl}:${index}`} className="gap-1">
                {url ? (
                  <TouchableOpacity
                    accessibilityRole="link"
                    accessibilityLabel={`Consultar fonte: ${source.sourceTitle}`}
                    onPress={() => {
                      void openSource(url);
                    }}
                    className="min-h-12 justify-center"
                  >
                    <Text className="text-label text-brand dark:text-dark-brand underline">
                      {source.sourceTitle}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text className="text-label text-body dark:text-soft">
                    {source.sourceTitle} — link indisponível
                  </Text>
                )}
                <Text className="text-caption text-body dark:text-soft">
                  Revisada em{" "}
                  {new Date(source.reviewedAt).toLocaleDateString("pt-BR")}
                </Text>
              </View>
            );
          })}
        </View>
      )}
      {!!sourceError && (
        <Text
          accessibilityRole="alert"
          className="text-caption text-body dark:text-soft"
        >
          {sourceError}
        </Text>
      )}
    </View>
  );
}
