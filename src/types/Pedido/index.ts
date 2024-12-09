import { z } from "zod";

export interface Pedido {
  id: string;
  clientId: string;
  entryDate: Date;
  deliveryDate: Date;
  performer: string;
  coordinator: string;
  expander: string;
  orderNumber: string;
  propertyValue: string;
  zeroPoint: string;
  status: string;
  observations: string;
  state: string;
  city: string;
  propertyType: string;
  totalArea: number;
  builtArea: number;
  parkingSpaces: number;
  minimumMeterage: number;
  maximumMeterage: number;
  streetView: string;
  streetViewDate: Date;
  onlineCreated: boolean;
  onlineDate: Date;
  mappingCompleted: boolean;
}

export interface PedidoWithPedidoImoveis extends Pedido {
  pedidoImoveis: PedidoImovel[];
}

export interface PedidoImovel {}

export const pedidoSchema = z.object({
  clientId: z.string().min(1, "Client ID é obrigatório"),
  entryDate: z.date({ invalid_type_error: "Data de entrada inválida" }),
  deliveryDate: z.date({ invalid_type_error: "Data de entrega inválida" }),
  performer: z.string().min(1, "responsavel é obrigatório"),
  coordinator: z.string().min(1, "Coordenador é obrigatório"),
  expander: z.string().optional(),
  orderNumber: z.string().min(1, "Número do pedido é obrigatório"),
  propertyValue: z.string().min(1, "Valor do imóvel é obrigatório"),
  zeroPoint: z.string().min(1, "Ponto zero é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
  observations: z.string().optional(),
  state: z.string().min(1, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  propertyType: z.string().min(1, "Tipo de propriedade é obrigatório"),
  totalArea: z.coerce.number().nonnegative("Área total deve ser positiva"),
  builtArea: z.coerce.number().nonnegative("Área construída deve ser positiva"),
  parkingSpaces: z.coerce
    .number()
    .int("Vagas de estacionamento deve ser um número inteiro"),
  minimumMeterage: z.coerce
    .number()
    .nonnegative("Metragem mínima deve ser positiva"),
  maximumMeterage: z.coerce
    .number()
    .nonnegative("Metragem máxima deve ser positiva"),
  streetView: z.string().min(1, "Url é obrigatória"),
  streetViewDate: z.date({
    invalid_type_error: "Data do Street View inválida",
  }),
  onlineCreated: z.boolean(),
  onlineDate: z.date({ invalid_type_error: "Data online inválida" }),
  mappingCompleted: z.boolean(),
});

export const pedidoUpdateSchema = z.object({
  clientId: z.string().optional(),
  entryDate: z.date().optional(),
  deliveryDate: z.date().optional(),
  performer: z.string().optional(),
  coordinator: z.string().optional(),
  expander: z.string().optional(),
  orderNumber: z.string().optional(),
  propertyValue: z.string().optional(),
  zeroPoint: z.string().optional(),
  status: z.string().optional(),
  observations: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  propertyType: z.string().optional(),
  totalArea: z.coerce
    .number()
    .nonnegative("Área total deve ser positiva")
    .optional(),
  builtArea: z.coerce
    .number()
    .nonnegative("Área construída deve ser positiva")
    .optional(),
  parkingSpaces: z.coerce
    .number()
    .int("Vagas de estacionamento deve ser um número inteiro")
    .optional(),
  minimumMeterage: z.coerce
    .number()
    .nonnegative("Metragem mínima deve ser positiva")
    .optional(),
  maximumMeterage: z.coerce
    .number()
    .nonnegative("Metragem máxima deve ser positiva")
    .optional(),
  streetView: z.string().optional(),
  streetViewDate: z.date().optional(),
  onlineCreated: z.boolean().optional(),
  onlineDate: z.date().optional(),
  mappingCompleted: z.boolean().optional(),
});

export type PedidoFormData = z.infer<typeof pedidoSchema>;

export interface CreatePedidoDialogProps {
  onCreate: (data: PedidoFormData) => Promise<void>;
}

export interface UpdatePedidoDialogProps {
  originalItem: Pedido;
  onUpdate: (data: PedidoFormData) => void;
}
