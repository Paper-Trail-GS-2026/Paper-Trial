import { chatbotApi } from "./http";
import type { ChatRequestDTO, ChatResponseDTO } from "../Types/types";

export async function sendChatMessage(
  mensagem: string,
  serviceId?: number,
  previousInteractionId?: string,
  signal?: AbortSignal,
): Promise<ChatResponseDTO> {
  const payload: ChatRequestDTO = {
    mensagem: mensagem.trim(),
    service_id: serviceId,
    previous_interaction_id: previousInteractionId,
  };

  if (!payload.mensagem || payload.mensagem.length > 500) {
    throw new Error("Digite uma mensagem de até 500 caracteres.");
  }

  const { data } = await chatbotApi.post<ChatResponseDTO>("/chat", payload, {
    timeout: 30000,
    signal,
  });

  if (
    typeof data?.resposta !== "string" ||
    !data.resposta.trim() ||
    typeof data.interaction_id !== "string" ||
    typeof data.insufficientEvidence !== "boolean" ||
    !Array.isArray(data.fontes)
  ) {
    throw new Error("O chatbot não retornou uma resposta válida.");
  }

  return data;
}