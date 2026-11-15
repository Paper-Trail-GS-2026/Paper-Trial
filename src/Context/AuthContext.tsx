import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, loginUser, registerUser } from "../Services/auth";
import { setUnauthorizedHandler } from "../Services/http";
import { clearStoredSession, getStoredToken, saveStoredSession } from "../Services/sessionStorage";
import type { LoginFormData, ProviderProps, RegisterFormData, Session, User } from "../Types/types";

const AuthContext = createContext<Session | null>(null);

export function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");
  const sessionVersion = useRef(0);
  const storageQueue = useRef(Promise.resolve());
  const queryClient = useQueryClient();

  // Serializa gravação/remoção para que logout não seja ultrapassado por um login antigo.
  const writeStorage = useCallback((operation: () => Promise<void>) => {
    const pending = storageQueue.current.then(operation);
    storageQueue.current = pending.catch(() => {});
    return pending;
  }, []);

  const logout = useCallback(async () => {
    sessionVersion.current += 1;
    setUser(null);
    setSessionError("");
    queryClient.clear();
    try {
      await writeStorage(clearStoredSession);
    } catch {
      setSessionError("Não foi possível apagar a sessão salva neste dispositivo. Tente sair novamente após entrar.");
    }
  }, [queryClient, writeStorage]);

  useEffect(() => {
    setUnauthorizedHandler(async () => {
      await logout();
      setSessionError("Sua sessão expirou. Entre novamente.");
    });
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  useEffect(() => {
    let active = true;
    const version = sessionVersion.current;
    const restoreSession = async () => {
      try {
        const token = await getStoredToken();
        if (!token) return;
        const profile = await getCurrentUser(token);
        if (active && version === sessionVersion.current) setUser(profile);
      } catch (error) {
        if (active && version === sessionVersion.current) {
          setSessionError(error instanceof Error ? error.message : "Não foi possível validar sua sessão. Entre novamente.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    void restoreSession();
    return () => { active = false; };
  }, []);

  const login = async (data: LoginFormData) => {
    const version = ++sessionVersion.current;
    setSessionError("");
    const { token } = await loginUser(data);
    const profile = await getCurrentUser(token);
    if (version !== sessionVersion.current) throw new Error("Login interrompido. Tente novamente.");
    await writeStorage(async () => {
      if (version !== sessionVersion.current) return;
      try {
        await saveStoredSession(token, profile);
      } catch {
        await clearStoredSession();
        throw new Error("Não foi possível salvar a sessão neste dispositivo. Tente novamente.");
      }
    });
    if (version !== sessionVersion.current) return;
    queryClient.clear();
    setUser(profile);
  };

  const register = async (data: RegisterFormData) => {
    const version = ++sessionVersion.current;
    setSessionError("");
    await registerUser(data);
    try {
      if (version !== sessionVersion.current) throw new Error("Cadastro interrompido.");
      await login({ email: data.email.trim().toLowerCase(), senha: data.senha });
    } catch {
      throw new Error("Cadastro realizado, mas não foi possível entrar automaticamente. Vá para Entrar e use o e-mail e a senha cadastrados.");
    }
  };

  return <AuthContext.Provider value={{ user, loggedIn: !!user, loading, sessionError, login, register, logout }}>
    {children}
  </AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa de AuthProvider.");
  return context;
}
