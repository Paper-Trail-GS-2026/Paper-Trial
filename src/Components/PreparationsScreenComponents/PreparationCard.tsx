import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import type { PreparationCardProps } from "../../Types/types";
import { preparationProgress } from "../../Utils/preparationProgress";
import { Progress } from "../ProgressBar";

export function PreparationCard({ preparation, onPress }: PreparationCardProps) {
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
