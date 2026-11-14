import Constants from "expo-constants";

const buildInfo = Constants.expoConfig?.extra?.appInfo;

export const appInfo = {
  name: "PaperTrail",
  version: Constants.expoConfig?.version ?? "1.0.0",
  commitHash: typeof buildInfo?.commitHash === "string" ? buildInfo.commitHash : null,
  hasLocalChanges: typeof buildInfo?.hasLocalChanges === "boolean" ? buildInfo.hasLocalChanges : null,
  purpose: "O PaperTrail ajuda a entender requisitos e organizar documentos antes de buscar um serviço público. Acompanhe o que falta preparar e chegue ao atendimento com mais tranquilidade.",
  institution: "FIAP",
  edition: "Global Solution 2026/2",
  project: "FIAP · Global Solution 2026/2",
};
