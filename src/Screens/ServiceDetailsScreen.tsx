import { ApiServiceDetails } from "../Components/ServiceDetailScreenComponents/ApiServiceDetails";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../Components/Header";
import { Guidance } from "../Components/ServiceDetailScreenComponents/Guidance";
import { Requirements } from "../Components/ServiceDetailScreenComponents/Requirements";
import { demoServices } from "../Data/ServicesData";
import { usePreparations } from "../Context/PreparationsContext";
import { useTheme } from "../Context/ThemeContext";
import { ServiceDetailsScreenProps } from "../Types/types";

export function ServiceDetailsScreen({ route, navigation }: ServiceDetailsScreenProps) {
  const { isDark } = useTheme();
  const service = demoServices.find(s => s.id === route.params.serviceId);
  const { create, preparations } = usePreparations();
  if (route.params.source === "api") return <ApiServiceDetails serviceId={route.params.serviceId} />;
  if(!service)
    return (<SafeAreaView edges={["top", "left", "right", "bottom"]} className="flex-1 bg-ground dark:bg-navy-2">
      <StatusBar style={isDark ? "light" : "dark"} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <Header title="Serviço" back />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
            <Text className="text-body-copy font-normal text-ink dark:text-paper">Serviço não encontrado. Volte ao catálogo.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>);
  const exists = preparations.some(p => p.serviceId === service.id);
  return (<SafeAreaView edges={["top", "left", "right", "bottom"]} className="flex-1 bg-ground dark:bg-navy-2">
    <StatusBar style={isDark ? "light" : "dark"} />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <Header title="Detalhes do serviço" back />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
          <View className="gap-3">
            <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper">{service.name}</Text>
            <Text className="text-body-copy font-normal text-body dark:text-soft">{service.description}</Text>
            <Text className="text-caption font-normal text-body dark:text-soft">{service.category} · São Paulo</Text>
          </View>
          <Requirements items={service.requirements} />
          <Guidance />
        </View>
      </ScrollView>
      <View className="border-t p-4 bg-paper dark:bg-navy border-rule dark:border-dark-rule">
        <View className="w-full max-w-2xl self-center gap-2">
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparationDetailsScreen", {
              preparationId: create(service.id), source: "demo"
            })}
            activeOpacity={0.8}
            accessibilityRole="button"
            className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-navy-2 dark:bg-dark-brand">
            <Text className="text-label font-semibold text-paper dark:text-navy-2 text-center">{exists ? "Abrir meu preparativo" : "Criar preparativo"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>);
}
