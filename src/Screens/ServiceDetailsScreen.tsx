import { Header } from "../Components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FileText } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { usePreparations } from "../Context/PreparationsContext";
import { useTheme } from "../Context/ThemeContext";
import { demoServices } from "../Data/ServicesData";
import type { RequirementsProps } from "../Types/types";
import { ServiceDetailsScreenProps } from "../Types/types";

export function ServiceDetailsScreen({ route, navigation }: ServiceDetailsScreenProps) {
  const { isDark } = useTheme();
  const service = demoServices.find(s => s.id === route.params.serviceId);
  const { create, preparations } = usePreparations();
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
              preparationId: create(service.id)
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

function Requirements({ items }: RequirementsProps) {
  const { colors, isDark } = useTheme();
  return (<View className="gap-1">
    <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper mb-2">O que preparar</Text>
    {items.map(item => <View key={item.name} className={`flex-row gap-3 py-4 border-b ${isDark ? "border-dark-rule" : "border-rule"}`}>
      <FileText size={21} color={colors.brand} />
      <View className="flex-1 gap-1">
        <Text className="text-body-copy font-normal text-ink dark:text-paper">{item.name}</Text>
        <Text className="text-caption font-normal text-body dark:text-soft">{item.description}</Text>
        <Text className="text-label font-semibold text-brand dark:text-dark-brand">{item.required ? "Obrigatório" : "Opcional"}</Text>
      </View>
    </View>)}
  </View>);
}

function Guidance() {
  const [open, setOpen] = useState(false);
  return (<View className="gap-3 rounded-2xl border p-5 bg-paper dark:bg-navy border-rule dark:border-dark-rule">
    <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Ficou alguma dúvida?</Text>
    <Text className="text-body-copy font-normal text-body dark:text-soft">Veja como organizar sua lista.</Text>
    <TouchableOpacity
      onPress={() => setOpen(!open)}
      activeOpacity={0.8}
      accessibilityRole="button"
      className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-soft dark:bg-dark-soft">
      <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">{open ? "Ocultar explicação" : "Ver explicação"}</Text>
    </TouchableOpacity>
    {open && <View accessibilityLiveRegion="polite" className="gap-3">
      <Text className="text-body-copy font-normal text-ink dark:text-paper">Marque cada item quando estiver preparado. Você pode desmarcá-lo a qualquer momento.</Text>
    </View>}
  </View>);
}
