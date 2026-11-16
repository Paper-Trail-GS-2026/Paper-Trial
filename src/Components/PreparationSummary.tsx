import { LoadindCircle } from "./LoadindCircle";
import { Pressable, Text, View } from "react-native";
import { usePreparationsQuery } from "../Hooks/usePreparations";
import type { PreparationSummaryProps } from "../Types/types";

export function PreparationSummary({ onOpen }: PreparationSummaryProps) {
  const query = usePreparationsQuery();
  return (
    <View className="rounded-2xl bg-navy-2 gap-3 p-5">
      {query.isPending && (
        <LoadindCircle label="Carregando preparativos…" tone="inverse" />
      )}
      {query.isError && (
        <>
          <Text accessibilityRole="alert" className="text-body-copy text-paper">
            {query.error.message}
          </Text>
          <Pressable
            accessibilityRole="button"
            disabled={query.isFetching}
            onPress={() => {
              void query.refetch();
            }}
            className="min-h-12 justify-center"
          >
            {query.isFetching ? (
              <LoadindCircle label="Carregando…" tone="inverse" />
            ) : (
              <Text className="text-label text-paper">Tentar novamente</Text>
            )}
          </Pressable>
        </>
      )}
      {query.isSuccess && (
        <>
          <Text className="text-3xl font-semibold text-paper">
            {query.data.length}
          </Text>
          <Text className="text-caption text-soft-line">
            {query.data.length === 1
              ? "preparativo salvo"
              : "preparativos salvos"}
          </Text>
        </>
      )}
      {onOpen && (
        <Pressable
          accessibilityRole="button"
          onPress={onOpen}
          className="min-h-12 justify-center rounded-xl bg-navy px-4"
        >
          <Text className="text-label font-medium text-paper">
            Ver preparativos
          </Text>
        </Pressable>
      )}
    </View>
  );
}
