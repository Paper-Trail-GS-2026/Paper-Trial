import { LoadindCircle } from "../Components/LoadindCircle";
import { StatusBar } from "expo-status-bar";
import { Search, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Welcome } from "../Components/HomeScreenComponents/Welcome";
import { PreparationSummary } from "../Components/PreparationSummary";
import { ServiceRow } from "../Components/ServiceRow";
import { useServiceList } from "../Hooks/useServiceList";
import { useTheme } from "../Context/ThemeContext";
import { BottomNavigation } from "../Navigation/BottomNavigation";
import { HomeScreenProps } from "../Types/types";

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const { search, setSearch, services, servicesQuery } = useServiceList();
  const { colors, isDark } = useTheme();
  return <SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-ground dark:bg-navy-2">
    <StatusBar style={isDark ? "light" : "dark"} />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
          <Welcome onProfile={() => navigation.navigate("ProfileScreen")} />
          <View className="gap-2">
            <View className={`flex-row items-center rounded-xl border bg-paper dark:bg-navy ${searchFocused ? "border-brand dark:border-dark-brand" : "border-rule dark:border-dark-rule"}`}>
              <View className="pl-3.5">
                <Search size={18} color={colors.textMuted} />
              </View>
              <TextInput
                placeholder="Qual serviço você procura?"
                value={search}
                onChangeText={setSearch}
                returnKeyType="search"
                accessibilityLabel="Buscar serviço"
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.brand}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="min-h-12 flex-1 px-4 py-3.5 text-body-copy text-ink dark:text-paper" />
            </View>
          </View>
          <View className="gap-3">
            <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Seus preparativos</Text>
            <PreparationSummary onOpen={() => navigation.navigate("PreparationsScreen")} />
          </View>
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Serviços disponíveis</Text>
            </View>
            {servicesQuery.isPending && <LoadindCircle label="Carregando serviços…" />}
            {servicesQuery.isError && <View className="gap-2">
              <Text accessibilityRole="alert" className="text-body-copy text-body dark:text-soft">{servicesQuery.error.message}</Text>
              <TouchableOpacity accessibilityRole="button" disabled={servicesQuery.isFetching}
                onPress={() => { void servicesQuery.refetch(); }} className="min-h-12 justify-center">
                {servicesQuery.isFetching ? <LoadindCircle label="Carregando…" /> : <Text className="text-label font-semibold text-brand dark:text-dark-brand">Tentar carregar serviços novamente</Text>}
              </TouchableOpacity>
            </View>}
            {services.map(service => <ServiceRow
              key={service.id}
              service={service}
              onPress={() => navigation.navigate("ServiceDetailsScreen", { serviceId: service.id, source: "api" })} />)}
            {servicesQuery.isSuccess && !services.length && <Text className="text-body-copy font-normal text-body dark:text-soft">Nenhum serviço encontrado. Tente outro nome ou categoria.</Text>}
          </View>
          <View className={`flex-row gap-3 rounded-2xl p-5 ${isDark ? "bg-dark-soft" : "bg-soft"}`}>
            <Sparkles
              size={21}
              strokeWidth={1.7}
              color={colors.brand} />
            <View className="flex-1 gap-3">
              <Text className="text-label font-semibold text-ink dark:text-paper">Comece por aqui</Text>
              <Text className="text-body-copy font-normal text-body dark:text-soft">Encontre um serviço, confira os requisitos e organize tudo antes do atendimento.</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ServicesScreen")}
                activeOpacity={0.8}
                accessibilityRole="button"
                className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-navy-2 dark:bg-dark-brand">
                <Text className="text-label font-semibold text-paper dark:text-navy-2 text-center">Explorar serviços</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <BottomNavigation active="HomeScreen" />
  </SafeAreaView>;
}
