import { createContext,useContext,useState } from "react";
import { demoPreparations } from "../Data/PreparationsData";
import { demoServices } from "../Data/ServicesData";
import type { ProviderProps } from "../Types/types";
import { Preparation,PreparationsContextValue } from "../Types/types";

const Context = createContext<PreparationsContextValue | undefined>(undefined);
export function PreparationsProvider({
  children
}: ProviderProps) {
  const [preparations, setPreparations] = useState<Preparation[]>(() => demoPreparations.map(p => ({
    ...p,
    completed: [...p.completed]
  })));
  function create(serviceId: string) {
    const existing = preparations.find(p => p.serviceId === serviceId);
    if (existing) return existing.id;
    const service = demoServices.find(s => s.id === serviceId);
    if (!service) throw new Error("Serviço não encontrado.");
    const id = `demo-${Date.now()}`;
    setPreparations(current => [...current, {
      id,
      serviceId,
      title: service.name,
      completed: [],
      created: new Date().toLocaleDateString("pt-BR"),
      updated: `Atualizado em ${new Date().toLocaleDateString("pt-BR")}`
    }]);
    return id;
  }
  function toggle(id: string, index: number) {
    setPreparations(current => current.map(p => p.id !== id ? p : {
      ...p,
      completed: p.completed.includes(index) ? p.completed.filter(i => i !== index) : [...p.completed, index],
      updated: `Atualizado em ${new Date().toLocaleDateString("pt-BR")}`
    }));
  }
  function rename(id: string, title: string) {
    if (title.trim()) setPreparations(current => current.map(p => p.id === id ? {
      ...p,
      title: title.trim()
    } : p));
  }
  function remove(id: string) {
    setPreparations(current => current.filter(p => p.id !== id));
  }
  return (
    <Context.Provider value={{
      preparations,
      create,
      toggle,
      rename,
      remove
    }}>{children}</Context.Provider>
  );
}
export function usePreparations() {
  const context = useContext(Context);
  if (!context) throw new Error("usePreparations precisa de PreparationsProvider.");
  return context;
}
