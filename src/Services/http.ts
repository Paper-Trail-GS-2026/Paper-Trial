import axios from "axios";
import { getStoredToken } from "./sessionStorage";
import { env } from "../Config/env";
import type { ApiProblemDTO } from "../Types/types";

export const api = axios.create({
  baseURL: env.apiUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export const dotnetApi = axios.create({
  baseURL: env.dotNETAPiUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export const chatbotApi = axios.create({
  baseURL: env.chatbot_Api_Url,
  timeout: 25000,
  headers: { "Content-Type": "application/json" },
});

let onUnauthorized: (() => Promise<void>) | null = null;

export function setUnauthorizedHandler(handler: (() => Promise<void>) | null) {
  onUnauthorized = handler;
}

for (const client of [api, dotnetApi, chatbotApi]) {
client.interceptors.request.use(async (config) => {
  const isPublic = client === api && config.method === "post" &&
    (config.url === "/auth/login" || config.url === "/auth/register");
  if (!isPublic && !config.headers.Authorization) {
    const token = await getStoredToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError<ApiProblemDTO>(error) || axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && error.config?.headers.Authorization) {
      const token = await getStoredToken().catch(() => null);
      if (token && error.config.headers.Authorization === `Bearer ${token}`) {
        await onUnauthorized?.();
      }
    }

    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      error.message = "Tempo limite excedido. Tente novamente em instantes.";
    } else if (!error.response) {
      error.message = "Não foi possível conectar ao servidor. Verifique sua conexão.";
    } else if (error.response.status === 401) {
      error.message = error.config?.url === "/auth/login"
        ? "Não foi possível autenticar. Confira seu e-mail e sua senha."
        : "Sua sessão expirou ou é inválida. Entre novamente.";
    } else if (error.response.status === 409 && error.config?.url === "/auth/register") {
      error.message = "Este e-mail já está cadastrado. Vá para Entrar ou use outro e-mail.";
    } else {
      const problem = error.response.data;
      const fieldErrors = Array.isArray(problem?.errors)
        ? problem.errors
          .filter((item) => typeof item?.message === "string")
          .map((item) => item.message)
          .join("\n")
        : "";
      error.message = fieldErrors ||
        (typeof problem?.detail === "string" && problem.detail) ||
        (typeof problem?.title === "string" && problem.title) ||
        `Não foi possível concluir a solicitação (HTTP ${error.response.status}).`;
    }

    // Preserva status e corpo para os consumidores tratarem erros específicos.
    return Promise.reject(error);
  }
);

}
