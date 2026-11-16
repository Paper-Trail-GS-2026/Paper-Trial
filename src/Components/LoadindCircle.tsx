import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Text, View } from "react-native";
import { useTheme } from "../Context/ThemeContext";
import type { LoadindCircleProps } from "../Types/types";

const { paperTrailNeutralColors } = require("../../tailwind.config");

export function LoadindCircle({
  label = "Carregando…",
  size = 22,
  tone = "brand",
}: LoadindCircleProps) {
  const { colors } = useTheme();
  const rotation = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(true);
  const color =
    tone === "inverse"
      ? paperTrailNeutralColors.paper
      : tone === "onBrand"
        ? colors.onBrand
        : colors.brand;

  useEffect(() => {
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => {
        if (active) setReduceMotion(value);
      })
      .catch(() => {});
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion,
    );
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    rotation.setValue(0);
    if (reduceMotion) return;
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [reduceMotion, rotation]);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityState={{ busy: true }}
      accessibilityLiveRegion="polite"
      className="flex-row items-center justify-center gap-2.5"
    >
      <View style={{ width: size, height: size }}>
        <View
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2.5,
            borderColor: color,
            opacity: 0.2,
          }}
        />
        <Animated.View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2.5,
            borderColor: "transparent",
            borderTopColor: color,
            borderRightColor: color,
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        />
      </View>
      <Text className="text-label font-medium shrink" style={{ color }}>
        {label}
      </Text>
    </View>
  );
}
