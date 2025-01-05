import { z } from "zod";

export interface HistoricoMapeamento {
  id: string;
  mappingDate: Date;
  cameraType: string;
  routeLink: string;
  value: number;
  updatedAt: Date;
  createdAt: Date;
  updatedBy: string;
}

export const historicoMapeamentoSchema = z.object({
  routeLink: z.string().min(1, "Link da rota é obrigatório"),
  value: z.coerce.number().min(1, "Valor é obrigatório"),
  cameraType: z.string().min(1, "Camera é obrigatório"),
  mappingDate: z.coerce.date({
    required_error: "Data Mapeamento é obrigatório",
  }),
});

export type HistoricoMapeamentoFormData = z.infer<
  typeof historicoMapeamentoSchema
>;

export interface CreateHistoricoMapeamentoDialogProps {
  onCreate: (
    data: HistoricoMapeamentoFormData,
    mapeadorId: string
  ) => Promise<void>;
  mapeadorId: string;
}

export interface UpdateHistoricoMapeamentoDialogProps {
  originalItem: HistoricoMapeamento;
  onUpdate: (data: HistoricoMapeamentoFormData) => void;
}
