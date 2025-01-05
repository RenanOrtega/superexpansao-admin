import { z } from "zod";
import { HistoricoMapeamento } from "../HistoricoMapeamento";

export interface Mapeador {
  id: string;
  name: string;
  telephone: string;
  city: string;
  zone: string;
  vehicle: string;
  cameraType: string;
  celphoneModel: string;
  observations: string;
  pix: string;
  lastMapping: Date;
  updatedAt: Date;
  createdAt: Date;
  updatedBy: string;
}

export interface MapeadorWithHistorico extends Mapeador {
  historicoMapeamentos: HistoricoMapeamento[];
}

export const mapeadorSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  telephone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  city: z.string().min(1, "Cidade é obrigatória"),
  zone: z.string().min(1, "Zona é obrigatória"),
  vehicle: z.string().min(1, "Veículo é obrigatório"),
  cameraType: z.string().min(1, "Camera é obrigatório"),
  celphoneModel: z.string().min(1, "Celular é obrigatório"),
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
