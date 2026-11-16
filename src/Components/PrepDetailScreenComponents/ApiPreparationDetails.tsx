import { LoadindCircle } from "../LoadindCircle";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../Header";
import { useTheme } from "../../Context/ThemeContext";
import { usePreparationQuery } from "../../Hooks/usePreparations";
import type { PreparationDetailsScreenProps } from "../../Types/types";

export function ApiPreparationDetails({
  route,
  navigation,
}: PreparationDetailsScreenProps) {
  const { isDark } = useTheme();
  const query = usePreparationQuery(route.params.preparationId);
  const preparation = query.data;
  const notFound =
    axios.isAxiosError(query.error) && query.error.response?.status === 404;

  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      className="flex-1 bg-ground dark:bg-navy-2"
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <Header title="Meu preparativo" back />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
          {query.isPending && <LoadindCircle label="Carregando preparativo…" />}
          {query.isError && (
            <View className="gap-2">
              <Text
                accessibilityRole="alert"
                className="text-body-copy text-body dark:text-soft"
              >
                {notFound
                  ? "Este preparativo não está disponível para sua conta."
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
          {query.isSuccess && preparation && (
            <>
              <Text
                accessibilityRole="header"
                className="text-title font-semibold text-ink dark:text-paper"
              >
                {preparation.title}
              </Text>
              <Text className="text-caption text-body dark:text-soft">
                Criado em{" "}
                {new Date(preparation.createdAt).toLocaleDateString("pt-BR")}
              </Text>
              <Text className="text-body-copy text-body dark:text-soft">
                O checklist deste preparativo ainda não está disponível.
              </Text>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() =>
                  navigation.navigate("ServiceDetailsScreen", {
                    serviceId: String(preparation.serviceId),
                    source: "api",
                  })
                }
                className="min-h-14 justify-center rounded-xl px-5 py-3.5 bg-soft dark:bg-dark-soft"
              >
                <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">
                  Consultar serviço atual
                </Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => navigation.navigate("PreparationsScreen")}
            className="min-h-12 justify-center"
          >
            <Text className="text-label font-semibold text-brand dark:text-dark-brand">
              Ver meus preparativos
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
