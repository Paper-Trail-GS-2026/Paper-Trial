import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { queryKeys } from "../Lib/queryKeys";
import { listCategories } from "../Services/categories";

export function useCategories() {
  const { loggedIn } = useAuth();
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: ({ signal }) => listCategories(signal),
    enabled: loggedIn,
  });
}
