import { ArrowRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { usePreparations } from "../Context/PreparationsContext";
import type { PreparationSummaryProps } from "../Types/types";
import { preparationProgress } from "../Utils/preparationProgress";

function usePreparationSummary() {
  const { preparations } = usePreparations();
  const progress = preparations.map(preparationProgress);
  const ready = progress.filter((preparation) => preparation.ready).length;
  const total = progress.reduce((sum, preparation) => sum + preparation.total, 0);
  const pending = progress.reduce((sum, preparation) => sum + preparation.pending, 0);
  const percent = total ? Math.round(((total - pending) / total) * 100) : 0;
  return { total, pending, percent, inProgress: preparations.length - ready };
}
const { paperTrailNeutralColors } = require("../../tailwind.config");

export function PreparationSummary({ onOpen }: PreparationSummaryProps) {
  const { inProgress, total, pending, percent } = usePreparationSummary();
  return (<View className="overflow-hidden rounded-2xl bg-navy-2 gap-5 p-5">
    <View className="flex-row gap-4">
      <View className="flex-1 gap-1">
        <Text className="text-3xl font-semibold text-paper">
          {inProgress}
        </Text>
        <Text className="text-caption text-soft-line">em andamento</Text>
      </View>
      <View className="flex-1 gap-1">
        <Text className="text-3xl font-semibold text-paper">
          {pending}
        </Text>
        <Text className="text-caption text-soft-line">itens pendentes</Text>
      </View>
    </View>
    {total > 0 && (<View
      className="gap-2"
      accessibilityRole="progressbar"
      accessibilityLabel="Progresso geral"
      accessibilityValue={{ min: 0, max: 100, now: percent }}>
      <View className="flex-row justify-between">
        <Text className="text-caption text-soft-line">Progresso geral</Text>
        <Text className="text-caption text-soft-line">{percent}%</Text>
      </View>
      <View className="h-1.5 rounded-full bg-navy overflow-hidden">
        <View className="h-full rounded-full bg-paper" style={{ width: `${percent}%` }} />
      </View>
    </View>)}
    {onOpen && (<Pressable
      onPress={onOpen}
      accessibilityRole="button"
      className="self-start min-h-12 flex-row items-center gap-2 rounded-xl bg-navy px-4 active:opacity-70">
      <Text className="text-label font-medium text-paper">
        Ver preparativos
      </Text>
      <ArrowRight size={17} color={paperTrailNeutralColors.paper} />
    </Pressable>)}
  </View>);
}
