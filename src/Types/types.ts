import type { TextInputProps } from "react-native";
import type { NativeStackNavigationProp,NativeStackScreenProps } from "@react-navigation/native-stack";
import type { LucideIcon } from "lucide-react-native";
import type { ReactNode } from "react";




// =========================
// Serviços e requisitos
// =========================

export interface Requirement {
  name: string;
  description: string;
  required: boolean;
}

export interface PublicService {
  id: string;
  name: string;
  category: string;
  description: string;
  time: string;
  requirements: Requirement[];
}


// =========================
// Preparativos
// =========================

export interface Preparation {
  id: string;
  serviceId: string;
  title: string;
  completed: number[];
  created: string;
  updated: string;
}

export type PreparationFilter = "Todos" | "Em andamento" | "Prontos";

export interface PreparationsContextValue {
  preparations: Preparation[];
  create: (serviceId: string) => string;
  toggle: (id: string, index: number) => void;
  rename: (id: string, title: string) => void;
  remove: (id: string) => void;
}


// =========================
// Tema
// =========================

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
  onBrand: string;
  danger: string;
  icon: string;
  iconSecondary: string;
}

export interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  colors: PaperTrailThemeColors;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}


// =========================
// Formulário de cadastro
// =========================

export type DemoRegisterFormErrors = Partial<Record<keyof DemoRegisterFormData, string>>;

export interface DemoRegisterFormData {
  name: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}


// =========================
// Navegação e propriedades das telas
// =========================


export type RootStackParamList = {
  HomeScreen: undefined;
  ServicesScreen: undefined;
  ServiceDetailsScreen: { serviceId: string };
  PreparationsScreen: undefined;
  PreparationDetailsScreen: { preparationId: string };
  ProfileScreen: undefined;
  AboutScreen: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
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

export type Destination = "HomeScreen" | "ServicesScreen" | "PreparationsScreen" | "ProfileScreen";

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

// =========================
// Propriedades de Header
// =========================

export interface HeaderProps {
  title?: string;
  back?: boolean;
}

// =========================
// Propriedades de PreparationSummary
// =========================

export interface PreparationSummaryProps { onOpen?: () => void }

// =========================
// Propriedades de Progress
// =========================

export interface ProgressProps {
  completed: number;
  total: number;
}

// =========================
// Propriedades de ServiceRow
// =========================

export interface ServiceRowProps { service: PublicService; onPress: () => void }

// =========================
// Sessão demonstrativa — User
// =========================

export type User = { name: string };

// =========================
// Sessão demonstrativa — Session
// =========================

export type Session = {
  user: User | null;
  loggedIn: boolean;
  login: () => void;
  register: (name: string) => void;
  logout: () => void;
};

// =========================
// Propriedades dos providers
// =========================

export interface ProviderProps { children: ReactNode }

// =========================
// Propriedades de navigationItems
// =========================

export interface NavigationItem { route: Destination; label: string; icon: LucideIcon }

// =========================
// Propriedades de BottomNavigation
// =========================

export interface BottomNavigationProps { active: Destination }

// =========================
// Propriedades de Welcome
// =========================

export interface WelcomeProps { onProfile: () => void }

// =========================
// Propriedades de Checklist
// =========================

export interface ChecklistProps {
  items: Requirement[];
  completed: number[];
  onToggle: (index: number) => void;
}

// =========================
// Pop-ups de preparativos
// =========================

export interface EditPreparationNameModalProps {
  title: string;
  onConfirm: (title: string) => void;
  onCancel: () => void;
}

export interface DeletePreparationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

// =========================
// Propriedades de PreparationCard
// =========================

export interface PreparationCardProps { preparation: Preparation; onPress: () => void }

// =========================
// Propriedades de StatusFilter
// =========================

export interface StatusFilterProps {
  value: PreparationFilter;
  onChange: (value: PreparationFilter) => void;
}

// =========================
// Propriedades de Requirements
// =========================

export interface RequirementsProps {
  items: Requirement[];
}

// =========================
// Propriedades de CategoryFilter
// =========================

export interface CategoryFilterProps {
  selected: string;
  onSelect: (value: string) => void;
}

// =========================
// Desenvolvedores e fotos da equipe
// =========================

export interface Developer {
  name: string;
  rm: string;
  avatarUrl: string;
}

export type DeveloperAvatarStates = Record<string, "loaded" | "error">;

// =========================
// Tipagens dos arquivos restaurados de autenticação e formulário
// =========================

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

export interface OwnerApiDTO {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    createdAt: string;
    updatedAt: string;
}

export interface FormattedTextInputProps extends Omit<TextInputProps, "value" | "defaultValue" | "onChangeText" | "maxLength" | "keyboardType"> {
  format: "cpf" | "phone";
  value: string;
  onChangeText: (value: string) => void;
}
