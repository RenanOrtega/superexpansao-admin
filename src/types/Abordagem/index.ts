import { z } from "zod";
import { Contato } from "../Contato";

export interface Abordagem {
  id: string;
  contatoId: string;
  telephone: string;
  negotiationStatus: string;
  comment: string;
  contactAddressed: boolean;
  approachType: string;
  lastApproachDate: Date;
  nextApproachDate: Date;
}

export interface AbordagemWithContato extends Abordagem {
  contato: Contato;
}

export const abordagemSchema = z.object({
  telephone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  negotiationStatus: z.string().min(1, "Status é obrigatório"),
  comment: z.string().min(1, "Comentario é obrigatório"),
  contactAddressed: z.boolean(),
  approachType: z.string().min(1, "Abordagem é obrigatório"),
  lastApproachDate: z.date({
    invalid_type_error: "Data de última abordagem invalida",
  }),
  nextApproachDate: z.date({
    invalid_type_error: "Data da próxima abordagem invalida",
  }),
});

export type AbordagemFormData = z.infer<typeof abordagemSchema>;

export interface CreateAbordagemDialogProps {
  onCreate: (data: AbordagemFormData, contatoId: string) => Promise<void>;
  contatoId: string;
}

export interface UpdateAbordagemDialogProps {
  originalItem: Abordagem;
  onUpdate: (data: AbordagemFormData) => void;
}
