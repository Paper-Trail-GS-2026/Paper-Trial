import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../Context/AuthContext";
import { PreparationsProvider } from "../Context/PreparationsContext";
import { AboutScreen } from "../Screens/AboutScreen";
import { HomeScreen } from "../Screens/HomeScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import { PreparationDetailsScreen } from "../Screens/PreparationDetailsScreen";
import { PreparationsScreen } from "../Screens/PreparationsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { RegisterScreen } from "../Screens/RegisterScreen";
import { ServiceDetailsScreen } from "../Screens/ServiceDetailsScreen";
import { ServicesScreen } from "../Screens/ServicesScreen";
import { AuthStackParamList,RootStackParamList } from "../Types/types";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  
  const { loggedIn } = useAuth();
  
  if (!loggedIn) return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </AuthStack.Navigator>
  );

  return (
    <PreparationsProvider>
      <RootStack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen
          name="ServicesScreen"
          component={ServicesScreen}
        />
        <RootStack.Screen
          name="ServiceDetailsScreen"
          getId={({
            params
          }) => params.serviceId}
          component={ServiceDetailsScreen}
        />
        <RootStack.Screen
          name="PreparationsScreen"
          component={PreparationsScreen}
        />
        <RootStack.Screen
          name="PreparationDetailsScreen"
          getId={({
            params
          }) => params.preparationId}
          component={PreparationDetailsScreen}
        />
        <RootStack.Screen
          name="ProfileScreen" component={ProfileScreen} />
        <RootStack.Screen name="AboutScreen" component={AboutScreen} />
      </RootStack.Navigator>
    </PreparationsProvider>
  );
}
