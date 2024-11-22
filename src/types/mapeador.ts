import { z } from "zod";

export interface Mapeador {
  id: string;
  name: string;
  telephone: string;
  city: string;
  vehicle: string;
  observations: string;
  pix: string;
  lastMapping: Date;
}

export const mapeadorSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  telephone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  city: z.string().min(1, "Cidade é obrigatória"),
  vehicle: z.string().min(1, "Veículo é obrigatório"),
  pix: z.string().optional(),
  observations: z.string().optional(),
  lastMapping: z.coerce.date({
    required_error: "Último Mapeamento é obrigatório",
  }),
});

export type MapeadorFormData = z.infer<typeof mapeadorSchema>;

export interface CreateMapeadorDialogProps {
  onCreate: (data: MapeadorFormData) => Promise<void>;
}

export interface UpdateMapeadorDialogProps {
  originalItem: Mapeador;
  onUpdate: (data: MapeadorFormData) => void;
}
