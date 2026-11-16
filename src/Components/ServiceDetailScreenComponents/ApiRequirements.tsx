import { LoadindCircle } from "../LoadindCircle";
import axios from "axios";
import { useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useRequirementsSnapshot } from "../../Hooks/useServices";
import type { ApiRequirementsProps } from "../../Types/types";

export function ApiRequirements({ serviceId }: ApiRequirementsProps) {
  const query = useRequirementsSnapshot(serviceId);
  const [sourceError, setSourceError] = useState("");
  const notFound =
    axios.isAxiosError(query.error) && query.error.response?.status === 404;

  const openSource = async (url: string) => {
    setSourceError("");
    try {
      await Linking.openURL(url);
    } catch {
      setSourceError("Não foi possível abrir a fonte. Tente novamente.");
    }
  };

  return (
    <View className="gap-3">
      <Text
        accessibilityRole="header"
        className="text-heading font-semibold text-ink dark:text-paper"
      >
        O que preparar
      </Text>
      {query.isPending && <LoadindCircle label="Carregando requisitos…" />}
      {query.isError && (
        <View className="gap-2">
          <Text
            accessibilityRole="alert"
            className="text-body-copy text-body dark:text-soft"
          >
            {notFound
              ? "Este serviço não está mais disponível. Volte ao catálogo."
              : query.error.message}
          </Text>
          {!notFound && (
            <TouchableOpacity
              accessibilityRole="button"
              disabled={query.isFetching}
              onPress={() => {
                void query.refetch();
              }}
              className="min-h-12 justify-center"
            >
              {query.isFetching ? (
                <LoadindCircle label="Carregando…" />
              ) : (
                <Text className="text-label font-semibold text-brand dark:text-dark-brand">
                  Tentar carregar requisitos novamente
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
      {query.isSuccess && query.data.requirements.length === 0 && (
        <Text className="text-body-copy text-body dark:text-soft">
          Nenhum requisito cadastrado para este serviço.
        </Text>
      )}
      {query.isSuccess &&
        query.data.requirements.map((item) => {
          let sourceUrl: string | null = null;
          try {
            const url = new URL(item.sourceUrl ?? "");
            if (url.protocol === "https:" || url.protocol === "http:")
              sourceUrl = url.href;
          } catch {
            /* A fonte ausente ou inválida não impede a leitura do requisito. */
          }

          return (
            <View
              key={item.id}
              className="gap-1 py-4 border-b border-rule dark:border-dark-rule"
            >
              <Text className="text-body-copy text-ink dark:text-paper">
                {item.title}
              </Text>
              <Text className="text-label font-semibold text-brand dark:text-dark-brand">
                {item.required ? "Obrigatório" : "Opcional"}
              </Text>
              {sourceUrl ? (
                <TouchableOpacity
                  accessibilityRole="link"
                  accessibilityLabel={`Consultar fonte de ${item.title}`}
                  onPress={() => {
                    void openSource(sourceUrl);
                  }}
                  className="min-h-12 justify-center"
                >
                  <Text className="text-label text-brand dark:text-dark-brand underline">
                    Consultar fonte
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text className="text-caption text-body dark:text-soft">
                  Fonte indisponível.
                </Text>
              )}
            </View>
          );
        })}
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
