import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { askGuidance } from "../Services/guidance";
import type { GuidanceMutationInput } from "../Types/types";
import { useAuth } from "../Context/AuthContext";

export function useGuidance(serviceId: string) {
  const { loggedIn } = useAuth();
  const [question, setQuestion] = useState("");
  const [validationError, setValidationError] = useState("");
  const request = useRef<AbortController | null>(null);
  const mutation = useMutation({
    mutationFn: ({ text, signal }: GuidanceMutationInput) => askGuidance(serviceId, text, signal),
    retry: false,
  });

  useEffect(() => () => { request.current?.abort(); }, [serviceId]);

  const updateQuestion = (value: string) => {
    if (request.current) return;
    setQuestion(value);
    setValidationError("");
    mutation.reset();
  };

  const submit = async () => {
    if (request.current || !loggedIn) return;
    mutation.reset();
    if (!question.trim() || question.trim().length > 500) {
      setValidationError("Digite uma pergunta de até 500 caracteres.");
      return;
    }
    setValidationError("");
    const controller = new AbortController();
    request.current = controller;
    try {
      await mutation.mutateAsync({ text: question.trim(), signal: controller.signal });
    } catch { /* O erro é exibido pelo estado da mutation. */ }
    finally { request.current = null; }
  };

  return { question, updateQuestion, validationError, submit, mutation };
}
