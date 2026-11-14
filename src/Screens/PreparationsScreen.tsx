import { BottomNavigation } from "../Navigation/BottomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PreparationSummary } from "../Components/PreparationSummary";
import { Progress } from "../Components/ProgressBar";
import { usePreparations } from "../Context/PreparationsContext";
import { useTheme } from "../Context/ThemeContext";
import type { PreparationCardProps, StatusFilterProps } from "../Types/types";
import { PreparationFilter, PreparationsScreenProps } from "../Types/types";
import { preparationProgress } from "../Utils/preparationProgress";

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

function PreparationCard({ preparation, onPress }: PreparationCardProps) {
  const { colors } = useTheme();
  const { total, ready, pending } = preparationProgress(preparation);
  return <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={`Abrir preparativo: ${preparation.title}`}
    className="active:opacity-70">
    <View className="gap-3 rounded-2xl border bg-paper dark:bg-navy border-rule dark:border-dark-rule p-4">
      <Text className="text-label font-semibold text-ink dark:text-paper">{preparation.title}</Text>
      <View className="flex-row flex-wrap items-center justify-between gap-2">
        <Text className="text-caption font-normal text-body dark:text-soft">Criado em {preparation.created}</Text>
        <View className={`rounded-lg px-2 py-1 ${total === 0 ? "bg-soft" : ready ? "bg-status-ready-bg" : "bg-status-pending-bg"}`}>
          <Text className={`text-caption font-normal text-ink dark:text-paper ${total === 0 ? "text-body" : ready ? "text-status-ready" : "text-status-pending"}`}>{total === 0 ? "Vazio" : ready ? "Pronto para revisar" : "Em andamento"}</Text>
        </View>
      </View>
      <Progress completed={preparation.completed.length} total={total} />
      <View className="flex-row items-center justify-between gap-2">
        <Text className="text-caption font-normal text-body dark:text-soft">{pending} {pending === 1 ? "item pendente" : "itens pendentes"}</Text>
        <View className="flex-row items-center">
          <Text className="text-caption font-normal text-brand dark:text-dark-brand">Abrir</Text>
          <ChevronRight size={16} color={colors.brand} />
        </View>
      </View>
    </View>
  </Pressable>;
}

function StatusFilter({ value, onChange }: StatusFilterProps) {
  const { isDark } = useTheme();
  return (<ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      gap: 8
    }}>
    {(["Todos", "Em andamento", "Prontos"] as const).map(status => <Pressable
      key={status}
      onPress={() => onChange(status)}
      accessibilityRole="button"
      accessibilityState={{
        selected: value === status
      }}
      className={`min-h-12 px-4 justify-center rounded-3xl ${value === status ? isDark ? "bg-dark-brand" : "bg-brand" : isDark ? "bg-dark-soft" : "bg-soft"}`}>
      <Text className={`text-label font-semibold ${value === status ? "text-paper dark:text-navy-2" : "text-brand dark:text-dark-brand"}`}>{status}</Text>
    </Pressable>)}
  </ScrollView>);
}
