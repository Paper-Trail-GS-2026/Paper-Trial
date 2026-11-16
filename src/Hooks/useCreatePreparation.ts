import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { createPreparationOnce } from "../Services/preparationCreation";
import { queryKeys } from "../Lib/queryKeys";

export function useCreatePreparation(serviceId: number, title: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const mounted = useRef(true);
  const submitting = useRef(false);
  const currentUser = useRef(user?.id);
  currentUser.current = user?.id;
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  const mutation = useMutation({
    mutationFn: (userId: number) => createPreparationOnce(userId, serviceId, title),
    retry: false,
  });
  const create = async () => {
    if (!user || submitting.current) return null;
    submitting.current = true;
    const userId = user.id;
    try {
      const result = await mutation.mutateAsync(userId);
      if (!mounted.current || currentUser.current !== userId) return null;
      queryClient.setQueryData(queryKeys.preparations.detail(String(result.id), userId), result);
      void queryClient.invalidateQueries({ queryKey: queryKeys.preparations.list(userId) });
      return result;
    } catch { return null; }
    finally { submitting.current = false; }
  };
  return { create, mutation };
}
