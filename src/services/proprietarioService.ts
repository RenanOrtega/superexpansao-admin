import { PaginationResponse } from "@/types/pagination";
import endpoints from "./endpoints";
import api from "./api";
import { Proprietario, ProprietarioFormData } from "@/types/Proprietario";
import { ProprietarioFilterParams } from "@/types/Proprietario/filters";

export const proprietarioService = {
  async get(filters: ProprietarioFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginationResponse<Proprietario>>(
      `${endpoints.proprietario}?${params.toString()}`
    );

    return response.data;
  },

  async create(data: ProprietarioFormData) {
    const response = await api.post<Proprietario>(endpoints.proprietario, data);
    return response.data;
  },

  async update(id: string, data: Partial<Proprietario>) {
    const response = await api.put<Proprietario>(
      `${endpoints.proprietario}/${id}`,
      data
    );

    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.proprietario}/${id}`);
  },

  async getById(id: string) {
    const response = await api.get<Proprietario>(
      `${endpoints.proprietario}/${id}`
    );

    return response.data;
  },
};
