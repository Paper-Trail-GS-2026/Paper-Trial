import axios from "axios";
import { api } from "./http";
import { sendChatMessage } from "./chatbot";
import type { GuidanceRequestDTO, GuidanceResponseDTO } from "../Types/types";

export async function askGuidance(
  serviceId: string,
  question: string,
  signal?: AbortSignal,
  previousInteractionId?: string,
): Promise<GuidanceResponseDTO & { interactionId: string }> {
  if (!/^[1-9]\d*$/.test(serviceId) || !Number.isSafeInteger(Number(serviceId))) {
    throw new Error("Identificador de serviço inválido.");
  }
  const payload: GuidanceRequestDTO = { question: question.trim() };
  if (!payload.question || payload.question.length > 500) {
    throw new Error("Digite uma pergunta de até 500 caracteres.");
  }
  try {
    const chatbotData = await sendChatMessage(
      payload.question,
      Number(serviceId),
      previousInteractionId,
      signal,
    );
    const data: GuidanceResponseDTO & { interactionId: string } = {
      answer: chatbotData.resposta,
      sources: chatbotData.fontes,
      insufficientEvidence: chatbotData.insufficientEvidence,
      interactionId: chatbotData.interaction_id,
    };
    if (typeof data.answer !== "string" || !data.answer.trim() ||
        typeof data.insufficientEvidence !== "boolean" || !Array.isArray(data.sources) ||
        data.sources.some(source => typeof source?.sourceUrl !== "string" ||
          typeof source.sourceTitle !== "string" || !source.sourceTitle.trim() ||
          typeof source.reviewedAt !== "string" || !Number.isFinite(Date.parse(source.reviewedAt)))) {
      throw new Error("O servidor não retornou uma orientação válida.");
    }
    return data;
  } catch (error) {
    if (axios.isCancel(error)) throw error;
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
      return { ...data, interactionId: previousInteractionId ?? "" };
    } catch (fallbackError) {
      if (axios.isCancel(fallbackError)) throw fallbackError;
      if (axios.isAxiosError(fallbackError) && fallbackError.response?.status === 503) {
        fallbackError.message = "A orientação por IA está indisponível no momento. Tente novamente mais tarde.";
      }
      throw fallbackError;
    }
  }
}
