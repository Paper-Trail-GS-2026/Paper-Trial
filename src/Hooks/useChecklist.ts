import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { queryKeys } from "../Lib/queryKeys";
import { getChecklistProgress, listChecklist, setChecklistItemState } from "../Services/checklist";
import { deletePreparation, renamePreparation } from "../Services/preparations";

export function useChecklist(id: string) {
  const { user } = useAuth();
  const client = useQueryClient();
  const itemsKey = queryKeys.preparations.checklist(id, user?.id);
  const progressKey = queryKeys.preparations.progress(id, user?.id);
  const detailKey = queryKeys.preparations.detail(id, user?.id);
  const listKey = queryKeys.preparations.list(user?.id);
  const items = useQuery({ queryKey: itemsKey, queryFn: ({ signal }) => listChecklist(id, signal), enabled: !!user });
  const progress = useQuery({ queryKey: progressKey, queryFn: ({ signal }) => getChecklistProgress(id, signal), enabled: !!user });
  const toggle = useMutation({
    mutationFn: ({ itemId, completed }: { itemId: number; completed: boolean }) => setChecklistItemState(id, itemId, completed),
    onSettled: async () => {
      await Promise.all([client.invalidateQueries({ queryKey: itemsKey }), client.invalidateQueries({ queryKey: progressKey })]);
    },
  });
  const rename = useMutation({
    mutationFn: (title: string) => renamePreparation(id, title),
    onSettled: async () => {
      await Promise.all([client.invalidateQueries({ queryKey: detailKey }), client.invalidateQueries({ queryKey: listKey })]);
    },
  });
  const remove = useMutation({
    mutationFn: () => deletePreparation(id),
    onSuccess: async () => {
      await Promise.all([itemsKey, progressKey, detailKey].map(queryKey => client.cancelQueries({ queryKey })));
      for (const queryKey of [itemsKey, progressKey, detailKey]) client.removeQueries({ queryKey });
      await client.invalidateQueries({ queryKey: listKey });
    },
  });
  return { items, progress, toggle, rename, remove };
}
