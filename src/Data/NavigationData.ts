import { Compass, House, ListChecks, UserRound } from "lucide-react-native";
import type { NavigationItem } from "../Types/types";

export const navigationItems: NavigationItem[] = [
  { route: "HomeScreen", label: "Início", icon: House },
  { route: "ServicesScreen", label: "Explorar", icon: Compass },
  { route: "PreparationsScreen", label: "Preparativos", icon: ListChecks },
  { route: "ProfileScreen", label: "Perfil", icon: UserRound },
];