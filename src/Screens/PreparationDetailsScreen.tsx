import { ApiPreparationDetails } from "../Components/PrepDetailScreenComponents/ApiPreparationDetails";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DeletePreparationModal } from "../Components/DeletePreparationModal";
import { EditPreparationNameModal } from "../Components/EditPreparationNameModal";
import { Header } from "../Components/Header";
import { Checklist } from "../Components/PrepDetailScreenComponents/Checklist";
import { Progress } from "../Components/ProgressBar";
import { demoServices } from "../Data/ServicesData";
import { usePreparations } from "../Context/PreparationsContext";
import { useTheme } from "../Context/ThemeContext";
import { PreparationDetailsScreenProps } from "../Types/types";
import { preparationProgress } from "../Utils/preparationProgress";

export function PreparationDetailsScreen({ route, navigation }: PreparationDetailsScreenProps) {
  const { isDark } = useTheme();
  const { preparations, toggle, rename, remove } = usePreparations();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const preparation = preparations.find(p => p.id === route.params.preparationId);
  const service = demoServices.find(s => s.id === preparation?.serviceId);

  if (route.params.source === "api") return <ApiPreparationDetails route={route} navigation={navigation} />;

  if(!preparation || !service)
    return (<SafeAreaView edges={["top", "left", "right", "bottom"]} className="flex-1 bg-ground dark:bg-navy-2">
      <StatusBar style={isDark ? "light" : "dark"} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <Header title="Preparativo" back />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
            <Text className="text-body-copy font-normal text-ink dark:text-paper">Este preparativo não está mais disponível.</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("PreparationsScreen")}
              activeOpacity={0.8}
              accessibilityRole="button"
              className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-navy-2 dark:bg-dark-brand">
              <Text className="text-label font-semibold text-paper dark:text-navy-2 text-center">Ver meus preparativos</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>);

  const { ready } = preparationProgress(preparation);

  return (<SafeAreaView edges={["top", "left", "right", "bottom"]} className="flex-1 bg-ground dark:bg-navy-2">
    <StatusBar style={isDark ? "light" : "dark"} />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <Header title="Meu preparativo" back />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full self-center gap-6 pt-7 pb-8 max-w-3xl px-5">
          <View className="gap-3">
            <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper">{preparation.title}</Text>
            <Text className="text-caption font-normal text-body dark:text-soft">Criado em {preparation.created}</Text>
            <Text className="text-body-copy font-normal text-body dark:text-soft">Marque os itens que você já organizou.</Text>
          </View>
          <Progress completed={preparation.completed.length} total={service.requirements.length} />
          {ready && <Text accessibilityLiveRegion="polite" className="text-label text-brand dark:text-dark-brand">Todos os itens obrigatórios foram marcados.</Text>}
          <Checklist
            items={service.requirements}
            completed={preparation.completed}
            onToggle={index => toggle(preparation.id, index)} />
          <Text accessibilityLiveRegion="polite" className="text-caption font-normal text-body dark:text-soft">{preparation.updated}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ServiceDetailsScreen", {
              serviceId: service.id, source: "demo"
            })}
            activeOpacity={0.8}
            accessibilityRole="button"
            className="min-h-14 flex-row items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 bg-transparent">
            <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">Consultar detalhes do serviço</Text>
          </TouchableOpacity>
          <View className="gap-2">
            <TouchableOpacity onPress={() => setEditing(true)} activeOpacity={0.8} accessibilityRole="button"
              className="min-h-14 items-center justify-center rounded-xl px-5 py-3.5 bg-soft dark:bg-dark-soft">
              <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">Editar nome do preparativo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeleting(true)} activeOpacity={0.8} accessibilityRole="button"
              className="min-h-14 items-center justify-center rounded-xl px-5 py-3.5">
              <Text className="text-label font-semibold text-danger dark:text-dark-danger text-center">Excluir preparativo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    {editing && <EditPreparationNameModal
      key={preparation.id}
      title={preparation.title}
      onCancel={() => setEditing(false)}
      onConfirm={title => {
        rename(preparation.id, title);
        setEditing(false);
      }} />}
    {deleting && <DeletePreparationModal
      onCancel={() => setDeleting(false)}
      onConfirm={() => {
        setDeleting(false);
        remove(preparation.id);
        navigation.reset({
          index: 1,
          routes: [{ name: "HomeScreen" }, { name: "PreparationsScreen" }],
        });
      }} />}
  </SafeAreaView>);
}
