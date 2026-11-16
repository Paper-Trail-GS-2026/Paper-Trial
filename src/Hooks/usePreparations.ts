import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { queryKeys } from "../Lib/queryKeys";
import { getPreparationById, listPreparations } from "../Services/preparations";

export function usePreparationsQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.preparations.list(user?.id),
    queryFn: ({ signal }) => listPreparations(signal),
    enabled: !!user,
  });
}

export function usePreparationQuery(id: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.preparations.detail(id, user?.id),
    queryFn: ({ signal }) => getPreparationById(id, signal),
    enabled: !!user,
  });
}
