import { Text, View } from "react-native";
import { appInfo } from "../../Data/AppInfo";

export function ProjectInfo() {
  return (
    <View className="gap-3">
      <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Projeto</Text>
      <View className="rounded-2xl border border-rule bg-paper dark:border-dark-rule dark:bg-navy">
        <View className="flex-row flex-wrap justify-between gap-3 p-4">
          <Text className="text-sm text-body dark:text-soft">Instituição</Text>
          <Text className="text-sm font-medium text-ink dark:text-paper">{appInfo.institution}</Text>
        </View>
        <View className="flex-row flex-wrap justify-between gap-3 border-t border-rule p-4 dark:border-dark-rule">
          <Text className="text-sm text-body dark:text-soft">Edição</Text>
          <Text className="text-sm font-medium text-ink dark:text-paper">{appInfo.edition}</Text>
        </View>
        <View className="flex-row flex-wrap items-center justify-between gap-3 border-t border-rule p-4 dark:border-dark-rule">
          <Text className="text-sm text-body dark:text-soft">Commit</Text>
          <Text selectable className="text-sm font-medium text-ink dark:text-paper">{appInfo.commitHash?.slice(0, 7) ?? "Não disponível"}</Text>
        </View>
      </View>
    </View>
  );
}
