import axios from "axios";
import { api } from "./http";
import type { GuidanceRequestDTO, GuidanceResponseDTO } from "../Types/types";

export async function askGuidance(serviceId: string, question: string, signal?: AbortSignal): Promise<GuidanceResponseDTO> {
  if (!/^[1-9]\d*$/.test(serviceId) || !Number.isSafeInteger(Number(serviceId))) {
    throw new Error("Identificador de serviço inválido.");
  }
  const payload: GuidanceRequestDTO = { question: question.trim() };
  if (!payload.question || payload.question.length > 500) {
    throw new Error("Digite uma pergunta de até 500 caracteres.");
  }
  try {
    const { data } = await api.post<GuidanceResponseDTO>(`/services/${serviceId}/guidance`, payload, {
      timeout: 45000,
      signal,
    });
    if (typeof data?.answer !== "string" || !data.answer.trim() ||
        typeof data.insufficientEvidence !== "boolean" || !Array.isArray(data.sources) ||
        data.sources.some(source => typeof source?.sourceUrl !== "string" ||
          typeof source.sourceTitle !== "string" || !source.sourceTitle.trim() ||
          typeof source.reviewedAt !== "string" || !Number.isFinite(Date.parse(source.reviewedAt)))) {
      throw new Error("O servidor não retornou uma orientação válida.");
    }
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 503) {
      error.message = "A orientação por IA está indisponível no momento. Tente novamente mais tarde.";
    }
    throw error;
  }
}
