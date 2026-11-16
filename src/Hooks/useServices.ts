import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { queryKeys } from "../Lib/queryKeys";
import { getServiceById, getRequirementsSnapshot, listServices } from "../Services/services";

export function useServices() {
  const { loggedIn } = useAuth();
  return useQuery({
    queryKey: queryKeys.services.list(),
    queryFn: ({ signal }) => listServices(signal),
    enabled: loggedIn,
  });
}

export function useService(id: string) {
  const { loggedIn } = useAuth();
  return useQuery({
    queryKey: queryKeys.services.detail(id),
    queryFn: ({ signal }) => getServiceById(id, signal),
    enabled: loggedIn,
  });
}

export function useRequirementsSnapshot(id: string) {
  const { loggedIn } = useAuth();
  return useQuery({
    queryKey: queryKeys.services.requirements(id),
    queryFn: ({ signal }) => getRequirementsSnapshot(id, signal),
    enabled: loggedIn,
  });
}
