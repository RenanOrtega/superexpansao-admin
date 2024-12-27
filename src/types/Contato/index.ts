import { z } from "zod";
import { Abordagem } from "../Abordagem";

export interface Contato {
  id: string;
  name: string;
  position: string;
  telephone: string;
  email: string;
  city: string;
  state: string;
  areaOfActivity: string;
  contatoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContatoWithContato extends Contato {
  contato: Contato;
}

export interface ContatoWithAbordagens extends Contato {
  abordagens: Abordagem[];
}

export const contatoSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  position: z.string().min(1, "Cargo é obrigatório"),
  telephone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  email: z.string().min(1, "Email é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
  areaOfActivity: z.string().min(1, "Area é obrigatório"),
  observations: z.string().optional(),
});

export type ContatoFormData = z.infer<typeof contatoSchema>;

export interface CreateContatoDialogProps {
  onCreate: (data: ContatoFormData, empresaId: string) => Promise<void>;
  empresaId: string;
}

export interface UpdateContatoDialogProps {
  originalItem: Contato;
  onUpdate: (data: ContatoFormData) => void;
}
