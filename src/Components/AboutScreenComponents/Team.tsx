import { useState } from "react";
import { Image, Text, View } from "react-native";
import { developers } from "../../Data/DevelopersData";
import type { DeveloperAvatarStates } from "../../Types/types";

export function Team() {
  const [avatars, setAvatars] = useState<DeveloperAvatarStates>({});
  return (
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
  );
}
