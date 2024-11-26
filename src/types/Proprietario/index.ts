import { z } from "zod";

export interface Proprietario {
  id: string;
  name: string;
  source: string;
  telephone: string;
  address: string;
  neighboor: string;
  city: string;
  state: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
  updatedBy: string;
  observations: string;
}

export const proprietarioSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  source: z.string().min(1, "Fonte é obrigatório"),
  telephone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  address: z.string().min(1, "Endereço é obrigatório"),
  neighboor: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatória"),
  email: z.string().min(1, "Email é obrigatória"),
  observations: z.string().optional(),
});

export type ProprietarioFormData = z.infer<typeof proprietarioSchema>;

export interface CreateProprietarioDialogProps {
  onCreate: (data: ProprietarioFormData) => Promise<void>;
}

export interface UpdateProprietarioDialogProps {
  originalItem: Proprietario;
  onUpdate: (data: ProprietarioFormData) => void;
}
