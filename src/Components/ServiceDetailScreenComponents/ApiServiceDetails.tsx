import { LoadindCircle } from "../LoadindCircle";
import { CreatePreparation } from "./CreatePreparation";
import { ApiGuidance } from "./ApiGuidance";
import { ApiRequirements } from "./ApiRequirements";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../Header";
import { useTheme } from "../../Context/ThemeContext";
import { useService } from "../../Hooks/useServices";
import { useCategories } from "../../Hooks/useCategories";
import type { ApiServiceDetailsProps } from "../../Types/types";

export function ApiServiceDetails({ serviceId }: ApiServiceDetailsProps) {
  const { isDark } = useTheme();
  const query = useService(serviceId);
  const categoriesQuery = useCategories();
  const service = query.data;
  const notFound =
    axios.isAxiosError(query.error) && query.error.response?.status === 404;
  const category = categoriesQuery.data?.find(
    (item) => item.id === service?.categoryId,
  )?.name;

  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      className="flex-1 bg-ground dark:bg-navy-2"
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <Header title="Detalhes do serviço" back />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
          {query.isPending && <LoadindCircle label="Carregando serviço…" />}
          {query.isError && (
            <View className="gap-2">
              <Text
                accessibilityRole="alert"
                className="text-body-copy text-body dark:text-soft"
              >
                {notFound
                  ? "Serviço não encontrado. Volte ao catálogo."
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
                      Tentar novamente
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}
          {service && !notFound && (
            <>
              <Text
                accessibilityRole="header"
                className="text-title font-semibold tracking-tight text-ink dark:text-paper"
              >
                {service.title}
              </Text>
              <Text className="text-body-copy text-body dark:text-soft">
                {service.description}
              </Text>
              <Text className="text-caption text-body dark:text-soft">
                {category ?? "Categoria indisponível"} · {service.cityName}
              </Text>
              {categoriesQuery.isError && (
                <TouchableOpacity
                  accessibilityRole="button"
                  disabled={categoriesQuery.isFetching}
                  onPress={() => {
                    void categoriesQuery.refetch();
                  }}
                  className="min-h-12 justify-center"
                >
                  {categoriesQuery.isFetching ? (
                    <LoadindCircle label="Carregando categoria…" />
                  ) : (
                    <Text className="text-label font-semibold text-brand dark:text-dark-brand">
                      Tentar carregar categoria novamente
                    </Text>
                  )}
                </TouchableOpacity>
              )}
              <ApiRequirements key={serviceId} serviceId={serviceId} />
              <ApiGuidance
                key={`guidance:${serviceId}`}
                serviceId={serviceId}
              />
              <CreatePreparation
                key={`create:${serviceId}`}
                serviceId={service.id}
                title={service.title}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
