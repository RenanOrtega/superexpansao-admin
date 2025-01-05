import { z } from "zod";

export const addressSchema = z.object({
  cep: z.string().min(8, "CEP inválido"),
  logradouro: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  uf: z.string(),
  regiao: z.string(),
  complemento: z.string().optional(),
});

export type Address = z.infer<typeof addressSchema>;
