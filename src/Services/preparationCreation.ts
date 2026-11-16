import { getStoredToken } from "./sessionStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createPreparation } from "./preparations";
import type { PreparationCreationIntent, PreparationResponseDTO } from "../Types/types";

const pending = new Map<string, Promise<PreparationResponseDTO>>();

// A intenção sobrevive à saída da tela e ao reinício após uma resposta perdida.
export function createPreparationOnce(userId: number, serviceId: number, title: string): Promise<PreparationResponseDTO> {
  const storageKey = `@papertrail_creation:${userId}:${serviceId}`;
  const existing = pending.get(storageKey);
  if (existing) return existing;
  const operation = (async () => {
    const token = await getStoredToken();
    if (!token) throw new Error("Entre novamente para criar um preparativo.");
    const stored = await AsyncStorage.getItem(storageKey);
    let intent: PreparationCreationIntent;
    if (stored) {
      intent = JSON.parse(stored);
      if (typeof intent?.key !== "string" || intent.payload?.serviceId !== serviceId ||
          typeof intent.payload.title !== "string") {
        throw new Error("Não foi possível recuperar a criação anterior. Consulte seus preparativos antes de continuar.");
      }
    } else {
      intent = {
        key: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`,
        payload: { serviceId, title: title.trim() },
      };
      await AsyncStorage.setItem(storageKey, JSON.stringify(intent));
    }
    if (await getStoredToken() !== token) throw new Error("A sessão mudou. Entre novamente antes de continuar.");
    const result = await createPreparation(intent.payload, intent.key, token);
    // Se a limpeza falhar, preservar a intenção permite recuperar o mesmo resultado.
    await AsyncStorage.removeItem(storageKey).catch(() => {});
    return result;
  })();
  pending.set(storageKey, operation);
  void operation.finally(() => pending.delete(storageKey)).catch(() => {});
  return operation;
}
