import "./global.css";
import { View } from "react-native";
import AppNavigator from "./src/Navigation/AppNavigator";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/Context/AuthContext";
import { ThemeProvider, useTheme } from "./src/Context/ThemeContext";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/Lib/queryClient';
import { ChatbotWidget } from "./src/Components/ChatbotWidget";


export function AppContent() {
  const {
    isDark,
    colors
  } = useTheme();
  const { user } = useAuth();
  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: colors.brand
    }
  };
  return (
    <View className="flex-1">
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
        {user && <ChatbotWidget />}
      </NavigationContainer>
    </View>
  );
}
export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
