import './global.css';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-ground p-6">
        <Text className="text-3xl font-bold text-brand mb-2">Paper-Trial</Text>
        <Text className="text-base text-mute text-center">
          NativeWind (Tailwind CSS) e Babel configurados com sucesso!
        </Text>
      </View>
    </SafeAreaProvider>
  );
}
