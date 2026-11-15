import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { validateLogin } from "../Utils/validators";
import type { LoginFormData, LoginFormErrors } from "../Types/types";

export function useLoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({ email: "", senha: "" });
  const [errors, setErrors] = useState<LoginFormErrors>({ email: "", senha: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSubmitError("");
  };

  const handleLogin = async () => {
    if (isSubmitting) return;
    setSubmitError("");
    const validation = validateLogin(formData);
    setErrors(validation.errors);
    if (!validation.isValid) return;

    try {
      setIsSubmitting(true);
      await login(formData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Não foi possível entrar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, errors, isSubmitting, submitError, updateField, handleLogin };
}
