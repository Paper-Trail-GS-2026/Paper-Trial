import Svg from "react-native-svg";
import { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { useId } from "react";
import { View } from "react-native";
import { FileCheck2 } from "lucide-react-native";
const { paperTrailNeutralColors, paperTrailBrandColors } = require("../../tailwind.config");

export function Brand() {
  const gradientId = `hero${useId().replace(/:/g, "")}`;
  return <View className="overflow-hidden bg-navy-2 h-14 w-14 items-center justify-center rounded-xl">
    <View
      pointerEvents="none"
      className="absolute inset-0"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">
            <Stop offset="0" stopColor={paperTrailBrandColors.navy2} />
            <Stop offset="1" stopColor={paperTrailBrandColors.navy} />
          </LinearGradient>
        </Defs>
        <Rect
          width="100%"
          height="100%"
          fill={`url(#${gradientId})`} />
      </Svg>
    </View>
    <FileCheck2
      size={30}
      strokeWidth={1.7}
      color={paperTrailNeutralColors.paper} />
  </View>;
}
