import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ServiceRow } from "../Components/ServiceRow";
import { CategoryFilter } from "../Components/ServicesScreenComponents/CategoryFilter";
import { useServiceList } from "../Hooks/useServiceList";
import { useTheme } from "../Context/ThemeContext";
import { BottomNavigation } from "../Navigation/BottomNavigation";
import { ServicesScreenProps } from "../Types/types";

export function ServicesScreen({ navigation }: ServicesScreenProps) {
  const { isDark, colors } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);
  const { search, setSearch, category, setCategory, services, clearFilters } = useServiceList();
  return (<SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-ground dark:bg-navy-2">
    <StatusBar style={isDark ? "light" : "dark"} />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
          <View className="gap-2">
            <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper">Explorar serviços</Text>
            <Text className="text-body-copy font-normal text-body dark:text-soft">Encontre serviços de São Paulo e organize seu próximo passo.</Text>
          </View>
          <View className="gap-2">
            <Text className="text-label font-semibold text-ink dark:text-paper">Buscar serviço</Text>
            <View className={`flex-row items-center rounded-xl border bg-paper dark:bg-navy ${searchFocused ? "border-brand dark:border-dark-brand" : "border-rule dark:border-dark-rule"}`}>
              <TextInput
                placeholder="Ex.: transporte, estacionamento"
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
          <CategoryFilter selected={category} onSelect={setCategory} />
          <View className="gap-3">
            <Text accessibilityLiveRegion="polite" className="text-caption font-normal text-body dark:text-soft">{services.length} {services.length === 1 ? "serviço encontrado" : "serviços encontrados"}</Text>
            {services.map(service => <ServiceRow
              key={service.id}
              service={service}
              onPress={() => navigation.navigate("ServiceDetailsScreen", {
                serviceId: service.id
              })} />)}
            {!services.length && <View className="gap-4 py-7">
              <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Nenhum serviço por aqui.</Text>
              <Text className="text-body-copy font-normal text-body dark:text-soft">Tente outra palavra ou veja todas as categorias.</Text>
              <TouchableOpacity
                onPress={clearFilters}
                activeOpacity={0.8}
                accessibilityRole="button"
                className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-soft dark:bg-dark-soft">
                <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">Limpar busca e filtros</Text>
              </TouchableOpacity>
            </View>}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <BottomNavigation active="ServicesScreen" />
  </SafeAreaView>);
}
