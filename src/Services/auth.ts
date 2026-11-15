import { api } from "./http";
import type { LoginFormData, LoginRequestDTO, LoginResponseDTO, UserResponseDTO, RegisterFormData, RegisterRequestDTO } from "../Types/types";

export async function loginUser(data: LoginFormData): Promise<LoginResponseDTO> {
  const payload: LoginRequestDTO = {
    email: data.email,
    password: data.senha,
  };
  const response = await api.post<LoginResponseDTO>("/auth/login", payload);

  if (typeof response.data?.token !== "string" || !response.data.token.trim()) {
    throw new Error("O servidor não retornou um token de acesso válido.");
  }

  return response.data;
}

export async function getCurrentUser(token?: string): Promise<UserResponseDTO> {
  const { data } = await api.get<UserResponseDTO>("/auth/me", token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined);
  if (!Number.isSafeInteger(data?.id) || data.id <= 0 ||
      typeof data.name !== "string" || !data.name.trim() ||
      typeof data.email !== "string" || !data.email.trim() ||
      !["CITIZEN", "MANAGER"].includes(data.role) ||
      typeof data.createdAt !== "string" || !Number.isFinite(Date.parse(data.createdAt))) {
    throw new Error("O servidor não retornou um perfil válido para esta sessão.");
  }
  return data;
}

export async function registerUser(data: RegisterFormData): Promise<UserResponseDTO> {
  const payload: RegisterRequestDTO = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.senha,
  };
  const response = await api.post<UserResponseDTO>("/auth/register", payload);
  if (response.status !== 201) {
    throw new Error("Não foi possível confirmar o cadastro. Tente entrar com seu e-mail antes de cadastrar novamente.");
  }
  return response.data;
}
