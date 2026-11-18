import { dotnetApi } from "./http";
import type { DotnetPageDTO } from "../Types/types";

export interface ChecklistItemDTO {
  id: number;
  preparationId: number;
  requirementId: number | null;
  title: string;
  required: boolean;
  completed: boolean;
}

export interface ChecklistProgressDTO {
  totalItems: number;
  requiredItems: number;
  pendingRequiredItems: number;
  completionPercent: number;
  ready: boolean;
  sourceOutdated: boolean;
}

function path(id: string) {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) throw new Error("Preparativo inválido.");
  return `/preparativos/${id}`;
}

function validItem(item: ChecklistItemDTO, id: string) {
  return Number.isSafeInteger(item?.id) && item.id > 0 && item.preparationId === Number(id) &&
    typeof item.title === "string" && !!item.title.trim() &&
    typeof item.required === "boolean" && typeof item.completed === "boolean" &&
    (item.requirementId === null || (Number.isSafeInteger(item.requirementId) && item.requirementId > 0));
}

export async function listChecklist(id: string, signal?: AbortSignal): Promise<ChecklistItemDTO[]> {
  const url = `${path(id)}/itens`;
  const items = new Map<number, ChecklistItemDTO>();
  for (let page = 1; ; page++) {
    const { data } = await dotnetApi.get<DotnetPageDTO<ChecklistItemDTO>>(url, {
      params: { page, pageSize: 100 }, signal,
    });
    if (!Array.isArray(data?.items) || data.page !== page ||
      !Number.isSafeInteger(data.totalPages) || data.totalPages < 0 ||
      typeof data.hasNext !== "boolean" || data.hasNext !== (page < data.totalPages) ||
      data.items.some(item => !validItem(item, id))) throw new Error("O servidor retornou um checklist inválido.");
    for (const item of data.items) items.set(item.id, item);
    if (!data.hasNext) return [...items.values()];
    if (!data.items.length) throw new Error("Não foi possível carregar todo o checklist. Tente novamente.");
  }
}

export async function getChecklistProgress(id: string, signal?: AbortSignal): Promise<ChecklistProgressDTO> {
  const { data } = await dotnetApi.get<ChecklistProgressDTO>(`${path(id)}/progresso`, { signal });
  if (!data || ![data.totalItems, data.requiredItems, data.pendingRequiredItems].every(n => Number.isSafeInteger(n) && n >= 0) ||
    data.requiredItems > data.totalItems || data.pendingRequiredItems > data.requiredItems ||
    !Number.isFinite(data.completionPercent) || data.completionPercent < 0 || data.completionPercent > 100 ||
    typeof data.ready !== "boolean" || typeof data.sourceOutdated !== "boolean") {
    throw new Error("O servidor retornou um progresso inválido.");
  }
  return data;
}

export async function setChecklistItemState(id: string, itemId: number, completed: boolean): Promise<ChecklistItemDTO> {
  if (!Number.isSafeInteger(itemId) || itemId <= 0) throw new Error("Item inválido.");
  const { data } = await dotnetApi.patch<ChecklistItemDTO>(`${path(id)}/itens/${itemId}/estado`, { completed });
  if (!validItem(data, id) || data.id !== itemId || data.completed !== completed) {
    throw new Error("Não foi possível confirmar a marcação. Atualize o checklist.");
  }
  return data;
}
