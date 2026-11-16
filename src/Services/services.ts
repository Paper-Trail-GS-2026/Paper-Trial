import { api } from "./http";
import type { ServiceResponseDTO, ServiceSnapshotDTO, JavaPageDTO } from "../Types/types";

export async function listServices(signal?: AbortSignal): Promise<ServiceResponseDTO[]> {
  const services = new Map<number, ServiceResponseDTO>();
  let page = 0;

  while (true) {
    const { data } = await api.get<JavaPageDTO<ServiceResponseDTO>>("/services", {
      params: { page, size: 100, sort: "id,asc" },
      signal,
    });

    if (!Array.isArray(data?.content) || data.page?.number !== page ||
        !Number.isSafeInteger(data.page?.totalPages) || data.page.totalPages < 0 ||
        data.content.some(service => !isServiceResponse(service))) {
      throw new Error("O servidor não retornou uma lista de serviços válida.");
    }

    for (const service of data.content) services.set(service.id, service);
    if (page + 1 >= data.page.totalPages) return [...services.values()];
    if (!data.content.length) {
      throw new Error("Não foi possível carregar todos os serviços. Tente novamente.");
    }
    page += 1;
  }
}

function isServiceResponse(service: ServiceResponseDTO): boolean {
  return Number.isSafeInteger(service?.id) && service.id > 0 &&
    Number.isSafeInteger(service.categoryId) && service.categoryId > 0 &&
    typeof service.title === "string" && !!service.title.trim() &&
    typeof service.description === "string" && typeof service.cityName === "string" &&
    Number.isSafeInteger(service.version) && service.version >= 0;
}

export async function getServiceById(id: string, signal?: AbortSignal): Promise<ServiceResponseDTO> {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
    throw new Error("Identificador de serviço inválido.");
  }
  const { data } = await api.get<ServiceResponseDTO>(`/services/${id}`, { signal });
  if (!isServiceResponse(data) || data.id !== Number(id)) {
    throw new Error("O servidor não retornou os dados válidos deste serviço.");
  }
  return data;
}

export async function getRequirementsSnapshot(id: string, signal?: AbortSignal): Promise<ServiceSnapshotDTO> {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
    throw new Error("Identificador de serviço inválido.");
  }
  const { data } = await api.get<ServiceSnapshotDTO>(`/services/${id}/requirements-snapshot`, { signal });
  if (data?.serviceId !== Number(id) || !Number.isSafeInteger(data.version) || data.version < 0 ||
      typeof data.title !== "string" || !data.title.trim() || !Array.isArray(data.requirements) ||
      data.requirements.some(item => !Number.isSafeInteger(item?.id) || item.id <= 0 ||
        typeof item.title !== "string" || !item.title.trim() || typeof item.required !== "boolean" ||
        (item.sourceUrl !== null && typeof item.sourceUrl !== "string")) ||
      new Set(data.requirements.map(item => item.id)).size !== data.requirements.length) {
    throw new Error("O servidor não retornou requisitos válidos para este serviço.");
  }
  return data;
}
