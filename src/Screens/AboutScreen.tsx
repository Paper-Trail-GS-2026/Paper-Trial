import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../Context/ThemeContext";
import { Brand } from "../Components/Brand";
import { appInfo } from "../Data/AppInfo";
import { developers } from "../Data/DevelopersData";
import type { AboutScreenProps, DeveloperAvatarStates } from "../Types/types";

export function AboutScreen({ navigation }: AboutScreenProps) {
  const { colors, isDark } = useTheme();
  const [avatars, setAvatars] = useState<DeveloperAvatarStates>({});

  return (
    <SafeAreaView className="flex-1 bg-ground dark:bg-navy-2">
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-3xl self-center px-5 pt-4 pb-8">
          <View className="gap-3 pb-6">
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Voltar à tela anterior"
              onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("HomeScreen")}
              className="min-h-12 min-w-12 self-start flex-row items-center gap-2"
            >
              <ArrowLeft size={20} color={colors.text} />
              <Text className="text-sm font-medium text-ink dark:text-paper">Voltar</Text>
            </TouchableOpacity>
            <Text accessibilityRole="header" className="text-title font-semibold tracking-tight text-ink dark:text-paper">Sobre o PaperTrail</Text>
          </View>

          <View className="gap-6">
            <View className="items-center rounded-2xl border border-rule bg-paper p-6 dark:border-dark-rule dark:bg-navy">
              <Brand />
              <Text accessibilityRole="header" className="mt-4 text-xl font-semibold text-ink dark:text-paper">{appInfo.name}</Text>
              <Text className="mt-1 text-center text-sm leading-5 text-body dark:text-soft">Menos dúvidas. Mais preparação.</Text>
              <Text className="mt-4 text-center text-body-copy text-body dark:text-soft">{appInfo.purpose}</Text>
              <View className="mt-4 rounded-lg bg-soft px-3 py-2 dark:bg-dark-soft">
                <Text selectable className="text-xs font-medium text-brand dark:text-dark-brand">Versão {appInfo.version}</Text>
              </View>
            </View>

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

            <View className="gap-3">
              <View className="gap-1">
                <Text accessibilityRole="header" className="text-heading font-semibold text-ink dark:text-paper">Nossa equipe</Text>
                <Text className="text-xs text-body dark:text-soft">Global Solution 2026</Text>
              </View>
              <View className="rounded-2xl border border-rule bg-paper dark:border-dark-rule dark:bg-navy">
                {developers.map((developer, index) => {
                  const names = developer.name.split(" ");
                  const initials = names[0][0] + names[names.length - 1][0];
                  const avatar = avatars[developer.rm];

                  return (
                    <View key={developer.rm} className={index < developers.length - 1
                      ? "flex-row items-center gap-3 p-4 border-b border-rule dark:border-dark-rule"
                      : "flex-row items-center gap-3 p-4"}>
                      <View accessible={false} className="h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-soft dark:bg-dark-soft">
                        <Text className="text-sm font-semibold text-brand dark:text-dark-brand">{initials}</Text>
                        {avatar !== "error" && <Image
                          accessible={false}
                          source={{ uri: developer.avatarUrl }}
                          resizeMode="cover"
                          className="absolute h-12 w-12 rounded-full"
                          style={{ opacity: avatar === "loaded" ? 1 : 0 }}
                          onLoad={() => setAvatars(current => ({ ...current, [developer.rm]: "loaded" }))}
                          onError={() => setAvatars(current => ({ ...current, [developer.rm]: "error" }))}
                        />}
                      </View>
                      <View className="flex-1 gap-1">
                        <Text className="text-sm font-semibold text-ink dark:text-paper">{developer.name}</Text>
                        <Text className="text-xs text-body dark:text-soft">RM {developer.rm}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            <Text className="text-center text-xs text-body dark:text-soft">{appInfo.project}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
