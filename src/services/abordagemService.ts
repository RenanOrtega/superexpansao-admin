import { PaginationResponse } from "@/types/pagination";
import endpoints from "./endpoints";
import api from "./api";
import {
  Abordagem,
  AbordagemFormData,
  AbordagemWithContato,
} from "@/types/Abordagem";
import { AbordagemFilterParams } from "@/types/Abordagem/filters";

export const abordagemService = {
  async get(filters: AbordagemFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginationResponse<AbordagemWithContato>>(
      `${endpoints.abordagem}?${params.toString()}`
    );

    return response.data;
  },

  async create(data: AbordagemFormData, contatoId: string) {
    const response = await api.post<Abordagem>(endpoints.abordagem, {
      ...data,
      contatoId,
    });
    return response.data;
  },

  async update(id: string, data: Partial<Abordagem>) {
    const response = await api.put<Abordagem>(
      `${endpoints.abordagem}/${id}`,
      data
    );

    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.abordagem}/${id}`);
  },

  async getById(id: string | undefined) {
    const response = await api.get<Abordagem>(`${endpoints.abordagem}/${id}`);

    return response.data;
  },
};
