import { PaginationResponse } from "@/types/pagination";
import endpoints from "./endpoints";
import api from "./api";
import {
  Contato,
  ContatoFormData,
  ContatoWithAbordagens,
} from "@/types/Contato";
import { ContatoFilterParams } from "@/types/Contato/filters";

export const contatoService = {
  async get(filters: ContatoFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginationResponse<Contato>>(
      `${endpoints.contato}?${params.toString()}`
    );

    return response.data;
  },

  async create(data: ContatoFormData, empresaId: string) {
    const response = await api.post<Contato>(endpoints.contato, {
      ...data,
      empresaId,
    });
    return response.data;
  },

  async update(id: string, data: Partial<Contato>) {
    const response = await api.put<Contato>(`${endpoints.contato}/${id}`, data);

    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.contato}/${id}`);
  },

  async getById(id: string | undefined) {
    const response = await api.get<ContatoWithAbordagens>(
      `${endpoints.contato}/${id}`
    );

    return response.data;
  },
};
