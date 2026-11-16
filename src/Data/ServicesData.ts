import type { PublicService } from "../Types/types";

export const demoServices: PublicService[] = [
  {
    id: '1', name: 'Cartão de estacionamento para idoso', category: 'Mobilidade', description: 'Organize os documentos para solicitar sua credencial de estacionamento.', time: 'Cerca de 10 min', requirements: [
      { name: 'Documento de identidade com foto', description: 'Separe o documento para conferir antes da visita.', required: true },
      { name: 'Comprovante de residência recente', description: 'Organize o comprovante e confira os dados.', required: true },
      { name: 'Formulário de solicitação preenchido', description: 'Revise os campos preenchidos no formulário.', required: true },
    ]
  },
  {
    id: '2', name: 'Bilhete Único — primeira via', category: 'Transporte', description: 'Prepare os documentos para solicitar seu cartão de transporte.', time: 'Cerca de 8 min', requirements: [
      { name: 'Documento de identidade com foto', description: 'Separe seu documento de identificação.', required: true },
      { name: 'CPF', description: 'Tenha o número disponível para consulta.', required: true },
      { name: 'Foto recente', description: 'Separe uma foto recente.', required: true },
    ]
  },
  {
    id: '3', name: 'Atendimento habitacional', category: 'Moradia', description: 'Organize informações para buscar atendimento habitacional.', time: 'Cerca de 12 min', requirements: [
      { name: 'Documento de identidade dos moradores', description: 'Organize os documentos das pessoas da residência.', required: true },
      { name: 'Comprovante de endereço', description: 'Separe um comprovante para consulta.', required: true },
      { name: 'Comprovante de renda, se disponível', description: 'Separe o comprovante, se disponível.', required: false },
    ]
  },
];
