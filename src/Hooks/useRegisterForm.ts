import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { validateRegistration } from "../Utils/validators";
import type { DemoRegisterFormData, DemoRegisterFormErrors } from "../Types/types";

export function useRegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState<DemoRegisterFormData>({
    name: "", email: "", senha: "", confirmarSenha: "",
  });
  const [errors, setErrors] = useState<DemoRegisterFormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof DemoRegisterFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({
      ...current,
      [field]: "",
      ...(field === "senha" ? { confirmarSenha: "" } : {}),
    }));
    setSubmitError("");
  };

  const handleRegister = async () => {
    if (isSubmitting) return;
    setSubmitError("");
    const validation = validateRegistration(formData);
    setErrors(validation.errors);
    if (!validation.isValid) return;

    try {
      setIsSubmitting(true);
      await register(formData.name);
    } catch {
      setSubmitError("Não foi possível continuar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, errors, submitError, isSubmitting, updateField, handleRegister };
}
