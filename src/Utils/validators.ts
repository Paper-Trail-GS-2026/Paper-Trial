import type { RegisterFormData, RegisterFormErrors, LoginFormData, LoginFormErrors } from "../Types/types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(formData: LoginFormData) {
  const errors: LoginFormErrors = { email: "", senha: "" };
  const email = formData.email.trim();
  if (!emailRegex.test(email) || email.length > 254) {
    errors.email = "Informe um e-mail válido com até 254 caracteres.";
  }
  if (!formData.senha.trim()) {
    errors.senha = "Informe sua senha.";
  }
  return { errors, isValid: !Object.values(errors).some(Boolean) };
}

export function validateRegistration(formData: RegisterFormData) {
  const errors: RegisterFormErrors = { ...validateLogin(formData).errors };
  const name = formData.name.trim();
  if (!name) errors.name = "Informe seu nome.";
  else if (name.length > 120) errors.name = "O nome deve ter até 120 caracteres.";

  // Conta bytes UTF-8 sem depender de TextEncoder no runtime nativo.
  const passwordBytes = Array.from(formData.senha).reduce((total, character) => {
    const code = character.codePointAt(0)!;
    return total + (code <= 0x7f ? 1 : code <= 0x7ff ? 2 : code <= 0xffff ? 3 : 4);
  }, 0);
  if (formData.senha.length < 8) errors.senha = "A senha deve ter no mínimo 8 caracteres.";
  else if (passwordBytes > 72) errors.senha = "A senha é muito longa. Use até 72 bytes; acentos e emojis ocupam mais espaço.";
  if (formData.senha !== formData.confirmarSenha) errors.confirmarSenha = "As senhas precisam ser iguais.";

  return { errors, isValid: !Object.values(errors).some(Boolean) };
}
