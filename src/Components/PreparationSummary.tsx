import { LoadindCircle } from "./LoadindCircle";
import { Pressable, Text, View } from "react-native";
import { usePreparationsQuery } from "../Hooks/usePreparations";
import type { PreparationSummaryProps } from "../Types/types";

export function PreparationSummary({ onOpen }: PreparationSummaryProps) {
  const query = usePreparationsQuery();
  return (
    <View className="rounded-2xl border border-rule dark:border-dark-rule bg-paper dark:bg-navy gap-3 p-5">
      {query.isPending && (
        <LoadindCircle label="Carregando preparativos…" />
      )}
      {query.isError && (
        <>
          <Text accessibilityRole="alert" className="text-body-copy text-body dark:text-soft">
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
              <LoadindCircle label="Carregando…" />
            ) : (
              <Text className="text-label text-brand dark:text-dark-brand">Tentar novamente</Text>
            )}
          </Pressable>
        </>
      )}
      {query.isSuccess && (
        <>
          <Text className="text-3xl font-semibold text-ink dark:text-paper">
            {query.data.length}
          </Text>
          <Text className="text-caption text-body dark:text-soft-line">
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
          className="min-h-12 justify-center rounded-xl bg-soft dark:bg-dark-soft px-4"
        >
          <Text className="text-label font-medium text-brand dark:text-dark-brand">
            Ver preparativos
          </Text>
        </Pressable>
      )}
    </View>
  );
}
