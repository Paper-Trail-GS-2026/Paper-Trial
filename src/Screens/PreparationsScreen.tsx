import { LoadindCircle } from "../Components/LoadindCircle";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePreparationsQuery } from "../Hooks/usePreparations";
import { useTheme } from "../Context/ThemeContext";
import { BottomNavigation } from "../Navigation/BottomNavigation";
import { PreparationsScreenProps } from "../Types/types";

export function PreparationsScreen({ navigation }: PreparationsScreenProps) {
  const { isDark } = useTheme();
  const query = usePreparationsQuery();
  return (<SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-ground dark:bg-navy-2">
    <StatusBar style={isDark ? "light" : "dark"} />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
          <View className="gap-2">
            <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper">Meus preparativos</Text>
            <Text className="text-body-copy font-normal text-body dark:text-soft">Consulte os preparativos salvos na sua conta.</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ServicesScreen")}
            activeOpacity={0.8}
            accessibilityRole="button"
            className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-navy-2 dark:bg-dark-brand">
            <Text className="text-label font-semibold text-paper dark:text-navy-2 text-center">Preparar outro serviço</Text>
          </TouchableOpacity>
          <View className="gap-4">
            {query.isPending && <LoadindCircle label="Carregando preparativos…" />}
            {query.isError && <Text accessibilityRole="alert" className="text-body-copy text-body dark:text-soft">{query.error.message}</Text>}
            <TouchableOpacity accessibilityRole="button" disabled={query.isFetching}
              onPress={() => { void query.refetch(); }} className="min-h-12 justify-center">
              {query.isFetching ? <LoadindCircle label="Carregando…" /> : <Text className="text-label font-semibold text-brand dark:text-dark-brand">{query.isError ? "Tentar novamente" : "Atualizar preparativos"}</Text>}
            </TouchableOpacity>
            {query.data?.map(preparation => <View key={preparation.id} className="gap-2 rounded-xl border border-rule dark:border-dark-rule bg-paper dark:bg-navy p-4">
              <Text className="text-heading font-semibold text-ink dark:text-paper">{preparation.title}</Text>
              <Text className="text-caption text-body dark:text-soft">Criado em {new Date(preparation.createdAt).toLocaleDateString("pt-BR")}</Text>
              <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate("PreparationDetailsScreen", {
                preparationId: String(preparation.id), source: "api"
              })} className="min-h-12 justify-center">
                <Text className="text-label font-semibold text-brand dark:text-dark-brand">Abrir preparativo</Text>
              </TouchableOpacity>
            </View>)}
            {query.isSuccess && !query.data.length && <Text className="text-body-copy text-body dark:text-soft">Você ainda não tem preparativos salvos.</Text>}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <BottomNavigation active="PreparationsScreen" />
  </SafeAreaView>);
}
