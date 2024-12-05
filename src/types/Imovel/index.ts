import { z } from "zod";

export interface Imovel {
  id: string;
  address: string;
  neighboorhoud: string;
  city: string;
  state: string;
  zone: string;
  propertyProfile: string;
  link: string;
  availability: string;
  rentValue: number;
  saleValue: number;
  iptuValue: number;
  searchMeterage: number;
  totalArea: number;
  realEstate: string;
  updatedAt: Date;
  createdAt: Date;
  updatedBy: string;
}

export const imovelSchema = z.object({
  address: z.string().min(1, "Endereço é obrigatório"),
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
  iptuValue: z.coerce.number().optional(),
  searchMeterage: z.coerce.number().min(1, "Metragem de busca é obrigatório"),
  totalArea: z.coerce.number().min(1, "Area total é obrigatório"),
  realEstate: z.string().optional(),
});

export type ImovelFormData = z.infer<typeof imovelSchema>;

export interface CreateImovelDialogProps {
  onCreate: (data: ImovelFormData) => Promise<void>;
}

export interface UpdateImovelDialogProps {
  originalItem: Imovel;
  onUpdate: (data: ImovelFormData) => void;
}
