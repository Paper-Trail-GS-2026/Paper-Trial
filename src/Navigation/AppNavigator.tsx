// Importações de bibliotecas
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoaderCircle } from "lucide-react-native"

//Import das Screens
import { HomeScreen } from '../Screens/HomeScreen';
import { ServicesScreen } from '../Screens/ServicesScreen';
import { ServiceDetailsScreen } from '../Screens/ServiceDetailsScreen';
import { PreparationsScreen } from '../Screens/PreparationsScreen';
import { PreparationDetailsScreen } from '../Screens/PreparationDetailsScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { AboutScreen } from '../Screens/AboutScreen';
import { LoginScreen } from '../Screens/LoginScreen';
import { RegisterScreen } from '../Screens/RegisterScreen';

//Import dos Types
import type { RootStackParamList, AuthStackParamList } from "../Types/types"
import { useAuth } from "../Context/AuthContext";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    const { loggedIn, loading } = useAuth();
    
    if (loading) return <LoaderCircle />;

    return (
        <RootStack.Navigator>
            {loggedIn ? (
                // Stack para usuário autenticado
                <RootStack.Group /*screenOptions={{ header: () => <Header /> }}*/>
                    <RootStack.Screen name="HomeScreen" component={HomeScreen} />
                    <RootStack.Screen name="ServicesScreen" component={ServicesScreen} />
                    <RootStack.Screen name="ServiceDetailsScreen" component={ServiceDetailsScreen} />
                    <RootStack.Screen name="PreparationsScreen" component={PreparationsScreen} />
                    <RootStack.Screen name="PreparationDetailsScreen" component={PreparationDetailsScreen} />
                    <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />
                    <RootStack.Screen name="AboutScreen" component={AboutScreen} />
                </RootStack.Group>
            ) : (
                // Stack para usuário NÃO autenticado
                <AuthStack.Group screenOptions={{ headerShown: false }}>
                    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
                    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
                </AuthStack.Group>
            )}
        </RootStack.Navigator>
    )
}

export default function AppNavigator() {
    return (
        <RootNavigator />
    )
}