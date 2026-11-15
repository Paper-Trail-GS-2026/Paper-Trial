import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function Guidance() {
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
