import { LoadindCircle } from "../LoadindCircle";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { useCreatePreparation } from "../../Hooks/useCreatePreparation";
import type { AppNavigation, CreatePreparationProps } from "../../Types/types";

export function CreatePreparation({
  serviceId,
  title,
}: CreatePreparationProps) {
  const navigation = useNavigation<AppNavigation>();
  const { create, mutation } = useCreatePreparation(serviceId, title);
  return (
    <View className="gap-2">
      <TouchableOpacity
        accessibilityRole="button"
        disabled={mutation.isPending}
        accessibilityState={{
          disabled: mutation.isPending,
          busy: mutation.isPending,
        }}
        onPress={async () => {
          const result = mutation.data ?? (await create());
          if (result)
            navigation.navigate("PreparationDetailsScreen", {
              preparationId: String(result.id),
              source: "api",
            });
        }}
        className="min-h-14 justify-center rounded-xl px-5 py-3.5 bg-navy-2 dark:bg-dark-brand"
      >
        {mutation.isPending ? (
          <LoadindCircle label="Criando preparativo…" tone="onBrand" />
        ) : (
          <Text className="text-label font-semibold text-paper dark:text-navy-2 text-center">
            {mutation.isError
              ? "Tentar criar novamente"
              : mutation.isSuccess
                ? "Abrir preparativo"
                : "Criar preparativo"}
          </Text>
        )}
      </TouchableOpacity>
      {mutation.isError && (
        <Text
          accessibilityRole="alert"
          className="text-body-copy text-body dark:text-soft"
        >
          {mutation.error.message}
        </Text>
      )}
    </View>
  );
}
