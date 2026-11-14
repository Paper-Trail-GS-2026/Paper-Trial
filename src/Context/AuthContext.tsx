import { createContext,useContext,useState } from "react";
import type { ProviderProps,Session,User } from "../Types/types";



const AuthContext = createContext<Session | null>(null);

// A demonstração mantém somente o nome em memória, sem autenticação ou rede.
export function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  return <AuthContext.Provider value={{
    user,
    loggedIn: !!user,
    login: () => setUser({ name: "Visitante" }),
    register: name => setUser({ name: name.trim() || "Visitante" }),
    logout: () => setUser(null),
  }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa de AuthProvider.");
  return context;
}
