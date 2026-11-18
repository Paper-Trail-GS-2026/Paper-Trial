import { useEffect, useRef, useState } from "react";
import { Check, Square } from "lucide-react-native";
import { useChecklist } from "../../Hooks/useChecklist";
import { EditPreparationNameModal } from "../EditPreparationNameModal";
import { DeletePreparationModal } from "../DeletePreparationModal";
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
  const { isDark, colors } = useTheme();
  const checklist = useChecklist(route.params.preparationId);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState("");
  const actionLock = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  const busy = checklist.rename.isPending || checklist.remove.isPending || checklist.toggle.isPending;
  const runAction = async (action: () => Promise<unknown>, onSuccess?: () => void) => {
    if (actionLock.current) return;
    actionLock.current = true;
    setNotice("");
    try {
      await action();
      if (mounted.current) onSuccess?.();
    } catch {
      // A mutação mantém o erro para exibição junto à ação correspondente.
    } finally {
      actionLock.current = false;
    }
  };
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
              <View className="gap-3">
                <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Seu checklist</Text>
                {(checklist.items.isPending || checklist.progress.isPending) && <LoadindCircle label="Carregando checklist…" />}
                {(checklist.items.isError || checklist.progress.isError) && <Text accessibilityRole="alert" className="text-body-copy text-danger dark:text-dark-danger">
                  {checklist.items.error?.message || checklist.progress.error?.message}
                </Text>}
                {checklist.progress.isSuccess && <View className="gap-2">
                  <Text accessibilityLiveRegion="polite" className="text-body-copy text-ink dark:text-paper">
                    {checklist.progress.data.completionPercent.toLocaleString("pt-BR")}% dos itens obrigatórios concluídos
                  </Text>
                  <View accessibilityRole="progressbar" accessibilityLabel="Progresso dos itens obrigatórios"
                    accessibilityValue={{ min: 0, max: 100, now: checklist.progress.data.completionPercent }}
                    className="h-2 overflow-hidden rounded-full bg-soft dark:bg-dark-soft">
                    <View className="h-full bg-brand dark:bg-dark-brand" style={{ width: `${checklist.progress.data.completionPercent}%` }} />
                  </View>
                  <Text className="text-caption text-body dark:text-soft">{checklist.progress.data.pendingRequiredItems} obrigatórios pendentes · {checklist.progress.data.totalItems} itens no total</Text>
                  {checklist.progress.data.ready && <Text accessibilityLiveRegion="polite" className="text-body-copy text-brand dark:text-dark-brand">Todos os itens obrigatórios foram marcados. Confira as orientações oficiais antes do atendimento.</Text>}
                  {checklist.progress.data.sourceOutdated && <Text className="text-body-copy text-body dark:text-soft">As orientações do serviço foram atualizadas. Consulte o serviço atual; seu checklist foi preservado.</Text>}
                </View>}
                {checklist.items.isSuccess && !checklist.items.data.length && <Text className="text-body-copy text-body dark:text-soft">Este preparativo ainda não possui itens.</Text>}
                {checklist.items.isSuccess && checklist.items.data.map(item => <TouchableOpacity
                  key={item.id} accessibilityRole="checkbox" accessibilityLabel={`${item.title}, ${item.required ? "obrigatório" : "opcional"}`}
                  accessibilityState={{ checked: item.completed, disabled: busy, busy: checklist.toggle.isPending && checklist.toggle.variables?.itemId === item.id }}
                  disabled={busy} onPress={() => { void runAction(() => checklist.toggle.mutateAsync({ itemId: item.id, completed: !item.completed })); }}
                  className="min-h-14 flex-row items-center gap-3 border-b border-rule dark:border-dark-rule py-3">
                  {item.completed ? <Check size={24} color={colors.brand} /> : <Square size={24} color={colors.textSecondary} />}
                  <View className="flex-1 gap-1">
                    <Text className="text-body-copy text-ink dark:text-paper">{item.title}</Text>
                    <Text className="text-caption text-body dark:text-soft">{item.required ? "Obrigatório" : "Opcional"} · {item.completed ? "Concluído" : "Pendente"}</Text>
                  </View>
                </TouchableOpacity>)}
                {checklist.toggle.isPending && <LoadindCircle label="Salvando marcação…" />}
                {checklist.toggle.isError && <Text accessibilityRole="alert" className="text-body-copy text-danger dark:text-dark-danger">{checklist.toggle.error.message}</Text>}
                <TouchableOpacity accessibilityRole="button" disabled={busy || checklist.items.isFetching || checklist.progress.isFetching}
                  onPress={() => { void checklist.items.refetch(); void checklist.progress.refetch(); }} className="min-h-12 justify-center">
                  <Text className="text-label font-semibold text-brand dark:text-dark-brand">{checklist.items.isFetching || checklist.progress.isFetching ? "Atualizando checklist…" : "Atualizar checklist"}</Text>
                </TouchableOpacity>
              </View>
              {!!notice && <Text accessibilityLiveRegion="polite" className="text-body-copy text-brand dark:text-dark-brand">{notice}</Text>}
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
              <TouchableOpacity accessibilityRole="button" disabled={busy} onPress={() => { checklist.rename.reset(); setEditing(true); }} className="min-h-14 justify-center rounded-xl px-5 py-3.5 bg-soft dark:bg-dark-soft">
                <Text className="text-label font-semibold text-brand dark:text-dark-brand text-center">Editar nome do preparativo</Text>
              </TouchableOpacity>
              <TouchableOpacity accessibilityRole="button" disabled={busy} onPress={() => { checklist.remove.reset(); setDeleting(true); }} className="min-h-14 justify-center rounded-xl px-5 py-3.5 bg-danger-surface dark:bg-dark-danger-surface">
                <Text className="text-label font-semibold text-danger dark:text-dark-danger text-center">Excluir preparativo</Text>
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
      {editing && preparation && <EditPreparationNameModal title={preparation.title}
        busy={checklist.rename.isPending} error={checklist.rename.error?.message}
        onCancel={() => setEditing(false)}
        onConfirm={title => { void runAction(() => checklist.rename.mutateAsync(title), () => { setEditing(false); setNotice("Nome atualizado."); }); }} />}
      {deleting && <DeletePreparationModal busy={checklist.remove.isPending} error={checklist.remove.error?.message}
        onCancel={() => setDeleting(false)}
        onConfirm={() => { void runAction(() => checklist.remove.mutateAsync(), () => {
          setDeleting(false);
          navigation.reset({ index: 1, routes: [{ name: "HomeScreen" }, { name: "PreparationsScreen" }] });
        }); }} />}
    </SafeAreaView>
  );
}
