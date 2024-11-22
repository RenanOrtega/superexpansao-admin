import { z } from "zod";

export interface Motoboy {
  id: string;
  name: string;
  telephone: string;
  city: string;
  vehicle: string;
  observations: string;
  pix: string;
  lastMapping: Date;
}

export const motoboySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  telephone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  city: z.string().min(1, "Cidade é obrigatória"),
  vehicle: z.string().min(1, "Veículo é obrigatório"),
  pix: z.string().optional(),
  observations: z.string().optional(),
  lastMapping: z.date({ required_error: "Último Mapeamento é obrigatório" }),
});

export type MotoboyFormData = z.infer<typeof motoboySchema>;

export interface CreateMotoboyDialogProps {
  onCreate: (data: MotoboyFormData) => Promise<void>;
}
