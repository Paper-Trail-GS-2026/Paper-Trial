import type { DemoRegisterFormData, DemoRegisterFormErrors, LoginFormData, LoginFormErrors } from "../Types/types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(formData: LoginFormData) {
  const errors: LoginFormErrors = { email: "", senha: "" };
  let isValid = true;

  if (!emailRegex.test(formData.email)) {
    errors.email = "Email inválido";
    isValid = false;
  }

  if (formData.senha.length < 6) {
    errors.senha = "Senha deve ter no mínimo 6 caracteres";
    isValid = false;
  }

  return { errors, isValid };
}

export function validateRegistration(formData: DemoRegisterFormData) {
  const errors: DemoRegisterFormErrors = { ...validateLogin(formData).errors };

  if (!formData.name.trim()) errors.name = "Informe seu nome ou apelido.";
  if (formData.senha !== formData.confirmarSenha) {
    errors.confirmarSenha = "As senhas precisam ser iguais.";
  }

  return { errors, isValid: !Object.values(errors).some(Boolean) };
}
