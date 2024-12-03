import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(
      /[!@#$%^&*]/,
      "A senha deve conter pelo menos um caractere especial"
    ),
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  role: z.enum(["Admin", "Moderador", "Padrão"], {
    errorMap: () => ({ message: "Selecione uma permissão válida" }),
  }),
});

export const userUpdateSchema = z.object({
  email: z.string().email("E-mail inválido"),
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  role: z.enum(["Admin", "Moderador", "Padrão"], {
    errorMap: () => ({ message: "Selecione uma permissão válida" }),
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
export interface CreateUserDialogProps {
  onCreate: (data: UserFormData) => Promise<void>;
}

export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
export interface UpdateUserDialogProps {
  originalItem: User;
  onUpdate: (data: UserUpdateFormData) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  updatedAt: Date;
  createdAt: Date;
  updatedBy: string;
}

export interface UserSession {
  name: string;
  email: string;
  role: string;
}
