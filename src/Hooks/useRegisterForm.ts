import { useAuth } from "../Context/AuthContext";
import { useRef, useState } from "react";
import { validateRegistration } from "../Utils/validators";
import type { RegisterFormData, RegisterFormErrors } from "../Types/types";

export function useRegisterForm() {
  const { register } = useAuth();
  const submitting = useRef(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "", email: "", senha: "", confirmarSenha: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({
      ...current,
      [field]: "",
      ...(field === "senha" ? { confirmarSenha: "" } : {}),
    }));
    setSubmitError("");
  };

  const handleRegister = async () => {
    if (submitting.current) return;
    setSubmitError("");
    const validation = validateRegistration(formData);
    setErrors(validation.errors);
    if (!validation.isValid) return;

    try {
      submitting.current = true;
      setIsSubmitting(true);
      await register(formData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Não foi possível cadastrar. Tente novamente.");
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  };

  return { formData, errors, submitError, isSubmitting, updateField, handleRegister };
}
