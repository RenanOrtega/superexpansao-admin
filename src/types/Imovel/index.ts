import { z } from "zod";
import { Proprietario } from "../Proprietario";

export interface Imovel {
  id: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zone: string;
  propertyProfile: string;
  link: string;
  availability: string;
  rentValue: number;
  saleValue: number;
  iptuMonthly: number;
  iptuAnnual: number;
  searchMeterage: number;
  totalArea: number;
  realEstate: string;
  cep: string;
  updatedAt: Date;
  createdAt: Date;
  updatedBy: string;
}

export interface ImovelWithProprietario extends Imovel {
  proprietarioId: string;
  proprietario: Proprietario;
}

export const imovelSchema = z.object({
  address: z.string().min(1, "Logradouro é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
  zone: z.string().min(1, "Zona é obrigatório"),
  propertyProfile: z.string().min(1, "Perfil do Imóvel é obrigatório"),
  proprietarioId: z.string().min(1, "Proprietario é obrigatório"),
  link: z.string().min(1, "Link é obrigatório"),
  availability: z.string().min(1, "Disponibilidade é obrigatório"),
  rentValue: z.coerce.number().min(1, "Valor do aluguel é obrigatório"),
  saleValue: z.coerce.number().optional(),
  iptuMonthly: z.coerce.number().optional(),
  iptuAnnual: z.coerce.number().optional(),
  searchMeterage: z.coerce.number().min(1, "Metragem de busca é obrigatório"),
  totalArea: z.coerce.number().min(1, "Area total é obrigatório"),
  realEstate: z.string().optional(),
  cep: z.string(),
});

export type ImovelFormData = z.infer<typeof imovelSchema>;

export interface CreateImovelDialogProps {
  onCreate: (data: ImovelFormData) => Promise<void>;
}

export interface UpdateImovelDialogProps {
  originalItem: Imovel;
  onUpdate: (data: ImovelFormData) => void;
}
