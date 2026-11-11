import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInputProps } from "react-native";

// ==========================================
// Tipos de Tema (Dark / Light Mode)
// ==========================================

export type ThemeType = "light" | "dark";
export type Theme = ThemeType;


export interface PaperTrailThemeColors {
  background: string;
  card: string;
  surface: string;
  soft: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderSecondary: string;
  brand: string;
  icon: string;
  iconSecondary: string;
}

// ==========================================
// Tipos de Autenticação & Cadastro
// ==========================================

export interface LoginFormData {
  email: string;
  senha: string;
}

export type LoginFormErrors = Record<keyof LoginFormData, string>;

export interface RegisterFormData {
  name: string;
  cpf: string;
  email: string;
  senha: string;
  confirmarSenha?: string;
  phone: string;
  cityId: number;
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormData | "city", string>>;

export interface LoginResponseDTO {
  token: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

// ==========================================
// Perfil do Usuário / Tutor
// ==========================================

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  username?: string; // Nome de usuário único (@usuario)
  phone?: string;
  address?: string;
  photoUrl?: string;
  cpf?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================
// Navegação de Telas
// ==========================================

export type RootStackParamList = {
    HomeScreen: undefined;
    ServicesScreen: undefined;
    ServiceDetailsScreen: undefined;
    PreparationsScreen: undefined;
    PreparationDetailsScreen: undefined;
    ProfileScreen: undefined;
    AboutScreen: undefined;
};

export type AuthStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
    SignOut: undefined;
}

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
>;

export type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegisterScreen'
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;

export type ServicesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ServicesScreen'
>;


export type ServiceDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ServiceDetailsScreen'
>;

export type PreparationsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PreparationsScreen'
>;


export type PreparationDetailsScreenProps = NativeStackScreenProps<
RootStackParamList,
'PreparationDetailsScreen'
>;

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProfileScreen'
>;

export type AboutScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AboutScreen'
>;

// ==========================================
// Tipos de Contexto
// ==========================================

export interface AuthContextType {
  loggedIn: boolean;
  loading: boolean;
  user: OwnerApiDTO | null;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<OwnerApiDTO>) => Promise<void>;
}

export interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  colors: PaperTrailThemeColors;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

// ==========================================
// Usuário - API
// ==========================================

export interface OwnerApiDTO {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    createdAt: string;
    updatedAt: string;
}

// ==========================================
// Props de Componentes
// ==========================================

export interface FormattedTextInputProps extends Omit<TextInputProps, "value" | "defaultValue" | "onChangeText" | "maxLength" | "keyboardType"> {
  format: "cpf" | "phone";
  value: string;
  onChangeText: (value: string) => void;
}