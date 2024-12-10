import { z } from "zod";
import { ContatoWithAbordagens } from "../Contato";

export interface Empresa {
  id: string;
  fantasyName: string;
  socialReason: string;
  category: string;
  sector: string;
  telephone: string;
  updatedAt: Date;
  createdAt: Date;
  updatedBy: string;
}

export interface EmpresaWithContatos extends Empresa {
  contatos: ContatoWithAbordagens[];
}

export const empresaSchema = z.object({
  fantasyName: z.string().min(1, "Nome Fantasia é obrigatório"),
  socialReason: z.string().min(1, "Razão social é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatório"),
  telephone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  sector: z.string().min(1, "Setor é obrigatório"),
});

export type EmpresaFormData = z.infer<typeof empresaSchema>;

export interface CreateEmpresaDialogProps {
  onCreate: (data: EmpresaFormData) => Promise<void>;
}

export interface UpdateEmpresaDialogProps {
  originalItem: Empresa;
  onUpdate: (data: EmpresaFormData) => void;
}
