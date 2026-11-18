import { dotnetApi } from "./http";
import type { CreatePreparationRequestDTO, DotnetPageDTO, PreparationResponseDTO } from "../Types/types";

export async function listPreparations(signal?: AbortSignal): Promise<PreparationResponseDTO[]> {
  const preparations = new Map<number, PreparationResponseDTO>();
  let page = 1;
  while (true) {
    const { data } = await dotnetApi.get<DotnetPageDTO<PreparationResponseDTO>>("/preparativos/", {
      params: { page, pageSize: 100 }, signal,
    });
    if (!Array.isArray(data?.items) || data.page !== page ||
        !Number.isSafeInteger(data.totalPages) || data.totalPages < 0 ||
        typeof data.hasNext !== "boolean" || data.hasNext !== (page < data.totalPages) ||
        data.items.some(item => !isPreparationResponse(item))) {
      throw new Error("O servidor não retornou uma lista de preparativos válida.");
    }
    for (const item of data.items) preparations.set(item.id, item);
    if (!data.hasNext) return [...preparations.values()];
    if (!data.items.length) throw new Error("Não foi possível carregar todos os preparativos. Tente novamente.");
    page += 1;
  }
}

function isPreparationResponse(item: PreparationResponseDTO): boolean {
  return Number.isSafeInteger(item?.id) && item.id > 0 &&
    Number.isSafeInteger(item.serviceId) && item.serviceId > 0 &&
    Number.isSafeInteger(item.sourceVersion) && item.sourceVersion >= 0 &&
    typeof item.title === "string" && !!item.title.trim() &&
    typeof item.createdAt === "string" && Number.isFinite(Date.parse(item.createdAt));
}

export async function getPreparationById(id: string, signal?: AbortSignal): Promise<PreparationResponseDTO> {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
    throw new Error("Identificador de preparativo inválido.");
  }
  const { data } = await dotnetApi.get<PreparationResponseDTO>(`/preparativos/${id}`, { signal });
  if (!isPreparationResponse(data) || data.id !== Number(id)) {
    throw new Error("O servidor não retornou dados válidos para este preparativo.");
  }
  return data;
}

export async function createPreparation(payload: CreatePreparationRequestDTO, key: string, token: string): Promise<PreparationResponseDTO> {
  if (!Number.isSafeInteger(payload.serviceId) || payload.serviceId <= 0 ||
      !payload.title.trim() || payload.title.trim().length > 160) {
    throw new Error("Informe um serviço válido e um nome de até 160 caracteres.");
  }
  if (!key || key.length > 128 || /[^\x21-\x7e]|,/.test(key)) throw new Error("Chave de criação inválida.");
  const { data, status } = await dotnetApi.post<PreparationResponseDTO>("/preparativos/", payload, {
    headers: { "Idempotency-Key": key, Authorization: `Bearer ${token}` },
  });
  if (status !== 201 || !isPreparationResponse(data) || data.serviceId !== payload.serviceId) {
    throw new Error("Não foi possível confirmar a criação. Tente novamente para recuperar o mesmo preparativo.");
  }
  return data;
}

export async function renamePreparation(id: string, title: string): Promise<PreparationResponseDTO> {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) throw new Error("Preparativo inválido.");
  const trimmed = title.trim();
  if (!trimmed || trimmed.length > 160) throw new Error("Informe um nome de até 160 caracteres.");
  const { data } = await dotnetApi.put<PreparationResponseDTO>(`/preparativos/${id}`, { title: trimmed });
  if (!isPreparationResponse(data) || data.id !== Number(id)) throw new Error("Não foi possível confirmar a alteração. Atualize o preparativo.");
  return data;
}

export async function deletePreparation(id: string): Promise<void> {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) throw new Error("Preparativo inválido.");
  const { status } = await dotnetApi.delete(`/preparativos/${id}`);
  if (status !== 204) throw new Error("Não foi possível confirmar a exclusão. Atualize seus preparativos.");
}
