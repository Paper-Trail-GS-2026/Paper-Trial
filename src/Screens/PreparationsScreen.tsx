import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PreparationCard } from "../Components/PreparationsScreenComponents/PreparationCard";
import { StatusFilter } from "../Components/PreparationsScreenComponents/StatusFilter";
import { PreparationSummary } from "../Components/PreparationSummary";
import { useState } from "react";
import { usePreparations } from "../Context/PreparationsContext";
import { PreparationFilter } from "../Types/types";
import { preparationProgress } from "../Utils/preparationProgress";
import { useTheme } from "../Context/ThemeContext";
import { BottomNavigation } from "../Navigation/BottomNavigation";
import { PreparationsScreenProps } from "../Types/types";

export function PreparationsScreen({ navigation }: PreparationsScreenProps) {
  const { isDark } = useTheme();
  const { filter, setFilter, filteredPreparations } = usePreparationList();
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
            <Text className="text-body-copy font-normal text-body dark:text-soft">Um passo de cada vez. Acompanhe o que já organizou e o que ainda falta.</Text>
          </View>
          <PreparationSummary />
          <TouchableOpacity
            onPress={() => navigation.navigate("ServicesScreen")}
            activeOpacity={0.8}
            accessibilityRole="button"
            className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-navy-2 dark:bg-dark-brand">
            <Text className="text-label font-semibold text-paper dark:text-navy-2 text-center">Preparar outro serviço</Text>
          </TouchableOpacity>
          <StatusFilter value={filter} onChange={setFilter} />
          <View className="gap-4">
            {filteredPreparations.map(preparation => <PreparationCard
              key={preparation.id}
              preparation={preparation}
              onPress={() => navigation.navigate("PreparationDetailsScreen", {
                preparationId: preparation.id
              })} />)}
            {!filteredPreparations.length && <View className="gap-2.5 py-5">
              <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">{filter !== "Todos" ? "Nenhum preparativo neste filtro." : "Seu próximo passo começa aqui."}</Text>
              <Text className="text-body-copy font-normal text-body dark:text-soft">{filter !== "Todos" ? "Escolha outro filtro para ver suas listas." : "Escolha um serviço para montar sua primeira lista."}</Text>
            </View>}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <BottomNavigation active="PreparationsScreen" />
  </SafeAreaView>);
}

function usePreparationList() {
  const { preparations } = usePreparations();
  const [filter, setFilter] = useState<PreparationFilter>("Todos");
  const filteredPreparations = preparations.filter((preparation) => {
    if (filter === "Todos") return true;
    const { ready } = preparationProgress(preparation);
    return filter === "Prontos" ? ready : !ready;
  });
  return { filter, setFilter, filteredPreparations };
}
