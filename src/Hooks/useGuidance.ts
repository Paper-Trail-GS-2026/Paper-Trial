import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { askGuidance } from "../Services/guidance";
import type { GuidanceMutationInput } from "../Types/types";
import { useAuth } from "../Context/AuthContext";

export function useGuidance(serviceId: string) {
  const { loggedIn } = useAuth();
  const [question, setQuestion] = useState("");
  const [validationError, setValidationError] = useState("");
  const [previousInteractionId, setPreviousInteractionId] = useState<string>();
  const request = useRef<AbortController | null>(null);
  const mutation = useMutation({
    mutationFn: ({ text, signal, previousInteractionId }: GuidanceMutationInput) =>
      askGuidance(serviceId, text, signal, previousInteractionId),
    retry: false,
  });

  useEffect(() => {
    setPreviousInteractionId(undefined);
    return () => { request.current?.abort(); };
  }, [serviceId]);

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
      const response = await mutation.mutateAsync({
        text: question.trim(),
        signal: controller.signal,
        previousInteractionId,
      });
      if (response.interactionId) {
        setPreviousInteractionId(response.interactionId);
      }
    } catch { /* O erro é exibido pelo estado da mutation. */ }
    finally { request.current = null; }
  };

  return { question, updateQuestion, validationError, submit, mutation };
}
