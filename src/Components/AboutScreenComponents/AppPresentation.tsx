import { Text, View } from "react-native";
import { appInfo } from "../../Data/AppInfo";
import { Brand } from "../Brand";

export function AppPresentation() {
  return (
    <View className="items-center rounded-2xl border border-rule bg-paper p-6 dark:border-dark-rule dark:bg-navy">
      <Brand />
      <Text accessibilityRole="header" className="mt-4 text-xl font-semibold text-ink dark:text-paper">{appInfo.name}</Text>
      <Text className="mt-1 text-center text-sm leading-5 text-body dark:text-soft">Menos dúvidas. Mais preparação.</Text>
      <Text className="mt-4 text-center text-body-copy text-body dark:text-soft">{appInfo.purpose}</Text>
      <View className="mt-4 rounded-lg bg-soft px-3 py-2 dark:bg-dark-soft">
        <Text selectable className="text-xs font-medium text-brand dark:text-dark-brand">Versão {appInfo.version}</Text>
      </View>
    </View>
  );
}
