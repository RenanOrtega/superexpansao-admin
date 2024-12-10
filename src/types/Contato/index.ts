import { z } from "zod";
import { Abordagem } from "../Abordagem";

export interface Contato {
  id: string;
  name: string;
  position: string;
  telephone: string;
  email: string;
  contatoId: string;
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
  email: z.string().min(1, "Setor é obrigatório"),
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
